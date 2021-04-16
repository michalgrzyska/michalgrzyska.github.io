var alcoholics = ["Chrzan", "Herno", "Filip", "Rzyśka", "Olo"];
var alcoholicsShuffle = [];

function randomizeAndSetAlcoholics() {
  randomizeAlcoholics();
  setAlcoholics();
}

function randomizeAlcoholics() {
  for (i = 4; i >= 0; i--) {
    var random = randomIntFromInterval(0, i);
    alcoholicsShuffle.push(alcoholics[random]);
    alcoholics.splice(random, 1);
  }
}

function setAlcoholics() {
  document.getElementById("herno").innerHTML = alcoholicsShuffle[0];
  document.getElementById("chrzan").innerHTML = alcoholicsShuffle[1];
  document.getElementById("filip").innerHTML = alcoholicsShuffle[2];
  document.getElementById("rzyska").innerHTML = alcoholicsShuffle[3];
  document.getElementById("olo").innerHTML = alcoholicsShuffle[4];

  document.getElementById("alcoholicsTable").style.display = "table";
  document.getElementById("btn").style.display = "none";
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
