let editCoachForm = document.getElementById("coach-edit-form");

editCoachForm.addEventListener("submit", async function (e) {
  // Prevent the form from submitting
  e.preventDefault();

  let inputID = document.getElementById("input-id");
  let inputCoachName = document.getElementById("input-cname");
  let inputStyle = document.getElementById("input-style");
  let inputExperience = document.getElementById("input-experience");
  let inputWin = document.getElementById("input-win");
  let inputLoss = document.getElementById("input-loss");
  let inputTeamID = document.getElementById("input-teamID");

  let id = inputID.value;
  let coachNameValue = inputCoachName.value;
  let styleValue = inputStyle.value;
  let experienceValue = inputExperience.value;
  let winValue = inputWin.value;
  let lossValue = inputLoss.value;
  let teamIDValue = inputTeamID.value;

  let data = {
    coachName: coachNameValue,
    style: styleValue,
    experience: experienceValue,
    win: winValue,
    loss: lossValue,
    teamID: teamIDValue,
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
