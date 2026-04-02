const fs = require('fs');

try {
    const originalHtml = fs.readFileSync('public/index.html', 'utf8');

    // Extract components
    const beforeHeroParts = originalHtml.split('<!-- Hero Section -->');
    if (beforeHeroParts.length < 2) throw new Error("Could not find Hero Section");
    const beforeHero = beforeHeroParts[0];

    // Get Sections
    const heroToAbout = '<!-- Hero Section -->' + originalHtml.split('<!-- Hero Section -->')[1].split('<!-- Skills Section -->')[0];
    const skillsSection = '<!-- Skills Section -->' + originalHtml.split('<!-- Skills Section -->')[1].split('<!-- Projects Section -->')[0];
    // education section removed
    // const educationSection = '<!-- Education Section -->' + originalHtml.split('<!-- Education Section -->')[1].split('<!-- Projects Section -->')[0];
    const projectsSection = '<!-- Projects Section -->' + originalHtml.split('<!-- Projects Section -->')[1].split('<!-- Blog Section -->')[0];
    const blogSection = '<!-- Blog Section -->' + originalHtml.split('<!-- Blog Section -->')[1].split('<!-- Contact Section -->')[0];
    const contactSection = '<!-- Contact Section -->' + originalHtml.split('<!-- Contact Section -->')[1].split('</main>')[0];
    const afterContact = '</main>' + originalHtml.split('</main>')[1].split('<!-- Glass Management Modals -->')[0];

    const glassOverlayStart = '<!-- Glass Management Modals -->\n    <div id="glass-modal-overlay"\n        class="fixed inset-0 z-[100] hidden bg-background-dark/80 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">\n';
    const glassOverlayEnd = '    </div>\n\n    <script src="js/utils.js"></script>\n    <script src="js/main.js"></script>\n</body>\n</html>';

    const skillModal = '        <!-- Skill Modal -->' + originalHtml.split('<!-- Skill Modal -->')[1].split('<!-- Project Modal -->')[0];
    const projectModal = '        <!-- Project Modal -->' + originalHtml.split('<!-- Project Modal -->')[1].split('    </div>\n\n    <script')[0];

    const blogModal = `
        <!-- Blog Modal -->
        <div id="blog-modal-content"
            class="hidden w-full max-w-md bg-surface border border-slate-800 rounded-3xl p-8 shadow-2xl reveal">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-2xl font-black font-heading">Add Blog Post</h3>
                <button onclick="closeModals()" class="text-slate-500 hover:text-white transition-colors">
                    <span class="material-symbols-outlined">close</span>
                </button>
            </div>
            <form id="blog-form-inline" class="space-y-4">
                <div>
                    <label class="block text-xs font-black text-slate-400 mb-2 uppercase tracking-widest">Title</label>
                    <input class="w-full bg-background-dark/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-700" name="title" required />
                </div>
                <div>
                    <label class="block text-xs font-black text-slate-400 mb-2 uppercase tracking-widest">Content</label>
                    <textarea class="w-full bg-background-dark/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-700" name="content" rows="5" required></textarea>
                </div>
                <button class="w-full bg-primary text-white font-black py-4 rounded-xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 uppercase tracking-widest mt-4" type="submit">Publish Blog</button>
            </form>
        </div>
`;

    // 1. Write index.html
    let newIndexHeader = beforeHero.replace(/href="index\.html#about"/g, 'href="#about"'); // education link removed
    let newIndex = newIndexHeader + heroToAbout + educationSection + afterContact;
    newIndex += '    <script src="js/utils.js"></script>\n    <script src="js/main.js"></script>\n</body>\n</html>';
    fs.writeFileSync('public/index.html', newIndex);

    // 2. Write skills.html
    let skillsPage = beforeHero + '<main class="flex-grow">\n' + skillsSection + afterContact + glassOverlayStart + skillModal + glassOverlayEnd;
    fs.writeFileSync('public/skills.html', skillsPage);

    // 3. Write projects.html
    let projectsPage = beforeHero + '<main class="flex-grow">\n' + projectsSection + afterContact + glassOverlayStart + projectModal + glassOverlayEnd;
    fs.writeFileSync('public/projects.html', projectsPage);

    // 4. Write blog.html
    let blogPage = beforeHero + '<main class="flex-grow">\n' + blogSection + afterContact + glassOverlayStart + blogModal + glassOverlayEnd;
    // Also add an add blog button to blog.html section
    blogPage = blogPage.replace('<h2 class="text-4xl font-black mb-12 font-heading reveal">Latest Insights</h2>',
        '<div class="flex justify-between items-center mb-12"><h2 class="text-4xl font-black font-heading reveal">Latest Insights</h2><button class="admin-only hidden items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl text-sm font-bold transition-all" onclick="openBlogModal()"><span class="material-symbols-outlined text-sm">add</span> Add Post</button></div>');
    fs.writeFileSync('public/blog.html', blogPage);

    // 5. Write contact.html
    let contactPage = beforeHero + '<main class="flex-grow">\n' + contactSection + afterContact + '    <script src="js/utils.js"></script>\n    <script src="js/main.js"></script>\n</body>\n</html>';
    fs.writeFileSync('public/contact.html', contactPage);

    console.log("Pages split successfully.");
} catch (e) {
    console.error("Error during split:", e);
}
