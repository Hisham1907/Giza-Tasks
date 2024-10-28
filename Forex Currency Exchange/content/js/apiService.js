async function fetchCurrencies() {
  let currencies = localStorage.getItem("currencies");
  if (!currencies) {
    try {
      const response = await axios.get(apiURL);
      currencies = response.data.available_currencies;
      localStorage.setItem("currencies", JSON.stringify(currencies));
      Swal.fire("Success", "Currency data loaded successfully!", "success");
    } catch (error) {
      let errorMessage = "Failed to fetch data. Please try again later.";
      if (error.response && error.response.data) {
        errorMessage = error.response.data.message;
      }
      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
        showCancelButton: true,
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          fetchCurrencies();
        }
      });
      return null;
    }
  } else {
    currencies = JSON.parse(currencies);
  }
  return currencies;
}
async function getHistoricalRates(currencyPair, days) {
  currencyPair = currencyPair.trim();
  const startDate = getPastDate(days);
  const endDate = getPastDate(0);
  try {
    const response = await axios.get(
      `https://marketdata.tradermade.com/api/v1/timeseries?currency=${currencyPair}&api_key=${apiKey}&start_date=${startDate}&end_date=${endDate}&format=records&interval=daily`
    );
    const data = response.data.quotes || [];
    updateUiData(data);

    const chartDays = data.map((day) => day.date);
    const chartRates = data.map((day) => day.close);
    return { chartDays, chartRates };
  } catch (error) {
    let errorMessage = "Failed to fetch data. Please try again later.";
    if (error.response && error.response.data) {
      errorMessage = error.response.data.message;
    }
    Swal.fire({
      title: "Error!",
      text: errorMessage,
      icon: "error",
    });
    return { chartDays: [], chartRates: [] };
  }
}
async function getTodayRates(currencyPair, minutes) {
  currencyPair = currencyPair.trim();
  const startDate = `${getPastDate(0)}-${getUTCTimeOffset(minutes)}`;
  const endDate = `${getPastDate(0)}-${getUTCTimeOffset(0)}`;
  try {
    const response = await axios.get(
      `https://marketdata.tradermade.com/api/v1/timeseries`,
      {
        params: {
          currency: currencyPair,
          api_key: apiKey,
          start_date: startDate,
          end_date: endDate,
          format: "records",
          interval: "minute",
          period: 15,
        },
      }
    );
    const data = response.data.quotes || [];
    updateUiData(data);
    const chartDays = data.map((day) => day.date);
    const chartRates = data.map((day) => day.close);
    return { chartDays, chartRates };
  } catch (error) {
    let errorMessage = "Failed to fetch data. Please try again later.";
    if (error.response && error.response.data) {
      errorMessage = error.response.data.message;
    }
    Swal.fire({
      title: "Error!",
      text: errorMessage,
      icon: "error",
    });
    return { chartDays: [], chartRates: [] };
  }
}
