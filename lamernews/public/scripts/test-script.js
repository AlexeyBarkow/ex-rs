require('../styles/test-style.css')

function test() {
    let div = document.createElement('div');
    div.innerHTML = "<p>Me here</p>";
    return div.children[0];
}
module.exports = test;

if(module.hot) {
    module.hot.accept('../styles/test-style.css', function() {
        require('../styles/test-style.css');
    })
}
