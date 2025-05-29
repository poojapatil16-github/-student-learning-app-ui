import React, { useEffect, useState } from 'react';
import API from '../services/api';
import Navbar from '../components/Navbar';

export default function Progress() {
    const [progress, setProgress] = useState({
        easy: { done: 0, total: 0 },
        medium: { done: 0, total: 0 },
        hard: { done: 0, total: 0 },
    });

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const res = await API.get('/user/progress');

                // convert summary array into the desired object
                const summaryObj = { easy: {}, medium: {}, hard: {} };
                res.data.summary.forEach(({ level, total, completed }) => {
                    summaryObj[level.toLowerCase()] = {
                        done: completed,
                        total: total,
                    };
                });

                setProgress(summaryObj);
            } catch (err) {
                console.error('Failed to fetch progress:', err);
            }
        };
        fetchProgress();
    }, []);

    const calcPercent = (done, total) =>
        total === 0 ? 0 : Math.round((done / total) * 100);

    const barColor = (level) => {
        switch (level) {
            case 'easy': return '#4caf50';
            case 'medium': return '#ff9800';
            case 'hard': return '#f44336';
            default: return '#ccc';
        }
    };

    return (
        <>
            <Navbar />
            <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>📊 Progress Summary</h2>

                {['easy', 'medium', 'hard'].map((level) => {
                    const { done, total } = progress[level];
                    const percent = calcPercent(done, total);
                    return (
                        <div key={level} style={{ marginBottom: '2rem' }}>
                            <h4 style={{ textTransform: 'capitalize', marginBottom: '0.5rem' }}>
                                {level} – {done} of {total} done ({percent}%)
                            </h4>
                            <div style={{
                                background: '#eee',
                                borderRadius: '5px',
                                height: '20px',
                                overflow: 'hidden'
                            }}>
                                <div
                                    style={{
                                        width: `${percent}%`,
                                        backgroundColor: barColor(level),
                                        height: '100%',
                                        transition: 'width 0.5s ease'
                                    }}
                                ></div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}