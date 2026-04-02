const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const cron = require('node-cron');
const { fetchAndStoreAPIs } = require('./scripts/fetchAPIs');
const blogController = require('./controllers/blogController');
require('dotenv').config();

const app = express();

const { client: supabase } = require('./config/supabase');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/blog', require('./routes/blogRoutes'));
app.use('/api/skills', require('./routes/skillsRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/mail', require('./routes/mailRoutes'));

// Content Management API Routes (Vercel-compatible via Supabase)
app.post('/api/content/save-changes', require('./middleware/authMiddleware'), async (req, res) => {
  try {
    const { page, changes } = req.body;

    for (const [key, change] of Object.entries(changes)) {
      const { selector, content } = change;
      
      const { error } = await supabase
        .from('site_content')
        .upsert(
          { page, selector, content, updated_at: new Date() },
          { onConflict: 'page, selector' }
        );

      if (error) throw error;
    }

    res.json({ msg: 'Changes saved to database successfully' });
  } catch (error) {
    console.error('Error saving changes:', error);
    res.status(500).json({ msg: 'Error saving changes' });
  }
});

// API endpoint to fetch new APIs manually or via Cron
app.route('/api/fetch-apis')
  .all(async (req, res, next) => {
    // allow if authenticated OR if it's a valid Vercel Cron request
    const authHeader = req.headers['authorization'];
    const isCron = process.env.VERCEL === '1' && authHeader === `Bearer ${process.env.CRON_SECRET}`;
    
    if (isCron) {
        return next();
    }
    
    // Fallback to authMiddleware for manual requests
    return require('./middleware/authMiddleware')(req, res, next);
  })
  .post(async (req, res) => {
    try {
      await fetchAndStoreAPIs();
      res.json({ msg: 'API fetching completed successfully' });
    } catch (error) {
      console.error('Error fetching APIs:', error);
      res.status(500).json({ msg: 'Error fetching APIs' });
    }
  })
  .get(async (req, res) => {
    try {
      await fetchAndStoreAPIs();
      res.json({ msg: 'Cron API fetching completed' });
    } catch (error) {
       res.status(500).json({ msg: 'Cron API fetching failed' });
    }
  });

// API endpoint to delete API blog
app.delete('/api/blog/api/:id', require('./middleware/authMiddleware'), async (req, res) => {
  try {
    const { createClient } = require('@supabase/supabase-js');
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

    const { error } = await supabase
      .from('api_blog')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;

    res.json({ msg: 'API blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting API blog:', error);
    res.status(500).json({ msg: 'Error deleting API blog' });
  }
});

// API endpoint to get API blog details
app.get('/api/blog/api/:id', require('./middleware/authMiddleware'), async (req, res) => {
  try {
    const { createClient } = require('@supabase/supabase-js');
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

    const { data, error } = await supabase
      .from('api_blog')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Error getting API blog details:', error);
    res.status(500).json({ msg: 'Error getting API blog details' });
  }
});

// 404 for API routes
app.use(/^\/api\/.*/, (req, res) => {
    res.status(404).json({ msg: 'API endpoint not found' });
});

// New maintenance endpoint for Cron
app.get('/api/maintenance/clear-expired', async (req, res) => {
    try {
        // Simple security check for Vercel Cron
        const authHeader = req.headers['authorization'];
        if (process.env.VERCEL === '1' && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
            return res.status(401).json({ msg: 'Unauthorized cron request' });
        }
        
        await blogController.deleteExpiredBlogs();
        res.json({ msg: 'Maintenance completed' });
    } catch (error) {
        res.status(500).json({ msg: 'Maintenance failed' });
    }
});

// Fallback for SPA with Dynamic Content Injection
app.get(/.*/, async (req, res) => {
    try {
        const fs = require('fs').promises;
        const requestedPath = req.path === '/' ? 'index.html' : req.path.endsWith('.html') ? req.path : `${req.path}.html`;
        const filePath = path.join(__dirname, 'public', requestedPath);
        
        let html = await fs.readFile(filePath, 'utf8');
        const pageName = requestedPath.replace(/^\//, '').replace('.html', '') || 'index';

        // Fetch changes from Supabase
        const { data: changes, error } = await supabase
            .from('site_content')
            .select('selector, content')
            .eq('page', pageName);

        if (!error && changes) {
            changes.forEach(change => {
                const { selector, content } = change;
                const regex = new RegExp(`(<[^>]*${selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^>]*>)(.*?)(</[^>]*>)`, 'gi');
                html = html.replace(regex, `$1${content}$3`);
            });
        }

        res.send(html);
    } catch (error) {
        // If file not found or other error, fallback to index.html or 404
        try {
            const html = await require('fs').promises.readFile(path.join(__dirname, 'public', 'index.html'), 'utf8');
            res.send(html);
        } catch (e) {
            res.status(404).send('Page not found');
        }
    }
});

// Schedule API fetching daily at 2 AM
cron.schedule('0 2 * * *', async () => {
    console.log('Running daily API fetch...');
    await fetchAndStoreAPIs();
});

// Schedule expiry deletion daily at 3 AM
cron.schedule('0 3 * * *', async () => {
    console.log('Running daily expiry deletion...');
    await blogController.deleteExpiredBlogs();
});

if (process.env.NODE_ENV !== 'production' || process.env.VERCEL !== '1') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

module.exports = app;
