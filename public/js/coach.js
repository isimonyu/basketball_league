//ADD COACH

let addCoachForm = document.getElementById("coach-create-form");

function validateForm() {
  let inputCoachName = document.getElementById("input-cname").value;
  let inputStyle = document.getElementById("input-style").value;
  let inputExperience = document.getElementById("input-experience").value;
  let inputWin = document.getElementById("input-win").value;
  let inputLoss = document.getElementById("input-loss").value;
  let inputTeamID = document.getElementById("input-teamID").value;

  if (inputCoachName.length <= 0) {
    alert(`Coach name cannot be empty`);
    return false;
  }
  if (inputStyle.length <= 0) {
    alert(`Coaching style cannot be empty`);
    return false;
  }
  if (inputExperience < 0) {
    alert(`Coaching experience cannot be negative`);
    return false;
  }
  if (inputWin < 0) {
    alert(`Coaching wins cannot be negative`);
    return false;
  }
  if (inputLoss < 0) {
    alert(`Coaching losses cannot be negative`);
    return false;
  }
  if (inputTeamID == "") {
    alert(`Team cannot be empty`);
    return false;
  }
  return true;
}

addCoachForm.addEventListener("submit", async function (e) {
  // Prevent the form from submitting
  e.preventDefault();

  let inputCoachName = document.getElementById("input-cname").value;
  let inputStyle = document.getElementById("input-style").value;
  let inputExperience = document.getElementById("input-experience").value;
  let inputWin = document.getElementById("input-win").value;
  let inputLoss = document.getElementById("input-loss").value;
  let inputTeamID = document.getElementById("input-teamID").value;

  if (!validateForm()) {
    return false;
  }

  let data = {
    coachName: inputCoachName,
    style: inputStyle,
    experience: inputExperience,
    win: inputWin,
    loss: inputLoss,
    teamID: inputTeamID,
  };

  fetch("/coaches/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) {
        window.location.href = "/coaches";
      } else {
        console.log("Error adding coach");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});


// EDIT COACH

let editCoachForm = document.getElementById("coach-edit-form");


editCoachForm.addEventListener("submit", async function (e) {
  // Prevent the form from submitting
  e.preventDefault();

  let id = document.getElementById("input-id".value);
  let inputCoachName = document.getElementById("input-cname").value;
  let inputStyle = document.getElementById("input-style").value;
  let inputExperience = document.getElementById("input-experience").value;
  let inputWin = document.getElementById("input-win").value;
  let inputLoss = document.getElementById("input-loss").value;
  let inputTeamID = document.getElementById("input-teamID").value;

  if (!validateForm()) {
    return false;
  }

  let data = {
    coachName: inputCoachName,
    style: inputStyle,
    experience: inputExperience,
    win: inputWin,
    loss: inputLoss,
    teamID: inputTeamID,
  };

  fetch(`/coaches/edit/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) {
        window.location.href = "/coaches";
      } else {
        console.log("Error editing coach");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});


// UPDATE COACH
async function deleteCoach(coachID, coachName) {
    let userConfirmation = window.confirm(
      `Are you sure you want to delete ${coachName}?`
    );
    if (userConfirmation) {
      // OK to delete
      let data = {
        coachID: coachID,
      };
  
      fetch("/coaches/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          if (res.ok) {
            window.location.href = "/coaches";
          } else {
            console.log("Error deleting coach");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }
  
  async function editCoach(coachID) {
    window.location.href = `/coaches/edit/${coachID}`;
  }
  