document.addEventListener("DOMContentLoaded",function ()
{
    jQuery(function ($)
    {

        $.ajax({
            type:"POST",
            url:"../api/req.php",
            async:true,
            data:({
                code:6,
                guid:"001",
            }),
            success:function (value)
            {
                render(value);
                btn();
                bofang();

            }
        })

        function render(value)//渲染歌曲信息
        {
            var arr=JSON.parse(value);
            //console.log(arr);
            var head=arr.map(function (item)
            {
                return `<div class="song_head" guid="${item.guid}">
                                <p>${item.title}</p>
                                <span>${item.singer}</span>
                            </div>`
            })
            $(".head_2").html(head);

            var song_img=arr.map(function (item)
            {
                return `<img class="rotation" src="${item.img}">`
            })
            $("#bigImg").html(song_img);

            var music_url=arr.map(function (item)
            {
                return `<audio id="musicfc" style="width:0;height:0;display:none;">
                            <source src="${item.url}" crossOrigin="anonymous" type="audio/mpeg">
                        </audio>`
            })
            $(".yinyue").html(music_url);
        }


        //初始化
        var playStatus = 0,
        volume = 1,
        musicLoop = '',
        arrMusic = new Array(),
        nowPlayNum = 0;
        onlyLoop = 0,
        arrMusicNum = 0,
        allTime = 0,
        currentnum = 0,
        currentTime = 0,
        lycArray = new Array();


        function bofang()
        {
            var timer;
            var val = 0;
            var musicfc=document.getElementById("musicfc");
            //点击开始播放
            $(".start").on("click",function ()
            {
                timer = setInterval(function ()
                {
                    val+=0.2;
                    $("#bigImg .rotation").rotate(val);
                    //console.log(val);
                },15)
                playStatus = 1;
                if (playStatus == 1) {
                    autoPlay();
                } else {
                    stopPlay();
                }
            })
            //点击暂停播放
            $(".end").on("click",function ()
            {
                clearInterval(timer);
                musicfc.pause();
                playStatus = 0;
                if (playStatus == 1) {
                    autoPlay();
                } else {
                    stopPlay();
                }
            })
        }


        //点击播放时自动播放,状态为1
        function autoPlay()
        {
            playStatus = 1;
            musicfc.play();
            $(".start").css({display:'none'});
            $(".end").css({display:'block'});
            //$('#round_icon').addClass('play-tx2');
        }

        //点击停止时停止播放,状态为0
        function stopPlay()
        {
            playStatus = 0;
            musicfc.pause();
            $(".start").css({display:'block'});
            $(".end").css({display:'none'});
            //$('#round_icon').removeClass('play-tx2');
        }
        
        var num =0;
        function btn()//异步事件回调
        {
            var guid=parseInt($(".song_head").attr("guid"));
            $(".next").on("click",function ()
            {
                // var str="../music/2.mp3";
                // $("#musicfc source").attr("src",str);
                // console.log(666,$("#musicfc source").attr("src"));
                guid++;
                guid = "00"+guid;
                if (guid == "004")
                {
                    guid ="001";
                }
                console.log(typeof guid,guid);
                $.ajax({
                    type:"POST",
                    url:"../api/req.php",
                    async:true,
                    data:({
                        code:6,
                        guid:guid,
                    }),
                    success:function (value)
                    {
                        $(".head_2").html("");
                        $("#bigImg").html("");
                        $(".yinyue").html("");
                        render(value);
                        btn();
                        bofang();
                    }
                })
                // playStatus =0;
                // if (playStatus == 0)
                // {
                //     stopPlay();
                // }
                playStatus =1;
                if (playStatus == 1)
                {
                    autoPlay();
                }
            })
            //console.log($("#musicfc source").attr("src"));
        }








        //点击右上角判断是否有Cookie
        $(".back").on("click",function ()
        {
            if (Cookie.getCookie("user") && Cookie.getCookie("password"))
            {
                location.href="user.html";
            }
            else{
                setTimeout(function () {
                    alert("请先登录,正在跳转");
                    location.href="log.html";
                },1000)
            }
        })
    })
})
