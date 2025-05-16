import * as React from 'react';

interface FollowupEmailProps {
  email: string;
}

export const FollowupEmail: React.FC<Readonly<FollowupEmailProps>> = ({
  email,
}) => (
  <div style={{
    backgroundColor: '#000000',
    color: '#ffffff',
    padding: '40px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    maxWidth: '400px',
    margin: '0 auto',
  }}>
    {/* Logo Container */}
    <div style={{
      width: '48px',
      height: '48px',
      backgroundColor: '#000000',
      border: '1px solid #333333',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '32px',
      overflow: 'hidden',
    }}>
      <span style={{
        color: '#ffffff',
        fontSize: '24px',
        fontWeight: 'bold',
      }}>
        G
      </span>
    </div>

    {/* Main Content */}
    <h1 style={{
      fontSize: '32px',
      fontWeight: 'bold',
      margin: '0 0 16px 0',
      color: '#ffffff',
    }}>
      Exciting Updates from Grit!
    </h1>

    <p style={{
      fontSize: '16px',
      lineHeight: '24px',
      color: '#9CA3AF',
      margin: '0 0 16px 0',
    }}>
      Hi there,
    </p>

    <p style={{
      fontSize: '16px',
      lineHeight: '24px',
      color: '#9CA3AF',
      margin: '0 0 16px 0',
    }}>
      We&apos;re reaching out to you as one of our valued waitlist members. We have some exciting updates coming soon, and we wanted
      to make sure you&apos;re in the loop.
    </p>

    <p style={{
      fontSize: '16px',
      lineHeight: '24px',
      color: '#9CA3AF',
      margin: '0 0 16px 0',
    }}>
      Stay tuned for more news, and feel free to reply to this email if you have any questions.
    </p>

    <p style={{
      fontSize: '16px',
      lineHeight: '24px',
      color: '#9CA3AF',
      margin: '0 0 32px 0',
    }}>
      Best regards,<br />
      The Grit Team
    </p>

    {/* Website Link */}
    <div style={{ marginBottom: '32px' }}>
      <a
        href="https://gritai.app"
        style={{
          display: 'inline-block',
          backgroundColor: '#27272A',
          color: '#ffffff',
          padding: '12px 24px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontSize: '16px',
          fontWeight: '500',
          width: '100%',
          textAlign: 'center',
          boxSizing: 'border-box',
        }}
      >
        Visit Grit
      </a>
    </div>

    {/* Footer Address */}
    <div style={{
      color: '#6B7280',
      fontSize: '14px',
      lineHeight: '20px',
    }}>
      <a
        href='https://stratumlabs.ai'
        style={{
          color: '#6B7280',
          textDecoration: 'none',
          margin: '0 0 4px 0',
          display: 'block'
        }}
      >
        Stratum Labs AI
      </a>
      <p style={{ margin: '0' }}>New York, NY</p>
      <p style={{
        margin: '16px 0 0 0',
        fontSize: '12px',
        color: '#4B5563'
      }}>
        This email was sent to {email}
      </p>
    </div>
  </div>
);
