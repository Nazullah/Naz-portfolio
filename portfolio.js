const menuBtn = document.querySelector(".menu-icon");
const navLinks = document.querySelector("#nav-links");


menuBtn.addEventListener("click",()=>{

  navLinks.classList.toggle("active");

});

let links=document.querySelectorAll('.links a');
links.forEach(function(link){
  link.addEventListener('click',()=>{
  navLinks.classList.remove("active");
});
});

const reveals = document.querySelectorAll(".reveal");


const observer = new IntersectionObserver((entries)=>{

  entries.forEach(entry=>{

    if(entry.isIntersecting){

      entry.target.classList.add("active");

    }

  });

},
{
  threshold:0.15
});


reveals.forEach(section=>{

  observer.observe(section);

});


const topBtn = document.getElementById("top-btn");


window.addEventListener("scroll",()=>{

  if(window.scrollY > 500){

    topBtn.style.display = "flex";

  }else{

    topBtn.style.display = "none";

  }

});



topBtn.addEventListener("click",()=>{

  window.scrollTo({

    top:0,

    behavior:"smooth"

  });

});