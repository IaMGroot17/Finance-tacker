const form = document.getElementById('entryForm');
const list = document.getElementById('transactionList');
const dateInput = document.getElementById('date');

// Set default date to today
dateInput.valueAsDate = new Date();

let transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
render();

form.addEventListener('submit', e => {
  e.preventDefault();

  const newEntry = {
    id: Date.now(),
    amount: form.amount.value,
    description: form.description.value,
    date: form.date.value,
    type: form.type.value,
    account: form.account.value
  };

  transactions.push(newEntry);
  localStorage.setItem('transactions', JSON.stringify(transactions));
  form.reset();
  dateInput.valueAsDate = new Date(); // reset date to today
  render();
});

function render() {
  list.innerHTML = '';
  transactions.forEach(entry => {
    const li = document.createElement('li');
    li.className = 'transaction';

    li.innerHTML = `
      <div class="info">
        <strong>${entry.type.toUpperCase()}</strong> | ₹${entry.amount} <br>
        <small>${entry.description || 'No Description'} | ${entry.account} | ${entry.date}</small>
      </div>
      <div class="actions">
        <button class="edit" onclick="editEntry(${entry.id})">Edit</button>
        <button onclick="deleteEntry(${entry.id})">X</button>
      </div>
    `;
    list.appendChild(li);
  });
}

function deleteEntry(id) {
  if (confirm("Delete this transaction?")) {
    transactions = transactions.filter(t => t.id !== id);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    render();
  }
}

function editEntry(id) {
  const entry = transactions.find(t => t.id === id);
  if (entry) {
    form.amount.value = entry.amount;
    form.description.value = entry.description;
    form.date.value = entry.date;
    form.type.value = entry.type;
    form.account.value = entry.account;

    deleteEntry(id);
  }
}
