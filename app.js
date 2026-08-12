import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendEmailVerification, 
  onAuthStateChanged, 
  signOut 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// FIREBASE CONFIG (teste-7bf43)
const firebaseConfig = {
  apiKey: "AIzaSyCGxsOtrqrASUIS8s6nemWkrybhwfGa5KI",
  authDomain: "teste-7bf43.firebaseapp.com",
  projectId: "teste-7bf43",
  storageBucket: "teste-7bf43.firebasestorage.app",
  messagingSenderId: "957351069657",
  appId: "1:957351069657:web:64de183693eefbf3a4bbc8",
  measurementId: "G-NZFN98EEB6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let currentUser = null;
let userData = { username: "", gender: "Irmão", themeIndex: 0 };
let isSignUpMode = false;

const colorThemes = [
  { name: "Azul Marinho Clássico", bg: "#EEEBDA", navy: "#282B4A", dark: "#121426", emoji: "🌊" },
  { name: "Verde Botânico", bg: "#E8F0E6", navy: "#2D5A27", dark: "#132810", emoji: "🌿" },
  { name: "Roxo Real", bg: "#F0E6F5", navy: "#4A285A", dark: "#1F0E28", emoji: "👑" },
  { name: "Terracota Quente", bg: "#F7EBE6", navy: "#6B321D", dark: "#301308", emoji: "🏺" },
  { name: "Cinza Urbano", bg: "#EAEAEA", navy: "#333A42", dark: "#1A1D21", emoji: "🏢" },
  { name: "Vinho Elegante", bg: "#F5E6E8", navy: "#5A1E28", dark: "#280A0F", emoji: "🍷" },
  { name: "Azul Petróleo", bg: "#E3F2F5", navy: "#1D5363", dark: "#0A252E", emoji: "🛢️" },
  { name: "Ouro Rosa", bg: "#FBECEF", navy: "#6E3B47", dark: "#36181F", emoji: "✨" },
  { name: "Verde Oliva", bg: "#EFEFE0", navy: "#4A4E28", dark: "#21230F", emoji: "🫒" },
  { name: "Cobre Profundo", bg: "#F7ECE1", navy: "#683D1B", dark: "#2E1908", emoji: "🍂" },
  { name: "Azul Noturno", bg: "#E1E8F0", navy: "#1B3B6F", dark: "#0A1931", emoji: "🌙" },
  { name: "Sálvia Suave", bg: "#E4ECE7", navy: "#365345", dark: "#16251E", emoji: "🍃" },
  { name: "Ametista", bg: "#EFEAF8", navy: "#3B2863", dark: "#170D2C", emoji: "💎" },
  { name: "Areia Dourada", bg: "#F5EFE0", navy: "#5A4828", dark: "#281F0E", emoji: "🏜️" },
  { name: "Cereja Escuro", bg: "#F7E6EB", navy: "#6B1D33", dark: "#300813", emoji: "🍒" },
  { name: "Menta Fresco", bg: "#E2F3EE", navy: "#1F5243", dark: "#0B261E", emoji: "🌱" },
  { name: "Chocolate", bg: "#F2EBE5", navy: "#4A3222", dark: "#21140A", emoji: "🍫" },
  { name: "Azul Celeste", bg: "#E5F0F8", navy: "#244B6E", dark: "#0C2033", emoji: "☁️" },
  { name: "Grafite Escuro", bg: "#E0E0E0", navy: "#22252A", dark: "#0E0F12", emoji: "⚙️" },
  { name: "Açafrão Pôr do Sol", bg: "#FAF0E6", navy: "#6B431D", dark: "#301A08", emoji: "🌅" }
];

const planData = [
  {
    id: "ago-2026", label: "Agosto 2026", title: "AGOSTO 2026", target: "50h",
    rule: "Observação: o plano de agosto foi mantido como combinado. Se você adiantar horas em outros dias, pode reduzir a carga do dia 31.",
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

function parseHours(str) {
  if(!str) return 0;
  let h = 0, m = 0;
  str = String(str).toLowerCase().trim();
  if (str.includes('h')) {
    const parts = str.split('h');
    h = parseInt(parts[0]) || 0;
    if (parts[1]) m = parseInt(parts[1]) || 0;
  } else {
    h = parseFloat(str) || 0;
  }
  return h + (m / 60);
}

function validarSenhaForte(senha) {
  if (senha.length < 8) return "A senha deve ter pelo menos 8 caracteres.";
  if (!/[A-Z]/.test(senha)) return "A senha deve ter pelo menos uma letra maiúscula.";
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(senha)) return "A senha deve conter pelo menos um caractere especial (!@#$%...).";
  return null;
}

const authThemeSelect = document.getElementById('authThemeSelect');
if (authThemeSelect) {
  colorThemes.forEach((theme, idx) => {
    const option = document.createElement('option');
    option.value = idx;
    option.textContent = `${theme.emoji} ${theme.name}`;
    authThemeSelect.appendChild(option);
  });
}

document.getElementById('authToggleLink').onclick = function() {
  isSignUpMode = !isSignUpMode;
  document.getElementById('authTitle').textContent = isSignUpMode ? "Criar Nova Conta" : "Entrar no Sistema";
  document.getElementById('authSubmitBtn').textContent = isSignUpMode ? "Cadastrar" : "Entrar";
  document.getElementById('authToggleLink').textContent = isSignUpMode ? "Já tem conta? Faça login aqui" : "Não tem conta? Cadastre-se aqui";
  document.getElementById('signUpFields').style.display = isSignUpMode ? 'block' : 'none';
  document.getElementById('passwordHint').style.display = isSignUpMode ? 'block' : 'none';
};

document.getElementById('authSubmitBtn').onclick = async function() {
  const email = document.getElementById('authEmail').value;
  const password = document.getElementById('authPassword').value;
  const selectedThemeIndex = parseInt(document.getElementById('authThemeSelect').value) || 0;

  if (!email || !password) {
    alert("Preencha todos os campos obrigatórios!");
    return;
  }

  if (isSignUpMode) {
    const username = document.getElementById('authUsername').value;
    const gender = document.getElementById('authGender').value;

    if (!username) {
      alert("Por favor, digite seu nome de usuário!");
      return;
    }

    const erroSenha = validarSenhaForte(password);
    if (erroSenha) {
      alert(erroSenha);
      return;
    }

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", userCred.user.uid), {
        username: username,
        gender: gender,
        themeIndex: selectedThemeIndex
      });

      await sendEmailVerification(userCred.user);
      alert("Conta criada com sucesso! Enviamos um e-mail de confirmação. Verifique sua caixa de entrada.");
      document.getElementById('authToggleLink').click();
    } catch (err) {
      alert("Erro ao cadastrar: " + err.message);
    }
  } else {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", userCred.user.uid), {
        themeIndex: selectedThemeIndex
      }, { merge: true });

      setTheme(selectedThemeIndex);
    } catch (err) {
      alert("Erro ao entrar: " + err.message);
    }
  }
};

document.getElementById('logoutBtn').onclick = function() {
  signOut(auth).then(() => window.location.reload());
};

onAuthStateChanged(auth, async (user) => {
  if (user) {
    currentUser = user;
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      userData = userDoc.data();
    }

    document.getElementById('authOverlay').style.display = 'none';
    document.getElementById('appContainer').classList.add('active');
    
    const tratamento = userData.gender || "Irmão(ã)";
    const nome = userData.username || "Usuário";
    
    const badge = document.getElementById('userGreetingBadge');
    if (badge) badge.textContent = `👋 ${tratamento} ${nome}`;
    
    const subtitle = document.getElementById('headerSubtitle');
    if (subtitle) subtitle.textContent = `Acompanhamento do(a) ${tratamento} ${nome}`;

    if (userData.themeIndex !== undefined) {
      setTheme(userData.themeIndex);
    }

    initApp();
  } else {
    document.getElementById('authOverlay').style.display = 'flex';
    document.getElementById('appContainer').classList.remove('active');
  }
});

// Busca do Texto Diário Automático via Feed do Dia
async function fetchDailyText() {
  const quoteTitle = document.getElementById('quoteTitle');
  const quoteText = document.getElementById('dailyQuote');
  const quoteComment = document.getElementById('dailyComment');
  const toggleBtn = document.getElementById('toggleCommentBtn');

  const rssJW = encodeURIComponent('https://www.jw.org/pt/noticias/jw/rss/DailyText/feed.xml');
  const urlAPI = `https://api.factmaven.com/xml-to-json/?xml=${rssJW}`;

  try {
    const response = await fetch(urlAPI);
    const data = await response.json();

    if (data && data.rss && data.rss.channel && data.rss.channel.item) {
      const item = Array.isArray(data.rss.channel.item) ? data.rss.channel.item[0] : data.rss.channel.item;

      quoteTitle.textContent = `TEXTO DIÁRIO — ${item.title.toUpperCase()}`;
      
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
    console.log("Erro na API, ativando fallback...");
  }

  quoteTitle.textContent = "TEXTO DIÁRIO DO DIA";
  quoteText.innerHTML = "Por intermédio dele temos o livramento por resgate, por meio do sangue dele, sim, o perdão das nossas falhas... — <i>Efé. 1:7.</i>";
  quoteComment.innerHTML = "Jesus, por ser perfeito, era como Adão antes de pecar... — Heb. 9:14. w25.02 5 §§ 12-13";
  toggleBtn.style.display = 'inline-block';
}

document.getElementById('toggleCommentBtn').onclick = function() {
  const comment = document.getElementById('dailyComment');
  const btn = document.getElementById('toggleCommentBtn');
  if (comment.style.display === 'block') {
    comment.style.display = 'none';
    btn.textContent = 'Ler Comentário';
  } else {
    comment.style.display = 'block';
    btn.textContent = 'Ocultar Comentário';
  }
};

function setTheme(index) {
  const theme = colorThemes[index];
  if (!theme) return;

  document.documentElement.style.setProperty('--bg-cream', theme.bg);
  document.documentElement.style.setProperty('--navy-base', theme.navy);
  document.documentElement.style.setProperty('--navy-dark', theme.dark);
  document.documentElement.style.setProperty('--navy-card', hexToRgba(theme.navy, 0.92));
  document.documentElement.style.setProperty('--border-color', hexToRgba(theme.bg, 0.25));

  document.querySelectorAll('.color-card-item').forEach((item, i) => {
    item.classList.toggle('selected', i === index);
  });
}

function hexToRgba(hex, alpha) {
  hex = hex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function initApp() {
  const monthsMenu = document.getElementById('monthsMenu');
  const colorGrid = document.getElementById('colorGrid');
  const monthsContainer = document.getElementById('monthsContainer');

  if (!monthsMenu || !colorGrid || !monthsContainer) return;

  colorGrid.innerHTML = '';
  colorThemes.forEach((theme, idx) => {
    const item = document.createElement('div');
    item.className = `color-card-item ${idx === 0 ? 'selected' : ''}`;
    item.innerHTML = `
      <div class="color-swatch-circle" style="background: ${theme.navy};"></div>
      <span>${theme.emoji} ${theme.name}</span>
    `;

    item.onclick = async () => {
      setTheme(idx);
      if (currentUser) {
        await setDoc(doc(db, "users", currentUser.uid), { themeIndex: idx }, { merge: true });
      }
    };
    colorGrid.appendChild(item);
  });

  monthsMenu.innerHTML = '';
  monthsContainer.innerHTML = '';
  planData.forEach((month, index) => {
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
      const checkKey = `${currentUser.uid}-${month.id}-${idx}-check`;
      const metaKey = `${currentUser.uid}-${month.id}-${idx}-meta`;

      const isChecked = localStorage.getItem(checkKey) === 'true';
      const savedMeta = localStorage.getItem(metaKey) || d.meta;

      rowsHtml += `
        <tr>
          <td>${d.date}</td>
          <td>${d.day}</td>
          <td>
            <input type="text" class="meta-input" value="${savedMeta}" data-key="${metaKey}" data-month="${month.id}" data-title="${month.title}">
          </td>
          <td style="text-align: center;">
            <input type="checkbox" class="checkbox-custom" data-month="${month.id}" data-title="${month.title}" data-key="${checkKey}" ${isChecked ? 'checked' : ''}>
          </td>
        </tr>
      `;
    });

    monthDiv.innerHTML = `
      <div class="month-header"><div class="month-title"><h2>${month.title}</h2></div></div>
      <div class="progress-box">
        <div class="progress-info">
          <span>Progresso da Meta (${month.target})</span>
          <span id="prog-text-${month.id}">0h / ${month.target}</span>
        </div>
        <div class="progress-bar-bg"><div class="progress-bar-fill" id="prog-bar-${month.id}"></div></div>
      </div>
      <div class="table-container">
        <table>
          <thead><tr><th>Data</th><th>Dia</th><th>Meta / Feito</th><th style="text-align: center;">Feito ✓</th></tr></thead>
          <tbody>${rowsHtml}</tbody>
        </table>
      </div>
      <p class="rule-note">${month.rule}</p>
      <div class="report-box" id="report-box-${month.id}">
        <div class="report-title">Relatório do Mês</div>
        <div class="report-text" id="report-text-${month.id}"></div>
        <button class="btn" id="copy-btn-${month.id}">Copiar Mensagem</button>
      </div>
    `;

    monthsContainer.appendChild(monthDiv);
  });

  // Associa ouvintes de atualização de progresso
  planData.forEach(m => {
    updateProgress(m.id, m.title);

    const container = document.getElementById(m.id);
    if (container) {
      container.querySelectorAll('.checkbox-custom').forEach(cb => {
        cb.onchange = () => updateProgress(m.id, m.title);
      });

      container.querySelectorAll('.meta-input').forEach(inp => {
        inp.oninput = (e) => {
          localStorage.setItem(e.target.dataset.key, e.target.value);
          updateProgress(m.id, m.title);
        };
      });

      const copyBtn = document.getElementById(`copy-btn-${m.id}`);
      if (copyBtn) {
        copyBtn.onclick = () => copyReport(m.id);
      }
    }
  });

  fetchDailyText();
}

function toggleMenu() {
  const sidebar = document.getElementById('sidebarMenu');
  const overlay = document.getElementById('menuOverlay');
  if (sidebar) sidebar.classList.toggle('active');
  if (overlay) overlay.classList.toggle('active');
}

document.getElementById('menuToggle').onclick = toggleMenu;
document.getElementById('menuOverlay').onclick = toggleMenu;

function switchTab(monthId) {
  document.querySelectorAll('.menu-btn').forEach((btn, idx) => {
    btn.classList.toggle('active', planData[idx].id === monthId);
  });
  document.querySelectorAll('.month-content').forEach(content => {
    content.classList.toggle('active', content.id === monthId);
  });
}

function updateProgress(monthId, monthTitle) {
  const monthDiv = document.getElementById(monthId);
  if (!monthDiv) return;

  const checkboxes = monthDiv.querySelectorAll('.checkbox-custom');
  const metaInputs = monthDiv.querySelectorAll('.meta-input');
  
  let totalDone = 0;

  checkboxes.forEach((cb, idx) => {
    localStorage.setItem(cb.dataset.key, cb.checked);
    if (cb.checked) {
      const valorHora = metaInputs[idx] ? metaInputs[idx].value : "0";
      totalDone += parseHours(valorHora);
    }
  });

  const hours = Math.floor(totalDone);
  const minutes = Math.round((totalDone - hours) * 60);
  const doneFormatted = minutes > 0 ? `${hours}h${minutes.toString().padStart(2, '0')}` : `${hours}h`;

  const progText = document.getElementById(`prog-text-${monthId}`);
  const progBar = document.getElementById(`prog-bar-${monthId}`);
  if (progText) progText.textContent = `${doneFormatted} / 50h`;
  if (progBar) progBar.style.width = `${Math.min((totalDone / 50) * 100, 100)}%`;

  const reportBox = document.getElementById(`report-box-${monthId}`);
  const reportText = document.getElementById(`report-text-${monthId}`);

  if (reportBox && reportText) {
    if (totalDone > 0) {
      const tratamento = userData.gender || "Irmão(ã)";
      const nome = userData.username ? `, ${tratamento} ${userData.username}` : "";
      
      reportBox.classList.add('active');
      reportText.textContent = `Olá${nome}! Eu participei no campo no mês de ${monthTitle}, fiz ${doneFormatted} de horas de campo cumpridas.`;
    } else {
      reportBox.classList.remove('active');
    }
  }
}

function copyReport(monthId) {
  const reportTextEl = document.getElementById(`report-text-${monthId}`);
  const btn = document.getElementById(`copy-btn-${monthId}`);
  if (!reportTextEl || !btn) return;

  navigator.clipboard.writeText(reportTextEl.textContent).then(() => {
    const originalText = btn.textContent;
    btn.textContent = '✓ Copiado com sucesso!';
    setTimeout(() => btn.textContent = originalText, 2000);
  });
}
