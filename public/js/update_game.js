async function deleteGame(gameID, gameDate) {
  let userConfirmation = window.confirm(
    `Are you sure you want to delete game on ${gameDate}?`
  );
  if (userConfirmation) {
    // OK to delete
    let data = {
      gameID: gameID,
    };

    fetch("/games/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          window.location.href = "/games";
        } else {
          console.log("Error deleting game");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}

async function editGame(gameID) {
  window.location.href = `/games/edit/${gameID}`;
}
