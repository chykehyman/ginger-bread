//functions to change test name headings
function call1() {
    $(document).ready(function () {
        $("#topic").text("HTML Test: Answer All Questions");

    });
}
function call2() {
    $(document).ready(function () {
        $("#topic").text("Javascript Test: Answer All Questions");

    });
}

function call3() {
    $(document).ready(function () {
        $("#topic").text("Firebase Test: Answer All Questions");

    });
}
function call4() {
    $(document).ready(function () {
        $("#topic").text("Android Test: Answer All Questions");

    });
}
var number_of_questions, test_type = "tes",
 first_page = 0, last_page = 4,
 current_page = first_page, list_out_options = document.getElementById("baba"),
 correct_answer = 0, choices,
 choice, correct_option;
window.onload = function() {
    show_current_page(test_type,current_page);
    //count_down(1,5,"timing");
    //alert();
    //show_my_result();
};

function saveAnswer(question_id, option_id) {
    var answerObject;
    if(localStorage.answerobj) {
        answerObject= localStorage.answerobj;
    }
    else {
        answerObject= {};
    }
    answerObject[question_id]= option_id;
    localStorage.setItem("answerobj", answerObject);
}

function getSavedAnswer(question_id, option_id) {
    if(localStorage.answerobj) {
        var savedanswerObject= localStorage.answerobj;
    }
}

function next_page() {
    check_clicked_option();
    list_out_options.innerHTML = "";
    if (current_page < last_page) {
        current_page++;
        show_current_page(test_type,current_page);

    }else{
        current_page = first_page;
        show_current_page(test_type,current_page);
    }
}
function previous_page(){
    list_out_options.innerHTML = "";
    if(current_page>first_page){
        current_page--;
        show_current_page(test_type,current_page);
    }else{
        current_page = last_page;
        show_current_page(test_type,current_page);
    }
}

function check_clicked_option(){
    choices = document.getElementsByName("same");
    //alert(choices.length);
    // //alert(correct_option);
    for(var i = 0; i<choices.length; i++){
    //     //     alert(choices[i].value);
    //     // }
       if(choices[i].checked) {
             choice = choices[i].value;
           // alert(correct_option);
           //   alert(choice);
    //         // alert(correct_answer);
            if (choice.trim() === correct_option.trim()){
                //alert(correct_option);
                correct_answer++;
                //alert(correct_answer);
            }//else{alert(correct_answer);}
       }
    }

    // ////alert(choices.length);
}
//check_clicked_option();

function show_current_page(test_type,cur_page){
    var data,
     opt,
     xmlhttp;
    if (window.XMLHttpRequest) {
        // code for modern browsers
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("GET", "jdata.json", true);
    xmlhttp.setRequestHeader("content-type", "application/json", true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            data = JSON.parse(xmlhttp.responseText);
            number_of_questions = data[test_type].length;
           //alert(number_of_questions);
            //alert(correct_option = data[test_type][cur_page]['page']['correct']);
            var show_question = document.getElementById("questions");
            show_question.innerHTML = data[test_type][cur_page]['page']['qst'];
            for(var j=0; j<data[test_type][cur_page]['page']['options'].length; j++) {
                if (j == 0) {
                    opt = "a";
                } else if (j == 1) {
                    opt = "b";
                } else if (j == 2) {
                    opt = "c";
                } else if (j == 3) {
                    opt = "d";
                }

                list_out_options.innerHTML += '<input type="radio" name="same" value= " '+ data[test_type][cur_page]['page']['options'][j][opt] +'" > '+ data[test_type][cur_page]["page"]["options"][j][opt] + '<br><br>';
                correct_option = data[test_type][cur_page]['page']['correct'];
            }

           //check_clicked_option();
        }
    };
    xmlhttp.send(null);

}
//
function show_my_result(){
            //number_of_questions = data[test_type].length;
            check_clicked_option();

            var gar = document.getElementById("show");
            gar.innerHTML = "You got " + correct_answer + " questions out of " + number_of_questions + " questions";
            document.getElementById("submit").disabled=true;
            document.getElementById("prev").disabled=true;
            document.getElementById("next").disabled=true;



}

function count_down(min,secs,elem){
    //var element = document.getElementById(display);
    var start_timer = document.getElementById(elem);
    start_timer.innerHTML = "Time remaining : " + min + " : " + secs;
    if(min===0 && secs===0){
        clearTimeout(timer);
        //alert("Your time is up");
        show_my_result();
        document.getElementById("submit").disabled=true;
        document.getElementById("prev").disabled=true;
        document.getElementById("next").disabled=true;
//            element.innerHTML = '<h2>This is ur result chike</h2>';
//            element.innerHTML += '<p>You scored excellent</p>';
        return;
    }
    if(secs==0){
        min--;
        secs = 5;
    }
    secs--;
    var timer;
    timer = setTimeout('count_down(' + min + ',' + secs + ',"' + elem + '")', 1000);
}

