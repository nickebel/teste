const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
  // Configura cabeçalhos de CORS para o Vercel liberar o acesso
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  try {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = hoje.getMonth() + 1;
    const dia = hoje.getDate();

    // URL da Biblioteca Online (WOL) para a data atual
    const url = `https://wol.jw.org/pt/wol/h/r5/lp-t/${ano}/${mes}/${dia}`;
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const $ = cheerio.load(data);

    // Extrai o título/data, o texto bíblico e o comentário
    const dataTexto = $('.todayItems .singleGroup .header h2').text().trim() || `${dia}/${mes}/${ano}`;
    const texto = $('.themeScrp').text().trim();
    const comentario = $('.sb').text().trim();

    if (!texto) {
      throw new Error('Texto não encontrado na página.');
    }

    return res.status(200).json({
      sucesso: true,
      dataTexto,
      texto,
      comentario
    });
  } catch (error) {
    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro ao buscar o texto diário no JW.ORG.'
    });
  }
};