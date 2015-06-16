/**
 * Created by wwtliu on 14/8/11.
 */
var canvas;
var stage;
var img = new Image();
var sprite;

window.onload = function(){
    canvas = document.getElementById("canvas");
    var height = document.documentElement.offsetHeight;
    canvas.setAttribute("width",height);
    stage = new createjs.Stage(canvas);

    /*添加监听事件*/
    stage.addEventListener("stagemousedown",clickCanvas);/*鼠标点击事件*/
    stage.addEventListener("stagemousemove",moveCanvas);/*鼠标移动事件*/

    /*定义图片数据 类列表*/
    var data={
        images:["4.png"],
        frames:{width:90,height:90,regX:10,regY:10}/*以中心点变化(偏移)的位置*/
    }

    sprite  = new createjs.Sprite(new createjs.SpriteSheet(data));/*承载数据的效果类*/
    createjs.Ticker.setFPS(20);
    createjs.Ticker.addEventListener("tick",tick);
}
function tick(e){
    var t = stage.getNumChildren();//产生图片的数量
    for(var i = t-1;i>=0;i--){
        var s = stage.getChildAt(i);//获得每一个图片的对象

        s.vY +=2;
        s.vX +=1;
        s.x += s.vX;
        s.y += s.vY;

        s.scaleX = s.scaleY =s.scaleX+ s.vS;
        s.alpha += s.vA;

        if(s.alpha <= 0 || s.y >canvas.height){//透明度为0,或超出边界  不显示
            stage.removeChildAt(i);
        }
    }
    stage.update(e);//更新
}

/*点击时数量多一点，大小也不一样*/
function clickCanvas(e){
    addS(Math.random() + 10,stage.mouseX,stage.mouseY,2);
}

function moveCanvas(e){
    addS(Math.random()*2 + 1,stage.mouseX,stage.mouseY,1);
}

/*数量，大小不一样*/
function addS(count,x,y,speed){
    for(var i = 0;i<count;i++){
        var s = sprite.clone();/*获得实例对象*/
        s.x = x;/*点击时鼠标的位置*/
        s.y = y;
        s.alpha = Math.random()*0.5 + 0.5;/*透明度的变化*/
        s.scaleX = s.scaleY = Math.random() +0.3;/*缩放*/

        var a = Math.PI * 2 *Math.random();/*变化的范围*/
        var v = (Math.random() - 0.5) *30 *speed;/*变化的速度*/
        s.vX = Math.cos(a) *v;//x坐标的变化
        s.vY = Math.sin(a) *v;//y坐标的变化
        s.vS = (Math.random() - 0.5) *0.2; // scale
        s.vA = -Math.random() *0.05 -0.01; // alpha
        stage.addChild(s);//添加到舞台
    }
}