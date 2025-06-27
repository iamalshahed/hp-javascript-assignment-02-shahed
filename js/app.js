// DOM Elements
const balanceDisplay = document.getElementById("balance");
const addBtn = document.getElementById("addBtn");
const withdrawBtn = document.getElementById("withdrawBtn");
const historyBtn = document.getElementById("historyBtn");

const addForm = document.getElementById("addForm");
const withdrawForm = document.getElementById("withdrawForm");
const historySection = document.getElementById("historySection");

const confirmAdd = document.getElementById("confirmAdd");
const confirmWithdraw = document.getElementById("confirmWithdraw");
const addAmountInput = document.getElementById("addAmount");
const withdrawAmountInput = document.getElementById("withdrawAmount");
const transactionTable = document.getElementById("transactionTable");

// Initial Balance and Transaction Log
let balance = 0;
let transactions = [];

// Utility Functions
function updateBalanceDisplay() {
  balanceDisplay.textContent = `BDT ${balance}`;
}

function logTransaction(type, amount) {
  const date = new Date().toLocaleString();
  const transaction = {
    date,
    type,
    amount,
    currentBalance: balance,
  };
  transactions.unshift(transaction); // add to top
  renderTransactionTable();
}

function renderTransactionTable() {
  transactionTable.innerHTML = "";
  transactions.forEach((t) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="p-2 border-b border-gray-700">${t.date}</td>
      <td class="p-2 border-b border-gray-700">${t.type}</td>
      <td class="p-2 border-b border-gray-700">BDT ${t.amount}</td>
      <td class="p-2 border-b border-gray-700">BDT ${t.currentBalance}</td>
    `;
    transactionTable.appendChild(row);
  });
}

// Toggle Visibility
function showSection(section) {
  addForm.classList.add("hidden");
  withdrawForm.classList.add("hidden");
  historySection.classList.add("hidden");
  section.classList.remove("hidden");
}

// Button Event Listeners
addBtn.addEventListener("click", () => showSection(addForm));
withdrawBtn.addEventListener("click", () => showSection(withdrawForm));
historyBtn.addEventListener("click", () => showSection(historySection));

// Add Money
confirmAdd.addEventListener("click", () => {
  const amount = parseFloat(addAmountInput.value);
  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid positive amount.");
    return;
  }
  balance += amount;
  updateBalanceDisplay();
  logTransaction("Add", amount);
  addAmountInput.value = "";
});

// Withdraw Money
confirmWithdraw.addEventListener("click", () => {
  const amount = parseFloat(withdrawAmountInput.value);
  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid positive amount.");
    return;
  }
  if (amount > balance) {
    alert("Insufficient balance.");
    return;
  }
  balance -= amount;
  updateBalanceDisplay();
  logTransaction("Withdraw", amount);
  withdrawAmountInput.value = "";
});

// Initial UI State
updateBalanceDisplay();
