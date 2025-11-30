'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Lab() {
    const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success

    const handleMentorshipSubmit = async (e) => {
        e.preventDefault();
        setFormStatus('submitting');

        const formData = {
            name: e.target.name.value,
            email: e.target.email.value,
            interestArea: e.target.interestArea.value
        };

        try {
            const res = await fetch('/api/lab/mentors', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (data.success) {
                setFormStatus('success');
            } else {
                alert('Failed to submit request: ' + data.error);
                setFormStatus('idle');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setFormStatus('idle');
        }
    };

    return (
        <main className="min-h-screen" style={{ padding: 'var(--spacing-lg) 0' }}>
            <div className="container">
                <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                    <Link href="/" style={{ color: '#888', fontSize: '0.9rem' }}>← Back to Ecosystem</Link>
                </div>

                {/* Hero Section */}
                <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
                    <h1 className="hero-text" style={{
                        fontSize: '3.5rem',
                        background: 'linear-gradient(to right, var(--primary-physical), #fff)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: 'var(--spacing-md)'
                    }}>
                        The Physical Lab
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: '#ccc', maxWidth: '800px', margin: '0 auto' }}>
                        Bridging the gap between digital concepts and physical reality. <br />
                        Access state-of-the-art machinery, expert mentorship, and a global network of manufacturers.
                    </p>
                </div>

                {/* Resources Grid */}
                <h2 style={{ color: '#fff', marginBottom: 'var(--spacing-md)', fontSize: '2rem' }}>Lab Resources</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-xl)' }}>

                    <div className="glass-panel" style={{ padding: 'var(--spacing-md)' }}>
                        <div style={{ color: 'var(--primary-physical)', fontSize: '2rem', marginBottom: '1rem' }}>🖨️</div>
                        <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>Rapid Prototyping</h3>
                        <p style={{ color: '#aaa', lineHeight: 1.6 }}>
                            Access to industrial SLA and FDM 3D printers for high-fidelity prototypes.
                        </p>
                    </div>

                    <div className="glass-panel" style={{ padding: 'var(--spacing-md)' }}>
                        <div style={{ color: 'var(--primary-physical)', fontSize: '2rem', marginBottom: '1rem' }}>⚙️</div>
                        <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>CNC & Machining</h3>
                        <p style={{ color: '#aaa', lineHeight: 1.6 }}>
                            Precision milling and laser cutting for metal, wood, and acrylic parts.
                        </p>
                    </div>

                    <div className="glass-panel" style={{ padding: 'var(--spacing-md)' }}>
                        <div style={{ color: 'var(--primary-physical)', fontSize: '2rem', marginBottom: '1rem' }}>🔌</div>
                        <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>Electronics Bench</h3>
                        <p style={{ color: '#aaa', lineHeight: 1.6 }}>
                            Oscilloscopes, soldering stations, and PCB testing equipment.
                        </p>
                    </div>
                </div>

                {/* Partners Section */}
                <div style={{ marginBottom: 'var(--spacing-xl)', padding: 'var(--spacing-md)', background: 'rgba(255,255,255,0.02)', borderRadius: '16px' }}>
                    <h2 style={{ color: '#fff', marginBottom: 'var(--spacing-md)', textAlign: 'center' }}>Manufacturing Partners</h2>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--spacing-lg)', flexWrap: 'wrap', alignItems: 'center' }}>
                        {['PCBWay', 'Prusa Research', 'DigiKey', 'Adafruit'].map(partner => (
                            <span key={partner} style={{
                                fontSize: '1.5rem',
                                fontWeight: 700,
                                color: '#555',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em'
                            }}>
                                {partner}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Mentorship Form */}
                <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <div className="glass-panel" style={{ padding: 'var(--spacing-lg)' }}>
                        <h2 style={{ color: '#fff', marginBottom: '0.5rem', textAlign: 'center' }}>Request Mentorship</h2>
                        <p style={{ color: '#888', textAlign: 'center', marginBottom: 'var(--spacing-md)' }}>
                            Connect with hardware experts to guide your product development.
                        </p>

                        {formStatus === 'success' ? (
                            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--primary-physical)' }}>
                                <h3>Request Sent!</h3>
                                <p style={{ color: '#ccc', marginTop: '0.5rem' }}>We will contact you shortly.</p>
                                <button
                                    onClick={() => setFormStatus('idle')}
                                    style={{
                                        marginTop: '1rem',
                                        background: 'transparent',
                                        border: '1px solid var(--primary-physical)',
                                        color: 'var(--primary-physical)',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Send another
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleMentorshipSubmit}>
                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Name</label>
                                    <input type="text" name="name" required style={{
                                        width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.3)',
                                        border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff'
                                    }} />
                                </div>
                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Email</label>
                                    <input type="email" name="email" required style={{
                                        width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.3)',
                                        border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff'
                                    }} />
                                </div>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Area of Interest</label>
                                    <select name="interestArea" style={{
                                        width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.3)',
                                        border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff'
                                    }}>
                                        <option>PCB Design</option>
                                        <option>Industrial Design</option>
                                        <option>Manufacturing</option>
                                        <option>Firmware</option>
                                    </select>
                                </div>
                                <button
                                    type="submit"
                                    disabled={formStatus === 'submitting'}
                                    className="btn-primary btn-physical"
                                    style={{ width: '100%', opacity: formStatus === 'submitting' ? 0.7 : 1 }}
                                >
                                    {formStatus === 'submitting' ? 'Sending...' : 'Request Access'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>

            </div>
        </main>
    );
}
