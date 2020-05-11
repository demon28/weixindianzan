/**
 * 常用JS变量:
 * agentEvent = 代理模式下自动点击模块
 * acEvent= 无障碍模式下自动点击模块
 * device = 设备信息模块
 * file = 文件处理模块
 * http = HTTP网络请求模块
 * shell = shell命令模块
 * thread= 多线程模块
 * image = 图色查找模块
 * utils= 工具类模块
 * global = 全局快捷方式模块
 * 常用java变量：
 *  context : Android的Context对象
 *  javaLoader : java的类加载器对象
 * 导入Java类或者包：
 *  importClass(类名) = 导入java类
 *      例如: importClass(java.io.File) 导入java的 File 类
 *  importPackage(包名) =导入java包名下的所有类
 *      例如: importPackage(java.util) 导入java.util下的类
 *
 */

function main() {


    var count = readConfigString("count");

    toast("开始运行，点击"+count+"条赞！");

    var result = isAccMode();

    if (!result) {
        alert("请设置无障碍模式！");
        return;
    }
    //  打开微信
    utils.openApp("com.tencent.mm");
    toast("打开微信！");

    var ac = "com.tencent.mm.ui.LauncherUI";
    var act= waitExistActivity(ac,10000);



      var selectorFaxian = id("com.tencent.mm:id/ddm").clz("android.widget.TextView").text("发现");
     click(selectorFaxian);
       sleep(3000);

       var selectorpengyouq = id("android:id/title").clz("android.widget.TextView").text("朋友圈");
       click(selectorpengyouq);
       toast("进入朋友圈");
     sleep(3000);

     ClickStar(count);


}

function ClickStar(count)
{

   clickPoint(300,100);
   sleep(200);
   clickPoint(300,100);

   sleep(1000);
  //回到最顶部


  var clickcount=0;
  var wrongcount=0;


 while(true){
  var node =getnode();
 if (node.length==0) {
    swipeToPoint(700,900,700,600,200);
 }else{
    break;
 }

 }

   while(true){
       var nodelist= getnode();
       for(var j=0;j<nodelist.length;j++){

           var node= nodelist[j];
           node.click();

           logd(node);
           //展示出来评论 和 赞

          var zan=id("com.tencent.mm:id/eoc").clz("android.widget.TextView").text("赞");
          var result = waitExistNode(zan,3000);
           if (result){
                  sleep(1000);
                 // zan.click();

                 var rect=getNodeAttrs(zan,"bounds");
                 clickCenter(rect);

                  clickcount=clickcount+1;
              } else {
                  toast("上滑，寻找下一个："+clickcount);
                  sleep(1000);
                  wrongcount=wrongcount+1;
              }
       }
       //swipeToPoint(700,900,700,600,200);
       Rollsrceen();
       //滚动
       if(clickcount>=count){
           toast("任务完成"+clickcount);
         break;
         exit();
       }
          if(wrongcount>=50){
          toast("上滑50次：停止")
                break;
                exit();
           }
   }


 }



function Rollsrceen(){

    var width = device.getScreenWidth();
   var height = device.getScreenHeight();

   var r = utils.randomInt(2);
    var  rollX=width/2 +r;
    var  rollY=height*0.8 +r;
    var  newX=rollX +r;
    var  newY=height*0.2+r;



    swipeToPoint(rollX,rollY,newX,newY,200);

}
function getnode(){
 return id("com.tencent.mm:id/eop").clz("android.widget.ImageView").getNodeInfo(3000);
}

function OpenMainActivty(){
     var map={
            "action":"android.intent.action.VIEW",
            "className":"com.tencent.mm.ui.LauncherUI",
            "pkg":"com.tencent.mm"
        };

       var result= utils.openActivity(map);
       toast(result);

}

main();
