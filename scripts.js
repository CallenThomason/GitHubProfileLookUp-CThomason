
// ---- data ------
const octocat = {
    login: "octocat",
    id: 583231,
    node_id: "MDQ6VXNlcjU4MzIzMQ==",
    avatar_url: "https://avatars.githubusercontent.com/u/583231?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/octocat",
    html_url: "https://github.com/octocat",
    followers_url: "https://api.github.com/users/octocat/followers",
    following_url: "https://api.github.com/users/octocat/following{/other_user}",
    gists_url: "https://api.github.com/users/octocat/gists{/gist_id}",
    starred_url: "https://api.github.com/users/octocat/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/octocat/subscriptions",
    organizations_url: "https://api.github.com/users/octocat/orgs",
    repos_url: "https://api.github.com/users/octocat/repos",
    events_url: "https://api.github.com/users/octocat/events{/privacy}",
    received_events_url: "https://api.github.com/users/octocat/received_events",
    type: "User",
    user_view_type: "public",
    site_admin: false,
    name: "The Octocat",
    company: "@github",
    blog: "https://github.blog",
    location: "San Francisco",
    email: null,
    hireable: null,
    bio: null,
    twitter_username: null,
    public_repos: 8,
    public_gists: 8,
    followers: 24770,
    following: 9,
    created_at: "2011-01-25T18:44:36Z",
    updated_at: "2026-10-22T11:50:51Z"
}


// ---- elements ----

const newUser = document.getElementById("new-user");
const searchButton = document.getElementById("search-user");
const userOutput = document.getElementById("output");
const userNum = document.getElementById("num"); 
const userImage = document.getElementById("image"); 
const url = "https://api.github.com/users/";
// ---- functions -----
function searchUser() {
    userOutput.replaceChildren();
    userNum.replaceChildren(); 
    userImage.replaceChildren(); 
    const user = document.createElement("p");
    const image = document.createElement("img");
    const id = document.createElement("p");
    const repos = document.createElement("p");
    const pg = document.createElement("p");
    const followers = document.createElement("p");
    const following = document.createElement("p");
    let exists = false;
    
    const newURL = url + newUser.value;


    if (newUser.value !== "") {
        const data = fetch(newURL) //newURL
            .then((response) => {
                exists = response.ok;
                console.log(response.status, response.ok);
                return response.json();
            })
            .then((data) => {
                console.log(data.username);
                if (exists) {
                    user.textContent = data.name;
                    image.src = data.avatar_url;
                    image.width = 160;
                    image.height = 120;
                    image.alt = `{data.username}'s profile picture`;
                    id.textContent = `Id: ${data.id}`;
                    
                     repos.textContent =`Repos: ${data.public_repos}` ;
                     pg.textContent = `Gists: ${ data.public_gists}`;
                   followers.textContent = `Followers: ${data.followers}`;
                   following.textContent = `Following: ${data.following}`; 
                    user.classList.remove("empty");
                    user.classList.add("title");
                    image.classList.add("imageBorder"); 
                }
                else {
                    user.textContent = "This user does not exist";
                    user.classList.add("empty");

                }
            });
    }
    else {
        user.textContent = "No user Searched";
        user.classList.add("empty");
    }
    console.log(exists);

    if (!exists) {
        user.textContent = "This user does not exist";

    }



    userOutput.appendChild(user);

    //start of testing
    //   user.textContent = octocat.name;
    //                 image.src = octocat.avatar_url;
    //                 image.width = 160;
    //                 image.height = 120;
    //                 image.alt = `{data.username}'s profile picture`;
    //                 id.textContent = `Id: ${octocat.id}`;
                    
    //                  repos.textContent =`Repos: ${octocat.public_repos}` ;
    //                  pg.textContent = ` Gists: ${ octocat.public_gists}`;
    //                followers.textContent = `Followers: ${octocat.followers}`;
    //                following.textContent = `Following: ${octocat.following}`; 
    //                 user.classList.remove("empty");
    //                 user.classList.add("title");
    //                 userNum.appendChild(id);
    //     userNum.appendChild(repos);
    //      userNum.appendChild(pg);
    //      userNum.appendChild(following);
    //      userNum.appendChild(followers);
    //     userImage.appendChild(image);
       // end of testing

    if (newUser.value !== "") {
        userNum.appendChild(id);
         userNum.appendChild(repos);
         userNum.appendChild(pg);
         userNum.appendChild(following);
         userNum.appendChild(followers);
        userImage.appendChild(image);

    
    }
    newUser.value = "";

}

// ---- listeners ----- 

searchButton.addEventListener("click", searchUser);

// ---- run on load ----- 
searchUser(); 