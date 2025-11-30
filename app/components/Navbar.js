'use client';

import Link from 'next/link';
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
    const { data: session } = useSession();

    return (
        <nav style={{
            padding: '1rem var(--spacing-sm)',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(10px)',
            position: 'sticky',
            top: 0,
            zIndex: 100
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '0.05em' }}>
                    PROTOVATOR
                </Link>

                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <Link href="/launchpad" style={{ color: '#ccc', fontSize: '0.9rem' }}>Launchpad</Link>
                    <Link href="/lab" style={{ color: '#ccc', fontSize: '0.9rem' }}>Physical Lab</Link>

                    {session ? (
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginLeft: '1rem' }}>
                            <span style={{ fontSize: '0.8rem', color: 'var(--primary-launchpad)' }}>{session.user.name}</span>
                            <button
                                onClick={() => signOut()}
                                style={{
                                    background: 'transparent',
                                    border: '1px solid #444',
                                    color: '#fff',
                                    padding: '0.4rem 0.8rem',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontSize: '0.8rem'
                                }}
                            >
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => signIn()}
                            className="btn-primary"
                            style={{
                                background: 'var(--accent-purple)',
                                padding: '0.5rem 1rem',
                                fontSize: '0.9rem',
                                marginLeft: '1rem'
                            }}
                        >
                            Sign In
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}
