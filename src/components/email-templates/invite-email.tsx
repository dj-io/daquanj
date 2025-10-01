/* eslint-disable @next/next/no-img-element */
import * as React from 'react';

interface InviteEmailProps {
	email: string;
}

const baseUrl =
	process.env.NEXT_PUBLIC_SITE_URL
	|| (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

export const InviteEmail: React.FC<Readonly<InviteEmailProps>> = ({
	email,
}) => (
	<div style={{
		backgroundColor: '#000000',
		color: '#ffffff',
		fontFamily: '"SF Pro Display", "SF Pro Text", -apple-system, BlinkMacSystemFont, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
		maxWidth: '600px',
		margin: '0 auto',
		boxSizing: 'border-box',
		position: 'relative',
	}}>
		{/* Hero Image Section with Blur */}
		<div style={{
			position: 'relative',
			marginBottom: '48px',
			width: '100%',
			height: '280px',
			overflow: 'hidden',
		}}>
			<img
				src={`${baseUrl}/images/ask-grit.png`}
				alt='Ask Grit'
				style={{
					width: '100%',
					height: '100%',
					display: 'block',
					objectFit: 'cover',
					objectPosition: 'center top',
				}}
			/>
			{/* Gaussian Blur Overlay - burns image into background */}
			<div style={{
				position: 'absolute',
				left: '0',
				right: '0',
				bottom: '0',
				height: '45%',
				background: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 20%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.4) 65%, rgba(0,0,0,0.15) 80%, rgba(0,0,0,0) 100%)',
				pointerEvents: 'none',
			}} />
		</div>

		{/* Content section with padding */}
		<div style={{
			padding: '0 24px 60px 24px',
		}}>

		{/* Main Heading */}
		<h1 style={{
			fontSize: '20px',
			fontWeight: '400',
			color: '#ffffff',
			textAlign: 'center',
			margin: '0 0 20px 0',
			lineHeight: '1.3',
		}}>
			You&apos;ve been invited to try Grit.
		</h1>

		{/* Introduction Paragraph */}
		<p style={{
			fontSize: '14px',
			lineHeight: '1.6',
			color: '#A1A1AA',
			textAlign: 'center',
			margin: '0 0 20px 0',
		}}>
		 A friend wants you to join the Grit beta. Welcome to the vibe working era!
		</p>

		{/* Product Description */}
		<p style={{
			fontSize: '14px',
			lineHeight: '1.6',
			color: '#A1A1AA',
			textAlign: 'center',
			margin: '0 0 28px 0',
		}}>
			Grit lets you automate your work and chat with your knowledge using cutting-edge models from OpenAI, Anthropic, Gemini, and xAI. Write, plan, and research anything faster—all in one unified workspace.
		</p>

		{/* Download Buttons */}
		<div style={{
			textAlign: 'center',
			marginBottom: '36px',
		}}>
			<table cellPadding="0" cellSpacing="0" style={{ margin: '0 auto' }}>
				<tr>
					<td>
					<a
						href="https://grit-desktop-releases.s3.us-east-2.amazonaws.com/Grit-0.1.11-universal.dmg"
						style={{
							display: 'inline-block',
							backgroundColor: '#27272A',
							color: '#ffffff',
							padding: '8px 12px',
							borderRadius: '6px',
							textDecoration: 'none',
							fontSize: '12px',
							fontWeight: '500',
							marginRight: '8px',
						}}
					>
						Download Grit for Mac
						<br />
						<span style={{ fontSize: '11px', opacity: '0.7' }}>Universal (Intel)</span>
					</a>
					</td>
					<td>
					<a
						href="https://grit-desktop-releases.s3.us-east-2.amazonaws.com/Grit-0.1.11-arm64.dmg"
						style={{
							display: 'inline-block',
							backgroundColor: '#27272A',
							color: '#ffffff',
							padding: '8px 12px',
							borderRadius: '6px',
							textDecoration: 'none',
							fontSize: '12px',
							fontWeight: '500',
						}}
					>
						Download Grit for Mac
						<br />
						<span style={{ fontSize: '11px', opacity: '0.7' }}>Apple Silicon (M1+)</span>
					</a>
					</td>
				</tr>
			</table>
		</div>

		{/* Subtext */}
		{/* <p style={{
			fontSize: '14px',
			lineHeight: '1.6',
			color: '#A1A1AA',
			textAlign: 'center',
			margin: '0 0 36px 0',
		}}>
			Download Grit to help usher in the vibe working era!
		</p> */}

		{/* Closing */}
		<div style={{
			textAlign: 'center',
			marginBottom: '36px',
		}}>
			<p style={{
				fontSize: '14px',
				lineHeight: '1.6',
				color: '#A1A1AA',
				margin: '0 0 8px 0',
			}}>
				To the future of work,
			</p>
			<p style={{
				fontSize: '14px',
				lineHeight: '1.6',
				color: '#A1A1AA',
				margin: '0',
			}}>
			 	✨ Team Grit
			</p>
		</div>

		{/* Grit Logo */}
		<div style={{
			textAlign: 'center',
			marginBottom: '32px',
		}}>
			<img
				src={`${baseUrl}/images/grit-icon-macOS-Dark-1x.png`}
				alt='Grit Logo'
				style={{
					width: '64px',
					height: 'auto',
				}}
			/>
		</div>

		{/* Footer */}
		<div style={{
			borderTop: '1px solid #27272A',
			paddingTop: '32px',
			paddingBottom: '32px',
			textAlign: 'center',
		}}>
			<p style={{
				fontSize: '12px',
				color: '#71717A',
				margin: '0',
			}}>
				This email was sent to {email}
			</p>
		</div>
		</div>
	</div>
);
