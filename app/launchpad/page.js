'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Launchpad() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProjects() {
            try {
                const res = await fetch('/api/launchpad/projects');
                const data = await res.json();
                if (data.success) {
                    setProjects(data.data);
                }
            } catch (error) {
                console.error('Failed to fetch projects:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchProjects();
    }, []);

    return (
        <main className="min-h-screen" style={{ padding: 'var(--spacing-lg) 0' }}>
            <div className="container">
                <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                    <Link href="/" style={{ color: '#888', fontSize: '0.9rem' }}>← Back to Ecosystem</Link>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
                    <h1 className="hero-text" style={{
                        fontSize: '3rem',
                        background: 'linear-gradient(to right, var(--primary-launchpad), #fff)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        margin: 0
                    }}>
                        The Launchpad
                    </h1>
                    <Link href="/launchpad/submit">
                        <button className="btn-primary btn-launchpad" style={{ fontSize: '0.9rem', padding: '0.8rem 1.5rem' }}>
                            Start a Project
                        </button>
                    </Link>
                </div>

                <p style={{ fontSize: '1.2rem', color: '#ccc', maxWidth: '800px', marginBottom: 'var(--spacing-lg)' }}>
                    The engine for micro-enterprises. Discover groundbreaking projects and help them take flight.
                </p>

                {loading ? (
                    <div style={{ color: '#888', textAlign: 'center', padding: 'var(--spacing-lg)' }}>Loading projects...</div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--spacing-md)' }}>
                        {projects.map((project) => (
                            <div key={project.id} className="glass-panel" style={{
                                padding: 'var(--spacing-md)',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'transform 0.2s ease',
                                cursor: 'pointer'
                            }}>
                                {/* Image Placeholder */}
                                <div style={{
                                    width: '100%',
                                    height: '180px',
                                    background: '#222',
                                    borderRadius: '8px',
                                    marginBottom: 'var(--spacing-sm)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#555'
                                }}>
                                    {project.mediaUrls?.[0] ? 'Image' : 'No Image'}
                                </div>

                                <div style={{ marginBottom: 'auto' }}>
                                    <span style={{
                                        fontSize: '0.8rem',
                                        color: 'var(--primary-launchpad)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                        fontWeight: 600
                                    }}>
                                        {project.status}
                                    </span>
                                    <h3 style={{ color: '#fff', margin: '0.5rem 0', fontSize: '1.4rem' }}>{project.title}</h3>
                                    <p style={{ color: '#aaa', fontSize: '0.9rem', lineHeight: 1.5 }}>
                                        {project.shortDescription}
                                    </p>
                                </div>

                                {/* Funding Progress */}
                                <div style={{ marginTop: 'var(--spacing-md)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                        <span style={{ color: '#fff', fontWeight: 600 }}>${project.currentFunding.toLocaleString()}</span>
                                        <span style={{ color: '#888' }}>of ${project.fundingGoal.toLocaleString()}</span>
                                    </div>
                                    <div style={{
                                        width: '100%',
                                        height: '6px',
                                        background: 'rgba(255,255,255,0.1)',
                                        borderRadius: '3px',
                                        overflow: 'hidden'
                                    }}>
                                        <div style={{
                                            width: `${Math.min((project.currentFunding / project.fundingGoal) * 100, 100)}%`,
                                            height: '100%',
                                            background: 'var(--primary-launchpad)',
                                            borderRadius: '3px'
                                        }} />
                                    </div>
                                    <div style={{ marginTop: '0.5rem', textAlign: 'right', fontSize: '0.8rem', color: '#888' }}>
                                        {Math.round((project.currentFunding / project.fundingGoal) * 100)}% Funded
                                    </div>

                                    <button
                                        onClick={async (e) => {
                                            e.stopPropagation(); // Prevent card click
                                            try {
                                                const res = await fetch('/api/launchpad/checkout', {
                                                    method: 'POST',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({
                                                        projectId: project.id,
                                                        amount: 50 // Default pledge amount for demo
                                                    })
                                                });
                                                const data = await res.json();
                                                if (data.success && data.url) {
                                                    window.location.href = data.url;
                                                } else {
                                                    alert('Checkout failed');
                                                }
                                            } catch (err) {
                                                console.error(err);
                                                alert('Checkout error');
                                            }
                                        }}
                                        className="btn-primary btn-launchpad"
                                        style={{
                                            width: '100%',
                                            marginTop: '1rem',
                                            padding: '0.5rem',
                                            fontSize: '0.9rem'
                                        }}
                                    >
                                        Pledge $50
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
