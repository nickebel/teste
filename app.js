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

// CHAVES DO SEU PROJETO FIREBASE (teste-7bf43)
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

// 20 Temas de Cores com Emojis
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

// Dados dos Meses
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
  },
  {
    id: "out-2026", label: "Outubro 2026", title: "OUTUBRO 2026", target: "50h",
    rule: "Regra usada: terça-feira = 2h após o jovem aprendiz; outros dias úteis = 2h/2h30.",
    days: [
      { date: "01/10", day: "Quinta", meta: "2h30" }, { date: "02/10", day: "Sexta", meta: "2h30" },
      { date: "05/10", day: "Segunda", meta: "2h30" }, { date: "06/10", day: "Terça", meta: "2h" },
      { date: "07/10", day: "Quarta", meta: "2h30" }, { date: "08/10", day: "Quinta", meta: "2h30" },
      { date: "09/10", day: "Sexta", meta: "2h30" }, { date: "12/10", day: "Segunda", meta: "2h30" },
      { date: "13/10", day: "Terça", meta: "2h" }, { date: "14/10", day: "Quarta", meta: "2h30" },
      { date: "15/10", day: "Quinta", meta: "2h30" }, { date: "16/10", day: "Sexta", meta: "2h30" },
      { date: "19/10", day: "Segunda", meta: "2h30" }, { date: "20/10", day: "Terça", meta: "2h" },
      { date: "21/10", day: "Quarta", meta: "2h30" }, { date: "22/10", day: "Quinta", meta: "2h" },
      { date: "23/10", day: "Sexta", meta: "2h" }, { date: "26/10", day: "Segunda", meta: "2h" },
      { date: "27/10", day: "Terça", meta: "2h" }, { date: "28/10", day: "Quarta", meta: "2h" },
      { date: "29/10", day: "Quinta", meta: "2h" }, { date: "30/10", day: "Sexta", meta: "2h" }
    ]
  },
  {
    id: "nov-2026", label: "Novembro 2026", title: "NOVEMBRO 2026", target: "50h",
    rule: "Regra usada: terça-feira = 2h após o jovem aprendiz; outros dias úteis = 2h/2h30.",
    days: [
      { date: "02/11", day: "Segunda", meta: "2h30" }, { date: "03/11", day: "Terça", meta: "2h" },
      { date: "04/11", day: "Quarta", meta: "2h30" }, { date: "05/11", day: "Quinta", meta: "2h30" },
      { date: "06/11", day: "Sexta", meta: "2h30" }, { date: "09/11", day: "Segunda", meta: "2h30" },
      { date: "10/11", day: "Terça", meta: "2h" }, { date: "11/11", day: "Quarta", meta: "2h30" },
      { date: "12/11", day: "Quinta", meta: "2h30" }, { date: "13/11", day: "Sexta", meta: "2h30" },
      { date: "16/11", day: "Segunda", meta: "2h30" }, { date: "17/11", day: "Terça", meta: "2h" },
      { date: "18/11", day: "Quarta", meta: "2h30" }, { date: "19/11", day: "Quinta", meta: "2h30" },
      { date: "20/11", day: "Sexta", meta: "2h30" }, { date: "23/11", day: "Segunda", meta: "2h30" },
      { date: "24/11", day: "Terça", meta: "2h" }, { date: "25/11", day: "Quarta", meta: "2h30" },
      { date: "26/11", day: "Quinta", meta: "2h30" }, { date: "27/11", day: "Sexta", meta: "2h30" },
      { date: "30/11", day: "Segunda", meta: "2h" }
    ]
  },
  {
    id: "dez-2026", label: "Dezembro 2026", title: "DEZEMBRO 2026", target: "50h",
    rule: "Regra usada: terça-feira = 2h após o jovem aprendiz; outros dias úteis = 2h/2h30.",
    days: [
      { date: "01/12", day: "Terça", meta: "2h" }, { date: "02/12", day: "Quarta", meta: "2h30" },
      { date: "03/12", day: "Quinta", meta: "2h30" }, { date: "04/12", day: "Sexta", meta: "2h30" },
      { date: "07/12", day: "Segunda", meta: "2h30" }, { date: "08/12", day: "Terça", meta: "2h" },
      { date: "09/12", day: "Quarta", meta: "2h30" }, { date: "10/12", day: "Quinta", meta: "2h30" },
      { date: "11/12", day: "Sexta", meta: "2h30" }, { date: "14/12", day: "Segunda", meta: "2h30" },
      { date: "15/12", day: "Terça", meta: "2h" }, { date: "16/12", day: "Quarta", meta: "2h" },
      { date: "17/12", day: "Quinta", meta: "2h" }, { date: "18/12", day: "Sexta", meta: "2h" },
      { date: "21/12", day: "Segunda", meta: "2h" }, { date: "22/12", day: "Terça", meta: "2h" },
      { date: "23/12", day: "Quarta", meta: "2h" }, { date: "24/12", day: "Quinta", meta: "2h" },
      { date: "25/12", day: "Sexta", meta: "2h" }, { date: "28/12", day: "Segunda", meta: "2h" },
      { date: "29/12", day: "Terça", meta: "2h" }, { date: "30/12", day: "Quarta", meta: "2h" },
      { date: "31/12", day: "Quinta", meta: "2h" }
    ]
  },
  {
    id: "jan-2027", label: "Janeiro 2027", title: "JANEIRO 2027", target: "50h",
    rule: "Regra usada: terça-feira = 2h após o jovem aprendiz; outros dias úteis = 2h/2h30.",
    days: [
      { date: "01/01", day: "Sexta", meta: "2h30" }, { date: "04/01", day: "Segunda", meta: "2h30" },
      { date: "05/01", day: "Terça", meta: "2h" }, { date: "06/01", day: "Quarta", meta: "2h30" },
      { date: "07/01", day: "Quinta", meta: "2h30" }, { date: "08/01", day: "Sexta", meta: "2h30" },
      { date: "11/01", day: "Segunda", meta: "2h30" }, { date: "12/01", day: "Terça", meta: "2h" },
      { date: "13/01", day: "Quarta", meta: "2h30" }, { date: "14/01", day: "Quinta", meta: "2h30" },
      { date: "15/01", day: "Sexta", meta: "2h30" }, { date: "18/01", day: "Segunda", meta: "2h30" },
      { date: "19/01", day: "Terça", meta: "2h" }, { date: "20/01", day: "Quarta", meta: "2h30" },
      { date: "21/01", day: "Quinta", meta: "2h30" }, { date: "22/01", day: "Sexta", meta: "2h30" },
      { date: "25/01", day: "Segunda", meta: "2h30" }, { date: "26/01", day: "Terça", meta: "2h" },
      { date: "27/01", day: "Quarta", meta: "2h30" }, { date: "28/01", day: "Quinta", meta: "2h30" },
      { date: "29/01", day: "Sexta", meta: "2h" }
    ]
  },
  {
    id: "fev-2027", label: "Fevereiro 2027", title: "FEVEREIRO 2027", target: "50h",
    rule: "Regra usada: terça-feira = 2h após o jovem aprendiz; outros dias úteis = 2h/2h30.",
    days: [
      { date: "01/02", day: "Segunda", meta: "2h30" }, { date: "02/02", day: "Terça", meta: "2h" },
      { date: "03/02", day: "Quarta", meta: "2h30" }, { date: "04/02", day: "Quinta", meta: "2h30" },
      { date: "05/02", day: "Sexta", meta: "2h30" }, { date: "06/02", day: "Sábado", meta: "2h" },
      { date: "08/02", day: "Segunda", meta: "2h30" }, { date: "09/02", day: "Terça", meta: "2h" },
      { date: "10/02", day: "Quarta", meta: "2h30" }, { date: "11/02", day: "Quinta", meta: "2h30" },
      { date: "12/02", day: "Sexta", meta: "2h30" }, { date: "15/02", day: "Segunda", meta: "2h30" },
      { date: "16/02", day: "Terça", meta: "2h" }, { date: "17/02", day: "Quarta", meta: "2h30" },
      { date: "18/02", day: "Quinta", meta: "2h30" }, { date: "19/02", day: "Sexta", meta: "2h30" },
      { date: "22/02", day: "Segunda", meta: "2h30" }, { date: "23/02", day: "Terça", meta: "2h" },
      { date: "24/02", day: "Quarta", meta: "2h30" }, { date: "25/02", day: "Quinta", meta: "2h30" },
      { date: "26/02", day: "Sexta", meta: "2h30" }
    ]
  },
  {
    id: "mar-2027", label: "Março 2027", title: "MARÇO 2027", target: "50h",
    rule: "Regra usada: terça-feira = 2h após o jovem aprendiz; outros dias úteis = 2h/2h30.",
    days: [
      { date: "01/03", day: "Segunda", meta: "2h30" }, { date: "02/03", day: "Terça", meta: "2h" },
      { date: "03/03", day: "Quarta", meta: "2h30" }, { date: "04/03", day: "Quinta", meta: "2h30" },
      { date: "05/03", day: "Sexta", meta: "2h30" }, { date: "08/03", day: "Segunda", meta: "2h30" },
      { date: "09/03", day: "Terça", meta: "2h" }, { date: "10/03", day: "Quarta", meta: "2h30" },
      { date: "11/03", day: "Quinta", meta: "2h30" }, { date: "12/03", day: "Sexta", meta: "2h30" },
      { date: "15/03", day: "Segunda", meta: "2h" }, { date: "16/03", day: "Terça", meta: "2h" },
      { date: "17/03", day: "Quarta", meta: "2h" }, { date: "18/03", day: "Quinta", meta: "2h" },
      { date: "19/03", day: "Sexta", meta: "2h" }, { date: "22/03", day: "Segunda", meta: "2h" },
      { date: "23/03", day: "Terça", meta: "2h" }, { date: "24/03", day: "Quarta", meta: "2h" },
      { date: "25/03", day: "Quinta", meta: "2h" }, { date: "26/03", day: "Sexta", meta: "2h" },
      { date: "29/03", day: "Segunda", meta: "2h" }, { date: "30/03", day: "Terça", meta: "2h" },
      { date: "31/03", day: "Quarta", meta: "2h" }
    ]
  },
  {
    id: "abr-2027", label: "Abril 2027", title: "ABRIL 2027", target: "50h",
    rule: "Regra usada: terça-feira = 2h após o jovem aprendiz; outros dias úteis = 2h/2h30.",
    days: [
      { date: "01/04", day: "Quinta", meta: "2h30" }, { date: "02/04", day: "Sexta", meta: "2h30" },
      { date: "05/04", day: "Segunda", meta: "2h30" }, { date: "06/04", day: "Terça", meta: "2h" },
      { date: "07/04", day: "Quarta", meta: "2h30" }, { date: "08/04", day: "Quinta", meta: "2h30" },
      { date: "09/04", day: "Sexta", meta: "2h30" }, { date: "12/04", day: "Segunda", meta: "2h30" },
      { date: "13/04", day: "Terça", meta: "2h" }, { date: "14/04", day: "Quarta", meta: "2h30" },
      { date: "15/04", day: "Quinta", meta: "2h30" }, { date: "16/04", day: "Sexta", meta: "2h30" },
      { date: "19/04", day: "Segunda", meta: "2h30" }, { date: "20/04", day: "Terça", meta: "2h" },
      { date: "21/04", day: "Quarta", meta: "2h30" }, { date: "22/04", day: "Quinta", meta: "2h" },
      { date: "23/04", day: "Sexta", meta: "2h" }, { date: "26/04", day: "Segunda", meta: "2h" },
      { date: "27/04", day: "Terça", meta: "2h" }, { date: "28/04", day: "Quarta", meta: "2h" },
      { date: "29/04", day: "Quinta", meta: "2h" }, { date: "30/04", day: "Sexta", meta: "2h" }
    ]
  },
  {
    id: "mai-2027", label: "Maio 2027", title: "MAIO 2027", target: "50h",
    rule: "Regra usada: terça-feira = 2h após o jovem aprendiz; outros dias úteis = 2h/2h30.",
    days: [
      { date: "03/05", day: "Segunda", meta: "2h30" }, { date: "04/05", day: "Terça", meta: "2h" },
      { date: "05/05", day: "Quarta", meta: "2h30" }, { date: "06/05", day: "Quinta", meta: "2h30" },
      { date: "07/05", day: "Sexta", meta: "2h30" }, { date: "10/05", day: "Segunda", meta: "2h30" },
      { date: "11/05", day: "Terça", meta: "2h" }, { date: "12/05", day: "Quarta", meta: "2h30" },
      { date: "13/05", day: "Quinta", meta: "2h30" }, { date: "14/05", day: "Sexta", meta: "2h30" },
      { date: "17/05", day: "Segunda", meta: "2h30" }, { date: "18/05", day: "Terça", meta: "2h" },
      { date: "19/05", day: "Quarta", meta: "2h30" }, { date: "20/05", day: "Quinta", meta: "2h30" },
      { date: "21/05", day: "Sexta", meta: "2h30" }, { date: "24/05", day: "Segunda", meta: "2h30" },
      { date: "25/05", day: "Terça", meta: "2h" }, { date: "26/05", day: "Quarta", meta: "2h30" },
      { date: "27/05", day: "Quinta", meta: "2h30" }, { date: "28/05", day: "Sexta", meta: "2h30" },
      { date: "31/05", day: "Segunda", meta: "2h" }
    ]
  },
  {
    id: "jun-2027", label: "Junho 2027", title: "JUNHO 2027", target: "50h",
    rule: "Regra usada: terça-feira = 2h após o jovem aprendiz; outros dias úteis = 2h/2h30.",
    days: [
      { date: "01/06", day: "Terça", meta: "2h" }, { date: "02/06", day: "Quarta", meta: "2h30" },
      { date: "03/06", day: "Quinta", meta: "2h30" }, { date: "04/06", day: "Sexta", meta: "2h30" },
      { date: "07/06", day: "Segunda", meta: "2h30" }, { date: "08/06", day: "Terça", meta: "2h" },
      { date: "09/06", day: "Quarta", meta: "2h30" }, { date: "10/06", day: "Quinta", meta: "2h30" },
      { date: "11/06", day: "Sexta", meta: "2h30" }, { date: "14/06", day: "Segunda", meta: "2h30" },
      { date: "15/06", day: "Terça", meta: "2h" }, { date: "16/06", day: "Quarta", meta: "2h30" },
      { date: "17/06", day: "Quinta", meta: "2h30" }, { date: "18/06", day: "Sexta", meta: "2h30" },
      { date: "21/06", day: "Segunda", meta: "2h30" }, { date: "22/06", day: "Terça", meta: "2h" },
      { date: "23/06", day: "Quarta", meta: "2h" }, { date: "24/06", day: "Quinta", meta: "2h" },
      { date: "25/06", day: "Sexta", meta: "2h" }, { date: "28/06", day: "Segunda", meta: "2h" },
      { date: "29/06", day: "Terça", meta: "2h" }, { date: "30/06", day: "Quarta", meta: "2h" }
    ]
  },
  {
    id: "jul-2027", label: "Julho 2027", title: "JULHO 2027", target: "50h",
    rule: "Regra usada: terça-feira = 2h após o jovem aprendiz; outros dias úteis = 2h/2h30.",
    days: [
      { date: "01/07", day: "Quinta", meta: "2h30" }, { date: "02/07", day: "Sexta", meta: "2h30" },
      { date: "05/07", day: "Segunda", meta: "2h30" }, { date: "06/07", day: "Terça", meta: "2h" },
      { date: "07/07", day: "Quarta", meta: "2h30" }, { date: "08/07", day: "Quinta", meta: "2h30" },
      { date: "09/07", day: "Sexta", meta: "2h30" }, { date: "12/07", day: "Segunda", meta: "2h30" },
      { date: "13/07", day: "Terça", meta: "2h" }, { date: "14/07", day: "Quarta", meta: "2h30" },
      { date: "15/07", day: "Quinta", meta: "2h30" }, { date: "16/07", day: "Sexta", meta: "2h30" },
      { date: "19/07", day: "Segunda", meta: "2h30" }, { date: "20/07", day: "Terça", meta: "2h" },
      { date: "21/07", day: "Quarta", meta: "2h30" }, { date: "22/07", day: "Quinta", meta: "2h" },
      { date: "23/07", day: "Sexta", meta: "2h" }, { date: "26/07", day: "Segunda", meta: "2h" },
      { date: "27/07", day: "Terça", meta: "2h" }, { date: "28/07", day: "Quarta", meta: "2h" },
      { date: "29/07", day: "Quinta", meta: "2h" }, { date: "30/07", day: "Sexta", meta: "2h" }
    ]
  },
  {
    id: "ago-2027", label: "Agosto 2027", title: "AGOSTO 2027", target: "50h",
    rule: "Regra usada: terça-feira = 2h após o jovem aprendiz; outros dias úteis = 2h/2h30.",
    days: [
      { date: "02/08", day: "Segunda", meta: "2h30" }, { date: "03/08", day: "Terça", meta: "2h" },
      { date: "04/08", day: "Quarta", meta: "2h30" }, { date: "05/08", day: "Quinta", meta: "2h30" },
      { date: "06/08", day: "Sexta", meta: "2h30" }, { date: "09/08", day: "Segunda", meta: "2h30" },
      { date: "10/08", day: "Terça", meta: "2h" }, { date: "11/08", day: "Quarta", meta: "2h30" },
      { date: "12/08", day: "Quinta", meta: "2h30" }, { date: "13/08", day: "Sexta", meta: "2h30" },
      { date: "16/08", day: "Segunda", meta: "2h30" }, { date: "17/08", day: "Terça", meta: "2h" },
      { date: "18/08", day: "Quarta", meta: "2h30" }, { date: "19/08", day: "Quinta", meta: "2h30" },
      { date: "20/08", day: "Sexta", meta: "2h30" }, { date: "23/08", day: "Segunda", meta: "2h" },
      { date: "24/08", day: "Terça", meta: "2h" }, { date: "25/08", day: "Quarta", meta: "2h" },
      { date: "26/08", day: "Quinta", meta: "2h" }, { date: "27/08", day: "Sexta", meta: "2h" },
      { date: "30/08", day: "Segunda", meta: "2h" }, { date: "31/08", day: "Terça", meta: "2h" }
    ]
  },
  {
    id: "set-2027", label: "Setembro 2027", title: "SETEMBRO 2027", target: "50h",
    rule: "Regra usada: terça-feira = 2h após o jovem aprendiz; outros dias úteis = 2h/2h30.",
    days: [
      { date: "01/09", day: "Quarta", meta: "2h30" }, { date: "02/09", day: "Quinta", meta: "2h30" },
      { date: "03/09", day: "Sexta", meta: "2h30" }, { date: "06/09", day: "Segunda", meta: "2h30" },
      { date: "07/09", day: "Terça", meta: "2h" }, { date: "08/09", day: "Quarta", meta: "2h30" },
      { date: "09/09", day: "Quinta", meta: "2h30" }, { date: "10/09", day: "Sexta", meta: "2h30" },
      { date: "13/09", day: "Segunda", meta: "2h30" }, { date: "14/09", day: "Terça", meta: "2h" },
      { date: "15/09", day: "Quarta", meta: "2h30" }, { date: "16/09", day: "Quinta", meta: "2h30" },
      { date: "17/09", day: "Sexta", meta: "2h30" }, { date: "20/09", day: "Segunda", meta: "2h30" },
      { date: "21/09", day: "Terça", meta: "2h" }, { date: "22/09", day: "Quarta", meta: "2h" },
      { date: "23/09", day: "Quinta", meta: "2h" }, { date: "24/09", day: "Sexta", meta: "2h" },
      { date: "27/09", day: "Segunda", meta: "2h" }, { date: "28/09", day: "Terça", meta: "2h" },
      { date: "29/09", day: "Quarta", meta: "2h" }, { date: "30/09", day: "Quinta", meta: "2h" }
    ]
  },
  {
    id: "out-2027", label: "Outubro 2027", title: "OUTUBRO 2027", target: "50h",
    rule: "Regra usada: terça-feira = 2h após o jovem aprendiz; outros dias úteis = 2h/2h30.",
    days: [
      { date: "01/10", day: "Sexta", meta: "2h30" }, { date: "04/10", day: "Segunda", meta: "2h30" },
      { date: "05/10", day: "Terça", meta: "2h" }, { date: "06/10", day: "Quarta", meta: "2h30" },
      { date: "07/10", day: "Quinta", meta: "2h30" }, { date: "08/10", day: "Sexta", meta: "2h30" },
      { date: "11/10", day: "Segunda", meta: "2h30" }, { date: "12/10", day: "Terça", meta: "2h" },
      { date: "13/10", day: "Quarta", meta: "2h30" }, { date: "14/10", day: "Quinta", meta: "2h30" },
      { date: "15/10", day: "Sexta", meta: "2h30" }, { date: "18/10", day: "Segunda", meta: "2h30" },
      { date: "19/10", day: "Terça", meta: "2h" }, { date: "20/10", day: "Quarta", meta: "2h30" },
      { date: "21/10", day: "Quinta", meta: "2h30" }, { date: "22/10", day: "Sexta", meta: "2h30" },
      { date: "25/10", day: "Segunda", meta: "2h30" }, { date: "26/10", day: "Terça", meta: "2h" },
      { date: "27/10", day: "Quarta", meta: "2h30" }, { date: "28/10", day: "Quinta", meta: "2h30" },
      { date: "29/10", day: "Sexta", meta: "2h" }
    ]
  },
  {
    id: "nov-2027", label: "Novembro 2027", title: "NOVEMBRO 2027", target: "50h",
    rule: "Regra usada: terça-feira = 2h após o jovem aprendiz; outros dias úteis = 2h/2h30.",
    days: [
      { date: "01/11", day: "Segunda", meta: "2h30" }, { date: "02/11", day: "Terça", meta: "2h" },
      { date: "03/11", day: "Quarta", meta: "2h30" }, { date: "04/11", day: "Quinta", meta: "2h30" },
      { date: "05/11", day: "Sexta", meta: "2h30" }, { date: "08/11", day: "Segunda", meta: "2h30" },
      { date: "09/11", day: "Terça", meta: "2h" }, { date: "10/11", day: "Quarta", meta: "2h30" },
      { date: "11/11", day: "Quinta", meta: "2h30" }, { date: "12/11", day: "Sexta", meta: "2h30" },
      { date: "15/11", day: "Segunda", meta: "2h30" }, { date: "16/11", day: "Terça", meta: "2h" },
      { date: "17/11", day: "Quarta", meta: "2h30" }, { date: "18/11", day: "Quinta", meta: "2h30" },
      { date: "19/11", day: "Sexta", meta: "2h30" }, { date: "22/11", day: "Segunda", meta: "2h" },
      { date: "23/11", day: "Terça", meta: "2h" }, { date: "24/11", day: "Quarta", meta: "2h" },
      { date: "25/11", day: "Quinta", meta: "2h" }, { date: "26/11", day: "Sexta", meta: "2h" },
      { date: "29/11", day: "Segunda", meta: "2h" }, { date: "30/11", day: "Terça", meta: "2h" }
    ]
  },
  {
    id: "dez-2027", label: "Dezembro 2027", title: "DEZEMBRO 2027", target: "50h",
    rule: "Regra usada: terça-feira = 2h após o jovem aprendiz; outros dias úteis = 2h/2h30.",
    days: [
      { date: "01/12", day: "Quarta", meta: "2h30" }, { date: "02/12", day: "Quinta", meta: "2h30" },
      { date: "03/12", day: "Sexta", meta: "2h30" }, { date: "06/12", day: "Segunda", meta: "2h30" },
      { date: "07/12", day: "Terça", meta: "2h" }, { date: "08/12", day: "Quarta", meta: "2h30" },
      { date: "09/12", day: "Quinta", meta: "2h30" }, { date: "10/12", day: "Sexta", meta: "2h30" },
      { date: "13/12", day: "Segunda", meta: "2h30" }, { date: "14/12", day: "Terça", meta: "2h" },
      { date: "15/12", day: "Quarta", meta: "2h" }, { date: "16/12", day: "Quinta", meta: "2h" },
      { date: "17/12", day: "Sexta", meta: "2h" }, { date: "20/12", day: "Segunda", meta: "2h" },
      { date: "21/12", day: "Terça", meta: "2h" }, { date: "22/12", day: "Quarta", meta: "2h" },
      { date: "23/12", day: "Quinta", meta: "2h" }, { date: "24/12", day: "Sexta", meta: "2h" },
      { date: "27/12", day: "Segunda", meta: "2h" }, { date: "28/12", day: "Terça", meta: "2h" },
      { date: "29/12", day: "Quarta", meta: "2h" }, { date: "30/12", day: "Quinta", meta: "2h" },
      { date: "31/12", day: "Sexta", meta: "2h" }
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

function validarSenhaForte(senha) {
  if (senha.length < 8) return "A senha deve ter pelo menos 8 caracteres.";
  if (!/[A-Z]/.test(senha)) return "A senha deve ter pelo menos uma letra maiúscula.";
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(senha)) return "A senha deve conter pelo menos um caractere especial (!@#$%...).";
  return null;
}

// Popula o seletor de temas da tela de Login
const authThemeSelect = document.getElementById('authThemeSelect');
if (authThemeSelect) {
  colorThemes.forEach((theme, idx) => {
    const option = document.createElement('option');
    option.value = idx;
    option.textContent = `${theme.emoji} ${theme.name}`;
    authThemeSelect.appendChild(option);
  });
}

// Alterna entre tela de Login e Cadastro
document.getElementById('authToggleLink').onclick = function() {
  isSignUpMode = !isSignUpMode;
  document.getElementById('authTitle').textContent = isSignUpMode ? "Criar Nova Conta" : "Entrar no Sistema";
  document.getElementById('authSubmitBtn').textContent = isSignUpMode ? "Cadastrar" : "Entrar";
  document.getElementById('authToggleLink').textContent = isSignUpMode ? "Já tem conta? Faça login aqui" : "Não tem conta? Cadastre-se aqui";
  document.getElementById('signUpFields').style.display = isSignUpMode ? 'block' : 'none';
  document.getElementById('passwordHint').style.display = isSignUpMode ? 'block' : 'none';
};

// Cadastro e Login
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
      
      // Salva os dados do perfil do usuário no Firestore
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
      
      // Atualiza o tema de cor caso a pessoa tenha mudado na tela de login
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

// Monitora Autenticação
onAuthStateChanged(auth, async (user) => {
  if (user) {
    currentUser = user;
    
    // Busca os dados do usuário no Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      userData = userDoc.data();
    }

    document.getElementById('authOverlay').style.display = 'none';
    document.getElementById('appContainer').classList.add('active');
    
    // Atualiza a Saudação Personalizada (Ex: "Irmão João" / "Irmã Maria")
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

// Leitura do Texto Diário da WOL
async function fetchDailyText() {
  const quoteTitle = document.getElementById('quoteTitle');
  const quoteText = document.getElementById('dailyQuote');
  const quoteComment = document.getElementById('dailyComment');
  const toggleBtn = document.getElementById('toggleCommentBtn');

  const targetUrl = 'https://wol.jw.org/pt/wol/d/r5/lp-t/1102026207';
  const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;

  try {
    const response = await fetch(proxyUrl);
    const data = await response.json();

    if (data && data.contents) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(data.contents, 'text/html');

      const headerEl = doc.querySelector('header h2') || doc.querySelector('h2');
      const textoEl = doc.querySelector('.themeScrp') || doc.querySelector('.pGroup .p1');
      const comentarioEl = doc.querySelector('.sb') || doc.querySelector('.pGroup .p2');

      if (headerEl) quoteTitle.textContent = `TEXTO DIÁRIO — ${headerEl.textContent.trim().toUpperCase()}`;
      if (textoEl) quoteText.innerHTML = textoEl.innerHTML;

      if (comentarioEl) {
        quoteComment.innerHTML = comentarioEl.innerHTML;
        toggleBtn.style.display = 'inline-block';
      }
      return;
    }
  } catch (err) {
    console.log("Usando backup local para o texto...");
  }

  quoteTitle.textContent = "TEXTO DIÁRIO — QUARTA-FEIRA, 12 DE AGOSTO";
  quoteText.innerHTML = "Por intermédio dele temos o livramento por resgate, por meio do sangue dele, sim, o perdão das nossas falhas, segundo as riquezas da sua bondade imerecida. — <i>Efé. 1:7.</i>";
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

// Inicializador
function initApp() {
  const sidebarMenu = document.getElementById('sidebarMenu');
  const monthsMenu = document.getElementById('monthsMenu');
  const colorGrid = document.getElementById('colorGrid');
  const monthsContainer = document.getElementById('monthsContainer');

  if (!monthsMenu || !colorGrid || !monthsContainer) return;

  // Renderiza a Nova Lista de Cores em Cartões com Emojis
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
      const storageKey = `${currentUser.uid}-${month.id}-${idx}`;
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
          <thead><tr><th>Data</th><th>Dia</th><th>Meta</th><th style="text-align: center;">Feito ✓</th></tr></thead>
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

    setTimeout(() => {
      const copyBtn = document.getElementById(`copy-btn-${month.id}`);
      if (copyBtn) copyBtn.onclick = () => copyReport(month.id);
    }, 100);
  });

  planData.forEach(m => updateProgress(m.id, m.title));
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
