
const searchInput = document.getElementById("searchInput");
const foodCards = [...document.querySelectorAll(".food-card")];
const filterButtons = [...document.querySelectorAll(".filter")];
const menuCount = document.getElementById("menuCount");
const emptyState = document.getElementById("emptyState");

let selectedCategory = "All";

function updateMenu() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  foodCards.forEach((card) => {
    const name = card.dataset.name.toLowerCase();
    const category = card.dataset.category.toLowerCase();
    const description = card.textContent.toLowerCase();

    const matchesSearch =
      name.includes(searchTerm) ||
      category.includes(searchTerm) ||
      description.includes(searchTerm);

    const matchesCategory =
      selectedCategory === "All" ||
      card.dataset.category === selectedCategory;

    const visible = matchesSearch && matchesCategory;

    card.hidden = !visible;

    if (visible) {
      visibleCount++;
    }
  });

  menuCount.textContent =
    `${visibleCount} ${visibleCount === 1 ? "item" : "items"}`;

  emptyState.hidden = visibleCount !== 0;
}

// Search when the visitor types.
searchInput.addEventListener("input", updateMenu);

// Filter the menu by category.
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedCategory = button.dataset.category;

    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    updateMenu();
  });
});

// Open and close the navigation on mobile screens.
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Toggle navigation"
  );

  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close the mobile navigation after selecting a section.
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Toggle navigation");
    menuToggle.textContent = "☰";
  });
});

// Automatically display the current year.
document.getElementById("year").textContent =
  new Date().getFullYear();

// Display all menu items when the page first opens.
updateMenu();
