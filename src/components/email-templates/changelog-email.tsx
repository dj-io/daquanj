import * as React from 'react';

interface ChangelogEmailProps {
  email: string;
}

const baseUrl =
	process.env.NEXT_PUBLIC_SITE_URL
	|| (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

export const ChangelogEmail: React.FC<Readonly<ChangelogEmailProps>> = ({
  email,
}) => (
  <div style={{
    backgroundColor: '#000000',
    color: '#ffffff',
    padding: '40px 24px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    maxWidth: '600px',
    margin: '0 auto',
  }}>
    {/* Logo Container */}
    <div style={{
      width: '32px',
      height: '32px',
      backgroundColor: '#000000',
      border: '1px solid #383838',
      borderRadius: '6px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '32px',
    }}>
      <span style={{
        color: '#ffffff',
        fontSize: '18px',
        fontWeight: 'bold',
      }}>
        G
      </span>
    </div>

    {/* Primary Header */}
    <div style={{ marginBottom: '24px' }}>
      <h1 style={{
        fontSize: '20px',
        fontWeight: '600',
        margin: '0 0 12px 0',
        color: '#ffffff',
        lineHeight: '1.4',
      }}>
        You&apos;re absolutely right!
      </h1>
    </div>

    {/* Introduction Section */}
    <div style={{ marginBottom: '24px' }}>
      <p style={{
        fontSize: '15px',
        lineHeight: '1.5',
        color: '#A1A1AA',
        margin: '0 0 16px 0',
      }}>
        Great writers and note takers aren’t looking for AI to do the work for them. Just like the best programmers, they want tools that accelerate ideas and spark inspiration—while keeping full control of the creative process. There’s something satisfying about shaping a page yourself, solving real problems, and seeing your own thoughts take form. That spirit—the love for <em style={{ color: '#ffffff' }}>“getting to done,” not just rushing to “done”</em>—is what inspires Grit.
      </p>

      <p style={{
        fontSize: '15px',
        lineHeight: '1.5',
        color: '#A1A1AA',
        margin: '0 0 16px 0',
      }}>
        When you explore the features below, I hope they showcase the vision I have for Grit: a productivity tool that&apos;s both simple AND powerful. Grit is designed to remove the trade-off we&apos;ve always faced with productivity tools, simplicity or capability. It&apos;s built to answer the questions I and others have been asking; What are the most useful AI integrations for doers, thinkers and creatives? What tool delivers on that while also keeping the core deliverable, a great writing environment, front and center?
      </p>
      <div style={{ marginBottom: '24px' }}>
        <p style={{
          fontSize: '16px',
          color: '#ffffff',
          margin: '0 0 16px 0',
          fontWeight: '500',
        }}>
          Grit Private Beta is here for macOS! →
        </p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
          <a
            href="https://grit-desktop-releases.s3.us-east-2.amazonaws.com/Grit-0.1.9-universal.dmg"
            style={{
              display: 'inline-block',
              backgroundColor: '#27272A',
              color: '#ffffff',
              padding: '10px 16px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '12px',
              fontWeight: '500',
              border: '1px solid #383838',
            }}
          >
            Download → macOS Universal (Intel + Apple Silicon)
          </a>
          <a
            href="https://grit-desktop-releases.s3.us-east-2.amazonaws.com/Grit-0.1.9-arm64.dmg"
            style={{
              display: 'inline-block',
              backgroundColor: '#27272A',
              color: '#ffffff',
              padding: '10px 16px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '12px',
              fontWeight: '500',
              border: '1px solid #383838',
            }}
          >
            Download → macOS Silicon (Apple M1+)
          </a>
        </div>
        <p style={{
            fontSize: '12px',
            color: '#A1A1AA',
            margin: '0 0 16px 0',
        }}>
            Requires version 11 or later
        </p>
      </div>
    </div>

    {/* Divider */}
    <div style={{
      height: '1px',
      backgroundColor: '#27272A',
      margin: '32px 0',
    }}></div>

    {/* Feature 1 - Text Left, Image Right */}
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: '24px',
      marginBottom: '32px',
      textAlign: 'left',
    }}>
      <div style={{ flex: '1' }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: '600',
          color: '#ffffff',
          margin: '0 0 8px 0',
        }}>
          Notespaces
        </h3>
        <p style={{
          fontSize: '14px',
          lineHeight: '1.5',
          color: '#A1A1AA',
          margin: '0',
        }}>
          Just like workspaces, notespaces make it easy to capture thoughts across different parts of your life—so nothing gets lost or mixed together. You&apos;ll set up your first notespace when you open Grit, nothing works without one.
        </p>
      </div>
      <div style={{ flex: '1' }}>
        <img
          src={`${baseUrl}/images/changelog/0.1.0/notespaces.gif`}
          alt='Notespaces'
          style={{
            width: '100%',
            borderRadius: '6px',
            display: 'block',
            border: '1px solid #383838',
          }}
        />
      </div>
    </div>

    {/* Divider */}
    <div style={{
      height: '1px',
      backgroundColor: '#27272A',
      margin: '24px 0',
    }}></div>

    {/* Feature 2 - Image Left, Text Right */}
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: '24px',
      marginBottom: '32px',
      textAlign: 'left',
    }}>
      <div style={{ flex: '1' }}>
        <img
          src={`${baseUrl}/images/changelog/0.1.0/pages-folders.gif`}
          alt='Pages & Folders'
          style={{
            width: '100%',
            borderRadius: '6px',
            display: 'block',
            border: '1px solid #383838',
          }}
        />
      </div>
      <div style={{ flex: '1' }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: '600',
          color: '#ffffff',
          margin: '0 0 8px 0',
        }}>
          Pages & Folders
        </h3>
        <p style={{
          fontSize: '14px',
          lineHeight: '1.5',
          color: '#A1A1AA',
          margin: '0',
        }}>
          Grit uses a familiar folder-and-file system, so you can organize notes your way from day one. Quickly capture ideas as pinned pages, then sort and structure them whenever you want.
        </p>
      </div>
    </div>

    {/* Divider */}
    <div style={{
      height: '1px',
      backgroundColor: '#27272A',
      margin: '24px 0',
    }}></div>

    {/* Feature 3 - Text Left, Image Right */}
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: '24px',
      marginBottom: '32px',
      textAlign: 'left',
    }}>
      <div style={{ flex: '1' }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: '600',
          color: '#ffffff',
          margin: '0 0 8px 0',
        }}>
          Icons, Emojis or None
        </h3>
        <p style={{
          fontSize: '14px',
          lineHeight: '1.5',
          color: '#A1A1AA',
          margin: '0',
        }}>
          Add an emoji or icon to any folder or page for quick visual cues—or go with no icon at all. With the inline icon picker, you can adapt your notespace to match your style, wherever you see an emoji or icon, just click to change it.
        </p>
      </div>
      <div style={{ flex: '1' }}>
        <img
          src={`${baseUrl}/images/changelog/0.1.0/icons-emojis-none.gif`}
          alt='Icons, Emojis or None'
          style={{
            width: '100%',
            borderRadius: '6px',
            display: 'block',
            border: '1px solid #383838',
          }}
        />
      </div>
    </div>

    {/* Divider */}
    <div style={{
      height: '1px',
      backgroundColor: '#27272A',
      margin: '24px 0',
    }}></div>

    {/* Feature 4 - Image Left, Text Right */}
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: '24px',
      marginBottom: '32px',
      textAlign: 'left',
    }}>
      <div style={{ flex: '1' }}>
        <img
          src={`${baseUrl}/images/changelog/0.1.0/editor.gif`}
          alt='Editor'
          style={{
            width: '100%',
            borderRadius: '6px',
            display: 'block',
            border: '1px solid #383838',
          }}
        />
      </div>
      <div style={{ flex: '1' }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: '600',
          color: '#ffffff',
          margin: '0 0 8px 0',
        }}>
          Editor
        </h3>
        <p style={{
          fontSize: '14px',
          lineHeight: '1.5',
          color: '#A1A1AA',
          margin: '0',
        }}>
          Grit&apos;s editor combines block-based structure with markdown and rich text—type in markdown, highlight to format, and use the slash command to add or change any block. Every note and section is easily draggable, so organizing and editing is always flexible.
        </p>
      </div>
    </div>

    {/* Divider */}
    <div style={{
      height: '1px',
      backgroundColor: '#27272A',
      margin: '24px 0',
    }}></div>

    {/* Feature 5 - Text Left, Image Right */}
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: '24px',
      marginBottom: '32px',
      textAlign: 'left',
    }}>
      <div style={{ flex: '1' }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: '600',
          color: '#ffffff',
          margin: '0 0 8px 0',
        }}>
          Notepad
        </h3>
        <p style={{
          fontSize: '14px',
          lineHeight: '1.5',
          color: '#A1A1AA',
          margin: '0',
        }}>
          Notepad lets you pin any page on top of your workflow—keep to-dos, reference material, or key notes visible while working in other apps. Simple, but having my task list &quot;always on top&quot; unlocked more consistent productivity over longer stretches, which is why it made the first version.
        </p>
      </div>
      <div style={{ flex: '1' }}>
        <img
          src={`${baseUrl}/images/changelog/0.1.0/floating-notes.gif`}
          alt='Notepad'
          style={{
            width: '100%',
            borderRadius: '6px',
            display: 'block',
            border: '1px solid #383838',
          }}
        />
      </div>
    </div>

    {/* Divider */}
    <div style={{
      height: '1px',
      backgroundColor: '#27272A',
      margin: '24px 0',
    }}></div>

    {/* Feature 6 - Image Left, Text Right */}
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: '24px',
      marginBottom: '32px',
      textAlign: 'left',
    }}>
      <div style={{ flex: '1' }}>
        <img
          src={`${baseUrl}/images/changelog/0.1.0/ai.gif`}
          alt='Assistant/Agent'
          style={{
            width: '100%',
            borderRadius: '6px',
            display: 'block',
            border: '1px solid #383838',
          }}
        />
      </div>
      <div style={{ flex: '1' }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: '600',
          color: '#ffffff',
          margin: '0 0 8px 0',
        }}>
          Assistant/Agent
        </h3>
        <p style={{
          fontSize: '14px',
          lineHeight: '1.5',
          color: '#A1A1AA',
          margin: '0 0 12px 0',
        }}>
          Ask questions, research, or generate ideas—switch between AI models and modes as you work, with context automatically pulled from your open pages.
        </p>
        <p style={{
          fontSize: '14px',
          lineHeight: '1.5',
          color: '#A1A1AA',
          margin: '0',
          fontWeight: '500',
        }}>
          Search the web: All AI models in Grit can search the web on your behalf using natural language—just include phrases like &quot;search the web&quot; or &quot;current news&quot; in your prompt to pull in live information.
        </p>
      </div>
    </div>

    <p style={{
      fontSize: '14px',
      lineHeight: '1.5',
      color: '#A1A1AA',
      margin: '0 0 24px 0',
    }}>
      The roadmap ahead is full, but I’m open to all feedback—no such thing as too small. Reply to this email with your thoughts or join the Discord for ongoing discussion.
    </p>


    {/* Call to Action Section */}
    <div style={{ marginBottom: '24px' }}>
      <p style={{
        fontSize: '14px',
        lineHeight: '1.5',
        color: '#A1A1AA',
        margin: '0 0 16px 0',
      }}>
        Check out the detailed feature breakdown on <a href="https://stratumlabs.medium.com/whats-new-in-grit-0-1-9-d082d4f742d5" style={{ color: '#ffffff' }}>Medium</a> if you want the full story behind each decision.
      </p>

      <p style={{
        fontSize: '14px',
        margin: '0 0 4px 0',
        color: '#A1A1AA',
      }}>
        Excited for you to try Grit,
      </p>
      <p style={{
        fontSize: '14px',
        margin: '0 0 24px 0',
        color: '#ffffff',
      }}>
        ✨ Gleam
      </p>
    </div>

    {/* Questions Section with Background */}
    <div style={{
      backgroundColor: 'oklch(0.1781 0.002 286.19)',
      border: '1px solid #27272A',
      borderRadius: '8px',
      padding: '14px',
      margin: '32px 0',
      textAlign: 'center',
    }}>
      <p style={{
        fontSize: '16px',
        fontWeight: '500',
        color: '#ffffff',
        margin: '0 0 8px 0',
      }}>
        Questions?
      </p>
      <p style={{
        fontSize: '14px',
        color: '#A1A1AA',
        margin: '0 0 16px 0',
      }}>
        Visit our Help Center.
      </p>
      <a
        href="https://discord.gg/xVgaz2dQH7"
        style={{
          display: 'inline-block',
          backgroundColor: '#27272A',
          color: '#ffffff',
          padding: '10px 16px',
          borderRadius: '6px',
          textDecoration: 'none',
          fontSize: '14px',
          fontWeight: '500',
          border: '1px solid #383838',
        }}
      >
        Join the Discord
      </a>
    </div>

    {/* Grit Icon */}
    <div style={{ textAlign: 'center', margin: '24px 0' }}>
      <img
        src={`${baseUrl}/images/grit-icon-macOS-Dark-1x.png`}
        alt='Grit Icon'
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '6px',
          border: '1px solid #383838',
        }}
      />
    </div>

    {/* Footer */}
    <div style={{
      borderTop: '1px solid #27272A',
      paddingTop: '24px',
      color: '#6B7280',
      textAlign: 'center',
    }}>
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
