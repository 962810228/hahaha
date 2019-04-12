document.addEventListener("DOMContentLoaded",function ()
{
    //轮播图
    var focus=document.getElementsByClassName("nav_2")[0];
    var ul=focus.children[0];
    var firstLi=ul.children[0];
    var NewLi=firstLi.cloneNode(true);
    ul.appendChild(NewLi);
    var firstImg=firstLi.children[0];
    var len=ul.children.length;
    var liWidth=firstLi.offsetWidth;
    var idx=0;
    var jian=document.getElementsByClassName("jian")[0];
    var prev=jian.children[0];
    var next=jian.children[1];
    //1.等待一张图片加载完毕后，设置ul的宽度=img的宽度*个数。focus的宽度=li的宽度
    firstImg.onload=function ()
    {
        ul.style.width=liWidth*len+'px';
        focus.style.width=liWidth+'px';
        console.log(liWidth);
    }
    console.log(liWidth);
    //2.每个一秒索引+1，实现轮播

    focus.timer=setInterval(autoplay,1800);

    //3.当鼠标移入focus，停止定时器
    focus.onmouseover=function ()
    {
        clearInterval(focus.timer);
    }
    //4.当鼠标移出focus，开启定时器
    focus.onmouseout=function ()
    {
        focus.timer=setInterval(autoplay,1800);
    }
    //5.生成页码
    var page=span();
    //6.点击左键，索引--，显示图片
    prev.onclick=function ()
    {
        idx--;
        showpic();
    }
    //7.点击右键，索引++，显示图片
    next.onclick=autoplay;

    //8.点击页码，改变索引，显示图片
    // var span=document.getElementsByClassName("page")[0];
    page.onclick=function (e)
    {
        if (e.target.tagName=="SPAN")
        {
            idx=e.target.getAttribute("idx")-2;
            autoplay();
            console.log("666");
        }
        /*for (let i=0;i<span.children.length;i++)
        {
            idx = span.children[i]-2;
            autoplay();
            console.log("666");
        }*/
    }

    //自动播放
    function autoplay()
    {
        idx++;
        showpic();
    }
    //封装：索引+1轮播
    function showpic()
    {
        if (idx>=len)
        {
            ul.style.left=0+'px';
            idx=1;
        }
        else if (idx==-1)
        {
            ul.style.left=-firstImg.offsetWidth*(len-1)+'px';
            idx=len-2;
        }
        for (var i=0;i<len-1;i++)
        {
            page.children[i].classList.remove("active");
        }
        if (idx>=len-1)
        {
            page.children[0].classList.add("active");
        }
        else
        {
            page.children[idx].classList.add("active");
        }
        //ul.style.left=-firstImg.offsetWidth*idx+'px';
        bufferAnimation(ul,{left:(-firstImg.offsetWidth*idx)},30)
    }
    function span()
    {
        var page=document.createElement("div");
        page.classList.add("page");
        focus.appendChild(page);
        for (let i=1;i<len;i++)
        {
            let span=document.createElement("span");
            //span.innerText=i;
            span.setAttribute("idx",i);
            page.appendChild(span);
        }
        page.children[0].classList.add("active");
        return page;
    }
    console.log(page);

    //滚动条
    var totop=document.getElementsByClassName("totop")[0];
    totop.onclick=function()
    {
        clearInterval(totop.timer);
        totop.timer=setInterval(function ()
        {
            var current=window.scrollY;
            var speed=Math.floor((0-current)/10);
            current+=speed;
            if (current<=0)
            {
                clearInterval(totop.timer);
            }
            window.scrollTo(0,current);
        },30)
    }
    window.onscroll=function ()
    {
        if (window.scrollY>=200)
        {
            totop.style.display='block';
        }
        else if (window.scrollY<200)
        {
            totop.style.display='none';
        }
    }

    //渲染商品
    jQuery(function ($) 
    {
        $.ajax({
            type:"POST",
            url:"../api/request.php",
            async:true,
            data:{
                code:1,
                uname:"lemon"
            },
            success:function (value)
            {
                renderGoods_1(value);
                renderGoods_2(value);
            }
        })
        function renderGoods_1(value)
        {
            var arr = JSON.parse(value);
            console.log($(".goods"));
            var str=arr.map(function (item)
            {
                return `<li data-id="${item.id}">
                            <h3><a href="#">${item.title}</a></h3>
                            <p><a href="#">${item.des}</a></p>
                            <p><a href="#">${item.price}</a></p>
                            <img src="${item.img}">
                        </li>`
            }).join("")
            $(".main_1 .goods").html(str);
        }
        function renderGoods_2(value)
        {
            var arr = JSON.parse(value);
            arr=arr.slice(0,4);
            console.log(arr);
            console.log($(".goods"));
            var str=arr.map(function (item)
            {
                return `<li data-id="${item.id}">
                            <h3><a href="#">${item.title}</a></h3>
                            <p><a href="#">${item.des}</a></p>
                            <img src="${item.img}">
                        </li>`
            }).join("")
            $(".main_2 .goods2").html(str);
        }
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
})