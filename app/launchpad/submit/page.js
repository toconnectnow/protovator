'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function SubmitProject() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        fundingGoal: '',
        category: 'Technology',
        privacyAgreed: false
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [aiAdvice, setAiAdvice] = useState(null);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/signin');
        }
    }, [status, router]);

    if (status === 'loading') {
        return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
    }

    if (!session) {
        return null; // Will redirect
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/launchpad/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    fundingGoal: parseFloat(formData.fundingGoal)
                }),
            });

            const data = await res.json();

            if (data.success) {
                router.push('/launchpad');
            } else {
                setError(data.error || 'Something went wrong');
            }
        } catch (err) {
            setError('Failed to submit project');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen" style={{ padding: 'var(--spacing-lg) 0' }}>
            <div className="container" style={{ maxWidth: '600px' }}>
                <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                    <Link href="/launchpad" style={{ color: '#888', fontSize: '0.9rem' }}>← Back to Launchpad</Link>
                </div>

                <h1 className="hero-text" style={{
                    fontSize: '2.5rem',
                    marginBottom: 'var(--spacing-md)',
                    textAlign: 'center'
                }}>
                    Start a Project
                </h1>

                <div className="glass-panel" style={{ padding: 'var(--spacing-md)' }}>
                    <form onSubmit={handleSubmit}>
                        {error && (
                            <div style={{
                                background: 'rgba(255, 0, 0, 0.1)',
                                border: '1px solid rgba(255, 0, 0, 0.3)',
                                color: '#ff6b6b',
                                padding: '1rem',
                                borderRadius: '8px',
                                marginBottom: '1rem'
                            }}>
                                {error}
                            </div>
                        )}

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Project Title</label>
                            <input
                                type="text"
                                name="title"
                                required
                                value={formData.title}
                                onChange={handleChange}
                                style={{
                                    width: '100%',
                                    padding: '0.8rem',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '8px',
                                    color: '#fff',
                                    fontSize: '1rem'
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Short Description</label>
                            <textarea
                                name="shortDescription"
                                required
                                value={formData.shortDescription}
                                onChange={handleChange}
                                rows="3"
                                style={{
                                    width: '100%',
                                    padding: '0.8rem',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '8px',
                                    color: '#fff',
                                    fontSize: '1rem',
                                    fontFamily: 'inherit'
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Funding Goal ($)</label>
                            <input
                                type="number"
                                name="fundingGoal"
                                required
                                min="1"
                                step="0.01"
                                value={formData.fundingGoal}
                                onChange={handleChange}
                                style={{
                                    width: '100%',
                                    padding: '0.8rem',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '8px',
                                    color: '#fff',
                                    fontSize: '1rem'
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <input
                                type="checkbox"
                                id="privacy"
                                name="privacyAgreed"
                                required
                                checked={formData.privacyAgreed}
                                onChange={handleChange}
                                style={{ width: '1.2rem', height: '1.2rem', accentColor: 'var(--primary-launchpad)' }}
                            />
                            <label htmlFor="privacy" style={{ color: '#ccc', fontSize: '0.9rem' }}>
                                I agree to the <Link href="/legal/privacy" style={{ color: 'var(--primary-launchpad)', textDecoration: 'underline' }}>Privacy Policy</Link>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary btn-launchpad"
                            style={{ width: '100%', opacity: loading ? 0.7 : 1 }}
                        >
                            {loading ? 'Creating...' : 'Create Project'}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}
