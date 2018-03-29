const frameModule = require("ui/frame");

const GameViewModel = require("./game-view-model");

const fromObject = require("data/observable").fromObject;

var http = require("http");
    
function onNavigatingTo(args) {
    if (args.isBackNavigation) {
        return;
    }

    var observableModule = require("data/observable")
    var ObservableArray = require("data/observable-array").ObservableArray;
    var lista = new ObservableArray();

    http.getJSON("http://tlcgolfit.se/webservices/tlcgolfit/api/v1/videos?api_key=jbjhvbas56fa865faityvasdfa5f8as5fd8a6scda864s5cd8a4sdc863c861c8136dc1864wq86drc8q6cc1cghfx12gfmoi909").then(function(result) {
        for (i=0;i<result.length;i++) {
            lista.push({name: result[i].name, description: result[i].description, type: result[i].type_id, src: result[i].src, image: result[i].image });
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
    //page.bindingContext = new GameViewModel();
}

function onDrawerButtonTap(args) {
    const sideDrawer = frameModule.topmost().getViewById("sideDrawer");
    sideDrawer.showDrawer();
}

function onNavigationItemTap(args) {
    const component = args.object;
    const componentRoute = component.route;
    const componentSRC = component.src;
    frameModule.topmost().navigate({
        moduleName: componentRoute,
        animated: false,
        context: { src: componentSRC }
    });
}

exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;
exports.onNavigationItemTap = onNavigationItemTap;

