const frameModule = require("ui/frame");
var orientationModule = require("nativescript-screen-orientation");

function pageLoaded(){
    
}

function onNavigatingFrom(){
    console.log("landscape orientation set");
    orientationModule.orientationCleanup();
}

function videoFinished() {
    console.log('videoFinished');
}

//const HomeViewModel = require("./home-view-model");

/* ***********************************************************
* Use the "onNavigatingTo" handler to initialize the page binding context.
*************************************************************/
function onNavigatingTo(args) {
    
    orientationModule.setCurrentOrientation("landscape",function(){
        
    });
    if (args.isBackNavigation) {
        //return;
    }
    var observableModule = require("data/observable");

    
    const page = args.object;
    const context = page.navigationContext;
    var pagedata = new observableModule.fromObject({
        url: context.url
    });
    page.bindingContext = {src: context.url };
}

exports.onNavigatingTo = onNavigatingTo;
exports.pageLoad=pageLoaded;
exports.onNavigatingFrom=onNavigatingFrom;
exports.videoFinished=videoFinished;