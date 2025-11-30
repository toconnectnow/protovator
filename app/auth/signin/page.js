'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import Link from 'next/link';

export default function SignIn() {
    const [email, setEmail] = useState('user@example.com');
    const [password, setPassword] = useState('password');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await signIn('credentials', {
            email,
            password,
            redirect: true,
            callbackUrl: '/'
        });

        if (res?.error) {
            setError('Invalid credentials');
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center container">
            <div className="glass-panel" style={{ padding: 'var(--spacing-xl)', width: '100%', maxWidth: '400px' }}>
                <h1 className="hero-text" style={{ fontSize: '2rem', marginBottom: '1.5rem', textAlign: 'center' }}>Sign In</h1>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.3)',
                                border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff'
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.3)',
                                border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff'
                            }}
                        />
                    </div>

                    {error && <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

                    <button
                        type="submit"
                        className="btn-primary"
                        style={{ width: '100%', background: 'var(--accent-purple)' }}
                    >
                        Sign In
                    </button>
                </form>

                <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: '#888' }}>
                    <p>Demo Credentials:</p>
                    <p>Email: user@example.com</p>
                    <p>Password: password</p>
                </div>

                <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                    <Link href="/" style={{ color: '#888', fontSize: '0.8rem' }}>← Back to Home</Link>
                </div>
            </div>
        </main>
    );
}
