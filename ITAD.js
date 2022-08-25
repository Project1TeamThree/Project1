var requestUrl = "https://api.isthereanydeal.com/v01/game/prices/?pretty&key=2afc79d7442b1d5fd726834b16f3974d9bb17def&plains=";
var requestUrl2 = "https://api.isthereanydeal.com/v02/game/plain/?key=2afc79d7442b1d5fd726834b16f3974d9bb17def&title="
var gameName
var rList = document.getElementById("results-area2")
function priceData(list){
    fetch(requestUrl + list)
    .then((response) => response.json())
    .then((data) => {
        displayITAD(data)
    })
}

function displayITAD(data){
    // console.log(data)
    for (x in data) {
        let itadData = data[x];
        console.log("ITAD_TEST",itadData);
    }
    // for (let i = 0; i < data.length; i++) {
    //     var List = document.createElement('li');
    //     List.textContent = data[i];
    //     rList.append(List);
    // }
    
}



document.getElementById("searchButton").addEventListener('click', function(){
    gameName = document.getElementById("city").value;
    priceData(gameName)
})