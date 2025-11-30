import Link from 'next/link';

export default function TermsOfService() {
    return (
        <main className="min-h-screen container" style={{ padding: 'var(--spacing-lg) var(--spacing-sm)' }}>
            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                <Link href="/" style={{ color: '#888', fontSize: '0.9rem' }}>← Back to Home</Link>
            </div>

            <h1 className="hero-text" style={{ fontSize: '3rem', marginBottom: 'var(--spacing-md)' }}>Terms of Service</h1>

            <div className="glass-panel" style={{ padding: 'var(--spacing-md)', color: '#ccc', lineHeight: 1.6 }}>
                <p style={{ marginBottom: '1rem' }}><strong>Effective Date:</strong> November 29, 2025</p>

                <h2 style={{ color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>1. Acceptance of Terms</h2>
                <p>By accessing or using ProtoVator, you agree to be bound by these Terms of Service.</p>

                <h2 style={{ color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>2. User Conduct</h2>
                <p>You agree not to use the platform for any illegal or unauthorized purpose. You are solely responsible for your conduct and any data, text, information, names, graphics, photos, profiles, audio, and video clips that you submit, post, and display on the platform.</p>

                <h2 style={{ color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>3. Intellectual Property</h2>
                <p>You retain ownership of the content you submit to ProtoVator. However, by submitting content, you grant us a worldwide, non-exclusive license to use, distribute, and display your content in connection with the service.</p>

                <h2 style={{ color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>4. Termination</h2>
                <p>We reserve the right to suspend or terminate your account at any time for any reason, with or without notice.</p>
            </div>
        </main>
    );
}
