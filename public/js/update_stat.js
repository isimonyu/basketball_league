async function deleteStat(statID, playerName) {
  let userConfirmation = window.confirm(
    `Are you sure you want to delete ${playerName}'s stat line?`
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
  console.log(statID);
  window.location.href = `/stats/edit/${statID}`;
}
