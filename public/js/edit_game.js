let editGameForm = document.getElementById("game-edit-form");

editGameForm.addEventListener("submit", async function (e) {
  // Prevent the form from submitting
  e.preventDefault();

  let inputID = document.getElementById("input-id");
  let inputDate = document.getElementById("input-date");
  let inputHomeTeamID = document.getElementById("input-hteamID");
  let inputAwayTeamID = document.getElementById("input-ateamID");
  let inputHomeScore = document.getElementById("input-hscore");
  let inputAwayScore = document.getElementById("input-ascore");

  let id = inputID.value;
  let dateValue = inputDate.value;
  let homeTeamIDValue = inputHomeTeamID.value;
  let awayTeamIDValue = inputAwayTeamID.value;
  let homeScoreValue = inputHomeScore.value;
  let awayScoreValue = inputAwayScore.value;

  let data = {
    date: dateValue,
    homeTeamID: homeTeamIDValue,
    awayTeamID: awayTeamIDValue,
    homeScore: homeScoreValue,
    awayScore: awayScoreValue,
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
