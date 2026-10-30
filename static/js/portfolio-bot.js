(() => {
  "use strict";
  if (document.getElementById("andrea-chat-launcher")) return;

  // Derive website root from this script's URL, so links work on every page.
  const script = document.currentScript;
  if (!script) return;
  const siteRoot = new URL("../../", script.src);
  const siteLink = (path) => new URL(path, siteRoot).href;

  const css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = siteLink("static/css/portfolio-bot.css");
  document.head.append(css);

  const answers = [
    {id:"projects", name:"Projects", terms:["project","portfolio","work","built","created","case study","case studies"], answer:"Andrea has worked on data analytics, AI, cloud and IoT projects. Her portfolio includes NESSO Safety Monitoring, Parkinson’s Disease Prediction, an AWS cloud application, and a graduate job-market analysis.", links:[["Browse all projects","pages/projects.html"]]},
    {id:"nesso",name:"NESSO",terms:["nesso","safety monitoring","worker safety","ble","near miss"],answer:"NESSO is a wearable safety-monitoring project. Andrea worked on BLE data collection, Python processing, a database and a dashboard to review workplace safety events.",links:[["View NESSO project","projects/nesso.html"]]},
    {id:"parkinsons",name:"Machine learning",terms:["parkinson","classification","gradient boosting","decision tree","machine learning","scikit"],answer:"For the Parkinson’s Disease Prediction project, Andrea compared Decision Tree and Gradient Boosting classifiers using Python and scikit-learn. You can see the evaluation charts and project details on its page.",links:[["View ML project","projects/parkinsons-prediction.html"]]},
    {id:"aws",name:"AWS",terms:["aws","cloud","ec2","rds","s3","hosting"],answer:"Andrea built a cloud-hosted web application as part of her AWS project, using services including EC2, RDS and S3. The case study explains the architecture.",links:[["View AWS project","projects/aws.html"]]},
    {id:"data",name:"Data analytics",terms:["data analytics","power bi","powerbi","excel","pandas","visualisation","visualization","data preparation","graduate","education to employment","dpv"],answer:"Andrea uses Python, pandas, Power BI and Excel for data work. In a group project about Singapore’s education-to-employment pathways, she focused on university graduate supply dashboards.",links:[["Explore data projects","pages/projects.html"],["View DPV project","projects/dpv-pathways.html"]]},
    {id:"iot",name:"IoT",terms:["iot","arduino","raspberry","fitness band","wearable","raindrop","sensor","electronics"],answer:"Andrea’s electronics background shows up in her IoT projects, including a smart fitness band, a raindrop alert system and the NESSO wearable safety project.",links:[["Browse IoT projects","pages/projects.html"]]},
    {id:"education",name:"Education",terms:["education","studies","study","school","nyp","ite","diploma","background","course","student"],answer:"Andrea studies AI & Data Engineering at Nanyang Polytechnic. Before that, she studied Electronics Engineering at ITE. She enjoys combining software, data and hands-on engineering.",links:[["About Andrea","index.html#about"]]},
    {id:"skills",name:"Skills & tools",terms:["skills","tools","technologies","technology","languages","programming","python","sql","tech stack"],answer:"Technologies Andrea has used in her projects include Python, pandas, scikit-learn, Power BI, Excel, AWS, Arduino, Raspberry Pi and databases. Her project pages show where each tool was applied.",links:[["See project examples","pages/projects.html"]]},
    {id:"achievements",name:"Achievements",terms:["award","awards","achievement","achievements","certificate","certification","edusave","director","training"],answer:"Andrea’s Achievements page includes academic awards and course-completion certificates, including AI-related training and AWS IoT Foundations.",links:[["View achievements","pages/achievements.html"]]},
    {id:"internship",name:"Internship",terms:["internship","intern","industrial attachment","internship page"],answer:"Andrea completed a 10-week industrial attachment at EVO Outsourcing Solutions, supporting IT asset tagging, inventory checks, Excel tracking, store operations and project status reporting. You can explore her responsibilities and reflections on her internship page.",links:[["View internship page","pages/internship.html"],["Contact Andrea","index.html#contact"]]},
    {id:"resume",name:"Resume",terms:["resume","cv","curriculum vitae","hire","internship","intern","opportunity","experience"],answer:"Andrea is interested in internship opportunities related to data, AI and software. You can view her resume or contact her using the links below.",links:[["View resume","static/resume.pdf"],["Contact Andrea","index.html#contact"]]},
    {id:"contact",name:"Contact",terms:["contact","email","reach","connect","linkedin","message","talk"],answer:"You can contact Andrea through the contact section of her portfolio. You’ll find her email and social links there.",links:[["Go to contact","index.html#contact"]]}
  ];

  // Longer, more specific matches win over broad matches (e.g. Python).
  function findAnswer(message) {
    const q = message.toLowerCase().trim().replace(/[’]/g, "'");
    if (!q) return null;
    if (/^(hi|hey|hello|good morning|good afternoon|good evening|yo)[!.\s]*$/.test(q)) {
      return {answer:"Hi! I'm Andrea's portfolio guide. Ask me about her projects, studies, skills or achievements.",links:[["View projects","pages/projects.html"]]};
    }
    let best=null, bestScore=0;
    for(const item of answers) {
      let score=0;
      for(const phrase of item.terms) {
        if(q.includes(phrase)) score=Math.max(score,phrase.length + (phrase.includes(" ")?5:0));
      }
      if(score>bestScore){best=item;bestScore=score;}
    }
    return bestScore>0 ? best : {answer:"I can help with Andrea's projects, education, skills, achievements and contact information. Try one of the suggested topics below.",links:[["All projects","pages/projects.html"],["About Andrea","index.html#about"]]};
  }

  const launcher = document.createElement("button");
  launcher.id="andrea-chat-launcher";
  launcher.type="button";
  launcher.setAttribute("aria-label","Open portfolio guide");
  launcher.setAttribute("aria-expanded","false");
  launcher.innerHTML='<span aria-hidden="true">✳</span><span class="ac-launch-text">Ask Andrea’s bot</span>';

  const panel=document.createElement("section");
  panel.id="andrea-chat-panel";
  panel.setAttribute("aria-label","Andrea’s portfolio guide");
  panel.setAttribute("aria-hidden","true");
  panel.innerHTML=`<header class="ac-head">
    <div class="ac-avatar" aria-hidden="true">a<span></span></div>
    <div class="ac-head-copy"><strong>Andrea’s portfolio guide</strong><small>Explore my portfolio</small></div>
    <button class="ac-close" type="button" aria-label="Close portfolio guide">×</button>
  </header>
  <div class="ac-messages" role="log" aria-live="polite" aria-relevant="additions text"></div>
  <div class="ac-suggestions" aria-label="Suggested questions"></div>
  <form class="ac-form"><label class="ac-sr" for="ac-input">Ask about Andrea’s portfolio</label>
    <input id="ac-input" name="question" autocomplete="off" maxlength="250" placeholder="Ask me something…" required>
    <button class="ac-send" type="submit" aria-label="Send question">↑</button></form>
  <p class="ac-disclaimer">Built-in answers from Andrea’s portfolio · Not live AI</p>`;

  document.body.append(panel,launcher);
  const messages=panel.querySelector(".ac-messages");
  const suggestions=panel.querySelector(".ac-suggestions");
  const input=panel.querySelector("#ac-input");
  const close=panel.querySelector(".ac-close");

  function addMessage(text, byBot, links=[]) {
    const wrapper=document.createElement("div");
    wrapper.className="ac-msg "+(byBot?"ac-bot":"ac-user");
    const bubble=document.createElement("p");
    bubble.textContent=text;
    wrapper.append(bubble);
    if(byBot&&links.length){
      const linkRow=document.createElement("div");
      linkRow.className="ac-links";
      links.forEach(([label,path])=>{
        const a=document.createElement("a");
        a.textContent=label+" ↗";
        a.href=siteLink(path);
        linkRow.append(a);
      });
      wrapper.append(linkRow);
    }
    messages.append(wrapper);
    messages.scrollTop=messages.scrollHeight;
  }
  const options=[
    ["Projects","What projects has Andrea built?"],
    ["Awards","What awards does Andrea have?"],
    ["Resume","Where can I view Andrea's resume?"],
    ["Internship","Tell me about Andrea's internship"]
  ];
  function showSuggestions(){
    suggestions.replaceChildren();
    options.forEach(([label,query])=>{
      const b=document.createElement("button");
      b.type="button";b.textContent=label+" ↗";
      b.addEventListener("click",()=>ask(query));
      suggestions.append(b);
    });
  }
  function ask(query){
    const q=String(query).trim();
    if(!q)return;
    addMessage(q,false);
    const response=findAnswer(q);
    if(response)addMessage(response.answer,true,response.links||[]);
    input.value="";
    showSuggestions();
  }
  let started=false;
  function openChat(){
    panel.classList.add("ac-open");
    panel.setAttribute("aria-hidden","false");
    launcher.setAttribute("aria-expanded","true");
    launcher.setAttribute("aria-label","Close portfolio guide");
    if(!started){
      addMessage("Hey! ✳ Welcome to my portfolio. Explore my projects, awards, resume or internship information below.",true);
      showSuggestions();
      started=true;
    }
    input.focus();
  }
  function closeChat(){
    panel.classList.remove("ac-open");
    panel.setAttribute("aria-hidden","true");
    launcher.setAttribute("aria-expanded","false");
    launcher.setAttribute("aria-label","Open portfolio guide");
    launcher.focus();
  }
  launcher.addEventListener("click",()=>panel.classList.contains("ac-open")?closeChat():openChat());
  close.addEventListener("click",closeChat);
  panel.querySelector(".ac-form").addEventListener("submit",event=>{event.preventDefault();ask(input.value);});
  document.addEventListener("keydown",event=>{if(event.key==="Escape"&&panel.classList.contains("ac-open"))closeChat();});
})();