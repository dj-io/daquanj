import * as React from 'react';

interface ContactEmailProps {
	name?: string;
	email: string;
	message: string;
}

export const ContactEmail: React.FC<Readonly<ContactEmailProps>> = ({
	name,
	email,
	message,
}) => (
	<div style={{
		backgroundColor: '#0A0A0A',
		color: '#ffffff',
		fontFamily: '"SF Pro Display", "SF Pro Text", -apple-system, BlinkMacSystemFont, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
		maxWidth: '600px',
		margin: '0 auto',
		boxSizing: 'border-box',
		position: 'relative',
	}}>

		{/* Content */}
		<div style={{ padding: '24px' }}>
			<h1 style={{
				fontSize: '18px',
				fontWeight: 500,
				color: '#ffffff',
				margin: '0 0 12px 0',
				lineHeight: '1.3',
			}}>
				Someone reached out
			</h1>

			<div style={{
				backgroundColor: '#111113',
				border: '1px solid #27272A',
				borderRadius: '10px',
				padding: '14px',
				marginBottom: '14px',
			}}>
				<div style={{ fontSize: '12px', color: '#A1A1AA', marginBottom: '6px' }}>
					From
				</div>
				<div style={{ fontSize: '13px', color: '#ffffff', lineHeight: '1.5' }}>
					{name ? `${name} · ` : ''}{email}
				</div>
			</div>

			<div style={{
				backgroundColor: '#111113',
				border: '1px solid #27272A',
				borderRadius: '10px',
				padding: '14px',
			}}>
				<div style={{ fontSize: '12px', color: '#A1A1AA', marginBottom: '6px' }}>
					Message
				</div>
				<pre style={{
					margin: 0,
					whiteSpace: 'pre-wrap',
					wordBreak: 'break-word',
					fontSize: '13px',
					lineHeight: '1.6',
					color: '#ffffff',
					fontFamily: 'inherit',
				}}>
					{message}
				</pre>
			</div>

			<div style={{
				marginTop: '18px',
				fontSize: '12px',
				color: '#A1A1AA',
				lineHeight: '1.6',
			}}>
				Reply directly to this email to respond (Reply-To is set to the sender).
			</div>
		</div>

		{/* Footer */}
		<div style={{
			borderTop: '1px solid #27272A',
			padding: '18px 24px 26px 24px',
			textAlign: 'center',
			fontSize: '12px',
			color: '#71717A',
		}}>
			DaquanJ · Contact Form
		</div>
	</div>
);


