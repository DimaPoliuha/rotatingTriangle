'use strict';

var canvas = document.getElementById( 'canvas' );
var ctx = canvas.getContext( '2d' );

canvas.width = 500;
canvas.height = 500;

var documentCoordinates = {
    centerDocumentPositionX: ( window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth ) / 2,
    centerDocumentPositionY: ( window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight ) / 2,
};
var canvasCoordinates = {
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

    //rotatingAngle = rotatingAngle * ( Math.PI / 180 );//переводим градусы в радианы
    ctx.save();//сохраняем поворот канваса
    ctx.translate( canvasCoordinates.canvasCenterX, canvasCoordinates.canvasCenterY );//смещаем оси координат канваса
    
            // находим текущий угол вращения (нулевой угол = горизонтально вправо)
            var offset = {
                dx: event.pageX - documentCoordinates.centerDocumentPositionX,
                dy: event.pageY - documentCoordinates.centerDocumentPositionY
            };
            var rotatingAngle = Math.atan(offset.dy / offset.dx) + Math.PI / 2;
            if (offset.dx < 0) rotatingAngle += Math.PI;
    
    
    
    ctx.rotate( rotatingAngle );//вращаем оси



    ctx.translate( -canvasCoordinates.canvasCenterX, -canvasCoordinates.canvasCenterY );//возвращаем оси в обычное положение
    
    drawTriangle( 70, 100 );

    ctx.restore();//восстанавливаем настройки канваса
};

function drawTriangle( baseSide, side ){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var median = Math.sqrt( Math.pow( side, 2 ) - Math.pow( baseSide, 2 ) / 4 );

    var triangleCoordinates = {
        trianglePointTopX: canvasCoordinates.canvasCenterX,
        trianglePointTopY: canvasCoordinates.canvasCenterY - median * 2 / 3,
        trianglePointBottomLeftX: canvasCoordinates.canvasCenterX - baseSide / 2,
        trianglePointBottomRightX: canvasCoordinates.canvasCenterX + baseSide / 2,
        trianglePointBottomY: canvasCoordinates.canvasCenterY + median / 3
    };

    ctx.beginPath();
    ctx.moveTo( triangleCoordinates.trianglePointTopX, triangleCoordinates.trianglePointTopY );
    ctx.lineTo( triangleCoordinates.trianglePointBottomLeftX, triangleCoordinates.trianglePointBottomY );
    ctx.lineTo( triangleCoordinates.trianglePointBottomRightX, triangleCoordinates.trianglePointBottomY );
    ctx.closePath();
    ctx.stroke();
}