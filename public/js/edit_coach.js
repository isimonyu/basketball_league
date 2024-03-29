let editCoachForm = document.getElementById("coach-edit-form");

function validateForm() {
  let inputCoachName = document.getElementById("input-cname").value;
  let inputStyle = document.getElementById("input-style").value;
  let inputExperience = document.getElementById("input-experience").value;
  let inputWin = document.getElementById("input-win").value;
  let inputLoss = document.getElementById("input-loss").value;
  let inputTeamID = document.getElementById("input-cteamID").value;

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

editCoachForm.addEventListener("submit", async function (e) {
  // Prevent the form from submitting
  e.preventDefault();

  let id = document.getElementById("input-id").value;
  let inputCoachName = document.getElementById("input-cname").value;
  let inputStyle = document.getElementById("input-style").value;
  let inputExperience = document.getElementById("input-experience").value;
  let inputWin = document.getElementById("input-win").value;
  let inputLoss = document.getElementById("input-loss").value;
  let inputTeamID = document.getElementById("input-cteamID").value;

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
