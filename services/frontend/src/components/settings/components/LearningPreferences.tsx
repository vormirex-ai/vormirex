import React, { useState, useEffect } from "react";
import { updateLearningPreferences } from "../../../api/user";
import { fetchCurrentUser } from "../../../api/auth";

const LearningPreferences: React.FC = () => {
  const [difficulty, setDifficulty] = useState("Intermediate");
  const [topics, setTopics] = useState<string[]>([]);
  const [studyGoal, setStudyGoal] = useState("1 hour/day");
  const [loading, setLoading] = useState(false);

  const allTopics = [
    "DSA",
    "Backend",
    "Frontend",
    "System Design",
    "DBMS",
    "Operating Systems",
  ];

  const goalMap: Record<string, number> = {
    "30 mins/day": 30,
    "1 hour/day": 60,
    "2 hours/day": 120,
  };

  const reverseGoalMap: Record<number, string> = {
    30: "30 mins/day",
    60: "1 hour/day",
    120: "2 hours/day",
  };

  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        const response = await fetchCurrentUser(token);
        const prefs = response.user.learningPreferences;

        if (prefs) {
          if (prefs.currentSkillLevel) setDifficulty(prefs.currentSkillLevel);
          if (prefs.focusAreas) setTopics(prefs.focusAreas);
          if (prefs.dailyGoal !== undefined) {
             const goalValue = prefs.dailyGoal;
             // If goal is 0 (old flexible setting) or undefined, default to 30 or 60
             const goalString = (goalValue && reverseGoalMap[goalValue]) ? reverseGoalMap[goalValue] : "1 hour/day";
             setStudyGoal(goalString);
          }
        }
      } catch (error) {
        console.error("Failed to load learning preferences:", error);
      }
    };

    loadPreferences();
  }, []);


  const toggleTopic = (topic: string) => {
    setTopics((prev) =>
      prev.includes(topic)
        ? prev.filter((t) => t !== topic)
        : [...prev, topic]
    );
  };

  const handleSaveLevel = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Not authenticated");

      setLoading(true);

      await updateLearningPreferences(token, {
        currentSkillLevel: difficulty,
      });

      alert("Learning level updated!");
    } catch (error: any) {
      alert(error.message);

    } finally {
      setLoading(false);
    }
  };

  const handleSaveTopics = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Not authenticated");

      setLoading(true);


      const result = await updateLearningPreferences(token, {
        focusAreas: topics,
      });
      // 🔥 Sync UI with backend response
      if (result?.preferences) {
        setTopics(result.preferences.focusAreas || []);

      }
      alert("Topics Updated!");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleSaveGoal = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Not authenticated");

      setLoading(true);

      const goalValue = goalMap[studyGoal];
      await updateLearningPreferences(token, {
        dailyGoal: goalValue !== undefined ? goalValue : 30,
      });

      alert("Daily goal updated!");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
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
            onClick={handleSaveLevel}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Level"}
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
            onClick={handleSaveTopics}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Topics"}
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
          </select>

          <button
            className="primary-btn"
            onClick={handleSaveGoal}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Goal"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default LearningPreferences;
