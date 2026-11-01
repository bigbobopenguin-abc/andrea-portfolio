/* Andrea Portfolio Guide — independent, static FAQ widget. No API keys or external CSS. */
(function () {
  'use strict';
  if (window.__andreaPortfolioGuideLoaded) return;
  window.__andreaPortfolioGuideLoaded = true;

  const source = document.currentScript && document.currentScript.src;
  if (!source) return;
  const base = new URL('../../', source);
  const url = (relative) => new URL(relative, base).href;

  const knowledge = [
    { key:'internship', tests:[/intern(ship)?/i, /evo/i, /ncs/i, /euss/i, /team lead/i, /work experience/i, /government agenc/i], reply:'Andrea completed a 20-week internship at EVO Outsourcing Solutions, supporting the NCS EUSS project for government agencies. She also took on team-leading responsibilities, helping coordinate daily work and keep tasks organised.', links:[['Internship experience','pages/internship.html']] },
    { key:'resume', tests:[/resume/i, /\bcv\b/i, /hire/i, /download/i], reply:'You can view Andrea’s resume directly. Her portfolio also includes projects, an internship summary and achievements.', links:[['Open resume (PDF)','static/resume.pdf'],['Contact Andrea','index.html#contact']] },
    { key:'awards', tests:[/award/i, /achievement/i, /certificate/i, /certification/i, /edusave/i, /director.s list/i, /testimonial/i], reply:'Andrea’s Achievements page includes academic awards, course-completion certificates and recommendation letters. It is the best place to view the supporting documents.', links:[['View achievements','pages/achievements.html']] },
    { key:'parkinsons', tests:[/parkinson/i, /gradient boosting/i, /decision tree/i, /classifier/i], reply:'In her Parkinson’s Disease Prediction project, Andrea compared Decision Tree and Gradient Boosting models using Python and scikit-learn. The project page includes model comparison and evaluation visuals.', links:[['See Parkinson’s project','projects/parkinsons-prediction.html']] },
    { key:'nesso', tests:[/nesso/i, /worker safety/i, /safety monitor/i, /construction site/i], reply:'NESSO is a wearable safety-monitoring project involving sensors, BLE data collection, Python processing and dashboard records.', links:[['See NESSO project','projects/nesso.html']] },
    { key:'aws', tests:[/\baws\b/i, /amazon ec2/i, /\bvpc\b/i, /\brds\b/i, /cloud app/i, /cloud architecture/i], reply:'Andrea’s AWS project documents a gardening-products web application and its cloud architecture, including VPC networking, EC2, RDS and S3.', links:[['See AWS project','projects/aws.html']] },
    { key:'data', tests:[/power\s*bi/i, /graduate supply/i, /education to employment/i, /data visuali/i, /data analytic/i, /\bpandas\b/i, /\bexcel\b/i], reply:'Andrea has worked with Python, pandas, Power BI and Excel. Her Education-to-Employment data visualisation project explores graduate supply and employment-related trends in Singapore.', links:[['See data project','projects/dpv-pathways.html'],['All projects','pages/projects.html']] },
    { key:'engineering', tests:[/wheelchair/i, /tri.stair/i, /engineering exploration/i, /arduino/i], reply:'Andrea’s Engineering Exploration Project involved a motorised tri-stair wheelchair attachment prototype, combining electronics and hands-on engineering.', links:[['See engineering project','projects/engineering.html']] },
    { key:'fitness', tests:[/fitness band/i, /smart fitness/i], reply:'The Smart Fitness Band is one of Andrea’s IoT and embedded-systems projects. You can see the build and details on its project page.', links:[['See Fitness Band project','projects/fitness.html']] },
    { key:'raindrop', tests:[/raindrop/i, /weather alert/i], reply:'Andrea’s Raindrop Detection & Weather Alert System explores sensor-based monitoring and alerts as an IoT project.', links:[['See weather alert project','projects/raindrop.html']] },
    { key:'education', tests:[/education/i, /study/i, /school/i, /nanyang/i, /\bnyp\b/i, /\bite\b/i, /diploma/i], reply:'Andrea studies AI & Data Engineering at Nanyang Polytechnic and has a background in Electronics Engineering at ITE.', links:[['About Andrea','index.html#about']] },
    { key:'skills', tests:[/skill/i, /tools/i, /technology/i, /technologies/i, /python/i, /\biot\b/i, /machine learning/i, /computer vision/i, /\bnlp\b/i], reply:'Andrea’s projects demonstrate experience with Python, machine learning, data visualisation, AWS, IoT and embedded systems. Her individual project pages show the tools she has used in practice.', links:[['Browse projects','pages/projects.html']] },
    { key:'contact', tests:[/contact/i, /email/i, /linkedin/i, /reach out/i, /get in touch/i], reply:'You can find Andrea’s contact details and social links in the Let’s Talk section of her homepage.', links:[['Contact Andrea','index.html#contact']] },
    { key:'projects', tests:[/project/i, /portfolio work/i, /case stud/i, /what .*built/i, /show .*work/i], reply:'Andrea’s portfolio includes projects in AI, data analytics, cloud computing, IoT and engineering. You can browse all the projects and choose one to explore in detail.', links:[['View all projects','pages/projects.html']] }
  ];
  const byKey = Object.fromEntries(knowledge.map((entry) => [entry.key, entry]));

  function respond(message) {
    const q = String(message).trim().slice(0, 300);
    if (/^(hello|hi|hey|good (morning|afternoon|evening)|yo)[\s.!?]*$/i.test(q))
      return {reply:'Hi! I’m Andrea’s portfolio guide. You can ask me about her projects, awards, resume, internship or skills.',links:[['View all projects','pages/projects.html']]};
    for (const entry of knowledge) {
      if (entry.tests.some((pattern) => pattern.test(q))) return entry;
    }
    return { reply:'I can answer questions about Andrea’s projects, internship, awards, resume and skills. Try one of the shortcuts below, or explore her portfolio directly.', links:[['All projects','pages/projects.html'],['Contact Andrea','index.html#contact']]};
  }

  const host = document.createElement('div');
  host.id='andrea-portfolio-guide';
  // The component has no CSS dependency on the existing portfolio. All styles are isolated.
  host.style.cssText='position:fixed;right:0;bottom:0;z-index:2147483000;pointer-events:none';
  const shadow = host.attachShadow({mode:'open'});
  shadow.innerHTML = `
    <style>
      :host{all:initial;font-family:'DM Sans',Arial,sans-serif;color:#111}
      *,*::before,*::after{box-sizing:border-box}
      button,input,a{font:inherit}
      button{cursor:pointer}
      button:focus-visible,a:focus-visible,input:focus-visible{outline:3px solid #70a400;outline-offset:3px}
      .launcher{pointer-events:auto;position:fixed;right:var(--apg-right,24px);bottom:var(--apg-bottom,24px);display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:54px;padding:7px 19px 7px 8px;border:1px solid #393834;border-radius:999px;background:#151515;color:#fff;box-shadow:0 10px 28px rgba(0,0,0,.19);font-family:'DM Sans',Arial,sans-serif;font-size:13px;font-weight:700;letter-spacing:-.01em;white-space:nowrap;transition:transform .2s ease,box-shadow .2s ease,background .2s ease}
      .launcher:hover{transform:translateY(-3px);background:#252525;box-shadow:0 13px 33px rgba(0,0,0,.26)}
      .launcher:active{transform:translateY(0)}
      .launcher.dragging{cursor:grabbing;transform:none!important;transition:none;touch-action:none}
      @media(max-width:530px){.launcher{touch-action:pan-y}}
      .launcher:focus:not(:focus-visible){outline:none}
      .launcher-icon{display:grid;place-items:center;flex:none;width:38px;height:38px;border-radius:50%;background:#caff42;color:#111}
      .launcher-icon svg{width:19px;height:19px;display:block}
      .launcher-label{line-height:1.2}
      .launcher[aria-expanded="true"]{background:#252525}
      .panel{pointer-events:auto;position:fixed;right:var(--apg-panel-right,22px);bottom:var(--apg-panel-bottom,91px);width:min(390px,calc(100vw - 24px));height:min(555px,calc(100dvh - 110px));min-height:min(320px,calc(100dvh - 30px));display:none;flex-direction:column;background:#fffdf8;border:1px solid #d9d4c9;border-radius:22px;box-shadow:0 22px 68px #0004;overflow:hidden;color:#111}
      .panel.open{display:flex;animation:pop .19s ease-out}
      @keyframes pop{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
      .head{flex:none;display:flex;align-items:center;gap:11px;padding:15px 16px;border-bottom:1px solid #e8e3d8;background:#f2efe8}
      .mark{width:42px;height:42px;display:flex;align-items:center;justify-content:center;background:#caff42;border-radius:14px;font-size:24px;font-weight:900;flex:none}
      .head-copy{display:flex;flex-direction:column;gap:3px;flex:1;min-width:0}
      .head-copy b{font-size:13px;line-height:1.2}
      .head-copy small{font-size:11px;color:#797369}
      .close{width:32px;height:32px;border:0;border-radius:50%;background:transparent;color:#444;font-size:25px;line-height:1}
      .close:hover{background:#e1dace}
      .messages{display:flex;flex-direction:column;gap:11px;flex:1;min-height:0;overflow:auto;padding:18px 15px 10px;overscroll-behavior:contain}
      .message{max-width:94%;display:flex;flex-direction:column;gap:8px;align-self:flex-start}
      .bubble{font-size:13px;line-height:1.58;white-space:pre-wrap;overflow-wrap:anywhere;background:#f0ede5;border-radius:15px 15px 15px 5px;padding:12px 14px}
      .message.mine{align-self:flex-end}.mine .bubble{background:#caff42;border-radius:15px 15px 5px 15px}
      .links{display:flex;flex-wrap:wrap;gap:6px}
      .links a{font-weight:750;font-size:11px;border:1px solid #c6c0b4;border-radius:999px;padding:8px 10px;color:#111;text-decoration:none;background:#fff}
      .links a:hover{background:#caff42;border-color:#91b82c}
      .shortcuts{flex:none;display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:8px 15px 14px}
      .shortcuts button{border-radius:13px;border:1px solid #ded9cf;background:#fff;padding:11px 12px;text-align:left;font-size:12px;font-weight:750;color:#111;min-height:44px}
      .shortcuts button:hover{background:#caff42;border-color:#b1d841}
      .form{flex:none;display:flex;align-items:center;gap:8px;border:1px solid #bfb9ac;border-radius:14px;margin:0 14px;padding:6px 6px 6px 10px;background:#fff}
      .form input{border:0;outline:none;min-width:0;width:100%;color:#111;background:transparent;font-size:13px;padding:8px 4px}
      .form input::placeholder{color:#8d887f}
      .send{flex:none;border:0;background:#caff42;border-radius:10px;width:38px;height:37px;display:grid;place-items:center;color:#111;font-size:22px;font-weight:900}
      .foot{flex:none;margin:0;padding:9px 8px 12px;color:#77736b;text-align:center;font-size:10px}
      .sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
      @media(max-width:850px){.launcher-label{display:none}.launcher{width:54px;height:54px;padding:7px}.launcher-icon{width:38px;height:38px}}
      @media(max-width:530px){.launcher{right:var(--apg-right,13px);bottom:var(--apg-bottom,13px)}.launcher-label{display:none}.launcher{width:54px;height:54px;padding:7px}.launcher-icon{width:38px;height:38px}.panel{right:var(--apg-panel-right,8px);bottom:var(--apg-panel-bottom,78px);width:calc(100vw - 16px);height:min(570px,calc(100dvh - 90px))}}
      @media(prefers-reduced-motion:reduce){.launcher{transition:none}.panel.open{animation:none}}
      /* Fixed side-tab: keeps the page footer and Back to top button clear. */
      .launcher,
      .launcher:hover,
      .launcher:active {
        position:fixed;
        top:50%;
        right:0;
        bottom:auto;
        left:auto;
        transform:translateY(-50%);
        width:40px;
        min-height:60px;
        height:60px;
        padding:7px 5px;
        border-radius:14px 0 0 14px;
        border-right:0;
        gap:0;
        box-shadow:0 5px 16px rgba(0,0,0,.16);
        touch-action:manipulation;
      }
      .launcher:hover {width:46px;background:#252525;box-shadow:0 6px 18px rgba(0,0,0,.22)}
      .launcher-label {display:none!important}
      .launcher-icon {width:29px;height:29px;flex:none}
      .launcher-icon svg {width:17px;height:17px}
      .panel,
      .panel.open {
        position:fixed;
        top:50%;
        right:49px;
        bottom:auto;
        left:auto;
        transform:translateY(-50%);
        height:min(555px,calc(100dvh - 32px));
        width:min(390px,calc(100vw - 65px));
        min-height:0;
      }
      .panel.open {animation:none}
      @media (max-width:530px) {
        .launcher,.launcher:hover,.launcher:active {top:48%;right:0;bottom:auto;width:37px;height:56px;min-height:56px;padding:5px 4px}
        .launcher-icon{width:28px;height:28px}
        .panel,.panel.open {top:50%;right:8px;bottom:auto;width:calc(100vw - 16px);height:min(570px,calc(100dvh - 28px));}
      }

    </style>
    <section class="panel" role="dialog" aria-modal="false" aria-label="Andrea's portfolio guide" aria-hidden="true">
      <header class="head"><div class="mark" aria-hidden="true">a</div><div class="head-copy"><b>Andrea's portfolio guide</b><small>Explore my projects & experience</small></div><button type="button" class="close" aria-label="Close chat">×</button></header>
      <div class="messages" role="log" aria-live="polite" aria-relevant="additions"></div>
      <div class="shortcuts" aria-label="Common questions"></div>
      <form class="form"><label class="sr" for="apg-input">Ask Andrea's portfolio guide</label><input id="apg-input" type="text" maxlength="300" required placeholder="Ask me something…" autocomplete="off"/><button type="submit" class="send" aria-label="Send message">↑</button></form>
      <p class="foot">Instant portfolio answers · No AI API or account required</p>
    </section>
    <button type="button" class="launcher" aria-expanded="false" aria-label="Open Andrea's portfolio guide" title="Open portfolio guide"><span class="launcher-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M20 11.5a8.5 8.5 0 0 1-8.5 8.5 8.7 8.7 0 0 1-3.5-.7L3 21l1.7-4.8A8.5 8.5 0 1 1 20 11.5Z"/><path d="M8 11h7M8 14h4"/></svg></span><span class="launcher-label">Ask about my work</span></button>`;
  document.body.appendChild(host);

  const launcher = shadow.querySelector('.launcher');
  const panel = shadow.querySelector('.panel');
  const input = shadow.querySelector('input');
  const close = shadow.querySelector('.close');
  const messages = shadow.querySelector('.messages');
  const shortcuts = shadow.querySelector('.shortcuts');
  const form = shadow.querySelector('.form');
  const suggestions=[['Projects','projects'],['Awards','awards'],['Resume','resume'],['Internship','internship']];
  suggestions.forEach(([label,key])=>{
    const b=document.createElement('button');b.type='button';b.textContent=label+' ↗';b.addEventListener('click',()=>ask(label,byKey[key]));shortcuts.appendChild(b);
  });
  function display(text, isMine, links) {
    const row=document.createElement('div');row.className='message'+(isMine?' mine':'');
    const bubble=document.createElement('div');bubble.className='bubble';bubble.textContent=text;row.appendChild(bubble);
    if(links&&links.length){
      const linksNode=document.createElement('div');linksNode.className='links';
      for(const [label,relative] of links){const a=document.createElement('a');a.href=url(relative);a.textContent=label+' ↗';linksNode.appendChild(a);}
      row.appendChild(linksNode);
    }
    messages.appendChild(row);messages.scrollTop=messages.scrollHeight;
  }
  function ask(q,explicit){
    const text=String(q).trim();if(!text)return;
    display(text,true);const answer=explicit||respond(text);display(answer.reply,false,answer.links);input.value='';
  }
  let started=false;
  function setOpen(value){
    panel.classList.toggle('open',value);panel.setAttribute('aria-hidden',String(!value));launcher.setAttribute('aria-expanded',String(value));
    launcher.setAttribute('aria-label',value?"Close Andrea's portfolio guide":"Open Andrea's portfolio guide");
    if(value){if(!started){display('Hey! ✳ I’m Andrea’s mini portfolio guide. What would you like to know about?',false);started=true;}input.focus();}
    else launcher.focus();
  }
  // The launcher is docked at the middle of the right edge instead of the
  // footer. This avoids footer actions such as “Back to top”.
  // Unlike draggable controls, placement stays predictable on every page.
  launcher.addEventListener('click',()=>setOpen(!panel.classList.contains('open')));
  close.addEventListener('click',()=>setOpen(false));
  form.addEventListener('submit',(event)=>{event.preventDefault();ask(input.value);});
  document.addEventListener('keydown',(event)=>{if(event.key==='Escape'&&panel.classList.contains('open'))setOpen(false);});
})();