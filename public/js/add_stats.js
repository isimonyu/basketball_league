let addPlayerForm = document.getElementById("stat-create-form");

addPlayerForm.addEventListener("submit", async function (e) {
  // Prevent the form from submitting
  e.preventDefault();

  let inputPlayerName = document.getElementById("input-pname");
  let inputPoint = document.getElementById("input-point");
  let inputAssist = document.getElementById("input-assist");
  let inputRebound = document.getElementById("input-rebound");
  let inputFieldGoal = document.getElementById("input-fieldgoal");
  let inputFreeThrow = document.getElementById("input-name");
  let inputThreePoint = document.getElementById("input-point");
  let inputBlock = document.getElementById("input-assist");
  let inputSteal = document.getElementById("input-rebound");
  let inputFoul = document.getElementById("input-fieldgoal");
  let inputMinute = document.getElementById("input-fieldgoal");
  

  let playerNameValue = inputPlayerName.value;
  let gameIDvalue = inputgameID.value;
  let statIDvalue = inputstatID.value;
  let teamIDValue = inputTeamID.value;

  let data = {
    playerName: playerNameValue,
    gameID: gameIDValue,
    statID: statIDValue,
    teamID: teamIDValue,
  };

  fetch("/stats/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) {
        window.location.href = "/stats";
      } else {
        console.log("Error adding stats");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
