let addTeamForm = document.getElementById("team-create-form");

addTeamForm.addEventListener("submit", async function (e) {
  // Prevent the form from submitting
  e.preventDefault();

  let inputTeamName = document.getElementById("input-tname");
  let inputCity = document.getElementById("input-city");

  let teamNameValue = inputTeamName.value;
  let cityValue = inputCity.value;

  let data = {
    teamName: teamNameValue,
    city: cityValue,
  };

  fetch("/teams/create", {
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
        console.log("Error adding team");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
