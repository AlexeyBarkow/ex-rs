var Color = function(r, g, b) {
    this.red = r;
    this.green = g;
    this.blue = b;
}
Color.fromRGBColor = function(r, g, b) {
    if (typeof r !== 'number' || typeof g !== 'number' || typeof b !== 'number') {
        // console.log('Error thrown')
        throw new Error('Wrong arguments');
    }
    if (r < 0 || g < 0 || b < 0 || r > 255 || g > 255 || b > 255) {
        throw new Error('Wrong arguments');
    }
    return new Color(r,g,b);
}
Color.fromHexColor = function(hex) {
    console.log(hex);
    if (typeof hex !== 'string' || (hex.length !== 4 && hex.length !== 7) || hex[0] !== '#') {
        // console.log(typeof hex, hex.length, hex[0])
        throw new Error('Wrong arguments');
    }
    var r, g, b;
    if (hex.length === 4) {

        r = Number.parseInt(hex[1] + hex[1], 16);
        g = Number.parseInt(hex[2] + hex[2], 16);
        b = Number.parseInt(hex[3] + hex[3], 16);
    } else {
        r = Number.parseInt(hex.slice(1,3), 16);
        g = Number.parseInt(hex.slice(3,5), 16);
        b = Number.parseInt(hex.slice(5,7), 16);
    }
    // console.log(r,g,b);
    if (r < 256 && g < 256 && b < 256) {
        return new Color(r,g,b);
    }
        throw new Error('Wrong arguments');
}
// if (module) {
//     module.exports = Color;
// }
Color.prototype.toHexColor = function() {
    return '#'+this.red.toString(16) + this.green.toString(16) + this.blue.toString(16)
}
