// Busca automática do Texto Diário atualizado diariamente via Feed RSS do JW.org
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
    console.log("Erro ao buscar o texto diário automático.");
  }

  quoteText.textContent = "Não foi possível carregar o texto diário de hoje. Verifique sua conexão.";
}
