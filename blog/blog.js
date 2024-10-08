function loadHTML(page) {
    fetch(`${page}.html`)
        .then(response => response.text())
        .then(text => document.getElementById('markdown').innerHTML = text);
}

loadHTML("/home")

addEventListener("hashchange", (event) => {});
onhashchange = (event) => {console.log(location.hash.substring(1)); loadHTML(location.hash.substring(1));};