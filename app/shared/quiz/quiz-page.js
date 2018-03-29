const frameModule = require("ui/frame");
const CheckBox = require("nativescript-checkbox");
const http = require("http");

function pageLoaded(){
    
}

function onNavigatingFrom(args){
    const page = args.object;
    if (page.ios) {
        
    } else {        
        
    }
}

function onNavigatingTo(args) {
    const page = args.object;
    if (page.ios) {
        
    } else {
        page.actionBarHidden = true;
    }

    if (args.isBackNavigation) {
        //return;
    }
    var observableModule = require("data/observable");
    var ObservableArray = require("data/observable-array").ObservableArray;
    var lista = new ObservableArray();
    const context = page.navigationContext;

    http.getJSON("http://tlcgolfit.se/webservices/tlcgolfit/api/v1/quizzes/1?api_key=jbjhvbas56fa865faityvasdfa5f8as5fd8a6scda864s5cd8a4sdc863c861c8136dc1864wq86drc8q6cc1cghfx12gfmoi909").then(function(result) {
        if(!result.length) {
            lista.push({id: result.id, name: result.name, description: result.description, quiztype_id: result.quiztype_id });
        }
        for (i=0;i<result.length;i++) {
            lista.push({id: result[i].id, name: result[i].name, description: result[i].description, quiztype_id: result[i].quiztype_id });
        };
        var pageData = new observableModule.fromObject({
            videoList: lista,
            quiztype: context.quiztype
        });
        const page = args.object;
        page.bindingContext = pageData;
    }, function(error) {
        console.error(JSON.stringify(error));
    });
}

function toggleCheck(id) {
    let checkBox = topmost().getViewById(id);
    checkBox.toggle();
}
   
function getCheckProp(id) {
    let checkBox = topmost().getViewById(id);
    console.log('checked prop value = ' + checkBox.checked);
}

function submitquiz(args) {
    const component = args.object;
    console.log(component.id);
    //getCheckProp(id);
}

function onPropertyChanged(args) {
    const component = args.object;
    console.log(component.id);  
}

exports.onNavigatingTo = onNavigatingTo;
exports.pageLoad=pageLoaded;
exports.onNavigatingFrom=onNavigatingFrom;
exports.toggleCheck=toggleCheck;
exports.getCheckProp=getCheckProp;
exports.submitquiz=submitquiz;
exports.onPropertyChanged=onPropertyChanged;