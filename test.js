function loadHTML() {
    fetch('testOutput.html')
        .then(response => response.text())
        .then(text => document.getElementById('markdown').innerHTML = text);
}

loadHTML()