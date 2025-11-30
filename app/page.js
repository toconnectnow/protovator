'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
    return (
        <main className="min-h-screen flex flex-col relative overflow-hidden">
            {/* Background Ambience */}
            <div style={{
                position: 'absolute',
                top: '-20%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '120vw',
                height: '120vw',
                background: 'radial-gradient(circle, rgba(112,0,255,0.1) 0%, rgba(0,0,0,0) 60%)',
                zIndex: -1,
                pointerEvents: 'none'
            }} />

            {/* Hero Section */}
            <section style={{
                minHeight: '80vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                padding: '0 var(--spacing-sm)'
            }}>
                <div className="container">
                    <span style={{
                        color: 'var(--accent-purple)',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        marginBottom: '1rem',
                        display: 'block'
                    }}>
                        The Global Innovation Hub
                    </span>

                    <h1 className="hero-text" style={{
                        fontSize: 'clamp(3rem, 8vw, 6rem)',
                        marginBottom: 'var(--spacing-md)',
                        lineHeight: 1.1
                    }}>
                        PROTOVATOR
                    </h1>

                    <p style={{
                        fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
                        color: '#ccc',
                        maxWidth: '800px',
                        margin: '0 auto var(--spacing-lg)',
                        lineHeight: 1.6
                    }}>
                        Bridging <span style={{ color: 'var(--primary-digital)' }}>Digital</span>,{' '}
                        <span style={{ color: 'var(--primary-physical)' }}>Physical</span>, and{' '}
                        <span style={{ color: 'var(--primary-launchpad)' }}>Entrepreneurial</span> Creation.
                    </p>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/launchpad">
                            <button className="btn-primary btn-launchpad" style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}>
                                Launch a Startup
                            </button>
                        </Link>
                        <Link href="/lab">
                            <button className="btn-primary btn-physical" style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}>
                                Enter the Lab
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Pillars Section */}
            <section className="container" style={{ paddingBottom: 'var(--spacing-xl)' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                    gap: 'var(--spacing-lg)'
                }}>

                    {/* Launchpad Card */}
                    <Link href="/launchpad" style={{ display: 'block' }}>
                        <div className="glass-panel" style={{
                            padding: 'var(--spacing-lg)',
                            height: '100%',
                            transition: 'transform 0.3s ease, border-color 0.3s ease',
                            cursor: 'pointer',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.borderColor = 'var(--primary-launchpad)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.borderColor = 'var(--accent-glass-border)';
                            }}
                        >
                            <div style={{
                                position: 'absolute', top: 0, right: 0, width: '200px', height: '200px',
                                background: 'radial-gradient(circle, rgba(255, 189, 0, 0.1) 0%, rgba(0,0,0,0) 70%)',
                                transform: 'translate(30%, -30%)'
                            }} />

                            <h2 style={{ color: 'var(--primary-launchpad)', fontSize: '2.5rem', marginBottom: '1rem' }}>The Launchpad</h2>
                            <p style={{ color: '#ccc', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: 1.6 }}>
                                The engine for micro-enterprises. Access crowdfunding, incubation programs, and a global marketplace to scale your vision.
                            </p>
                            <span style={{ color: '#fff', textDecoration: 'underline', textUnderlineOffset: '4px' }}>Explore Projects →</span>
                        </div>
                    </Link>

                    {/* Physical Lab Card */}
                    <Link href="/lab" style={{ display: 'block' }}>
                        <div className="glass-panel" style={{
                            padding: 'var(--spacing-lg)',
                            height: '100%',
                            transition: 'transform 0.3s ease, border-color 0.3s ease',
                            cursor: 'pointer',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.borderColor = 'var(--primary-physical)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.borderColor = 'var(--accent-glass-border)';
                            }}
                        >
                            <div style={{
                                position: 'absolute', top: 0, right: 0, width: '200px', height: '200px',
                                background: 'radial-gradient(circle, rgba(0, 255, 157, 0.1) 0%, rgba(0,0,0,0) 70%)',
                                transform: 'translate(30%, -30%)'
                            }} />

                            <h2 style={{ color: 'var(--primary-physical)', fontSize: '2.5rem', marginBottom: '1rem' }}>Physical Lab</h2>
                            <p style={{ color: '#ccc', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: 1.6 }}>
                                Where ideas become reality. Utilize our hardware resources, 3D printing labs, and expert mentorship network.
                            </p>
                            <span style={{ color: '#fff', textDecoration: 'underline', textUnderlineOffset: '4px' }}>Access Resources →</span>
                        </div>
                    </Link>

                </div>
            </section>

            <CookieBanner />
        </main>
    );
}

function CookieBanner() {
    const [show, setShow] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (typeof window !== 'undefined' && !localStorage.getItem('cookieConsent')) {
            setShow(true);
        }
    }, []);

    const handleAccept = () => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('cookieConsent', 'true');
        }
        setShow(false);
    };

    if (!mounted || !show) {
        return null;
    }

    return (
        <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(10px)',
            padding: '1rem var(--spacing-md)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
            zIndex: 1000,
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
            <p style={{ color: '#fff', fontSize: '0.9rem', margin: 0, textAlign: 'center' }}>
                We use cookies to ensure you get the best experience on our website. By continuing to use this site, you agree to our use of cookies.
            </p>
            <button
                onClick={handleAccept}
                style={{
                    background: 'var(--accent-purple)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '0.75rem 1.5rem',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    transition: 'background 0.3s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--accent-purple-dark)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--accent-purple)'}
            >
                Accept
            </button>
        </div>
    );
}
