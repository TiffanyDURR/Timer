const buttons = document.querySelectorAll(".button");
let currentInterval = null;
let currentTimerElement = null;
let currentButtonElement = null;
let currentTimeRemaining = 0;

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.parentElement;
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.classList.remove("selected");
    });

    card.classList.add("selected");

    if (currentInterval !== null) {
      clearInterval(currentInterval);
      currentInterval = null;
      currentTimeRemaining = 0;
      if (currentButtonElement !== null) {
        currentButtonElement.textContent = "Démarrer";
      }
    }

    if (currentTimerElement !== null) {
      const duration = parseInt(currentButtonElement.id, 10);
      currentTimerElement.textContent = `${duration
        .toString()
        .padStart(2, "0")} : 00`;
    }

    const duration = parseInt(button.id, 10);
    const timerElement = card.querySelector(".timer");
    currentTimeRemaining = duration * 60;

    const updateTimer = () => {
      const minutes = Math.floor(currentTimeRemaining / 60);
      const seconds = currentTimeRemaining % 60;
      timerElement.textContent = `${minutes
        .toString()
        .padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`;
      currentTimeRemaining--;

      if (currentTimeRemaining < 0) {
        clearInterval(currentInterval);
        currentInterval = null;
        currentTimeRemaining = 0;

        const audio = new Audio("alarm.mp3");
        audio.play();
        button.textContent = "Démarrer";
      }
    };

    updateTimer();
    currentInterval = setInterval(updateTimer, 1000);
    currentTimerElement = timerElement;
    currentButtonElement = button;
    button.textContent = "Réinitialiser";
  });
});
