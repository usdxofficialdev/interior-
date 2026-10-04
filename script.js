const WA_NUMBER = "917237861272";
const RATE_PER_SQFT = {
  "Retail store": 0,
  "Restaurant/Cafe": 0,
  "Office": 0,
  "Home": 0,
  "Kiosk": 0,
  "Other": 0,
};

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const desktopPointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

function waLink(text) {
  return "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(text);
}

function setWhatsAppLinks() {
  document.querySelectorAll("[data-wa]").forEach((el) => {
    el.href = waLink(el.dataset.wa);
  });
}

function initCursor() {
  const cursor = document.querySelector(".cursor-glow");
  if (!cursor || !desktopPointer) {
    return;
  }

  window.addEventListener("pointermove", (event) => {
    cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
    cursor.style.opacity = "1";
  });

  window.addEventListener("pointerleave", () => {
    cursor.style.opacity = "0";
  });
}

function initNavState() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const updateHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

function initRevealAnimations() {
  const reveals = document.querySelectorAll(".reveal");
  if (!reveals.length || !window.gsap) {
    reveals.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const tl = window.gsap.timeline({
    defaults: { ease: "power2.out" },
  });

  tl.fromTo(
    reveals,
    { opacity: 0, y: 24 },
    { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, overwrite: true }
  );

  reveals.forEach((item) => {
    window.gsap.utils.toArray(item).forEach((element) => {
      window.gsap.set(element, { clearProps: "transform, opacity" });
    });
  });

  if (reduceMotion) {
    reveals.forEach((item) => {
      item.style.opacity = "1";
      item.style.transform = "none";
    });
    return;
  }

  window.gsap.set(reveals, { opacity: 0, y: 28 });
  window.gsap.to(reveals, {
    opacity: 1,
    y: 0,
    duration: 0.9,
    stagger: 0.09,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "main",
      start: "top 78%",
      once: true,
    },
  });
}

function initTabs() {
  const tabs = document.querySelectorAll(".tab");
  const panels = document.querySelectorAll(".tab-panel");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.tab;
      tabs.forEach((item) => {
        const active = item === tab;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-selected", String(active));
      });

      panels.forEach((panel) => {
        const active = panel.dataset.panel === target;
        panel.classList.toggle("is-active", active);
        panel.hidden = !active;
      });
    });
  });
}

function initCountUp() {
  const counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;

  const animateCounter = (element) => {
    const target = Number(element.dataset.count || 0);
    const duration = 1400;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const value = Math.round(progress * target);
      element.textContent = value;
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

function initHorizontalProjectScroll() {
  const strip = document.querySelector(".project-strip");
  const wrapper = document.querySelector(".project-strip-wrap");

  if (!strip || !wrapper || reduceMotion || window.innerWidth < 768) {
    return;
  }

  if (window.gsap && window.ScrollTrigger) {
    window.gsap.to(strip, {
      x: () => -(strip.scrollWidth - wrapper.clientWidth),
      ease: "none",
      scrollTrigger: {
        trigger: wrapper,
        start: "top center",
        end: "bottom center",
        scrub: 1,
        pin: true,
      },
    });
  }
}

function initProcessAnimation() {
  const steps = document.querySelectorAll(".process-step");
  if (!steps.length || !window.gsap || reduceMotion) return;

  window.gsap.fromTo(
    steps,
    { opacity: 0.35, y: 18 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.18,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".process",
        start: "top 75%",
        once: true,
      },
    }
  );
}

function initFaq() {
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const button = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (!button || !answer) return;

    button.addEventListener("click", () => {
      const expanded = button.getAttribute("aria-expanded") === "true";
      faqItems.forEach((faq) => {
        const btn = faq.querySelector(".faq-question");
        const ans = faq.querySelector(".faq-answer");
        if (btn) btn.setAttribute("aria-expanded", "false");
        if (ans) ans.style.maxHeight = "0px";
      });

      if (!expanded) {
        button.setAttribute("aria-expanded", "true");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
}

function initLightbox() {
  const triggers = document.querySelectorAll(".lightbox-trigger");
  const lightbox = document.getElementById("lightbox");
  const image = document.getElementById("lightboxImage");
  const closeBtn = document.querySelector(".lightbox-close");

  if (!lightbox || !image || !closeBtn) return;

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      image.src = trigger.dataset.full;
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
  };

  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });
}

function buildQuoteMessage(formData) {
  const lines = [
    "Hello Eli Ambience Studio,",
    "",
    "I would like a free quotation for my project.",
    "Space type: " + formData.spaceType,
    "City: " + formData.city,
    "Area: " + formData.area + " sq ft",
    "Services: " + formData.services.join(", ") || "Not specified",
    "Budget: " + formData.budget,
    "Timeline: " + formData.timeline,
    "Name: " + formData.name,
    "Phone: " + formData.phone,
    "Email: " + (formData.email || "Not provided"),
    "Notes: " + (formData.notes || "None"),
  ];

  return lines.join("\n");
}

function updateEstimate() {
  const spaceType = document.querySelector('input[name="spaceType"]:checked')?.value || "";
  const areaField = document.getElementById("quoteArea");
  const estimateBox = document.getElementById("estimateBox");

  if (!spaceType || !areaField || !estimateBox) return;

  const area = Number(areaField.value || 0);
  const rate = RATE_PER_SQFT[spaceType] || 0;

  if (!spaceType || !area || !rate) {
    estimateBox.textContent = "Indicative estimate will appear here once a valid rate is configured.";
    estimateBox.classList.remove("is-visible");
    return;
  }

  const low = area * rate * 0.85;
  const high = area * rate * 1.15;
  estimateBox.textContent = `Indicative estimate: ₹${Math.round(low).toLocaleString("en-IN")} - ₹${Math.round(high).toLocaleString("en-IN")} for ${spaceType.toLowerCase()} interiors. Final quote after site visit.`;
  estimateBox.classList.add("is-visible");
}

function initQuoteForm() {
  const form = document.getElementById("quoteForm");
  if (!form) return;

  const steps = Array.from(form.querySelectorAll(".quote-step"));
  const nextBtn = document.getElementById("quoteNextBtn");
  const backBtn = document.getElementById("quoteBackBtn");
  const submitBtn = document.getElementById("quoteSubmitBtn");
  const progress = document.getElementById("quoteProgressBar");
  const thankYou = document.getElementById("quoteThankYou");
  let currentStep = 0;

  const validateCurrentStep = () => {
    const currentPanel = steps[currentStep];
    const errors = currentPanel.querySelectorAll(".field-error");
    errors.forEach((item) => {
      item.textContent = "";
    });

    if (currentStep === 0) {
      const selected = currentPanel.querySelector('input[name="spaceType"]:checked');
      if (!selected) {
        currentPanel.querySelector('[data-error-for="spaceType"]').textContent = "Please select a space type.";
        return false;
      }
      return true;
    }

    if (currentStep === 1) {
      const city = document.getElementById("quoteCity").value.trim();
      if (!city) {
        currentPanel.querySelector('[data-error-for="quoteCity"]').textContent = "Please enter your city.";
        return false;
      }
      return true;
    }

    if (currentStep === 2) {
      const budget = document.getElementById("quoteBudget").value;
      if (!budget) {
        currentPanel.querySelector('[data-error-for="quoteBudget"]').textContent = "Please select a budget range.";
        return false;
      }
      return true;
    }

    if (currentStep === 3) {
      const name = document.getElementById("quoteName").value.trim();
      const phone = document.getElementById("quotePhone").value.trim();
      if (!name) {
        currentPanel.querySelector('[data-error-for="quoteName"]').textContent = "Please enter your name.";
      }
      if (!phone) {
        currentPanel.querySelector('[data-error-for="quotePhone"]').textContent = "Please enter your phone number.";
      }
      return name && phone;
    }

    return true;
  };

  const updateStepUI = () => {
    steps.forEach((step, index) => {
      step.classList.toggle("active", index === currentStep);
      step.hidden = index !== currentStep;
    });

    const progressValue = ((currentStep + 1) / steps.length) * 100;
    progress.style.width = `${progressValue}%`;

    backBtn.hidden = currentStep === 0;
    nextBtn.hidden = currentStep === steps.length - 1;
    submitBtn.hidden = currentStep !== steps.length - 1;
  };

  nextBtn.addEventListener("click", () => {
    if (!validateCurrentStep()) return;
    if (currentStep < steps.length - 1) {
      currentStep += 1;
      updateStepUI();
      updateEstimate();
    }
  });

  backBtn.addEventListener("click", () => {
    if (currentStep > 0) {
      currentStep -= 1;
      updateStepUI();
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validateCurrentStep()) return;

    const formData = {
      spaceType: document.querySelector('input[name="spaceType"]:checked')?.value || "",
      city: document.getElementById("quoteCity").value.trim(),
      area: document.getElementById("quoteArea").value.trim(),
      services: Array.from(document.querySelectorAll('input[name="services"]:checked')).map((item) => item.value),
      budget: document.getElementById("quoteBudget").value,
      timeline: document.getElementById("quoteTimeline").value.trim(),
      name: document.getElementById("quoteName").value.trim(),
      phone: document.getElementById("quotePhone").value.trim(),
      email: document.getElementById("quoteEmail").value.trim(),
      notes: document.getElementById("quoteNotes").value.trim(),
    };

    const message = buildQuoteMessage(formData);
    window.open(waLink(message), "_blank", "noopener,noreferrer");
    thankYou.hidden = false;
    form.reset();
    currentStep = 0;
    updateStepUI();
    thankYou.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  document.querySelectorAll('input[name="spaceType"]').forEach((input) => {
    input.addEventListener("change", updateEstimate);
  });

  document.getElementById("quoteArea").addEventListener("input", updateEstimate);
  updateStepUI();
  updateEstimate();
}

function initPartnerForm() {
  const form = document.getElementById("partnerForm");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("partnerName").value.trim();
    const phone = document.getElementById("partnerPhone").value.trim();
    const partnerType = document.getElementById("partnerType").value;

    if (!name || !phone || !partnerType) {
      alert("Please fill in your name, phone, and partner type.");
      return;
    }

    const fields = {
      name,
      firm: document.getElementById("firmName").value.trim() || "Not provided",
      partnerType,
      city: document.getElementById("partnerCity").value.trim() || "Not provided",
      experience: document.getElementById("partnerExperience").value.trim() || "Not provided",
      portfolio: document.getElementById("partnerPortfolio").value.trim() || "Not provided",
      phone,
    };

    const message = [
      "Hello Eli Ambience Studio,",
      "",
      "Partnership enquiry.",
      "Name: " + fields.name,
      "Firm: " + fields.firm,
      "Partner type: " + fields.partnerType,
      "City: " + fields.city,
      "Years of experience: " + fields.experience,
      "Portfolio link: " + fields.portfolio,
      "Phone: " + fields.phone,
    ].join("\n");

    window.open(waLink(message), "_blank", "noopener,noreferrer");
    form.reset();
  });
}

function initLenisAndGsap() {
  if (reduceMotion) return;

  if (window.Lenis && window.gsap && window.ScrollTrigger) {
    const lenis = new window.Lenis({
      duration: 1.18,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    window.gsap.registerPlugin(window.ScrollTrigger);
    window.ScrollTrigger.defaults({ once: true });

    window.gsap.fromTo(
      ".hero-copy",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }
    );

    window.gsap.utils.toArray(".section-head, .tab-shell, .service-card, .feature-card, .process-step, .faq-item, .testimonial-card, .gallery-item").forEach((element) => {
      window.gsap.fromTo(
        element,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 83%",
          },
        }
      );
    });

    window.gsap.utils.toArray(".project-card").forEach((card, index) => {
      window.gsap.fromTo(
        card,
        { opacity: 0, x: 28 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          delay: index * 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            once: true,
          },
        }
      );
    });

    window.gsap.to(".hero-bg", {
      scale: 1.08,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    window.gsap.utils.toArray(".process-step").forEach((step, index) => {
      const glow = index % 2 === 0 ? "#f3d98d" : "#d59a5e";
      window.gsap.fromTo(
        step,
        { opacity: 0.35 },
        {
          opacity: 1,
          duration: 0.75,
          scrollTrigger: {
            trigger: step,
            start: "top 85%",
            onEnter: () => {
              step.style.borderColor = glow;
              step.style.boxShadow = "0 0 0 1px rgba(241, 206, 125, 0.5)";
            },
            once: true,
          },
        }
      );
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setWhatsAppLinks();
  initCursor();
  initNavState();
  initTabs();
  initCountUp();
  initHorizontalProjectScroll();
  initProcessAnimation();
  initFaq();
  initLightbox();
  initQuoteForm();
  initPartnerForm();
  initLenisAndGsap();
});
