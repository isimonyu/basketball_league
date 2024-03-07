// ADD STATS
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

// EDIT STATS

let editPlayerForm = document.getElementById("stat-edit-form");

function validateForm() {
  let inputPlayerName = document.getElementById("input-pname").value;
  let inputPoint = document.getElementById("input-point").value;
  let inputAssist = document.getElementById("input-assist").value;
  let inputRebound = document.getElementById("input-rebound").value;
  let inputFieldGoal = document.getElementById("input-fieldgoal").value;
  let inputFreeThrow = document.getElementById("input-name").value;
  let inputThreePoint = document.getElementById("input-point").value;
  let inputBlock = document.getElementById("input-assist").value;
  let inputSteal = document.getElementById("input-rebound").value;
  let inputFoul = document.getElementById("input-fieldgoal").value;
  let inputMinute = document.getElementById("input-fieldgoal").value;


  let playerNameValue = document.getElementById("input-assist").value;
  let gameIDvalue = document.getElementById("input-rebound").value;
  let statIDvalue = document.getElementById("input-fieldgoal").value;
  let teamIDValue = document.getElementById("input-fieldgoal").value;
  

  if (inputPlayerName.length <= 0) {
    alert(`Must fill out player's name`);
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
  if (inputFieldGoal < 0) {
    alert(`Field Goal needs to be positive`);
    return false;
  }
  if (inputFreeThrow < 0) {
    alert(`Free Throw needs to be positive`);
    return false;
  }
  if (inputThreePoint < 0) {
    alert(`Three Point needs to be positive`);
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

editPlayerForm.addEventListener("submit", async function (e) {
  // Prevent the form from submitting
  e.preventDefault();

  let inputPlayerName = document.getElementById("input-pname").value;
  let inputPoint = document.getElementById("input-point").value;
  let inputAssist = document.getElementById("input-assist").value;
  let inputRebound = document.getElementById("input-rebound").value;
  let inputFieldGoal = document.getElementById("input-fieldgoal").value;
  let inputFreeThrow = document.getElementById("input-name").value;
  let inputThreePoint = document.getElementById("input-point").value;
  let inputBlock = document.getElementById("input-assist").value;
  let inputSteal = document.getElementById("input-rebound").value;
  let inputFoul = document.getElementById("input-fieldgoal").value;
  let inputMinute = document.getElementById("input-fieldgoal").value;


  let playerNameValue = inputPlayerName.value;
  let gameIDvalue = gameIDValue.value;
  let statIDvalue = statIDvalue.value;
  let teamIDValue = teamIDValue.value;
  

  if (!validateForm()) {
    return false;
  }

  let data = {
    playerName: playerNameValue,
    gameID: gameIDValue,
    statID: statIDValue,
    teamID: teamIDValue,
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


// UPDATE STATS
async function deleteStat(statID, playerName) {
    let userConfirmation = window.confirm(
      `Are you sure you want to delete ${playerName} stats?`
    );
    if (userConfirmation) {
      // OK to delete
      let data = {
        statID: statID,
      };
  
      fetch("/stats/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          if (res.ok) {
            window.location.href = "/stats";
          } else {
            console.log("Error deleting stats");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }
  
  async function editStat(statID) {
    window.location.href = `/stat/edit/${statID}`;
  }
  