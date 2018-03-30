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
    var questions = new ObservableArray();
    var options = new ObservableArray();
    var quizlist = new ObservableArray();
    var quiz = "";
    const context = page.navigationContext;

    http.getJSON("http://tlcgolfit.se/webservices/tlcgolfit/api/v1/quizzes/fullquiz/1?api_key=jbjhvbas56fa865faityvasdfa5f8as5fd8a6scda864s5cd8a4sdc863c861c8136dc1864wq86drc8q6cc1cghfx12gfmoi909").then(function(result) {
        console.dir(result);
        quizlist = result;
        if(!result.length) {
            quiz = result.quiz;
            questions.push(result.questions);
            options.push(result.options);
        }
        for (i=0;i<result.length;i++) {
            quiz = result[i].quiz;
            questions.push(result[i].questions);
            options.push(result[i].options);
        };
        var pageData = new observableModule.fromObject({
            quiz: quiz,
            questionList: questions,
            optionList: options,
            quiztype: context.quiztype,
            quizList: quizlist
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
    
    let checkBox = frameModule.topmost().getViewById(component.id);
    console.log(checkBox.checked);
    if (checkBox.checked === "false") {
        checkBox.checked = "true";
        checkBox.text = String.fromCharCode(0xf058);
        //0xf14A 0xf192
    } else  {
        checkBox.checked = "false";
        checkBox.text = String.fromCharCode(0xf10C);
        //0xf096 0xf10C
    }
    console.log(checkBox.text);

}

exports.onNavigatingTo = onNavigatingTo;
exports.pageLoad=pageLoaded;
exports.onNavigatingFrom=onNavigatingFrom;
exports.toggleCheck=toggleCheck;
exports.getCheckProp=getCheckProp;
exports.submitquiz=submitquiz;
exports.onPropertyChanged=onPropertyChanged;