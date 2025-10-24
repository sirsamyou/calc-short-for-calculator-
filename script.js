const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";
let resetNext = false;

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.textContent;

    if (btn.classList.contains("clear")) {
      currentInput = "";
      display.textContent = "0";
      return;
    }

    if (value === "←") {
      currentInput = currentInput.slice(0, -1);
      display.textContent = currentInput || "0";
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

    currentInput += value;
    display.textContent = currentInput;
  });
});
