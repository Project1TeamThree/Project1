// console.log("hi");
var requestUrlCheapShark = "https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15";
var userInput
var resultList = document.getElementById("card-content")

requestUrlCheapShark = "https://www.cheapshark.com/api/1.0/games?title="
// function getMarket(){
//     fetch(requestUrl)
//     .then((response) => response.json())
//     .then((data) => console.log(data));
// }

function testFunction(){
    console.log(userInput)
}

function display(data){
    for (let i = 0; i < data.length; i++){
        var newLi = document.createElement('li');
        newLi.textContent = data[i].internalName;
        resultList.append(newLi)
    }
}

function getMarket (title){
    fetch(requestUrlITAD + title)
    .then((response) => response.json())
    .then((data) => {
        console.log("DATA1:", data)
        display(data)
    });
}

function getMarketTwo(title){
    fetch(requestUrlCheapShark + title + "&limit=5")
    .then((response) => response.json())
    .then((data) => {
        console.log("DATA2:", data)
        display(data)
    });
}



document.getElementById('searchButton').addEventListener('click', function(){
    userInput = document.getElementById("searchBar").value;
    getMarket(userInput);
    getMarketTwo(userInput);
})
