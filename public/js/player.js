// ADD PLAYER
let addPlayerForm = document.getElementById("player-create-form");

function validateForm() {
  let inputPlayerName = document.getElementById("input-pname").value;
  let inputHeight = document.getElementById("input-height").value;
  let inputPosition = document.getElementById("input-position").value;
  let inputNumber = document.getElementById("input-number").value;
  let inputTeamID = document.getElementById("input-teamID").value;

  if (inputPlayerName.length <= 0) {
    alert(`Must fill out player's name`);
    return false;
  }
  if (inputHeight < 0) {
    alert(`Height needs to be a positive number`);
    return false;
  }
  if (inputPosition == "") {
    alert(`Position cannot be empty`);
    return false;
  }
  if (inputNumber < 0) {
    alert(`Number needs to be positive`);
    return false;
  }
  if (inputTeamID == "") {
    alert(`Team cannot be empty`);
    return false;
  }
  return true;
}

addPlayerForm.addEventListener("submit", async function (e) {
  // Prevent the form from submitting
  e.preventDefault();

  let inputPlayerName = document.getElementById("input-pname").value;
  let inputHeight = document.getElementById("input-height").value;
  let inputPosition = document.getElementById("input-position").value;
  let inputNumber = document.getElementById("input-number").value;
  let inputTeamID = document.getElementById("input-teamID").value;

  if (!validateForm()) {
    return false;
  }

  let data = {
    playerName: inputPlayerName,
    height: inputHeight,
    position: inputPosition,
    number: inputNumber,
    teamID: inputTeamID,
  };

  fetch("/players/create", {
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
        console.log("Error adding player");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

// EDIT PLAYER
let editPlayerForm = document.getElementById("player-edit-form");

editPlayerForm.addEventListener("submit", async function (e) {
  // Prevent the form from submitting
  e.preventDefault();

  let id = document.getElementById("input-id").value;
  let inputPlayerName = document.getElementById("input-pname").value;
  let inputHeight = document.getElementById("input-height").value;
  let inputPosition = document.getElementById("input-position").value;
  let inputNumber = document.getElementById("input-number").value;
  let inputTeamID = document.getElementById("input-teamID").value;

  if (!validateForm()) {
    return false;
  }

  let data = {
    playerName: inputPlayerName,
    height: inputHeight,
    position: inputPosition,
    number: inputNumber,
    teamID: inputTeamID,
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

// UPDATE PLAYER

async function deletePlayer(playerID, playerName) {
    let userConfirmation = window.confirm(
      `Are you sure you want to delete ${playerName}?`
    );
    if (userConfirmation) {
      // OK to delete
      let data = {
        playerID: playerID,
      };
  
      fetch("/players/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          if (res.ok) {
            window.location.href = "/players";
          } else {
            console.log("Error deleting player");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }
  
  async function editPlayer(playerID) {
    window.location.href = `/players/edit/${playerID}`;
  }
  