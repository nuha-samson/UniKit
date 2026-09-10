import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import { userApi } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { getAcademicPeriod } from "../utils/semester";
import "./Settings.css";

const Settings = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    academicYear: "",
    semester: "fall",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await userApi.getProfile(token);
        setForm({
          name: data.user.name || "",
          email: data.user.email || "",
          academicYear: data.user.academicYear || "",
          semester: data.user.semester || "fall",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, [token]);

  const change = (event) => {
    setForm((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };

  const save = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      setSaving(true);
      const data = await userApi.updateProfile(token, form);
      setForm({
        name: data.user.name || "",
        email: data.user.email || "",
        academicYear: data.user.academicYear || "",
        semester: data.user.semester || "fall",
      });
      setMessage("Settings saved successfully.");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const signOut = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const period = getAcademicPeriod();

  return (
    <div className="app-shell">
      <Navbar />
      <div className="page-layout">
        <Sidebar />
        <main className="page-main settings-main">
          <section className="page-heading">
            <div>
              <span className="eyebrow">ACCOUNT</span>
              <h1>Settings</h1>
              <p>Keep your profile and academic information up to date.</p>
            </div>
          </section>

          {loading ? (
            <div className="page-empty">Loading settings...</div>
          ) : (
            <form className="settings-card" onSubmit={save}>
              {error && <div className="page-error">{error}</div>}
              {message && <div className="save-message">{message}</div>}

              <section className="settings-section">
                <h2>Profile</h2>
                <label>
                  Full name
                  <input name="name" value={form.name} onChange={change} required />
                </label>
                <label>
                  Email
                  <input name="email" type="email" value={form.email} onChange={change} required />
                </label>
              </section>

              <section className="settings-section">
                <h2>Academic</h2>
                <div className="form-grid">
                  <label>
                    Academic year
                    <input name="academicYear" value={form.academicYear} onChange={change} placeholder={`${period.year}`} />
                  </label>
                  <label>
                    Semester
                    <select name="semester" value={form.semester} onChange={change}>
                      <option value="fall">Fall</option>
                      <option value="spring">Spring</option>
                      <option value="summer">Summer</option>
                    </select>
                  </label>
                </div>
              </section>

              <section className="settings-section">
                <h2>Account</h2>
                <button type="button" className="button-danger" onClick={signOut}>Logout</button>
              </section>

              <div className="settings-save-row">
                <button type="submit" className="primary-action" disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          )}
        </main>
      </div>
    </div>
  );
};

export default Settings;