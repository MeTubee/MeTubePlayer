# MeTubePlayer
 MeTubePlayer - player that repeats design of youtube player in 2013
# How to setup?
**PLEASE CONNECT JQUERY!!!**

First, connect js and css files of MTP (MeTube Player) in <head> tag.
```html
 <head>
  <script src="https://metubee.xyz/MTP/player/script/player.js"></script>
 </head>
 ```
 Now, in <head> or everywhere you want, write source of video and element (id, class) where player will be.
 ```html
<script>
    var MTP_Values = {
        "PlayerAppendEl": "#MT_Player",
        "VideoSource": "videoplayback.mp4"
    }
</script>
<div id="MT_Player"></div> // PlayerAppendEl
 ```
 # Preview
 You can open player.html to see how the player works
 # Found a bug?
Go to issues and report it
