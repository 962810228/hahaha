jQuery(function ($)
{
    $.ajax({
        type:"POST",
        url:"../api/request.php",
        async:true,
        data:{
            code:1,
        },
        success:function (value)
        {
            console.log(JSON.parse(value));
            renderList_zuo(value);
        }
    })
    function renderList_zuo(value)
    {
        var arr=JSON.parse(value);
        arr = arr.slice(0,4);
        var str = arr.map(function (item)
        {
            return `<li ${item.id}>
                        <img src="${item.img}">
                        <p>${item.title}</p>
                        <p>${item.price}</p>
                    </li>`
        }).join("");
        $(".zuo_2 .zuo_uls").html(str);
    }

    var currentPage=1;
    var qty=3;
    $.ajax({
        type:"POST",
        url:"../api/request.php",
        async:true,
        data:{
            code:5,
            currentPage:currentPage,
            qty:qty,
        },
        success:function (value)
        {
            renderList_you(value);
            bottom_url();
            tiaozhuan();
            page();
            console.log($(".bigImg").children().eq(0));
        }
    })
    //渲染页面的商品
    function renderList_you(value)
    {
        var Brr=JSON.parse(value);
        var Arr=JSON.parse(value).arr;
        Arr.forEach(function (item)
        {
            item.size=item.size.split(",");
            item.url=item.url.split(",");
            item.version=item.version.split(",");
        })
        var str = Arr.map(function (item)
        {
            return `<li data-id="${item.id}">
                        <div class="bigImg"><img src="${item.img}"></div>
                        <div class="minImg">
                            <ul class="url clearfix">
                                <li><img src="${item.url[0]}"></li>
                                <li><img src="${item.url[1]}"></li>
                                <li><img src="${item.url[2]}"></li>
                                <li><img src="${item.url[3]}"></li>
                            </ul>
                        </div>
                        <p>${item.title}</p>
                        <p>${item.price}</p>
                    </li>`
        }).join("");
        $("#you .you_uls").html(str);
        $("#page").text("");
        var pageNum = Math.ceil(Brr.len/Brr.qty);
        for (let i=1;i<=pageNum;i++)
        {
            var span = $("<span></span>");
            $(span).text(i);
            $("#page").append($(span));
        }
        //var ye=Brr.page-1;
        //$("#page").children().eq(ye).addClass("active");
    }
    //小图的jQuery
    function bottom_url()
    {
        $(".minImg .url").children().eq(0).css({border:"1px solid red"});
        for (let i =0;i<$(".you_uls").children().length;i++)
        {
            $(".you_uls").children().eq(i).children().eq(2).children().children().eq(1).css({border:"1px solid red"});
        }
        $(".minImg .url").on("mouseover","li",function ()
        {
            $(".url li").not($(this)).css({border:"1px solid #ccc"});
            $(this).css({border:"1px solid red"})
            //var Big = $(this).children()[0].src;
            var small = $(this).children()[0].src;
            $(this).parent().parent().prev().children().eq(0).attr("src",small);
        })
    }
    //跳转页面
    function tiaozhuan()
    {
        $(".you_uls").on("click","li",  function ()
        {
            if (document.cookie)
            {
                var id = $(this).attr("data-id");
                location.href="detail.html?id="+id+"&ss=aa";
                console.log($(this),id);

            }
            else if(!document.cookie)
            {
                alert("请先登录谢谢");
                location.href="login.html";
                console.log("失败");
            }
        })
    }
    //点击页码重新请求
    function page()
    {
        $("#page").on("click","span",function ()
        {
            $("#page span").not($(this)).css({backgroundColor: "yellow"});
            $(this).css({backgroundColor:"red"});
            currentPage=$(this).text();
            $.ajax({
                type: "POST",
                url: "../api/request.php",
                async: true,
                data: {
                    code: 5,
                    currentPage: currentPage,
                    qty: qty,
                },
                success : function (value)
                {
                    $(".you_uls").html("");
                    renderList_you(value);
                    bottom_url();
                    tiaozhuan();
                    sort();
                }
            })
            console.log(currentPage);
        })
    }
    //排序
    function sort()
    {
        $(".jian .price").on("click",()=>
        {
            $.ajax({
                type:"POST",
                url:"../api/request.php",
                async:true,
                data:{
                    code:6,
                    currentPage:currentPage,
                    qty:qty,
                },
                success : function (value)
                {
                    $(".you_uls").html("");
                    renderList_you(value);
                    bottom_url();
                    tiaozhuan();
                    page();
                }
            })
        })
    }
    sort();
    //判断cookie是否存在
    function cookie()
    {
        if (document.cookie)
        {
            var arr=document.cookie.split("; ");
            console.log(arr);//["user=lemon", "password=123456"]
            arr.forEach(function (item)
            {
                var res=item.split("=");
                console.log(res);//["user","lemon"]["password","123456"]
                if (res[0]=="user")
                {
                    $(".log").children().eq(0).text(res[1]).css({width:"100px"});
                }
            })
        }
        $(".exit").on("click",function ()
        {
            Cookie.removeCookie("user","/");
            Cookie.removeCookie("password","/");
            setTimeout(function ()
            {
                location.href = "page.html";
            },1000)
        })
        $(".buy").on("click",function ()
        {
            if (document.cookie)
            {
                location.href ="car.html";
            }
            else if(!document.cookie)
            {
                alert("请先登录谢谢");
                location.href = "login.html";
            }
        })
    }
    cookie();


})