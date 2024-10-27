const apiKey = "O48_7gRFD8qU0LZ8GoHR";
const apiURL = `https://marketdata.tradermade.com/api/v1/live_currencies_list?api_key=${apiKey}`;
const dropdown1 = document.getElementById("currency1");
const dropdown2 = document.getElementById("currency2");
const chartFirstCurrency = document.getElementById("chart-currency-1");
const chartSecondCurrency = document.getElementById("chart-currency-2");
const chartFirstFlag = document.getElementById("chart-flag-1");
const chartSecondFlag = document.getElementById("chart-flag-2");
const dropFirstFlag = document.getElementById("drop-flag-1");
const dropSecondFlag = document.getElementById("drop-flag-2");
const closesAvg = document.querySelector("#closesAvg");
const closesRatebox = document.querySelector("#closesRate");
let currency1Choice = "EUR";
let currency2Choice = "USD";
let currencyPair = "EURUSD";
let myChart;
const currencyToFlagCode = {
  AED: "ae",
  ALL: "al",
  AMD: "am",
  AOA: "ao",
  ARS: "ar",
  AUD: "au",
  BAM: "ba",
  BDT: "bd",
  BGN: "bg",
  BHD: "bh",
  BIF: "bi",
  BRL: "br",
  BYN: "by",
  CAD: "ca",
  CHF: "ch",
  CLP: "cl",
  CNH: "cn",
  CNY: "cn",
  COP: "co",
  CZK: "cz",
  DKK: "dk",
  EGP: "eg",
  EUR: "eu",
  GBP: "gb",
  GHS: "gh",
  HKD: "hk",
  HRK: "hr",
  HUF: "hu",
  IDR: "id",
  ILS: "il",
  INR: "in",
  ISK: "is",
  JOD: "jo",
  JPY: "jp",
  KES: "ke",
  KRW: "kr",
  KWD: "kw",
  KZT: "kz",
  LBP: "lb",
  LKR: "lk",
  MAD: "ma",
  MUR: "mu",
  MXN: "mx",
  MYR: "my",
  NGN: "ng",
  NOK: "no",
  NZD: "nz",
  OMR: "om",
  PEN: "pe",
  PHP: "ph",
  PKR: "pk",
  PLN: "pl",
  QAR: "qa",
  RON: "ro",
  RUB: "ru",
  SAR: "sa",
  SEK: "se",
  SGD: "sg",
  THB: "th",
  TND: "tn",
  TRY: "tr",
  TWD: "tw",
  TZS: "tz",
  UAH: "ua",
  UGX: "ug",
  USD: "us",
  VND: "vn",
  XAF: "cm",
  XOF: "sn",
  XAG: "ag",
  XAU: "au",
  XPD: "pd",
  XPT: "pt",
  ZAR: "za",
  ZWL: "zw",
};

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
dropdown1.addEventListener("change", (e) => {
  currency1Choice = dropdown1.value;
  chartFirstCurrency.textContent = currency1Choice;
  currencyPair = currency1Choice + currency2Choice;
  chartFirstFlag.className = "";
  chartFirstFlag.classList.add(
    "rounded",
    "fi",
    `fi-${currencyToFlagCode[currency1Choice]}`
  );
  dropFirstFlag.className = "";
  dropFirstFlag.classList.add(
    "fi",
    `fi-${currencyToFlagCode[currency1Choice]}`
  );
  loadChart(currencyPair, 30);
});
dropdown2.addEventListener("change", () => {
  currency2Choice = dropdown2.value;
  chartSecondCurrency.textContent = currency2Choice;
  currencyPair = currency1Choice + currency2Choice;
  chartSecondFlag.className = "";
  chartSecondFlag.classList.add(
    "rounded",
    "fi",
    `fi-${currencyToFlagCode[currency2Choice]}`
  );
  dropSecondFlag.className = "";
  dropSecondFlag.classList.add(
    "fi",
    `fi-${currencyToFlagCode[currency2Choice]}`
  );
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
  updateUiData(data);

  const chartDays = data.map((day) => day.date);
  const chartRates = data.map((day) => day.close);
  return { chartDays, chartRates };
}
function updateUiData(data) {
  const allCloses = data.map((data) => data.close) || [];
  const avgOfCloses =
    allCloses.reduce((sum, close) => sum + close, 0) / (allCloses.length || 1);
  closesAvg.textContent = avgOfCloses ? `$ ${avgOfCloses.toFixed(6)}` : "$ 0";
  let allClosesLength = allCloses.length - 1;
  const closesRate = (allCloses[0] - allCloses[allClosesLength]) / allCloses[0];
  closesRatebox.textContent = closesRate
    ? `${closesRate.toFixed(6)} (${(closesRate / 100).toFixed(6)}%)`
    : "0";
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
function oldDaysHistory(days) {
  loadChart(currencyPair, days);
}

function getPastTime(minutes) {
  let currentDate = new Date();
  let pastDate = new Date();

  pastDate.setHours(currentDate.getHours() - 3);
  pastDate.setMinutes(pastDate.getMinutes() - minutes);

  let hours = pastDate.getHours().toString().padStart(2, "0");
  let mins = pastDate.getMinutes().toString().padStart(2, "0");
  return `${hours}:${mins}`;
}

async function getTodayRates(currencyPair, minutes) {
  const response = await axios.get(
    `
    https://marketdata.tradermade.com/api/v1/timeseries?currency=${currencyPair}&api_key=${apiKey}&start_date=${getPastDate(
      0
    )}
    -${getPastTime(minutes)}&end_date=${getPastDate(0)}-${getPastTime(0)}
    `
  );
  const data = response.data.quotes;
  updateUiData(data);

  const chartDays = data.map((day) => day.date);
  const chartRates = data.map((day) => day.close);
  return { chartDays, chartRates };
}
function todaysHistory(minutes) {
  loadTodayChart(currencyPair, minutes);
}
async function loadTodayChart(currencyPair, minutes) {
  const { chartDays, chartRates } = await getTodayRates(currencyPair, minutes);
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
