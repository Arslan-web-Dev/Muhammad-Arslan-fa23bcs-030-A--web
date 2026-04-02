document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('skills-container')) loadSkills();
  if (document.getElementById('projects-container')) loadProjects();
  if (document.getElementById('blog-container')) loadBlogs();
  if (document.getElementById('contact-form')) setupContactForm();
  initAnimations();
  checkAdminStatus();
  setupInlineManagement();
  setupThemeToggle();
  setupMobileMenu();
});

function setupMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const toggleIcon = toggleBtn ? toggleBtn.querySelector('span') : null;

  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      if (toggleIcon) {
        toggleIcon.textContent = mobileMenu.classList.contains('hidden') ? 'menu' : 'close';
      }
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        if (toggleIcon) toggleIcon.textContent = 'menu';
      });
    });
  }
}

async function checkAdminStatus() {
  try {
    const res = await fetch('/api/auth/me', { credentials: 'include' });
    console.log('Admin status check response:', res.status, res.ok);
    if (res.ok) {
      console.log('User is logged in, showing admin buttons');
      // Show admin buttons
      document.querySelectorAll('.admin-only').forEach(el => {
        el.classList.remove('hidden');
        el.classList.add('flex');
        console.log('Made element visible:', el);
      });
    } else {
      console.log('User is not logged in - please log in to see admin buttons');
      // Don't show buttons if not logged in
    }
  } catch (err) {
    console.error('Error checking admin status', err);
  }
}

function openSkillModal() {
  document.getElementById('glass-modal-overlay').classList.remove('hidden');
  document.getElementById('skill-modal-content').classList.remove('hidden');
}

function openProjectModal() {
  document.getElementById('glass-modal-overlay').classList.remove('hidden');
  document.getElementById('project-modal-content').classList.remove('hidden');
}

function openBlogModal() {
  const overlay = document.getElementById('glass-modal-overlay');
  const content = document.getElementById('blog-modal-content');
  if (overlay) overlay.classList.remove('hidden');
  if (content) content.classList.remove('hidden');
}

function closeModals() {
  const overlay = document.getElementById('glass-modal-overlay');
  const skillModal = document.getElementById('skill-modal-content');
  const projectModal = document.getElementById('project-modal-content');
  const blogModal = document.getElementById('blog-modal-content');
  const blogDetailModal = document.getElementById('blog-detail-modal');

  if (overlay) overlay.classList.add('hidden');
  if (skillModal) skillModal.classList.add('hidden');
  if (projectModal) projectModal.classList.add('hidden');
  if (blogModal) blogModal.classList.add('hidden');
  if (blogDetailModal) blogDetailModal.classList.add('hidden');
}

function setupThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  if (themeToggle) {
    // Check local storage for preference
    const storedTheme = localStorage.getItem('theme');
    const toggleIcon = themeToggle.querySelector('span');

    if (storedTheme === 'light') {
      htmlElement.classList.remove('dark');
      if (toggleIcon) toggleIcon.textContent = 'light_mode';
    } else {
      htmlElement.classList.add('dark'); // Default based on index.html
      if (toggleIcon) toggleIcon.textContent = 'dark_mode';
    }

    themeToggle.addEventListener('click', () => {
      if (htmlElement.classList.contains('dark')) {
        htmlElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        if (toggleIcon) toggleIcon.textContent = 'light_mode';
      } else {
        htmlElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        if (toggleIcon) toggleIcon.textContent = 'dark_mode';
      }
    });
  }
}

function setupInlineManagement() {
  // Skill Form
  const skillForm = document.getElementById('skill-form-inline');
  if (skillForm) {
    skillForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(skillForm).entries());
      try {
        const res = await fetch('/api/skills', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(data)
        });
        if (res.ok) {
          closeModals();
          loadSkills();
          skillForm.reset();
        } else {
          const errData = await res.json().catch(() => ({}));
          alert(`Error: ${errData.msg || 'Failed to save skill'}`);
        }
      } catch (err) {
        console.error('Error saving skill:', err);
        alert('Network error saving skill.');
      }
    });
  }

  // Project Form
  const projectForm = document.getElementById('project-form-inline');
  if (projectForm) {
    projectForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(projectForm).entries());
      try {
        const res = await fetch('/api/projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(data)
        });
        if (res.ok) {
          closeModals();
          loadProjects();
          projectForm.reset();
        } else {
          const errData = await res.json().catch(() => ({}));
          alert(`Error: ${errData.msg || 'Failed to save project'}`);
        }
      } catch (err) {
        console.error('Error saving project:', err);
        alert('Network error saving project.');
      }
    });
  }

  // Blog Form
  const blogForm = document.getElementById('blog-form-inline');
  if (blogForm) {
    blogForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(blogForm).entries());
      try {
        const res = await fetch('/api/blog', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(data)
        });
        if (res.ok) {
          closeModals();
          loadBlogs();
          blogForm.reset();
        } else {
          const errData = await res.json().catch(() => ({}));
          alert(`Error: ${errData.msg || 'Failed to save blog post'}`);
        }
      } catch (err) {
        console.error('Error saving blog:', err);
        alert('Network error saving blog post.');
      }
    });
  }
}

function initAnimations() {
  // Typing Effect
  const target = document.getElementById('typing-target');
  if (target) {
    const roles = ['Digital Experiences', 'Next-Gen Solutions', 'AI-Powered Apps', 'Modern Architectures'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const currentRole = roles[roleIndex];
      if (isDeleting) {
        target.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
      } else {
        target.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
      }

      let typeSpeed = isDeleting ? 50 : 100;

      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500;
      }

      setTimeout(type, typeSpeed);
    }
    type();
  }

  // Scroll Reveal Observer
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);

  window.revealObserver = observer;
  document.querySelectorAll('.reveal, .reveal-skew').forEach(el => observer.observe(el));
}

async function loadSkills() {
  const container = document.getElementById('skills-container');
  if (!container) return;
  try {
    const res = await fetch('/api/skills', { credentials: 'include' });
    const skills = await res.json();
    if (skills.length === 0) { container.innerHTML = '<p class="text-center col-span-full opacity-50">No skills added yet.</p>'; return; }
    container.innerHTML = skills.map((skill, index) => `
      <div class="p-6 rounded-2xl bg-surface border border-slate-800 hover:border-primary/50 transition-all reveal shadow-xl group card relative" style="animation-delay: ${index * 0.1}s">
        <button class="admin-only hidden absolute top-4 right-4 text-slate-600 hover:text-red-500 transition-colors z-10" onclick="deleteSkill('${skill._id}')">
          <span class="material-symbols-outlined text-sm">delete</span>
        </button>
        <div class="flex justify-between items-center mb-4">
          <h3 class="font-bold text-lg font-heading group-hover:text-primary transition-colors">${skill.name}</h3>
          <span class="text-primary font-black text-sm">${skill.level}%</span>
        </div>
        <div class="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
          <div class="h-full bg-primary" style="width: ${skill.level}%"></div>
        </div>
        <div class="mt-4 text-xs font-black text-slate-500 uppercase tracking-widest">${skill.category || 'Technical'}</div>
      </div>
    `).join('');
    checkAdminStatus(); // Show delete buttons if logged in
    // Re-observe new elements
    document.querySelectorAll('.reveal').forEach(el => window.revealObserver?.observe(el));
  } catch (err) { console.error('Error loading skills:', err); }
}

async function deleteSkill(id) {
  if (!confirm('Are you sure you want to delete this skill?')) return;
  try {
    const res = await fetch(`/api/skills/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    if (res.ok) loadSkills();
  } catch (err) { console.error('Error deleting skill:', err); }
}

async function loadProjects() {
  const container = document.getElementById('projects-container');
  if (!container) return;
  try {
    const res = await fetch('/api/projects', { credentials: 'include' });
    const projects = await res.json();
    if (projects.length === 0) { container.innerHTML = '<p class="text-center col-span-full opacity-50">No projects to show yet.</p>'; return; }
    container.innerHTML = projects.map((p, index) => `
      <div class="group bg-surface rounded-3xl overflow-hidden border border-slate-800 hover:border-primary/50 transition-all flex flex-col reveal card relative" style="animation-delay: ${index * 0.15}s">
        <button class="admin-only hidden absolute top-4 right-4 text-white/50 hover:text-red-500 transition-colors z-20 bg-black/20 backdrop-blur-md p-2 rounded-full" onclick="deleteProject('${p._id}')">
          <span class="material-symbols-outlined text-sm">delete</span>
        </button>
        <div class="relative h-56 overflow-hidden">
          <img src="${p.image || 'https://via.placeholder.com/600x400/1a2733/259df4?text=Project'}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="${p.title}">
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent"></div>
        </div>
        <div class="p-8 flex-grow flex flex-col">
          <h3 class="text-2xl font-bold mb-3 font-heading group-hover:text-primary transition-colors">${p.title}</h3>
          <p class="text-slate-400 text-sm mb-6 flex-grow leading-relaxed">${p.description}</p>
          <div class="flex justify-between items-center mt-auto pt-4 border-t border-slate-800/50">
            ${p.link ? `
              <a href="${p.link}" target="_blank" class="text-primary font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                Live Demo <span class="material-symbols-outlined text-sm">open_in_new</span>
              </a>
            ` : ''}
          </div>
        </div>
      </div>
    `).join('');
    checkAdminStatus(); // Show delete buttons if logged in
    document.querySelectorAll('.reveal').forEach(el => window.revealObserver?.observe(el));
  } catch (err) { console.error('Error loading projects:', err); }
}

async function deleteProject(id) {
  if (!confirm('Are you sure you want to delete this project?')) return;
  try {
    const res = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    if (res.ok) loadProjects();
  } catch (err) { console.error('Error deleting project:', err); }
}

async function deleteBlog(id) {
  if (!confirm('Are you sure you want to delete this blog post?')) return;
  try {
    const res = await fetch(`/api/blog/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    if (res.ok) loadBlogs();
  } catch (err) { console.error('Error deleting blog:', err); }
}

let blogsData = [];

async function loadBlogs() {
  const container = document.getElementById('blog-container');
  if (!container) {
    console.log('Blog container not found');
    return;
  }
  console.log('Loading blogs...');
  try {
    const res = await fetch('/api/blog', { credentials: 'include' });
    if (!res.ok) {
      container.innerHTML = `<p class="text-center col-span-full text-red-500">Error fetching blogs: ${res.status} (${res.statusText})</p>`;
      return;
    }
    blogsData = await res.json();
    console.log('Blogs fetched:', blogsData);
    const blogs = blogsData;
    if (!Array.isArray(blogs) || blogs.length === 0) {
      container.innerHTML = '<p class="text-center col-span-full opacity-50">No blog posts yet.</p>';
      return;
    }
    container.innerHTML = blogs.map((b, index) => {
      if (b.type === 'regular') {
        // Regular blog post
        return `
          <div class="bg-surface rounded-3xl p-8 border border-slate-800 hover:border-primary/50 transition-all reveal shadow-xl group card" style="animation-delay: ${index * 0.1}s">
            <div class="flex justify-between items-start mb-4">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-primary">article</span>
                <span class="text-xs font-black text-slate-400 uppercase tracking-widest">Blog Post</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-xs text-slate-500">${new Date(b.createdAt).toLocaleDateString()}</span>
                <button class="admin-only hidden text-red-500 hover:text-red-700 transition-colors" onclick="deleteBlog('${b.id}')">
                  <span class="material-symbols-outlined text-sm">delete</span>
                </button>
              </div>
            </div>
            <h3 class="text-xl font-bold mb-3 font-heading group-hover:text-primary transition-colors">${b.title}</h3>
            <p class="text-slate-400 text-sm mb-6 leading-relaxed">${(b.content || '').substring(0, 200)}...</p>
            <div class="flex gap-3">
              <button onclick="readBlog('${b.id}')" class="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all">
                <span class="material-symbols-outlined text-sm">article</span> Read More
              </button>
            </div>
          </div>
        `;
      } else {
        // API blog
        return `
          <div class="bg-surface rounded-3xl p-8 border border-slate-800 hover:border-primary/50 transition-all reveal shadow-xl group card" style="animation-delay: ${index * 0.1}s">
            <div class="flex justify-between items-start mb-4">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-primary">api</span>
                <span class="text-xs font-black text-slate-400 uppercase tracking-widest">${b.category}</span>
              </div>
              <div class="flex items-center gap-2">
                ${b.https ? '<span class="text-green-500 text-xs font-bold">HTTPS</span>' : '<span class="text-red-500 text-xs font-bold">HTTP</span>'}
                <span class="text-xs text-slate-500">${b.auth || 'No Auth'}</span>
              </div>
            </div>
            <h3 class="text-xl font-bold mb-3 font-heading group-hover:text-primary transition-colors">${b.title || b.name}</h3>
            <p class="text-slate-400 text-sm mb-6 leading-relaxed">${b.description}</p>
            <div class="flex gap-3">
              <a href="${b.link}" target="_blank" class="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all">
                <span class="material-symbols-outlined text-sm">link</span> View API
              </a>
              <button onclick="readBlog('${b.id}')" class="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all">
                <span class="material-symbols-outlined text-sm">article</span> Read Blog
              </button>
            </div>
          </div>
        `;
      }
    }).join('');
    checkAdminStatus(); // Show delete buttons if logged in
    document.querySelectorAll('.reveal').forEach(el => window.revealObserver?.observe(el));
  } catch (err) {
    console.error('Error loading blogs:', err);
    container.innerHTML = `<p class="text-center col-span-full text-red-500">Error loading blogs: ${err.message}</p>`;
  }
}

function readBlog(id) {
  const blog = blogsData.find(b => b.id === id);
  if (!blog) return;

  if (blog.type === 'regular') {
    // Regular blog post
    document.getElementById('blog-detail-title').textContent = blog.title;
    document.getElementById('blog-detail-content').innerHTML = `
      <div class="mb-6">
        <h4 class="text-lg font-bold mb-2">Published</h4>
        <p class="text-slate-400">${new Date(blog.createdAt).toLocaleDateString()}</p>
      </div>
      <div class="mb-6">
        <h4 class="text-lg font-bold mb-2">Author</h4>
        <p class="text-slate-400">${blog.author}</p>
      </div>
      <div class="mb-6">
        <h4 class="text-lg font-bold mb-2">Content</h4>
        <div class="text-slate-400 prose prose-invert max-w-none">${blog.content.replace(/\n/g, '<br>')}</div>
      </div>
    `;
  } else {
    // API blog
    document.getElementById('blog-detail-title').textContent = blog.seo_title || blog.name;
    document.getElementById('blog-detail-content').innerHTML = `
      <div class="mb-6">
        <h4 class="text-lg font-bold mb-2">Description</h4>
        <p class="text-slate-400">${blog.description}</p>
      </div>
      <div class="mb-6">
        <h4 class="text-lg font-bold mb-2">Category</h4>
        <p class="text-slate-400">${blog.category}</p>
      </div>
      <div class="mb-6">
        <h4 class="text-lg font-bold mb-2">Tutorial</h4>
        <p class="text-slate-400">${blog.tutorial || blog.content}</p>
      </div>
      ${blog.example_code ? `
        <div class="mb-6">
          <h4 class="text-lg font-bold mb-2">Example Code</h4>
          <pre class="bg-slate-800 p-4 rounded-lg text-sm overflow-x-auto"><code>${blog.example_code}</code></pre>
        </div>
      ` : ''}
      <div class="flex gap-3">
        <a href="${blog.link}" target="_blank" class="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all">
          <span class="material-symbols-outlined text-sm">link</span> View API
        </a>
      </div>
    `;
  }

  document.getElementById('glass-modal-overlay').classList.remove('hidden');
  document.getElementById('blog-detail-modal').classList.remove('hidden');
}

function setupContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data)
      });
      if (res.ok) { showAlert('Message sent!', 'success', 'contact-alert'); form.reset(); }
      else { showAlert('Error sending message', 'danger', 'contact-alert'); }
    } catch (err) { showAlert('Connection error', 'danger', 'contact-alert'); }
  });
}
