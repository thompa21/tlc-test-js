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

    http.getJSON("http://tlcgolfit.se/webservices/tlcgolfit/api/v1/quizzes/fullquiz/1?api_key=jbjhvbas56fa865faityvasdfa5f8as5fd8a6scda864s5cd8a4sdc863c861c8136dc1864wq86drc8q6cc1cghfx12gfmoi909")
        .then(function(result) {
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

function saveAnswer(remove, quizquestion_id, questionoption_id, user_id) {
    http.request({
        url: "http://tlcgolfit.se/webservices/tlcgolfit/api/v1/quizzes/answers/?api_key=jbjhvbas56fa865faityvasdfa5f8as5fd8a6scda864s5cd8a4sdc863c861c8136dc1864wq86drc8q6cc1cghfx12gfmoi909",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        content: JSON.stringify({ 
            delete: remove,
            quizquestion_id: quizquestion_id, 
            questionoption_id: questionoption_id, 
            user_id: user_id
        })
    }).then(function (response) {
    }, function (e) {
        console.log("Error occurred " + e);
    });
}

function onPropertyChanged(args) {
    
    const component = args.object;
    var remove = "false";
    let checkBox = frameModule.topmost().getViewById(component.id);

    http.request({
        url: "http://tlcgolfit.se/webservices/tlcgolfit/api/v1/quizzes/answers/?api_key=jbjhvbas56fa865faityvasdfa5f8as5fd8a6scda864s5cd8a4sdc863c861c8136dc1864wq86drc8q6cc1cghfx12gfmoi909",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        content: JSON.stringify({ 
            delete: checkBox.checked,
            quizquestion_id: checkBox.quizquestion_id, 
            questionoption_id: checkBox.questionoption_id, 
            user_id: 7
        })
    }).then(function (response) {
        console.dir(response)
        if (checkBox.checked === "false") {
            checkBox.checked = "true";
            checkBox.text = String.fromCharCode(0xe834); //MDI
        } else  {
            checkBox.checked = "false";
            remove = "true";
            checkBox.text = String.fromCharCode(0xe835); //MDI
        }
    }, function (e) {
        console.log("Error occurred " + e);
    });

    console.log("remove: " + remove);
    console.log("checked: " + checkBox.checked);
    console.log("quizquestion_id: " + checkBox.quizquestion_id);
    console.log("questionoption_id: " + checkBox.questionoption_id);
    //saveAnswer(remove, checkBox.quizquestion_id, checkBox.questionoption_id, "7")
}

exports.onNavigatingTo = onNavigatingTo;
exports.pageLoad=pageLoaded;
exports.onNavigatingFrom=onNavigatingFrom;
exports.onPropertyChanged=onPropertyChanged;