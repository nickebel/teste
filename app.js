// 1. 20 Temas de Cores
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

let currentThemeIndex = 0;

// 2. Dados do Planejamento Mensal
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

// 3. Leitura do Texto Diário da WOL (Examine as Escrituras Diariamente)
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
    console.log("Serviço online indisponível. Usando backup local...");
  }

  quoteTitle.textContent = "TEXTO DIÁRIO — QUARTA-FEIRA, 12 DE AGOSTO";
  quoteText.innerHTML = "Por intermédio dele temos o livramento por resgate, por meio do sangue dele, sim, o perdão das nossas falhas, segundo as riquezas da sua bondade imerecida. — <i>Efé. 1:7.</i>";
  quoteComment.innerHTML = "Jesus, por ser perfeito, era como Adão antes de pecar. (1 Cor. 15:45) Ao morrer, Jesus pôde fazer expiação pelo pecado de Adão, ou seja, recuperar aquilo que Adão tinha perdido. (Rom. 5:19) Dessa forma, Jesus se tornou 'o último Adão'. Não há necessidade de que outro homem perfeito venha e pague por aquilo que Adão perdeu. Jesus morreu 'de uma vez para sempre'. (Heb. 7:27; 10:12) Qual então é a diferença entre a expiação e o resgate? A expiação é o que Deus fez para que voltássemos a ser amigos dele. O resgate é o preço pago para tornar a expiação possível a favor de humanos pecadores. Esse preço é representado pelo sangue precioso de Jesus, que foi derramado em nosso favor. — Heb. 9:14. w25.02 5 §§ 12-13";
  toggleBtn.style.display = 'inline-block';
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

// 4. Alternador de Cores em Fila
function nextTheme() {
  currentThemeIndex = (currentThemeIndex + 1) % colorThemes.length;
  setTheme(currentThemeIndex);
}

function setTheme(index, save = true) {
  currentThemeIndex = index;
  const theme = colorThemes[index];
  if (!theme) return;

  document.documentElement.style.setProperty('--bg-cream', theme.bg);
  document.documentElement.style.setProperty('--navy-base', theme.navy);
  document.documentElement.style.setProperty('--navy-dark', theme.dark);
  document.documentElement.style.setProperty('--navy-card', hexToRgba(theme.navy, 0.92));
  document.documentElement.style.setProperty('--border-color', hexToRgba(theme.bg, 0.25));

  const themeBtn = document.getElementById('themeSwitchBtn');
  if (themeBtn) {
    themeBtn.textContent = `🎨 Tema: ${theme.name} (${index + 1}/20)`;
  }

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

// 5. Inicializador Principal
function initApp() {
  const sidebarMenu = document.getElementById('sidebarMenu');
  const monthsMenu = document.getElementById('monthsMenu');
  const colorGrid = document.getElementById('colorGrid');
  const monthsContainer = document.getElementById('monthsContainer');

  if (!monthsMenu || !colorGrid || !monthsContainer) return;

  // Adiciona o Botão Estilo Switch no topo da barra lateral
  if (sidebarMenu && !document.getElementById('themeSwitchBtn')) {
    const switchBtn = document.createElement('button');
    switchBtn.id = 'themeSwitchBtn';
    switchBtn.className = 'btn';
    switchBtn.style.marginBottom = '1rem';
    switchBtn.style.background = 'rgba(255,255,255,0.1)';
    switchBtn.onclick = nextTheme;
    sidebarMenu.insertBefore(switchBtn, sidebarMenu.firstChild);
  }

  // Gera os quadrados arredondados de seleção de cor
  colorGrid.innerHTML = '';
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
  } else {
    setTheme(0, false);
  }

  // Gera o planejamento de todos os meses
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

// 6. Controles do Menu Lateral
const menuToggle = document.getElementById('menuToggle');
const menuOverlay = document.getElementById('menuOverlay');

function toggleMenu() {
  const sidebar = document.getElementById('sidebarMenu');
  const overlay = document.getElementById('menuOverlay');
  if (sidebar) sidebar.classList.toggle('active');
  if (overlay) overlay.classList.toggle('active');
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

// 7. Cálculo de Progresso e Geração de Relatório
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

  const progText = document.getElementById(`prog-text-${monthId}`);
  const progBar = document.getElementById(`prog-bar-${monthId}`);
  if (progText) progText.textContent = `${doneFormatted} / 50h`;
  if (progBar) progBar.style.width = `${percentage}%`;

  const reportBox = document.getElementById(`report-box-${monthId}`);
  const reportText = document.getElementById(`report-text-${monthId}`);

  if (reportBox && reportText) {
    if (totalDone > 0) {
      reportBox.classList.add('active');
      reportText.textContent = `Olá! Eu participei no campo no mês de ${monthTitle}, fiz ${doneFormatted} de horas de campo cumpridas.`;
    } else {
      reportBox.classList.remove('active');
    }
  }
}

// 8. Botão de Copiar Compatível com Celulares e PC
function copyReport(monthId) {
  const reportTextEl = document.getElementById(`report-text-${monthId}`);
  const btn = document.getElementById(`copy-btn-${monthId}`);
  if (!reportTextEl || !btn) return;

  const text = reportTextEl.textContent;

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

// 9. Gerenciador de Fotos
function uploadPhoto(event, monthId) {
  const file = event.target.files[0];
  if (!file) return;

  const url = URL.createObjectURL(file);
  if (!photoStore[monthId]) photoStore[monthId] = [];
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
  if (photoStore[monthId]) {
    photoStore[monthId].splice(index, 1);
    renderPhotos(monthId);
  }
}

function openPhoto(src) {
  const w = window.open("");
  if (w) {
    w.document.write(`<body style="margin:0; background:var(--navy-dark); display:flex; align-items:center; justify-content:center; min-height:100vh;"><img src="${src}" style="max-width:100%; max-height:100vh; object-fit:contain;"></body>`);
  }
}

window.onload = initApp;
