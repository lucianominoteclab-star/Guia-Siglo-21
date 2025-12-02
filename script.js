let mode = 'official'; // 'official' or 'advisor'
let official = {};
let advisors = {};

// --- Fuzzy matching helpers ---

function normalize(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// Puntaje por coincidencia simple
function scoreMatch(text, query) {
  const t = normalize(text);
  const q = normalize(query);

  if (t.includes(q)) return 3;                 // coincidencia exacta
  if (t.split(" ").some(w => q.includes(w))) return 2; // comparte palabras
  if (q.split(" ").some(w => t.includes(w))) return 2; // palabra clave dentro
  return 0;
}

// Distancia de Levenshtein (simplificada)
function levenshtein(a, b) {
  if (!a || !b) return 0;
  const matrix = Array(a.length + 1).fill(null).map(() =>
    Array(b.length + 1).fill(null)
  );

  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,    // eliminar
        matrix[i][j - 1] + 1,    // agregar
        matrix[i - 1][j - 1] + cost // reemplazar
      );
    }
  }

  const maxLen = Math.max(a.length, b.length);
  const dist = matrix[a.length][b.length];
  return 1 - dist / maxLen; // normalizar entre 0 y 1
}

// Fuzzy search general
function fuzzySearch(query, source) {
  const q = normalize(query);
  const results = [];

  for (const k in source) {
    const item = source[k];
    let combined = (item.title || "") + " " + (item.text || "") + " " + (item.summary || "");

    let s1 = scoreMatch(combined, q);
    let s2 = levenshtein(normalize(item.title || ""), q);
    let s3 = levenshtein(normalize(item.summary || ""), q);

    const totalScore = s1 * 2 + s2 + s3;

    if (totalScore > 0.15) {
      results.push({ score: totalScore, item });
    }
  }

  return results.sort((a, b) => b.score - a.score).slice(0, 3); // top 3
}

// --- Chat UI ---
async function loadData() {
  official = await fetch('official.json').then(r => r.json());
  advisors = await fetch('advisors.json').then(r => r.json());
}

function setMode(m) {
  mode = m;
  document.querySelectorAll('.mode').forEach(b => b.classList.remove('active'));
  document.getElementById(
    m === 'official' ? 'mode_official' : 'mode_advisor'
  ).classList.add('active');

  addSystemMessage('Modo: ' + (mode === 'official' ? 'Texto Oficial' : 'Explicado para Asesores'));
}

function addSystemMessage(text) {
  const messages = document.getElementById('messages');
  const div = document.createElement('div');
  div.className = 'bubble out';
  div.innerText = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function addUserMessage(text) {
  const messages = document.getElementById('messages');
  const div = document.createElement('div');
  div.className = 'bubble in';
  div.innerText = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function respond(query) {
  const source = mode === 'official' ? official : advisors;
  const results = fuzzySearch(query, source);

  const messages = document.getElementById('messages');

  if (results.length === 0) {
    const no = document.createElement('div');
    no.className = 'bubble out';
    no.innerText =
      'No encontré una respuesta directa, pero probá escribir una palabra clave como: "regularidad", "MIA", "parciales", "final", "TFG".';
    messages.appendChild(no);
    messages.scrollTop = messages.scrollHeight;
    return;
  }

  results.forEach(result => {
    const { item } = result;
    const div = document.createElement('div');
    div.className = 'bubble out';

    if (mode === 'official') {
      div.innerHTML =
        '<strong>' +
        item.title +
        '</strong><br><br>' +
        (item.text ? item.text.substring(0, 2000) : '') +
        '<br><br><em>Fuente: Reglamento (GUIA SIGLO21.docx)</em>';
    } else {
      div.innerHTML =
        '<strong>' +
        item.title +
        '</strong><br><br>' +
        (item.summary || item.advice);
    }

    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  });
}

// --- Events ---
document.addEventListener('DOMContentLoaded', async () => {
  await loadData();

  document.getElementById('mode_official').addEventListener('click', () =>
    setMode('official')
  );
  document.getElementById('mode_advisor').addEventListener('click', () =>
    setMode('advisor')
  );

  document.getElementById('send_btn').addEventListener('click', () => {
    const v = document.getElementById('input_msg').value;
    if (!v.trim()) return;
    addUserMessage(v);
    respond(v);
    document.getElementById('input_msg').value = '';
  });

  document
    .getElementById('input_msg')
    .addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('send_btn').click();
      }
    });

  document.querySelectorAll('.chip').forEach(c =>
    c.addEventListener('click', e => {
      const q = e.target.dataset.q;
      document.getElementById('input_msg').value = q;
      document.getElementById('send_btn').click();
    })
  );

  setMode('official');
});
