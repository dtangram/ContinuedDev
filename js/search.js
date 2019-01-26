const request = new XMLHttpRequest();
const searchField = document.getElementById("searchInput");
const magnifyGlass = document.querySelector("#listen form div button");
// const headerTwo = document.querySelector(".container > h2");
const submit = document.querySelector(".container > button");

searchField.focus();

function queryInput(){
  const api = "http://ws.audioscrobbler.com/2.0/?method=album.search&album=" + searchField.value + "&api_key=eed52d1ba57c50e9025f090b596fd40f&format=json";
  runQuery(api);
}

document.querySelector("form").addEventListener('submit', function(e){
  e.preventDefault();

  if(searchField.value <= 0){
    document.querySelector("form p").style.opacity = "1";
    document.querySelector("form p").innerHTML = "You must type a search keyword";
  }

  else if(searchField.value > 0 || searchField.value != 0){
    // headerTwo.style.opacity = "1";
    queryInput();
    $("#listen > article").css("display", "none");
    document.querySelector("form p").style.opacity = "0";
  }
});

magnifyGlass.addEventListener("click", function(){
  if(searchField.value <= 0){
    document.querySelector("form p").style.opacity = "1";
    document.querySelector("form p").innerHTML = "You must type a search keyword";
  }

  else if(searchField.value > 0 || searchField.value != 0){
    // headerTwo.style.opacity = "1";
    queryInput();
    $("#listen > article").css("display", "none");
    document.querySelector("form p").style.opacity = "0";
  }
});

function runQuery(url){
  request.open("GET", url, true);

  request.onload = function(){
    if(request.status >= 200 && request.status < 400){
      const jsonObj = JSON.parse(request.responseText);

      let queryInfo = "";

      // if(jsonObj.results.albummatches.album.length <= 0){
      //   document.querySelector(".container > h2").innerHTML = "No results for " + searchField.value;
      // }
      //
      // else{
      //   headerTwo.innerHTML = "Results for " + searchField.value;
      // }

      for(let i = 0; i < jsonObj.results.albummatches.album.length; i++){
          queryInfo += "<a class='col-sm-12 col-md-12 col-lg-2' href='player.html'>";
          queryInfo += "<article>";
          queryInfo += "<p><span>" + jsonObj.results.albummatches.album[i].name + "</span></p>";
          queryInfo += "<p>" + jsonObj.results.albummatches.album[i].artist + "</p>";
          queryInfo += "<img src='" + jsonObj.results.albummatches.album[i].image[3]['#text'] + "' title='" + jsonObj.results.albummatches.album[i].name + " by " + jsonObj.results.albummatches.album[i].artist + " " + "' alt='" + jsonObj.results.albummatches.album[i].name + " by " + jsonObj.results.albummatches.album[i].artist + "'>";
          queryInfo += "</article>";
          queryInfo += "</a>";
      }

      const contentLocationInfo = document.querySelector(".searchResults");
      contentLocationInfo.innerHTML = queryInfo;

      console.log(jsonObj);
    }
  };

  request.onerror = function(){
    console.log("connection error");
  };

  request.send();
}
