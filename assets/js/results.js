var searchedGameName = window.location.search.slice(3);

var gameNameDisplay = document.getElementById('test-heading');

var searchHistoryArray = JSON.parse(localStorage.getItem('searchHistory'));

var results = document.getElementById('cheap-shark');

var dealLookupURL = 'https://www.cheapshark.com/api/1.0/games?id=';

var gameid = window.location.search.slice(3);

var histObj = searchHistoryArray.find(item => item.gameid == gameid);

var gametitle = histObj.title;



gameNameDisplay.textContent = searchedGameName.split('%20').join(' ');

document.getElementById('backButton').addEventListener('click', function(){
    document.location.href = './index.html'
})

fetch(dealLookupURL + gameid)