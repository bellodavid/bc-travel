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

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

function handleBookNowClick() {
  const modal = document.getElementById("checkoutModal");
  modal.style.display = "block";

  // Set initial checkout step
  setCheckoutStep(1);

  // Calculate the amount
  const price = 100; // Replace with actual price
  const discount = 10; // Replace with actual discount
  const discountPrice = price - (price / 100) * discount;
  const nights = calcNoOfDays();
  const amount = nights * discountPrice;

  document.getElementById("amount").value = amount.toFixed(2);
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
