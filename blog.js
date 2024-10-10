function loadHTML(page) {
    fetch(`${page}.html`)
        .then(response => response.text())
        .then(text => document.getElementById('body').innerHTML = 
        `<section id="markdown">${text}</section>`);
}

loadHTML("/home")

addEventListener("hashchange", (event) => {});
onhashchange = (event) => {console.log(location.hash.substring(1)); loadHTML(location.hash.substring(1));};