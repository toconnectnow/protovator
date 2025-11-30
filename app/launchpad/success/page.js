import Link from 'next/link';

export default function Success() {
    return (
        <main className="min-h-screen container flex flex-col items-center justify-center" style={{ textAlign: 'center' }}>
            <div className="glass-panel" style={{ padding: 'var(--spacing-xl)', maxWidth: '600px' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
                <h1 className="hero-text" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Pledge Successful!</h1>
                <p style={{ color: '#ccc', fontSize: '1.2rem', marginBottom: '2rem' }}>
                    Thank you for supporting innovation. Your contribution helps bring this project to life.
                </p>
                <Link href="/launchpad">
                    <button className="btn-primary btn-launchpad">
                        Back to Launchpad
                    </button>
                </Link>
            </div>
        </main>
    );
}
