jQuery(function ($)
{
    var show1 = false;
    $(".back").on("click",function ()
    {
        location.href="recommend.html";
    })
    $(".log").on("click",function ()
    {
        let _user = $("#user").val();
        let _pass = $("#pass").val();
        console.log(_user,_pass)
        let d = new Date();
        $.ajax({
            type:"POST",
            url:"../api/req.php",
            async:true,
            data:{
                code:1,
                user:_user,
                pass:_pass,
            },
            success:function (value) 
            {
                console.log(value);
                if (value == "correct")
                {
                    show1 = true;
                    if (show1)
                    {
                        d.setDate(d.getDate()+7);
                        if ($(".checkbox").prop("checked") == true)
                        {
                            document.cookie="user="+_user+"; expires="+d.toUTCString()+' ;path=/';
                            document.cookie="password="+_pass+"; expires="+d.toUTCString()+' ;path=/';
                        }
                    }
                    alert(value+"登录成功,正在自动跳转,请耐心等待");
                    setTimeout(function ()
                    {
                        location.href="recommend.html";
                    },2000)
                }
                else {alert(value+"登录失败,账号或密码不正确");show1 = false;}
            }

        })
    })
})