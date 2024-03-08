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
