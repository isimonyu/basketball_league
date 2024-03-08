let editGameForm = document.getElementById("game-edit-form");

function validateForm() {
  let inputDate = document.getElementById("input-date").value;
  let inputHomeTeamID = document.getElementById("input-hteamID").value;
  let inputAwayTeamID = document.getElementById("input-ateamID").value;
  let inputHomeScore = document.getElementById("input-hscore").value;
  let inputAwayScore = document.getElementById("input-ascore").value;

  if (inputDate == "") {
    alert(`Date cannot be empty`);
    return false;
  }
  if (inputHomeTeamID == "") {
    alert(`Home Team cannot be empty`);
    return false;
  }
  if (inputAwayTeamID == "") {
    alert(`Away Team cannot be empty`);
    return false;
  }
  if (inputAwayTeamID == inputHomeTeamID) {
    alert(`Teams cannot play themselves. Change one of them.`);
    return false;
  }
  if (inputHomeScore < 0 || inputHomeScore == "") {
    alert(`Home Score cannot be negative or empty`);
    return false;
  }
  if (inputAwayScore < 0 || inputAwayScore == "") {
    alert(`Away Score cannot be negative or empty`);
    return false;
  }
}

editGameForm.addEventListener("submit", async function (e) {
  // Prevent the form from submitting
  e.preventDefault();

  let id = document.getElementById("input-id").value;
  let inputDate = document.getElementById("input-date").value;
  let inputHomeTeamID = document.getElementById("input-hteamID").value;
  let inputAwayTeamID = document.getElementById("input-ateamID").value;
  let inputHomeScore = document.getElementById("input-hscore").value;
  let inputAwayScore = document.getElementById("input-ascore").value;

  if (!validateForm()) {
    return false;
  }

  let data = {
    date: inputDate,
    homeTeamID: inputHomeTeamID,
    awayTeamID: inputAwayTeamID,
    homeScore: inputHomeScore,
    awayScore: inputAwayScore,
  };

  fetch(`/games/edit/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) {
        window.location.href = "/games";
      } else {
        console.log("Error editing game");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
