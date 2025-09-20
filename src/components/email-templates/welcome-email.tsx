import * as React from 'react';

interface WelcomeEmailProps {
  email: string;
}

export const WelcomeEmail: React.FC<Readonly<WelcomeEmailProps>> = ({
  email,
}) => (
  <div style={{
    backgroundColor: '#ffffff',
    color: '#000000',
    padding: '48px 24px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    maxWidth: '600px',
    margin: '0 auto',
  }}>
    {/* Logo Container */}
    <div style={{
      width: '48px',
      height: '48px',
      backgroundColor: '#ffffff',
      border: '1px solid #e5e5e5',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '40px',
    }}>
      <span style={{
        color: '#000000',
        fontSize: '24px',
        fontWeight: 'bold',
      }}>
        G
      </span>
    </div>

    {/* Primary Header */}
    <div style={{ marginBottom: '32px' }}>
      <h1 style={{
        fontSize: '24px',
        fontWeight: 'bold',
        margin: '0 0 16px 0',
        color: '#000000',
        lineHeight: '1.3',
      }}>
        Hey,
      </h1>

      <p style={{
        fontSize: '20px',
        margin: '0',
        color: '#000000',
        opacity: '0.9',
      }}>
        My name is Da&apos;Quan — I&apos;m the developer behind Grit.
      </p>
    </div>

    {/* Introduction Section */}
    <div style={{ marginBottom: '32px' }}>
      <p style={{
        fontSize: '16px',
        lineHeight: '1.6',
        color: '#6b7280',
        margin: '0 0 16px 0',
      }}>
        Thank you for joining the waitlist. I&apos;m excited to have you on board!
      </p>

      <p style={{
        fontSize: '16px',
        lineHeight: '1.6',
        color: '#6b7280',
        margin: '0 0 16px 0',
      }}>
        I&apos;m building Grit because I wanted to experience note taking with the power of AI, executed in a way that bridges the gap between everyday note taking AND power use.
      </p>

      <p style={{
        fontSize: '16px',
        lineHeight: '1.6',
        color: '#6b7280',
        margin: '0',
      }}>
        Something simple, fast, and elegent that <em style={{ color: '#000000' }}>just works.</em>
      </p>
    </div>

    {/* Questions Section with Background */}
    <div style={{
      backgroundColor: '#f9fafb',
      borderRadius: '8px',
      padding: '20px',
      margin: '32px 0',
      textAlign: 'center',
    }}>
      <p style={{
        fontSize: '16px',
        fontWeight: '500',
        color: '#000000',
        margin: '0 0 12px 0',
        textAlign: 'center',
      }}>
        Questions?
      </p>
      <a
        href="https://discord.gg/xVgaz2dQH7"
        target="_blank"
        style={{
          display: 'inline-block',
          backgroundColor: '#f3f4f6',
          color: '#000000',
          padding: '10px 16px',
          borderRadius: '6px',
          textDecoration: 'none',
          fontSize: '12px',
          fontWeight: '500',
          border: '1px solid #d1d5db',
          textAlign: 'center',
        }}
      >
        👾 Join us on Discord
      </a>
    </div>

    {/* Footer */}
    <div style={{
      borderTop: '1px solid #e5e7eb',
      paddingTop: '24px',
      color: '#9ca3af',
    }}>
      <p style={{
        fontSize: '16px',
        margin: '0 0 4px 0',
      }}>
        Best,
      </p>
      <p style={{
        fontSize: '16px',
        margin: '0 0 24px 0',
        color: '#000000',
      }}>
        Da&apos;Quan
      </p>
      <p style={{
        fontSize: '12px',
        color: '#6b7280',
        margin: '0',
      }}>
        This email was sent to {email}
      </p>
    </div>
  </div>
);
