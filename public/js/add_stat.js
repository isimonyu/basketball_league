let addStatsForm = document.getElementById("stat-create-form");

function validateForm() {
  let inputPlayerID = document.getElementById("input-playerID").value;
  let inputPoint = document.getElementById("input-points").value;
  let inputAssist = document.getElementById("input-assists").value;
  let inputRebound = document.getElementById("input-rebounds").value;
  let inputFieldGoalMake = document.getElementById("input-fgMake").value;
  let inputFieldGoalAttempt = document.getElementById("input-fgAttempt").value;
  let inputFreeThrowMake = document.getElementById("input-ftMake").value;
  let inputFreeThrowAttempt = document.getElementById("input-ftAttempt").value;
  let inputThreePointMake = document.getElementById(
    "input-threePointMake"
  ).value;
  let inputThreePointAttempt = document.getElementById(
    "input-threePointAttempt"
  ).value;
  let inputBlock = document.getElementById("input-blocks").value;
  let inputSteal = document.getElementById("input-steals").value;
  let inputFoul = document.getElementById("input-fouls").value;
  let inputMinute = document.getElementById("input-minutes").value;
  if (inputPlayerID == "") {
    alert(`Player cannot be empty`);
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

  return true;
}

addStatsForm.addEventListener("submit", async function (e) {
  // Prevent the form from submitting
  e.preventDefault();

  let inputGameID = document.getElementById("input-gameID").value;
  let inputPlayerID = document.getElementById("input-playerID").value;
  let inputPoint = document.getElementById("input-points").value;
  let inputAssist = document.getElementById("input-assists").value;
  let inputRebound = document.getElementById("input-rebounds").value;
  let inputFieldGoalMake = document.getElementById("input-fgMake").value;
  let inputFieldGoalAttempt = document.getElementById("input-fgAttempt").value;
  let inputFreeThrowMake = document.getElementById("input-ftMake").value;
  let inputFreeThrowAttempt = document.getElementById("input-ftAttempt").value;
  let inputThreePointMake = document.getElementById(
    "input-threePointMake"
  ).value;
  let inputThreePointAttempt = document.getElementById(
    "input-threePointAttempt"
  ).value;
  let inputBlock = document.getElementById("input-blocks").value;
  let inputSteal = document.getElementById("input-steals").value;
  let inputFoul = document.getElementById("input-fouls").value;
  let inputMinute = document.getElementById("input-minutes").value;

  // if (!validateForm()) {
  //   return false;
  // }

  let data = {
    playerID: inputPlayerID,
    gameID: inputGameID,
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
