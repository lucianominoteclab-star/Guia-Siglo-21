// baseConocimiento: resúmenes + extractos + enlace a sección del reglamento.
// Fuente: https://contenidos.21.edu.ar/microsites/reglamento/index.php
const baseConocimiento = [
  {
    key: "universidad",
    titulo: "Capítulo 1 — La Universidad",
    resumen: "Misión, valores, autoridades, domicilio legal, modificaciones al reglamento y firma digital.",
    detalle: "Incluye la misión institucional, autoridades, funciones y procedimientos formales de modificación al reglamento.",
    url: "https://contenidos.21.edu.ar/microsites/reglamento/index.php#cap1"
  },
  {
    key: "ingreso admision",
    titulo: "Capítulo 2 — Condiciones de ingreso y admisión",
    resumen: "Normas sobre requisitos de ingreso, documentación obligatoria y condiciones para cursado.",
    detalle: "Contiene las categorías de carreras (pregrado, grado, posgrado) y la documentación exigida para el legajo.",
    url: "https://contenidos.21.edu.ar/microsites/reglamento/index.php#cap2"
  },
  {
    key: "modalidades",
    titulo: "Capítulo 3 — Modalidades de cursado",
    resumen: "Define las modalidades: presencial, educación distribuida, virtual; cambios de modalidad y calendario académico.",
    detalle: "Reglamenta implementación, requisitos para solicitar cambios y cómo se publica y aplica el calendario académico.",
    url: "https://contenidos.21.edu.ar/microsites/reglamento/index.php#cap3"
  },
  {
    key: "modelo academico",
    titulo: "Capítulo 4 — Modelo Académico (Academia 21)",
    resumen: "Estructura curricular, métodos didácticos y el sistema de evaluación EVA 21.",
    detalle: "Describe diseño curricular, objetivos de aprendizaje y sistema EVA 21 para evaluar competencias.",
    url: "https://contenidos.21.edu.ar/microsites/reglamento/index.php#cap4"
  },
  {
    key: "inscripcion",
    titulo: "Capítulo 5 — Inscripción al cursado",
    resumen: "Cómo inscribirse a materias, inscripciones de verano y procedimientos de cambios de cátedra.",
    detalle: "Plazos de inscripción, requisitos y pasos en la plataforma para inscribirse o cambiar de cátedra.",
    url: "https://contenidos.21.edu.ar/microsites/reglamento/index.php#cap5"
  },
  {
    key: "equivalencias",
    titulo: "Capítulo 6 — Equivalencias, pasantías, ayudantías y créditos",
    resumen: "Procedimiento para solicitar equivalencias, régimen de pasantías y sistema de créditos.",
    detalle: "Requisitos documentales, plazos y normativa para equivalencias; regulaciones para pasantías y ayudantías.",
    url: "https://contenidos.21.edu.ar/microsites/reglamento/index.php#cap6"
  },
  {
    key: "pasantias",
    titulo: "Capítulo 7 — Pasantías",
    resumen: "Régimen, convenios y evaluación de pasantías.",
    detalle: "Marco legal de las pasantías y cómo se acreditan en el plan de estudios.",
    url: "https://contenidos.21.edu.ar/microsites/reglamento/index.php#cap7"
  },
  {
    key: "centros excelencia",
    titulo: "Capítulo 8 — Centros de Excelencia",
    resumen: "Centros, certificados por competencias, ComunidadNET y programas de reconocimiento.",
    detalle: "Describe certificaciones, comunidades y programas de excelencia académica.",
    url: "https://contenidos.21.edu.ar/microsites/reglamento/index.php#cap8"
  },
  {
    key: "ayudantia",
    titulo: "Capítulo 9 — Sistema de ayudantía y adscripción",
    resumen: "Normativa sobre ayudantías de alumnos y régimen de adscripción.",
    detalle: "Funciones, requisitos y procedimientos para formar parte del sistema de ayudantía.",
    url: "https://contenidos.21.edu.ar/microsites/reglamento/index.php#cap9"
  },
  {
    key: "investigacion",
    titulo: "Capítulo 10 — Investigación",
    resumen: "Normas generales y requisitos para proyectos de investigación.",
    detalle: "Consideraciones generales y gestión de proyectos de investigación.",
    url: "https://contenidos.21.edu.ar/microsites/reglamento/index.php#cap10"
  },
  {
    key: "posgrado",
    titulo: "Capítulo 11 — Posgrado",
    resumen: "Requisitos de admisión, condiciones de cursado y escalas de notas en posgrados.",
    detalle: "Reglas específicas para programas de posgrado, admisión y condiciones de aprobación.",
    url: "https://contenidos.21.edu.ar/microsites/reglamento/index.php#cap11"
  },
  {
    key: "graduacion",
    titulo: "Capítulo 12 — Graduación",
    resumen: "Condiciones para graduarse: TFG, procesos de titulación y colación.",
    detalle: "Requisitos para presentación y defensa del Trabajo Final de Graduación, CAE y acto de colación.",
    url: "https://contenidos.21.edu.ar/microsites/reglamento/index.php#cap12"
  },
  {
    key: "disciplina",
    titulo: "Capítulo 13 — Régimen disciplinario",
    resumen: "Normas de conducta y sanciones aplicables por incumplimientos.",
    detalle: "Régimen general de sanciones y normas de comportamiento (por ejemplo, biblioteca).",
    url: "https://contenidos.21.edu.ar/microsites/reglamento/index.php#cap13"
  },
  {
    key: "gestiones",
    titulo: "Capítulo 14 — Gestiones administrativas",
    resumen: "Planes de estudio, becas, normas arancelarias y solicitudes de baja.",
    detalle: "Requisitos para becas, aranceles, procesos administrativos y solicitud de baja.",
    url: "https://contenidos.21.edu.ar/microsites/reglamento/index.php#cap14"
  }
];

// búsqueda simple: coincidencias en key / título / resumen / detalle
function buscarReglamento(q) {
  const ql = q.trim().toLowerCase();
  if (!ql) return [];
  return baseConocimiento.filter(item =>
    item.key.includes(ql) ||
    item.titulo.toLowerCase().includes(ql) ||
    item.resumen.toLowerCase().includes(ql) ||
    item.detalle.toLowerCase().includes(ql)
  );
}

const input = document.getElementById('query');
const results = document.getElementById('results');

function renderResultados(found) {
  results.innerHTML = '';
  if (found.length === 0) {
    results.innerHTML = '<p>No se encontraron resultados. Probá con otra palabra clave o consultá el reglamento completo.</p>';
    return;
  }
  found.forEach(item => {
    const card = document.createElement('div');
    card.className = 'result-card';
    card.innerHTML = `
      <h3>${item.titulo}</h3>
      <p>${item.resumen}</p>
      <details>
        <summary>Ver extracto y fuente</summary>
        <div style="margin-top:8px">
          <p>${item.detalle}</p>
          <p style="font-size:13px; color:#4b5563;">Fuente: <a href="${item.url}" target="_blank" rel="noopener">${item.url}</a></p>
        </div>
      </details>
    `;
    results.appendChild(card);
  });
}

input.addEventListener('input', (e) => {
  const q = e.target.value;
  if (q.length < 2) { results.innerHTML = ''; return; }
  const found = buscarReglamento(q);
  renderResultados(found);
});

// chips
document.querySelectorAll('.chip').forEach(btn => {
  btn.addEventListener('click', () => {
    input.value = btn.dataset.q;
    input.dispatchEvent(new Event('input'));
  });
});
