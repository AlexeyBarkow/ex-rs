function test() {
    let div = document.createElement('div');
    div.innerHTML = "<p>Me here</p>";
    return div.children[0];
}
module.exports = test;
