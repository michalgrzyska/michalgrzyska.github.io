function getDate() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  document.getElementById("currentDate").innerHTML = currentYear;
}
