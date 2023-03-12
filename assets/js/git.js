async function getReposInfo(username) {
    const url = `https://api.github.com/users/${username}/repos`;
    const token = "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"; // добавляем токен

    const response = await fetch(url, {
        headers: {
            "Authorization": `Bearer ${token}` // добавляем заголовок Authorization
        }
    });
    const data = await response.json();
    const obj = map()
    function map() {data.map(info => {
        return {
            full_name: info.full_name,
            html_url: info.html_url,
            description: info.description,
            language: info.language,
            stargazers_count: info.stargazers_count,
            forks_count: info.forks_count
        };
    });
}

    return obj;
};

async function genTables() {
    const username = "Lertey";
    const repoNames = await getReposInfo(username);
    const body = document.getElementById("git-repos");

    for (let i = 0; i < repoNames.length; i++) {
        const repoData = await getRepositoryData(repoNames[i].full_name);
        const cardHtml = `
          <div class="card-git">
              <h2 class="card-git-name">${repoData.full_name}</h2>
              <p><a class="git-link" href="${repoData.html_url}">${repoData.html_url}</a></p>
              <p>${repoData.description ? repoData.description : "No description"}</p>
              <ul class="git-ul">
                <li><strong>Language:</strong> ${repoData.language ? repoData.language : "Not specified"}</li>
                <li><strong>Stars:</strong> ${repoData.stargazers_count}</li>
                <li><strong>Forks:</strong> ${repoData.forks_count}</li>
              </ul>
          </div>
        `;
        body.insertAdjacentHTML('beforeend', cardHtml);
    };
};

async function getRepositoryData(repoName) {
    const response = await fetch(`https://api.github.com/repos/${repoName}`);
    const data = await response.json();
    return {
        full_name: data.full_name,
        html_url: data.html_url,
        description: data.description,
        language: data.language,
        stargazers_count: data.stargazers_count,
        forks_count: data.forks_count
    };
};

genTables();
