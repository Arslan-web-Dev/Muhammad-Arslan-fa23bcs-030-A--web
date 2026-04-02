document.addEventListener('DOMContentLoaded', async () => {
  await checkAuth();
  loadAdminProjects();
  loadAdminSkills();
  loadAdminAPIBlogs();
  loadAdminMessages();
  loadAdminUsers(); // Load registered users
  loadContacts(); // populate mail panel contacts
  setupDashboardForms();
});

async function loadAdminProjects() {
  const container = document.getElementById('admin-projects-list');
  const res = await fetch('/api/projects', { credentials: 'include' });
  const projects = await res.json();
  
  // Update stats
  document.getElementById('stats-projects').textContent = projects.length;
  
  container.innerHTML = projects.map((p, idx) => `
    <div class="col-md-4 mb-3" style="animation-delay: ${idx * 0.1}s;">
      <div class="project-card h-100 fade-in">
        <div class="d-flex justify-content-between align-items-start mb-2">
          <h6 class="mb-0">${p.title}</h6>
          <button onclick="deleteItem('projects', '${p._id}', loadAdminProjects)" class="btn btn-link text-danger p-0" title="Delete">
            <i class="bi bi-trash"></i>
          </button>
        </div>
        <p class="text-muted small mb-3">${(p.description || '').substring(0, 100)}...</p>
        ${p.image ? `<img src="${p.image}" class="img-fluid rounded mb-3" style="height: 150px; object-fit: cover;">` : ''}
        <div class="d-flex gap-2">
          <button onclick="editProject('${p._id}', '${p.title}', '${p.description.replace(/'/g, "\\'")}', '${p.image}', '${p.link}')" class="btn btn-sm btn-outline-light flex-grow-1">
            <i class="bi bi-pencil me-1"></i>Edit
          </button>
          ${p.link ? `<a href="${p.link}" target="_blank" class="btn btn-sm btn-outline-light"><i class="bi bi-box-arrow-up-right"></i></a>` : ''}
        </div>
      </div>
    </div>
  `).join('');
}

window.clearProjectForm = () => {
  document.getElementById('project-form').reset();
  document.getElementById('project-id').value = '';
};

window.editProject = (id, title, desc, img, link) => {
  document.getElementById('project-id').value = id;
  document.getElementById('p-title').value = title;
  document.getElementById('p-description').value = desc;
  document.getElementById('p-image').value = img !== 'undefined' ? img : '';
  document.getElementById('p-link').value = link !== 'undefined' ? link : '';
  new bootstrap.Modal('#projectModal').show();
};

window.aiGenerateDescription = async () => {
  const title = document.getElementById('p-title').value;
  const details = document.getElementById('p-ai-details').value;
  if (!title) return alert('Enter title first');
  const btn = event.currentTarget; btn.disabled = true;
  try {
    const res = await fetch('/api/projects/generate-description', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ title, details })
    });
    const data = await res.json();
    if (res.ok) document.getElementById('p-description').value = data.description;
    else alert(data.msg);
  } finally { btn.disabled = false; }
};

async function loadAdminBlogs() {
  const container = document.getElementById('admin-blogs-list');
  const res = await fetch('/api/blog', { credentials: 'include' });
  const blogs = await res.json();
  
  // Update stats
  document.getElementById('stats-blogs').textContent = blogs.length;
  
  container.innerHTML = blogs.length === 0 
    ? '<div class="alert alert-info">No blog posts yet. Create one now!</div>'
    : blogs.map((b, idx) => `
    <div class="blog-card fade-in mb-3" style="animation-delay: ${idx * 0.1}s;">
      <div class="d-flex justify-content-between align-items-start mb-2">
        <div class="flex-grow-1">
          <h6 class="mb-1">${b.title}</h6>
          <small class="text-muted">${new Date(b.createdAt).toLocaleDateString()}</small>
        </div>
        <button onclick="deleteItem('blog', '${b._id}', loadAdminBlogs)" class="btn btn-link text-danger p-0" title="Delete">
          <i class="bi bi-trash"></i>
        </button>
      </div>
      <p class="text-muted small mb-3">${(b.content || '').substring(0, 150)}...</p>
      <button onclick="editBlog('${b._id}', '${b.title}', \`${b.content.replace(/`/g, "\\`")}\`)" class="btn btn-sm btn-outline-light">
        <i class="bi bi-pencil me-1"></i>Edit
      </button>
    </div>
  `).join('');
}

window.clearBlogForm = () => { document.getElementById('blog-form').reset(); document.getElementById('blog-id').value = ''; };

window.editSkill = (id, name, level, category) => {
  document.getElementById('skill-id').value = id;
  document.getElementById('s-name').value = name;
  document.getElementById('s-level').value = level;
  document.getElementById('s-category').value = category || '';
  new bootstrap.Modal('#skillModal').show();
};

window.aiGenerateBlog = async () => {
  const topic = document.getElementById('b-ai-topic').value;
  if (!topic) return alert('Enter topic');
  const btn = event.currentTarget; btn.disabled = true;
  try {
    const res = await fetch('/api/blog/generate-blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ topic })
    });
    const data = await res.json();
    if (res.ok) document.getElementById('b-content').value = data.content;
    else alert(data.msg);
  } finally { btn.disabled = false; }
};

async function loadAdminSkills() {
  const container = document.getElementById('admin-skills-list');
  const res = await fetch('/api/skills', { credentials: 'include' });
  const skills = await res.json();
  
  // Update stats
  document.getElementById('stats-skills').textContent = skills.length;
  
  container.innerHTML = skills.map((s, idx) => `
    <div class="col-md-3 mb-3" style="animation-delay: ${idx * 0.08}s;">
      <div class="skill-card fade-in">
        <div class="d-flex justify-content-between align-items-start mb-3">
          <h6 class="mb-0">${s.name}</h6>
          <button onclick="deleteItem('skills', '${s._id}', loadAdminSkills)" class="btn btn-link text-danger p-0" title="Delete">
            <i class="bi bi-trash"></i>
          </button>
        </div>
        <div class="skill-progress mb-2">
          <div class="skill-progress-bar" style="width: ${s.level}%"></div>
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <small class="text-muted">${s.category || 'Technical'}</small>
          <small class="text-primary fw-bold">${s.level}%</small>
        </div>
      </div>
    </div>
  `).join('');
}

async function loadAdminMessages() {
  const container = document.getElementById('admin-messages-list');
  const res = await fetch('/api/contact', { credentials: 'include' });
  const messages = await res.json();
  
  // Update stats
  document.getElementById('stats-messages').textContent = messages.length;
  
  container.innerHTML = messages.length === 0
    ? '<div class="alert alert-info">No messages yet.</div>'
    : messages.map((m, idx) => `
    <div class="message-card fade-in" style="animation-delay: ${idx * 0.08}s;">
      <div class="d-flex justify-content-between align-items-start mb-2">
        <div>
          <h6 class="mb-1">${m.name}</h6>
          <small class="text-muted">${m.email}</small>
        </div>
        <button onclick="deleteItem('contact', '${m._id}', loadAdminMessages)" class="btn btn-link text-danger p-0" title="Delete">
          <i class="bi bi-trash"></i>
        </button>
      </div>
      <p class="text-light mb-3">${m.message}</p>
      <div class="d-flex justify-content-between align-items-center">
        <small class="text-muted">${new Date(m.createdAt).toLocaleString()}</small>
        <button onclick="generateReply('${m.name}', \`${m.message.replace(/`/g, "\\`")}\`)" class="btn btn-sm btn-outline-info">
          <i class="bi bi-robot me-1"></i>AI Reply
        </button>
      </div>
    </div>
  `).join('');
}

async function loadAdminUsers() {
  const container = document.getElementById('admin-users-list');
  try {
    const res = await fetch('/api/auth/all-users', { credentials: 'include' });
    const users = await res.json();
    if (!res.ok) {
      container.innerHTML = `<div class="alert alert-danger">${users.msg || 'Error loading users'}</div>`;
      return;
    }
    container.innerHTML = users.length === 0 
      ? '<p class="text-muted">No users registered yet</p>'
      : `<table class="table table-sm table-bordered">
        <thead><tr><th>Email</th><th>Registered Date</th></tr></thead>
        <tbody>
          ${users.map(u => `<tr><td>${u.email}</td><td>${new Date(u.created_at).toLocaleString()}</td></tr>`).join('')}
        </tbody>
      </table>`;
  } catch (err) {
    container.innerHTML = `<div class="alert alert-danger">Error loading users</div>`;
  }
}

window.generateReply = async (name, originalMessage) => {
  const res = await fetch('/api/contact/auto-reply', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ name, originalMessage })
  });
  const data = await res.json();
  if (res.ok) { document.getElementById('ai-reply-content').innerText = data.reply; new bootstrap.Modal('#replyModal').show(); }
  else alert(data.msg);
};

window.copyReply = () => { navigator.clipboard.writeText(document.getElementById('ai-reply-content').innerText); alert('Copied'); };

async function deleteItem(endpoint, id, callback) {
  if (confirm('Delete this?')) {
    await fetch(`/api/${endpoint}/${id}`, { method: 'DELETE', headers: await getAuthHeaders() });
    callback();
  }
}

function setupDashboardForms() {
  document.getElementById('project-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    const id = document.getElementById('project-id').value;
    await fetch(id ? `/api/projects/${id}` : '/api/projects', {
      method: id ? 'PUT' : 'POST',
      headers: await getAuthHeaders(),
      body: JSON.stringify(data)
    });
    bootstrap.Modal.getInstance('#projectModal').hide();
    loadAdminProjects();
  });

  document.getElementById('skill-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    const id = document.getElementById('skill-id').value;
    await fetch(id ? `/api/skills/${id}` : '/api/skills', {
      method: id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data)
    });
    bootstrap.Modal.getInstance('#skillModal').hide();
    document.getElementById('skill-form').reset();
    document.getElementById('skill-id').value = '';
    loadAdminSkills();
  });

  document.getElementById('blog-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    const id = document.getElementById('blog-id').value;
    await fetch(id ? `/api/blog/${id}` : '/api/blog', {
      method: id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data)
    });
    bootstrap.Modal.getInstance('#blogModal').hide();
    loadAdminBlogs();
  });

  // mail form
  const mailForm = document.getElementById('mail-form');
  if (mailForm) {
    mailForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.target).entries());
      const payload = {
        to: data.to || undefined,
        subject: data.subject,
        body: data.body,
        broadcast: !!data.broadcast,
      };
      const res = await fetch('/api/mail/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload)
      });
      const resp = await res.json();
      if (res.ok) {
        alert(resp.msg);
        mailForm.reset();
      } else {
        alert(resp.msg || 'Error sending');
      }
    });
  }
}

// new helpers for mail panel
async function loadContacts() {
  const container = document.getElementById('mail-contacts-list');
  const res = await fetch('/api/mail', { credentials: 'include' });
  const contacts = await res.json();
  if (!res.ok) return;
  container.innerHTML = contacts.map(c => `
    <div class="card p-2 mb-2 small">
      <strong>${c.name}</strong> &lt;${c.email}&gt;
      <p class="mb-0 text-muted small">${new Date(c.createdAt).toLocaleString()}</p>
    </div>
  `).join('');
}

// Content Manager Functions
let currentContentType = '';

async function selectContentType(type) {
  currentContentType = type;
  const interface = document.getElementById('content-manager-interface');

  // Update button states
  document.querySelectorAll('#content-manager-interface .btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');

  // Load content based on type
  switch(type) {
    case 'projects':
      await loadContentManagerProjects();
      break;
    case 'skills':
      await loadContentManagerSkills();
      break;
    case 'api-blogs':
      await loadContentManagerAPIBlogs();
      break;
    case 'messages':
      await loadContentManagerMessages();
      break;
    case 'users':
      await loadContentManagerUsers();
      break;
    case 'contacts':
      await loadContentManagerContacts();
      break;
  }
}

async function loadContentManagerProjects() {
  const interface = document.getElementById('content-manager-interface');

  try {
    const res = await fetch('/api/projects', { credentials: 'include' });
    const projects = await res.json();

    interface.innerHTML = `
      <div class="content-card">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="mb-0">Projects Management (${projects.length} items)</h5>
          <button class="btn btn-modern btn-sm" onclick="showAddProjectModal()">
            <i class="bi bi-plus-circle me-1"></i>Add Project
          </button>
        </div>
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Link</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${projects.map(p => `
                <tr>
                  <td>${p.title}</td>
                  <td>${(p.description || '').substring(0, 50)}...</td>
                  <td>${p.link ? `<a href="${p.link}" target="_blank">View</a>` : 'N/A'}</td>
                  <td>
                    <div class="btn-group btn-group-sm">
                      <button onclick="editProject('${p._id}', '${p.title}', '${(p.description || '').replace(/'/g, "\\'")}', '${p.image || ''}', '${p.link || ''}')" class="btn btn-outline-primary btn-sm">
                        <i class="bi bi-pencil"></i>
                      </button>
                      <button onclick="deleteItem('projects', '${p._id}', () => selectContentType('projects'))" class="btn btn-outline-danger btn-sm">
                        <i class="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  } catch (error) {
    interface.innerHTML = '<div class="alert alert-danger">Error loading projects</div>';
  }
}

async function loadContentManagerSkills() {
  const interface = document.getElementById('content-manager-interface');

  try {
    const res = await fetch('/api/skills', { credentials: 'include' });
    const skills = await res.json();

    interface.innerHTML = `
      <div class="content-card">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="mb-0">Skills Management (${skills.length} items)</h5>
          <button class="btn btn-modern btn-sm" onclick="showAddSkillModal()">
            <i class="bi bi-plus-circle me-1"></i>Add Skill
          </button>
        </div>
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Level</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${skills.map(s => `
                <tr>
                  <td>${s.name}</td>
                  <td>${s.level}%</td>
                  <td>${s.category || 'Technical'}</td>
                  <td>
                    <div class="btn-group btn-group-sm">
                      <button onclick="editSkill('${s._id}', '${s.name}', '${s.level}', '${s.category || ''}')" class="btn btn-outline-primary btn-sm">
                        <i class="bi bi-pencil"></i>
                      </button>
                      <button onclick="deleteItem('skills', '${s._id}', () => selectContentType('skills'))" class="btn btn-outline-danger btn-sm">
                        <i class="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  } catch (error) {
    interface.innerHTML = '<div class="alert alert-danger">Error loading skills</div>';
  }
}

async function loadContentManagerAPIBlogs() {
  const interface = document.getElementById('content-manager-interface');

  try {
    const res = await fetch('/api/blog', { credentials: 'include' });
    const blogs = await res.json();

    interface.innerHTML = `
      <div class="content-card">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="mb-0">API Blogs Management (${blogs.length} items)</h5>
          <div class="d-flex gap-2">
            <button class="btn btn-success btn-sm" onclick="fetchNewAPIs()">
              <i class="bi bi-cloud-download me-1"></i>Fetch APIs
            </button>
            <button class="btn btn-modern btn-sm" onclick="showAddAPIBlogModal()">
              <i class="bi bi-plus-circle me-1"></i>Add Manual
            </button>
          </div>
        </div>
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Auth</th>
                <th>Added</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${blogs.map(b => `
                <tr>
                  <td>${b.name}</td>
                  <td><span class="badge bg-secondary">${b.category}</span></td>
                  <td>${b.auth || 'None'}</td>
                  <td>${new Date(b.date_added).toLocaleDateString()}</td>
                  <td>
                    <div class="btn-group btn-group-sm">
                      <button onclick="viewAPIDetails('${b.id}')" class="btn btn-outline-info btn-sm">
                        <i class="bi bi-eye"></i>
                      </button>
                      <button onclick="deleteAPI('${b.id}')" class="btn btn-outline-danger btn-sm">
                        <i class="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  } catch (error) {
    interface.innerHTML = '<div class="alert alert-danger">Error loading API blogs</div>';
  }
}

async function loadContentManagerMessages() {
  const interface = document.getElementById('content-manager-interface');

  try {
    const res = await fetch('/api/contact', { credentials: 'include' });
    const messages = await res.json();

    interface.innerHTML = `
      <div class="content-card">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="mb-0">Messages Management (${messages.length} items)</h5>
          <button class="btn btn-outline-light btn-sm" onclick="loadContentManagerMessages()">
            <i class="bi bi-arrow-clockwise me-1"></i>Refresh
          </button>
        </div>
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${messages.map(m => `
                <tr>
                  <td>${m.name}</td>
                  <td>${m.email}</td>
                  <td>${(m.message || '').substring(0, 50)}...</td>
                  <td>${new Date(m.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div class="btn-group btn-group-sm">
                      <button onclick="viewMessage('${m._id}')" class="btn btn-outline-info btn-sm">
                        <i class="bi bi-eye"></i>
                      </button>
                      <button onclick="deleteItem('contact', '${m._id}', () => selectContentType('messages'))" class="btn btn-outline-danger btn-sm">
                        <i class="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  } catch (error) {
    interface.innerHTML = '<div class="alert alert-danger">Error loading messages</div>';
  }
}

async function loadContentManagerUsers() {
  const interface = document.getElementById('content-manager-interface');

  try {
    const res = await fetch('/api/auth/all-users', { credentials: 'include' });
    const users = await res.json();

    if (!res.ok) {
      interface.innerHTML = `<div class="alert alert-danger">${users.msg || 'Error loading users'}</div>`;
      return;
    }

    interface.innerHTML = `
      <div class="content-card">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="mb-0">Users Management (${users.length} items)</h5>
        </div>
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Email</th>
                <th>Registered</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${users.map(u => `
                <tr>
                  <td>${u.email}</td>
                  <td>${new Date(u.created_at).toLocaleDateString()}</td>
                  <td><span class="badge bg-success">Active</span></td>
                  <td>
                    <div class="btn-group btn-group-sm">
                      <button onclick="resetUserPassword('${u.id}')" class="btn btn-outline-warning btn-sm">
                        <i class="bi bi-key"></i>
                      </button>
                      <button onclick="deleteUser('${u.id}')" class="btn btn-outline-danger btn-sm">
                        <i class="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  } catch (error) {
    interface.innerHTML = '<div class="alert alert-danger">Error loading users</div>';
  }
}

async function loadContentManagerContacts() {
  const interface = document.getElementById('content-manager-interface');

  try {
    const res = await fetch('/api/mail', { credentials: 'include' });
    const contacts = await res.json();

    interface.innerHTML = `
      <div class="content-card">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="mb-0">Contacts Management (${contacts.length} items)</h5>
        </div>
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${contacts.map(c => `
                <tr>
                  <td>${c.name}</td>
                  <td>${c.email}</td>
                  <td>${new Date(c.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div class="btn-group btn-group-sm">
                      <button onclick="composeEmail('${c.email}')" class="btn btn-outline-primary btn-sm">
                        <i class="bi bi-envelope"></i>
                      </button>
                      <button onclick="deleteContact('${c._id}')" class="btn btn-outline-danger btn-sm">
                        <i class="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  } catch (error) {
    interface.innerHTML = '<div class="alert alert-danger">Error loading contacts</div>';
  }
}

async function loadAdminAPIBlogs() {
  const container = document.getElementById('admin-api-blogs-list');
  const res = await fetch('/api/blog', { credentials: 'include' });
  const blogs = await res.json();
  
  // Update stats
  document.getElementById('stats-api-blogs').textContent = blogs.length;
  
  container.innerHTML = blogs.length === 0 
    ? '<div class="alert alert-info">No API blogs yet. Fetch some APIs!</div>'
    : blogs.map((b, idx) => `
    <div class="api-blog-card fade-in mb-3" style="animation-delay: ${idx * 0.1}s;">
      <div class="d-flex justify-content-between align-items-start mb-2">
        <div class="flex-grow-1">
          <h6 class="mb-1">${b.name}</h6>
          <small class="text-muted">${b.category} • ${b.auth || 'No Auth'}</small>
        </div>
        <button onclick="deleteAPI('${b.id}')" class="btn btn-link text-danger p-0" title="Delete">
          <i class="bi bi-trash"></i>
        </button>
      </div>
      <p class="text-muted small mb-3">${(b.description || '').substring(0, 150)}...</p>
      <div class="d-flex justify-content-between align-items-center">
        <small class="text-muted">${new Date(b.date_added).toLocaleDateString()}</small>
        <a href="${b.link}" target="_blank" class="btn btn-sm btn-outline-light">
          <i class="bi bi-link-45deg me-1"></i>View API
        </a>
      </div>
    </div>
  `).join('');
}

async function fetchNewAPIs() {
  if (confirm('Fetch new APIs from public API directory?')) {
    try {
      const res = await fetch('/api/fetch-apis', {
        method: 'POST',
        credentials: 'include'
      });
      const data = await res.json();
      if (res.ok) {
        showNotification(data.msg, 'success');
        loadAdminAPIBlogs();
        if (currentContentType === 'api-blogs') {
          selectContentType('api-blogs');
        }
      } else {
        showNotification(data.msg, 'error');
      }
    } catch (error) {
      showNotification('Error fetching APIs', 'error');
    }
  }
}

async function deleteAPI(id) {
  if (confirm('Delete this API blog?')) {
    try {
      const res = await fetch(`/api/blog/api/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      const data = await res.json();
      if (res.ok) {
        showNotification(data.msg, 'success');
        loadAdminAPIBlogs();
        if (currentContentType === 'api-blogs') {
          selectContentType('api-blogs');
        }
      } else {
        showNotification(data.msg, 'error');
      }
    } catch (error) {
      showNotification('Error deleting API blog', 'error');
    }
  }
}

async function viewAPIDetails(id) {
  try {
    const res = await fetch(`/api/blog/api/${id}`, { credentials: 'include' });
    const api = await res.json();
    
    if (res.ok) {
      // Show API details in a modal
      const modal = document.createElement('div');
      modal.className = 'modal fade';
      modal.innerHTML = `
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">${api.name}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-6">
                  <h6>API Details</h6>
                  <p><strong>Category:</strong> ${api.category}</p>
                  <p><strong>Auth:</strong> ${api.auth || 'None'}</p>
                  <p><strong>HTTPS:</strong> ${api.https ? 'Yes' : 'No'}</p>
                  <p><strong>Added:</strong> ${new Date(api.date_added).toLocaleDateString()}</p>
                </div>
                <div class="col-md-6">
                  <h6>SEO Content</h6>
                  <p><strong>Title:</strong> ${api.seo_title || 'N/A'}</p>
                  <p><strong>Description:</strong> ${api.seo_description ? api.seo_description.substring(0, 100) + '...' : 'N/A'}</p>
                </div>
              </div>
              <div class="mt-3">
                <h6>Description</h6>
                <p>${api.description}</p>
                <h6>Tutorial</h6>
                <div class="border p-3 rounded" style="max-height: 200px; overflow-y: auto;">
                  ${api.tutorial || 'No tutorial available'}
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <a href="${api.link}" target="_blank" class="btn btn-primary">View API Documentation</a>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      new bootstrap.Modal(modal).show();
      modal.addEventListener('hidden.bs.modal', () => modal.remove());
    } else {
      showNotification('Error loading API details', 'error');
    }
  } catch (error) {
    showNotification('Error loading API details', 'error');
  }
}

// Live Editor Functions
async function loadPageForEditing() {
  const page = document.getElementById('page-selector').value;
  const interface = document.getElementById('live-editor-interface');
  const tools = document.getElementById('editor-tools');

  if (!page) {
    showNotification('Please select a page first', 'warning');
    return;
  }

  try {
    // Load the page content
    const res = await fetch(`/${page}.html`);
    const html = await res.text();

    interface.innerHTML = `
      <div class="content-card">
        <div class="alert alert-info">
          <i class="bi bi-info-circle me-2"></i>
          <strong>Live Editor Mode:</strong> Click on any editable element to modify content in real-time.
          Changes are saved automatically.
        </div>
        <div id="page-preview" class="border rounded p-3" style="max-height: 600px; overflow-y: auto;">
          ${html}
        </div>
      </div>
    `;

    tools.classList.remove('d-none');
    showNotification(`Loaded ${page} page for editing`, 'success');

  } catch (error) {
    interface.innerHTML = '<div class="alert alert-danger">Error loading page for editing</div>';
    showNotification('Error loading page', 'error');
  }
}

function enableEditMode() {
  const preview = document.getElementById('page-preview');

  // Make elements editable
  const editableElements = preview.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, div[contenteditable]');
  editableElements.forEach(el => {
    el.contentEditable = 'true';
    el.classList.add('editable-element');
    el.addEventListener('input', () => {
      el.classList.add('unsaved-changes');
    });
  });

  showNotification('Edit mode enabled. Click on text to edit.', 'info');
}

async function savePageChanges() {
  const page = document.getElementById('page-selector').value;
  const preview = document.getElementById('page-preview');

  // Collect changes
  const changes = {};
  const editedElements = preview.querySelectorAll('.unsaved-changes');

  editedElements.forEach((el, index) => {
    changes[`element_${index}`] = {
      selector: getElementSelector(el),
      content: el.innerHTML
    };
  });

  if (Object.keys(changes).length === 0) {
    showNotification('No changes to save', 'info');
    return;
  }

  try {
    const res = await fetch('/api/content/save-changes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ page, changes })
    });

    if (res.ok) {
      editedElements.forEach(el => el.classList.remove('unsaved-changes'));
      showNotification('Changes saved successfully!', 'success');
    } else {
      showNotification('Error saving changes', 'error');
    }
  } catch (error) {
    showNotification('Network error saving changes', 'error');
  }
}

function previewChanges() {
  const editedElements = document.querySelectorAll('.unsaved-changes');
  showNotification(`${editedElements.length} unsaved changes pending`, 'info');
}

function discardChanges() {
  if (confirm('Discard all unsaved changes?')) {
    location.reload();
  }
}

function getElementSelector(element) {
  // Generate a unique selector for the element
  if (element.id) return `#${element.id}`;
  if (element.className) return `.${element.className.split(' ').join('.')}`;

  let path = [];
  let current = element;
  while (current && current.nodeType === Node.ELEMENT_NODE) {
    let selector = current.nodeName.toLowerCase();
    if (current.id) {
      selector += `#${current.id}`;
      path.unshift(selector);
      break;
    } else if (current.className) {
      selector += `.${current.className.split(' ').join('.')}`;
    }
    path.unshift(selector);
    current = current.parentNode;
    if (path.length > 5) break; // Limit depth
  }
  return path.join(' > ');
}

// Additional helper functions
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <i class="bi bi-${type === 'success' ? 'check-circle' : type === 'error' ? 'x-circle' : 'info-circle'} me-2"></i>
    ${message}
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 5000);
}

function showAddProjectModal() {
  clearProjectForm();
  new bootstrap.Modal('#projectModal').show();
}

function showAddSkillModal() {
  document.getElementById('skill-form').reset();
  document.getElementById('skill-id').value = '';
  new bootstrap.Modal('#skillModal').show();
}

function showAddAPIBlogModal() {
  // This would open a modal for manual API entry
  showNotification('Manual API entry feature coming soon', 'info');
}

function viewMessage(id) {
  // Find and display message details
  showNotification('Message viewer feature coming soon', 'info');
}

function resetUserPassword(id) {
  if (confirm('Reset this user\'s password?')) {
    showNotification('Password reset feature coming soon', 'info');
  }
}

function deleteUser(id) {
  if (confirm('Delete this user? This action cannot be undone.')) {
    showNotification('User deletion feature coming soon', 'info');
  }
}

function deleteContact(id) {
  if (confirm('Delete this contact?')) {
    showNotification('Contact deletion feature coming soon', 'info');
  }
}

function composeEmail(email) {
  document.getElementById('mail-to').value = email;
  // Switch to mail tab
  const mailTab = new bootstrap.Tab(document.querySelector('[data-bs-target="#tab-mail"]'));
  mailTab.show();
  showNotification('Switched to mail composer', 'info');
}

