import * as React from 'react';

interface ConfirmationEmailProps {
  token: string;
}

export const ConfirmationEmail: React.FC<Readonly<ConfirmationEmailProps>> = ({
  token,
}) => (
  <div style={{
    backgroundColor: '#000000',
    color: '#ffffff',
    padding: '48px 24px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    maxWidth: '600px',
    height: '100%',
    margin: '0 auto',
  }}>
    {/* Logo Container */}
    <div style={{
      width: '48px',
      height: '48px',
      backgroundColor: '#000000',
      border: '1px solid #383838',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '62px',
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
      fontSize: '24px',
      fontWeight: 'bold',
      margin: '0 0 16px 0',
      color: '#ffffff',
      lineHeight: '1.3',
    }}>
      Confirm your account
    </h1>

    <p style={{
      fontSize: '16px',
      lineHeight: '1.6',
      color: '#9CA3AF',
      margin: '0 0 42px 0',
    }}>
      Thank you for joining the waitlist for Grit. To confirm your account, please click the button below.
    </p>

    {/* Button Container */}
    <div style={{ marginBottom: '62px' }}>
      <a
        href={`${process.env.CONFIRMATION_LINK_BASE_URL}${token}`}
        style={{
          display: 'inline-block',
          backgroundColor: '#0C0A09',
          color: '#ffffff',
          padding: '8px 16px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontSize: '14px',
          fontWeight: '500',
          border: '1px solid #383838',
        }}
      >
        Confirm Account
      </a>
    </div>

    {/* Footer */}
    <div style={{
      borderTop: '1px solid #27272A',
      paddingTop: '62px',
      color: '#6B7280',
    }}>
      <a
        href='https://stratumlabs.ai'
        style={{
          color: '#6B7280',
          textDecoration: 'none',
          margin: '0 0 4px 0',
          display: 'block',
          fontSize: '14px',
          lineHeight: '20px',
        }}
      >
        Stratum Labs AI
      </a>
      <p style={{
        margin: '0',
        fontSize: '14px',
        lineHeight: '20px',
      }}>
        New York, NY
      </p>
    </div>
  </div>
);
