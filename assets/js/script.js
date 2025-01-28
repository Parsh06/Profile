'use strict';

// Element toggle function
const elementToggleFunc = function (elem) { 
  elem.classList.toggle("active"); 
}

// Sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// Sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { 
  elementToggleFunc(sidebar); 
});

// Testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// Modal variables
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// Modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// Add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    testimonialsModalFunc();
  });
}

// Add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// Resume download function
const downloadResume = () => {
  const downloadLink = 'https://drive.google.com/file/d/1F4XGi_6BhYxufPdBxubLJfJ66Z2Mi9Nh/view?usp=sharing';
  const link = document.createElement('a');
  link.href = downloadLink;
  link.setAttribute('download', 'Parsh_resume.pdf');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Add event listener to the download button
const downloadBtn = document.querySelector('.download-btn');
downloadBtn.addEventListener('click', downloadResume);

// Contact form variables
const form = document.querySelector("#contact-form");
const formInputs = document.querySelectorAll(".form-input");
const formBtn = document.querySelector(".form-btn");

// Add event to all form input fields
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// Google Sheets integration
const scriptURL = 'https://script.google.com/macros/s/AKfycbxg30NKDAbK3qAh5F2f9yRjIuV5uV2KmU63XW03jvD0r7j8Yc8iZ4Y7wPu5VeZnV-Vz/exec';
const contactForm = document.getElementById('contact-form');
const popupMessage = document.getElementById('popup-message');
const closePopup = document.getElementById('close-popup');
const body = document.body;

contactForm.addEventListener('submit', e => {
  e.preventDefault();
  
  // Send form data to Google Sheets
  fetch(scriptURL, {
    method: 'POST',
    body: new FormData(contactForm)
  })
  .then(response => {
    if (response.ok) {
      body.classList.add('blur-background');
      popupMessage.style.display = 'block';
      contactForm.reset(); // Reset the form after submission

      // Hide the popup after 3 seconds
      setTimeout(() => {
        popupMessage.style.display = 'none';
        body.classList.remove('blur-background');
      }, 3000);
    } else {
      throw new Error('Network response was not ok.');
    }
  })
  .catch(error => {
    console.error('Error!', error.message);
    alert('There was an error sending your message.');
  });
});

// Close popup message
closePopup.addEventListener('click', () => {
  popupMessage.style.display = 'none';
  body.classList.remove('blur-background');
});

// Navigation links functionality
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Add event to all nav links
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}