let editTeamForm = document.getElementById("team-edit-form");

function validateForm() {
  let inputTeamName = document.getElementById("input-tname").value;
  let inputCity = document.getElementById("input-city").value;

  if (inputTeamName == "") {
    alert(`Team Name cannot be empty.`);
    return false;
  }
  if (inputCity == "") {
    alert(`Team City cannot be empty.`);
    return false;
  }
  return true;
}

editTeamForm.addEventListener("submit", async function (e) {
  // Prevent the form from submitting
  e.preventDefault();

  let id = document.getElementById("input-id").value;
  let inputTeamName = document.getElementById("input-tname").value;
  let inputCity = document.getElementById("input-city").value;

  if (!validateForm()) {
    return false;
  }

  let data = {
    teamName: inputTeamName,
    city: inputCity,
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
