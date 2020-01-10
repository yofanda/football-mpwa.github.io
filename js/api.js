const API_KEY = "4070d4803d6e46798ead7e9e55675510";
const BASE_URL = "https://api.football-data.org/v2/";

const LEAGUE_ID = 2021;

const TOP_SCORERS = `${BASE_URL}competitions/${LEAGUE_ID}/scorers`;
const ENDPOINT_COMPETITION = `${BASE_URL}competitions/${LEAGUE_ID}/standings`;
const TIM_FAVORIT = `${BASE_URL}competitions/${LEAGUE_ID}/teams`;


const fetchAPI = url => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': API_KEY
        }
    })
    .then(res => {
        if (res.status !== 200) {
            console.log("Error: " + res.status);
            return Promise.reject(new Error(res.statusText))
        } else {
            return Promise.resolve(res)
        }
    })
    .then(res => res.json())
    .catch(err => {
        console.log(err)
    })
};

function getTopScorers() {
    if ("caches" in window) {
        caches.match(TOP_SCORERS).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    console.log("Scorers Data: " + data);
                    showTopScorer(data);
                })
            }
        })
    }

    fetchAPI(TOP_SCORERS)
    .then(data => {
        showTopScorer(data);
    })
    .catch(error => {
        console.log(error)
    })
}

function showTopScorer(data) {
    let scorers = "";
    let scorerElement =  document.getElementById("homeScorer");
    var noo = 1;

    data.scorers.forEach(function (scorer) {
        scorers += `
        <tr>
        <td>${noo++}</td>
        <td>${scorer.player.name}</td>
        <td>${scorer.team.name}</td>
        <td>${scorer.numberOfGoals}</td>
        </tr>
        `;
    });

    scorerElement.innerHTML = `
    <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">

    <table class="striped responsive-table">
    <thead>
    <tr>
    <th>No</th>
    <th>Name</th>
    <th>Team</th>
    <th>Goals</th>
    </tr>
    </thead>
    <tbody id="scorers">
    ${scorers}
    </tbody>
    </table>

    </div>
    `;
}

function getAllStandings() {
    if ("caches" in window) {
        caches.match(ENDPOINT_COMPETITION).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    console.log("Competition Data: " + data);
                    showStanding(data);
                })
            }
        })
    }

    fetchAPI(ENDPOINT_COMPETITION)
    .then(data => {
        showStanding(data);
    })
    .catch(error => {
        console.log(error)
    })
}

function getTimFavorits() {
    if ("caches" in window) {
        caches.match(TIM_FAVORIT).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    console.log("Tim Data: " + data);
                    showIndexApi(data);
                })
            }
        })
    }

    fetchAPI(TIM_FAVORIT)
    .then(data => {
        showIndexApi(data);
    })
    .catch(error => {
        console.log(error)
    })
}

function showIndexApi(data) {
    let tim_favorit = "";
    let timElement =  document.getElementById("showIndexApi");
    let noo = 1;

    data.teams.forEach(function (team) {
        tim_favorit += `
        <tr>
        <td>${noo++}</td>
        <td>${team.id}
        <input id="favteamId${team.id}" type="text" value="${team.id}" hidden>
        </td>
        <td><img src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/></td>
        <td>${team.name}
        <input id="favteamName${team.id}" type="text" value="${team.name}" hidden>
        </td>
        <td>${team.website}
        <input id="favteamWeb${team.id}" type="text" value="${team.website}" hidden>
        </td>
        <td>${team.venue}
        <input id="favteamVenue${team.id}" type="text" value="${team.venue}" hidden>
        </td>
        <td><button id="${team.id}" class="favteamButton">save</button></td>
        </td>
        </tr>
        `;
    });

    timElement.innerHTML = `
    <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">

    <table class="striped responsive-table" style="font-size:10px">
    <thead>
    <tr>
    <th>No</th>
    <th>Id</th>
    <th>Logo</th>
    <th>Name</th>
    <th>Website</th>
    <th>Vanue</th>
    <th>Action</th>

    </tr>
    </thead>
    <tbody id="scorersapi">
    ${tim_favorit}
    </tbody>
    </table>

    </div>
    <h5>Tabel Team Favorit</h5>
    <table class="striped" style="font-size:10px">
    <thead>
    <tr>
    <th>Id</th>
    <th>Name</th>
    <th>Website</th>
    <th>Vanue</th>
    <th>Action</th>
    </tr>
    </thead>
    <tbody id="favteamRow"></tbody>
    </table>
    `;

    let favteamButtons = document.querySelectorAll(".favteamButton");
    for(let button of favteamButtons) {
     button.addEventListener("click", function (event) {
         let teamId = event.target.id;

         const inputFavTeamId = document.querySelector("#favteamId"+teamId);
         const inputFavTeamName = document.querySelector("#favteamName"+teamId);
         const inputFavTeamWeb = document.querySelector("#favteamWeb"+teamId);
         const inputFavTeamVenue = document.querySelector("#favteamVenue"+teamId);
         insertFavteam();
        // console.log(inputFavTeamName);
 
         function insertFavteam() {
            const favteam = {
                favteamId: inputFavTeamId.value,
                favteamName: inputFavTeamName.value,
                favteamWeb: inputFavTeamWeb.value,
                favteamVenue: inputFavTeamVenue.value
            };

            console.log(favteam);

            dbInsertFavteam(favteam).then(() => {
                        showAllFavteam()
            })
        }
    })
 }
      function showAllFavteam() {
      // let nobarsRow = "";
      var content = document.getElementById('favteamRow').innerHTML;
      // alert(content);
      dbGetAllFavteam().then(favteams => {
         let listFavsInText = "";
         favteams.forEach(favteam => {
             listFavsInText += `
             <tr>
             <td>${favteam.favteamId}</td>
             <td>${favteam.favteamName}</td>
             <td>${favteam.favteamWeb}<a href="google.com"></td>
             <td>${favteam.favteamVenue}</td>
             <td><button id="${favteam.favteamId}" class="removeButton">Remove</button></td>
             </tr>
             `;
         });
         favteamRow.innerHTML = listFavsInText;

         let removeButtons = document.querySelectorAll(".removeButton");
         for(let button of removeButtons) {
             button.addEventListener("click", function (event) {
                 let favteamId = event.target.id;
                 dbDeleteFavteam(favteamId).then(() => {
                     showAllFavteam()
                 })
             })
         }
     })
  }
   showAllFavteam()
}

function showStanding(data) {
    let standings = "";
    let standingElement =  document.getElementById("homeStandings");
    var no = 1;
    data.standings[0].table.forEach(function (standing) {
        standings += `
        <tr>
        <td>${no++}</td>
        <td><img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/></td>
        <td>${standing.team.name}</td>
        <td>${standing.won}</td>
        <td>${standing.draw}</td>
        <td>${standing.lost}</td>
        <td>${standing.points}</td>
        <td>${standing.goalsFor}</td>
        <td>${standing.goalsAgainst}</td>
        <td>${standing.goalDifference}</td>
        </tr>
        `;
    });

    standingElement.innerHTML = `
    <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">

    <table class="striped responsive-table">
    <thead>
    <tr>
    <th>No</th>
    <th></th>
    <th>Team Name</th>
    <th>W</th>
    <th>D</th>
    <th>L</th>
    <th>P</th>
    <th>GF</th>
    <th>GA</th>
    <th>GD</th>
    </tr>
    </thead>
    <tbody id="standings">
    ${standings}
    </tbody>
    </table>

    </div>
    `;
}


function showNobar() {
    let nobarElement =  document.getElementById("nobarIndexdb");

    nobarElement.innerHTML = `
    <form>
    <label for="nobarId">Id Nobar: </label><input id="nobarId" type="number">
    <label for="nobarName">Pertandingan:  </label > <input id="nobarName" type="text">
    <label for="nobarWaktu">Waktu Nobar: </label><input id="nobarWaktu" type="text">
    <label for="nobarTempat">Tempat Nobar: </label><input id="nobarTempat" type="text">
    <a class="waves-effect waves-light btn" id="save"><i class="material-icons left">save</i>Simpan</a>
    </form>
    <div>
    <table>
    <thead>
    <tr>
    <th>Id Nobar</th>
    <th>Pertandingan</th>
    <th>Pukul</th>
    <th>Tempat</th>
    <th>Action</th>
    </tr>
    </thead>
    <tbody id="nobarsRow"></tbody>
    </table>
    </div>
    `;
    document.addEventListener("DOMContentLoaded", function () {

    });

    var save = document.getElementById("save");

    const nobarsRow = document.querySelector("#nobarsRow");
    const inputNobarId = document.querySelector("#nobarId");
    const inputNobarName = document.querySelector("#nobarName");
    const inputNobarWaktu = document.querySelector("#nobarWaktu");
    const inputNobarTempat = document.querySelector("#nobarTempat");

    save.onclick = function () {
        console.log("Tombol Save di klik.");
        insertNobar();
    }

    function insertNobar() {
        const nobar = {
            nobarId: inputNobarId.value,
            nobarName: inputNobarName.value,
            nobarWaktu: inputNobarWaktu.value,
            nobarTempat: inputNobarTempat.value
        };

        // console.log(nobar);

        dbInsertNobar(nobar).then(() => {
            showAllNobar()
        })
    }

    function showAllNobar() {
      // let nobarsRow = "";
      var content = document.getElementById('nobarsRow').innerHTML;
      // alert(content);
      dbGetAllNobar().then(nobars => {
         let listNobarsInText = "";
         nobars.forEach(nobar => {
             listNobarsInText += `
             <tr>
             <td>${nobar.nobarId}</td>
             <td>${nobar.nobarName}</td>
             <td>${nobar.nobarWaktu}</td>
             <td>${nobar.nobarTempat}</td>
             <td><button id="${nobar.nobarId}" class="removeButton">Remove</button></td>
             </tr>
             `;
         });
         nobarsRow.innerHTML = listNobarsInText;

         let removeButtons = document.querySelectorAll(".removeButton");
         for(let button of removeButtons) {
             button.addEventListener("click", function (event) {
                 let nobarId = event.target.id;
                 dbDeleteNobar(nobarId).then(() => {
                     showAllNobar()
                 })
             })
         }
     })
  }

  showAllNobar()
}


