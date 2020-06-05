source = document.getElementById('srcid');
var getUrlParameter = function getUrlParameter(sParam) {
var sPageURL = window.location.search.substring(1),
sURLVariables = sPageURL.split('&'),
sParameterName,
i;
for (i = 0; i < sURLVariables.length; i++) {
sParameterName = sURLVariables[i].split('=');
if (sParameterName[0] === sParam) {
return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
}
}
};
var surl = getUrlParameter('url');

if (surl == null) {
    document.getElementById("status").innerHTML = "<h5>Welcome to<br>JioSaavn Downloader</h5>" ;
}
else if (surl.startsWith("http://") || surl.startsWith("https://") || surl.startsWith("www.jiosaavn.com") || surl.startsWith("jiosaavn.com") || surl.startsWith("www.saavn.com") || surl.startsWith("saavn.com")) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            var t = JSON.parse(this.responseText);
            var e = t.url;
            var m = e.replace("http://h.saavncdn.com", "/play");;
            if (e == null) {
            document.getElementById("status").innerHTML = "<h5>Please Enter JioSaavn Song Link</h5>" ;
                if (surl != null){
                document.getElementById("download").innerHTML = "Unable to Download from this Link" ;
                }
            else {
                document.getElementById("download").innerHTML = "Welcome to JioSaavn Downloader" ;
            }
        }
        else if (e.endsWith(".mp3") === true){
            document.getElementById("download").innerHTML = "<table class='table table-striped'> <thead> <tr> <th scope='col'>Name</th> <td>" + t.title + "</td> </tr> </thead> <tbody> <tr> <th scope='row'>Singer</th> <td>" + t.singers + "</td> </tr> <tr> <th scope='row'>Album</th> <td>" + t.album + "</td> </tr> <tr> <th scope='row'>Language</th> <td>" + t.language + "</td> </tr> <tr> <th scope='row'>Label</th> <td>" + t.label + "</td> </tr> </tbody> </table><a href='" + t.url + "' class='button7' style='background-color:#2979FF'>Download MP3 320kbps</a>"
            document.getElementById("status").innerHTML = "<img src='" + t.image_url + "' width='250px' height='250px'><center><div class='audio green-audio-player'> <audio crossorigin> <source src='" + m + "' type=audio/mpeg> </audio> <div class=loading> <div class=spinner></div> </div> <div class=play-pause-btn> <svg xmlns=http://www.w3.org/2000/svg width=18 height=24 viewBox='0 0 18 24'> <path fill=#566574 fill-rule=evenodd d='M18 12L0 24V0' class=play-pause-icon id=playPause /> </svg> </div> <div class=controls> <span class=current-time>0:00</span> <div class=slider data-direction=horizontal> <div class=progress> <div class=pin id=progress-pin data-method=rewind></div> </div> </div> <span class=total-time>0:00</span> </div> <div class=volume> <div class=volume-btn> <svg xmlns=http://www.w3.org/2000/svg width=24 height=24 viewBox='0 0 24 24'> <path fill=#566574 fill-rule=evenodd d='M14.667 0v2.747c3.853 1.146 6.666 4.72 6.666 8.946 0 4.227-2.813 7.787-6.666 8.934v2.76C20 22.173 24 17.4 24 11.693 24 5.987 20 1.213 14.667 0zM18 11.693c0-2.36-1.333-4.386-3.333-5.373v10.707c2-.947 3.333-2.987 3.333-5.334zm-18-4v8h5.333L12 22.36V1.027L5.333 7.693H0z' id=speaker /> </svg> </div> <div class='volume-controls hidden'> <div class=slider data-direction=vertical> <div class=progress> <div class=pin id=volume-pin data-method=changeVolume></div> </div> </div> </div> </div> </div></center>" ;
        }
          }
        else {
            document.getElementById("status").innerHTML = "<img src='https://jiosaavn.netlify.app/images/processing.gif' width='250px' height='250px'>" ;
        }
            
        };
        xmlhttp.open("GET", "https://jiosaavn.netlify.app/api/?query=" + surl, true);
        xmlhttp.send();
}

else {
        var obj, xmlhttp, myObj, x, txt = "";
        obj = { table: "customers", limit: 20 };
        dbParam = JSON.stringify(obj);
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            myObj = JSON.parse(this.responseText);
            txt += "<table class='table table-striped table-bordered'><caption>Results for : " + surl + "</caption><thead><tr><th scope='col'>Name</th><th scope='col'>Link</th></tr></thead><tbody>"
            for (x in myObj) {
              txt += "<tr><td>" + myObj[x].title + "</td><td><a href='/?url=" + myObj[x].perma_url + "' target='_blank'>Open</a></td></tr>";
            }
            txt += "</tbody></table>"    
            document.getElementById("download").innerHTML = txt;
            document.getElementById("status").innerHTML = "" ;
          }
          else {
              document.getElementById("status").innerHTML = "<img src='https://jiosaavn.netlify.app/images/processing.gif' width='250px' height='250px'>" ;
          }
        };
        xmlhttp.open("GET", "https://jiosaavn.netlify.app/api/?query=" + surl, true);
        xmlhttp.send();
}
