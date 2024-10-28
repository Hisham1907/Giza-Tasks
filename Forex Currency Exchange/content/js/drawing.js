async function loadChart(currencyPair, days) {
  const { chartDays, chartRates } = await getHistoricalRates(
    currencyPair,
    days
  );

  const ctx = document.getElementById("chartInstance").getContext("2d");

  if (chartInstance) {
    chartInstance.data.labels = chartDays;
    chartInstance.data.datasets[0].data = chartRates;
    chartInstance.data.datasets[0].label = `${selectedCurrency1}/${selectedCurrency2} Exchange Rate`;
    chartInstance.update();
  } else {
    chartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels: chartDays,
        datasets: [
          {
            label: `${selectedCurrency1}/${selectedCurrency2} Exchange Rate`,
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
function todaysHistory(minutes) {
  loadTodayChart(currencyPair, minutes);
}
async function loadTodayChart(currencyPair, minutes) {
  const { chartDays, chartRates } = await getTodayRates(currencyPair, minutes);
  const ctx = document.getElementById("chartInstance").getContext("2d");

  if (chartInstance) {
    chartInstance.data.labels = chartDays;
    chartInstance.data.datasets[0].data = chartRates;
    chartInstance.data.datasets[0].label = `${selectedCurrency1}/${selectedCurrency2} Exchange Rate`;
    chartInstance.update();
  } else {
    chartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels: chartDays,
        datasets: [
          {
            label: `${selectedCurrency1}/${selectedCurrency2} Exchange Rate`,
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
