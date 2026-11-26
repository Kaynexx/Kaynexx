const projects = {
  automotive: {
    kicker: "PROJECT / 01 · 3D VISUALIZATION",
    title: "Automotive Render Series",
    description: "An ongoing portfolio of automotive visualization studies: vehicle presentation, paint and material development, studio lighting, camera composition, and cinematic rendering. The focus is on building polished images and real-time scenes with a deliberate visual direction.",
    stack: ["Blender", "Unreal Engine", "DaVinci Resolve", "Lighting", "Materials"],
    status: "Ongoing · Selected work on ArtStation",
    link: "https://www.artstation.com/txkaylo",
    linkLabel: "View ArtStation portfolio"
  },
  cyberlab: {
    kicker: "PROJECT / 02 · LEARNING PLATFORM",
    title: "CyberLab",
    description: "A cybersecurity learning-platform concept designed to organize topic guides, curated learning resources, and practical study material in one focused interface. The project explores a dark UI, structured content, and a Flask-based web workflow.",
    stack: ["Python", "Flask", "HTML", "CSS", "JavaScript"],
    status: "In development · Public source repository not published yet"
  },
  gamepulse: {
    kicker: "PROJECT / 03 · DASHBOARD CONCEPT",
    title: "GamePulse",
    description: "A gaming-observatory concept for presenting player activity, game data, and dashboard analytics through a visual interface. The concept explores a data-focused layout and a real-time 3D background.",
    stack: ["Python", "Flask", "JavaScript", "Three.js"],
    status: "Prototype · Public source repository not published yet"
  }
};

const dialog = document.getElementById("projectDialog");
const toast = document.getElementById("toast");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}

document.querySelectorAll(".project-detail").forEach((button) => {
  button.addEventListener("click", () => {
    const project = projects[button.dataset.project];
    if (!project) return;
    document.getElementById("dialogKicker").textContent = project.kicker;
    document.getElementById("dialogTitle").textContent = project.title;
    document.getElementById("dialogDescription").textContent = project.description;
    document.getElementById("dialogStatus").textContent = project.status;
    const stack = document.getElementById("dialogStack");
    stack.replaceChildren(...project.stack.map((item) => {
      const tag = document.createElement("span");
      tag.textContent = item;
      return tag;
    }));
    const link = document.getElementById("dialogLink");
    if (project.link) {
      link.href = project.link;
      link.textContent = project.linkLabel + " ↗";
      link.hidden = false;
    } else {
      link.hidden = true;
      link.removeAttribute("href");
    }
    dialog.showModal();
  });
});

dialog.addEventListener("click", (event) => {
  const box = dialog.getBoundingClientRect();
  const inside = event.clientX >= box.left && event.clientX <= box.right && event.clientY >= box.top && event.clientY <= box.bottom;
  if (!inside) dialog.close();
});

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
});
mainNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

document.getElementById("copyLink").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    showToast("Portfolio link copied.");
  } catch {
    showToast("Copy is unavailable in this browser. Use the address bar.");
  }
});

document.getElementById("year").textContent = new Date().getFullYear();

const navLinks = [...document.querySelectorAll(".nav-link")];
const sections = navLinks.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id));
    });
  }, { rootMargin: "-30% 0px -60% 0px", threshold: 0 });
  sections.forEach((section) => observer.observe(section));
}
