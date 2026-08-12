// Configuração das 20 Paletas de Cores
const colorThemes = [
  { name: "Azul Marinho Clássico", bg: "#EEEBDA", navy: "#282B4A", dark: "#121426" },
  { name: "Verde Botânico", bg: "#E8F0E6", navy: "#2D5A27", dark: "#132810" },
  { name: "Roxo Real", bg: "#F0E6F5", navy: "#4A285A", dark: "#1F0E28" },
  { name: "Terracota Quente", bg: "#F7EBE6", navy: "#6B321D", dark: "#301308" },
  { name: "Cinza Urbano", bg: "#EAEAEA", navy: "#333A42", dark: "#1A1D21" },
  { name: "Vinho Elegante", bg: "#F5E6E8", navy: "#5A1E28", dark: "#280A0F" },
  { name: "Azul Petróleo", bg: "#E3F2F5", navy: "#1D5363", dark: "#0A252E" },
  { name: "Ouro Rosa", bg: "#FBECEF", navy: "#6E3B47", dark: "#36181F" },
  { name: "Verde Oliva", bg: "#EFEFE0", navy: "#4A4E28", dark: "#21230F" },
  { name: "Cobre Profundo", bg: "#F7ECE1", navy: "#683D1B", dark: "#2E1908" },
  { name: "Azul Noturno", bg: "#E1E8F0", navy: "#1B3B6F", dark: "#0A1931" },
  { name: "Sálvia Suave", bg: "#E4ECE7", navy: "#365345", dark: "#16251E" },
  { name: "Ametista", bg: "#EFEAF8", navy: "#3B2863", dark: "#170D2C" },
  { name: "Areia Dourada", bg: "#F5EFE0", navy: "#5A4828", dark: "#281F0E" },
  { name: "Cereja Escuro", bg: "#F7E6EB", navy: "#6B1D33", dark: "#300813" },
  { name: "Menta Fresco", bg: "#E2F3EE", navy: "#1F5243", dark: "#0B261E" },
  { name: "Chocolate", bg: "#F2EBE5", navy: "#4A3222", dark: "#21140A" },
  { name: "Azul Celeste", bg: "#E5F0F8", navy: "#244B6E", dark: "#0C2033" },
  { name: "Grafite Escuro", bg: "#E0E0E0", navy: "#22252A", dark: "#0E0F12" },
  { name: "Açafrão Pôr do Sol", bg: "#FAF0E6", navy: "#6B431D", dark: "#301A08" }
];

const planData = [
  {
    id: "ago-2026", label: "Agosto 2026", title: "AGOSTO 2026", target: "50h",
    rule: "Observação: o plano de agosto foi mantido como combinado.",
    days: [
      { date: "11/08", day: "Terça", meta: "2h" }, { date: "12/08", day: "Quarta", meta: "2h30" },
      { date: "13/08", day: "Quinta", meta: "2h30" }, { date: "14/08", day: "Sexta", meta: "2h30" },
      { date: "15/08", day: "Sábado", meta: "3h" }, { date: "17/08", day: "Segunda", meta: "2h30" },
      { date: "18/08", day: "Terça", meta: "2h" }, { date: "19/08", day: "Quarta", meta: "2h30" },
      { date: "20/08", day: "Quinta", meta: "2h30" }, { date: "21/08", day: "Sexta", meta: "2h30" },
      { date: "22/08", day: "Sábado", meta: "3h" }, { date: "24/08", day: "Segunda", meta: "2h30" },
      { date: "25/08", day: "Terça", meta: "2h" }, { date: "26/08", day: "Quarta", meta: "2h30" },
      { date: "27/08", day: "Quinta", meta: "2h30" }, { date: "28/08", day: "Sexta", meta: "2h30" },
      { date: "29/08", day: "Sábado", meta: "3h" }, { date: "30/08", day: "Domingo", meta: "2h" },
      { date: "31/08", day: "Segunda", meta: "5h30" }
    ]
  },
  {
    id: "set-2026", label: "Setembro 2026", title: "SETEMBRO 2026", target: "50h",
    rule: "Regra usada: terça-feira = 2h após o jovem aprendiz; outros dias úteis = 2h/2h30.",
    days: [
      { date: "01/09", day: "Terça", meta: "2h" }, { date: "02/09", day: "Quarta", meta: "2h30" },
      { date: "03/09", day: "Quinta", meta: "2h30" }, { date: "04/09", day: "Sexta", meta: "2h30" },
      { date: "07/09", day: "Segunda", meta: "2h30" }, { date: "08/09", day: "Terça", meta: "2h" },
      { date: "09/09", day: "Quarta", meta: "2h30" }, { date: "10/09", day: "Quinta", meta: "2h30" },
      { date: "11/09", day: "Sexta", meta: "2h30" }, { date: "14/09", day: "Segunda", meta: "2h30" },
      { date: "15/09", day: "Terça", meta: "2h" }, { date: "16/09", day: "Quarta", meta: "2h30" },
      { date: "17/09", day: "Quinta", meta: "2h30" }, { date: "18/09", day: "Sexta", meta: "2h30" },
      { date: "21/09", day: "Segunda", meta: "2h30" }, { date: "22/09", day: "Terça", meta: "2h" },
      { date: "23/09", day: "Quarta", meta: "2h" }, { date: "24/09", day: "Quinta", meta: "2h" },
      { date: "25/09", day: "Sexta", meta: "2h" }, { date: "28/09", day: "Segunda", meta: "2h" },
      { date: "29/09", day: "Terça", meta: "2h" }, { date: "30/09", day: "Quarta", meta: "2h" }
    ]
  }
];

const photoStore = {};

function parseHours(str) {
  if(!str) return 0;
  let h = 0, m = 0;
  if (str.includes('h')) {
    const parts = str.split('h');
    h = parseInt(parts[0]) || 0;
    if (parts[1]) m = parseInt(parts[1]) || 0;
  }
  return h + (m / 60);
}

// Função de Busca do Texto Diário sem bloqueios CORS
async function fetchDailyText() {
  const quoteTitle = document.getElementById('quoteTitle');
  const quoteText = document.getElementById('dailyQuote');
  const quoteComment = document.getElementById('dailyComment');
  const toggleBtn = document.getElementById('toggleCommentBtn');

  // Proxy ultra rápido e estável para converter o RSS do JW em JSON
  const rssJW = encodeURIComponent('https://www.jw.org/pt/noticias/jw/rss/DailyText/feed.xml');
  const urlAPI = `https://api.factmaven.com/xml-to-json/?xml=${rssJW}`;

  try {
    const response = await fetch(urlAPI);
    const data = await response.json();

    if (data && data.rss && data.rss.channel && data.rss.channel.item) {
      const item = Array.isArray(data.rss.channel.item) ? data.rss.channel.item[0] : data.rss.channel.item;

      quoteTitle.textContent = `TEXTO DIÁRIO — ${item.title.toUpperCase()}`;
      
      // Cria elemento temporário para filtrar o texto e o comentário do RSS
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = item.description;

      const pTags = tempDiv.querySelectorAll('p');
      if (pTags.length > 0) {
        quoteText.innerHTML = pTags[0].innerHTML;
        
        if (pTags.length > 1) {
          let comentario = '';
          for (let i = 1; i < pTags.length; i++) {
            comentario += `<p style="margin-bottom:0.5rem">${pTags[i].innerHTML}</p>`;
          }
          quoteComment.innerHTML = comentario;
          toggleBtn.style.display = 'inline-block';
        }
      } else {
        quoteText.innerHTML = item.description;
      }
      return;
    }
  } catch (err) {
    console.log("Serviço principal indisponível, ativando texto inspirador de contingência...");
  }

  // Backup automático para o site nunca ficar sem texto caso o proxy caia
  const textosBackup = [
    "Domingo: 'Confie em Jeová de todo o seu coração e não se apoie no seu próprio entendimento.' — Prov. 3:5",
    "Segunda-feira: 'Seja forte e corajoso... Jeová, seu Deus, está com você onde quer que você vá.' — Josué 1:9",
    "Terça-feira: Cada pequeno esforço no campo demonstra seu amor por Deus e pelas pessoas.",
    "Quarta-feira: 'Quão belos são os pés daqueles que declaram boas novas de coisas boas!' — Rom. 10:15",
    "Quinta-feira: Perseverar na obra do Reino traz alegria verdadeira e frutuosa.",
    "Sexta-feira: Termine a semana com a satisfação do dever cumprido para com Jeová.",
    "Sábado: O trabalho feito de coração para Jeová nunca é em vão."
  ];

  const diaSemana = new Date().getDay();
  quoteTitle.textContent = "TEXTO DO DIA (INSPIRAÇÃO)";
  quoteText.textContent = textosBackup[diaSemana];
}

function toggleComment() {
  const comment = document.getElementById('dailyComment');
  const btn = document.getElementById('toggleCommentBtn');
  if (comment.style.display === 'block') {
    comment.style.display = 'none';
    btn.textContent = 'Ler Comentário';
  } else {
    comment.style.display = 'block';
    btn.textContent = 'Ocultar Comentário';
  }
}

function initApp() {
  const monthsMenu = document.getElementById('monthsMenu');
  const colorGrid = document.getElementById('colorGrid');
  const monthsContainer = document.getElementById('monthsContainer');

  colorThemes.forEach((theme, idx) => {
    const dot = document.createElement('div');
    dot.className = `color-dot ${idx === 0 ? 'selected' : ''}`;
    dot.style.background = `linear-gradient(135deg, ${theme.navy} 50%, ${theme.bg} 50%)`;
    dot.title = theme.name;
    dot.onclick = () => setTheme(idx);
    colorGrid.appendChild(dot);
  });

  const savedTheme = localStorage.getItem('selectedTheme');
  if (savedTheme !== null) {
    setTheme(parseInt(savedTheme), false);
  }

  planData.forEach((month, index) => {
    photoStore[month.id] = [];

    const btn = document.createElement('button');
    btn.className = `menu-btn ${index === 0 ? 'active' : ''}`;
    btn.textContent = month.label;
    btn.onclick = () => {
      switchTab(month.id);
      toggleMenu();
    };
    monthsMenu.appendChild(btn);

    const monthDiv = document.createElement('div');
    monthDiv.className = `month-content ${index === 0 ? 'active' : ''}`;
    monthDiv.id = month.id;

    let rowsHtml = '';
    month.days.forEach((d, idx) => {
      const storageKey = `${month.id}-${idx}`;
      const isChecked = localStorage.getItem(storageKey) === 'true';

      rowsHtml += `
        <tr>
          <td>${d.date}</td>
          <td>${d.day}</td>
          <td>${d.meta}</td>
          <td style="text-align: center;">
            <input type="checkbox" 
                   class="checkbox-custom" 
                   data-month="${month.id}"
                   data-meta="${d.meta}"
                   data-key="${storageKey}"
                   ${isChecked ? 'checked' : ''} 
                   onchange="updateProgress('${month.id}', '${month.title}')">
          </td>
        </tr>
      `;
    });

    monthDiv.innerHTML = `
      <div class="month-header">
        <div class="month-title">
          <h2>${month.title}</h2>
        </div>
      </div>

      <div class="progress-box">
        <div class="progress-info">
          <span>Progresso da Meta (${month.target})</span>
          <span id="prog-text-${month.id}">0h / ${month.target}</span>
        </div>
        <div class="progress-bar-bg">
          <div class="progress-bar-fill" id="prog-bar-${month.id}"></div>
        </div>
      </div>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Dia</th>
              <th>Meta</th>
              <th style="text-align: center;">Feito ✓</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </div>

      <p class="rule-note">${month.rule}</p>
      
      <div class="report-box" id="report-box-${month.id}">
        <div class="report-title">Relatório do Mês</div>
        <div class="report-text" id="report-text-${month.id}"></div>
        <button class="btn" id="copy-btn-${month.id}" onclick="copyReport('${month.id}')">
          Copiar Mensagem
        </button>
      </div>

      <div class="photo-section">
        <div class="photo-title">
          <span>Fotos do Mês</span>
          <label class="photo-upload-btn">
            + Adicionar Foto
            <input type="file" accept="image/*" style="display:none;" onchange="uploadPhoto(event, '${month.id}')">
          </label>
        </div>
        <div class="photo-grid" id="photo-grid-${month.id}"></div>
      </div>
    `;

    monthsContainer.appendChild(monthDiv);
  });

  planData.forEach(m => {
    updateProgress(m.id, m.title);
    renderPhotos(m.id);
  });

  fetchDailyText();
}

function setTheme(index, save = true) {
  const theme = colorThemes[index];
  if (!theme) return;

  document.documentElement.style.setProperty('--bg-cream', theme.bg);
  document.documentElement.style.setProperty('--navy-base', theme.navy);
  document.documentElement.style.setProperty('--navy-dark', theme.dark);
  document.documentElement.style.setProperty('--navy-card', hexToRgba(theme.navy, 0.92));
  document.documentElement.style.setProperty('--border-color', hexToRgba(theme.bg, 0.25));

  document.querySelectorAll('.color-dot').forEach((dot, i) => {
    dot.classList.toggle('selected', i === index);
  });

  if (save) {
    localStorage.setItem('selectedTheme', index);
  }
}

function hexToRgba(hex, alpha) {
  hex = hex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const menuToggle = document.getElementById('menuToggle');
const menuOverlay = document.getElementById('menuOverlay');

function toggleMenu() {
  document.getElementById('sidebarMenu').classList.toggle('active');
  menuOverlay.classList.toggle('active');
}

if(menuToggle) menuToggle.onclick = toggleMenu;
if(menuOverlay) menuOverlay.onclick = toggleMenu;

function switchTab(monthId) {
  document.querySelectorAll('.menu-btn').forEach((btn, idx) => {
    btn.classList.toggle('active', planData[idx].id === monthId);
  });
  document.querySelectorAll('.month-content').forEach(content => {
    content.classList.toggle('active', content.id === monthId);
  });
}

function updateProgress(monthId, monthTitle) {
  const checkboxes = document.querySelectorAll(`input[data-month="${monthId}"]`);
  let totalDone = 0;

  checkboxes.forEach(cb => {
    localStorage.setItem(cb.dataset.key, cb.checked);
    if (cb.checked) {
      totalDone += parseHours(cb.dataset.meta);
    }
  });

  const hours = Math.floor(totalDone);
  const minutes = Math.round((totalDone - hours) * 60);
  const doneFormatted = minutes > 0 ? `${hours}h${minutes.toString().padStart(2, '0')}` : `${hours}h`;

  const targetValue = 50;
  const percentage = Math.min((totalDone / targetValue) * 100, 100);

  document.getElementById(`prog-text-${monthId}`).textContent = `${doneFormatted} / 50h`;
  document.getElementById(`prog-bar-${monthId}`).style.width = `${percentage}%`;

  const reportBox = document.getElementById(`report-box-${monthId}`);
  const reportText = document.getElementById(`report-text-${monthId}`);

  if (totalDone > 0) {
    reportBox.classList.add('active');
    reportText.textContent = `Olá! Eu participei no campo no mês de ${monthTitle}, fiz ${doneFormatted} de horas de campo cumpridas.`;
  } else {
    reportBox.classList.remove('active');
  }
}

function copyReport(monthId) {
  const text = document.getElementById(`report-text-${monthId}`).textContent;
  const btn = document.getElementById(`copy-btn-${monthId}`);

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showCopyFeedback(btn);
    }).catch(() => {
      fallbackCopy(text, btn);
    });
  } else {
    fallbackCopy(text, btn);
  }
}

function fallbackCopy(text, btn) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  try {
    document.execCommand('copy');
    showCopyFeedback(btn);
  } catch (err) {
    alert('Erro ao copiar a mensagem.');
  }
  document.body.removeChild(textarea);
}

function showCopyFeedback(btn) {
  const originalText = btn.textContent;
  btn.textContent = '✓ Copiado com sucesso!';
  btn.style.fontWeight = 'bold';
  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.fontWeight = 'normal';
  }, 2000);
}

function uploadPhoto(event, monthId) {
  const file = event.target.files[0];
  if (!file) return;

  const url = URL.createObjectURL(file);
  photoStore[monthId].push(url);
  renderPhotos(monthId);
}

function renderPhotos(monthId) {
  const grid = document.getElementById(`photo-grid-${monthId}`);
  if (!grid) return;
  const photos = photoStore[monthId] || [];

  grid.innerHTML = photos.map((src, index) => `
    <div class="photo-card">
      <img src="${src}" onclick="openPhoto('${src}')" alt="Foto do Campo">
      <button class="photo-delete" onclick="deletePhoto('${monthId}', ${index})">✕</button>
    </div>
  `).join('');
}

function deletePhoto(monthId, index) {
  photoStore[monthId].splice(index, 1);
  renderPhotos(monthId);
}

function openPhoto(src) {
  const w = window.open("");
  w.document.write(`<body style="margin:0; background:var(--navy-dark); display:flex; align-items:center; justify-content:center; min-height:100vh;"><img src="${src}" style="max-width:100%; max-height:100vh; object-fit:contain;"></body>`);
}

window.onload = initApp;
