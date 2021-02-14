const dateStart = document.querySelector("#date-start");
const dateEnd = document.querySelector("#date-end");
const currList = document.querySelector(".currency");

let startDate = "2021-01-09";
let endDate = "2021-02-12";
let currency = "USD";

window.addEventListener("load", () => {
  getBitCoinInfo();
});

dateStart.addEventListener("change", () => {
  startDate = dateStart.value;
  getBitCoinInfo();
});

dateEnd.addEventListener("change", () => {
  endDate = dateEnd.value;
  getBitCoinInfo();
});


currList.addEventListener("change", () => {
    currency = currList.value;
    getBitCoinInfo();
  });


const getBitCoinInfo = () => {
  axios
    .get(
      `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`
    )
    .then((response) => {
      const dailyData = response.data;
      printTheChart(dailyData);
    })
    .catch((err) => console.log(err));
};

const printTheChart = (stockData) => {
  const dailyData = stockData["bpi"];

  const stockDates = Object.keys(dailyData);
  const stockPrices = stockDates.map((stock) => dailyData[stock]);
  const ctx = document.getElementById("my-chart").getContext("2d");

  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: stockDates,
      datasets: [
        {
          label: "Stock Chart",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: stockPrices,
        },
      ],
    },
  }); // closes chart = new Chart()
};
