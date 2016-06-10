// 
// var chai = require('chai');
// var should = chai.should();
// var Color = require('../app/color.js')

describe('Color', function () {

    describe('#fromRGBColor()', function () {
        // console.log(MyNumber)
        it('should return the correct color', function () {
            Color.fromRGBColor(0,0,0).should.be.deep.equal({
                red: 0,
                green: 0,
                blue: 0
            });
        });

        it('should throw exception', function () {
            Color.fromRGBColor.bind(Color, 0, -1, 2).should.throw(Error);
        });

        it('should throw exception', function () {
            Color.fromRGBColor.bind(Color, 0, '', '').should.throw(Error);
        });
        it('should throw exception', function () {
            Color.fromRGBColor.bind(Color, '', '', '').should.throw(Error);
        });

        it('should throw exception', function () {
            Color.fromRGBColor.bind(Color, 'lor','em','ips').should.throw(Error);
        });
    });
    describe('#fromHexColor()', function () {
        it('should return the correct color', function () {
            Color.fromHexColor('#000000').should.be.deep.equal({
                red: 0,
                green: 0,
                blue: 0
            });
        });
        it('should return the correct color', function () {
            Color.fromHexColor('#ff0000').should.be.deep.equal({
                red: 255,
                green: 0,
                blue: 0
            });
        });
        it('should return the correct color', function () {
            Color.fromHexColor('#f00').should.be.deep.equal({
                red: 255,
                green: 0,
                blue: 0
            });
        });
        it('should throw exception', function () {
            Color.fromHexColor.bind(Color, '').should.throw(Error);
        });
        it('should throw exception', function () {
            Color.fromHexColor.bind(Color, '#loremi').should.throw(Error);
        });
        it('should throw exception', function () {
            Color.fromHexColor.bind(Color, '#fffffff').should.throw(Error);
        });

    });

});
