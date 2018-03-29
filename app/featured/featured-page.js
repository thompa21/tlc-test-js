const frameModule = require("ui/frame");

const FeaturedViewModel = require("./featured-view-model");

const fromObject = require("data/observable").fromObject;

var http = require("http");
    
function onNavigatingTo(args) {
    if (args.isBackNavigation) {
        return;
    }

    var observableModule = require("data/observable")
    var ObservableArray = require("data/observable-array").ObservableArray;
    var lista = new ObservableArray();

    http.getJSON("https://apps.lib.kth.se/webservices/mrbs/api/v1/noauth/entries/?limit=10").then(function(result) {
        for (i=0;i<result.length;i++) {
            lista.push({name: result[i].name, url: result[i].room_name});
        };
        var pageData = new observableModule.fromObject({
            videoList: lista
        });
        const page = args.object;
        page.bindingContext = pageData;
    }, function(error) {
        console.error(JSON.stringify(error));
    });
       
    //const page = args.object;
    //page.bindingContext = new FeaturedViewModel();
}

function onDrawerButtonTap(args) {
    const sideDrawer = frameModule.topmost().getViewById("sideDrawer");
    sideDrawer.showDrawer();
}

function onNavigationItemTap(args) {
    const component = args.object;
    const componentRoute = component.route;
    const componentURL = component.url;
    frameModule.topmost().navigate({
        moduleName: componentRoute,
        animated: false,
        context: { url: componentURL }
    });
}

exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;
exports.onNavigationItemTap = onNavigationItemTap;

