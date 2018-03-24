'use strict';

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 500;

var coordinates = {
    canvasCenterX: canvas.width / 2,
    canvasCenterY: canvas.height / 2,
    windowWidth: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    windowHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
    centerDocumentPositionX: windowWidth / 2,
    centerDocumentPositionY: windowHeight / 2,
    canvasPositionLeft: centerDocumentPositionX - canvas.width / 2,
    canvasPositionTop: centerDocumentPositionY - ( canvas.height / 2 )
};
var canvasCenterX = canvas.width / 2;
var canvasCenterY = canvas.height / 2;
var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
var centerDocumentPositionX = windowWidth / 2;
var centerDocumentPositionY = windowHeight / 2;
var canvasPositionLeft = centerDocumentPositionX - ( canvas.width / 2 );
var canvasPositionTop = centerDocumentPositionY - ( canvas.height / 2 );

canvas.style.position = 'absolute';
canvas.style.left = canvasPositionLeft + 'px';
canvas.style.top = canvasPositionTop + 'px';
//canvas.style.backgroundColor = 'gray';

function rotateTriangle( baseSide, side ){

    var median = Math.sqrt( Math.pow( side, 2 ) - Math.pow( baseSide, 2 ) / 4 );

    var trianglePointTopX = canvasCenterX;
    var trianglePointTopY = canvasCenterY - median * 2 / 3;
    var trianglePointBottomLeftX = canvasCenterX - baseSide / 2;
    var trianglePointBottomRightX = canvasCenterX + baseSide / 2;
    var trianglePointBottomY = canvasCenterY + median / 3;








    //rotatingAngle = rotatingAngle * ( Math.PI / 180 );//переводим градусы в радианы
    ctx.save();//сохраняем поворот канваса
    ctx.translate( canvasCenterX, canvasCenterY );//смещаем оси координат канваса
    
    
    //if (y-e.clientY<0) ctx.rotate(Math.PI-((Math.atan((x-e.clientX)/(y-e.clientY)))));
    //else ctx.rotate(-Math.atan((x-e.clientX)/(y-e.clientY)));
        // центр вращения - в центре канв (изменить по своему вкусу)
        origin = { x: centerDocumentPositionX, y: centerDocumentPositionY }; 

            // находим текущий угол вращения (нулевой угол = горизонтально вправо)
            var offset = {
                //dx: posX - origin.x,
                //dy: posY - origin.y
                dx: posX - origin.x,
                dy: posY - origin.y
            };
            var rotatingAngle = Math.atan(offset.dy / offset.dx) + Math.PI / 2;
            if (offset.dx < 0) rotatingAngle += Math.PI;
    
    
    
    ctx.rotate( rotatingAngle );//вращаем оси



    ctx.translate( -canvasCenterX, -canvasCenterY );//возвращаем оси в обычное положение
    
    ctx.beginPath();
    ctx.moveTo( trianglePointTopX, trianglePointTopY );
    ctx.lineTo( trianglePointBottomLeftX, trianglePointBottomY );
    ctx.lineTo( trianglePointBottomRightX, trianglePointBottomY );
    ctx.closePath();
    ctx.stroke();

    ctx.restore();//восстанавливаем настройки канваса
};

setInterval( () => {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    rotateTriangle( 70, 100 );

}, 1000/60 );


var posX = 0;
var posY = 0;

window.onmousemove = function(event){
    posX = event.pageX;
    posY = event.pageY;
}



document.addEventListener( "mousemove", rotateTriangle );















window.onload = function () {

}