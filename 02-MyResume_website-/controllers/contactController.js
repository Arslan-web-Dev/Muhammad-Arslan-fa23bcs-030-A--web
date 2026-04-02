const { client: supabase } = require('../config/supabase');
const { GoogleGenerativeAI } = require('@google/generative-ai');

exports.getMessages = async (req, res) => {
    try {
        const { data: messages, error } = await supabase
            .from('contacts')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) throw error;
        res.json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error fetching messages' });
    }
};

exports.submitMessage = async (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ msg: 'Please provide name, email, and message' });
    }

    try {
        const { data, error } = await supabase
            .from('contacts')
            .insert([{ name, email, message, created_at: new Date() }])
            .select();
        
        if (error) throw error;
        res.json({ msg: 'Message sent successfully', message: data[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error sending message' });
    }
};

exports.generateAutoReply = async (req, res) => {
    const { name, originalMessage } = req.body;
    if (!name || !originalMessage) {
        return res.status(400).json({ msg: 'Name and message are required for auto-reply' });
    }

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
        return res.status(500).json({ msg: 'Gemini API key is not configured' });
    }

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `Generate a professional and friendly auto-reply email for a developer's contact form. Receiver Name: ${name}. Their Message: ${originalMessage}. Ensure to thank them and state that I will get back to them soon. Don't include subject line, just body text.`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        res.json({ reply: response.text() });
    } catch (err) {
        console.error('AI Auto-reply error:', err);
        res.status(500).json({ msg: 'AI Auto-reply generation failed' });
    }
};

exports.deleteMessage = async (req, res) => {
    try {
        const { error } = await supabase
            .from('contacts')
            .delete()
            .eq('id', req.params.id);
        if (error) throw error;
        res.json({ msg: 'Message deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error deleting message' });
    }
};
