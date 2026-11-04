const progressBar=document.getElementById("progressBar");
window.addEventListener("scroll",()=>{const m=document.documentElement.scrollHeight-window.innerHeight;if(progressBar&&m>0)progressBar.style.width=`${(window.scrollY/m)*100}%`;});
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");observer.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
const menuBtn=document.getElementById("menuBtn"),nav=document.getElementById("nav");
if(menuBtn&&nav){const setMenu=open=>{nav.classList.toggle("open",open);menuBtn.setAttribute("aria-expanded",String(open));menuBtn.setAttribute("aria-label",open?"Close navigation menu":"Open navigation menu");};menuBtn.addEventListener("click",()=>setMenu(!nav.classList.contains("open")));nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>setMenu(false)));document.addEventListener("keydown",e=>{if(e.key==="Escape"&&nav.classList.contains("open")){setMenu(false);menuBtn.focus();}});}
const filters=document.querySelectorAll(".filter"),cards=document.querySelectorAll(".project-card");
filters.forEach(btn=>btn.addEventListener("click",()=>{filters.forEach(x=>x.classList.remove("active"));btn.classList.add("active");cards.forEach(card=>{card.style.display=(btn.dataset.filter==="all"||card.dataset.category===btn.dataset.filter)?"":"none";});}));


/* =====================================================
   STACKED PHOTO CAROUSEL
===================================================== */

if (document.querySelectorAll(".photo-card").length && document.getElementById("carouselPrev") && document.getElementById("carouselNext") && document.getElementById("carouselCurrent")) {
const carouselCards =
    Array.from(document.querySelectorAll(".photo-card"));

const carouselPrev =
    document.getElementById("carouselPrev");

const carouselNext =
    document.getElementById("carouselNext");

const carouselCurrent =
    document.getElementById("carouselCurrent");


let activeCard = 0;


function updateCarousel() {

    carouselCards.forEach((card, index) => {

        card.classList.remove(
            "active",
            "left-card",
            "right-card"
        );


        if (index === activeCard) {

            card.classList.add("active");

        }

        else if (
            index ===
            (activeCard - 1 + carouselCards.length)
            % carouselCards.length
        ) {

            card.classList.add("left-card");

        }

        else {

            card.classList.add("right-card");

        }

    });


    carouselCurrent.textContent =
        String(activeCard + 1).padStart(2, "0");

}


carouselNext.addEventListener("click", () => {

    activeCard =
        (activeCard + 1)
        % carouselCards.length;

    updateCarousel();

});


carouselPrev.addEventListener("click", () => {

    activeCard =
        (activeCard - 1 + carouselCards.length)
        % carouselCards.length;

    updateCarousel();

});


updateCarousel();

}
// Component details for the architecture walkthroughs.
document.querySelectorAll('.architecture-section').forEach(section => {
  const detail = section.querySelector('.architecture-detail');
  section.querySelectorAll('.architecture-node').forEach(button => {
    button.addEventListener('click', () => {
      section.querySelectorAll('.architecture-node').forEach(node => node.setAttribute('aria-pressed', String(node === button)));
      detail.querySelector('h3').textContent = button.dataset.title;
      detail.querySelector('p').textContent = button.dataset.detail;
    });
  });
});
