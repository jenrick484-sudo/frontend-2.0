// Frontend login logic: sends credentials to backend /login
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const msg = document.getElementById('message');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    msg.textContent = '';

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ email, password, remember })
      });

      const data = await res.json();

      if (res.ok) {
        msg.style.color = 'green';
        msg.textContent = 'Login successful. Redirecting...';
        // store token (example)
        localStorage.setItem('token', data.token);
        setTimeout(() => { window.location.href = '/admin'; }, 800);
      } else {
        msg.style.color = '#b91c1c';
        msg.textContent = data.message || 'Login failed';
      }
    } catch (err) {
      msg.style.color = '#b91c1c';
      msg.textContent = 'Network error';
      console.error(err);
    }
  });

  // Google sign-in placeholder
  document.getElementById('googleSignIn').addEventListener('click', () => {
    alert('Google sign-in not configured in this demo.');
  });
});