document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(form).entries());
            try {
                const res = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify(data)
                });
                const result = await res.json();
                if (res.ok) { window.location.href = 'dashboard.html'; }
                else { document.getElementById('login-alert').innerHTML = `<div class="alert alert-danger">${result.msg || 'Login failed'}</div>`; }
            } catch (err) { document.getElementById('login-alert').innerHTML = `<div class="alert alert-danger">Server error</div>`; }
        });
    }
});

async function checkAuth() {
    try {
        const res = await fetch('/api/auth/me', {
            credentials: 'include'
        });
        if (!res.ok) { window.location.href = 'login.html'; return null; }
        const user = await res.json();
        if (document.getElementById('admin-email')) document.getElementById('admin-email').innerText = user.email;
        return user;
    } catch (err) { window.location.href = 'login.html'; return null; }
}

async function logout() {
    await fetch('/api/auth/logout', {
        credentials: 'include'
    });
    window.location.href = 'login.html';
}
