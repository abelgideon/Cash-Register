let price = 1.87;

let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

const cash = document.getElementById("cash");
const output = document.getElementById("change-due");
const btn = document.getElementById("purchase-btn");

const roundToTwoDecimalPlace = (num) => Math.round(num * 100) / 100;

const handleOutput = () => {
  const currencyToAmount = [
    ["ONE HUNDRED", 100],
    ["TWENTY", 20],
    ["TEN", 10],
    ["FIVE", 5],
    ["ONE", 1],
    ["QUARTER", 0.25],
    ["DIME", 0.1],
    ["NICKEL", 0.05],
    ["PENNY", 0.01],
  ];
  if (Number(cash.value) < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  if (Number(cash.value) === price) {
    output.innerText = "No change due - customer paid with exact cash";
    return;
  }

  let change = roundToTwoDecimalPlace(Number(cash.value) - price);
  let total = roundToTwoDecimalPlace(cid.reduce((sum, c) => sum + c[1], 0));

  if (total < change) {
    output.innerText = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  const cidReversed = [...cid].reverse();
  let amountUsed = {};

  for (let i = 0; i < cidReversed.length; i++) {
    if (
      roundToTwoDecimalPlace(change - currencyToAmount[i][1]) >= 0 &&
      cidReversed[i][1] > 0
    ) {
      change = roundToTwoDecimalPlace(change - currencyToAmount[i][1]);
      cidReversed[i][1] = roundToTwoDecimalPlace(
        cidReversed[i][1] - currencyToAmount[i][1]
      );

      if (amountUsed[currencyToAmount[i][0]]) {
        amountUsed[currencyToAmount[i][0]] = roundToTwoDecimalPlace(
          amountUsed[currencyToAmount[i][0]] + currencyToAmount[i][1]
        );
      } else {
        amountUsed[currencyToAmount[i][0]] = currencyToAmount[i][1];
      }
      i--;
    }
  }

  let status = "OPEN";

  let remaining = roundToTwoDecimalPlace(
    cidReversed.reduce((sum, c) => sum + c[1], 0)
  );

  if (remaining === 0) {
    status = "CLOSED";
  }

  if (change != 0) {
    output.innerText = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  output.innerText = `Status: ${status}`;

  for (let key in amountUsed) {
    output.innerText += ` ${key}: $${amountUsed[key]}`;
  }
};

btn.addEventListener("click", () => {
  handleOutput();
});

cash.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleOutput();
  }
});
