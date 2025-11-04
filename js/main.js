
// Simple interactivity and contact form validation
document.addEventListener('DOMContentLoaded', () => {
  // year in footer
  const y = new Date().getFullYear();
  ['year', 'year2', 'year3', 'year4'].forEach(id => { const el = document.getElementById(id); if (el) el.textContent = y });

  // mobile menu toggle (supports multiple hamburger buttons)
  document.querySelectorAll('.hamburger').forEach(hamburger => {
    hamburger.addEventListener('click', () => {
      const nav = document.querySelector('.nav-links');
      if (!nav) return;
      if (getComputedStyle(nav).display === 'none' || nav.style.display === '') nav.style.display = 'flex';
      else nav.style.display = 'none';
    })
  });

  // contact form validation
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const msgEl = document.getElementById('formMsg');

    if (name.length < 3) { msgEl.textContent = 'Please enter your name (min 3 characters).'; msgEl.style.color = '#ffb4b4'; return; }
    if (!/^\S+@\S+\.\S+$/.test(email)) { msgEl.textContent = 'Please enter a valid email.'; msgEl.style.color = '#ffb4b4'; return; }
    if (message.length < 10) { msgEl.textContent = 'Message should be at least 10 characters.'; msgEl.style.color = '#ffb4b4'; return; }

    msgEl.textContent = 'Sending...';
    msgEl.style.color = '#a8f0c6';

    try {
      // 1️⃣ Send message to your email via backend
      const res = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();

      // 2️⃣ Open WhatsApp chat
      const phoneNumber = "918002709804"; // Your WhatsApp number (no + or spaces)
      const text = `Hello, I am ${name}%0AEmail: ${email}%0A%0A${message}`;
      window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');

      if (data.success) {
        msgEl.textContent = '✅ Message sent to your email & WhatsApp!';
      } else {
        msgEl.textContent = '⚠️ WhatsApp opened, but email failed.';
      }

      form.reset();
    } catch (err) {
      msgEl.textContent = '❌ Failed to send message.';
      msgEl.style.color = '#ffb4b4';
    }
  });
}


  
});
