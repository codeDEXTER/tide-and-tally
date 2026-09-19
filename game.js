const PORTS = [
  { name: 'Azure Quay', prices: { tea: 18, spice: 42, timber: 26, silk: 64 } },
  { name: 'Brasshaven', prices: { tea: 34, spice: 24, timber: 51, silk: 70 } },
  { name: 'Cinder Bay', prices: { tea: 28, spice: 57, timber: 18, silk: 49 } },
  { name: 'Moonwater', prices: { tea: 48, spice: 32, timber: 43, silk: 22 } },
  { name: 'Verdant Reach', prices: { tea: 22, spice: 61, timber: 35, silk: 38 } },
];
const GOODS = [{ id: 'tea', name: 'Tea' }, { id: 'spice', name: 'Spice' }, { id: 'timber', name: 'Timber' }, { id: 'silk', name: 'Silk' }];
const state = { port: 0, gold: 600, capacity: 6, cargo: { tea: 0, spice: 0, timber: 0, silk: 0 }, turns: 24, status: 'playing' };
const $ = (selector) => document.querySelector(selector);
const board = $('#board'); const market = $('#market-list'); const message = $('#message');
const portName = $('#port-name'); const gold = $('#gold'); const cargo = $('#cargo'); const turns = $('#turns');
function currentPort() { return PORTS[state.port]; }
function cargoCount() { return Object.values(state.cargo).reduce((sum, amount) => sum + amount, 0); }
function finish(text) { state.status = 'finished'; message.textContent = text; }
function buy(id) { const price = currentPort().prices[id]; if (state.gold < price || cargoCount() >= state.capacity) { message.textContent = 'Not enough gold or cargo space.'; return; } state.gold -= price; state.cargo[id] += 1; message.textContent = `Bought 1 unit of ${id}.`; render(); }
function sell(id) { if (state.cargo[id] < 1) return; state.gold += currentPort().prices[id]; state.cargo[id] -= 1; message.textContent = `Sold 1 unit of ${id}.`; if (state.gold >= 2000) finish('You reached the target fortune. Voyage complete!'); render(); }
function trade(id) { if (state.status !== 'playing') return; if (state.cargo[id] > 0) sell(id); else buy(id); }
function travel(index) { if (state.status !== 'playing' || index === state.port) return; state.port = index; state.turns -= 1; if (state.turns <= 0) finish('Your voyage ran out of time.'); else message.textContent = `Arrived at ${currentPort().name}. Compare the market.`; render(); }
function upgrade() { const cost = state.capacity * 100; if (state.gold < cost) { message.textContent = `The next hold upgrade costs ${cost} gold.`; return; } state.gold -= cost; state.capacity += 2; message.textContent = `Ship upgraded to ${state.capacity} cargo spaces.`; render(); }
function render() {
  board.replaceChildren();
  PORTS.forEach((port, index) => { const button = document.createElement('button'); button.type = 'button'; button.className = `port${index === state.port ? ' current' : ''}`; button.innerHTML = `<span class="port-name">${port.name}</span><span class="port-meta">${index === state.port ? 'Current port' : 'Travel: 1 turn'}</span>`; button.addEventListener('click', () => travel(index)); board.append(button); });
  market.replaceChildren();
  GOODS.forEach((good) => { const item = document.createElement('div'); item.className = 'good'; item.innerHTML = `<span class="good-name">${good.name}</span><span class="good-price">${currentPort().prices[good.id]} gold</span><button type="button">Buy / sell</button>`; item.querySelector('button').addEventListener('click', () => trade(good.id)); market.append(item); });
  gold.textContent = state.gold; cargo.textContent = `${cargoCount()}/${state.capacity}`; turns.textContent = state.turns; portName.textContent = currentPort().name; $('#upgrade').textContent = `Upgrade hold (${state.capacity * 100} gold)`;
}
function reset() { state.port = 0; state.gold = 600; state.capacity = 6; state.cargo = { tea: 0, spice: 0, timber: 0, silk: 0 }; state.turns = 24; state.status = 'playing'; message.textContent = 'Choose a port, then trade.'; render(); }
$('#upgrade').addEventListener('click', upgrade); $('#restart').addEventListener('click', reset); reset();
