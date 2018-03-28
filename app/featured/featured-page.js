const frameModule = require("ui/frame");

const FeaturedViewModel = require("./featured-view-model");

const fromObject = require("data/observable").fromObject;

var http = require("http");



   
function getentries() {
    fetchModule.fetch("https://apps.lib.kth.se/webservices/mrbs/api/v1/noauth/entries/", {
    method: "",
    headers: {},
    body: ""
    })
    .then(function(response) {
        //list.push(JSON.stringify(response.name));
    }, function(error) {
        //console.log(JSON.stringify(error));
    });
}
    

/* ***********************************************************
* Use the "onNavigatingTo" handler to initialize the page binding context.
*************************************************************/
function onNavigatingTo(args) {
    /* ***********************************************************
    * The "onNavigatingTo" event handler lets you detect if the user navigated with a back button.
    * Skipping the re-initialization on back navigation means the user will see the
    * page in the same data state that he left it in before navigating.
    *************************************************************/
    

   var observableModule = require("data/observable")
   var ObservableArray = require("data/observable-array").ObservableArray;
   var lista = new ObservableArray();
   
   
   http.getJSON("https://apps.lib.kth.se/webservices/mrbs/api/v1/noauth/entries/?limit=10").then(function(result) {
        for (i=0;i<result.length;i++) {
            lista.push({name: result[i].name});
        };
        var pageData = new observableModule.fromObject({
            groceryList: lista
        });
        const page = args.object;
        page.bindingContext = pageData;
    }, function(error) {
        console.error(JSON.stringify(error));
    });
       
    //const page = args.object;
    //page.bindingContext = new FeaturedViewModel();
}

/* ***********************************************************
 * According to guidelines, if you have a drawer on your page, you should always
 * have a button that opens it. Get a reference to the RadSideDrawer view and
 * use the showDrawer() function to open the app drawer section.
 *************************************************************/
function onDrawerButtonTap(args) {
    const sideDrawer = frameModule.topmost().getViewById("sideDrawer");
    sideDrawer.showDrawer();
}

function onNavigationItemTap(args) {
    console.log('onNavigationItemTap');
    const component = args.object;
    const componentRoute = component.route;

    frameModule.topmost().navigate({
        moduleName: componentRoute
    });
}

exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;
exports.onNavigationItemTap = onNavigationItemTap;

