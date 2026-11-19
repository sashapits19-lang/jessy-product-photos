<script id="jessy-starter">
(function(){
var p=location.pathname,ru=/^\/ru(\/|$)/.test(p);
var K=[
{u:'/sukhyi-korm-dlia-tsutseniat-vid-2-10-misiatsiv-royal-canin-mini-puppy-2-kh./',ua:'Цуценя дрібних порід',ru:'Щенок мелких пород',i:'🐶'},
{u:'/sukhyi-korm-dlia-tsutseniat-ta-molodykh-sobak-serednikh-porid-brit-premium-junior-m-zi-smakom-kurky-3-kh/',ua:'Цуценя середніх порід',ru:'Щенок средних пород',i:'🐕'},
{u:'/sukhyi-korm-brit-premium-dog-junior-l-dlia-tsutseniat-velykykh-porid-3-kh/',ua:'Цуценя великих порід',ru:'Щенок крупных пород',i:'🐕‍🦺'},
{u:'/sukhyi-korm-dlia-kosheniat-purina-pro-plan-original-kitten-chicken-15-kh-kurka/',ua:'Кошеня',ru:'Котёнок',i:'🐱'}];
function goSet(){var b=[].slice.call(document.querySelectorAll('.product-set__block,.product-set__item')).filter(function(x){return /Стартов/.test(x.textContent)})[0];if(b){b.scrollIntoView({behavior:'smooth',block:'start'});return true}return false}
if(location.hash==='#starter'){var n=0,iv=setInterval(function(){if(goSet()||++n>20)clearInterval(iv)},400);return}
if(!(p==='/'||p==='/ru/'||p==='/ru'))return;
var T=ru?{h:'🎁 Стартовые наборы для щенков и котят',s:'Корм, миска, лежак и средство от глистов — всё для первых дней дома. Скидка 5% и бесплатная доставка.',b:'Смотреть набор →',w:'вместо'}:{h:'🎁 Стартові набори для цуценят і кошенят',s:'Корм, миска, лежак і засіб від глистів — усе для перших днів удома. Знижка 5% і безкоштовна доставка.',b:'Дивитись набір →',w:'замість'};
function start(){
if(document.getElementById('jessy-starter-box'))return;
var anchor=document.querySelector('.banners-group')||document.querySelector('.main-slider,.slider,[class*=banners]')||document.querySelector('main');
if(!anchor)return;
var box=document.createElement('div');box.id='jessy-starter-box';box.style.display='none';
box.innerHTML='<style>#jessy-starter-box{max-width:1200px;margin:24px auto;padding:16px;border:2px solid #5cb646;border-radius:12px;background:#f3faf0;font-family:inherit}#jessy-starter-box h2{margin:0 0 4px;font-size:22px;color:#2f7a1f}#jessy-starter-box .js-s{margin:0 0 12px;font-size:14px;color:#444}#jessy-starter-box .js-g{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}@media(max-width:900px){#jessy-starter-box .js-g{grid-template-columns:repeat(2,1fr)}}@media(max-width:600px){#jessy-starter-box{margin:16px 8px;padding:12px}#jessy-starter-box h2{font-size:18px}}#jessy-starter-box a.js-c{display:flex;flex-direction:column;background:#fff;border-radius:8px;padding:10px;text-decoration:none;color:#222;border:1px solid #e3eedd}#jessy-starter-box img{width:100%;aspect-ratio:1;object-fit:contain}#jessy-starter-box .js-t{font-size:15px;font-weight:700;margin:6px 0 2px}#jessy-starter-box .js-p{font-size:18px;font-weight:700;color:#2f7a1f}#jessy-starter-box .js-o{font-size:13px;color:#888;text-decoration:line-through;margin-left:6px;font-weight:400}#jessy-starter-box .js-b{margin-top:auto;padding-top:8px;font-size:13px;color:#2b8a3e;font-weight:600}</style><h2>'+T.h+'</h2><p class="js-s">'+T.s+'</p><div class="js-g"></div>';
anchor.parentNode.insertBefore(box,anchor.nextSibling);
var g=box.querySelector('.js-g'),shown=0;
K.forEach(function(k){
var url=(ru?'/ru':'')+k.u;var a=document.createElement('a');a.className='js-c';a.href=url+'#starter';a.style.display='none';g.appendChild(a);
fetch(url,{credentials:'same-origin'}).then(function(r){return r.text()}).then(function(h){
var d=new DOMParser().parseFromString(h,'text/html');
var b=[].slice.call(d.querySelectorAll('.product-set__block,.product-set__item')).filter(function(x){return /Стартовий набір/.test(x.textContent)})[0];
if(!b)return;
var pr=(b.textContent.match(/\d[\d\s]*\s?грн/g)||[]).map(function(x){return x.replace(/\s+/g,' ').trim()});
if(pr.length<2)return;
var img=d.querySelector('meta[property="og:image"]');
a.innerHTML=(img?'<img loading="lazy" src="'+img.content+'" alt="'+(ru?'Стартовый набор: ':'Стартовий набір: ')+(ru?k.ru:k.ua)+'">':'')+'<div class="js-t">'+k.i+' '+(ru?k.ru:k.ua)+'</div><div><span class="js-p">'+pr[pr.length-2]+'</span><span class="js-o">'+pr[pr.length-1]+'</span></div><div class="js-b">'+T.b+'</div>';
a.style.display='';shown++;box.style.display='';
}).catch(function(){});
});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
</script>
