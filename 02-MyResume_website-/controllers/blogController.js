const { client: supabase } = require('../config/supabase');
const { GoogleGenerativeAI } = require('@google/generative-ai');

exports.getBlogs = async (req, res) => {
    try {
        const { data: blogs, error } = await supabase
            .from('api_blog')
            .select('*')
            .order('date_added', { ascending: false });
        if (error) throw error;
        res.json(blogs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error fetching blogs' });
    }
};

exports.createBlog = async (req, res) => {
    try {
        const { name, description, category, auth, https, link } = req.body;
        // Generate SEO
        const seo = await generateSEOContent(name, description, category);
        const { data, error } = await supabase
            .from('api_blog')
            .insert({
                name,
                description,
                category,
                auth,
                https,
                link,
                seo_title: seo.seo_title,
                seo_description: seo.seo_description,
                keywords: seo.keywords,
                tutorial: seo.tutorial,
                example_code: seo.example_code
            })
            .select();
        if (error) throw error;
        res.status(201).json(data[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error creating blog post' });
    }
};

exports.updateBlog = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('api_blog')
            .update(req.body)
            .eq('id', req.params.id)
            .select();
        if (error) throw error;
        if (!data.length) return res.status(404).json({ msg: 'Blog post not found' });
        res.json(data[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error updating blog post' });
    }
};

exports.deleteBlog = async (req, res) => {
    try {
        const { error } = await supabase
            .from('api_blog')
            .delete()
            .eq('id', req.params.id);
        if (error) throw error;
        res.json({ msg: 'Blog removed' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error deleting blog post' });
    }
};

exports.deleteExpiredBlogs = async () => {
    try {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const { error } = await supabase
            .from('api_blog')
            .delete()
            .lt('date_added', sevenDaysAgo.toISOString());
        if (error) throw error;
        console.log('Expired blogs deleted');
    } catch (err) {
        console.error('Error deleting expired blogs:', err);
    }
};

// Regular Blog Posts (Supabase)
exports.getAllBlogs = async (req, res) => {
    try {
        console.log('Fetching all blogs (Supabase)...');
        // Get both API blogs and regular blogs from Supabase
        const [apiBlogsResult, regularBlogsResult] = await Promise.all([
            supabase.from('api_blog').select('*').order('date_added', { ascending: false }),
            supabase.from('regular_blogs').select('*').order('created_at', { ascending: false })
        ]);

        if (apiBlogsResult.error) {
            console.error('Supabase API Blog Error:', apiBlogsResult.error);
            throw apiBlogsResult.error;
        }
        if (regularBlogsResult.error) {
            console.error('Supabase Regular Blog Error:', regularBlogsResult.error);
            throw regularBlogsResult.error;
        }

        console.log(`Found ${apiBlogsResult.data.length} API blogs and ${regularBlogsResult.data.length} regular blogs`);

        // Combine and format the results
        const allBlogs = [
            ...regularBlogsResult.data.map(blog => ({
                id: blog.id,
                type: 'regular',
                title: blog.title,
                content: blog.content,
                author: blog.author,
                image: blog.image,
                createdAt: blog.created_at,
                category: 'Blog Post'
            })),
            ...apiBlogsResult.data.map(blog => ({
                id: blog.id,
                type: 'api',
                name: blog.name,
                title: blog.seo_title || blog.name,
                description: blog.description,
                content: blog.tutorial,
                category: blog.category,
                auth: blog.auth,
                https: blog.https,
                link: blog.link,
                date_added: blog.date_added
            }))
        ].sort((a, b) => new Date(b.createdAt || b.date_added) - new Date(a.createdAt || a.date_added));

        res.json(allBlogs);
    } catch (err) {
        console.error('CRITICAL BLOG FETCH ERROR:', err);
        res.status(500).json({ msg: 'Error fetching blogs' });
    }
};

exports.createRegularBlog = async (req, res) => {
    try {
        const { title, content, image } = req.body;
        const { data, error } = await supabase
            .from('regular_blogs')
            .insert([{
                title,
                content,
                image,
                author: req.user?.email || 'Admin'
            }])
            .select();
        if (error) throw error;
        res.status(201).json(data[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error creating blog post' });
    }
};

exports.updateRegularBlog = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('regular_blogs')
            .update(req.body)
            .eq('id', req.params.id)
            .select();
        if (error) throw error;
        if (!data || !data.length) return res.status(404).json({ msg: 'Blog post not found' });
        res.json(data[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error updating blog post' });
    }
};

exports.deleteRegularBlog = async (req, res) => {
    try {
        const { error } = await supabase
            .from('regular_blogs')
            .delete()
            .eq('id', req.params.id);
        if (error) throw error;
        res.json({ msg: 'Blog post deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error deleting blog post' });
    }
};

async function generateSEOContent(apiName, description, category) {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const prompt = `Generate SEO content for an API blog post about "${apiName}".
Description: ${description}
Category: ${category}

Provide:
1. SEO Title: (max 60 chars)
2. SEO Description: (max 160 chars)
3. Keywords: (comma separated, 5-7 keywords)
4. Tutorial: (short explanation of how to use the API, 200-300 words)
5. Example Code: (JavaScript fetch example)

Format as JSON:
{
  "seo_title": "...",
  "seo_description": "...",
  "keywords": "...",
  "tutorial": "...",
  "example_code": "..."
}`;

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        return JSON.parse(text);
    } catch (error) {
        console.error('Error generating SEO content:', error);
        return {
            seo_title: `How to Use ${apiName} API`,
            seo_description: `Learn about ${apiName} API: ${description.substring(0, 100)}...`,
            keywords: `${category}, API, ${apiName}`,
            tutorial: `This API provides ${description}. To use it, make requests to the provided endpoints.`,
            example_code: `fetch('${apiName}')\n  .then(response => response.json())\n  .then(data => console.log(data));`
        };
    }
}

exports.generateBlog = async (req, res) => {
    const { topic, keywords } = req.body;
    if (!topic) return res.status(400).json({ msg: 'Topic is required for AI generation' });

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
        return res.status(500).json({ msg: 'Gemini API key is not configured' });
    }

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `Write a professional blog post for a developer's portfolio. Topic: ${topic}. Keywords: ${keywords || 'N/A'}. Keep it between 200-300 words. Format with appropriate paragraphs.`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        res.json({ content: response.text() });
    } catch (err) {
        console.error('AI Generation error:', err);
        res.status(500).json({ msg: 'AI Blog generation failed' });
    }
};
