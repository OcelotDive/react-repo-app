const axios = require('axios');
// these are mini functions that comprise the main getUserData function.
function getProfile(username) {
    return axios.get("https://api.github.com/users/" + username)
         .then(function(user) {
        return user.data;
});
}

/*getProfile('tylermcginnis')
    .then(function(data) {
    
});*/

function gitRepos(username) {
 
    return axios.get('https://api.github.com/users/' + username + '/repos')
             

}


function getStarCount(repos) {
    return repos.data.reduce((count, repo) => {
        return count + repo.stargazers_count;
    })
}

function calculateScore(profile, repos) {
    const followers = profile.followers;
    const totalStars = getStarCount(repos);
    
    return (followers * 3) + totalStars;
}

function handleError (error) {
    console.warn(error);
    return null;
    
}
//axios.all returns an array of promises
function getUserData(player) {
    return axios.all([
        getProfile(player),
        gitRepos(player)
    ]).then((data) => {
        console.log(data)
        const profile = data[0];
        const repos = data[1];
        
        return {
            profile: profile, 
            score: calculateScore(profile, repos)
        }
        
    })
}

function sortPlayers(players) {
    return players.sort((a,b) => {
        return b.score - a.score;
    })
}
//players.map will return a new array with each index containing an object returned //from the
//getUserData function which is just the same as passing an inline callback to .map
module.exports = {
    battle: function (players) {
      return axios.all(players.map(getUserData))
        .then(sortPlayers)
        .catch(handleError)
    },
    fetchPopularRepos: function(lang) {
        const encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language: '+ lang + '&sort=stars&order=desc&type=Repositories');
        
        return axios.get(encodedURI)
                .then((response)=> {
            return response.data.items;
        })
    }
}