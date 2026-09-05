const toast = document.querySelector(".toast");
let toastTimer;

function announce(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2200);
}

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const value = button.dataset.copy;
    try {
      await navigator.clipboard.writeText(value);
      announce(`${value} copied`);
    } catch (error) {
      const input = document.createElement("input");
      input.value = value;
      input.setAttribute("readonly", "");
      input.style.position = "absolute";
      input.style.left = "-9999px";
      document.body.appendChild(input);
      input.select();
      const copied = document.execCommand("copy");
      input.remove();
      announce(copied ? `${value} copied` : `Could not copy ${value}`);
    }
  });
});

const logoGroups = [
  { prefix: "Left", title: "Left-aligned lockup" },
  { prefix: "Center", title: "Centered lockup" },
  { prefix: "Icon", title: "Icon" },
];

const logoColors = [
  { code: "B", label: "Black", preview: "preview-light" },
  { code: "W", label: "White", preview: "preview-dark" },
  { code: "R", label: "Red", preview: "preview-light" },
  { code: "BW", label: "Black / White", preview: "preview-neutral" },
  { code: "WR", label: "White / Red", preview: "preview-dark" },
  { code: "RB", label: "Red / Black", preview: "preview-light" },
];

const logoLibrary = document.querySelector("#logo-assets");

if (logoLibrary) {
  logoLibrary.innerHTML = logoGroups.map(({ prefix, title }) => `
    <section class="logo-group" aria-labelledby="logo-${prefix.toLowerCase()}">
      <h3 id="logo-${prefix.toLowerCase()}">${title}</h3>
      <div class="logo-grid">
        ${logoColors.map(({ code, label, preview }) => {
          const filename = `${prefix}-${code}`;
          return `
            <article class="logo-card">
              <div class="logo-card-preview ${preview}">
                <img src="/brand/assets/logos/svg/${filename}.svg" alt="${title}, ${label} color treatment">
              </div>
              <div class="logo-card-details">
                <strong>${label}</strong>
                <div class="logo-downloads">
                  <button type="button" data-copy-svg="/brand/assets/logos/svg/${filename}.svg">Copy SVG</button>
                  <a href="/brand/assets/logos/png/${filename}.png" download>PNG</a>
                </div>
              </div>
            </article>`;
        }).join("")}
      </div>
    </section>`).join("");

  logoLibrary.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-copy-svg]");
    if (!button) return;

    const originalLabel = button.textContent;

    try {
      const response = await fetch(button.dataset.copySvg);
      if (!response.ok) throw new Error("Unable to load SVG");
      const svgMarkup = await response.text();

      try {
        await navigator.clipboard.writeText(svgMarkup);
      } catch (error) {
        const textarea = document.createElement("textarea");
        textarea.value = svgMarkup;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
      }

      button.textContent = "Copied";
      announce("SVG copied to clipboard");
    } catch (error) {
      button.textContent = "Try again";
      announce("Could not copy SVG");
    }

    window.setTimeout(() => {
      button.textContent = originalLabel;
    }, 1800);
  });
}