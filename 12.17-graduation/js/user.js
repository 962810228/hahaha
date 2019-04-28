jQuery(function ($)
{
    console.log(Cookie.getCookie("user"));
    var name=Cookie.getCookie("user");
    $.ajax({
        type:"POST",
        url:"../api/req.php",
        async:true,
        data:{
            code:4,
            user:Cookie.getCookie("user"),
        },
        success:function (value)
        {
            let arr = JSON.parse(value);
            console.log(arr);
            var str=arr.map(function (item)
            {
                return `<figure>
                            <img src="${item.img}">
                            <figcaption>${name}</figcaption>
                            <p>${item.introduct}</p>
                        </figure>
                        <div class="more">
                            <ul>
                                <li><a href="#"><i>${item.follow}</i><span>关注</span></a></li>
                                <li><a href="#"><i>${item.fans}</i><span>粉丝</span></a></li>
                                <li><a href="#"><i>${item.goods}</i><span>赞</span></a></li>
                            </ul>
                        </div>`
            })
            $("#header").html(str);
        }
    })

    //点击退出则删除Cookie
    $(".btn").on("click",function ()
    {
        Cookie.removeCookie("user","/");
        Cookie.removeCookie("password","/");
        setTimeout(function ()
        {
            location.href = "recommend.html";
        },1000)
    })
    
    //点击账号判断是否有Cookie
    $(".transfer").on("click",function ()
    {
        if (document.cookie)
        {
            location.href="user.html";
        }
        else
        {
            alert("请先登录");
            setTimeout(function () {
                location.href = "log.html";
            },2000)
        }
    })
})