const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

function handleCopy(text) {
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Copied to clipboard: " + text);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  } else {
    // Fallback for browsers that don't support the Clipboard API
    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = text;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand("copy");
    document.body.removeChild(tempTextArea);
    alert("Copied to clipboard: " + text);
  }
}

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

function handlePaymentConfirmation() {
  const button = document.getElementById("paymentConfirmButton");
  button.textContent = "Processing...";
  button.classList.add("processing");

  // Simulate a 5-second delay to mimic loading
  setTimeout(() => {
    button.textContent = "Completed";
    button.classList.remove("processing");
    button.classList.add("completed");
    button.style.backgroundColor = "green";
  }, 5000);
}

function handleBookNowClick() {
  // Get the button that was clicked
  const button = event.target;

  // Find the parent div
  const parentDiv = button.closest("div");

  // Find the h3 element within the parent div
  const priceElement = parentDiv.querySelector("h3");

  // Get the text content of the h3 element (the price)
  const priceText = priceElement.textContent;

  // Remove the dollar sign and convert to a number
  const price = parseFloat(priceText.replace("$", ""));

  const modal = document.getElementById("checkoutModal");
  modal.style.display = "block";

  // Set initial checkout step
  setCheckoutStep(1);

  // Calculate the amount
  const discount = 10; // Replace with actual discount if needed
  const discountPrice = price - (price / 100) * discount;
  const nights = calcNoOfDays();
  const amount = nights * discountPrice;

  document.getElementById("amount").value = amount.toFixed(2);
}

// Helper function to calculate number of days (you should implement this based on your needs)
function calcNoOfDays() {
  // Implement your logic to calculate the number of days
  // For now, returning a placeholder value of 1
  return 1;
}

// Function to set checkout step (you should implement this based on your needs)
function setCheckoutStep(step) {
  // Implement your logic to set the checkout step
  console.log(`Setting checkout step to ${step}`);
}

function setCheckoutStep(step) {
  const step1Content = document.getElementById("checkoutStep1");
  const step2Content = document.getElementById("checkoutStep2");

  if (step === 1) {
    step1Content.style.display = "block";
    step2Content.style.display = "none";
  } else {
    step1Content.style.display = "none";
    step2Content.style.display = "block";
    startTimer();
  }
}

function calcNoOfDays() {
  const checkinDate = new Date(document.getElementById("check-in-date").value);
  const checkoutDate = new Date(
    document.getElementById("check-out-date").value
  );
  const timeDiff = checkoutDate.getTime() - checkinDate.getTime();
  return Math.ceil(timeDiff / (24 * 60 * 60 * 1000));
}

function startTimer() {
  let timeLeft = 20 * 60; // 20 minutes in seconds
  const timerDisplay = document.getElementById("timeRemaining");

  const timer = setInterval(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      timerDisplay.textContent = "0:00";
    }
    timeLeft--;
  }, 1000);
}

function closeModal() {
  const modal = document.getElementById("checkoutModal");
  modal.style.display = "none";
}

ScrollReveal().reveal(".header__container h1", {
  ...scrollRevealOption,
});
ScrollReveal().reveal(".header__container p", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".header__container form", {
  ...scrollRevealOption,
  delay: 1000,
});

ScrollReveal().reveal(".feature__card", {
  duration: 1000,
  interval: 500,
});

ScrollReveal().reveal(".destination__card", {
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal(".package__card", {
  ...scrollRevealOption,
  interval: 500,
});

const swiper = new Swiper(".swiper", {
  slidesPerView: "auto",
  spaceBetween: 20,
  pagination: {
    el: ".swiper-pagination",
  },
});
