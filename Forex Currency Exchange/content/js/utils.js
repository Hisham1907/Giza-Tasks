function resetCheckBtns() {
  allRadios.forEach((btn) => {
    btn.checked = false;
  });
  allRadios[4].checked = true;
}
function getPastDate(daysAgo) {
  let currentDate = new Date();
  let pastDate = new Date();
  pastDate.setDate(currentDate.getDate() - daysAgo);
  return pastDate.toISOString().split("T")[0];
}
function getUTCTimeOffset(minutes) {
  const date = new Date(Date.now() - minutes * 60000);
  return date.toISOString().split("T")[1].slice(0, 5);
}
