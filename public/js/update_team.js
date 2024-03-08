async function deleteTeam(teamID, teamName) {
  let userConfirmation = window.confirm(
    `Are you sure you want to delete ${teamName}?`
  );
  if (userConfirmation) {
    // OK to delete
    let data = {
      teamID: teamID,
    };

    fetch("/teams/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          window.location.href = "/teams";
        } else {
          console.log("Error deleting team");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}

async function editTeam(teamID) {
  window.location.href = `/teams/edit/${teamID}`;
}
