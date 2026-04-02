const { client: supabase } = require('../config/supabase');
const { GoogleGenerativeAI } = require('@google/generative-ai');

exports.getProjects = async (req, res) => {
    try {
        const { data: projects, error } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) throw error;
        res.json(projects);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error fetching projects' });
    }
};

exports.createProject = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('projects')
            .insert([req.body])
            .select();
        if (error) throw error;
        res.status(201).json(data[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error creating project' });
    }
};

exports.updateProject = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('projects')
            .update(req.body)
            .eq('id', req.params.id)
            .select();
        if (error) throw error;
        if (!data || !data.length) return res.status(404).json({ msg: 'Project not found' });
        res.json(data[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error updating project' });
    }
};

exports.deleteProject = async (req, res) => {
    try {
        const { error } = await supabase
            .from('projects')
            .delete()
            .eq('id', req.params.id);
        if (error) throw error;
        res.json({ msg: 'Project removed' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error deleting project' });
    }
};

exports.generateDescription = async (req, res) => {
    const { title, details } = req.body;
    if (!title) return res.status(400).json({ msg: 'Title is required for AI generation' });

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
        return res.status(500).json({ msg: 'Gemini API key is not configured' });
    }

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `Generate a professional and concise project description for a developer portfolio. Title: ${title}. Key details: ${details || 'N/A'}. Limit to 2-3 sentences.`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        res.json({ description: response.text() });
    } catch (err) {
        console.error('AI Generation error:', err);
        res.status(500).json({ msg: 'AI Generation failed. Check API key and quota.' });
    }
};
