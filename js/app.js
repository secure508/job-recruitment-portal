const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("show");

});
document.querySelectorAll(".faq-question").forEach(button=>{

button.addEventListener("click",()=>{

button.nextElementSibling.classList.toggle("show");

});

});const counters=document.querySelectorAll(".counter");

counters.forEach(counter=>{

const update=()=>{

const target=+counter.dataset.target;

const count=+counter.innerText;

const increment=target/100;

if(count<target){

counter.innerText=Math.ceil(count+increment);

setTimeout(update,20);

}else{

counter.innerText=target;

}

}

update();

});
const themeToggle=document.getElementById("themeToggle");

if(themeToggle){

themeToggle.onclick=function(){

document.body.classList.toggle("dark");

localStorage.setItem("theme",

document.body.classList.contains("dark"));

}

if(localStorage.getItem("theme")=="true"){

document.body.classList.add("dark");

}

}const topBtn=document.getElementById("topBtn");

window.onscroll=function(){

if(window.scrollY>400){

topBtn.style.display="block";

}else{

topBtn.style.display="none";

}

}

if(topBtn){

topBtn.onclick=function(){

window.scrollTo({

top:0,

behavior:"smooth"

});

}

}