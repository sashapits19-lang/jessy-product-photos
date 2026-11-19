(function(){
const MAP={8937:699,8938:700,8945:392,8946:393,8947:583,8987:524,8988:523,9237:392,9319:393,9352:392,9587:553,9591:543,9597:701,10319:388,10486:149,11181:374,11183:375,11184:382,11185:381,11250:90,11253:145,11281:373,11283:1126,11284:83,11324:528,11325:539,11404:146,11660:1005,11661:511,11662:504};
const esc=s=>String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const fx=s=>String(s||'').replace(/(\d) , (\d)/g,'$1,$2').replace(/\s+,/g,',').replace(/\(\s+/g,'(').replace(/\s+\)/g,')').replace(/\s+/g,' ').trim();
const tbl=(h,rows)=>'<table border="1" cellpadding="6" cellspacing="0"><thead><tr>'+h.map(x=>'<th>'+esc(x)+'</th>').join('')+'</tr></thead><tbody>'+rows.map(r=>'<tr>'+r.map(c=>'<td>'+esc(c)+'</td>').join('')+'</tr>').join('')+'</tbody></table>';
const T={ua:{comp:'Склад',add:'Добавки на 1 кг',an:'Аналітичні показники',en:'Обмінна енергія',feed:'Норми годування',vet:'Ветеринарна дієта: застосовуйте за рекомендацією ветеринарного лікаря.',tip:'Норми орієнтовні: коригуйте порцію з урахуванням ваги, віку й активності тварини. Свіжа вода має бути завжди доступна.',src1:'Джерело складу та норм: офіційний сайт Farmina (farmina.com/ua).',src2:'Джерело складу: офіційний сайт Farmina (farmina.com/ua).'},
ru:{comp:'Состав',add:'Добавки на 1 кг',an:'Аналитические показатели',en:'Обменная энергия',feed:'Нормы кормления',vet:'Ветеринарная диета: применяйте по рекомендации ветеринарного врача.',tip:'Нормы ориентировочные: корректируйте порцию с учётом веса, возраста и активности животного. Свежая вода должна быть всегда доступна.',src1:'Источник состава и норм: официальный сайт Farmina (farmina.com/ua).',src2:'Источник состава: официальный сайт Farmina (farmina.com/ua).'}};
window.buildFM=function(UA,RU){const out={ids:{},d:[],bad:[]};const idx={};
for(const [id,p] of Object.entries(MAP)){if(idx[p]===undefined){const u=UA[p],r=RU[p];if(!u||!r){out.bad.push(id+':nodata');continue}
const g=f=>{let v=r[f];if(typeof v==='string'&&v[0]==='@')v=RU[v.slice(1)][f];return v};
const m=fx(u.nut).match(/^харчові добавки на кг\s*(?:Харчові добавки на кг:\s*)?(.*?)\s*поживні речовини\s*(.*?)\s*енергетична цінність\s*EM Kcal\/Kg\s*([\d.,]+)\s*-\s*Mj\/Kg\s*([\d.,]+)/i);
if(!m){out.bad.push(id+':nutparse');continue}
const addUA=m[1].replace(/[.;,\s]+$/,'')+'.';const anUA=m[2].replace(/Енергетична цінність:[^.]*?кг\.?/gi,'').replace(/[.;,\s]+$/,'')+'.';
const kc=m[3],mj=m[4];
const B=(L,desc,ing,add,an)=>{const t=T[L];const o=['<p>'+esc(desc)+'</p>'];if(r.vet)o.push('<p><strong>'+t.vet+'</strong></p>');
o.push('<h3>'+t.comp+'</h3><p>'+esc(ing)+'</p>');o.push('<h3>'+t.add+'</h3><p>'+esc(add)+'</p>');
if(!r.noan&&an)o.push('<h3>'+t.an+'</h3><p>'+esc(an)+'</p>');
o.push('<p>'+t.en+': '+kc+' '+(L==='ua'?'ккал/кг':'ккал/кг')+' ('+mj+' '+(L==='ua'?'МДж/кг':'МДж/кг')+').</p>');
const f=r.feed;if(f){o.push('<h3>'+t.feed+'</h3>'+(f.note?'<p>'+esc(L==='ua'?f.note:f.noter)+'</p>':'')+tbl(L==='ua'?f.h:f.hr,f.rows.map(x=>L==='ua'?x:x.map(c=>c.replace('міс.','мес.'))))+'<p>'+t.tip+'</p>')}
o.push('<p><small>'+(f?t.src1:t.src2)+'</small></p>');return o.join('\n')};
const ua=B('ua',r.dua,fx(u.ing),addUA,anUA),ru=B('ru',r.dru,g('ing'),g('add'),g('an'));
if(/[ыэъёЫЭЪЁ]/.test(ua.replace(/<[^>]+>/g,'')))out.bad.push(id+':uaRU');if(/[іїєґІЇЄҐ]/.test(ru.replace(/<[^>]+>/g,'')))out.bad.push(id+':ruUA');
idx[p]=out.d.length;out.d.push({p,ua,ru})}
out.ids[id]=idx[p]}return out};
window.setBothX=async(id,ua,ru,mark)=>{const f=window.__sf||document.querySelector('iframe');f.src='about:blank';await sl(400);f.src='/adminLegacy/edit.php?back=%2FadminLegacy%2Fdata.php%3Fhandler%3D17&id='+id+'&action=edit&handler=463&checkcode=yamete_kudasai';let C,D;const k3='parent_common[i18n][3][description]',k1='parent_common[i18n][1][description]';for(let k=0;k<40;k++){await sl(700);try{const w=f.contentWindow;C=w.CKEDITOR&&w.CKEDITOR.instances[k3];D=w.CKEDITOR&&w.CKEDITOR.instances[k1];if(w.location.href.includes('id='+id)&&C&&D&&C.status==='ready'&&D.status==='ready')break}catch(e){}}if(!C||!D)return id+' noeditor';C.setData(ua);D.setData(ru);await sl(1500);if(!C.getData().includes(mark)||!D.getData().includes(mark))return id+' setfail';[...f.contentDocument.querySelectorAll('a,button')].find(b=>b.innerText.trim()==='Зберегти').click();for(let k=0;k<20;k++){await sl(700);try{if(/збережено/i.test(f.contentDocument.body.innerText))return id+' saved'}catch(e){}}return id+' saved?'};
})();
