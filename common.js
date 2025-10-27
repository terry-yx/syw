
if (typeof WeixinJSBridge == "undefined") {   //微信隐藏复制
    console.log('还未存在微信JSBridge')
    if (document.addEventListener) { 
        console.log('添加监听')
        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false); 
    } else if (document.attachEvent) { 
        document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady); 
    } 
} else { 
    onBridgeReady(); 
}
var appId = window.appId;
window.isnotTest = true;
var http_urlcom = window.geturl[0];
var ws_url = window.ws_url;
// window.XlappId = window.XlappId.length == 0 ? 'VaKGxqOYKGfVOmB4' : window.XlappId;
window.audioId = '';
window.sinaShort = '';
var  xlredirectUrl  = '';
window.beforeUrl = '';
var isHengPhoto = false;
window.setlocation = {
        'latitude':null,
        'longitude':null,
};
// var http_url = 'http://nn.7f4r.cn/cgi_bin';
var ws_url = 'ws://syw.syw.feesz.cn/web_sk';
var redirect_urlXl = "https://open.xianliao.updrips.com/connect/oauth2/authorize?appid={appid}&redirect_uri={redirect_uri}&response_type={response_type}&state={state}#xianliao_redirect";
var redirect_url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid={appid}&redirect_uri={redirect_uri}&response_type={response_type}&scope={scope}&state={state}";
var http = {};
var urls = window.geturl;
var urlindex = 0;  
http.quest = function (option, callback) {
    var url = option.url;
    var method = option.method;
    var data = option.data;
    var timeout = option.timeout || 0;

    var xhr = new XMLHttpRequest();
    (timeout > 0) && (xhr.timeout = timeout);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 400) {
                var result = xhr.responseText;
                try { result = JSON.parse(xhr.responseText); } catch (e) { }
                callback && callback(null, result);
            } else {
                callback && callback('status: ' + xhr.status);
            }
        }
    }.bind(this);
    xhr.open('POST', url, true);
    if (typeof data === 'object') {
        try {
            data = JSON.stringify(data);
        } catch (e) { }
    }
    xhr.send(data);
    xhr.ontimeout = function () {
        callback && callback('timeout');
        console.log('%c连%c接%c超%c时', 'color:red', 'color:orange', 'color:purple', 'color:green');
    };
};


http.post = function (option, callback) {
    option.method = 'post';
    this.quest(option, callback);
};
function getSever(data) {
    window.beforeUrl =window.location.href;
    console.log('zhixing000000');
    var trueurl = data;
    http.post({ url: data + '/sys/getVersion', data: '123', timeout: 5000 }, function (err, result) {
        if (err) {
            if (!window.http_url) {
                urlindex++;
                if (!urls[urlindex]) {
                    urlindex = 0;

                }
                if (urlindex == 0) {
                    return;
                }
                var url = urls[urlindex]
                getSever(url);
            }
        } else {
            Successsed(trueurl);
        }
    })
}
function Successsed(urls) {
    http_urlcom = urls;
    window.http_url = urls;

    if (!getCookie('no_redirect') && !getQueryString('code') && !getQueryString('account')) {
        // redirect();
    } else {
        if (getQueryString('account')) {
            return;
        } else {
            var iswx = is_weixn();
            if(!iswx){
                return;
            }
            this.getWxConfig();
        }

    }
}
window.onload = function () {
    document.title = window.scencename;
    window.Loaction = null;
    initWindowFunctions();
    getSever(urls[urlindex]);
   
   
};
function getLongUrl(){
    // var location = window.location.href.split('#');
    // if(location.length == 2){

    // }
}
function is_weixn(){
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
        return true;
    } else {
        return false;
    }
}
function getCookie(name) {
    // var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    // if (arr = document.cookie.match(reg))
    //     return unescape(arr[2]);
    // else
    //     return null;
    var item = localStorage.getItem(name);
    if(!!item){
        return item;
    }else{
        return null;
    }
};
function getRedirectUrl(toUrl) {
    var weixinForm = {
        appid: appId,
        redirect_uri: toUrl,
        response_type: 'code',
        scope: 'snsapi_userinfo',//'snsapi_base',//'snsapi_userinfo',
        state: '',
    }
    return redirect_url.replace('{appid}', weixinForm.appid).replace('{response_type}', weixinForm.response_type)
        .replace('{scope}', weixinForm.scope).replace('{state}', weixinForm.state).replace('{redirect_uri}', encodeURIComponent(weixinForm.redirect_uri));
}
function getRedirectUrlXL(toUrl) {
    console.log('getRedirectUrlXL-------------------');
    console.log(toUrl);
    var xlfrom = {
        appid: window.XlappId,
        redirect_uri: xlredirectUrl + 'auth/',
        response_type: 'code',
        scope: 'snsapi_userinfo',//'snsapi_base',//'snsapi_userinfo',
        state: '',
    }
    return redirect_urlXl.replace('{appid}', xlfrom.appid).replace('{response_type}', xlfrom.response_type)
    .replace('{response_type}', xlfrom.response_type).replace('{redirect_uri}',xlfrom.redirect_uri);
}
function redirectXl() {
    console.log('redirectXl------------');
     xlredirectUrl = window.location.href;
    // alert('当前url:' + window.location.href);
    $.ajax({
        url: xlredirectUrl+'auth/',
        type: 'POST',
        dataType: 'json',
        data: {
            'url': window.location.href.split('#')[0],
            'appId': window.XlappId
        },
        success: function (data) {
            //alert(data);
            //  window.location.href = 'http://test.trnjph.cn/';
            data = JSON.parse(data);
        }
    });
    var redirect_urixl = getRedirectUrlXL(window.location.href);
    console.log(redirect_urixl);
    window.location.href = redirect_urixl;
}
function redirect() {
    // alert('当前url:' + window.location.href);
    $.ajax({
        url: http_urlcom + '/wechat/getConfig',
        type: 'POST',
        dataType: 'json',
        data: {
            'url': window.location.href.split('#')[0],
            'appId': appId
        },
        success: function (data) {
            //alert(data);
            data = JSON.parse(data);
            appId = data.appId;
            // var redirect_uri = getRedirectUrl(window.location.href);
            // window.location.href = redirect_uri;
            wx.config({
                debug: false,
                appId: data.appId,
                timestamp: data.timestamp,
                nonceStr: data.nonceStr,
                signature: data.signature,
                jsApiList: [
                    'onMenuShareAppMessage',
                    'onMenuShareTimeline',
                    // 'getLocation'


                ]
            });
            wx.error(function (error) {
                // alert('微信初始化错误02' + JSON.stringify(error));
            });
        },
        error: function (er) {
            // alert('登录失败！');
        }
    });
    var redirect_uri = getRedirectUrl(window.location.href);
    window.location.href = redirect_uri;
}


function getWxConfig() {
    // alert('当前url:' + window.location.href);
    $.ajax({
        url: http_urlcom + '/wechat/getConfig',
        type: 'POST',
        dataType: 'json',
        data: {
            'url': window.location.href.split('#')[0],
            'appId': appId
        },
        success: function (data) {
            //alert(data);
            console.log(data);
            data = JSON.parse(data);
            wx.config({
                debug: false,
                appId: data.appId,
                timestamp: data.timestamp,
                nonceStr: data.nonceStr,
                signature: data.signature,
                jsApiList: [
                    'onMenuShareAppMessage',
                    'onMenuShareTimeline',
                    // 'getLocation'
                ]
            });
            // wx.error(function(error){
            //     alert('微信初始化错误02' + JSON.stringify(error));
            // });
        },
        error: function (er) {
            //  alert('微信初始化错误01');
        }
    });
}
if (this.is_weixn()) {
    console.log('wx对象是否存在------', wx)
    wx.ready(function (res) {
        console.log('进来隐藏按钮')
        wx.hideMenuItems({ menuList: ['menuItem:share:QZone', 'menuItem:share:appMessage',
        'menuItem:share:qq',
        'menuItem:favorite',
        'menuItem:setFont',
        'menuItem:copyUrl'
        ]
    });
    window.refreshShareInfo = function (json) {
        // alert(json.desc);
        wx.onMenuShareAppMessage({
            title: json.title,
            desc: json.desc,
            link: json.link,
            imgUrl: '',
        });
        wx.onMenuShareTimeline({
            title: json.title,
            desc: json.desc,
            link: json.link,
            imgUrl: '',
        });
        // wx.

    };
    window.screenShot = function (isHeng) {
        var canvas = document.getElementById('GameCanvas');
        var base64 = canvas.toDataURL("image/png");
        if(!!isHeng){
            isHengPhoto = true;
            putIntoImgHeng(base64);
            console.log('进入横屏设定-------------');
            console.log(isHengPhoto);
        }else{
            isHengPhoto = false;
            putIntoImg(base64);
        }
        
    };
});
}

window.playMusic = function (tag) {
    console.log('进来播放背景音乐-----');
    if(tag == 'majiang'){
   // var arr = ['majiang'];
    //var aduioarr = ['majiang'];
        // for(var i = 0;i < arr.length;i++){
        //     index++;
        //     if(tag == arr[i]){
                window.audioId = 'majiang';
                //break;
            // }
        // }
        }else{
        window.audioId = 'commom';  
        }
    console.log(window.audioId);
    if(!window.audioId){
        return;
    }
    var x = document.getElementById(window.audioId);
    x.loop = true;
    //x.volume = window.audioId == 'commom' ? 1 :0.5;
    x.play();
 
  
}
window.changeSrc = function(url){
      var x = document.getElementById(window.audioId);
      x.src = url;
}
window.closeMusic = function () {
    console.log('进来停止播放背景音乐-----');
    if(window.audioId == ''){
        return;
    }
    var x = document.getElementById(window.audioId);
    x.pause();
}
function GetPT() {
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        return 'ios';
    } else if (/(Android)/i.test(navigator.userAgent)) {
        // alert("Android");
        return 'android';
    }
    return 'pc';
}

function putIntoImg(baseCode) {
    var img = document.getElementById('img');
    //     imageDiv = document.getElementById('imageTest');
    // current =90;
    // var width = window.innerWidth;
    // var height = window.innerHeight;
     img.src = baseCode;

    // img.style.transform = 'rotate('+current+'deg)';
    // img.width =  width;
    // img.height = height;
    img.style.display = "none";
    img.style.display = "block";
};
function putIntoImgHeng(baseCode) {
        var img = document.getElementById('imgHeng');
        imageDiv = document.getElementById('imageTest');
        imageShu = document.getElementById('img');
        imageShu.style.display = "none";
         img.src = baseCode;
        current = 90;
        var width = window.innerWidth;
        var height = window.innerHeight;
        imageDiv.style.width =  width + 'px';
        imageDiv.style.position = 'relative';
        
        imageDiv.style.height = height  + 'px';
        img.style.width = height + 'px';
        img.style.height = width;
        img.style.transform = 'rotate('+current+'deg)';
        img.style.position = 'absolute';
        img.style.top = ((height-width) / 2) + 'px';
        img.style.left = -((height-width) / 2) + 'px';
        img.style.display = "none";
        img.style.display = "block";
        
        
};
// //获取微信appid
// function getAppId() {
//     var url = weixinUrl + reloadUrl
//     console.log(url, "window.location.href ")
//     $.ajax({
//         type: 'POST',
//         url: baseUrl + "/getAppId",
//         data: {url: url},
//         success: function (result) {
//             goWixinURL(result.data);
//         }
//     });
// }

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    console.log(window.location.search.substr(1))
    if (r != null) return unescape(r[2]);
    return null;
}

function onImgClick(event) {
    var e = event || window.event;
    var x = e.screenX / window.screen.width;
    var y = e.screenY / window.screen.height;
    // console.log('浏览器宽度------'+window.screen.width);
    // console.log('浏览器高度-------'+window.screen.height);
    // 
    // console.log('y轴点击位置--------'+  e.screenY);
    // alert('x--->' + x + '----y----->' + y)
    // alert(isHengPhoto);
    if(isHengPhoto){
            window.ScoreBoard.joinNextTableMj();
        return;
    }
    if(y >= 0.70){
        console.log('x------------------'+x);
        if(x > 0 && x < 0.5){
           window.ScoreBoard.ownerToTableClicked(); 
        }
        if(x >= 0.5 && x < 0.8){
           window.ScoreBoard.seeTableDetail(); 
        }
        if(x >= 0.8){
           window.ScoreBoard.toTableClick(); 
        }
    }
    // if (y >= 0.70 && x >= 0.5) {
    //     hideImg();
    //     window.ScoreBoard.toTableClick();
    // } else if (y >= 0.70 && x < 0.5) {
    //     window.ScoreBoard.ownerToTableClicked();
    // }
}
function HideUpload(){
    console.log('关闭图层--------------');
    document.getElementById('choose').style.display = "none";
}
function hideImg() {
    document.getElementById('img').src = '';
    document.getElementById('img').style.display = "none";
}

function pushHistory() {
    var state = {
        title: "title",
        url: "#"
    };
    window.history.pushState(state, "title", "");
}

function initWindowFunctions() {
    //alert('当前url1-->' + window.location.href);
    pushHistory();
    //alert('当前url2-->' + window.location.href);
    window.addEventListener("popstate", function (e) {
        pushHistory();
        if (window.backToLastScene) {
            window.backToLastScene();
        }
    }, false);

    window.hideImg = hideImg;
    window.refreshTitle = function (title) {
        document.title = title;
    };

    window.refreshUrl = function (title, url) {
        document.title = title;
        
        if (url) {
            window.history.pushState(null, null, url);
            window.beforeUrl = url;
            //window.location.href = url;
        }
        // alert('当前url是-->' + window.location.href);
    };
    window.changeTitle = function (title, url) {
        document.title = window.scencename;
        if (url) {
            window.history.pushState(null, null, url);
            //window.location.href = url;
        }
    };
    window.getSinaUrl = function(sinaUrl){
        $.ajax({
        url: 'http://api.weibo.com/2/short_url/shorten.json?source=2887441027&url_long='+sinaUrl,  
        type: "GET",
        dataType: "jsonp", //使用JSONP方法进行AJAX
        cache: false,
        success: function (data) {
            console.log(data);
            if(data.data.urls[0].url_short){
                window.sinaShort = data.data.urls[0].url_short;
            }else{
                window.sinaShort = '';
            }
            },
        fail:function(e){
            window.sinaShort = '';
            },
            });
        
    };
    window.changeUrl = function(url,callback){
         if (url) {
            window.history.pushState(null, null, url);
        }
        if(!!callback){
            console.log(callback);
            callback();
        }
    }
    window.refreshToken = function (id,password) {
        getDomain('wechat',id,password);
            // console.log(window.beforeUrl);
            //  var sendUrl = encodeURIComponent(window.beforeUrl);
            //  console.log(sendUrl);
           // window.location.href = window.http_url+'?platform=wechat&url='+sendUrl;

        }
    window.refreshTokenXL = function(){
        getDomain('xianliao');
    }
    function getDomain(platform,id,password){
        var sendUrl = encodeURIComponent(window.beforeUrl);
        var urlhref = 'http://syw.syw.feesz.cn:6780/cgi_bin?platform='+platform+'&url='+sendUrl;
        window.location.href = urlhref;
    //     http.post({ url: window.http_url +'/authDomain', data: {'platform':platform,'userId':id,'password':password}, timeout: 5000 }, function (err, result) {
            
    //     if (err) {
    //         alert(err,'授权失败！请刷新界面重新登录！');
    //     } else {
    
    //         console.log(result);
    //         console.log(result.data);
    //         var sendUrl = encodeURIComponent(window.beforeUrl);
    //         var getUrl = String(result.data);
    //         var urlhref = 'http://syw.syw.feesz.cn:6780/cgi_bin?platform='+platform+'&url='+sendUrl;
    //         console.log(urlhref);
    //         window.location.href = urlhref;
    //     }
    // })
    }
    window.refreshWindow = function (url) {
        // window.location.href = url;
        // if (url) {
        //     window.history.pushState(null, null, url);
        // }
    };
    window.showBigImages = function (url) {
        getBase64(url)
        .then(function (base64) {
            $('#showBigImage').attr('href', base64);
            document.getElementById("imageshows").click();
            $('.swipebox').swipebox();

        }, function (err) {
            console.log(err);//打印异常信息
        })
    // $('#showBigImage').attr('href', url);
    // document.getElementById("imageshows").click();
    // $('.swipebox').swipebox();
    }
    function getBase64(img) {
        function getBase64Image(img, width, height) {//width、height调用时传入具体像素值，控制大小 ,不传则默认图像大小
            var canvas = document.createElement("canvas");
            canvas.width = width ? width : img.width;
            canvas.height = height ? height : img.height;

            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            var dataURL = canvas.toDataURL();
            return dataURL;
        }
        var image = new Image();
        image.crossOrigin = '';
        image.src = img;
        var deferred = $.Deferred();
        if (img) {
            image.onload = function () {
                deferred.resolve(getBase64Image(image));//将base64传给done上传处理
            }
            return deferred.promise();//问题要让onload完成后再return sessionStorage['imgTest']
        }
    }
    window.getRealUrl = function () {
        return window.http_url;
    }
    window.refreshHash = function (title, hash) {
        document.title = title;
        if (hash) {
            window.location.hash = hash;
        }
        // alert('当前url4-->' + window.location.href);
    };
    window.loadScript = function(url, callback) {
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = url;
      document.getElementById("srciptCode").appendChild(script);
      script.onload = function () {
        callback();
      }
    };
  
    window.showErr = function (message) {
        //alert(message);
    };
    window.screenShot = function (isHeng) {
         var canvas = document.getElementById('GameCanvas');
        var base64 = canvas.toDataURL("image/png");
        if(!!isHeng){
            isHengPhoto = true;
            putIntoImgHeng(base64);
        }else{
            putIntoImg(base64);
        }
    };
    window.getLocations = function(){
        var mapObj = new AMap.Map('iCenter');
    mapObj.plugin('AMap.Geolocation', function () {
        geolocation = new AMap.Geolocation({
            enableHighAccuracy: true, // 是否使用高精度定位，默认:true
            timeout: 10000,           // 超过10秒后停止定位，默认：无穷大
            maximumAge: 0,            // 定位结果缓存0毫秒，默认：0
            convert: true,            // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true

        });
        mapObj.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', onComplete); // 返回定位信息
        AMap.event.addListener(geolocation, 'error', onError);       // 返回定位出错信息
    });

    function onComplete(obj){
        var res = '经纬度：' + obj.position; 
        window.setlocation = {
            'latitude':obj.position.lat,
            'longitude':obj.position.lng,
        };
        window.Joingame();
        // alert(res);
    }

    function onError(obj) {
        alert(obj.info + '--' + obj.message);
        console.log(obj);
        window.Joingame();
    }
    }
  
}
function onBridgeReady() {
    console.log('触发监听')
    WeixinJSBridge.call('hideOptionMenu');
   }
