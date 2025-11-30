import Link from 'next/link';

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen container" style={{ padding: 'var(--spacing-lg) var(--spacing-sm)' }}>
            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                <Link href="/" style={{ color: '#888', fontSize: '0.9rem' }}>← Back to Home</Link>
            </div>

            <h1 className="hero-text" style={{ fontSize: '3rem', marginBottom: 'var(--spacing-md)' }}>Privacy Policy</h1>

            <div className="glass-panel" style={{ padding: 'var(--spacing-md)', color: '#ccc', lineHeight: 1.6 }}>
                <p style={{ marginBottom: '1rem' }}><strong>Effective Date:</strong> November 29, 2025</p>

                <h2 style={{ color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>1. Information We Collect</h2>
                <p>We collect information you provide directly to us, such as when you create an account, submit a project, or request mentorship. This includes your name, email address, and project details.</p>

                <h2 style={{ color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>2. How We Use Your Information</h2>
                <p>We use your information to operate the ProtoVator platform, facilitate crowdfunding campaigns, connect you with mentors, and improve our services.</p>

                <h2 style={{ color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>3. Data Sharing</h2>
                <p>We do not sell your personal data. We may share your information with third-party service providers (e.g., payment processors, manufacturing partners) only as necessary to provide our services.</p>

                <h2 style={{ color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>4. Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact us at privacy@protovator.com.</p>
            </div>
        </main>
    );
}
