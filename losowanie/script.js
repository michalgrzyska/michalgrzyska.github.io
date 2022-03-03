var people = [];

function initiate() {
  var input = document.getElementById("person-to-add");
  input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      addPerson();
    }
  });
}

function addPerson() {
  var person = document.getElementById("person-to-add").value;
  if (!person) return;

  document.getElementById("person-to-add").value = "";
  people.push(person);
  document.getElementById("people").innerHTML += `${person}<br>`;
}

function run() {
  if (people.length === 0) return;

  document.getElementById("content").classList.add("blur");
  document.getElementById("run").classList.add("blur");
  document.getElementById("winner-overlay").style.display = "block";

  var i = 10;
  var interval = setInterval(function () {
    i--;
    if (i === 0) {
      clearInterval(interval);
      document.getElementById("counter").style.display = "none";
      document.getElementById("popup-winner").style.display = "block";

      const winner = people[Math.floor(Math.random() * people.length)];
      document.getElementById("winner").innerHTML = winner;
    }

    document.getElementById("counter").innerHTML = i;
  }, 1000);
}
