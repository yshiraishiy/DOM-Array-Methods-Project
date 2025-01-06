const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// フェッチでランダムなユーザーを取得し金額を取得
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

// 全員の金額を2倍にする
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });

  console.log(data);

  updateDOM();
}

// 金額が高い順に並び替え
function sortByRichest() {
  data.sort((a, b) => {
    return b.money - a.money;
  });

  updateDOM();
}

// 百万長者のみをフィルター
function showMillionaires() {
  data = data.filter((user) => {
    return user.money > 1000000;
  });

  updateDOM();
}

// 合計金額を計算
function calculateWealth() {
  if (document.getElementById("total-wealth")) {
    return; 
  }
  const wealth = data.reduce((acc, user) => {
    return (acc += user.money);
  }, 0);

  console.log(wealth);

  const wealthEl = document.createElement("div");
  wealthEl.id = "total-wealth";
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthEl);
}

// 新しいオブジェクトを配列に追加
function addData(obj) {
  data.push(obj);

  updateDOM();
}

// DOMを更新
function updateDOM(providedData = data) {
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

  providedData.forEach(function (item) {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

// 金額を形式化する
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

// イベントリスナー
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionairesBtn.addEventListener("click", showMillionaires);
calculateWealthBtn.addEventListener("click", calculateWealth);
