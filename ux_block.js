<script id="jessy-ux">
(function(){
var p=location.pathname,ru=/^\/ru(\/|$)/.test(p),pre=ru?'/ru':'',mob=function(){return window.GLOBAL&&GLOBAL.isMobile!==undefined?!!GLOBAL.isMobile:window.innerWidth<=768};
var TEL='tel:+380997500255',TELT='099 750-02-55';
function css(t){var s=document.createElement('style');s.textContent=t;document.head.appendChild(s)}
function ready(f){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',f);else f()}
/* 1. Пошук: синоніми і підказки */
if(/\/catalog\/search\/?$/.test(p)){
  var q=(new URLSearchParams(location.search).get('q')||'').toLowerCase().trim();
  var S=[[/про\s*-?\s*план|проплан|pro\s*-?plan/,'pro plan'],[/(дж|й|ж|и)оз[еэ]р/,'josera'],[/роял|ройал|роял\s*канин/,'royal canin'],[/брит\b/,'brit'],[/фарм[іи]на/,'farmina'],[/амброз[іи]я/,'ambrosia'],[/сав[оа]р[іи]/,'savory'],[/мон[дж]?ж?е\b/,'monge']];
  ready(function(){
    var m=(document.querySelector('main')||document.body).innerText;
    if(!/Немає товарів|Нет товаров/.test(m))return;
    for(var i=0;i<S.length;i++){if(S[i][0].test(q)&&q!==S[i][1]&&!sessionStorage.getItem('jx_s_'+q)){sessionStorage.setItem('jx_s_'+q,1);location.replace(pre+'/catalog/search/?q='+encodeURIComponent(S[i][1]));return}}
    var t=[].slice.call(document.querySelectorAll('main *')).filter(function(e){return e.children.length===0&&/^(Немає товарів|Нет товаров)$/.test(e.textContent.trim())})[0];
    if(!t)return;
    var C=ru?[['Собаки','/tovary-dlya-sobak/'],['Кошки','/tovary-dlya-koshek-i-kotov/'],['Птицы','/tovary-dlya-popugaev-i-ptits/'],['Грызуны','/tovary-dlya-gryzunov/'],['Рыбы','/tovary-dlya-ryb/'],['Бренды','/brands/']]:[['Собаки','/tovary-dlya-sobak/'],['Коти','/tovary-dlya-koshek-i-kotov/'],['Птахи','/tovary-dlya-popugaev-i-ptits/'],['Гризуни','/tovary-dlya-gryzunov/'],['Риби','/tovary-dlya-ryb/'],['Бренди','/brands/']];
    var d=document.createElement('div');d.id='jx-empty';
    d.innerHTML='<p>'+(ru?'Попробуйте другое слово (например, название бренда латиницей) или выберите раздел:':'Спробуйте інше слово (наприклад, назву бренду латиницею) або оберіть розділ:')+'</p><div class="jx-chips">'+C.map(function(c){return '<a href="'+pre+c[1]+'">'+c[0]+'</a>'}).join('')+'</div><p>'+(ru?'Не нашли нужное? Позвоните: ':'Не знайшли потрібне? Зателефонуйте: ')+'<a href="'+TEL+'">'+TELT+'</a>'+(ru?' или напишите в Viber — подберём.':' або напишіть у Viber — підберемо.')+'</p>';
    t.parentNode.insertBefore(d,t.nextSibling);
  });
}
css('#jx-empty{margin:16px 0;font-size:15px}#jx-empty a{color:#2b8a3e;font-weight:600}.jx-chips{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0}.jx-chips a,#jx-cats a{display:inline-flex;align-items:center;gap:4px;padding:8px 12px;border:1px solid #d7e8d0;border-radius:20px;background:#f3faf0;color:#222!important;text-decoration:none;white-space:nowrap;font-size:14px;font-weight:600}');
/* 2. Головна: швидкі розділи (телефон) */
if((p==='/'||p==='/ru/'||p==='/ru')){
  ready(function(){
    if(!mob()||document.getElementById('jx-cats'))return;
    var a=document.querySelector('.banners-group');if(!a)return;
    var C=[['🐶',ru?'Собаки':'Собаки','/tovary-dlya-sobak/'],['🐱',ru?'Кошки':'Коти','/tovary-dlya-koshek-i-kotov/'],['⚖️',ru?'Корм на вес':'Корм на вагу','/korm-na-vahu/'],['🏷️',ru?'Распродажа':'Розпродаж','/rozprodazh/'],['🐦',ru?'Птицы':'Птахи','/tovary-dlya-popugaev-i-ptits/'],['🐹',ru?'Грызуны':'Гризуни','/tovary-dlya-gryzunov/'],['🐠',ru?'Рыбы':'Риби','/tovary-dlya-ryb/'],['🦎',ru?'Рептилии':'Рептилії','/tovary-dlya-reptiliy/'],['📞',TELT,TEL]];
    var d=document.createElement('div');d.id='jx-cats';
    d.innerHTML=C.map(function(c){return '<a href="'+(c[2].indexOf('tel:')===0?c[2]:pre+c[2])+'">'+c[0]+' '+c[1]+'</a>'}).join('');
    a.parentNode.insertBefore(d,a);
  });
  css('#jx-cats{display:flex;gap:8px;overflow-x:auto;padding:10px 12px;-webkit-overflow-scrolling:touch;scrollbar-width:none}#jx-cats::-webkit-scrollbar{display:none}');
}
/* 3. Акція тижня: кнопка «Купити» */
function weekBuy(){
  var box=document.getElementById('jessy-week-box');if(!box||!window.BuyButton)return false;
  var cards=[].slice.call(box.querySelectorAll('a.jw-c')).filter(function(a){return a.style.display!=='none'&&a.querySelector('.jw-b')&&!a.dataset.jx});
  if(!cards.length)return box.querySelectorAll('a.jw-c[data-jx]').length>0;
  cards.forEach(function(a){
    a.dataset.jx=1;
    fetch(a.getAttribute('href'),{credentials:'same-origin'}).then(function(r){return r.text()}).then(function(h){
      var m=h.match(/id="j-buy-button-widget-(\d+)"/);if(!m||!/j-buy-button-add/.test(h))return;
      var b=document.createElement('button');b.type='button';b.className='j-buy-button-add jx-buy';b.id='j-buy-button-widget-'+m[1];
      b.setAttribute('data-quantity','1');b.setAttribute('data-gift','0');b.setAttribute('data-cartProductType','product');b.textContent=ru?'Купить':'Купити';
      b.addEventListener('click',function(e){e.preventDefault()});
      var old=a.querySelector('.jw-b');old.parentNode.replaceChild(b,old);
      try{BuyButton.initButtons()}catch(e){}
    }).catch(function(){});
  });
  return true;
}
if(p==='/'||p==='/ru/'||p==='/ru'){ready(function(){var n=0,iv=setInterval(function(){if(weekBuy()||++n>40)clearInterval(iv)},500)})}
css('.jx-buy{margin-top:auto;padding:9px 10px;border:0;border-radius:8px;background:#e8590c;color:#fff;font-weight:700;font-size:14px;cursor:pointer;width:100%}');
/* 4. Картка товару: доставка, телефон, плаваюча «Купити» */
ready(function(){
  var main=[].slice.call(document.querySelectorAll('.j-buy-button-add[id^="j-buy-button-widget-"]')).filter(function(b){return b.offsetParent&&!b.closest('.catalogCard-box,.product-set,.productsSlider,#jessy-week-box,[class*=rcmb],[class*=slider]')})[0];
  if(!main||document.getElementById('jx-deliv'))return;
  var info=document.createElement('div');info.id='jx-deliv';
  info.innerHTML=ru?'🚚 <b>Бесплатная доставка от 2000 грн</b><br>📦 Новая почта, Укрпочта · 🏪 Самовывоз: Черновцы, ул. Энтузиастов, 2А<br>📞 Вопросы по товару: <a href="'+TEL+'">'+TELT+'</a>':'🚚 <b>Безкоштовна доставка від 2000 грн</b><br>📦 Нова пошта, Укрпошта · 🏪 Самовивіз: Чернівці, вул. Ентузіастів, 2А<br>📞 Питання щодо товару: <a href="'+TEL+'">'+TELT+'</a>';
  var host=main.closest('.product-card__order');if(!host){host=main;for(var i=0;i<5&&host.parentElement&&/flex|grid/.test(getComputedStyle(host.parentElement).display)&&getComputedStyle(host.parentElement).flexDirection!=='column';i++)host=host.parentElement}
  host.parentNode.insertBefore(info,host.nextSibling);
  if(!mob())return;
  var price='',ip=document.querySelector('[itemprop=price]');if(ip&&+(ip.content||ip.textContent))price=Math.round(+(ip.content||ip.textContent)).toLocaleString('uk-UA')+' грн';[].slice.call(document.querySelectorAll('script[type="application/ld+json"]')).forEach(function(s){var m=s.textContent.match(/"price"\s*:\s*"?([\d.]+)/);if(m&&!price)price=Math.round(+m[1]).toLocaleString('uk-UA')+' грн'});
  var bar=document.createElement('div');bar.id='jx-bar';
  bar.innerHTML='<span class="jx-bp">'+price+'</span><button type="button">'+(ru?'Купить':'Купити')+'</button>';
  document.body.appendChild(bar);
  bar.querySelector('button').onclick=function(){main.click()};
  var upd=function(){var v=main.getBoundingClientRect().bottom<0;bar.classList.toggle('on',v);document.body.classList.toggle('jx-bar-on',v)};window.addEventListener('scroll',upd,{passive:true});upd();
});
css('#jx-deliv{margin:12px 0;padding:10px 12px;border-radius:8px;background:#f3faf0;border:1px solid #d7e8d0;font-size:14px;line-height:1.6;color:#333}#jx-deliv a{color:#2b8a3e;font-weight:700;white-space:nowrap}#jx-bar{position:fixed;left:0;right:0;bottom:0;z-index:2147482000;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 14px calc(10px + env(safe-area-inset-bottom));background:#fff;box-shadow:0 -2px 10px rgba(0,0,0,.15);transform:translateY(110%);transition:transform .2s}#jx-bar.on{transform:none}#jx-bar .jx-bp{font-size:20px;font-weight:700}#jx-bar button{flex:1;max-width:220px;padding:12px;border:0;border-radius:8px;background:#5cb646;color:#fff;font-size:16px;font-weight:700}body.jx-bar-on .KeyCRM-toggleButtonContainer{bottom:84px!important}body.jx-bar-on .KeyCRM-chatWindowContainer{bottom:150px!important}');
/* 5. Вітання чату не перекриває товари на телефоні */
ready(function(){
  if(!mob())return;
  var n=0,iv=setInterval(function(){
    var r=document.querySelector('[id^="keycrm-"]');if(!r){if(++n>60)clearInterval(iv);return}
    clearInterval(iv);
    var hide=function(){[].slice.call(r.children).forEach(function(c){if(c.tagName!=='IFRAME'&&!/toggleButton/.test(c.className)&&c.textContent.trim().length>15)c.style.display='none'})};
    hide();new MutationObserver(hide).observe(r,{childList:true,subtree:true,characterData:true});
  },500);
});
})();
</script>
