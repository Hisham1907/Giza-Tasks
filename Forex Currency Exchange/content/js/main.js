const apiKey = "O48_7gRFD8qU0LZ8GoHR";
const apiURL = `https://marketdata.tradermade.com/api/v1/live_currencies_list?api_key=${apiKey}`;
const dropdown1 = document.getElementById("currency1");
const dropdown2 = document.getElementById("currency2");
let currency1Choice = "EUR";
let currency2Choice = "USD";
let currencyPair = "EURUSD";
let myChart;

async function fetchCurrencies() {
  let currencies = localStorage.getItem("currencies");
  if (!currencies) {
    try {
      const response = await axios.get(apiURL);
      currencies = response.data.available_currencies;
      localStorage.setItem("currencies", JSON.stringify(currencies));
    } catch (error) {
      console.error("Error fetching currencies:", error);
      return null;
    }
  } else {
    currencies = JSON.parse(currencies);
  }
  return currencies;
}

async function populateDropdowns() {
  const currencies = await fetchCurrencies();
  console.log(currencies);

  if (currencies) {
    for (const [currencyCode, currencyName] of Object.entries(currencies)) {
      const option1 = document.createElement("option");
      const option2 = document.createElement("option");
      option1.value = currencyCode;
      option2.value = currencyCode;

      option1.text = currencyName;
      option2.text = currencyName;

      dropdown1.appendChild(option1);
      dropdown2.appendChild(option2);
    }
  }
}

populateDropdowns();
dropdown1.addEventListener("change", () => {
  currency1Choice = dropdown1.value;
  currencyPair = currency1Choice + currency2Choice;
  loadChart(currencyPair, 30);
});
dropdown2.addEventListener("change", () => {
  currency2Choice = dropdown2.value;
  currencyPair = currency1Choice + currency2Choice;
  loadChart(currencyPair, 30);
});

function getPastDate(daysAgo) {
  let currentDate = new Date();
  let pastDate = new Date();
  pastDate.setDate(currentDate.getDate() - daysAgo);
  return pastDate.toISOString().split("T")[0];
}
async function getHistoricalRates(currencyPair, days) {
  const response = await axios.get(
    `https://marketdata.tradermade.com/api/v1/timeseries?currency=${currencyPair}&api_key=${apiKey}&start_date=${getPastDate(
      days
    )}&end_date=${getPastDate(0)}&format=records`
  );

  const data = response.data.quotes;
  const chartDays = data.map((day) => day.date);
  const chartRates = data.map((day) => day.close);
  return { chartDays, chartRates };
}

async function loadChart(currencyPair, days) {
  const { chartDays, chartRates } = await getHistoricalRates(
    currencyPair,
    days
  );

  const ctx = document.getElementById("myChart").getContext("2d");

  if (myChart) {
    myChart.data.labels = chartDays;
    myChart.data.datasets[0].data = chartRates;
    myChart.data.datasets[0].label = `${currency1Choice}/${currency2Choice} Exchange Rate`;
    myChart.update();
  } else {
    myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: chartDays,
        datasets: [
          {
            label: `${currency1Choice}/${currency2Choice} Exchange Rate`,
            data: chartRates,
            borderColor: "rgb(220, 53, 69)",
            backgroundColor: "rgba(220, 53, 69, 0.2)",
            fill: true,
          },
        ],
      },
      options: {
        scales: {
          x: {
            ticks: {
              display: false,
            },
          },
          y: {
            beginAtZero: false,
          },
        },
      },
    });
  }
}
loadChart(currencyPair, 30);
function oldDaysHistory(days) {
  loadChart(currencyPair, days);
}
