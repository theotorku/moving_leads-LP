import nodemailer from 'nodemailer';

// Create reusable transporter
const createTransporter = () => {
  // For development, use ethereal email (fake SMTP)
  // For production, use real SMTP service (SendGrid, Mailgun, etc.)
  
  if (process.env.NODE_ENV === 'production' && process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  // Development: Log emails to console
  return nodemailer.createTransport({
    streamTransport: true,
    newline: 'unix',
    buffer: true
  });
};

/**
 * Send welcome email to new lead
 */
export async function sendWelcomeEmail(email: string, name?: string): Promise<void> {
  try {
    const transporter = createTransporter();
    
    const displayName = name || 'there';
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'MovingLead <noreply@movinglead.com>',
      to: email,
      subject: 'Welcome to MovingLead - Your Free Trial Starts Now! 🚀',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; }
            .button { display: inline-block; background: #6366f1; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            .features { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .feature { margin: 15px 0; padding-left: 25px; position: relative; }
            .feature:before { content: "✓"; position: absolute; left: 0; color: #10b981; font-weight: bold; }
            .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to MovingLead!</h1>
              <p>Your 14-Day Free Trial Starts Now</p>
            </div>
            <div class="content">
              <p>Hi ${displayName},</p>
              
              <p>Thank you for signing up for MovingLead! We're excited to help you transform your moving leads with AI-powered scoring.</p>
              
              <div class="features">
                <h3>What's included in your trial:</h3>
                <div class="feature">AI-powered lead scoring (Hot, Warm, Cold)</div>
                <div class="feature">Unlimited lead analysis</div>
                <div class="feature">Real-time conversion predictions</div>
                <div class="feature">Priority email support</div>
                <div class="feature">ROI tracking dashboard</div>
              </div>
              
              <p style="text-align: center;">
                <a href="${process.env.FRONTEND_URL || 'http://localhost:5174'}/dashboard" class="button">
                  Get Started Now
                </a>
              </p>
              
              <p><strong>What happens next?</strong></p>
              <ol>
                <li>Check your email for login credentials (arriving shortly)</li>
                <li>Upload your first batch of leads</li>
                <li>Watch the AI score them in real-time</li>
                <li>Start closing more deals!</li>
              </ol>
              
              <p>Your trial includes everything in our Professional plan ($299/month) - absolutely free for 14 days. No credit card required.</p>
              
              <p>Questions? Just reply to this email - we're here to help!</p>
              
              <p>Best regards,<br>
              The MovingLead Team</p>
            </div>
            <div class="footer">
              <p>MovingLead - AI-Scored Moving Leads That Actually Convert</p>
              <p>You're receiving this email because you signed up at movinglead.com</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Hi ${displayName},

Thank you for signing up for MovingLead! We're excited to help you transform your moving leads with AI-powered scoring.

What's included in your trial:
✓ AI-powered lead scoring (Hot, Warm, Cold)
✓ Unlimited lead analysis
✓ Real-time conversion predictions
✓ Priority email support
✓ ROI tracking dashboard

Your trial includes everything in our Professional plan ($299/month) - absolutely free for 14 days. No credit card required.

Get started: ${process.env.FRONTEND_URL || 'http://localhost:5174'}/dashboard

Questions? Just reply to this email - we're here to help!

Best regards,
The MovingLead Team
      `
    };

    const info = await transporter.sendMail(mailOptions);

    if (process.env.NODE_ENV !== 'production') {
      console.log('📧 Email sent (development mode):');
      console.log('To:', email);
      console.log('Subject:', mailOptions.subject);
      console.log('Message ID:', info.messageId);
    } else {
      console.log('📧 Welcome email sent to:', email);
    }
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw error;
  }
}

/**
 * Send notification to admin about new lead
 */
export async function sendAdminNotification(leadData: {
  email: string;
  name?: string;
  company?: string;
}): Promise<void> {
  if (!process.env.ADMIN_EMAIL) {
    console.log('No admin email configured, skipping notification');
    return;
  }

  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'MovingLead <noreply@movinglead.com>',
      to: process.env.ADMIN_EMAIL,
      subject: '🎉 New Lead Signup!',
      html: `
        <h2>New Lead Registered</h2>
        <p><strong>Email:</strong> ${leadData.email}</p>
        ${leadData.name ? `<p><strong>Name:</strong> ${leadData.name}</p>` : ''}
        ${leadData.company ? `<p><strong>Company:</strong> ${leadData.company}</p>` : ''}
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('📧 Admin notification sent');
  } catch (error) {
    console.error('Error sending admin notification:', error);
  }
}

