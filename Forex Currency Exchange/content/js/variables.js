const apiKey = "7w8_IeQwaaLEzWXbJUgM",
  apiURL = `https://marketdata.tradermade.com/api/v1/live_currencies_list?api_key=${apiKey}`,
  dropdown1 = document.getElementById("currency1"),
  dropdown2 = document.getElementById("currency2"),
  chartFirstCurrency = document.getElementById("chart-currency-1"),
  chartSecondCurrency = document.getElementById("chart-currency-2"),
  chartFirstFlag = document.getElementById("chart-flag-1"),
  chartSecondFlag = document.getElementById("chart-flag-2"),
  dropFirstFlag = document.getElementById("drop-flag-1"),
  dropSecondFlag = document.getElementById("drop-flag-2"),
  closesAvg = document.querySelector("#closesAvg"),
  closesRatebox = document.querySelector("#closesRate"),
  currencySymbol = document.querySelector("#currency-symbol"),
  allRadios = document.querySelectorAll('input[type="radio"]');

let selectedCurrency1 = "EUR",
  selectedCurrency2 = "USD",
  currencyPair = "EURUSD",
  chartInstance;
