// Theme Logic
const savedTheme = localStorage.getItem('theme') || 'dark';
document.body.setAttribute('data-theme', savedTheme);

// Animated Cursor Follower
const cursor = document.getElementById('cursor');
if (cursor) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate(${e.clientX - 12}px, ${e.clientY - 12}px)`;
    });

    // Use event delegation for hover effects on dynamic elements
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest('a, button, .card')) {
            cursor.style.transform += ' scale(2.5)';
            cursor.style.background = 'rgba(255, 255, 255, 0.2)';
            cursor.style.border = '1px solid var(--primary)';
            cursor.style.opacity = '0.8';
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target.closest('a, button, .card')) {
            cursor.style.transform = cursor.style.transform.replace(' scale(2.5)', '');
            cursor.style.background = 'var(--primary)';
            cursor.style.border = 'none';
            cursor.style.opacity = '0.2';
        }
    });
}

// 3D Tilt Effect & Magnetic Buttons (Combined for efficiency)
document.addEventListener('mousemove', (e) => {
    // Tilt Effect
    const card = e.target.closest('.card');
    if (card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 12;
        const rotateY = (centerX - x) / 12;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
    }

    // Magnetic Effect
    const btn = e.target.closest('.bg-primary, .border-white\\/20, button');
    if (btn && !btn.closest('.card')) {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    }
});

document.addEventListener('mouseout', (e) => {
    const card = e.target.closest('.card');
    if (card) card.style.transform = '';

    const btn = e.target.closest('.bg-primary, .border-white\\/20, button');
    if (btn) btn.style.transform = '';
});

window.showAlert = (message, type = 'success', containerId) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert border-0 bg-surface shadow-lg text-white alert-dismissible fade show animate-fade-in`;
    alertDiv.innerHTML = `<i class="bi bi-check-circle-fill me-2 text-primary"></i> ${message}<button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert"></button>`;
    container.appendChild(alertDiv);
    setTimeout(() => alertDiv.remove(), 5000);
};
