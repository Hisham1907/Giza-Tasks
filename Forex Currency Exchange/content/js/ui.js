async function populateDropdowns() {
  const currencies = await fetchCurrencies();
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
  } else {
    Swal.fire(
      "Error",
      "Failed to load currencies. Please try again later.",
      "error"
    );
  }
}
populateDropdowns();

function updateUiData(data) {
  const allCloses = data.map((data) => data.close) || [];
  if (!allCloses.length) {
    closesAvg.textContent = "Data unavailable";
    closesRatebox.textContent = "Data unavailable";
    Swal.fire(
      "Info",
      "No closing data available for the selected period.",
      "info"
    );
    return;
  }
  const avgOfCloses =
    allCloses.reduce((sum, close) => sum + close, 0) / (allCloses.length || 1);
  closesAvg.textContent = avgOfCloses ? ` ${avgOfCloses.toFixed(6)}` : "0";
  let allClosesLength = allCloses.length - 1;
  const closesRate = (allCloses[0] - allCloses[allClosesLength]) / allCloses[0];
  closesRatebox.textContent = closesRate
    ? `${closesRate.toFixed(6)} (${(closesRate / 100).toFixed(6)}%)`
    : "0";
}
