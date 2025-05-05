let card = document.querySelector(".profile-card");
let input = document.querySelector(".inp");
let btn = document.querySelector(".btn");

async function getProfileData(username) {
    let raw1 = await fetch(`https://api.github.com/users/${username}`);
    if (!raw1.ok){
        card.innerHTML = "";
        alert("Invalid username. Try again!");
    }
    else {
        return raw1.json();
    }
}

function decorateCard(content) {
    let datas = `<div class="wrap"><img src="${content.avatar_url}" alt="Profile" class="avatar"/>
      <div class="user-info">
        <h2>${content.name}</h2>
        <p class="username">${content.login}</p>
        <p>${content.bio ? content.bio : "Sorry there is no bio..."}</p>
        <p><strong>Public Repos:</strong> ${content.public_repos} &nbsp; <strong>Followers:</strong> ${content.followers} &nbsp; <strong>Following:</strong> ${content.following} &nbsp; <strong>Location:</strong> ${content.location}</p>
        <p><strong>Company:</strong> ${content.company ? content.company : "N/A"} &nbsp; <strong>Blog:</strong> <a href="#">${content.blog ? content.blog : "N/A"}</a></p>
      </div>
      </div>`

    card.innerHTML = datas;
}

btn.addEventListener("click", () => {
    let username = input.value.trim();
    if (username.length > 0) {
        getProfileData(username).then(data => decorateCard(data))
    }
    else {
        alert("Type something first!!!");
    }
})