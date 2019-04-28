jQuery(function ($)
{
    var color ='';
    var size='';
    var version='';
    var id = GetLocation();
    id = id[0].id;
    console.log(id);
    $.ajax({
        type: "POST",
        url: "../api/request.php",
        async: true,
        data: {
            code: 7,
            id: id,
        },
        success: function (value)
        {
            console.log(JSON.parse(value));
            renderDetails(value);
            console.log(color);
        }
    })
    //渲染商品信息
    function renderDetails(value)
    {
        var arr = JSON.parse(value);
        arr.forEach(function (item)
        {
            item.url= item.url.split(",");//url分割成数组
            item.color= item.color.split(",");//颜色分割成数组
            item.size= item.size.split(",");//容量分割成数组
            item.version= item.version.split(",");//版本分割成数组
        })
        var str = arr.map(function (item)
        {
            return `   
                <p id="tou" data-id="${item.id}">
                    <a href="page.html"><span>首页</span></a>
                    <a href="List.html"><span>手机通讯</span></a>
                    <a href="List.html"><span>手机</span></a>
                    <a href="#"><span>${item.title.slice(0,6)}</span></a>
                    <a href="#"><span>${item.title}</span></a>
                </p>
                <div id="tu">
                    <div class="bigImg magnify-box">
                        <div class="min-img">
                            <img src="${item.url[0]}" />
                            <div class="mask"></div>
                        </div>
                        <div class="max-img">
                            <img src="${item.url[0]}">
                        </div> 
                    </div>
                    <div class="minImg img-list clearfix">
                        <div class="pre"> < </div>
                        <ul class="minImg_uls clearfix">
                            <li><img src="${item.url[0]}"></li>
                            <li><img src="${item.url[1]}"></li>
                            <li><img src="${item.url[2]}"></li>
                            <li><img src="${item.url[3]}"></li>
                        </ul>
                        <div class="next"> > </div>
                    </div>
                </div>
                <div class="des_1">
                    <p class="p1">${item.title}${item.version[0]}${item.color[0]}${item.size}</p>
                    <p class="p2">99元预订享好礼！4月19日同步首发！</p>
                    <p class="p3">九 机 价：<span>$ ${item.price}</span> [价格走势] [降价通知]</p>
                    <span class="h1">颜 色</span>
                    <ul class="des_1_uls clearfix">
                        <li><span>${item.color[0]}</span></li>
                        <li><span>${item.color[1]}</span></li>
                    </ul>
                    <span class="h1">容 量</span>
                    <ul class="des_2_uls clearfix">
                        <li><span>${item.size[0]}</span></li>
                        <li><span>${item.size[1]}</span></li>
                        <li><span>${item.size[2]}</span></li>
                    </ul>
                    <span class="h1">版 本</span>
                    <ul class="des_3_uls clearfix">
                        <li><span>${item.version[0]}</span></li>
                        <li><span>${item.version[1]}</span></li>
                    </ul>
                </div>
                <div class="des_2">
                    <p class="add_1">
                        <span class="sp1">配送至</span>
                        <span class="sp2">广东省广州市花都区</span>
                    </p>
                    <span class="sp3">因配送地址不同，送达时间以订单显示为准</span>
                </div>
                <div class="des_3">
                    <button class="btn">购买</button>
                    <button>分期</button>
                </div>`
        }).join("");
        $(".show").html(str);
        bottom_url();
        choose();
        submit();
        Magnifier();
    }
    //放大镜
    function Magnifier()
    {
        var magnify = document.querySelector('.magnify-box');
        var minBox = document.querySelector('.min-img');
        var minImg = document.querySelector('.min-img img');
        var mask = document.querySelector('.mask');

        var maxBox = document.querySelector('.max-img');
        var maxImg = document.querySelector('.max-img img');

        var imgList = document.querySelectorAll('.img-list li');
        var maskHeight = 0; // 遮罩的高度
        var maskWidth = 0; // 遮罩的宽度
        var minBoxWidth = 0; // 小图片盒子的宽度
        var minBoxHeight = 0; // 小盒子图片的高度
        var maxImgWidth = 0; // 大图片的宽度
        var maxImgHeight = 0; // 大图片的高度
        var maxBoxWidth = 0; // 大图片盒子的宽度
        var maxBoxHeight = 0; // 大图片盒子的高度

        minBox.onmouseenter = function(){
            mask.style.display = 'block';
            maxBox.style.display = 'block';
            maskHeight = mask.offsetHeight;
            maskWidth = mask.offsetWidth;
            minBoxWidth = minBox.offsetWidth;
            minBoxHeight = minBox.offsetHeight;

            maxBoxHeight = maxBox.offsetHeight;
            maxBoxWidth = maxBox.offsetWidth;

            maxImgHeight = maxImg.offsetHeight
            maxImgWidth = maxImg.offsetWidth;
            console.log(maskWidth, maskHeight);
        }

        minBox.onmousemove = function(ev){
            var x = ev.pageX - magnify.offsetLeft - maskWidth/2;
            var y = ev.pageY - magnify.offsetTop - maskHeight/2;

            var maxX = minBoxWidth - maskWidth;
            var maxY = minBoxHeight - maskHeight;

            if(x>maxX) {
                x = maxX
            }
            if(y>maxY) {
                y = maxY;
            }
            if(x<=0) {
                x= 0;
            }
            if(y<=0) {
                y = 0;
            }
            var biliX = (maxImgWidth - maxBoxWidth)/ maxX;
            var biliY = (maxImgHeight - maxBoxHeight)/ maxY;

            mask.style.left = x + 'px';
            mask.style.top = y + 'px';

            maxImg.style.left = - x * biliX + 'px';
            maxImg.style.top = - y * biliY + 'px';

        }

        minBox.onmouseleave = function(){
            mask.style.display = 'none';
            maxBox.style.display = 'none';
        }

    }

    //小图与大图的路径jQuery
    function bottom_url()
    {
        $(".minImg .minImg_uls").children().eq(0).css({border:"1px solid red"});
        $(".minImg .minImg_uls").on("mouseover","li",function ()
        {
            $(".minImg_uls li").not($(this)).css({border:"1px solid #ccc"})
            $(this).css({border:"1px solid red"})
            //var Big = $(this).children()[0].src;
            var small = $(this).children()[0].src;
            $(this).parent().parent().prev().children().children().eq(0).attr("src",small).css({width:440,height: 439});
            $(this).parent().parent().prev().children(".max-img").children().eq(0).attr("src",small).css({width:440,height: 439});

        })
    }

    //传过来的loction.href的search
    function GetLocation() {
        var type=decodeURIComponent(location.search).replace('?','');
        type=type.split('&');
        type.pop();
        type=type.map(function (item)
        {
            var s=item.split('=')
            return {
                [s[0]]:s[1].trim()
            }
        })
        return type;
    }
    console.log(GetLocation());

    //点击颜色\容量\版本
    function choose()
    {
        $(".des_1_uls").children().eq(0).css({border:"1px solid red"});
        $(".des_2_uls").children().eq(0).css({border:"1px solid red"});
        $(".des_3_uls").children().eq(0).css({border:"1px solid red"});

        $(".des_1_uls").on("click","li", function ()
        {
            $(".des_1_uls li").not($(this)).css({border:"1px solid #ccc"})
            $(this).css({border:"1px solid red"});
            color = $(this).children().eq(0).text();
            console.log(color);
        })
        $(".des_2_uls").on("click","li", function ()
        {
            $(".des_2_uls li").not($(this)).css({border:"1px solid #ccc"})
            $(this).css({border:"1px solid red"});
            size = $(this).children().eq(0).text();
            console.log(size);
        })
        $(".des_3_uls").on("click","li", function ()
        {
            $(".des_3_uls li").not($(this)).css({border:"1px solid #ccc"})
            $(this).css({border:"1px solid red"});
            version = $(this).children().eq(0).text();
            console.log(version);
        })
    }


    //点击加入购物车
    function submit()
    {
        var user = Cookie.getCookie("user");
        console.log(user);
        $(".btn").on("click",function ()
        {
            if (document.cookie)
            {
                $.ajax({
                    type:"POST",
                    url:"../api/request.php",
                    async:true,
                    data:{
                        code:8,
                        uname:user,
                        id:id,
                        color:color,
                        size:size,
                        version:version,
                        Quanlity:1,
                    },
                    success : function (value)
                    {
                        location.href = "car.html";
                        alert(value);
                    }
                })
                console.log(color,size,version);
            }
            else if(!document.cookie)
            {
                alert("请先登录");
                location.href="login.html";
            }
        })
    }
    
    //检测Cookie是否存在
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