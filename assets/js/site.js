
(function(){
  document.addEventListener('DOMContentLoaded',function(){
    var current=location.pathname.replace(/\/+$/,'')||'/'; if(current==='/') current='/index.html';
    document.querySelectorAll('.nav a[href]').forEach(function(a){
      try{var link=new URL(a.getAttribute('href'),location.origin).pathname.replace(/\/+$/,'')||'/';
      if(link===current||(link==='/index.html'&&current==='/')) a.classList.add('active');}catch(_){}
    });
  });
  var KEY='cookieConsent';
  function update(val){try{localStorage.setItem(KEY,val);}catch(e){}
    if(typeof gtag==='function'){gtag('consent','update',{analytics_storage:val==='granted'?'granted':'denied',ad_storage:'denied'});}}
  function show(){var saved=null;try{saved=localStorage.getItem(KEY);}catch(e){}
    if(saved){update(saved);return;}
    var b=document.createElement('div');b.className='cookie-backdrop';
    var m=document.createElement('div');m.className='cookie-modal';
    m.innerHTML='<h3>Cookies & Analytics</h3><p>We use essential cookies and optional analytics (GA4).</p><p>See our <a href="/privacy.html" target="_blank">Privacy Policy</a>.</p><div class="cookie-actions"><button class="cookie-btn ghost" id="decline">Decline</button><button class="cookie-btn primary" id="accept">Accept</button></div>';
    document.body.appendChild(b);document.body.appendChild(m);b.classList.add('show');m.classList.add('show');
    m.querySelector('#accept').onclick=function(){update('granted');b.remove();m.remove();};
    m.querySelector('#decline').onclick=function(){update('denied');b.remove();m.remove();};
  }
  document.addEventListener('DOMContentLoaded',show);
  document.addEventListener('submit',function(e){var f=e.target.closest('#contact-form');if(!f) return;
    try{var d=new FormData(f); if(typeof gtag==='function'){gtag('event','generate_lead',{form_name:'contact',company:d.get('company')||'',country:d.get('country')||''});}}catch(_){}
  });
})(); 
