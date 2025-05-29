import React, { useEffect, useState } from 'react';
import API from '../services/api';
import Navbar from '../components/Navbar'; // ✅ Make sure this path matches your project structure
import './Dashboard.css';

const Dashboard = () => {
    const [topics, setTopics] = useState([]);
    const [expandedTopicIds, setExpandedTopicIds] = useState([]);

    useEffect(() => {
        fetchTopics();
    }, []);

    const fetchTopics = async () => {
        try {
            const res = await API.get('/topics');
            setTopics(res.data);
        } catch (err) {
            console.error('Failed to fetch topics:', err);
        }
    };

    const toggleTopic = topicId => {
        setExpandedTopicIds(prev =>
            prev.includes(topicId)
                ? prev.filter(id => id !== topicId)
                : [...prev, topicId]
        );
    };

    const handleCheckboxChange = async (subTopicId, status) => {
        try {
            const newStatus = status === 'Done' ? 'Pending' : 'Done';
            await API.post('/topics/status', { subTopicId, status: newStatus });
            fetchTopics();
        } catch (err) {
            console.error('Status update failed:', err);
        }
    };

    return (
        <>
            <Navbar /> {/* ✅ Add this line back in */}
            <div className="dashboard-container">
                <h2>📘 Student Learning Tracker</h2>
                {topics.map(topic => (
                    <div key={topic.topicId} className="topic-section">
                        <div
                            className="topic-header"
                            onClick={() => toggleTopic(topic.topicId)}
                        >
                            {topic.topicName}
                            <span className="arrow">
                {expandedTopicIds.includes(topic.topicId) ? '▲' : '▼'}
              </span>
                        </div>

                        {expandedTopicIds.includes(topic.topicId) && (
                            <div className="subtopics-container">
                                {topic.subTopics.map(sub => (
                                    <div className="subtopic-card" key={sub.subTopicId}>
                                        <div>
                                            <h4>{sub.title}</h4>
                                            <p className={`level ${sub.level.toLowerCase()}`}>
                                                Difficulty: {sub.level}
                                            </p>
                                            <div className="links">
                                                <a href={sub.youtubeLink} target="_blank" rel="noreferrer">🎥 YouTube</a>
                                                <a href={sub.leetcodeLink} target="_blank" rel="noreferrer">🧩 LeetCode</a>
                                                <a href={sub.articleLink} target="_blank" rel="noreferrer">📚 Article</a>
                                            </div>
                                        </div>
                                        <div className="checkbox-area">
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={sub.status === 'Done'}
                                                    onChange={() =>
                                                        handleCheckboxChange(sub.subTopicId, sub.status)
                                                    }
                                                />
                                                {sub.status}
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};

export default Dashboard;
