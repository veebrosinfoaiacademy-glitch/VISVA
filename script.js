const navItems = [
  { label: "Home", href: "#home" },
  { label: "Solutions", href: "#solutions" },
  { label: "About", href: "#about" },
  { label: "Education Domains", href: "#domains" },
  { label: "Resources", href: "#resources" },
  { label: "Contact", href: "#contact" },
];

const solutions = [
  {
    icon: "SIS",
    title: "Student Information System",
    text: "Connected student records, workflows, and services across the institution.",
  },
  {
    icon: "LMS",
    title: "Learning Management System",
    text: "Digital learning experiences that keep teaching, content, and engagement aligned.",
  },
  {
    icon: "ERP",
    title: "University & College ERP",
    text: "Academic and administrative operations brought together in one ecosystem.",
  },
  {
    icon: "EXM",
    title: "Examination Management System",
    text: "Streamlined examination planning, assessment workflows, and result processes.",
  },
  {
    icon: "OBE",
    title: "Outcome-Based Education (OBE) Software for Higher Education",
    text: "Design, map, and track learning outcomes aligned with institutional and accreditation standards.",
  },
];

const domains = [
  {
    icon: "HE",
    title: "Higher Education",
    text: "Digital infrastructure for universities and colleges.",
  },
  {
    icon: "↗",
    title: "Skills Development",
    text: "Supporting institutions focused on employability and workforce development.",
  },
  {
    icon: "LL",
    title: "Lifelong Learning",
    text: "Technology that enables continuous learning beyond traditional education.",
  },
  {
    icon: "♡",
    title: "Vishva for Health Sciences",
    text: "Specialized solutions for health science education and institutions.",
  },
  {
    icon: "GOV",
    title: "Government",
    text: "Digital platforms supporting education-led public initiatives.",
  },
];

const why = [
  {
    number: "01",
    title: "Connected",
    text: "One platform across the education ecosystem.",
  },
  {
    number: "02",
    title: "Flexible",
    text: "Solutions designed for different institutional needs.",
  },
  {
    number: "03",
    title: "Scalable",
    text: "Built to grow with institutions and learners.",
  },
  {
    number: "04",
    title: "Experience-driven",
    text: "Built around the people who use education technology every day.",
  },
];

const icon = (value) => `<span class="card-icon" aria-hidden="true">${value}</span>`;

document.querySelector('[data-render="solutions"]').innerHTML = solutions
  .map(
    (item) => `
      <article class="info-card">
        ${icon(item.icon)}
        <h3>${item.title}</h3>
        <p>${item.text}</p>
        <a class="learn-link" href="#">Learn More <span aria-hidden="true">-&gt;</span></a>
      </article>
    `,
  )
  .join("");

document.querySelector('[data-render="domains"]').innerHTML = domains
  .map(
    (item) => `
      <article class="domain-card">
        ${icon(item.icon)}
        <h3>${item.title}</h3>
        <p>${item.text}</p>
      </article>
    `,
  )
  .join("");

document.querySelector('[data-render="why"]').innerHTML = why
  .map(
    (item) => `
      <article class="why-card">
        <strong>${item.number}</strong>
        <div>
          <h3>${item.title}</h3>
          <p>${item.text}</p>
        </div>
      </article>
    `,
  )
  .join("");

const menuToggle = document.querySelector(".menu-toggle");
const navPanel = document.querySelector(".nav-panel");

menuToggle.addEventListener("click", () => {
  const isOpen = navPanel.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

navPanel.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    navPanel.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll(".reveal").forEach((section) => observer.observe(section));

document.querySelectorAll(".nav-links a").forEach((link) => {
  if (navItems.some((item) => item.href === link.getAttribute("href") && item.label === link.textContent.trim())) {
    link.dataset.navItem = "true";
  }
});

document.querySelectorAll('a[href="#"]').forEach((link) => {
  link.addEventListener("click", (event) => event.preventDefault());
});

const navLinks = document.querySelectorAll(".nav-links a");

const setActiveSection = (id) => {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${id}`;
    link.classList.toggle("active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
};

const spySections = navItems
  .map((item) => document.getElementById(item.href.slice(1)))
  .filter(Boolean)
  .sort((a, b) => a.offsetTop - b.offsetTop);

const triggerOffset = 180;

const updateActiveSection = () => {
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
  if (atBottom) {
    setActiveSection(spySections[spySections.length - 1].id);
    return;
  }
  let current = spySections[0];
  for (const section of spySections) {
    if (section.getBoundingClientRect().top - triggerOffset <= 0) {
      current = section;
    }
  }
  setActiveSection(current.id);
};

let spyTicking = false;
window.addEventListener("scroll", () => {
  if (spyTicking) return;
  spyTicking = true;
  requestAnimationFrame(() => {
    updateActiveSection();
    spyTicking = false;
  });
});

updateActiveSection();
