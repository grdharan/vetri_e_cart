// document.addEventListener("DOMContentLoaded", () => {
//     const slides = document.querySelectorAll(".slide");
//     const prevBtn = document.querySelector(".prev");
//     const nextBtn = document.querySelector(".next");
//     let current = 0;
  
//     function showSlide(index) {
//       slides.forEach((slide, i) => {
//         slide.classList.remove("active");
//         if (i === index) {
//           slide.classList.add("active");
//         }
//       });
//     }
  
//     function nextSlide() {
//       current = (current + 1) % slides.length;
//       showSlide(current);
//     }
  
//     function prevSlide() {
//       current = (current - 1 + slides.length) % slides.length;
//       showSlide(current);
//     }
  
//     nextBtn.addEventListener("click", nextSlide);
//     prevBtn.addEventListener("click", prevSlide);
  
//     // Auto slide every 4 seconds
//     setInterval(nextSlide, 3000);
  
//     showSlide(current);
//   });
  

let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const slider = document.getElementById("slider");
let slideInterval = setInterval(showNextSlide, 3000);

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove("active"));
  slides[index].classList.add("active");
}

function showNextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function showPrevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

// Button controls
document.querySelector(".next").addEventListener("click", () => {
  showNextSlide();
  resetInterval();
});

document.querySelector(".prev").addEventListener("click", () => {
  showPrevSlide();
  resetInterval();
});


function resetInterval() {
  clearInterval(slideInterval);
  slideInterval = setInterval(showNextSlide, 3000);
}
