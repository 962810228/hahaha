jQuery(function ($)
{
    var user = Cookie.getCookie("user");
    $.ajax({
        type:"POST",
        url:"../api/request.php",
        async:true,
        data:{code:9,
            uname:user,
        },
        success :function (value)//value=response.text
        {
            console.log(JSON.parse(value));
            renderCar(value);
            renderBottom();
        }
    })
    function renderCar(value)//渲染购物车商品
    {
        var arr = JSON.parse(value);
        var str = arr.map(function (item)
        {
            return `<li data-id="${item.id}">
                        <div class="div1 clearfix">
                            <input type="checkbox" class="minCheck">
                            <img src="${item.img}">
                        </div>
                        <div class="div2">
                            <p>${item.title}${item.version}${item.size} (UD)</p>
                            <span>选服务</span>
                        </div>
                        <div class="div3"><span>${item.price}</span></div>
                        <div class="div4"><span>0.00</span></div>
                        <div class="div5">
                            <button class="decrease">-</button>
                            <input type="text" value="${item.Quanlity}" disabled class="Quanlity">
                            <button class="increase">+</button>
                        </div>
                        <div class="div6">
                            <span class="curTotal">${(item.price * item.Quanlity).toFixed(2)}</span>
                        </div>
                        <div class="div7">
                            <p>移入收藏夹</p>
                            <button class="del">删除</button>
                        </div>
                    </li>`
        }).join("");
        $(".car_uls").html(str);
        decrease();
        increase();
        del();
        checked();
    }
    function decrease()//点击减号进行数量减少
    {
        $(".decrease").on("click",function ()
        {
            var app=this;
            var id=$(this).parent().parent().attr("data-id");
            console.log(id);
            $.ajax({
                type: "POST",
                url: "../api/request.php",
                async: true,
                data: {
                    code: 10,
                    uname: user,
                    id:id,
                },
                success:  (value)=>
                {
                    console.log(value);
                    console.log($(app).next());
                    $(app).next().val(value);
                    var num =parseFloat($(app).next().val());
                    var price =$(app).parent().siblings(".div3").children().text();
                    var count =(num*price).toFixed(2);
                    $(app).parent().siblings(".div6").children().text(count);
                }
            })
        })
    }

    function increase()//点击加号进行数量增加
    {
        $(".increase").on("click",function ()
        {
            var app=this;
            var id=$(this).parent().parent().attr("data-id");
            console.log(id);
            $.ajax({
                type: "POST",
                url: "../api/request.php",
                async: true,
                data: {
                    code: 11,
                    uname: user,
                    id:id,
                },
                success:  (value)=>
                {
                    console.log(value);
                    console.log($(app).next());
                    $(app).prev().val("");
                    $(app).prev().val(value);
                    var num =parseFloat($(app).prev().val());
                    var price =$(app).parent().siblings(".div3").children().text();
                    var count =(num*price).toFixed(2);
                    $(app).parent().siblings(".div6").children().text(count);
                }
            })
            checked();
        })
    }

    function del()//点击关闭按钮则删除该商品
    {
        $(".del").on("click",function ()
        {
            var id=$(this).parent().parent().attr("data-id");
            $.ajax({
                type:"POST",
                url:"../api/request.php",
                async:true,
                data:{
                    code:12,
                    uname:user,
                    id:id,
                },
                success :(value)=>
                {
                    $(this).parent().parent().animate({opacity:0,height:0,width:0},1000,function ()
                    {
                        alert("你已成功删除该商品");
                    });
                }
            })
            checked();
        })
    }

    function renderBottom()//渲染底部的商品
    {
        $.ajax({
            type:"POST",
            url:"../api/request.php",
            async:true,
            data:{code:1,
            },
            success :function (value)
            {
                var arr = JSON.parse(value);
                console.log(arr);
                var str=arr.map(function (item)
                {
                    return `<li data-id="${item.id}">
                                <img src="${item.img}">
                                <p class="title">${item.title}</p>
                                <p class="price">九机价:  <span>$ ${item.price}</span></p>
                                <button class="add_car">加入购物车</button>
                            </li>`
                })
                $(".bottom_uls").html(str);
                animate();
                add_car();
            }
        })
        function animate()//点击移动商品
        {
            $(".bottom_uls").children().eq(0).css({border:"1px solid red"});
            $(".bottom_uls").on("mouseover","li",function ()
            {
                $("li").not($(this)).css({border:"none"});
                $(this).css({border:"1px solid red"});
            });
            var idx=0;
            var len=$(".bottom_uls").children().length;
            var liWidth=$(".bottom_uls").children().eq(0).width();
            console.log(len,liWidth);
            $(".bottom_goods .prev").on("click",function ()
            {
                idx--;
                if (idx==-1)
                {
                    idx=len;
                    $(".bottom_uls").css({left:-(idx-1 * liWidth)});
                    if (idx == len)
                    {
                        idx=0;
                        $(".bottom_uls").css({left:-(idx * liWidth)});
                    }
                }
                $(".bottom_uls").animate({left:-idx * liWidth});
            })
            $(".bottom_goods .next").on("click",function ()
            {
                idx++;
                if (idx==len)
                {
                    idx=0;
                    $(".bottom_uls").css({left:idx});
                }
                $(".bottom_uls").animate({left:-(idx * liWidth)});
            })
        }
        function add_car()//点击添加商品请求增删改查
        {
            $(".bottom_uls").on("click",".add_car",function ()
            {
                var id = $(this).parent().attr("data-id");
                var color = "亮黑色";
                var size ="8GB+64GB";
                var version="华为P30全网通版";
                console.log($(this).parent(),id);
                $.ajax({
                    type:"POST",
                    url:"../api/request.php",
                    async:true,
                    data:{code:8,
                        uname:user,
                        id:id,
                        color:color,
                        size:size,
                        version:version,
                        Quanlity:1,
                    },
                    success : function (value)
                    {
                        alert("加入购物车成功" + value);
                        $.ajax({
                            type: "POST",
                            url: "../api/request.php",
                            async: true,
                            data: {
                                code: 9,
                                uname: user,
                            },
                            success: function (value)//value=response.text
                            {
                                console.log(JSON.parse(value));
                                $(".car_uls").html("");
                                renderCar(value);
                                renderBottom();
                            }
                        })
                    }
                })

            })
        }
    }

    function checked()//单选全选按钮
    {
        var mincheck = $(".car_uls :checkbox").filter($(".minCheck"));
        var allcheck = $("#main .container input:checkbox").filter($(".allCheck"));
        console.log(mincheck,allcheck);
        allcheck.on("click",function ()
        {
            allcheck.not($(this)).attr('checked',$(this).prop('checked'));
            $(this).prop("checked")? mincheck.prop("checked",true) :mincheck.prop("checked",false);
            judge();
            var s=$(".car_uls input:checked")
            console.log(s,s.length);
            var total=parseFloat(0);
            for (let i=0;i<s.length;i++)
            {
                total+=parseFloat(total)+parseFloat(s.eq(i).parent().siblings(".div6").children().text());
            }
            console.log(total);
            $(".xuan").text(s.length);
            $(".total").text("$"+total.toFixed(2));
        })
        mincheck.on("click",function ()
        {
            judge();
        })
        $(".car_uls").on("click",function ()
        {
         //   var show=$(this).children().filter(".div1").children("input:checkbox").prop("checked");
            var s=$(".car_uls input:checked")
            console.log(s,s.length);
            var total=parseFloat(0);
            for (let i=0;i<s.length;i++)
            {
                total+=parseFloat(total)+parseFloat(s.eq(i).parent().siblings(".div6").children().text());
            }
            console.log(total);
            $(".xuan").text(s.length);
            $(".total").text("$"+total.toFixed(2));
            judge();
        })


        function judge()
        {
            //console.log(mincheck.length,mincheck.filter(":checked").length);
            if (mincheck.length == mincheck.filter(":checked").length)
            {
                console.log(allcheck[0]);
                allcheck[0].checked = true;
                allcheck[1].checked = true;
            }
            else
            {
                allcheck[0].checked = false;
                allcheck[1].checked = false;
            }
        }
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