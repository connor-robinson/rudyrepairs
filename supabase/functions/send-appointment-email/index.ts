// Supabase Edge Function to send appointment confirmation emails
// Deploy this to Supabase: supabase functions deploy send-appointment-email

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const FROM_EMAIL = Deno.env.get('FROM_EMAIL') || 'noreply@rudysrepair.com';
// Support multiple admin emails (comma-separated)
const ADMIN_EMAILS = (Deno.env.get('ADMIN_EMAIL') || 'admin@rudysrepair.com')
  .split(',')
  .map(email => email.trim())
  .filter(email => email.length > 0);

interface EmailPayload {
  appointmentId: string;
}

serve(async (req) => {
  try {
    // Get appointment ID from request
    const { appointmentId }: EmailPayload = await req.json();

    if (!appointmentId) {
      return new Response(
        JSON.stringify({ error: 'appointmentId is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Fetch appointment details
    const { data: appointment, error: appointmentError } = await supabaseClient
      .from('appointments')
      .select('*')
      .eq('id', appointmentId)
      .single();

    if (appointmentError || !appointment) {
      throw new Error('Appointment not found');
    }

    // Format services list
    const servicesList = Array.isArray(appointment.services)
      ? appointment.services.map((s: any) => `- ${s.name}: £${s.price}`).join('\n')
      : 'No services listed';

    // Format date and time
    const appointmentDate = new Date(appointment.appointment_date).toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Customer confirmation email
    const customerEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #a12b2b; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 30px; }
            .details { background-color: white; padding: 20px; margin: 20px 0; border-left: 4px solid #a12b2b; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Rudy's Repair</h1>
              <h2>Appointment Confirmed</h2>
            </div>
            <div class="content">
              <p>Dear ${appointment.customer_name},</p>
              <p>Your appointment has been confirmed!</p>
              <div class="details">
                <h3>Appointment Details</h3>
                <p><strong>Date:</strong> ${appointmentDate}</p>
                <p><strong>Time:</strong> ${appointment.appointment_time}</p>
                <p><strong>Services:</strong></p>
                <pre style="white-space: pre-wrap; font-family: inherit;">${servicesList}</pre>
                <p><strong>Total:</strong> £${appointment.total_price}</p>
                ${appointment.vehicle_model ? `<p><strong>Vehicle:</strong> ${appointment.vehicle_model}</p>` : ''}
                ${appointment.address ? `<p><strong>Location:</strong> ${appointment.address}</p>` : ''}
              </div>
              <p>We look forward to serving you. If you need to reschedule or cancel, please contact us as soon as possible.</p>
              <p>Best regards,<br>Rudy's Repair Team</p>
            </div>
            <div class="footer">
              <p>This is an automated confirmation email. Please do not reply to this email.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Admin notification email
    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #a12b2b; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 30px; }
            .details { background-color: white; padding: 20px; margin: 20px 0; border-left: 4px solid #a12b2b; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Appointment Booking</h1>
            </div>
            <div class="content">
              <p>A new appointment has been booked:</p>
              <div class="details">
                <h3>Customer Details</h3>
                <p><strong>Name:</strong> ${appointment.customer_name}</p>
                <p><strong>Email:</strong> ${appointment.customer_email}</p>
                ${appointment.customer_phone ? `<p><strong>Phone:</strong> ${appointment.customer_phone}</p>` : ''}
                <h3>Appointment Details</h3>
                <p><strong>Date:</strong> ${appointmentDate}</p>
                <p><strong>Time:</strong> ${appointment.appointment_time}</p>
                <p><strong>Services:</strong></p>
                <pre style="white-space: pre-wrap; font-family: inherit;">${servicesList}</pre>
                <p><strong>Total:</strong> £${appointment.total_price}</p>
                ${appointment.vehicle_model ? `<p><strong>Vehicle:</strong> ${appointment.vehicle_model}</p>` : ''}
                ${appointment.address ? `<p><strong>Location:</strong> ${appointment.address}</p>` : ''}
              </div>
              <p><a href="${Deno.env.get('ADMIN_DASHBOARD_URL') || 'https://your-site.com/admin'}">View in Admin Dashboard</a></p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send customer email via Resend
    if (RESEND_API_KEY) {
      const customerEmailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: appointment.customer_email,
          subject: `Appointment Confirmed - ${appointmentDate} at ${appointment.appointment_time}`,
          html: customerEmailHtml,
        }),
      });

      if (!customerEmailResponse.ok) {
        const error = await customerEmailResponse.json();
        console.error('Resend API error:', error);
      }

      // Send admin notification to all admin emails
      for (const adminEmail of ADMIN_EMAILS) {
        const adminEmailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: FROM_EMAIL,
            to: adminEmail,
            subject: `New Appointment: ${appointment.customer_name} - ${appointmentDate}`,
            html: adminEmailHtml,
          }),
        });

        if (!adminEmailResponse.ok) {
          const error = await adminEmailResponse.json();
          console.error(`Resend API error (admin ${adminEmail}):`, error);
        }
      }

      // Update appointment to mark email as sent
      await supabaseClient
        .from('appointments')
        .update({ email_sent: true })
        .eq('id', appointmentId);
    } else {
      console.warn('RESEND_API_KEY not configured. Email not sent.');
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Emails sent successfully' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});
