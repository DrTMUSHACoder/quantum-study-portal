import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Forum = () => {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const navigate = useNavigate();

    const categories = ['All', 'General Discussion', 'Quantum Computing Basics', 'NPTEL Course Help', 'Assignments & Problems', 'Projects', 'Announcements'];

    useEffect(() => {
        const stored = localStorage.getItem('qp4_forum_posts');
        if (stored) {
            setPosts(JSON.parse(stored));
        } else {
            const defaults = [
                { id: '1', title: 'Welcome to the Quantum Forum!', author: 'Quantum Admin', date: new Date().toISOString(), category: 'Announcements', content: 'This is the place to discuss all things quantum.', replies: [] },
            ];
            setPosts(defaults);
            localStorage.setItem('qp4_forum_posts', JSON.stringify(defaults));
        }
    }, []);

    const filteredPosts = posts.filter(p => {
        const matchesCat = category === 'All' || p.category === category;
        const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
        return matchesCat && matchesSearch;
    }).sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <div className="forum-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
            <header style={{
                textAlign: 'center',
                marginBottom: '3rem',
                background: 'rgba(30, 41, 59, 0.4)',
                padding: '2.5rem 1rem',
                borderRadius: '20px',
                border: '1px solid var(--glass-border)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}>
                <h1 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '0.75rem', letterSpacing: '1px', fontFamily: "'Outfit'" }}>Community Forum</h1>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>Ask questions, share knowledge, and discuss quantum computing topics with fellow learners.</p>
            </header>

            <div style={{ display: 'flex', gap: '2rem' }}>
                <main style={{ flex: 2 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.1rem', margin: 0 }}>Discussions ({filteredPosts.length})</h2>
                        <Link to="/forum/create" className="btn btn-primary" style={{ fontSize: '0.85rem' }}>+ Create New Post</Link>
                    </div>

                    {filteredPosts.map(post => (
                        <div key={post.id} className="card" onClick={() => navigate(`/forum/post/${post.id}`)} style={{ cursor: 'pointer', marginBottom: '1rem', padding: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', opacity: 0.7 }}>
                                <span>{post.category}</span>
                                <span>{new Date(post.date).toLocaleDateString()}</span>
                            </div>
                            <h3 style={{ fontSize: '1.05rem' }}>{post.title}</h3>
                            <p style={{ opacity: 0.8, fontSize: '0.85rem' }}>{post.content.substring(0, 150)}...</p>
                            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--primary)', fontWeight: '700' }}>
                                <strong style={{ color: 'var(--text-main)', fontWeight: '600' }}>By {post.author}</strong>
                                <span>💬 {post.replies.length} replies</span>
                            </div>
                        </div>
                    ))}
                </main>

                <aside style={{ flex: 1 }}>
                    <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem', background: 'rgba(15, 23, 42, 0.4)' }}>
                        <h3 style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '1px' }}>Search discussions</h3>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="text"
                                placeholder="Search..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                style={{ width: '100%', padding: '0.6rem 2.5rem 0.6rem 0.75rem', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: 'white', borderRadius: '8px', outline: 'none' }}
                            />
                            <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>🔍</span>
                        </div>
                    </div>
                    <div className="card" style={{ padding: '1.5rem', background: 'rgba(15, 23, 42, 0.4)' }}>
                        <h3 style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '1px' }}>Filter by Category</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '1rem' }}>
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setCategory(cat)}
                                    style={{
                                        textAlign: 'left',
                                        padding: '0.5rem',
                                        background: category === cat ? 'var(--primary-glow)' : 'transparent',
                                        border: 'none',
                                        color: 'inherit',
                                        cursor: 'pointer',
                                        fontSize: '0.8rem'
                                    }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Forum;
