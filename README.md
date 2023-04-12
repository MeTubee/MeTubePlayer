# MeTubePlayer
 MeTubePlayer - player that repeats design of youtube player in 2013
# How to setup?
**PLEASE CONNECT JQUERY!!!**

First, connect js and css files of MTP (MeTube Player) in <head> tag.
```html
 <head>
  <script src="/player/script/player.js"></script>
 </head>
 ```
 Now, in <head> or everywhere you want, write source of video and element (id, class) where player be.
 ```html
<script>
    var MTP_Values = {
        'PlayerAppendEl': "#MT_Player", // where player will be
        'VideoSource': "videoplayback.mp4", // path to video
        'Autoplay': false, // autoplay (true = yes, false = no)
        'DurationSeconds': 19 // duration of video in seconds
    }
</script>
<div id="MT_Player"></div> // PlayerAppendEl
 ```
 # Preview
 You can open player.html to see how player works
 # Found a bug?
Go to issues and report it
