[1mdiff --git a/frontend/src/components/DeadlineSection/DeadlineSection.jsx b/frontend/src/components/DeadlineSection/DeadlineSection.jsx[m
[1mindex 239aaf5..93af45f 100644[m
[1m--- a/frontend/src/components/DeadlineSection/DeadlineSection.jsx[m
[1m+++ b/frontend/src/components/DeadlineSection/DeadlineSection.jsx[m
[36m@@ -1,6 +1,6 @@[m
[31m-import React, { useEffect, useState } from "react";[m
[32m+[m[32mimport { useEffect, useState } from "react";[m
 import DeadlineCard from "./DeadlineCard";[m
[31m-import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";[m
[32m+[m[32mimport DeadlineModal from "../DeadlineModal/DeadlineModal";[m
 import { deadlineApi } from "../../services/api";[m
 import { useAuth } from "../../context/AuthContext";[m
 import "./DeadlineSection.css";[m
[36m@@ -10,50 +10,132 @@[m [mconst DeadlineSection = () => {[m
 [m
   const [deadlines, setDeadlines] = useState([]);[m
   const [loading, setLoading] = useState(true);[m
[32m+[m[32m  const [error, setError] = useState("");[m
 [m
[31m-  useEffect(() => {[m
[31m-    const loadDeadlines = async () => {[m
[31m-      if (!token || !isAuthenticated) {[m
[31m-        setDeadlines([]);[m
[31m-        setLoading(false);[m
[31m-        return;[m
[31m-      }[m
[31m-[m
[31m-      try {[m
[31m-        const data = await deadlineApi.getAll(token);[m
[31m-        setDeadlines(data.deadlines || []);[m
[31m-      } catch (error) {[m
[31m-        console.error("Failed to load deadlines:", error);[m
[31m-        setDeadlines([]);[m
[31m-      } finally {[m
[31m-        setLoading(false);[m
[31m-      }[m
[31m-    };[m
[32m+[m[32m  const [showModal, setShowModal] = useState(false);[m
[32m+[m[32m  const [selectedDeadline, setSelectedDeadline] = useState(null);[m
[32m+[m
[32m+[m[32m  const loadDeadlines = async () => {[m
[32m+[m[32m    if (!token || !isAuthenticated) {[m
[32m+[m[32m      setDeadlines([]);[m
[32m+[m[32m      setLoading(false);[m
[32m+[m[32m      return;[m
[32m+[m[32m    }[m
[32m+[m
[32m+[m[32m    try {[m
[32m+[m[32m      setLoading(true);[m
[32m+[m[32m      setError("");[m
 [m
[32m+[m[32m      const data = await deadlineApi.getAll(token);[m
[32m+[m
[32m+[m[32m      setDeadlines(data.deadlines || []);[m
[32m+[m[32m    } catch (err) {[m
[32m+[m[32m      console.error("Failed to load deadlines:", err);[m
[32m+[m[32m      setError(err.message || "Failed to load deadlines.");[m
[32m+[m[32m    } finally {[m
[32m+[m[32m      setLoading(false);[m
[32m+[m[32m    }[m
[32m+[m[32m  };[m
[32m+[m
[32m+[m[32m  useEffect(() => {[m
     loadDeadlines();[m
   }, [token, isAuthenticated]);[m
 [m
[32m+[m[32m  const handleAdd = () => {[m
[32m+[m[32m    setSelectedDeadline(null);[m
[32m+[m[32m    setShowModal(true);[m
[32m+[m[32m  };[m
[32m+[m
[32m+[m[32m  const handleEdit = (deadline) => {[m
[32m+[m[32m    setSelectedDeadline(deadline);[m
[32m+[m[32m    setShowModal(true);[m
[32m+[m[32m  };[m
[32m+[m
[32m+[m[32m  const handleComplete = async (deadline) => {[m
[32m+[m[32m    try {[m
[32m+[m[32m      await deadlineApi.update(token, deadline._id, {[m
[32m+[m[32m        completed: !deadline.completedAt,[m
[32m+[m[32m      });[m
[32m+[m
[32m+[m[32m      await loadDeadlines();[m
[32m+[m[32m    } catch (err) {[m
[32m+[m[32m      setError(err.message || "Failed to update deadline.");[m
[32m+[m[32m    }[m
[32m+[m[32m  };[m
[32m+[m
[32m+[m[32m  const handleDelete = async (id) => {[m
[32m+[m[32m    try {[m
[32m+[m[32m      await deadlineApi.delete(token, id);[m
[32m+[m
[32m+[m[32m      setDeadlines((previous) =>[m
[32m+[m[32m        previous.filter((deadline) => deadline._id !== id)[m
[32m+[m[32m      );[m
[32m+[m[32m    } catch (err) {[m
[32m+[m[32m      setError(err.message || "Failed to delete deadline.");[m
[32m+[m[32m    }[m
[32m+[m[32m  };[m
[32m+[m
[32m+[m[32m  const handleSaved = async () => {[m
[32m+[m[32m    await loadDeadlines();[m
[32m+[m[32m  };[m
[32m+[m
[32m+[m[32m  const activeDeadlines = deadlines.filter([m
[32m+[m[32m    (deadline) => !deadline.completedAt[m
[32m+[m[32m  );[m
[32m+[m
   return ([m
[31m-    <section className="deadlines-section">[m
[31m-      <h2>Upcoming Deadlines</h2>[m
[32m+[m[32m    <section className="deadline-section">[m
[32m+[m[32m      <div className="deadline-section-header">[m
[32m+[m[32m        <div>[m
[32m+[m[32m          <p className="section-eyebrow">ACADEMIC TRACKER</p>[m
[32m+[m[32m          <h2>Upcoming Deadlines</h2>[m
[32m+[m[32m        </div>[m
[32m+[m
[32m+[m[32m        <button[m
[32m+[m[32m          type="button"[m
[32m+[m[32m          className="add-deadline-button"[m
[32m+[m[32m          onClick={handleAdd}[m
[32m+[m[32m        >[m
[32m+[m[32m          + Add Deadline[m
[32m+[m[32m        </button>[m
[32m+[m[32m      </div>[m
[32m+[m
[32m+[m[32m      {error && <div className="deadline-section-error">{error}</div>}[m
 [m
       {loading ? ([m
[31m-        <LoadingSpinner />[m
[31m-      ) : deadlines.length === 0 ? ([m
[31m-        <div className="empty-deadlines">[m
[31m-          <p>No upcoming deadlines.</p>[m
[31m-          <span>Add an assignment, quiz, or exam to stay on track.</span>[m
[32m+[m[32m        <div className="deadline-empty-state">[m
[32m+[m[32m          <p>Loading deadlines...</p>[m
[32m+[m[32m        </div>[m
[32m+[m[32m      ) : activeDeadlines.length === 0 ? ([m
[32m+[m[32m        <div className="deadline-empty-state">[m
[32m+[m[32m          <h3>No upcoming deadlines</h3>[m
[32m+[m[32m          <p>Add an assignment, quiz, or exam to stay on track.</p>[m
         </div>[m
       ) : ([m
[31m-        <div className="deadline-grid">[m
[31m-          {deadlines.slice(0, 5).map((deadline) => ([m
[32m+[m[32m        <div className="deadline-list">[m
[32m+[m[32m          {activeDeadlines.slice(0, 5).map((deadline) => ([m
             <DeadlineCard[m
               key={deadline._id}[m
               deadline={deadline}[m
[32m+[m[32m              onEdit={handleEdit}[m
[32m+[m[32m              onComplete={handleComplete}[m
[32m+[m[32m              onDelete={handleDelete}[m
             />[m
           ))}[m
         </div>[m
       )}[m
[32m+[m
[32m+[m[32m      {showModal && ([m
[32m+[m[32m        <DeadlineModal[m
[32m+[m[32m          deadline={selectedDeadline}[m
[32m+[m[32m          onClose={() => {[m
[32m+[m[32m            setShowModal(false);[m
[32m+[m[32m            setSelectedDeadline(null);[m
[32m+[m[32m          }}[m
[32m+[m[32m          onSaved={handleSaved}[m
[32m+[m[32m          onDeleted={handleDelete}[m
[32m+[m[32m        />[m
[32m+[m[32m      )}[m
     </section>[m
   );[m
 };[m
