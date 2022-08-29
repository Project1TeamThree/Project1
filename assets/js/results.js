var searchedGameName = window.location.search.slice(3)

var gameNameDisplay = document.getElementById('searchedGame')

gameNameDisplay.textContent = searchedGameName;