// MeTube Player v1.0
// More info at https://metubee.xyz/player
const formatTime = (s) => {
    var m = Math.floor(s / 60);
    m = (m >= 10) ? m : "0" + m;
    s = Math.floor(s % 60);
    s = (s >= 10) ? s : "0" + s;
    return m + ":" + s;
}
var loadR = 0;
var bufferingDetected = false;
var lastPlayPos = 0;
var currentPlayPos = 0;
$(() => {
    $(MTP_Values["PlayerAppendEl"]).prepend(`
    <style>
    @keyframes MTP_Animation_FullScreen {
        to{
            transform: scale(1.5);
            opacity: 0;
        }
    }
    #MT_Player{
        width:640px;
        height:360px;
        transition: all .5s;
    }
    .MeTubePlayer{
        background-color: #000;
        width: 100%;
        height: 100%;
        position: relative;
        font-family: Arial, Helvetica, sans-serif!important;
        overflow: hidden;
    }
    .MTP_Actions{
        padding: 1px 0 0;
        background: rgb(27, 27, 27);
        position: absolute;
        width: 100%;
        bottom: 0px;
        min-height: 26px;
        z-index: 930;
        transition: all 1s;
    }
    .MTP_Full_Screened{
        background: no-repeat url(player/images/player-darkhh-vflvDcUVL.png) 0 -2187px!important;
    }
    .MTP_Button{
        border: none;
        cursor: pointer;
    }
    .MTP_Button:focus{
        outline: rgb(153, 153, 153) dotted 1px;
    }
    .MTP_Actions_Main .MTP_Pause{
        background: url(player/images/player-darkhh-vflvDcUVL.png) 0px -1134px no-repeat;
        height: 25px;
        width: 55px;
    }
    .MTP_Actions_Main .MTP_Pause:hover{
        background: url(player/images/player-darkhh-vflvDcUVL.png) 0px -513px no-repeat;
    }
    .MTP_Actions_Main{
        display: flex;
        align-items: center;
    }
    .MTP_Sound_Full{
        background: url(player/images/player-darkhh-vflvDcUVL.png) 0px -1485px no-repeat;
    }
    .MTP_Sound_Full:hover{
        background: url(player/images/player-darkhh-vflvDcUVL.png) 0px -378px no-repeat;
    }
    .MTP_Sound{
        height: 25px;
        width: 35px;
    }
    .MTP_Duration{
        font-size: 11px;
        margin-left: 6px;
        line-height: 28px;
        color: rgb(153, 153, 153);
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        cursor:default;
    }
    .MTP_Current_Time{
        color:#fff;
    }
    .MTP_Actions_Left{
        display: flex;
        align-items: center;
    }
    .MTP_Actions_Right{
        display: flex;
        align-items: center;
        margin-left:auto;
    }
    .MTP_Full_Screen{
        background: url(player/images/player-darkhh-vflvDcUVL.png) 0px -1998px no-repeat;
        height: 25px;
        width: 30px;
    }
    .MTP_Full_Screen:hover{
        background: url(player/images/player-darkhh-vflvDcUVL.png) 0px -1377px no-repeat;
    }
    .MTP_Progress_Bar{
        background: rgb(42 42 42);
        overflow: visible;
        position: absolute;
        width: 100%;
        z-index: 760;
        height:3px;
        transition: .5s;
        cursor: pointer;
        margin-top: 8px;
        bottom:29px;
    }
    .MTP_Progress_Bar:hover{
        height: 6px!important;
        transition: .5s;
    }
    .MTP_Scrubber{
        background: url(player/images/player-common-vfloYYly0.png) -73px -11px no-repeat;
        z-index: auto;
        height: 17px;
        width: 16px;
        border: none;
        overflow: hidden;
        bottom:-5px;
        transform: scale(0);
        position: absolute;
        cursor: pointer;
        transition: .5s;
        right:0;
    }
    .MTP_Progress_Bar:hover .MTP_Progress_Bar_Active .MTP_Scrubber{
        transform: scale(1)!important;
    }
    .MTP_Progress_Bar_Active{
        background-color: rgb(31, 108, 185);
        height:100%;
        width:0px;
        position: relative;
    }
    video{
        width:100%;
        height: 100%;
        cursor: pointer!important;
    }
    .MTP_Play{
        background: url(player/images/player-darkhh-vflvDcUVL.png) 0px -1323px no-repeat;
        height: 25px;
        width: 55px;
    }
    .MTP_Play:hover{
        background: url(player/images/player-darkhh-vflvDcUVL.png) 0px -459px no-repeat;
    }
    @keyframes MTP_Animation_Placeholder {
        0%{
            transform: scale(.5);
            opacity: .3;
        }
        10%{
            transform: scale(.6);
            opacity: .6;
        }
        20%{
            transform: scale(.7);
            opacity: .8;
        }
        40%{
            transform: scale(.8);
            opacity: 1;
        }
        50%{
            transform: scale(.9);
            opacity: .8;
        }
        60%{
            transform: scale(1);
            opacity: .6;
        }
        70%{
            transform: scale(1.1);
            opacity: .3;
        }
        80%{
            transform: scale(1.2);
            opacity: .2;
        }
        90%{
            transform: scale(1.3);
            opacity: .1;
        }
        100%{
            transform: scale(1.4);
            opacity: 0;
        }
    }
    .MTP_Placeholders{
        display: flex;
        align-items: center;
        justify-content: center;
        width:100%;
        height: 100%;
        position:absolute;
    }
    .MTP_Play_Placeholder{
        background-color: rgba(0,0,0, .5);
        padding:10px;
        border-radius: 10px;
        animation: MTP_Animation_Placeholder .3s;
    }
    .MTP_Play_Placeholder svg{
        width:72px;
        fill:#fff;
    }
    .MTP_Info{
        background-color: #fff;
        border: 1px solid #666;
        border-radius: 5px;
        position: absolute;
        z-index: 10;
        display: none;
        top:50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .MTP_Info_Option{
        padding:5px;
        margin:5px 0px;
        color:#666;
        width:150px;
        font-size: 12px;
    }
    .MTP_Info_Option:hover{
        background-color: #666;
        color:#fff;
        cursor:pointer;
    }
    .MTP_Visible{
        display: block!important;
    }
    .MTP_Loading{
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAfCAQAAAC1p96yAAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAAAEgAAABIAEbJaz4AAAAJdnBBZwAAAB8AAAAfACoIA9kAAAIHSURBVDjLlZWxahtBEIa/OzmxtUThQMEgokDAnTsXAePODJigxoXLPEFKP0HIE7hMk0eICzchCAZSGVcWIeBORYiDq5AD2RcpcL4Ukk47q9OFTCFu9p+PHe3cvxexMrTBa9rAT95JXl0TrYQjPnEwS/q8lKKqKl65+VEJwwFH1UVr3n4xPVrAiI9yz7GpO+YDaEIDyCVdal4j3rIzSwa8IWPDw8fS1C5ulmVyHTa/V8Kwwx6XZvdLbZUwOG2F+KEpP+TE5CckJk9CfMvIW5zSL7M+p+avMM8W+NDIQynoScQ++xLRk4Kx0cchfmbkM5Ac+CKfgcdAavQ0xM8ZlM8DzqcP8mv+KyOyUs9k5A1OI17QJOaOMYV81VjuqQx1wMPF9Kevzavy4H7Ie8BxW40zoYOjQQ76SK5j0G3v1J/qNsgqGBwOmBrIaSsGdk3BLnWR2CwGOmapU4sH04+BG7N0U4sH04+BC7N0UYunNotBrrw3bihXdXQ4/dncpdDnQMoahe9nG3O/8wckA9/vGzzBsc4Ez88GXvh9It9AG5IvXtoHOGACeH72YN/v69qaemJxWSWmOmEUXE4Vum+ZJT9rl03atNnUbpVu8WCiS5fTP/xuTztdajbULb7k56DZGr975+vmE9VnND3ht3y3etj8NCaSgTZYcTl5etXuppOKz8J/hjp1dfpfJ3WnaHXCf5IAAAAASUVORK5CYII=);
        width: 31px;
        height: 31px;
        position: absolute;
        top:50%;
        left:50%;
    }
    .MTP_Sound_Mute{
        background: no-repeat url(player/images/player-darkhh-vflvDcUVL.png) 0 -1107px!important;
    }
    .MTP_Large_Player{
        background: no-repeat url(player/images/player-darkhh-vflvDcUVL.png) 0 -1458px;
        height: 25px;
        width: 30px;
    }
    .MTP_Large_Player:hover{
        background: no-repeat url(player/images/player-darkhh-vflvDcUVL.png) 0 -1620px;
    }
    .MTP_Mini_Player{
        background: no-repeat url(player/images/player-darkhh-vflvDcUVL.png) 0 -918px;
        height: 25px;
        width: 30px;
    }
    .MTP_Mini_Player:hover{
        background: no-repeat url(player/images/player-darkhh-vflvDcUVL.png) 0 -1836px;
    }
    .MTP_Mini_Player_Active{
        background: no-repeat url(player/images/player-darkhh-vflvDcUVL.png) 0 -621px!important;
    }
    .MTP_Large_Player_Active{
        background: no-repeat url(player/images/player-darkhh-vflvDcUVL.png) 0 -972px!important;
    }
    .MTP_Sound_Bar{
        margin-left: 5px;
        width:55px;
        background-color: #757575;
        height:5px;
        cursor: pointer;
        display: none;
    }
    .MTP_Sound_Bar_Active{
        background-color: rgb(31, 108, 185);
        width:100%;
        height: 100%;
        position: relative;
    }
    .MTP_Sound_Bar_Scrubber{
        position: absolute;
        top: -5px;
        height: 14px;
        right:0;
        width: 5px;
        background: #ddd;
    }
    #Sound{
        display: flex;
        align-items: center;
    }
    </style>
    <div class="MeTubePlayer">
    <video src="`+MTP_Values["VideoSource"]+`" autoplayer></video>
    <div class="MTP_Actions">
        <div class="MTP_Progress_Bar">
            <div class="MTP_Progress_Bar_Active" style="width:0px;">
                <div class="MTP_Scrubber"></div>
            </div>
        </div>
        <div class="MTP_Actions_Main">
            <div class="MTP_Actions_Left">
                <button class="MTP_Button MTP_Play" id="PlayPause"></button>
                <div id="Sound">
                    <button class="MTP_Button MTP_Sound MTP_Sound_Full"></button>
                    <div class="MTP_Sound_Bar">
                        <div class="MTP_Sound_Bar_Active">
                            <div class="MTP_Sound_Bar_Scrubber"></div>
                        </div>
                    </div>
                </div>
                <div class="MTP_Duration">
                    <span class="MTP_Current_Time">00:00</span> / <span class="MTP_Vid_Duration">Loading...</span>
                </div>
            </div>
            <div class="MTP_Actions_Right">
                <button class="MTP_Button MTP_Full_Screen"></button>
            </div>
        </div>
    </div>
</div>`)
    document.querySelector('.MeTubePlayer').addEventListener("contextmenu", (e) => {
        e.preventDefault();
        return false;
    });
    document.querySelector('video').addEventListener("contextmenu", (e) => {
        e.preventDefault();
        return false;
    });
    setInterval(() => {
        currentPlayPos = document.querySelector('video').currentTime;
        var offset = (50 - 20) / 1000;
        if(!bufferingDetected && currentPlayPos < (lastPlayPos + offset) && !document.querySelector('video').paused){
            $('.MeTubePlayer').prepend('<div class="MTP_Loading"></div>');
            bufferingDetected = true;
        }
        if(bufferingDetected && currentPlayPos > (lastPlayPos + offset) && !document.querySelector('video').paused){
            $('.MTP_Loading').remove();
            bufferingDetected = false;
        }
        lastPlayPos = currentPlayPos;
    }, 50)
    setInterval(() => {
        loadR = loadR + 45;
        $(".MTP_Loading").css('transform', 'translate(-50%, -50%) rotate(' + loadR + 'deg)');
    }, 100);
    $('.MeTubePlayer').click(() => {
        $('.MTP_Info').removeClass("MTP_Visible")
    })
    $('#Sound').hover(() => {
        $('.MTP_Sound_Bar').show(500);
    }, () => {
        setTimeout(() => {
            $('.MTP_Sound_Bar').hide(500);
        }, 1000)
    })
    $('.MTP_Info_Option').click(() => {
        location.href = $(this).data('go');
    })
    $('.MeTubePlayer').hover(() => {
        $('.MTP_Scrubber').css('transform', 'scale(1)');
        $('.MTP_Progress_Bar').css('height', '6px');
        if(!document.querySelector('video').paused){
            $('.MTP_Actions').css('transform', 'translateY(0px)');
        }
    }, () => {
        $('.MTP_Scrubber').css('transform', 'scale(0)');
        $('.MTP_Progress_Bar').css('height', '3px');
        if(!document.querySelector('video').paused){
            $('.MTP_Actions').css('transform', 'translateY(33px)');
        }
    });
    $('.MTP_Full_Screen').click(() => {
        if($('.MTP_Full_Screen').hasClass('MTP_Full_Screened')){
            $('.MTP_Full_Screen').removeClass('MTP_Full_Screened');
        }else{
            $('.MTP_Full_Screen').addClass('MTP_Full_Screened');
        }
        if(document.querySelector('.MeTubePlayer').requestFullscreen){
            document.querySelector('.MeTubePlayer').requestFullscreen();
        }else if (document.querySelector('.MeTubePlayer').webkitRequestFullscreen){
            document.querySelector('.MeTubePlayer').webkitRequestFullscreen();
        }else if (document.querySelector('.MeTubePlayer').msRequestFullscreen){
            document.querySelector('.MeTubePlayer').msRequestFullscreen();
        }
        if(document.exitFullscreen){
            document.exitFullscreen();
        }else if (document.webkitExitFullscreen){
            document.webkitExitFullscreen();
        }else if (document.msExitFullscreen){
            document.msExitFullscreen();
        }
    })
    $('.MTP_Sound').click(() => {
        if($('.MTP_Sound').hasClass('MTP_Sound_Mute')){
            $('.MTP_Sound').removeClass('MTP_Sound_Mute');
            document.querySelector('video').volume = 1;
        }else{
            $('.MTP_Sound').addClass('MTP_Sound_Mute');
            document.querySelector('video').volume = 0;
        }
    })
    // no more theathre mode );
    $('video').click(() => {
        if(!document.querySelector('video').paused){
            document.querySelector('video').pause();
            $('#PlayPause').removeClass('MTP_Pause');
            $('#PlayPause').addClass('MTP_Play');
        }else{
            document.querySelector('video').play();
            $('#PlayPause').removeClass('MTP_Play');
            $('#PlayPause').addClass('MTP_Pause');
            $('.MeTubePlayer').prepend('<div class="MTP_Placeholders"><div class="MTP_Play_Placeholder"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>ionicons-v5-c</title><polygon points="96 448 416 256 96 64 96 448"/></svg></div></div>');
            setTimeout(() => {
                $('.MTP_Placeholders').remove();
            }, 290);
        }
    })
    $('#PlayPause').click(() => {
        if(!document.querySelector('video').paused){
            document.querySelector('video').pause();
            $('#PlayPause').removeClass('MTP_Pause');
            $('#PlayPause').addClass('MTP_Play');
        }else{
            document.querySelector('video').play();
            $('#PlayPause').removeClass('MTP_Play');
            $('#PlayPause').addClass('MTP_Pause');
            $('.MeTubePlayer').prepend('<div class="MTP_Placeholders"><div class="MTP_Play_Placeholder"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>ionicons-v5-c</title><polygon points="96 448 416 256 96 64 96 448"/></svg></div></div>');
            setTimeout(() => {
                $('.MTP_Placeholders').remove();
            }, 290);
        }
    })
    document.querySelector('video').onended = () => {
        document.querySelector('video').pause();
        $('#PlayPause').removeClass('MTP_Pause');
        $('#PlayPause').addClass('MTP_Play');
        $('.MTP_Actions').css('transform', 'translateY(0px)');
    }
    document.querySelector('video').addEventListener('pause', () => {
        document.querySelector('video').pause();
        $('#PlayPause').removeClass('MTP_Pause');
        $('#PlayPause').addClass('MTP_Play');
        $('.MTP_Actions').css('transform', 'translateY(0px)');
        $('.MeTubePlayer').prepend('<div class="MTP_Placeholders"><div class="MTP_Play_Placeholder"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>ionicons-v5-c</title><path d="M224,432H144V80h80Z"/><path d="M368,432H288V80h80Z"/></svg></div></div>');
        setTimeout(() => {
            $('.MTP_Placeholders').remove();
        }, 290);
    })
    $('.MTP_Progress_Bar').click((e) => {
        document.querySelector('video').currentTime = (e.offsetX / document.querySelector('.MTP_Progress_Bar').offsetWidth) * document.querySelector('video').duration;
    })
    $('.MTP_Sound_Bar').click((e) => {
        document.querySelector('video').volume = (e.offsetX / document.querySelector('.MTP_Sound_Bar').offsetWidth) / 100;
    })
    document.querySelector('video').addEventListener("volumechange", () => {
        if(document.querySelector('video').volume == 1){
            document.querySelector('.MTP_Sound_Bar_Active').style.width = 100 + '%'
        }else{
            document.querySelector('.MTP_Sound_Bar_Active').style.width = document.querySelector('video').volume * 10000 + '%';
        }
    })
    document.addEventListener('keyup', (event) => {
        if (event.code === 'Space') {
            if(!document.querySelector('video').paused){
                document.querySelector('video').pause();
                $('#PlayPause').removeClass('MTP_Pause');
                $('#PlayPause').addClass('MTP_Play');
            }else{
                document.querySelector('video').play();
                $('#PlayPause').removeClass('MTP_Play');
                $('#PlayPause').addClass('MTP_Pause');
                $('.MeTubePlayer').prepend('<div class="MTP_Placeholders"><div class="MTP_Play_Placeholder"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>ionicons-v5-c</title><polygon points="96 448 416 256 96 64 96 448"/></svg></div></div>');
                setTimeout(() => {
                    $('.MTP_Placeholders').remove();
                }, 290);
            }
        }
    })
    document.querySelector('video').addEventListener("timeupdate", () => {
        $('.MTP_Vid_Duration').text(formatTime(document.querySelector('video').duration));
        $('.MTP_Current_Time').text(formatTime(document.querySelector('video').currentTime));
        document.querySelector('.MTP_Progress_Bar_Active').style.width = (document.querySelector('video').currentTime / document.querySelector('video').duration) * 100 + '%';
    })
});