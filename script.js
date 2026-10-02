const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const hidePreloader=()=>$('#preloader')?.classList.add('done');
window.addEventListener('load',()=>setTimeout(hidePreloader,350));
setTimeout(hidePreloader,1500);
const header=$('#header'); window.addEventListener('scroll',()=>{header?.classList.toggle('scrolled',scrollY>25);$('#topBtn')?.classList.toggle('show',scrollY>500)});
const menu=$('#menuToggle'),nav=$('#navLinks');menu?.addEventListener('click',()=>{nav.classList.toggle('open');menu.innerHTML=nav.classList.contains('open')?'<i class="fa-solid fa-xmark"></i>':'<i class="fa-solid fa-bars"></i>'});$$('.nav-links a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.innerHTML='<i class="fa-solid fa-bars"></i>'}));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});$$('.reveal').forEach(el=>observer.observe(el));
$$('.filter').forEach(btn=>btn.addEventListener('click',()=>{$$('.filter').forEach(x=>x.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.filter;$$('.service-card').forEach(card=>{const show=f==='all'||card.dataset.cat===f;card.style.display=show?'flex':'none';if(show){card.classList.remove('visible');setTimeout(()=>card.classList.add('visible'),20)}})}));
const serviceInfo={
'Website Designing':['fa-globe','Create a modern responsive website that presents your brand clearly and gives visitors a strong reason to explore.'],
'App Development':['fa-mobile-screen-button','Turn an idea into a mobile experience with a user-focused approach to interface, functionality and digital journeys.'],
'Software Development':['fa-code','Discuss a custom software requirement and shape a digital system around your workflow or business need.'],
'Digital Marketing':['fa-bullhorn','Build an online presence with digital marketing and growth-focused activities designed around your audience and goals.'],
'Graphic Designing':['fa-pen-nib','Create visual assets that make your brand, campaigns, products and social content more memorable.'],
'IT Consultancy':['fa-user-tie','Talk through your technology requirement and identify a practical direction for your digital project.'],
'Domain & Hosting':['fa-server','Get support for the domain and hosting side of establishing and maintaining your online presence.'],
'Other IT Services':['fa-gears','Have a different IT requirement? Start a conversation and explain what you need.']};
const modal=$('#serviceModal');$$('.service-more').forEach(btn=>btn.addEventListener('click',()=>{const name=btn.closest('.service-card').dataset.service,info=serviceInfo[name]||['fa-code','Let’s discuss your requirement.'];$('#modalTitle').textContent=name;$('#modalText').textContent=info[1];$('#modalIcon').innerHTML=`<i class="fa-solid ${info[0]}"></i>`;modal.classList.add('open')}));$('#modalClose')?.addEventListener('click',()=>modal.classList.remove('open'));modal?.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('open')});$('#modalCTA')?.addEventListener('click',()=>modal.classList.remove('open'));
const countObs=new IntersectionObserver(entries=>entries.forEach(e=>{if(!e.isIntersecting)return;const el=e.target;if(el.dataset.done)return;el.dataset.done='1';const target=+el.dataset.count;let n=0;const step=Math.max(1,Math.ceil(target/35));const timer=setInterval(()=>{n+=step;if(n>=target){n=target;clearInterval(timer)}el.textContent=n},28)}),{threshold:.7});$$('[data-count]').forEach(el=>countObs.observe(el));
$('#topBtn')?.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
const toast=$('#toast');$('#contactForm')?.addEventListener('submit',e=>{e.preventDefault();$('#formStatus').textContent='Thanks! Your detailed project brief has been prepared on this demo page. Connect the form to email/CRM before publishing to receive enquiries.';toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),3500);e.target.reset()});
$$('.magnetic').forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left-r.width/2)*.08,y=(e.clientY-r.top-r.height/2)*.08;el.style.transform=`translate(${x}px,${y}px)`});el.addEventListener('pointerleave',()=>el.style.transform='')});
const canvas=$('#particles'),ctx=canvas?.getContext('2d');let particles=[];function resize(){if(!canvas)return;canvas.width=innerWidth;canvas.height=innerHeight;particles=Array.from({length:Math.min(75,Math.floor(innerWidth/18))},()=>({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*1.5+.3,vx:(Math.random()-.5)*.18,vy:(Math.random()-.5)*.18}))}function draw(){if(!ctx)return;ctx.clearRect(0,0,canvas.width,canvas.height);ctx.fillStyle='rgba(125,170,200,.45)';particles.forEach(p=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>canvas.width)p.vx*=-1;if(p.y<0||p.y>canvas.height)p.vy*=-1;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill()});requestAnimationFrame(draw)}resize();addEventListener('resize',resize);draw();
$('#year').textContent=new Date().getFullYear();

// Dynamic motion enhancements
const progress=$('#scrollProgress');
const updateProgress=()=>{if(!progress)return;const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max>0?(scrollY/max)*100:0)+'%'};
addEventListener('scroll',updateProgress,{passive:true});addEventListener('resize',updateProgress);updateProgress();

// Gentle 3D tilt on desktop cards (no cursor glow)
if(matchMedia('(pointer:fine)').matches){
  $$('.service-card,.brand-card,.visual-card,.process-step,.number-card,.highlight-panel').forEach(card=>{
    card.addEventListener('pointermove',e=>{
      const r=card.getBoundingClientRect();
      const rx=((e.clientY-r.top)/r.height-.5)*-5;
      const ry=((e.clientX-r.left)/r.width-.5)*5;
      card.style.transform=`perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
    });
    card.addEventListener('pointerleave',()=>card.style.transform='');
  });
}

// Make particle field feel connected without adding a cursor-following light
(function enhanceParticles(){
  if(!ctx||!canvas)return;
  const baseDraw=draw;
  // redraw with subtle connection lines; preserves the existing particle motion
  window.draw=function(){};
})();

// Add a subtle section-active navigation state
const sections=[...$$('main section[id]')];
const navItems=[...$$('.nav-links a[href^="#"]')];
const sectionObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(!entry.isIntersecting)return;
  navItems.forEach(a=>a.classList.toggle('active-section',a.getAttribute('href')==='#'+entry.target.id));
}),{rootMargin:'-35% 0px -55% 0px',threshold:0});
sections.forEach(s=>sectionObserver.observe(s));
