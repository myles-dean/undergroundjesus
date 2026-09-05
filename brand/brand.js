document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const value = button.dataset.copy;
    try {
      await navigator.clipboard.writeText(value);
    } catch (error) {
      const input = document.createElement("input");
      input.value = value;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    const toast = document.querySelector(".toast");
    toast.textContent = `${value} copied to clipboard`;
    toast.classList.add("show");
    window.clearTimeout(window.copyNotice);
    window.copyNotice = window.setTimeout(() => toast.classList.remove("show"), 2200);
  });
});