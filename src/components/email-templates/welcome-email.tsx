import * as React from 'react';

interface WelcomeEmailProps {
  email: string;
}

export const WelcomeEmail: React.FC<Readonly<WelcomeEmailProps>> = ({
  email,
}) => (
  <div style={{
    backgroundColor: '#000000',
    color: '#ffffff',
    padding: '48px 24px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    maxWidth: '600px',
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
      marginBottom: '40px',
    }}>
      <span style={{
        color: '#ffffff',
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
        color: '#ffffff',
        lineHeight: '1.3',
      }}>
        Hey,
      </h1>

      <p style={{
        fontSize: '20px',
        margin: '0',
        color: '#ffffff',
        opacity: '0.9',
      }}>
        My name is Gleam — I&apos;m the founder and CEO of Grit.
      </p>
    </div>

    {/* Introduction Section */}
    <div style={{ marginBottom: '32px' }}>
      <p style={{
        fontSize: '16px',
        lineHeight: '1.6',
        color: '#9CA3AF',
        margin: '0 0 16px 0',
      }}>
        Thank you for joining the waitlist. We&apos;re excited to have you on board!
      </p>

      <p style={{
        fontSize: '16px',
        lineHeight: '1.6',
        color: '#9CA3AF',
        margin: '0 0 16px 0',
      }}>
        I&apos;m building Grit because I wanted to experience note taking with the power of AI, executed in a way that bridges the gap between everyday note taking AND power use.
      </p>

      <p style={{
        fontSize: '16px',
        lineHeight: '1.6',
        color: '#9CA3AF',
        margin: '0',
      }}>
        Something simple, fast, and elegent that <em style={{ color: '#ffffff' }}>just works.</em>
      </p>
    </div>

    {/* Call to Action Section */}
    <div style={{ marginBottom: '32px' }}>
      <p style={{
        fontSize: '18px',
        color: '#ffffff',
        margin: '0 0 16px 0',
        fontWeight: '500',
      }}>
        Want to learn more?
      </p>

      <p style={{
        fontSize: '16px',
        lineHeight: '1.6',
        color: '#9CA3AF',
        margin: '0 0 8px 0',
      }}>
        Visit the forum and join the conversation for real time updates.
      </p>

      <p style={{
        fontSize: '16px',
        lineHeight: '1.6',
        color: '#9CA3AF',
        margin: '0 0 24px 0',
      }}>
        If you don&apos;t want to join, don&apos;t worry I keep everyone in the loop via email anyway!
      </p>

      <a
        href="https://forum.gritai.app"
        style={{
          display: 'inline-block',
          backgroundColor: '#27272A',
          color: '#ffffff',
          padding: '12px 24px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontSize: '16px',
          fontWeight: '500',
          border: '1px solid #383838',
        }}
      >
        Visit the Forum
      </a>
    </div>

    {/* Footer */}
    <div style={{
      borderTop: '1px solid #27272A',
      paddingTop: '24px',
      color: '#6B7280',
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
        color: '#ffffff',
      }}>
        Gleam
      </p>
      <p style={{
        fontSize: '12px',
        color: '#4B5563',
        margin: '0',
      }}>
        This email was sent to {email}
      </p>
    </div>
  </div>
);
