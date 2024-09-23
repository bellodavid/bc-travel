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

  const paymentStatus = document.getElementById('paymentStatus');
  const paymentConfirmButton = document.getElementById('paymentConfirmButton');
  
  paymentStatus.style.display = 'block';
  paymentStatus.textContent = 'Verifying payment...';
  paymentStatus.classList.add('verifying');
  paymentConfirmButton.disabled = true;

  // Simulate payment verification (replace with actual verification logic)
  setTimeout(() => {
    paymentStatus.textContent = 'Payment verified!';
    paymentStatus.classList.remove('verifying');
    paymentStatus.classList.add('success');

    // Show success modal after a brief delay
    setTimeout(() => {
      closeModal();
      showSuccessModal();
    }, 1500);
  }, 3000); // Simulated 3-second verification
  
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

function handleBookNowClick(event) {
  event.preventDefault();

  // Get the button that was clicked
  const button = event.currentTarget;

  // Find the parent card
  const card = button.closest(".package__card");

  // Extract information from the card
  const packageName = card.querySelector("h4").textContent;
  const packageDescription = card.querySelector("p").textContent;
  const price = card.querySelector("h3").textContent;

  // Get the image source
  const imageSrc = card.querySelector("img").src;

  // Open the modal
  const modal = document.getElementById("checkoutModal");
  modal.style.display = "block";

  // Set initial checkout step
  setCheckoutStep(1);

  // Clear the previous content in the modal
  const roomDetailsContent = modal.querySelector(".roomDetailsContent");
  roomDetailsContent.innerHTML = ""; // Clear previous content

  // Update the room details in the modal
  const roomDetailsTitle = modal.querySelector(".roomDetailsTitle");
  roomDetailsTitle.textContent = packageName;

  const descriptionParagraph = document.createElement("p");
  descriptionParagraph.innerHTML = `<strong>Description:</strong> ${packageDescription}`;
  roomDetailsContent.appendChild(descriptionParagraph);

  // Set the amount
  const amountInput = document.getElementById("amount");
  amountInput.value = price.replace("$", "");

  // Optionally update the modal's image if desired
  // const modalImage = modal.querySelector('.roomImage');
  // if (modalImage) {
  //   modalImage.src = imageSrc;
  // }
}

// Add event listener to all "Book Now" buttons
document.addEventListener("DOMContentLoaded", function () {
  const bookNowButtons = document.querySelectorAll(".package__card .btn");
  bookNowButtons.forEach((button) => {
    button.addEventListener("click", handleBookNowClick);
  });
});

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

  // Hide the modal
  modal.style.display = "none";

  // Clear all form inputs (if it's a form)
  const form = modal.querySelector("form");
  if (form) {
    form.reset(); // Resets the form to its initial state
  }

  // Alternatively, clear specific input fields
  const inputs = modal.querySelectorAll("input, select, textarea");
  inputs.forEach((input) => (input.value = ""));

  // Clear session storage (if you are storing data there)
  sessionStorage.removeItem("modalData"); // Remove specific data
  // Or, if you want to clear all session storage data related to the modal:
  // sessionStorage.clear();
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

function showSuccessModal() {
  const successModal = document.getElementById("successModal");
  successModal.style.display = "flex";
}

function closeSuccessModal() {
  const successModal = document.getElementById("successModal");
  successModal.style.display = "none";
}
