import './style.css';
import {people,topics,suggest} from './catalog.js';
import {configured,reflect} from './ai.js';
const view=document.querySelector('main');
const storage='crossroads.notebook.v1';
const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const $=s=>view.querySelector(s);
let concern='',topic,choice,question='',source='',draft='',date='',notice='',matches=[],packId='',generation=0;
function saved(){try{return JSON.parse(localStorage.getItem(storage)||'[]')}catch{return []}}
const photos = new Set(['gates','jobs','curie']);
const button=(label,attrs)=>'<button '+attrs+'>'+escape(label)+'</button>';
const back=(url,label)=>'<a class="back" href="#'+url+'">← '+label+'</a>';
function show(){
 generation++;
 const page=location.hash.slice(1)||'home';
 document.body.classList.toggle('home',page==='home');
 if(page==='home'){
 view.innerHTML='<section class="hero"><h1>Who’s been<br>here before?</h1><a class="btn" href="#ask">Open the archive →</a></section>';
 }else if(page==='ask'){
 view.innerHTML='<div class="eyebrow">The question archive</div><h1>What’s on your mind?</h1><div class="split"><section><h2>Pick a crossroads</h2>'+topics.map(([id,label])=>button(label,'class="row" data-topic="'+id+'"')).join('')+'</section><section><h2>In your own words</h2><form id="find"><label for="concern">What decision are you facing?</label><textarea required maxlength="500" id="concern" placeholder="I’d like to take a semester off and work.">'+escape(concern)+'</textarea><p class="hint">We’ll look for a nearby topic in the eight-part archive. You choose which one fits.</p><button>Find a starting point →</button></form><div aria-live="polite" id="found"></div></section></div>';
 $('#find').onsubmit=e=>{e.preventDefault();concern=$('#concern').value.trim();if(!concern)return;matches=suggest(concern);$('#found').innerHTML='<h3>'+ (matches.length?'Is this close?':'Which feels closest?')+'</h3><p>'+ (matches.length?'These topics share words with your note.':'Your note has no clear match in the archive. Pick any topic to continue.')+'</p>'+topics.filter(t=>!matches.length||matches.includes(t[0])).map(t=>button(t[1],'class="row" data-topic="'+t[0]+'"')).join('')};
 }else if(page==='records'&&topic){
 view.innerHTML='<div class="eyebrow">Three lives / One question</div><h1>'+escape(topic[1])+'</h1><div class="cards">'+topic[3].map(([id,title,q,override],i)=>{const [name,fact,cite,url]=people[id];return '<article class="card">'+(photos.has(id)?'<img src="/art/'+id+'.jpg" alt="'+escape(name)+'">':'')+'<small>'+escape(name)+'</small><h3>'+escape(title)+'</h3><p>'+escape(override||fact)+'</p><p class="credit">'+(url?'<a href="'+url+'" target="_blank" rel="noreferrer">'+escape(cite)+' ↗</a>':escape(cite))+'</p>'+button('Use this perspective','data-person="'+i+'"')+'</article>'}).join('')+'</div>'+back('ask','Change my question')+' · <a class="credit" href="/credits.html">Image credits</a>';
 }else if(page==='pack'&&choice){
 const [id,title,base,override]=choice;
 view.innerHTML='<div class="sheet"><div class="eyebrow">My decision pack</div><h2>'+escape(title)+'</h2><p>From the record of '+escape(people[id][0])+'.</p><label for="question">A question to take to an adviser</label><textarea id="question" maxlength="900">'+escape(question||base)+'</textarea><label><input type="checkbox" id="cloud"> Allow Firebase cloud if on-device AI is unavailable</label><p class="hint">Device-only mode can use your original note. With cloud fallback enabled, both routes receive only the public topic and record. Your personal note stays here.</p><details><summary>Preview the material sent to AI</summary><p id="preview"></p></details>'+button('Tailor my question with AI','id="ai" class="quiet"')+'<p id="status" role="status">'+escape(source||(!configured?'Archive mode · Firebase is not configured on this build.':''))+'</p><form id="save"><label for="action">One thing I’ll do this week</label><textarea id="action" maxlength="350" required placeholder="Ask the registrar which classes I could audit on leave.">'+escape(draft)+'</textarea><label for="date">When should I revisit it?</label><input id="date" type="date" required value="'+escape(date)+'"><div class="actions"><button>Save to my notebook</button></div><p class="hint">Saved in this browser. You can export a calendar reminder from your notebook.</p></form></div>'+back('records','Read the other two');
 const requestData=()=>({concern:$('#cloud').checked?topic[1]:(concern||topic[1]),record:override||people[id][1],question:base,allowCloud:$('#cloud').checked});
 const preview=()=>{const d=requestData();$('#preview').textContent=[d.concern,d.record,d.question].join(' · ')};
 $('#cloud').onchange=preview;preview();
 $('#ai').onclick=async e=>{const btn=e.currentTarget,token=generation;btn.disabled=true;$('#status').textContent='Preparing your question…';try{const answer=await reflect(requestData());if(token!==generation)return;question=answer.text;source=answer.source;$('#question').value=question;$('#status').textContent=source}catch(err){if(token===generation)$('#status').textContent=configured?'AI could not finish. You can edit the archive question or enable cloud fallback and retry.':err.message}finally{btn.disabled=false}};
 $('#save').onsubmit=e=>{e.preventDefault();draft=$('#action').value.trim();question=$('#question').value.trim();date=$('#date').value;if(!draft||!question){$('#status').textContent='Add a question and a next step before saving.';return}packId=packId||crypto.randomUUID();const entry={id:packId,concern:concern||topic[1],name:people[id][0],question,action:draft,date};try{localStorage.setItem(storage,JSON.stringify([entry,...saved().filter(p=>p.id!==packId)]));notice='Saved on this device.';location.hash='shelf'}catch{$('#status').textContent='Browser storage is unavailable. Copy your note before leaving.'}};
 }else if(page==='shelf'){
 view.innerHTML='<div class="eyebrow">Kept on this device</div><h1>My notebook</h1><p role="status" id="status">'+escape(notice)+'</p>'+saved().map(p=>'<article class="sheet"><small>Revisit '+escape(p.date)+' · '+escape(p.name)+'</small><h2>'+escape(p.concern)+'</h2><b>Ask</b><p>'+escape(p.question)+'</p><b>Next step</b><p>'+escape(p.action)+'</p><div class="actions">'+button('Copy note','data-copy="'+escape(p.id)+'"')+button('Export calendar reminder','class="quiet" data-calendar="'+escape(p.id)+'"')+'</div></article>').join('')+(saved().length?'':'<p>Your first decision pack will appear here.</p>')+back('ask','Explore another question');
 }else{location.replace('#ask');return}
 window.scrollTo(0,0);
 const heading=$('h1,h2');if(heading){heading.tabIndex=-1;heading.classList.add('screenTitle');heading.focus({preventScroll:true})}
}
view.onclick=async e=>{
 const el=e.target.closest('button');if(!el)return;
 if(el.dataset.topic){concern=$('#concern')?.value.trim()||'';topic=topics.find(t=>t[0]===el.dataset.topic);location.hash='records'}
 if(el.dataset.person!==undefined){choice=topic[3][Number(el.dataset.person)];question=choice[2];source='';draft='';date='';packId='';location.hash='pack'}
 const p=saved().find(p=>p.id===(el.dataset.copy||el.dataset.calendar));if(!p)return;
 const note=[p.concern,p.name,p.question,p.action,p.date].join('\n');
 if(el.dataset.copy){try{await navigator.clipboard.writeText(note);$('#status').textContent='Note copied.'}catch{$('#status').textContent='Copy is unavailable. Select the text in your note to copy it.'}}
 if(el.dataset.calendar){const clean=s=>s.replaceAll('\\','\\\\').replaceAll('\n','\\n').replaceAll(',','\\,').replaceAll(';','\\;');const data=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Crossroads//Decision notebook//EN','BEGIN:VEVENT','UID:'+p.id+'@crossroads','DTSTAMP:'+new Date().toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,''),'DTSTART;VALUE=DATE:'+p.date.replaceAll('-',''),'SUMMARY:Revisit my decision','DESCRIPTION:'+clean(note),'BEGIN:VALARM','TRIGGER:-PT9H','ACTION:DISPLAY','DESCRIPTION:Revisit my decision','END:VALARM','END:VEVENT','END:VCALENDAR',''].join('\r\n');const url=URL.createObjectURL(new Blob([data],{type:'text/calendar'}));const a=document.createElement('a');a.href=url;a.download='crossroads-reminder.ics';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
};
window.addEventListener('hashchange',show);show();

view.addEventListener('pointermove',event=>{const hero=event.target.closest('.hero');if(hero){const box=hero.getBoundingClientRect();hero.style.setProperty('--mx',(event.clientX-box.left)+'px');hero.style.setProperty('--my',(event.clientY-box.top)+'px')}});
