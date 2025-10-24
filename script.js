const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const themeToggle = document.getElementById("theme-toggle");

let currentInput = "";
let resetNext = false;

// Theme toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});

// Load theme preference
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀️";
}

// Handle button clicks
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.textContent;

    if (btn.classList.contains("clear")) {
      currentInput = "";
      display.textContent = "0";
      return;
    }

    if (value === "=") {
      try {
        currentInput = eval(currentInput).toString();
        display.textContent = currentInput;
        resetNext = true;
      } catch {
        display.textContent = "Error";
        currentInput = "";
      }
      return;
    }

    if (resetNext && !isNaN(value)) {
      currentInput = "";
      resetNext = false;
    }

    switch (value) {
      case "√":
        if (currentInput) {
          currentInput = Math.sqrt(parseFloat(currentInput)).toString();
          display.textContent = currentInput;
        }
        return;

      case "x²":
        if (currentInput) {
          currentInput = Math.pow(parseFloat(currentInput), 2).toString();
          display.textContent = currentInput;
        }
        return;

      case "±":
        if (currentInput) {
          currentInput = (parseFloat(currentInput) * -1).toString();
          display.textContent = currentInput;
        }
        return;
    }

    currentInput += value;
    display.textContent = currentInput;
  });
});

// Keyboard support
document.addEventListener("keydown", e => {
  if (/[0-9+\-*/.=]/.test(e.key)) {
    if (e.key === "=" || e.key === "Enter") {
      try {
        currentInput = eval(currentInput).toString();
        display.textContent = currentInput;
        resetNext = true;
      } catch {
        display.textContent = "Error";
        currentInput = "";
      }
    } else {
      currentInput += e.key === "Enter" ? "" : e.key;
      display.textContent = currentInput;
    }
  } else if (e.key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
    display.textContent = currentInput || "0";
  } else if (e.key === "Escape") {
    currentInput = "";
    display.textContent = "0";
  }
});
