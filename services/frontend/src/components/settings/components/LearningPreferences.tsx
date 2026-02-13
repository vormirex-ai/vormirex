import React, { useState } from "react";

const LearningPreferences: React.FC = () => {
  const [difficulty, setDifficulty] = useState("Intermediate");
  const [topics, setTopics] = useState<string[]>([]);
  const [studyGoal, setStudyGoal] = useState("1 hour/day");

  const allTopics = [
    "DSA",
    "Backend",
    "Frontend",
    "System Design",
    "DBMS",
    "Operating Systems",
  ];

  const toggleTopic = (topic: string) => {
    setTopics((prev) =>
      prev.includes(topic)
        ? prev.filter((t) => t !== topic)
        : [...prev, topic]
    );
  };

  return (
    <div className="learning-pref-page">
      <div className="account-security-wrapper">

        {/* Card 1 — Difficulty Level */}
        <div className="settings-card account-card">
          <h4>Learning Level</h4>
          <p>Select your current skill level</p>

          <select
            className="privacy-select"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>

          <button
            className="primary-btn"
            onClick={() => console.log("Saved Difficulty:", difficulty)}
          >
            Save Level
          </button>
        </div>

        {/* Card 2 — Preferred Topics */}
        <div className="settings-card account-card">
          <h4>Preferred Topics</h4>
          <p>Select topics you want to focus on</p>

          <div className="toggle-group">
            {allTopics.map((topic) => (
              <label key={topic} className="toggle-item">
                <span>{topic}</span>
                <input
                  type="checkbox"
                  checked={topics.includes(topic)}
                  onChange={() => toggleTopic(topic)}
                />
              </label>
            ))}
          </div>

          <button
            className="primary-btn"
            onClick={() => console.log("Saved Topics:", topics)}
          >
            Save Topics
          </button>
        </div>

        {/* Card 3 — Study Goal */}
        <div className="settings-card account-card">
          <h4>Daily Study Goal</h4>
          <p>Set your daily learning target</p>

          <select
            className="privacy-select"
            value={studyGoal}
            onChange={(e) => setStudyGoal(e.target.value)}
          >
            <option>30 mins/day</option>
            <option>1 hour/day</option>
            <option>2 hours/day</option>
            <option>Flexible</option>
          </select>

          <button
            className="primary-btn"
            onClick={() => console.log("Saved Goal:", studyGoal)}
          >
            Save Goal
          </button>
        </div>

      </div>
    </div>
  );
};

export default LearningPreferences;
