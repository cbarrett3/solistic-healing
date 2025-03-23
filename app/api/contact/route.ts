import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Form validation schema using Zod
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  subject: z.string().min(2, { message: "Subject is required" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Validate form data
    const result = contactFormSchema.safeParse(body);
    
    if (!result.success) {
      // Return validation errors
      return NextResponse.json({ 
        success: false, 
        errors: result.error.format() 
      }, { status: 400 });
    }
    
    const { name, email, phone, subject, message } = result.data;
    
    // Send email using Resend with test domain
    const { data, error } = await resend.emails.send({
      from: 'Solistic Healing <contact@resend.dev>',
      to: ['connor.steven.barrett@gmail.com'],
      reply_to: email,
      subject: `New Contact Submission: ${subject}`,
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; color: #333;">
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
            <!-- Logo Header -->
            <div style="text-align: center; margin-bottom: 20px;">
              <div style="display: inline-block; width: 48px; height: 48px;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="8" stroke="#8BC34A" stroke-width="1.5" fill="none" />
                  <path d="M12 4V20" stroke="#8BC34A" stroke-width="1.5" stroke-linecap="round" />
                  <path d="M12 8L8 12M12 8L16 12" stroke="#8BC34A" stroke-width="1.5" stroke-linecap="round" />
                  <path d="M12 14L9 17M12 14L15 17" stroke="#8BC34A" stroke-width="1.5" stroke-linecap="round" />
                </svg>
              </div>
              <h1 style="color: #8BC34A; font-size: 24px; margin: 10px 0;">
                Solistic Healing
              </h1>
            </div>

            <!-- Contact Details -->
            <div style="margin-bottom: 20px;">
              <h2 style="font-size: 18px; color: #8BC34A; margin-bottom: 10px; border-bottom: 1px solid #8BC34A; padding-bottom: 5px;">
                Contact Details
              </h2>
              <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 5px 0;"><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            </div>

            <!-- Message Details -->
            <div style="margin-bottom: 20px;">
              <h2 style="font-size: 18px; color: #8BC34A; margin-bottom: 10px; border-bottom: 1px solid #8BC34A; padding-bottom: 5px;">
                Message Details
              </h2>
              <p style="margin: 5px 0;"><strong>Subject:</strong> ${subject}</p>
              <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
                <p style="margin: 0; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
              </div>
            </div>

            <!-- Footer -->
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
              <p style="font-size: 14px; color: #666;">
                This message was sent via the Solistic Healing contact form.
              </p>
              <p style="font-size: 14px; color: #666; margin-top: 10px;">
                Please respond to this inquiry within 24 hours.
              </p>
            </div>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Error sending email:', error);
      return NextResponse.json({ 
        success: false, 
        message: 'Failed to send email' 
      }, { status: 500 });
    }
    
    // Return success response
    return NextResponse.json({ 
      success: true, 
      message: 'Email sent successfully',
      id: data?.id
    });
    
  } catch (error) {
    console.error('Error in contact form submission:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'An unexpected error occurred' 
    }, { status: 500 });
  }
}
