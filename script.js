document.addEventListener("DOMContentLoaded", function () {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      const isOpen = mainNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const propertyCards = document.querySelectorAll(".property-card");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const propertySearch = document.getElementById("propertySearch");
  const resultCount = document.getElementById("propertyResultCount");

  function applyPropertyFilters(selectedCategory, searchText) {
    if (!propertyCards.length) {
      return;
    }

    let visibleCount = 0;
    const normalizedSearch = searchText.trim().toLowerCase();

    propertyCards.forEach(function (card) {
      const category = (card.dataset.category || "").toLowerCase();
      const title = (card.querySelector("h3")?.textContent || "").toLowerCase();
      const content = (card.textContent || "").toLowerCase();
      const categoryMatches = selectedCategory === "all" || category === selectedCategory;
      const queryMatches = !normalizedSearch || title.includes(normalizedSearch) || content.includes(normalizedSearch);
      const shouldShow = categoryMatches && queryMatches;

      card.hidden = !shouldShow;
      if (shouldShow) {
        visibleCount += 1;
      }
    });

    if (resultCount) {
      resultCount.textContent = visibleCount + " " + (visibleCount === 1 ? "property" : "properties") + " found";
    }
  }

  if (filterButtons.length) {
    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        filterButtons.forEach(function (item) {
          item.classList.toggle("active", item === button);
        });

        const activeFilter = document.querySelector(".filter-btn.active")?.dataset.filter || "all";
        const searchTerm = propertySearch ? propertySearch.value : "";
        applyPropertyFilters(activeFilter, searchTerm);
      });
    });
  }

  if (propertySearch) {
    propertySearch.addEventListener("input", function () {
      const activeFilter = document.querySelector(".filter-btn.active")?.dataset.filter || "all";
      applyPropertyFilters(activeFilter, propertySearch.value);
    });
  }

  const lightbox = document.getElementById("propertyLightbox");
  const lightboxImage = document.querySelector(".lightbox-image");
  const lightboxTitle = document.querySelector(".lightbox-title");
  const lightboxText = document.querySelector(".lightbox-text");
  const lightboxClose = document.querySelector(".lightbox-close");

  if (lightbox && lightboxImage && lightboxTitle && lightboxText && lightboxClose) {
    function openLightbox(card) {
      const propertyImage = card.querySelector(".property-image");
      const title = card.querySelector("h3")?.textContent || "Featured property";
      const body = card.querySelector("p")?.textContent || "Explore this home with KOENA houses.";

      if (propertyImage) {
        lightboxImage.style.backgroundImage = window.getComputedStyle(propertyImage).backgroundImage;
      }

      lightboxTitle.textContent = title;
      lightboxText.textContent = body;
      lightbox.classList.add("open");
      document.body.classList.add("modal-open");
    }

    propertyCards.forEach(function (card) {
      card.addEventListener("click", function (event) {
        if (event.target.closest("a, button")) {
          return;
        }
        openLightbox(card);
      });
    });

    lightboxClose.addEventListener("click", function () {
      lightbox.classList.remove("open");
      document.body.classList.remove("modal-open");
    });

    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) {
        lightbox.classList.remove("open");
        document.body.classList.remove("modal-open");
      }
    });
  }

  function setFieldError(field, message) {
    const input = field;
    if (!input) {
      return;
    }

    input.classList.add("invalid");
    const existingError = input.parentElement.querySelector(".field-error");
    if (existingError) {
      existingError.textContent = message;
      return;
    }

    const error = document.createElement("small");
    error.className = "field-error";
    error.textContent = message;
    input.parentElement.appendChild(error);
  }

  function clearFieldError(field) {
    if (!field) {
      return;
    }

    field.classList.remove("invalid");
    const error = field.parentElement.querySelector(".field-error");
    if (error) {
      error.remove();
    }
  }

  function showFormStatus(form, message, isSuccess) {
    const status = form.querySelector(".form-status");
    if (!status) {
      return;
    }

    status.textContent = message;
    status.classList.remove("success", "error");
    status.classList.add(isSuccess ? "success" : "error");
  }

  function saveSubmission(type, payload) {
    try {
      const storageKey = "koena_submissions";
      const current = JSON.parse(localStorage.getItem(storageKey) || "[]");
      current.push({
        type,
        submittedAt: new Date().toISOString(),
        payload
      });
      localStorage.setItem(storageKey, JSON.stringify(current));
    } catch (error) {
      console.warn("Submission could not be stored locally:", error);
    }
  }

  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const phone = document.getElementById("phone");
      const subject = document.getElementById("subject");
      const message = document.getElementById("message");
      const fields = [name, email, subject, message];

      fields.forEach(clearFieldError);

      let hasError = false;
      if (!name || !name.value.trim() || name.value.trim().length < 2) {
        setFieldError(name, "Please enter your full name.");
        hasError = true;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailPattern.test(email.value.trim())) {
        setFieldError(email, "Please enter a valid email address.");
        hasError = true;
      }

      if (phone && phone.value.trim() && !/^[0-9()+\-\s]{7,}$/.test(phone.value.trim())) {
        setFieldError(phone, "Please enter a valid phone number.");
        hasError = true;
      }

      if (!subject || !subject.value) {
        setFieldError(subject, "Please select a message type.");
        hasError = true;
      }

      if (!message || message.value.trim().length < 20) {
        setFieldError(message, "Your message must be at least 20 characters long.");
        hasError = true;
      }

      if (hasError) {
        showFormStatus(contactForm, "Please correct the highlighted fields and try again.", false);
        return;
      }

      const payload = {
        name: name.value.trim(),
        email: email.value.trim(),
        phone: phone ? phone.value.trim() : "",
        subject: subject.value,
        message: message.value.trim()
      };

      saveSubmission("contact", payload);

      const emailBody = [
        "Name: " + payload.name,
        "Email: " + payload.email,
        "Phone: " + payload.phone || "N/A",
        "Message type: " + payload.subject,
        "",
        payload.message
      ].join("\n");

      const mailtoLink = "mailto:hello@koenahouses.com?subject=" + encodeURIComponent("Website enquiry: " + payload.subject) + "&body=" + encodeURIComponent(emailBody);

      showFormStatus(contactForm, "Thanks! Your message is ready to send via your email app.", true);
      contactForm.reset();

      window.setTimeout(function () {
        window.location.href = mailtoLink;
      }, 500);
    });
  }

  const enquiryForm = document.getElementById("enquiryForm");
  if (enquiryForm) {
    enquiryForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = document.getElementById("enquiryName");
      const email = document.getElementById("enquiryEmail");
      const phone = document.getElementById("enquiryPhone");
      const interest = document.getElementById("enquiryInterest");
      const budget = document.getElementById("enquiryBudget");
      const message = document.getElementById("enquiryMessage");
      const fields = [name, email, phone, interest, budget, message];

      fields.forEach(clearFieldError);

      let hasError = false;

      if (!name || !name.value.trim() || name.value.trim().length < 2) {
        setFieldError(name, "Please enter your name.");
        hasError = true;
      }

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        setFieldError(email, "Please provide a valid email address.");
        hasError = true;
      }

      if (phone && phone.value.trim() && !/^[0-9()+\-\s]{7,}$/.test(phone.value.trim())) {
        setFieldError(phone, "Please enter a valid phone number.");
        hasError = true;
      }

      if (!interest || !interest.value) {
        setFieldError(interest, "Please choose your interest.");
        hasError = true;
      }

      if (!budget || !budget.value.trim()) {
        setFieldError(budget, "Please share your budget range.");
        hasError = true;
      }

      if (!message || message.value.trim().length < 20) {
        setFieldError(message, "Please add a few more details about your goals.");
        hasError = true;
      }

      if (hasError) {
        showFormStatus(enquiryForm, "Please correct the highlighted fields before submitting.", false);
        return;
      }

      const payload = {
        name: name.value.trim(),
        email: email.value.trim(),
        phone: phone ? phone.value.trim() : "",
        interest: interest.value,
        budget: budget.value.trim(),
        message: message.value.trim()
      };

      saveSubmission("enquiry", payload);

      const budgetValue = Number((payload.budget.match(/\d+/g) || [0]).join(""));
      const availableText = budgetValue >= 900000 ? "Our premium listings are available for an immediate viewing schedule." : "We can share a shortlist of homes that fit your stated budget range.";
      const consultationText = payload.interest === "Sell a property" ? "A valuation consultation is available this week." : "A tailored property consultation can be arranged within 24 hours.";

      showFormStatus(enquiryForm, " Thanks! " + consultationText + " " + availableText + " Estimated consultation starting from R1,200.", true);
      enquiryForm.reset();
    });
  }

  const contactInfoMap = document.getElementById("contactMap");
  if (contactInfoMap) {
    const iframe = document.createElement("iframe");
    iframe.title = "KOENA houses office location";
    iframe.src = "https://www.openstreetmap.org/export/embed.html?bbox=18.4130%2C-33.9235%2C18.4350%2C-33.9045&layer=mapnik&marker=-33.9142%2C18.4236";
    iframe.loading = "lazy";
    iframe.referrerPolicy = "no-referrer-when-downgrade";
    iframe.style.width = "100%";
    iframe.style.height = "220px";
    iframe.style.border = "0";
    iframe.style.borderRadius = "16px";
    contactInfoMap.appendChild(iframe);
  }

  const mapPlaceholder = document.querySelector(".map-placeholder");
  if (mapPlaceholder && !document.getElementById("contactMap")) {
    mapPlaceholder.innerHTML = "<span>Local market support</span>";
  }

  if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/") {
    const featureCards = document.querySelectorAll(".feature, .step");
    featureCards.forEach(function (card, index) {
      card.style.animationDelay = (index * 90) + "ms";
      card.style.opacity = "0";
      card.style.transform = "translateY(10px)";
      card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      setTimeout(function () {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, 100 + index * 90);
    });
  }
});
