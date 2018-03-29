const frameModule = require("ui/frame");
var orientationModule = require("nativescript-screen-orientation");
var videoPlayer = require("nativescript-videoplayer");

function pageLoaded(){
    
}

function onNavigatingFrom(args){
    const page = args.object;
    if (page.ios) {
        var _videoPlayer = page.getViewById("nativeVideoPlayer"); 
        _videoPlayer.destroy();
        orientationModule.orientationCleanup();
    } else {        
        orientationModule.orientationCleanup();
    }
}

function videoFinished() {
}

function onNavigatingTo(args) {
    const page = args.object;
    if (page.ios) {
        orientationModule.setCurrentOrientation("landscape",function(){});
    } else {
        page.actionBarHidden = true;
        orientationModule.setCurrentOrientation("landscape",function(){});
    }

    if (args.isBackNavigation) {
        //return;
    }
    var observableModule = require("data/observable");
    const context = page.navigationContext;
    var pagedata = new observableModule.fromObject({
        src: context.src
    });
    page.bindingContext = {src: context.src };
}

exports.onNavigatingTo = onNavigatingTo;
exports.pageLoad=pageLoaded;
exports.onNavigatingFrom=onNavigatingFrom;
exports.videoFinished=videoFinished;