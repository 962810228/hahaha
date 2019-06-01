jQuery(function ($) 
{
    //轮播图的实现
    function banner()
    {
        //轮播图
        var focus=document.getElementsByClassName("banner")[0];
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

        focus.timer=setInterval(autoplay,2500);

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
    }
    banner();

    
    //请求页面数据并渲染
    $.ajax({
        type:"POST",
        url:"../api/req.php",
        async:true,
        data:({
            code:5,
        }),
        success:function (value) 
        {
            var Arr=JSON.parse(value);
            var arr1=Arr.slice(0,3);
            var arr2=Arr.slice(3,6);
            console.log(arr1,arr2);
            //渲染推荐歌单栏
            var str1=arr1.map(function (item)
            {
                return `<figure data-id="${item.id}">
                            <img src="${item.img}" height="384" width="384"/>
                            <figcaption>${item.text}</figcaption>
                        </figure>
                        `
            }).join("");
            $(".main1 .navcontent").html(str1);

            //渲染最新音乐栏
            var str2=arr2.map(function (item)
            {
                return `<figure data-id="${item.id}">
                            <img src="${item.img}" height="384" width="384"/>
                            <figcaption>${item.text}</figcaption>
                        </figure>`
            }).join("");
            $(".main2 .navcontent").html(str2);
        }
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