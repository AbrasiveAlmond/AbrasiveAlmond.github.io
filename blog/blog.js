function loadHTML(page) {
    fetch(`blog/html/${page}.html`)
        .then(response => response.text())
        .then(text => document.getElementById('markdown').innerHTML = text);
}

loadHTML("test")

addEventListener("hashchange", (event) => {});
onhashchange = (event) => {console.log(location.hash.substring(1)); loadHTML(location.hash.substring(1));};