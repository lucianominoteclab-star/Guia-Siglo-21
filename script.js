
let mode = 'official'; // 'official' or 'advisor'
let official = {};
let advisors = {};

async function loadData(){
  official = await fetch('official.json').then(r=>r.json());
  advisors = await fetch('advisors.json').then(r=>r.json());
}
function setMode(m){
  mode = m;
  document.querySelectorAll('.mode').forEach(b=>b.classList.remove('active'));
  document.getElementById(m==='official'?'mode_official':'mode_advisor').classList.add('active');
  addSystemMessage('Modo: ' + (mode==='official'?'TEXTO OFICIAL':'EXPLICADO PARA ASESORES'));
}
function addSystemMessage(text){
  const messages = document.getElementById('messages');
  const div = document.createElement('div'); div.className='bubble out'; div.innerText = text;
  messages.appendChild(div); messages.scrollTop = messages.scrollHeight;
}
function addUserMessage(text){
  const messages = document.getElementById('messages');
  const div = document.createElement('div'); div.className='bubble in'; div.innerText = text;
  messages.appendChild(div); messages.scrollTop = messages.scrollHeight;
}
function respond(query){
  const q = query.trim().toLowerCase();
  const results = [];
  const source = (mode==='official')?official:advisors;
  for(const k in source){
    const item = source[k];
    if((item.title && item.title.toLowerCase().includes(q)) || (item.text && item.text.toLowerCase().includes(q)) || (item.summary && item.summary.toLowerCase().includes(q))){
      results.push(item);
    }
  }
  const messages = document.getElementById('messages');
  if(results.length===0){
    const no = document.createElement('div'); no.className='bubble out'; no.innerText = 'No se encontraron resultados. Probá con otra palabra clave.';
    messages.appendChild(no); messages.scrollTop = messages.scrollHeight;
    return;
  }
  // show top 2 results
  results.slice(0,2).forEach(item=>{
    const div = document.createElement('div'); div.className='bubble out';
    if(mode==='official'){
      div.innerHTML = '<strong>'+item.title+'</strong>\n\n'+(item.text?item.text.substr(0,1500):'')+'\n\nFuente: GUIA SIGLO21.docx';
    } else {
      div.innerHTML = '<strong>'+item.title+'</strong>\n\n'+(item.summary||item.advice||'') ;
    }
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  });
}

document.addEventListener('DOMContentLoaded', async ()=>{
  await loadData();
  document.getElementById('mode_official').addEventListener('click', ()=>setMode('official'));
  document.getElementById('mode_advisor').addEventListener('click', ()=>setMode('advisor'));
  document.getElementById('send_btn').addEventListener('click', ()=>{
    const v = document.getElementById('input_msg').value;
    if(!v.trim()) return;
    addUserMessage(v);
    respond(v);
    document.getElementById('input_msg').value = '';
  });
  document.getElementById('input_msg').addEventListener('keypress', (e)=>{
    if(e.key==='Enter'){ e.preventDefault(); document.getElementById('send_btn').click(); }
  });
  document.querySelectorAll('.chip').forEach(c=>c.addEventListener('click', (e)=>{
    const q = e.target.dataset.q;
    document.getElementById('input_msg').value = q;
    document.getElementById('send_btn').click();
  }));
  setMode('official');
});
