let editPlayerForm = document.getElementById("player-edit-form");

editPlayerForm.addEventListener("submit", async function (e) {
  // Prevent the form from submitting
  e.preventDefault();

  let inputID = document.getElementById("input-id");
  let inputPlayerName = document.getElementById("input-pname");
  let inputHeight = document.getElementById("input-height");
  let inputPosition = document.getElementById("input-position");
  let inputNumber = document.getElementById("input-number");
  let inputTeamID = document.getElementById("input-teamID");

  let id = inputID.value;
  let playerNameValue = inputPlayerName.value;
  let heightValue = inputHeight.value;
  let positionValue = inputPosition.value;
  let numberValue = inputNumber.value;
  let teamIDValue = inputTeamID.value;

  let data = {
    playerName: playerNameValue,
    height: heightValue,
    position: positionValue,
    number: numberValue,
    teamID: teamIDValue,
  };

  fetch(`/players/edit/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) {
        window.location.href = "/players";
      } else {
        console.log("Error editing player");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
