const progressBar=document.getElementById("progressBar");
window.addEventListener("scroll",()=>{const m=document.documentElement.scrollHeight-window.innerHeight;if(progressBar&&m>0)progressBar.style.width=`${(window.scrollY/m)*100}%`;});
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");observer.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
const menuBtn=document.getElementById("menuBtn"),nav=document.getElementById("nav");
if(menuBtn&&nav){menuBtn.addEventListener("click",()=>nav.classList.toggle("open"));nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));}
const filters=document.querySelectorAll(".filter"),cards=document.querySelectorAll(".project-card");
filters.forEach(btn=>btn.addEventListener("click",()=>{filters.forEach(x=>x.classList.remove("active"));btn.classList.add("active");cards.forEach(card=>{card.style.display=(btn.dataset.filter==="all"||card.dataset.category===btn.dataset.filter)?"":"none";});}));
const form=document.getElementById("contactForm");
if(form){form.addEventListener("submit",e=>{e.preventDefault();const n=document.getElementById("name").value.trim(),em=document.getElementById("email").value.trim(),s=document.getElementById("subject").value.trim(),m=document.getElementById("message").value.trim();const body=`Name: ${n}\nEmail: ${em}\n\n${m}`;document.getElementById("formStatus").textContent="Opening your email application...";window.location.href=`mailto:andrealee1406@gmail.com?subject=${encodeURIComponent(s)}&body=${encodeURIComponent(body)}`;});}


/* HERO 3-PHOTO HOVER SWITCHER */
const heroPhotoSwitcher = document.getElementById("heroPhotoSwitcher");
const heroSwitcherImage = document.getElementById("heroSwitcherImage");
const photoCurrent = document.getElementById("photoCurrent");

if (heroPhotoSwitcher && heroSwitcherImage && photoCurrent) {
  const heroPhotos = [
    "/static/images/hero/photo-1.jpg",
    "/static/images/hero/photo-2.jpg",
    "/static/images/hero/photo-3.jpg"
  ];

  let currentPhoto = 0;
  let switching = false;

  heroPhotoSwitcher.addEventListener("mouseenter", () => {
    if (switching) return;
    switching = true;

    currentPhoto = (currentPhoto + 1) % heroPhotos.length;
    heroSwitcherImage.style.opacity = "0";

    window.setTimeout(() => {
      heroSwitcherImage.src = heroPhotos[currentPhoto];
      photoCurrent.textContent = String(currentPhoto + 1).padStart(2, "0");
      heroSwitcherImage.style.opacity = "1";
      switching = false;
    }, 160);
  });
}
/* =====================================================
   STACKED PHOTO CAROUSEL
===================================================== */

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