let editPlayerForm = document.getElementById("stat-edit-form");

function validateForm() {
  let inputPlayerID = document.getElementById("playerID").value;
  let inputGameID = document.getElementById("gameID").value;
  let inputPoint = document.getElementById("point").value;
  let inputAssist = document.getElementById("assist").value;
  let inputRebound = document.getElementById("rebound").value;
  let inputFieldGoalMake = document.getElementById("fgMake").value;
  let inputFieldGoalAttempt = document.getElementById("fgAttempt").value;
  let inputFreeThrowMake = document.getElementById("ftMake").value;
  let inputFreeThrowAttempt = document.getElementById("ftAttempt").value;
  let inputThreePointMake = document.getElementById("threeMake").value;
  let inputThreePointAttempt = document.getElementById("threeAttempt").value;
  let inputBlock = document.getElementById("block").value;
  let inputSteal = document.getElementById("steal").value;
  let inputFoul = document.getElementById("foul").value;
  let inputMinute = document.getElementById("minute").value;

  if (inputPlayerID == "") {
    alert(`Player ID cannot be empty`);
    return false;
  }
  if (inputGameID == "") {
    alert(`Game ID cannot be empty`);
    return false;
  }  
  if (inputPoint < 0) {
    alert(`Points needs to be positive`);
    return false;
  }
  if (inputAssist < 0) {
    alert(`Assists needs to be positive`);
    return false;
  }
  if (inputRebound < 0) {
    alert(`Rebounds needs to be positive`);
    return false;
  }
  if (inputFieldGoalMake < 0) {
    alert(`Field Goal Make needs to be positive`);
    return false;
  }
  if (inputFieldGoalAttempt < 0) {
    alert(`Field Goal Attempt needs to be positive`);
    return false;
  }
  if (inputFreeThrowMake < 0) {
    alert(`Free Throw Make needs to be positive`);
    return false;
  }
  if (inputFreeThrowAttempt < 0) {
    alert(`Free Throw Attempt needs to be positive`);
    return false;
  }
  if (inputThreePointMake < 0) {
    alert(`Three Point Make needs to be positive`);
    return false;
  }
  if (inputThreePointAttempt < 0) {
    alert(`Three Point Attempt needs to be positive`);
    return false;
  }
  if (inputBlock < 0) {
    alert(`Block needs to be positive`);
    return false;
  }
  if (inputSteal < 0) {
    alert(`Steal needs to be positive`);
    return false;
  }
  if (inputFoul < 0) {
    alert(`Foul needs to be positive`);
    return false;
  }
  if (inputMinute == "") {
    alert(`Position cannot be empty`);
    return false;
  }


  if (inputTeamID == "") {
    alert(`Team cannot be empty`);
    return false;
  }
  return true;
  
}

editPlayerForm.addEventListener("submit", async function (e) {
  // Prevent the form from submitting
  e.preventDefault();

  let inputPlayerID = document.getElementById("playerID").value;
  let inputGameID = document.getElementById("gameID").value;
  let inputPoint = document.getElementById("point").value;
  let inputAssist = document.getElementById("assist").value;
  let inputRebound = document.getElementById("rebound").value;
  let inputFieldGoalMake = document.getElementById("fgMake").value;
  let inputFieldGoalAttempt = document.getElementById("fgAttempt").value;
  let inputFreeThrowMake = document.getElementById("ftMake").value;
  let inputFreeThrowAttempt = document.getElementById("ftAttempt").value;
  let inputThreePointMake = document.getElementById("threeMake").value;
  let inputThreePointAttempt = document.getElementById("threeAttempt").value;
  let inputBlock = document.getElementById("block").value;
  let inputSteal = document.getElementById("steal").value;
  let inputFoul = document.getElementById("foul").value;
  let inputMinute = document.getElementById("minute").value;

  if (!validateForm()) {
    return false;
  }
  
  let data = {
    playerID: inputPlayerID,
    gameID: inputGameID,
    statID: statIDvalue,
    teamID: teamIDValue,
    point: inputPoint,
    assist: inputAssist,
    rebound: inputRebound,
    fieldGoalMake: inputFieldGoalMake,
    fieldGoalAttempt: inputFieldGoalAttempt,
    freeThrowMake: inputFreeThrowMake,
    freeThrowAttempt: inputFreeThrowAttempt,
    threePointMake: inputThreePointMake,
    threePointAttempt: inputThreePointAttempt,
    block: inputBlock,
    steal: inputSteal,
    foul: inputFoul,
    minute: inputMinute,
  };


  fetch(`/stats/edit/${id}`, {
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
        console.log("Error editing stats");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
