const { client: supabase } = require('../config/supabase');
const nodemailer = require('nodemailer');

exports.listContacts = async (req, res) => {
    try {
        const { data: messages, error } = await supabase
            .from('contacts')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) throw error;
        res.json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error fetching contacts' });
    }
};

exports.sendEmail = async (req, res) => {
    const { to, subject, body, broadcast } = req.body;

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT || 587,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    try {
        if (broadcast) {
            // send to everyone in contacts from Supabase
            const { data: contacts, error } = await supabase.from('contacts').select('email');
            if (error) throw error;
            for (const c of contacts) {
                await transporter.sendMail({
                    from: process.env.EMAIL_FROM,
                    to: c.email,
                    subject,
                    html: body,
                });
            }
        } else {
            await transporter.sendMail({
                from: process.env.EMAIL_FROM,
                to,
                subject,
                html: body,
            });
        }
        res.json({ msg: 'Email(s) sent' });
    } catch (err) {
        console.error('mail error', err);
        res.status(500).json({ msg: 'Failed to send email' });
    }
};
