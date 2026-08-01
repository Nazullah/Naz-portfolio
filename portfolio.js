const menuBtn = document.querySelector(".menu-icon");
const navLinks = document.querySelector("#nav-links");

menuBtn.addEventListener("click", () => {

  navLinks.classList.toggle("active");
  navLinks.addEventListener('click',function(){
    navLinks.classList.remove("active");
  });

});


//code for bottom to top button
const topBtn = document.getElementById("top-btn");


window.addEventListener("scroll", () => {

  if (window.scrollY > 500) {

    topBtn.style.display = "flex";

  } else {

    topBtn.style.display = "none";

  }

});

topBtn.addEventListener("click", () => {

  window.scrollTo({

    top: 0,

    behavior: "smooth"

  });

});


//code for form
const form = document.querySelector(".contact-form");
const senderName = document.querySelector("#sender-name");
const senderEmail = document.querySelector("#sender-email");
const message = document.querySelector("#massage");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    let isValid = true;

    // Name Validation
    if (senderName.value.trim().length < 3) {
        document.querySelector("#n-error").style.display = "block";
        isValid = false;
    } else {
        document.querySelector("#n-error").style.display = "none";
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(senderEmail.value.trim())) {
        document.querySelector("#e-error").style.display = "block";
        isValid = false;
    } else {
        document.querySelector("#e-error").style.display = "none";
    }

    // Message Validation
    if (message.value.trim().length < 10) {
        alert("Message must be at least 10 characters.");
        isValid = false;
    }

    // If all fields are valid
    if (isValid) {
        alert("Message Sent Successfully!");

        form.reset();
    }

    if (message.value.trim().length < 10) {
    document.querySelector("#m-error").style.display = "block";
    isValid = false;
} else {
    document.querySelector("#m-error").style.display = "none";
}

});



// form.addEventListener('submit', function (event) {
//   event.preventDefault();
//   let sNL = senderName.value;
//   if (sNL.length < 3) {
//     document.querySelector('#n-error').style.display = 'initial';
//     document.querySelector('.contact-form button').setAttribute('disabled', 'disabled');

//   } else {
//     document.querySelector('#n-error').style.display = 'none';
    
//   }

//   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   // console.log(regex.test());
//   if (regex.test(senderEmail.value)) {
//     document.querySelector('#e-error').style.display = 'none';
    
//   } else {
//     document.querySelector('#e-error').style.display = 'initial';
    
//   }
//   senderName.value='';
//   senderEmail.value = '';
//   document.querySelector('#massage').value='';
// });