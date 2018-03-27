'use strict';

let canvas = document.getElementById( 'canvas' );
let ctx = canvas.getContext( '2d' );

canvas.width = 500;
canvas.height = 500;

let triangleBaseSide = 70;
let triangleSide = 100;
triangleSide = (( triangleSide * 2 ) > triangleBaseSide ) ? triangleSide : ( triangleBaseSide / 2 + 1 );

let documentCoordinates = {
    centerDocumentPositionX: ( window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth ) / 2,
    centerDocumentPositionY: ( window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight ) / 2,
};
let canvasCoordinates = {
    canvasCenterX: canvas.width / 2,
    canvasCenterY: canvas.height / 2,
    canvasPositionLeft: documentCoordinates.centerDocumentPositionX - canvas.width / 2,
    canvasPositionTop: documentCoordinates.centerDocumentPositionY - ( canvas.height / 2 )
};

canvas.style.position = 'absolute';
canvas.style.left = canvasCoordinates.canvasPositionLeft + 'px';
canvas.style.top = canvasCoordinates.canvasPositionTop + 'px';

window.onload = function () {
    document.addEventListener( "mousemove", rotateTriangle, false );
}

function rotateTriangle( event ){
    ctx.save();
    ctx.translate( canvasCoordinates.canvasCenterX, canvasCoordinates.canvasCenterY );
    let triandleTranslation = {
        dx: event.pageX - documentCoordinates.centerDocumentPositionX,
        dy: event.pageY - documentCoordinates.centerDocumentPositionY
    };
    // arctg(y/x)  - angle of rotation (+ PI / 2) - rotate our triangle for correct starting position;
    let rotatingAngle = Math.atan( triandleTranslation.dy / triandleTranslation.dx ) + Math.PI / 2;
    // quarter check
    if ( triandleTranslation.dx < 0 ){
        rotatingAngle += Math.PI;
    }
    ctx.rotate( rotatingAngle );
    ctx.translate( -canvasCoordinates.canvasCenterX, -canvasCoordinates.canvasCenterY );
    drawTriangle();
    ctx.restore();
};

function drawTriangle(){
    ctx.clearRect( 0, 0, canvas.width, canvas.height );
    // intersection of medians is the center of mass of triangle
    let median = Math.sqrt( Math.pow( triangleSide, 2 ) - Math.pow( triangleBaseSide, 2 ) / 4 );
    let triangleCoordinates = {
        trianglePointTopX: canvasCoordinates.canvasCenterX,
        trianglePointTopY: canvasCoordinates.canvasCenterY - median * 2 / 3,
        trianglePointBottomLeftX: canvasCoordinates.canvasCenterX - triangleBaseSide / 2,
        trianglePointBottomRightX: canvasCoordinates.canvasCenterX + triangleBaseSide / 2,
        trianglePointBottomY: canvasCoordinates.canvasCenterY + median / 3
    };
    ctx.beginPath();
    ctx.moveTo( triangleCoordinates.trianglePointTopX, triangleCoordinates.trianglePointTopY );
    ctx.lineTo( triangleCoordinates.trianglePointBottomLeftX, triangleCoordinates.trianglePointBottomY );
    ctx.lineTo( triangleCoordinates.trianglePointBottomRightX, triangleCoordinates.trianglePointBottomY );
    ctx.closePath();
    ctx.stroke();
}