let editTeamForm = document.getElementById("team-edit-form");

editTeamForm.addEventListener("submit", async function (e) {
  // Prevent the form from submitting
  e.preventDefault();

  let inputID = document.getElementById("input-id");
  let inputTeamName = document.getElementById("input-tname");
  let inputCity = document.getElementById("input-city");

  let id = inputID.value;
  let teamNameValue = inputTeamName.value;
  let cityValue = inputCity.value;

  let data = {
    teamName: teamNameValue,
    city: cityValue,
  };

  fetch(`/teams/edit/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) {
        window.location.href = "/teams";
      } else {
        console.log("Error editing team");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
