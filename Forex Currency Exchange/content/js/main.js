// main.js
document.addEventListener("DOMContentLoaded", () => {
  populateDropdowns();
  loadChart(currencyPair, 30);
});

dropdown1.addEventListener("change", (e) => {
  const previousCurrency1 = selectedCurrency1;

  Swal.fire({
    title: "Change Currency?",
    text: "Are you sure you want to change the base currency?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes",
  }).then((result) => {
    if (result.isConfirmed) {
      selectedCurrency1 = dropdown1.value;
      chartFirstCurrency.textContent = selectedCurrency1;
      currencyPair = selectedCurrency1 + selectedCurrency2;
      chartFirstFlag.className = "";
      chartFirstFlag.classList.add(
        "rounded",
        "fi",
        `fi-${currencyToFlagCode[selectedCurrency1]}`
      );
      dropFirstFlag.className = "";
      dropFirstFlag.classList.add(
        "fi",
        `fi-${currencyToFlagCode[selectedCurrency1]}`
      );
      resetCheckBtns();
      loadChart(currencyPair, 30);
      Swal.fire("Updated!", "Currency base has been updated.", "success");
    } else {
      dropdown1.value = previousCurrency1;
    }
  });
});

dropdown2.addEventListener("change", () => {
  const previousCurrency2 = selectedCurrency2;

  Swal.fire({
    title: "Change Currency?",
    text: "Are you sure you want to change the comparison currency?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes, change it",
  }).then((result) => {
    if (result.isConfirmed) {
      selectedCurrency2 = dropdown2.value;
      chartSecondCurrency.textContent = selectedCurrency2;
      currencyPair = selectedCurrency1 + selectedCurrency2;
      currencySymbol.textContent = currencySymbols[selectedCurrency2];
      chartSecondFlag.className = "";
      chartSecondFlag.classList.add(
        "rounded",
        "fi",
        `fi-${currencyToFlagCode[selectedCurrency2]}`
      );
      dropSecondFlag.className = "";
      dropSecondFlag.classList.add(
        "fi",
        `fi-${currencyToFlagCode[selectedCurrency2]}`
      );
      resetCheckBtns();
      loadChart(currencyPair, 30);
      Swal.fire("Updated!", "Currency comparison has been updated.", "success");
    } else {
      dropdown2.value = previousCurrency2;
    }
  });
});
