// info.js
const API_URL = 'https://bet7k-aviator-api.p.rapidapi.com/results';
const RAPIDAPI_KEY = 'SUA_CHAVE_AQUI'; // Substitua pela sua chave do RapidAPI

let cacheHistorico = []; // Cache para evitar chamadas repetidas
let ultimaAtualizacao = 0;

// Função: Busca resultados da API (atualiza cache a cada 1 minuto)
export async function atualizarHistorico() {
  const agora = Date.now();
  if (agora - ultimaAtualizacao < 60000) { // 1 minuto de cache
    return cacheHistorico;
  }

  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'bet7k-aviator-api.p.rapidapi.com'
      }
    });

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    const data = await response.json();
    cacheHistorico = data; // Array de números (ex: [22.21, 36.73, ...])
    ultimaAtualizacao = agora;
    console.log('Histórico atualizado:', cacheHistorico.slice(0, 5)); // Log dos últimos 5
    return cacheHistorico;
  } catch (error) {
    console.error('Erro ao buscar API:', error);
    // Fallback: use dados estáticos se API falhar
    return [
      22.21, 36.73, 16.39, 12.18, 11.57, 17.64, 17.64, 18.03, 32.87, 12.62,
      // ... adicione todos os seus dados originais aqui como fallback
      59.90
    ];
  }
}

// Função: média
export function media(arr) {
  return arr.length ? (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2) : null;
}

// Função: mediana
export function mediana(arr) {
  if (!arr.length) return null;
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? ((sorted[mid - 1] + sorted[mid]) / 2).toFixed(2)
    : sorted[mid].toFixed(2);
}

// Exporta histórico atual (inicia com fetch)
export default async function getHistorico() {
  return await atualizarHistorico();
}