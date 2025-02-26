const wrapper = document.querySelector(".wrapper");
const question = document.querySelector(".question");
const gif = document.querySelector(".gif");
const yesBtn = document.querySelector(".yes-btn");
const noBtn = document.querySelector(".no-btn");

yesBtn.addEventListener("click", () => {
    question.innerHTML = "Aaaaa, I like you too";
    gif.src = "https://raw.githubusercontent.com/anstrea/anstrea.github.io/main/peach-goma-peach-and-goma.gif"; 

    yesBtn.style.display = "none";  
    noBtn.style.display = "none";   
});


noBtn.addEventListener("mouseover", () => {
    const noBtnRect = noBtn.getBoundingClientRect();
    const maxX = window.innerWidth - noBtnRect.width;
    const maxY = window.innerHeight - noBtnRect.height;
    
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    
    noBtn.style.left = Math.min(randomX, maxX) + "px";
    noBtn.style.top = Math.min(randomY, maxY) + "px";
});

