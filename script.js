// reference element in html
const balance = document.getElementById("balance");
const moneyPlus = document.getElementById("money-plus");
const moneyMinus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

// let dataTranscation = [
//   //Mock up data
//   //   { id: 1, text: "7-11", amount: +100 },
//   //   { id: 2, text: "Salary", amount: +30000 },
//   //   { id: 3, text: "transit", amount: -300 },
//   //   { id: 4, text: "transit to home", amount: -3000 },
// ];

let transactions = [];

// Format number
function formatNumber(number) {
  return number.toLocaleString("th-TH", { maximumFractionDigits: 2 });
}

function init() {
  list.innerHTML = "";
  transactions.forEach(addDataToList);
  calculateMoney();
}

function addDataToList(transaction) {
  const symbol = transaction.amount < 0 ? "-" : "+";
  const status = transaction.amount < 0 ? "minus" : "plus";

  const item = document.createElement("li");
  //   item.innerHTML =
  //     '7-11 <span>-฿400</span> <button class="delete-btn">X</button>';
  item.classList.add(status);
  item.innerHTML = `${transaction.text} <span> ${symbol}${formatNumber(
    Math.abs(transaction.amount)
  )}<span/> <button class="delete-btn" onclick="removedData(${
    transaction.id
  })">X</button> `;
  console.log(item);
  list.appendChild(item);
}
function generateID() {
  return Math.floor(Math.random() * 1000000);
}
function calculateMoney() {
  const amounts = transactions.map((transactions) => transactions.amount);
  //cal total
  const total = amounts.reduce((result, item) => (result += item), 0);
  //cal income
  const income = amounts
    .filter((item) => item > 0)
    .reduce((result, item) => (result += item), 0);
  // cal expense
  const expense = Math.abs(
    amounts
      .filter((item) => item < 0)
      .reduce((result, item) => (result += item), 0)
  );

  //display output

  //   balance.innerText = `฿${total.toLocaleString("th-TH", {
  //     maximumFractionDigits: 2,
  //   })}`;
  //   moneyPlus.innerText = `฿${income.toLocaleString("th-TH", {
  //     maximumFractionDigits: 2,
  //   })}`;
  //   moneyMinus.innerText = `฿${expense.toLocaleString("th-TH", {
  //     maximumFractionDigits: 2,
  //   })}`;

  balance.innerText = `฿${formatNumber(total)}`;
  moneyPlus.innerText = `฿${formatNumber(income)}`;
  moneyMinus.innerText = `฿${formatNumber(expense)}`;
}

function removedData(deleteId) {
  transactions = transactions.filter(
    (transactions) => transactions.id !== deleteId
  );
  init();
  // 1,2,3 => id =1 then it will show id that not include 1 and store them back to transactions
}

function addTransaciton(event) {
  event.preventDefault();
  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please input name list and amount");
  } else {
    const data = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
      // เติม + หน้า amount เป็นการแปลงค่าที่รับมาจาก input ที่เป็น string ให้กลายเป็น number
    };

    transactions.push(data);
    addDataToList(data);
    calculateMoney();
    text.value = "";
    amount.value = "";
  }
}

form.addEventListener("submit", addTransaciton);

init();
