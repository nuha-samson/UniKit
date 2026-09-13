import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./landing.css";

const Landing = () => {
  const { isAuthenticated, loading } = useAuth();

  if (!loading && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <main className="landing-page">
      <nav className="landing-nav">
        <Link to="/" className="landing-logo">
          UniKit<span>.</span>
        </Link>

        <div className="landing-nav-actions">
          <Link to="/login" className="landing-login">
            Log in
          </Link>
          <Link to="/signup" className="landing-nav-cta">
            Get started
          </Link>
        </div>
      </nav>

      <section className="landing-hero">
        <div className="hero-copy">
          <div className="landing-eyebrow">
            <span className="eyebrow-dot" />
            BUILT FOR THE SEMESTER
          </div>

          <h1>
            Your semester,
            <br />
            <span>finally in one place.</span>
          </h1>

          <p className="hero-description">
            Courses, credits, deadlines, and the things you keep telling
            yourself you'll remember later. UniKit puts them together so you
            can see what matters without digging through five different apps.
          </p>

          <div className="hero-actions">
            <Link to="/signup" className="hero-primary">
              Build my UniKit
              <span>→</span>
            </Link>

            <Link to="/login" className="hero-secondary">
              I already have an account
            </Link>
          </div>

          <div className="hero-note">
            <span>01</span>
            Set up your semester.
            <span>02</span>
            Add what is due.
            <span>03</span>
            Know what comes next.
          </div>
        </div>

        <div className="hero-product">
          <div className="product-window">
            <div className="window-topbar">
              <div className="window-dots">
                <span />
                <span />
                <span />
              </div>

              <span className="window-title">unikit / dashboard</span>

              <span className="window-menu">•••</span>
            </div>

            <div className="mock-dashboard">
              <div className="mock-sidebar">
                <div className="mock-brand">U.</div>

                <div className="mock-nav active">
                  <span>▦</span>
                  Overview
                </div>

                <div className="mock-nav">
                  <span>□</span>
                  Courses
                </div>

                <div className="mock-nav">
                  <span>◷</span>
                  Deadlines
                </div>

                <div className="mock-nav">
                  <span>⚙</span>
                  Settings
                </div>
              </div>

              <div className="mock-main">
                <div className="mock-heading">
                  <div>
                    <span className="mock-eyebrow">YOUR ACADEMIC OVERVIEW</span>
                    <h3>Welcome back, student.</h3>
                    <p>Here's what needs your attention next.</p>
                  </div>

                  <div className="mock-avatar">N</div>
                </div>

                <div className="mock-next">
                  <div>
                    <span className="mock-label">NEXT DEADLINE</span>
                    <h4>Data Structures Assignment</h4>
                    <p>DSA 3 · Assignment · High priority</p>
                  </div>

                  <div className="mock-date">
                    <strong>SEP 17</strong>
                    <span>11:59 PM</span>
                  </div>
                </div>

                <div className="mock-stats">
                  <div>
                    <span>COURSES</span>
                    <strong>06</strong>
                  </div>

                  <div>
                    <span>CREDITS</span>
                    <strong>19</strong>
                  </div>

                  <div>
                    <span>DEADLINES</span>
                    <strong>04</strong>
                  </div>

                  <div>
                    <span>ASSIGNMENTS</span>
                    <strong>03</strong>
                  </div>
                </div>

                <div className="mock-bottom">
                  <div className="mock-course-card">
                    <div className="mock-card-heading">
                      <span>THIS SEMESTER</span>
                      <span>VIEW ALL →</span>
                    </div>

                    <div className="mock-course-row">
                      <div className="course-number">01</div>
                      <div>
                        <strong>Data Structures & Algorithms</strong>
                        <span>4 credits · In progress</span>
                      </div>
                    </div>

                    <div className="mock-course-row">
                      <div className="course-number">02</div>
                      <div>
                        <strong>Applied Mathematics III</strong>
                        <span>3 credits · In progress</span>
                      </div>
                    </div>
                  </div>

                  <div className="mock-deadline-card">
                    <span className="mock-card-heading">UP NEXT</span>

                    <div className="mini-deadline">
                      <div className="mini-date">
                        <strong>18</strong>
                        <span>SEP</span>
                      </div>
                      <div>
                        <strong>Circuit Lab Report</strong>
                        <span>Electric Circuit</span>
                      </div>
                    </div>

                    <div className="mini-deadline">
                      <div className="mini-date yellow">
                        <strong>21</strong>
                        <span>SEP</span>
                      </div>
                      <div>
                        <strong>Problem Set</strong>
                        <span>Applied Math III</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="floating-card floating-card-one">
            <span>DEADLINE</span>
            <strong>Due in 2 days</strong>
            <small>DSA Assignment</small>
          </div>

          <div className="floating-card floating-card-two">
            <span>COURSE</span>
            <strong>+ 4 credits</strong>
            <small>Data Structures</small>
          </div>
        </div>
      </section>

      <section className="landing-marquee">
        <div>
          <span>COURSES</span>
          <i>×</i>
          <span>DEADLINES</span>
          <i>×</i>
          <span>YOUR SEMESTER</span>
          <i>×</i>
          <span>ONE PLACE</span>
          <i>×</i>
          <span>COURSES</span>
          <i>×</i>
          <span>DEADLINES</span>
        </div>
      </section>

      <section className="landing-problem">
        <div className="problem-intro">
          <span className="landing-eyebrow">WHY UNIKIT EXISTS</span>

          <h2>
            University already has
            <br />
            <span>enough moving parts.</span>
          </h2>
        </div>

        <div className="problem-content">
          <p>
            Your courses live somewhere. Assignment dates are in another
            place. Credits are in a portal. And somehow you're still expected
            to remember all of it.
          </p>

          <p>
            UniKit is a simple personal command center for your academic life.
            Add your courses. Track what is due. Open the dashboard and know
            what's happening.
          </p>

          <Link to="/signup" className="text-arrow">
            Start with your semester <span>↗</span>
          </Link>
        </div>
      </section>

      <section className="landing-features">
        <div className="feature-header">
          <span className="landing-eyebrow">THE SYSTEM</span>
          <h2>Three things. One place.</h2>
        </div>

        <div className="feature-grid">
          <article className="feature-card feature-card-yellow">
            <div className="feature-number">01</div>

            <div className="feature-icon">▦</div>

            <h3>Know your courses.</h3>

            <p>
              Keep the courses you're taking, their credits, semester and
              progress together instead of reconstructing your schedule every
              time you need it.
            </p>

            <div className="feature-demo courses-demo">
              <div>
                <strong>DSA 3</strong>
                <span>4 credits</span>
              </div>
              <div>
                <strong>Math III</strong>
                <span>3 credits</span>
              </div>
              <div>
                <strong>Electric Circuit</strong>
                <span>4 credits</span>
              </div>
            </div>
          </article>

          <article className="feature-card">
            <div className="feature-number">02</div>

            <div className="feature-icon">◷</div>

            <h3>See what's due.</h3>

            <p>
              Create deadlines, connect them to courses, mark them complete,
              and stop relying on the “I'll definitely remember this” system.
            </p>

            <div className="feature-demo deadlines-demo">
              <div className="deadline-line">
                <span className="deadline-tag urgent">SOON</span>
                <strong>DSA Assignment</strong>
                <small>Sep 17</small>
              </div>

              <div className="deadline-line">
                <span className="deadline-tag">NEXT</span>
                <strong>Circuit Report</strong>
                <small>Sep 18</small>
              </div>

              <div className="deadline-line">
                <span className="deadline-tag">NEXT</span>
                <strong>Math Problem Set</strong>
                <small>Sep 21</small>
              </div>
            </div>
          </article>

          <article className="feature-card">
            <div className="feature-number">03</div>

            <div className="feature-icon">↗</div>

            <h3>See the bigger picture.</h3>

            <p>
              Your dashboard turns all those individual pieces into a quick
              overview of courses, credits, deadlines and what's coming next.
            </p>

            <div className="feature-demo overview-demo">
              <div className="overview-big">
                <span>ACTIVE DEADLINES</span>
                <strong>04</strong>
              </div>

              <div className="overview-bars">
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="landing-final">
        <div className="final-grid">
          <div>
            <span className="landing-eyebrow">YOUR SEMESTER STARTS HERE</span>

            <h2>
              Less hunting.
              <br />
              More doing.
            </h2>
          </div>

          <div className="final-right">
            <p>
              Set up your courses, add your deadlines, and let UniKit give you
              one place to come back to.
            </p>

            <Link to="/signup" className="final-button">
              Create my UniKit
              <span>→</span>
            </Link>

            <span className="final-login">
              Already using UniKit? <Link to="/login">Log in</Link>
            </span>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <span>UniKit.</span>
        <span>Built for students who have enough tabs open.</span>
        <span>© 2026</span>
      </footer>
    </main>
  );
};

export default Landing;
