/* eslint-disable @next/next/no-img-element */
import * as React from 'react';
// import Image from 'next/image';

interface ChangelogEmailProps {
  email: string;
}

const baseUrl =
	process.env.NEXT_PUBLIC_SITE_URL
	|| (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

// ANATOMY OF CHANGELOG EMAIL (every email should follow this structure)
// 1. Logo Container
// 2. Title
// 3. Changelog Writeup
// 4. Download Buttons (optional)
// 5. Divider
// 6. Features section
// 7. Divider
// 8. Closing Remarks
// 9. Community CTA
// 10. Grit Icon
// 11. Footer (email, unsubscribe link)

export const ChangelogEmail: React.FC<Readonly<ChangelogEmailProps>> = ({
  email,
}) => (
    <div style={{
      backgroundColor: '#ffffff',
      color: '#000000',
      padding: '40px 24px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      maxWidth: '600px',
      margin: '0 auto',
      boxSizing: 'border-box',
    }}>
    {/* Logo Container */}
    <div style={{
      width: '32px',
      height: '32px',
      backgroundColor: '#ffffff',
      border: '1px solid #e5e5e5',
      borderRadius: '6px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '32px',
    }}>
      <span style={{
        color: '#000000',
        fontSize: '18px',
        fontWeight: 'bold',
      }}>
        G
      </span>
    </div>

    {/* Primary Header */}
    <div style={{ marginBottom: '24px', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{
        maxWidth: '500px',
        fontSize: '32px',
        fontWeight: 'bold',
        margin: '0 0 12px 0',
        color: '#000000',
        lineHeight: '1.4',
      }}>
        🆕 What&apos;s new, <br /> Context, context, context!
      </h1>
    </div>

    {/* Introduction Section */}
    <div style={{ marginBottom: '32px' }}>
            <p style={{
                fontSize: '14px',
                lineHeight: '1.5',
                color: '#6b7280',
                margin: '0 0 16px 0',
            }}>
                This update is all about making Grit work exactly how you want it to. From resizable sidebars to visual improvements and powerful new ways to add context to your AI chats.
            </p>
            {/* <p style={{
                fontSize: '14px',
                lineHeight: '1.5',
                color: '#000000',
                margin: '0 0 16px 0',
            }}>
                I&apos;ve added drag-and-drop image support, emoji pickers for callouts, @ mentions for context, and search everywhere—plus better visual hierarchy in light mode. Everything you need to work faster and stay organized.
            </p> */}
            <div style={{ marginBottom: '32px' }}>
                <p style={{
                    fontSize: '14px',
                    margin: '0 0 4px 0',
                    color: '#000000',
                }}>
                    Your workspace, your way—now with more control and context.
                </p>
            </div>
      <div style={{ marginBottom: '0' }}>
        <div style={{ textAlign: 'center', marginBottom: '8px' }}>
            <table cellPadding="0" cellSpacing="0" style={{ margin: '0 auto' }}>
                <tr>
                <td>
                    <a
                        href="https://grit-desktop-releases.s3.us-east-2.amazonaws.com/Grit-0.1.11-universal.dmg"
                        style={{
                            display: 'inline-block',
                            backgroundColor: '#f3f4f6',
                            color: '#000000',
                            padding: '8px 12px',
                            borderRadius: '6px',
                            textDecoration: 'none',
                            fontSize: '12px',
                            fontWeight: '500',
                            border: '1px solid #d1d5db',
                            marginRight: '8px',
                        }}
                    >
                        Download Now
                        <br />
                        Universal (Intel)
                    </a>
                </td>
                <td>
                    <a
                    href="https://grit-desktop-releases.s3.us-east-2.amazonaws.com/Grit-0.1.11-arm64.dmg"
                    style={{
                        display: 'inline-block',
                        backgroundColor: '#f3f4f6',
                        color: '#000000',
                        padding: '8px 12px',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        fontSize: '12px',
                        fontWeight: '500',
                        border: '1px solid #d1d5db',
                    }}
                    >
                    Download Now
                    <br />
                    Apple Silicon (M1+)
                    </a>
                </td>
            </tr>
        </table>
        </div>
        <p style={{
            fontSize: '12px',
            color: '#000000',
            margin: '8px 0 0 0',
            textAlign: 'center',
        }}>
            Requires macOS version 11 or later
        </p>
      </div>
    </div>

    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      margin: '32px 0',
    }}>
        <p
          style={{
            fontSize: '16px',
            fontWeight: '500',
            color: '#000000',
            margin: '0 0 2px 0',
            textAlign: 'center',
        }}>
          A look at what&apos;s inside v0.1.11
      </p>
    </div>

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
          fontSize: '14px',
          fontWeight: '600',
          color: '#000000',
          margin: '0 0 6px 0',
        }}>
          Resizable Sidebars
        </h3>
        <p style={{
          fontSize: '12px',
          lineHeight: '1.4',
          color: '#000000',
          margin: '0 12px 0 0',
        }}>
          Resizable sidebars let you adjust the width of the sidebar to your liking—so you can work exactly how you want to.
        </p>
      </div>
      <div style={{ flex: '1' }}>
        <img
          src={`${baseUrl}/changelog/0.1.11/resize.gif`}
          alt='Resizable Sidebars'
          style={{
            width: '100%',
            maxWidth: '100%',
            height: 'auto',
            borderRadius: '6px',
            display: 'block',
            border: '1px solid #d1d5db',
          }}
        />
      </div>
    </div>

    {/* Divider */}
    <div style={{
      height: '1px',
      backgroundColor: '#e5e7eb',
      margin: '32px 0',
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
          src={`${baseUrl}/changelog/0.1.11/emoji-callouts.gif`}
          alt='Emoji Pickers for Callouts'
          style={{
            width: '100%',
            maxWidth: '100%',
            height: 'auto',
            borderRadius: '6px',
            display: 'block',
            border: '1px solid #d1d5db',
          }}
        />
      </div>
      <div style={{ flex: '1', marginLeft: '12px' }}>
        <h3 style={{
          fontSize: '14px',
          fontWeight: '600',
          color: '#000000',
          margin: '0 0 6px 0',
        }}>
          Emoji Pickers for Callouts
        </h3>
        <p style={{
          fontSize: '12px',
          lineHeight: '1.4',
          color: '#000000',
          margin: '0',
        }}>
          Add emojis to your callouts to make them more engaging and visual
        </p>
      </div>
    </div>

    {/* Divider */}
    <div style={{
      height: '1px',
      backgroundColor: '#e5e7eb',
      margin: '32px 0',
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
          fontSize: '14px',
          fontWeight: '600',
          color: '#000000',
          margin: '0 0 6px 0',
        }}>
          @ Mentions for Context
        </h3>
        <p style={{
          fontSize: '12px',
          lineHeight: '1.4',
          color: '#000000',
          margin: '0',
        }}>
          Add pages, uploads or previous chats as context - Select the @ button and search for items to include.
        </p>
      </div>
      <div style={{ flex: '1' }}>
        <img
          src={`${baseUrl}/changelog/0.1.11/mentions.gif`}
          alt='@ Mentions for Context'
          style={{
            width: '100%',
            maxWidth: '100%',
            height: 'auto',
            borderRadius: '6px',
            display: 'block',
            border: '1px solid #d1d5db',
          }}
        />
      </div>
    </div>

    {/* Divider */}
    <div style={{
      height: '1px',
      backgroundColor: '#e5e7eb',
      margin: '32px 0',
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
          src={`${baseUrl}/changelog/0.1.11/cmdk.gif`}
          alt='Command Menu'
          style={{
            width: '100%',
            maxWidth: '100%',
            height: 'auto',
            borderRadius: '6px',
            display: 'block',
            border: '1px solid #d1d5db',
          }}
        />
      </div>
      <div style={{ flex: '1', marginLeft: '12px' }}>
        <h3 style={{
          fontSize: '14px',
          fontWeight: '600',
          color: '#000000',
          margin: '0 0 6px 0',
        }}>
          Command Menu
        </h3>
        <p style={{
          fontSize: '12px',
          lineHeight: '1.4',
          color: '#000000',
          margin: '0',
        }}>
          Search to find anything in your workspace—pages, folders, or previous chats. Type <span style={{ color: '#ffffff' }}>⌘K</span> to open the command menu.
        </p>
      </div>
    </div>

    {/* Divider */}
    <div style={{
      height: '1px',
      backgroundColor: '#e5e7eb',
      margin: '32px 0',
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
          fontSize: '14px',
          fontWeight: '600',
          color: '#000000',
          margin: '0 0 6px 0',
        }}>
          Search in chat history & Model Selector
        </h3>
        <p style={{
          fontSize: '12px',
          lineHeight: '1.4',
          color: '#000000',
          margin: '0 12px 0 0',
        }}>
          Use the dropdowns to search in chat history and select a model to use.
        </p>
      </div>
      <div style={{ flex: '1' }}>
        <img
          src={`${baseUrl}/changelog/0.1.11/search-in-chats.gif`}
          alt='Search in chat history & Model Selector'
          style={{
            width: '100%',
            maxWidth: '100%',
            height: 'auto',
            borderRadius: '6px',
            display: 'block',
            border: '1px solid #d1d5db',
          }}
        />
      </div>
    </div>

    {/* Divider */}
    {/* <div style={{
      height: '1px',
      backgroundColor: '#e5e7eb',
      margin: '32px 0',
    }}></div> */}

    {/* Feature 6 - Image Left, Text Right */}
    {/* <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: '24px',
      marginBottom: '32px',
      textAlign: 'left',
    }}>
      <div style={{ flex: '1' }}>
        <img
          src={`${baseUrl}/changelog/0.1.0/ai.gif`}
          alt='Assistant/Agent'
          style={{
            width: '100%',
            maxWidth: '100%',
            height: 'auto',
            borderRadius: '6px',
            display: 'block',
            border: '1px solid #d1d5db',
          }}
        />
      </div>
      <div style={{ flex: '1', marginLeft: '12px' }}>
        <h3 style={{
          fontSize: '14px',
          fontWeight: '600',
          color: '#000000',
          margin: '0 0 6px 0',
        }}>
          Visual Improvements
        </h3>
        <p style={{
          fontSize: '12px',
          lineHeight: '1.4',
          color: '#000000',
          margin: '0 0 8px 0',
        }}>
          Visual improvements to the UI to make it more consistent and easier to use.
        </p>

      </div>
    </div> */}


    {/* Closing Remarks */}
    <p style={{
      fontSize: '14px',
      lineHeight: '1.5',
      color: '#6b7280',
      margin: '0 0 32px 0',
    }}>
      This update brings us one step closer to having a workspace that bends to your workflow and not the other way around.
    </p>

    {/* Call to Action Section */}
    <div style={{ marginBottom: '32px' }}>
      <p style={{
        fontSize: '14px',
        lineHeight: '1.5',
        color: '#6b7280',
        margin: '0 0 16px 0',
      }}>
        These aren&apos;t flashy additions, but they&apos;re the kind of improvements that compound into a much better experience over time.
      </p>

      {/* Divider */}
       <div style={{
            height: '1px',
            backgroundColor: '#e5e7eb',
            margin: '32px 0',
        }}></div>

      {/* CTA Section */}
      <p style={{
        fontSize: '14px',
        lineHeight: '1.5',
        color: '#6b7280',
        margin: '0 0 16px 0',
      }}>
        The roadmap ahead is full, but I&apos;m open to all feedback—no such thing as too small. Reply to this email with your thoughts or join the Discord for ongoing discussion.
      </p>

      <p style={{
        fontSize: '14px',
        margin: '0 0 4px 0',
        color: '#6b7280',
      }}>
        Excited for you to try what&apos;s new,
      </p>
      <p style={{
        fontSize: '14px',
        margin: '0 0 24px 0',
        color: '#000000',
      }}>
        Gleam 💫
      </p>
    </div>

    {/* Questions Section with Background */}
    <div style={{
      backgroundColor: '#f9fafb',
      borderRadius: '8px',
      padding: '20px',
      margin: '32px 0',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
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

    {/* Grit Icon */}
    <div style={{ textAlign: 'center', margin: '32px 0' }}>
      <img
        src={`${baseUrl}/images/grit-icon-macOS-Dark-1x.png`}
        alt='Grit Icon'
        style={{
          width: '42px',
          height: '42px',
        }}
      />
    </div>

    {/* Footer */}
    <div style={{
      borderTop: '1px solid #e5e7eb',
      paddingTop: '32px',
      color: '#9ca3af',
      textAlign: 'center',
    }}>
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
