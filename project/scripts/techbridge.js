const services = [
  { id: "microsoft-365", name: "Microsoft 365", category: "productivity", icon: "M365", description: "Configure email, Teams, SharePoint, and OneDrive for secure collaboration.", benefit: "Improve collaboration" },
  { id: "cybersecurity", name: "Cybersecurity", category: "security", icon: "SEC", description: "Reduce common risks with MFA, security policies, email protection, and employee guidance.", benefit: "Reduce business risk" },
  { id: "endpoint-management", name: "Endpoint Management", category: "security", icon: "MDM", description: "Manage company devices with consistent configuration, updates, and security controls.", benefit: "Protect every device" },
  { id: "cloud-solutions", name: "Cloud Solutions", category: "cloud", icon: "CLD", description: "Plan cloud services that support business continuity, remote work, and growth.", benefit: "Build a flexible foundation" },
  { id: "it-support", name: "IT Support", category: "support", icon: "SUP", description: "Give employees dependable help with access, devices, applications, and everyday issues.", benefit: "Keep employees productive" },
  { id: "it-assessment", name: "IT Environment Assessment", category: "support", icon: "REV", description: "Review tools, risks, costs, and processes to create a prioritized technology roadmap.", benefit: "Know what to improve next" }
];

const getSavedServices = () => JSON.parse(localStorage.getItem("savedServices")) ?? [];

const setCurrentYear = () => {
  document.querySelectorAll(".current-year").forEach((element) => {
    element.textContent = `${new Date().getFullYear()}`;
  });
};

const initializeMenu = () => {
  const button = document.querySelector("#menu-button");
  const navigation = document.querySelector("#primary-nav");
  if (button && navigation) {
    button.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("open");
      button.setAttribute("aria-expanded", `${isOpen}`);
      button.setAttribute("aria-label", `${isOpen ? "Close" : "Open"} navigation menu`);
      button.textContent = `${isOpen ? "✕" : "☰"}`;
    });
  }
};

const createServiceCard = (service, allowSaving = false) => {
  const isSaved = getSavedServices().includes(service.id);
  const button = allowSaving
    ? `<button class="save-button ${isSaved ? "saved" : ""}" type="button" data-service-id="${service.id}" aria-pressed="${isSaved}">${isSaved ? "Saved ✓" : "Save Service"}</button>`
    : "";
  return `<article class="service-card"><div class="service-icon" aria-hidden="true">${service.icon}</div><p class="category">${service.category}</p><h3>${service.name}</h3><p>${service.description}</p><p class="benefit">${service.benefit}</p>${button}</article>`;
};

const renderFeaturedServices = () => {
  const container = document.querySelector("#featured-services");
  if (container) {
    container.innerHTML = services.slice(0, 3).map((service) => createServiceCard(service)).join("");
  }
};

const updateSavedSummary = () => {
  const summary = document.querySelector("#saved-summary");
  if (summary) {
    const count = getSavedServices().length;
    summary.textContent = count === 0 ? "You have not saved any services yet." : `You have saved ${count} ${count === 1 ? "service" : "services"} for later.`;
  }
};

const toggleSavedService = (serviceId) => {
  const saved = getSavedServices();
  const updated = saved.includes(serviceId) ? saved.filter((id) => id !== serviceId) : [...saved, serviceId];
  localStorage.setItem("savedServices", JSON.stringify(updated));
};

const renderServices = (filter = "all") => {
  const container = document.querySelector("#services-grid");
  if (!container) return;
  const filtered = filter === "all" ? services : services.filter((service) => service.category === filter);
  container.innerHTML = filtered.map((service) => createServiceCard(service, true)).join("");
  container.querySelectorAll(".save-button").forEach((button) => {
    button.addEventListener("click", () => {
      toggleSavedService(button.dataset.serviceId);
      renderServices(filter);
      updateSavedSummary();
    });
  });
};

const initializeFilters = () => {
  const buttons = document.querySelectorAll(".filter");
  if (buttons.length > 0) {
    renderServices();
    updateSavedSummary();
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        buttons.forEach((item) => item.classList.remove("active"));
        button.classList.add("active");
        renderServices(button.dataset.filter);
      });
    });
  }
};

const initializeForm = () => {
  const form = document.querySelector("#consultation-form");
  const select = document.querySelector("#service-interest");
  if (form && select) {
    const savedService = services.find((service) => service.id === getSavedServices()[0]);
    if (savedService) select.value = savedService.name;
    form.addEventListener("submit", () => {
      const count = Number(localStorage.getItem("consultationCount")) || 0;
      localStorage.setItem("consultationCount", `${count + 1}`);
    });
  }
};

const renderConfirmation = () => {
  const nameElement = document.querySelector("#confirmation-name");
  if (nameElement) {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name") ?? "there";
    const service = params.get("service") ?? "IT services";
    const count = Number(localStorage.getItem("consultationCount")) || 1;
    nameElement.textContent = `${name}`;
    document.querySelector("#confirmation-message").textContent = `We received your request about ${service}. We will review your information and prepare for a focused first conversation.`;
    document.querySelector("#request-count").textContent = `Consultation requests submitted from this browser: ${count}`;
  }
};

setCurrentYear();
initializeMenu();
renderFeaturedServices();
initializeFilters();
initializeForm();
renderConfirmation();
