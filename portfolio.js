const menuBtn = document.querySelector(".menu-icon");
const navLinks = document.querySelector("#nav-links");

menuBtn.addEventListener("click", () => {

  navLinks.classList.toggle("active");

});

// let links=document.querySelectorAll('.links a');
// links.forEach(function(link){
//   link.addEventListener('click',()=>{
//   navLinks.classList.remove("active");
// });
// });

// const reveals = document.querySelectorAll(".reveal");


// const observer = new IntersectionObserver((entries)=>{

//   entries.forEach(entry=>{

//     if(entry.isIntersecting){

//       entry.target.classList.add("active");

//     }

//   });

// },
// {
//   threshold:0.15
// });


// reveals.forEach(section=>{

//   observer.observe(section);

// });


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
let form = document.querySelector('.contact-form');
let senderName = document.querySelector('#sender-name');
let senderEmail = document.querySelector('#sender-email');

form.addEventListener('submit', function (event) {
  event.preventDefault();
  let sNL = senderName.value;
  if (sNL.length < 3) {
    document.querySelector('#n-error').style.display = 'initial';
    document.querySelector('.contact-form button').setAttribute('disabled', 'disabled');

  } else {
    document.querySelector('#n-error').style.display = 'none';
    
  }

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // console.log(regex.test());
  if (regex.test(senderEmail.value)) {
    document.querySelector('#e-error').style.display = 'none';
    
  } else {
    document.querySelector('#e-error').style.display = 'initial';
    
  }
  senderName.value='';
  senderEmail.value = '';
  document.querySelector('#massage').value='';
});