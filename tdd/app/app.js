//sorry for strange variable names
var hex = document.getElementById('hex');
var rgb = document.getElementById('rgb');
var R = document.getElementById('R');
var G = document.getElementById('G');
var B = document.getElementById('B');
var hexInput = document.getElementById('hex-input');
hexInput.addEventListener('click', function() {
    try {
        var color = Color.fromHexColor(hex.value);
        document.body.style.backgroundColor = `rgb(${color.red}, ${color.green}, ${color.blue})`;
        R.value = color.red;
        G.value = color.green;
        B.value = color.blue;
    } catch (e) {
        alert('wrong hex color');
    }
});
rgb.addEventListener('click', function() {
    try {
        var r = Number.parseInt(R.value);
        var g = Number.parseInt(G.value);
        var b = Number.parseInt(B.value);
        var color = Color.fromRGBColor(r, g, b);
        document.body.style.backgroundColor = `rgb(${color.red}, ${color.green}, ${color.blue})`;
        hex.value = color.toHexColor();
    } catch (e) {
        alert('wrong rgb color');
    }
});
