// /assets/js/site.js
(function () {
  /* ---------- 导航高亮 ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    var current = location.pathname.replace(/\/+$/, '') || '/';
    if (current === '/') current = '/index.html';
    document.querySelectorAll('.nav a[href]').forEach(function (a) {
      try {
        var link = new URL(a.getAttribute('href'), location.origin)
          .pathname.replace(/\/+$/, '') || '/';
        if (link === current || (link === '/index.html' && current === '/')) {
          a.classList.add('active');
        }
      } catch(_) {}
    });
  });

  /* ---------- GA4 同意管理 ---------- */
  var KEY = 'cookieConsent'; // 'granted' | 'denied'
  function updateConsent(val) {
    try { localStorage.setItem(KEY, val); } catch(e){}
    if (typeof gtag === 'function') {
      gtag('consent', 'update', {
        analytics_storage: val === 'granted' ? 'granted' : 'denied',
        ad_storage: 'denied'
      });
    }
  }

  function showConsentModal() {
    // 已选择就同步并不弹窗
    var saved = null;
    try { saved = localStorage.getItem(KEY); } catch(e){}
    if (saved) { updateConsent(saved); return; }

    var backdrop = document.createElement('div');
    backdrop.className = 'cookie-backdrop';
    var modal = document.createElement('div');
    modal.className = 'cookie-modal';
    modal.innerHTML =
      '<h3>Cookies & Analytics</h3>'+
      '<p style="margin:0 0 8px;">We use essential cookies and optional analytics (GA4) to improve the site.</p>'+
      '<p style="margin:0 0 8px;">See our <a href="/privacy.html" target="_blank">Privacy Policy</a>.</p>'+
      '<div class="cookie-actions">'+
        '<button class="cookie-btn ghost" id="cookie-decline">Decline</button>'+
        '<button class="cookie-btn primary" id="cookie-accept">Accept</button>'+
      '</div>';

    document.body.appendChild(backdrop);
    document.body.appendChild(modal);
    backdrop.classList.add('show');
    modal.classList.add('show');

    document.getElementById('cookie-accept').onclick = function(){
      updateConsent('granted'); backdrop.remove(); modal.remove();
    };
    document.getElementById('cookie-decline').onclick = function(){
      updateConsent('denied'); backdrop.remove(); modal.remove();
    };
  }

  document.addEventListener('DOMContentLoaded', showConsentModal);

  /* ---------- 页脚“Cookie Settings”入口（可选） ---------- */
  document.addEventListener('click', function (e) {
    if (e.target && e.target.id === 'manage-cookies') {
      e.preventDefault();
      try { localStorage.removeItem(KEY); } catch(e){}
      showConsentModal();
    }
  });

  /* ---------- 基础埋点：CTA 点击 & 联系表单 ---------- */
  function sendEvent(name, params) {
    if (typeof gtag === 'function') gtag('event', name, params || {});
  }

  // 首页 CTA
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a.btn');
    if (!a) return;
    if (/Contact Sales/i.test(a.textContent)) sendEvent('contact_cta_click', { location: 'hero' });
    if (/Explore Services/i.test(a.textContent)) sendEvent('explore_services_click', { location: 'hero' });
  });

  // 联系表单提交
  document.addEventListener('submit', function (e) {
    var form = e.target.closest('#contact-form');
    if (!form) return;
    try {
      var d = new FormData(form);
      sendEvent('generate_lead', {
        form_name: 'contact',
        company: d.get('company') || '',
        country: d.get('country') || ''
      });
    } catch(_) {}
  });
})();
