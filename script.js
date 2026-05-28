/* =========================================================
   AGROFORTE - SCRIPT.JS
   Landing Page: Interatividade, UX e animações
   Vanilla JS (ES6+)
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     1. MENU MOBILE (HAMBÚRGUER)
  ========================================================= */

  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    // Abrir/fechar menu mobile
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      menuToggle.classList.toggle("active");
    });

    // Fechar menu ao clicar em um link
    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.classList.remove("active");
      });
    });
  }

  /* =========================================================
     2. EFEITO NO HEADER AO ROLAR (SCROLL EFFECT)
  ========================================================= */

  const header = document.querySelector("header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  /* =========================================================
     3. SMOOTH SCROLL COM COMPENSAÇÃO DO HEADER FIXO
  ========================================================= */

  const headerHeight = header ? header.offsetHeight : 80;

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      if (targetId.length > 1) {
        e.preventDefault();

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          const offsetTop = targetElement.offsetTop - headerHeight;

          window.scrollTo({
            top: offsetTop,
            behavior: "smooth"
          });
        }
      }
    });
  });

  /* =========================================================
     4. REVEAL ON SCROLL (INTERSECTION OBSERVER)
  ========================================================= */

  const revealElements = document.querySelectorAll(
    ".card, .tech-container, .gallery-grid img"
  );

  const observerOptions = {
    threshold: 0.15
  };

  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => {
    el.classList.add("hidden");
    revealOnScroll.observe(el);
  });

  /* =========================================================
     5. VALIDAÇÃO DE FORMULÁRIO DE CONTATO
  ========================================================= */

  const form = document.querySelector("form");
  const emailInput = document.querySelector('input[type="email"]');
  const nameInput = document.querySelector('input[type="text"]');
  const messageInput = document.querySelector('textarea');

  function showMessage(text, type = "success") {
    const messageBox = document.createElement("div");

    messageBox.className = `form-message ${type}`;
    messageBox.textContent = text;

    document.body.appendChild(messageBox);

    setTimeout(() => {
      messageBox.classList.add("show");
    }, 100);

    setTimeout(() => {
      messageBox.classList.remove("show");
      setTimeout(() => messageBox.remove(), 300);
    }, 3500);
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = emailInput ? emailInput.value.trim() : "";
      const name = nameInput ? nameInput.value.trim() : "";
      const message = messageInput ? messageInput.value.trim() : "";

      // Validação básica
      if (!name || !email || !message) {
        showMessage("Por favor, preencha todos os campos.", "error");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        showMessage("Digite um e-mail válido.", "error");
        return;
      }

      // Sucesso
      showMessage("Mensagem enviada com sucesso! 🌱", "success");

      form.reset();
    });
  }

});

/* =========================================================
   ESTILOS DINÂMICOS (REVELAÇÃO + MENSAGENS)
   (injetado via JS para não depender do CSS)
========================================================= */

const style = document.createElement("style");

style.innerHTML = `
/* ===== Reveal Animation ===== */
.hidden {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease;
}

.reveal {
  opacity: 1;
  transform: translateY(0);
}

/* ===== Header Scroll Effect ===== */
header.scrolled {
  background: rgba(27, 67, 50, 0.9) !important;
  backdrop-filter: blur(12px);
  transition: 0.3s ease;
}

/* ===== Form Messages ===== */
.form-message {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 14px 20px;
  border-radius: 10px;
  color: #fff;
  font-weight: 500;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease;
  z-index: 9999;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}

.form-message.show {
  opacity: 1;
  transform: translateY(0);
}

.form-message.success {
  background: #2d6a4f;
}

.form-message.error {
  background: #c1121f;
}

/* ===== Mobile Menu ===== */
.nav-links.active {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 70px;
  right: 10%;
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

.menu-toggle {
  display: none;
  font-size: 1.8rem;
  cursor: pointer;
}

/* Show hamburger on mobile */
@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }
}
`;

document.head.appendChild(style);
