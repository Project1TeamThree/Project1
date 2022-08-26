console.log("Hello")
var requestUrl = "https://api.isthereanydeal.com/v01/game/prices/?key=2afc79d7442b1d5fd726834b16f3974d9bb17def&plains=";
var requestUrl2 = "https://api.isthereanydeal.com/v02/game/plain/?key=2afc79d7442b1d5fd726834b16f3974d9bb17def&title="
var gameName
var rList = document.getElementById("ITAD")
function priceData(){
    fetch(requestUrl)
    .then((response) => response.json())
    .then((data) => {
        displayITAD(data)
    })
}

function displayITAD(data){
    console.log(data)
    testdata = data["data"]
    console.log(testdata);
    for (x in testdata) {
        let itadData = testdata[x];
        console.log("ITAD_TEST",itadData);
    for (x in itadData){
        let dataspin = itadData[x];
        console.log(dataspin);
    for (x in dataspin) {
        let datafinal = dataspin[x];
        console.log("plz:", datafinal);
        gamePrice = document.createElement('li');
        gamePrice.textContent = datafinal.shop.name;
        rList.append(gamePrice)
    }
    }

    }
    // for (let i = 0; i < data.length; i++) {
    //     var List = document.createElement('li');
    //     List.textContent = data[i];
    //     rList.append(List);
    // }
    
}



document.getElementById("searchButton").addEventListener('click', function(){
    gameName = document.getElementById("searchBar").value;
    priceData(gameName)
})