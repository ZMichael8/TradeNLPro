// Elementos
const tradeForm = document.getElementById('tradeForm');
const tradesList = document.getElementById('tradesList');
const stats = document.getElementById('stats');
const quote = document.getElementById('quote');
const calendarList = document.getElementById('calendarList');

document.addEventListener('DOMContentLoaded', () => {
    loadTrades();
    showMotivationalQuote();
});

tradeForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const trade = {
        id: Date.now(),
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
    updateCalendar();
    tradeForm.reset();
});

// Guardar en localStorage
function saveTrade(trade) {
    let trades = JSON.parse(localStorage.getItem('trades')) || [];
    trades.push(trade);
    localStorage.setItem('trades', JSON.stringify(trades));
}

// Mostrar trade con botones
function displayTrade(trade) {
    const li = document.createElement('li');
    li.innerHTML = `${trade.date} - ${trade.pair} | Entrada: ${trade.entry} | Salida: ${trade.exit} | Resultado: ${trade.result} | Nota: ${trade.note}
        <button class="edit-btn" onclick="editTrade(${trade.id})">Editar</button>
        <button class="delete-btn" onclick="deleteTrade(${trade.id})">Eliminar</button>`;

    tradesList.appendChild(li);
}

// Cargar trades guardados
function loadTrades() {
    let trades = JSON.parse(localStorage.getItem('trades')) || [];
    trades.forEach(displayTrade);
    updateStats();
    updateCalendar();
}

// Eliminar trade
function deleteTrade(id) {
    let trades = JSON.parse(localStorage.getItem('trades')) || [];
    trades = trades.filter(trade => trade.id !== id);
    localStorage.setItem('trades', JSON.stringify(trades));
    tradesList.innerHTML = '';
    loadTrades();
}

// Editar trade
function editTrade(id) {
    let trades = JSON.parse(localStorage.getItem('trades')) || [];
    const trade = trades.find(t => t.id === id);

    document.getElementById('pair').value = trade.pair;
    document.getElementById('entry').value = trade.entry;
    document.getElementById('exit').value = trade.exit;
    document.getElementById('result').value = trade.result;
    document.getElementById('note').value = trade.note;

    deleteTrade(id);
}

// Estadísticas
function updateStats() {
    let trades = JSON.parse(localStorage.getItem('trades')) || [];
    let total = 0;
    let wins = 0;

    trades.forEach(trade => {
        total += trade.result;
        if (trade.result > 0) wins++;
    });

    let winRate = trades.length ? ((wins / trades.length) * 100).toFixed(2) : 0;

    stats.textContent = `Ganancia total: ${total} | Win Rate: ${winRate}% | Total de operaciones: ${trades.length}`;
}

// Calendario
function updateCalendar() {
    let trades = JSON.parse(localStorage.getItem('trades')) || [];
    let dates = {};

    trades.forEach(trade => {
        dates[trade.date] = (dates[trade.date] || 0) + 1;
    });

    calendarList.innerHTML = '';
    for (let date in dates) {
        const li = document.createElement('li');
        li.textContent = `${date}: ${dates[date]} operaciones registradas`;
        calendarList.appendChild(li);
    }
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
