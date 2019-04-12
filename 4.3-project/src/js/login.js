jQuery(function ($)
{
    $(".span_all").on("click","span",function (e)
    {
         $("span").not($(this)).css({color: "black",borderBottom: "none"})
         $(this).css({color: "red",borderBottom: "2px solid red"});
         //$(this).toggleClass("active");
        e.preventDefault();
        console.log(666,$(this));
    })
    var show1=false;
    $("#btn").on("blur",function ()
    {
        var _user = $("#user").val();
        var _pass = $("#pass").val();
        $.ajax({
            type:"POST",
            url:"../api/request.php",
            async:true,
            data:{
                code:4,
                user:_user,
                pass:_pass,
            },
            success :function (value) 
            {
                if (value == "correct")
                {
                    show1 = true;
                    if (show1)
                    {
                        var d = new Date();
                        d.setDate(d.getDate()+7);
                        if ($(".checkbox").prop("checked") == true)
                        {
                            document.cookie="user="+_user+"; expires="+d.toUTCString()+' ;path=/';
                            document.cookie="password="+_pass+"; expires="+d.toUTCString()+' ;path=/';
                        }
                    }
                    alert(value+"登录成功,正在自动跳转,请耐心等待");
                    //$(".log a").replaceAll("<span>+_user+</span>");
                    $(".log").children().eq(0).text(_user);

                    setTimeout(function ()
                    {
                        location.href="page.html"
                    },2000)
                }
                else {alert(value+"登录失败,账号或密码不正确");show1 = false;}
            }
        })
    })

})
