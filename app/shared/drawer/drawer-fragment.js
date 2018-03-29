const frameModule = require("ui/frame");

const DrawerViewModel = require("./drawer-view-model");

const http = require("http");

/* ***********************************************************
 * Use the "loaded" event handler of the wrapping layout element to bind the view model to your view.
 *************************************************************/
function onLoaded(args) {
    const component = args.object;
    const componentTitle = component.selectedPage;
    var observableModule = require("data/observable")
    http.getJSON("http://tlcgolfit.se/webservices/tlcgolfit/api/v1/users/7?api_key=jbjhvbas56fa865faityvasdfa5f8as5fd8a6scda864s5cd8a4sdc863c861c8136dc1864wq86drc8q6cc1cghfx12gfmoi909")
    .then(function(result) {
        var pageData = new observableModule.fromObject({
            userName: result.username
        });
        component.bindingContext = pageData;
    }, function(error) {
        console.error(JSON.stringify(error));
    });

    //component.bindingContext = new DrawerViewModel(componentTitle);
}

/* ***********************************************************
 * Use the "tap" event handler of the <GridLayout> component for handling navigation item taps.
 * The "tap" event handler of the app drawer <GridLayout> item is used to navigate the app
 * based on the tapped navigationItem's route.
 *************************************************************/
function onNavigationItemTap(args) {
    console.log('onNavigationItemTap');
    const component = args.object;
    const componentRoute = component.route;

    frameModule.topmost().navigate({
        moduleName: componentRoute,
        transition: {
            name: "fade"
        }
    });
}

exports.onLoaded = onLoaded;
exports.onNavigationItemTap = onNavigationItemTap;
