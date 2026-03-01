import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Post = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [reply, setReply] = useState('');

    useEffect(() => {
        const stored = localStorage.getItem('qp4_forum_posts');
        if (stored) {
            const posts = JSON.parse(stored);
            setPost(posts.find(p => p.id === id));
        }
    }, [id]);

    const handleReply = () => {
        if (!reply.trim()) return;
        const stored = localStorage.getItem('qp4_forum_posts');
        const posts = JSON.parse(stored);
        const postIdx = posts.findIndex(p => p.id === id);

        const newReply = {
            author: 'Current User', // Simplified for this example
            date: new Date().toISOString(),
            content: reply
        };

        posts[postIdx].replies.push(newReply);
        localStorage.setItem('qp4_forum_posts', JSON.stringify(posts));
        setPost({ ...posts[postIdx] });
        setReply('');
    };

    if (!post) return <div>Loading...</div>;

    return (
        <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '1rem' }}>
            <button onClick={() => navigate('/forum')} className="btn btn-outline" style={{ marginBottom: '1rem' }}>&larr; Back to Forum</button>
            <div className="card" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', opacity: 0.7, fontSize: '0.7rem' }}>
                    <span>{post.category}</span>
                    <span>{new Date(post.date).toLocaleString()}</span>
                </div>
                <h1 style={{ fontSize: '1.4rem' }}>{post.title}</h1>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.6', margin: '2rem 0', whiteSpace: 'pre-wrap' }}>{post.content}</p>

                <hr style={{ opacity: 0.1, marginBottom: '1rem' }} />
                <strong style={{ fontSize: '0.9rem' }}>By {post.author}</strong>
            </div>

            <div style={{ marginTop: '3rem' }}>
                <h2 style={{ fontSize: '1.1rem' }}>Replies ({post.replies.length})</h2>
                {post.replies.map((r, i) => (
                    <div key={i} className="card" style={{ padding: '1rem', marginTop: '1rem', background: 'rgba(255,255,255,0.02)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', opacity: 0.6 }}>
                            <strong>{r.author}</strong>
                            <span>{new Date(r.date).toLocaleDateString()}</span>
                        </div>
                        <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>{r.content}</p>
                    </div>
                ))}
            </div>

            <div className="card" style={{ marginTop: '2rem', padding: '1.5rem' }}>
                <h3>Post a reply</h3>
                <textarea
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    style={{ width: '100%', height: '100px', marginTop: '1rem', padding: '0.5rem' }}
                    placeholder="Share your thoughts..."
                />
                <button
                    onClick={handleReply}
                    className="btn btn-primary"
                    style={{ marginTop: '1rem', width: '100%' }}
                >
                    Submit Reply
                </button>
            </div>
        </div>
    );
};

export default Post;
