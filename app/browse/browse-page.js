const frameModule = require("ui/frame");

const BrowseViewModel = require("./browse-view-model");

function onNavigatingTo(args) {

    if (args.isBackNavigation) {
        return;
    }

    const page = args.object;
    page.bindingContext = new BrowseViewModel();
}

function onDrawerButtonTap(args) {
    const sideDrawer = frameModule.topmost().getViewById("sideDrawer");
    sideDrawer.showDrawer();
}

function onNavigationItemTap(args) {
    const component = args.object;
    const componentRoute = component.route;

    frameModule.topmost().navigate({
        moduleName: componentRoute,
        animated: false,
    });
}

exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;
exports.onNavigationItemTap = onNavigationItemTap;
