// Selección de elementos
const tradeForm = document.getElementById('tradeForm');
const tradesList = document.getElementById('tradesList');
const stats = document.getElementById('stats');
const quote = document.getElementById('quote');

// Cargar los trades guardados y mostrar frase al iniciar
document.addEventListener('DOMContentLoaded', () => {
    loadTrades();
    showMotivationalQuote();
});

// Guardar nuevo trade
tradeForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const trade = {
        pair: document.getElementById('pair').value,
        entry: parseFloat(document.getElementById('entry').value),
        exit: parseFloat(document.getElementById('exit').value),
        result: parseFloat(document.getElementById('result').value),
        note: document.getElementById('note').value,
        date: new Date().toLocaleDateString()
    };

    saveTrade(trade);
    displayTrade(trade);
    updateStats();
    tradeForm.reset();
});

// Guardar en localStorage
function saveTrade(trade) {
    let trades = JSON.parse(localStorage.getItem('trades')) || [];
    trades.push(trade);
    localStorage.setItem('trades', JSON.stringify(trades));
}

// Mostrar trade
function displayTrade(trade) {
    const li = document.createElement('li');
    li.textContent = `${trade.date} - ${trade.pair} | Entrada: ${trade.entry} | Salida: ${trade.exit} | Resultado: ${trade.result} | Nota: ${trade.note}`;
    tradesList.appendChild(li);
}

// Cargar trades
function loadTrades() {
    let trades = JSON.parse(localStorage.getItem('trades')) || [];
    trades.forEach(displayTrade);
    updateStats();
}

// Calcular estadísticas
function updateStats() {
    let trades = JSON.parse(localStorage.getItem('trades')) || [];
    let total = 0;
    let wins = 0;

    trades.forEach(trade => {
        total += trade.result;
        if (trade.result > 0) wins++;
    });

    let winRate = trades.length ? ((wins / trades.length) * 100).toFixed(2) : 0;

    stats.textContent = `Ganancia total: ${total} | Win Rate: ${winRate}% | Total Trades: ${trades.length}`;
}

// Frases motivacionales
function showMotivationalQuote() {
    const quotes = [
        "Nunca te rindas, cada trade te acerca a tu objetivo.",
        "La consistencia es la clave del éxito.",
        "Confía en tu plan y sigue tus reglas.",
        "Cada error es una lección para mejorar.",
        "Hoy es un gran día para operar con disciplina."
    ];

    const randomIndex = Math.floor(Math.random() * quotes.length);
    quote.textContent = quotes[randomIndex];
}
