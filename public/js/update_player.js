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
