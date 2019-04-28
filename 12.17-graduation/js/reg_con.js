$(function(){
    var show_num = [];
    draw(show_num);
    var show1=false;
    var show2=false;
    var show3=false;
    var show4=false;
    var show5=false;
    var show6=false;

    $("#canvas").on('click',function(){
        draw(show_num);
    })
    $(".input-val").on('blur',function(){
        var val = $(".input-val").val().toLowerCase();
        var num = show_num.join("");
        if(val==''){
            alert('请输入验证码！');
        }else if(val == num){
            //alert('提交成功！');
            //$(".input-val").val('');
            show6=true;
            $(".input-val").next().text("√");
            judge();
            // draw(show_num);
        }else{
            alert('验证码错误！请重新输入！');
            $(".input-val").val('');
            // draw(show_num);
        }
    })

//生成并渲染出验证码图形
function draw(show_num) {
    var canvas_width=$('#canvas').width();
    var canvas_height=$('#canvas').height();
    var canvas = document.getElementById("canvas");//获取到canvas的对象，演员
    var context = canvas.getContext("2d");//获取到canvas画图的环境，演员表演的舞台
    canvas.width = canvas_width;
    canvas.height = canvas_height;
    var sCode = "a,b,c,d,e,f,g,h,i,j,k,m,n,p,q,r,s,t,u,v,w,x,y,z,A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
    var aCode = sCode.split(",");
    var aLength = aCode.length;//获取到数组的长度
    for (var i = 0; i < 4; i++) {  //这里的for循环可以控制验证码位数（如果想显示6位数，4改成6即可）
        var j = Math.floor(Math.random() * aLength);//获取到随机的索引值
        // var deg = Math.random() * 30 * Math.PI / 180;//产生0~30之间的随机弧度
        var deg = Math.random() - 0.5; //产生一个随机弧度
        var txt = aCode[j];//得到随机的一个内容
        show_num[i] = txt.toLowerCase();
        var x = 50 + i * 45;//文字在canvas上的x坐标
        var y = 60 + Math.random() * 8;//文字在canvas上的y坐标
        context.font = "bold 70px 微软雅黑";
        context.width= "300px";

        context.translate(x, y);
        context.rotate(deg);

        context.fillStyle = randomColor();
        context.fillText(txt, 0, 0);

        context.rotate(-deg);
        context.translate(-x, -y);
    }
    for (var i = 0; i <= 5; i++) { //验证码上显示线条
        context.strokeStyle = randomColor();
        context.beginPath();
        context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
        context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
        context.stroke();
    }
    for (var i = 0; i <= 30; i++) { //验证码上显示小点
        context.strokeStyle = randomColor();
        context.beginPath();
        var x = Math.random() * canvas_width;
        var y = Math.random() * canvas_height;
        context.moveTo(x, y);
        context.lineTo(x + 1, y + 1);
        context.stroke();
    }
}

//得到随机的颜色值
function randomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")";
}


    //用户名验证
    $("#user").on("blur", () =>
    {
        var _user=$("#user").val();
        console.log(_user);
        //4-16位字母、数字或汉字，请不要输入特殊字符
        if (/[\d\S\u2E80-\u9FFF][\S]{3,16}/.test(_user))
        {
            console.log(1);
            $.ajax({
                type:"POST",
                url:"../api/req.php",
                async:true,
                data:{
                    code:2,
                    user:_user,
                },
                success:function (value)
                {
                    console.log(3);
                    if (_user.trim()==0)
                    {
                        $("#user").next().text("用户名不能为空");
                    }
                    else
                    {
                        if (value == "error")
                        {
                            $("#user").next().text("该用户已被注册");
                            show1 = false;
                        }
                        else
                        {
                            $("#user").next().text("√");
                            show1 = true;
                        }
                    }
                }
            })
        }
        else{
            console.log(2);
            $("#user").next().text("不符合规范").css({color:"orange"});
        }
        console.log(_user);
        judge();
    })
    //密码验证
    $("#pass").on("blur",()=>{
        //6个字符以上的字母或数字
        var _pass=$("#pass").val();
        if (/^[\w]{6,20}$/.test(_pass))
        {
            $("#pass").next().text("√");
            show2 = true;
        }
        else { show2 = false;}
        judge();
    })
    //密码重复验证
    $("#repass").on("blur",function ()
    {
        var _pass=$("#pass").val();
        var _repass=$("#repass").val();
        console.log($(this));
        if (_pass !=_repass) {
            $(this).next().text("前后密码不一致");
            show3 = false;
        }
        else if (_pass ==_repass) {
            $(this).next().text("√");
            show3 = true;
        }
        judge();
    })
    //手机号码验证
    $("#phone").on("blur",function ()
    {
        var _phone=$("#phone").val();
        if (/^[\d]{11}$/.test(_phone))
        {
            $("#phone").next().text("√");
            show4=true;
            console.log("666");
        }
        else
        { show4 = false;console.log("777");}
        judge();
    })
    //点击协议才能提交
    $(".checkbox").on("input",function ()
    {
        if ($(".checkbox").prop("checked") == true)
        {
            show5=true;
        }
        else if ($(".checkbox").prop("checked") == false)
        {
            show5=false;
        }
        judge();
        console.log($(".checkbox").prop("checked"));
    })
    //时刻判断开关
    function judge()
    {
        if (show1 && show2 && show3 && show4 && show5 && show6)
        {
            $(".btn").prop("disabled",false);
        }
        else { $(".btn").prop("disabled",true);}
    }
    //点击提交按钮
    $(".btn").on("click",function ()
    {
        var _user=$("#user").val();
        var _pass=$("#pass").val();
        var _phone=$("#phone").val();
        var _email=$("#email").val();
        $.ajax({
            type: "POST",
            url:"../api/req.php",
            async: true,
            data:{
                code: 3,
                user:_user,
                pass:_pass,
                phone:_phone,
                email:_email,
            },
            success:function (value)
            {
                alert(value+"正在自动跳转,请耐心等待");
                setTimeout(function ()
                {
                    location.href="log.html";
                },2000)
            }
        })
    })
})