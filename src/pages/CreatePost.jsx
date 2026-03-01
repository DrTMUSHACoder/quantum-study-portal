import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('General Discussion');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const stored = localStorage.getItem('qp4_forum_posts');
        const posts = stored ? JSON.parse(stored) : [];

        const newPost = {
            id: Date.now().toString(),
            title,
            category,
            content,
            author: 'Current User',
            date: new Date().toISOString(),
            replies: []
        };

        posts.push(newPost);
        localStorage.setItem('qp4_forum_posts', JSON.stringify(posts));
        navigate('/forum');
    };

    return (
        <div style={{ maxWidth: '600px', margin: '4rem auto', padding: '2rem' }} className="card">
            <h2 style={{ marginBottom: '2rem', fontSize: '1.2rem', color: 'var(--primary)' }}>Create New Discussion</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.8rem', opacity: 0.8 }}>Title</label>
                    <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{ width: '100%', padding: '0.75rem', fontSize: '0.9rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', color: 'var(--text-main)', borderRadius: '8px' }}
                        placeholder="What's on your mind?"
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.8rem', opacity: 0.8 }}>Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        style={{ width: '100%', padding: '0.75rem', fontSize: '0.9rem', background: 'rgba(0,0,0,0.2)', color: 'var(--text-main)', border: '1px solid var(--glass-border)', borderRadius: '8px' }}
                    >
                        <option style={{ background: '#1e293b', color: '#fff' }}>General Discussion</option>
                        <option style={{ background: '#1e293b', color: '#fff' }}>Quantum Computing Basics</option>
                        <option style={{ background: '#1e293b', color: '#fff' }}>NPTEL Course Help</option>
                        <option style={{ background: '#1e293b', color: '#fff' }}>Assignments & Problems</option>
                        <option style={{ background: '#1e293b', color: '#fff' }}>Projects</option>
                    </select>
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.8rem', opacity: 0.8 }}>Description</label>
                    <textarea
                        required
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        style={{ width: '100%', height: '120px', padding: '0.75rem', fontSize: '0.9rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', color: 'var(--text-main)', borderRadius: '8px', resize: 'none' }}
                        placeholder="Provide more details..."
                    />
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button type="button" onClick={() => navigate('/forum')} className="btn" style={{ flex: 1 }}>Cancel</button>
                    <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
                        Post Discussion
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePost;
