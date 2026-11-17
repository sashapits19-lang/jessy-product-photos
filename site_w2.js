window.sl=ms=>new Promise(r=>setTimeout(r,ms));
window.tr=s=>{const m={'а':'a','б':'b','в':'v','г':'h','ґ':'g','д':'d','е':'e','є':'ie','ж':'zh','з':'z','и':'y','і':'i','ї':'i','й':'i','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f','х':'kh','ц':'ts','ч':'ch','ш':'sh','щ':'shch','ь':'','ю':'iu','я':'ia',"'":'','’':''};return s.toLowerCase().split('').map(c=>m[c]!==undefined?m[c]:c).join('').replace(/&/g,'-').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')};
window.setSel=(d,name,txt)=>{const s=d.querySelector(`select[name="${name}"]`);if(!s)return name+':nosel';const o=[...s.options].find(o=>o.text.trim().toLowerCase()===txt.toLowerCase())||[...s.options].find(o=>o.text.trim().toLowerCase().includes(txt.toLowerCase()));if(!o)return name+':noopt('+txt+')';if(s.multiple){o.selected=true}else{s.value=o.value};s.dispatchEvent(new Event('change',{bubbles:true}));if(window.jQuery&&d.defaultView.jQuery){try{d.defaultView.jQuery(s).trigger('change').trigger('chosen:updated')}catch(e){}};return ''};
window.chars=(d,x)=>{const e=[];const A={cat:['Коти','Кішки'],dog:['Собаки','Собаки'],fish:['Риби','Риби']}[x.a];
 if(x.a!=='fish'){e.push(setSel(d,'names[h_2_wid_korma]','Сухі корми'),setSel(d,'names[h_2_forma_wypuska]','Сухі корми'))}
 if(x.cls)e.push(setSel(d,'names[h_2_klass_korma]',x.cls));
 if(x.ctry)e.push(setSel(d,'names[h_2_strana_proizwoditel]',x.ctry));
 e.push(setSel(d,'names[h_2_wid_zhiwotnyh][]',A[0]),setSel(d,'names[h_2_zhiwotnoe]',A[1]));
 return e.filter(Boolean).join(',')};
window.getC=w=>w.CKEDITOR&&w.CKEDITOR.instances;
window.mk=async(x)=>{const f=window.__f;
 f.src='/adminLegacy/edit.php?back=%2FadminLegacy%2Fdata.php%3Fhandler%3D17&parent='+x.cat+'&id=addnew&handler=463&checkcode=yamete_kudasai';
 let C;for(let k=0;k<40;k++){await sl(1000);const w=f.contentWindow;C=getC(w);if(C&&[3,1,4,5].every(l=>C[`parent_common[i18n][${l}][description]`]&&C[`parent_common[i18n][${l}][description]`].status==='ready'))break}
 const d=f.contentDocument;const S=(n,v)=>{const el=d.querySelector(`[name="${n}"]`);if(el){el.value=v;el.dispatchEvent(new Event('change',{bubbles:true}));return 1}return 0};
 for(const l of [3,1,4,5]){const ua=l===3;S(`parent_common[i18n][${l}][title]`,ua?x.ua:x.ru);S(`modifications[0][i18n][${l}][mod_title]`,ua?x.ua:x.ru);C[`parent_common[i18n][${l}][description]`].setData(ua?x.dua:x.dru)}
 S('modifications[0][article]',x.sku);S('modifications[0][currency]','1');S('modifications[0][alias][slug]',tr(x.ua));
 if(x.br)S('parent_common[brand]',String(x.br));S('parent_common[unit_of_measurement]','11');
 const cb=d.querySelector('input[type=checkbox][name="modifications[0][display_in_showcase]"]');if(cb&&cb.checked)cb.click();
 const ce=chars(d,x);await sl(1500);
 [...d.querySelectorAll('a,button')].find(b=>b.innerText.trim()==='Зберегти').click();
 let id=null;for(let k=0;k<25;k++){await sl(1000);try{const m=f.contentWindow.location.href.match(/[?&]id=(\d+)/);if(m){id=m[1];break}}catch(e){}}
 return {sku:x.sku,id,ce}};
window.fix=async(x,id)=>{const f=window.__f;f.src='/adminLegacy/edit.php?back=%2FadminLegacy%2Fdata.php%3Fhandler%3D17&id='+id+'&action=edit&handler=463&checkcode=yamete_kudasai';
 for(let k=0;k<30;k++){await sl(1000);const d=f.contentDocument;if(d&&d.readyState==='complete'&&d.querySelector('[name="modifications[0][article]"]'))break}
 await sl(1500);const d=f.contentDocument;const g=n=>d.querySelector(`[name="${n}"]`)?.value;
 const art=g('modifications[0][article]');const before=[...d.querySelectorAll('select[name^="names[h_2_"]')].filter(s=>s.selectedOptions[0]&&s.value&&s.value!=='0').map(s=>s.name).length;
 const ce=chars(d,x);const cb=d.querySelector('input[type=checkbox][name="modifications[0][display_in_showcase]"]');const vis=cb&&cb.checked;
 await sl(1000);[...d.querySelectorAll('a,button')].find(b=>b.innerText.trim()==='Зберегти').click();await sl(6000);
 return {sku:x.sku,id,art,before,ce,vis,title:g('parent_common[i18n][3][title]')===x.ua,unit:g('parent_common[unit_of_measurement]'),brand:g('parent_common[brand]')}};
window.runAll=async(list)=>{window.__res=window.__res||[];for(const x of list){if(window.__stop)break;try{const r=await mk(x);let r2=null;if(r.id)r2=await fix(x,r.id);window.__res.push({...r,fix:r2})}catch(e){window.__res.push({sku:x.sku,err:String(e)})}localStorage.setItem('__w2res',JSON.stringify(window.__res))}window.__fin=true};
