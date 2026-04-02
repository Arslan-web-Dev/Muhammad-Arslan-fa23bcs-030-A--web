// helper to select elements
function q(sel) {
    return document.querySelector(sel);
}

// load users when page opens
document.addEventListener("DOMContentLoaded", () => {
    // automatically load users when the page opens
    fetchUsers();
    // attach refresh button
    q('#loadBtn').addEventListener('click', fetchUsers);
});

// handle form submission for add/update
q('#userForm').addEventListener('submit', e => {
    e.preventDefault();
    const id = q('#userId').value;
    const name = q('#name').value.trim();
    const email = q('#email').value.trim();
    const age = q('#age').value;

    // simple client-side validation
    if (!name || !email || !age) {
        alert('Please fill all fields');
        return;
    }

    const payload = { name, email, age };
    if (id) {
        // update existing
        fetch(`/users/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        })
            .then(() => {
                resetForm();
                fetchUsers();
            })
            .catch(console.error);
    } else {
        // create new
        fetch('/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        })
            .then(() => {
                resetForm();
                fetchUsers();
            })
            .catch(console.error);
    }
});

q('#cancelBtn').addEventListener('click', resetForm);

function fetchUsers() {
    fetch('/users')
        .then(res => res.json())
        .then(data => {
            const tbody = q('#usersTable tbody');
            tbody.innerHTML = '';
            data.forEach(user => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.age}</td>
                    <td>
                        <button class="btn btn-sm btn-warning edit-btn" data-id="${user.id}">Edit</button>
                        <button class="btn btn-sm btn-danger delete-btn" data-id="${user.id}">Delete</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
            attachRowListeners();
        })
        .catch(console.error);
}

function attachRowListeners() {
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            fetch(`/users/${id}`)
                .then(res => res.json())
                .then(user => {
                    // populate form
                    q('#userId').value = user.id;
                    q('#name').value = user.name;
                    q('#email').value = user.email;
                    q('#age').value = user.age;
                    q('#submitBtn').textContent = 'Update User';
                    q('#cancelBtn').style.display = 'inline-block';
                })
                .catch(console.error);
        });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            if (confirm('Are you sure you want to delete this user?')) {
                fetch(`/users/${id}`, { method: 'DELETE' })
                    .then(() => fetchUsers())
                    .catch(console.error);
            }
        });
    });
}

function resetForm() {
    q('#userId').value = '';
    q('#userForm').reset();
    q('#submitBtn').textContent = 'Add User';
    q('#cancelBtn').style.display = 'none';
}
