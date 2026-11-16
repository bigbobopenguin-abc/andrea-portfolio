const progressBar=document.getElementById("progressBar");
window.addEventListener("scroll",()=>{const m=document.documentElement.scrollHeight-window.innerHeight;if(progressBar&&m>0)progressBar.style.width=`${(window.scrollY/m)*100}%`;});
const observer=new IntersectionObserver(entries=>{let i=0;entries.forEach(e=>{if(!e.isIntersecting)return;const el=e.target;observer.unobserve(el);
  // Cards that appear together slide in one after another.
  if(el.classList.contains("project-card")){const d=i++*140;el.style.transitionDelay=`${d}ms`;setTimeout(()=>{el.style.transitionDelay=""},d+700);}
  el.classList.add("visible");});},{threshold:.12});
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

// Project cards with a video preview play it on hover or keyboard focus.
(()=>{const canHover=window.matchMedia("(hover: hover) and (pointer: fine)").matches,reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if(!canHover||reduce)return;
document.querySelectorAll(".project-card").forEach(card=>{const v=card.querySelector(".card-preview");if(!v)return;
  const start=()=>{const p=v.play();if(p)p.then(()=>card.classList.add("is-previewing")).catch(()=>{});};
  const stop=()=>{card.classList.remove("is-previewing");v.pause();v.currentTime=0;};
  card.addEventListener("mouseenter",start);card.addEventListener("mouseleave",stop);
  card.addEventListener("focus",start);card.addEventListener("blur",stop);});})();

// Internship photo journal: show one photo group at a time with tabs.
(()=>{const gallery=document.querySelector(".ia-gallery");if(!gallery)return;
const groups=[...gallery.querySelectorAll(".ia-gallery-group")];if(groups.length<2)return;
const bar=document.createElement("div");bar.className="ia-tabs";bar.setAttribute("role","tablist");bar.setAttribute("aria-label","Photo groups");
const tabs=groups.map((g,i)=>{const b=document.createElement("button");b.type="button";b.className="ia-tab";b.id=`ia-tab-${i}`;b.setAttribute("role","tab");b.setAttribute("aria-controls",g.id);
  const count=g.querySelectorAll("figure").length;b.innerHTML=`<span></span><small>${count}</small>`;b.querySelector("span").textContent=g.querySelector("h3").textContent;
  g.setAttribute("role","tabpanel");g.setAttribute("aria-labelledby",b.id);bar.appendChild(b);return b;});
const select=i=>{tabs.forEach((b,j)=>{const on=i===j;b.setAttribute("aria-selected",String(on));b.tabIndex=on?0:-1;groups[j].hidden=!on;});};
tabs.forEach((b,i)=>{b.addEventListener("click",()=>select(i));b.addEventListener("keydown",e=>{const k={ArrowRight:1,ArrowLeft:-1}[e.key];if(!k)return;e.preventDefault();const n=(i+k+tabs.length)%tabs.length;select(n);tabs[n].focus();});});
gallery.classList.add("has-tabs");gallery.querySelector(".aw-section-head").after(bar);
const hash=groups.findIndex(g=>"#"+g.id===location.hash);select(hash<0?0:hash);})();

// Featured projects: stacked carousel, same idea as the hero photos.
(()=>{const root=document.getElementById("fpCarousel");if(!root)return;
const track=root.querySelector(".fp-track"),cards=[...root.querySelectorAll(".fp-card")],cur=root.querySelector(".fp-current");
let i=0;const n=cards.length;
const fit=()=>{const h=Math.max(...cards.map(c=>c.offsetHeight));track.style.setProperty("--fp-h",h+"px");};
const show=k=>{i=(k+n)%n;cards.forEach((c,j)=>{c.classList.remove("is-active","is-prev","is-next");
  if(j===i)c.classList.add("is-active");else if(j===(i-1+n)%n)c.classList.add("is-prev");else c.classList.add("is-next");
  c.tabIndex=j===i?0:-1;c.setAttribute("aria-hidden",String(j!==i));});
  if(cur)cur.textContent=String(i+1).padStart(2,"0");};
root.querySelector(".fp-prev").addEventListener("click",()=>show(i-1));
root.querySelector(".fp-next").addEventListener("click",()=>show(i+1));
cards.forEach((c,j)=>c.addEventListener("click",e=>{if(j!==i){e.preventDefault();show(j);}}));
root.addEventListener("keydown",e=>{if(e.key==="ArrowLeft")show(i-1);if(e.key==="ArrowRight")show(i+1);});
let x0=null;track.addEventListener("touchstart",e=>{x0=e.touches[0].clientX},{passive:true});
track.addEventListener("touchend",e=>{if(x0===null)return;const dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>40)show(dx<0?i+1:i-1);x0=null;});
show(0);fit();window.addEventListener("resize",fit);window.addEventListener("load",fit);})();

// Clicking the email copies it and shows a confirmation; falls back to mailto.
document.querySelectorAll("[data-copy]").forEach(a=>{
  a.addEventListener("click",e=>{
    if(!navigator.clipboard||!window.isSecureContext)return;
    e.preventDefault();
    navigator.clipboard.writeText(a.dataset.copy).then(()=>{
      a.classList.add("is-copied");
      const tip=document.createElement("span");tip.className="copy-tip";tip.setAttribute("role","status");tip.textContent="Copied! ✓";
      a.appendChild(tip);setTimeout(()=>{tip.remove();a.classList.remove("is-copied");},1800);
    }).catch(()=>{window.location.href=a.href;});
  });
});
