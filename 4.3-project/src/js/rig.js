document.addEventListener("DOMContentLoaded",function ()
{
    jQuery(function ($)
    {
        $(".reg_1").show();
        $(".uls").children().eq(0).css({backgroundColor:"white",borderTop:"2px solid red"});
        $(".tab .uls li").eq(0).on("click",function ()
        {
            console.log(666);
            //$(".reg_2").toggleClass("selected");
            $(".reg_1").css({display:"block"});
            $(".reg_2").css({display:"none"});
        })
        $(".tab .uls li").eq(1).on("click",function ()
        {
            console.log(777);
            $(".reg_1").css({display:"none"});
            $(".reg_2").css({display:"block"});
        })
        $(".tab .uls").on("click","li",function ()
        {
            $("li").not($(this)).css({backgroundColor:"#ccc",borderTop:"none"});
            $(this).css({backgroundColor:"white",borderTop:"2px solid red"});
        })
        var show1=false;
        var show2=false;
        var show3=false;
        var show4=false;
        var show5=false;
        var show6=false;
        console.log($("#user"));
        //用户名验证
        $("#user").on("blur", () =>
        {
            var _user=$("#user").val();
            //4-16位字母、数字或汉字，请不要输入特殊字符
            if (/[\d\S\u2E80-\u9FFF][\S]{3,16}/.test(_user))
            {
                console.log(1);
                $.ajax({
                    type:"POST",
                    url:"../api/request.php",
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
                $("#user").next().text("4-16位字母、数字或汉字，请不要输入特殊字符").css({color:"orange"});
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
            }
            else
            { show4 = false;}
            judge();
        })
        //点击获取随机验证码
        $(".huoqu").on("click",function ()
        {
            var arr=[];
            var str="ABCDEFGHIJKLMNOPQRSTUVWSYZ0123456789";
            for (var i=1;i<=4;i++)
            {
                var x=parseInt(Math.random()*str.length);
                arr.push(str[x]);
            }
            $(this).text(arr.join(""));
        })
        //验证验证码输入输出是否相等
        $("#ver").on("input",function ()
        {
            var _huoqu=$(".huoqu").text();
            var _ver=$(this).val();
            if (_ver.trim()==0)
            {
                $("#ver").next().text("输入的验证码错误");
                show5 = false;
            }
            else
            {
                if (_ver == _huoqu)
                {
                    $("#ver").next().text("√");
                    show5 = true;
                }
                else if (_ver != _huoqu)
                {
                    $("#ver").next().text("输入的验证码错误");
                    show5 = false;
                }
            }
            console.log(_huoqu+"显示",_ver+"输入");
            judge();
        })
        // var checkbox =$(".checkbox")[0];
        // console.log(checkbox,checkbox.checked);
        $(".checkbox").on("input",function ()
        {
            if ($(".checkbox").prop("checked") == true)
            {
                show6=true;
            }
            else if ($(".checkbox").prop("checked") == false)
            {
                show6=false;
            }
            judge();
        })
        function judge()//时刻判断开关
        {
            if (show1 && show2 && show3 && show4 && show5 && show6 )
            {
                $(".btn").prop("disabled",false);
            }
            else { $(".btn").prop("disabled",true);}
        }
        console.log($(".btn"))
        //点击提交按钮
        $(".btn").on("click",function ()
        {
            var _user=$("#user").val();
            var _pass=$("#pass").val();
            var _phone=$("#phone").val();
            var _email=$("#email").val();
            $.ajax({
                type: "POST",
                url:"../api/request.php",
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
                        location.href="recommend.html";
                    },2000)
                }
            })
        })
    })
})

