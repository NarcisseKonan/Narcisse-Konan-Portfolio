
    const EMAILJS_PUBLIC_KEY  = "8HPeh0DY1MrLfZQkQ"; 
    const EMAILJS_SERVICE_ID  = "service_mqtq70g";  
    const EMAILJS_TEMPLATE_ID = "template_gp2xnv9";

    emailjs.init(EMAILJS_PUBLIC_KEY);

    /* ─── TOAST ─── */
    function showToast(message, type) {
      const toast = document.getElementById('toast');
      const icon = type === 'success'
        ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`
        : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`;
      toast.innerHTML = icon + message;
      toast.className = `toast ${type} show`;
      setTimeout(() => toast.classList.remove('show'), 4500);
    }

    document.getElementById('contactForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const btn = document.getElementById('submitBtn');
      btn.textContent = 'Envoi en cours...';
      btn.disabled = true;

      emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, this)
        .then(() => {
          showToast('Message envoyé ! Je vous réponds sous 24h.', 'success');
          this.reset();
        })
        .catch((err) => {
          console.error('EmailJS error :', err);
          showToast('Erreur d\'envoi. Vérifie tes clés EmailJS dans le code.', 'error');
        })
        .finally(() => {
          btn.textContent = 'Envoyer le message →';
          btn.disabled = false;
        });
    });

    /* CURSOR */
    const cursor = document.getElementById('cursor');
    const ring   = document.getElementById('cursorRing');
    let mx=0, my=0, rx=0, ry=0;
    document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; });
    (function animCursor() {
      rx += (mx-rx)*0.12; ry += (my-ry)*0.12;
      cursor.style.transform = `translate(${mx-4}px,${my-4}px)`;
      ring.style.transform   = `translate(${rx-18}px,${ry-18}px)`;
      requestAnimationFrame(animCursor);
    })();
    document.querySelectorAll('a,button,.project-card,.stat-box').forEach(el => {
      el.addEventListener('mouseenter', () => { ring.style.width='56px'; ring.style.height='56px'; ring.style.opacity='0.6'; });
      el.addEventListener('mouseleave', () => { ring.style.width='36px'; ring.style.height='36px'; ring.style.opacity='1'; });
    });

    /* NAV SCROLL */
    const nav = document.getElementById('navbar');
    window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 60));

    /* REVEAL */
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          e.target.style.transitionDelay = (i % 4) * 0.1 + 's';
          e.target.classList.add('visible');
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(r => obs.observe(r));

    /* SKILL BARS */
    const skillObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting)
          e.target.querySelectorAll('.skill-fill').forEach(b => b.style.width = b.dataset.width + '%');
      });
    }, { threshold: 0.3 });
    document.querySelectorAll('.skill-group').forEach(g => skillObs.observe(g));

    /* ACTIVE NAV */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
      navLinks.forEach(a => { a.style.color = a.getAttribute('href') === '#'+current ? 'var(--gold)' : ''; });
    });
