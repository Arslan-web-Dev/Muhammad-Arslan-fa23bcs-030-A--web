const { client: supabase } = require('./config/supabase');

const seedDatabase = async () => {
    try {
        console.log('Seeding Supabase database...');
        
        // Sample Skills
        const skills = [
            { name: 'JavaScript', level: 95, category: 'Frontend' },
            { name: 'Node.js', level: 90, category: 'Backend' },
            { name: 'React', level: 92, category: 'Frontend' },
            { name: 'Supabase', level: 88, category: 'Database' },
            { name: 'Express.js', level: 90, category: 'Backend' },
            { name: 'Tailwind CSS', level: 85, category: 'Frontend' },
            { name: 'Python', level: 80, category: 'Backend' },
            { name: 'GraphQL', level: 75, category: 'Backend' },
            { name: 'TypeScript', level: 85, category: 'Frontend' },
            { name: 'REST APIs', level: 90, category: 'Backend' },
            { name: 'HTML/CSS', level: 95, category: 'Frontend' },
            { name: 'Git', level: 88, category: 'Tools' }
        ];

        // Sample Projects
        const projects = [
            {
                title: 'Portfolio Website',
                description: 'A full-stack portfolio website built with Node.js, Express, Supabase and Vanilla CSS. Features an admin dashboard for managing projects, skills, and blog posts with JWT authentication.',
                image: 'https://via.placeholder.com/300x200?text=Portfolio+Website',
                link: 'https://github.com/Arslan-web-Dev/MyResume_website-'
            },
            {
                title: 'AI Content Generator',
                description: 'A comprehensive tool that uses Google Gemini AI to generate SEO-optimized blog posts and project descriptions. Powered by Supabase for real-time data storage.',
                image: 'https://via.placeholder.com/300x200?text=AI+Content',
                link: 'https://github.com/Arslan-web-Dev/MyResume_website-'
            }
        ];

        // Insert Skills
        console.log('Inserting skills...');
        const { error: skillError } = await supabase.from('skills').insert(skills);
        if (skillError) throw skillError;
        console.log(`✅ Skills seeded successfully`);

        // Insert Projects
        console.log('Inserting projects...');
        const { error: projectError } = await supabase.from('projects').insert(projects);
        if (projectError) throw projectError;
        console.log(`✅ Projects seeded successfully`);

        console.log('\n✨ Supabase seeding completed successfully!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Seeding error:', err.message);
        process.exit(1);
    }
};

seedDatabase();
