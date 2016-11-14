var submissionTitle = function(title){
    $('#submissionTitle').html(title);
};
var clearSubmission = function(){
  $("#word-submission-form")[0].reset();
    $("#word-sub").prop("disabled", false);
    $(".def-line").not(":last").remove();
}
var addTranslation = function(){
    var inputString = '<div class="def-line"><div class="large-10 medium-10 small-10 columns"><input type="text" class="def-sub" placeholder="Translation"></div><div class="large-2 medium-2 small-2 columns"><span onclick="addTranslation()" class="add-btn-field white lnr lnr-plus-circle"></span></div></div>';

      $('.add-btn-field').remove();

    $('.input-row').append(inputString);
};



var myWords;
var loadWords = function(){

  var url = './words'
  loadURL(url, function(data){
   myWords = JSON.parse(data);

   //BEGIN MARKUP

   var markUp = "";
      for (var i = 0; i < myWords.length; i++){
        markUp +='<div class="single-word row">  <div class=" columns no-padding small-2 large-1"><span data-id = '+ myWords[i]._id +' class=" edit-btn lnr lnr-pencil md-trigger"></span></div><div class="columns small-10 large-11"><h3 class="word">'
        markUp+= myWords[i].word +"</h3>";
        markUp+="<p class='italic definition'>" + myWords[i].def +"</p></div></div>";
      }
      document.getElementById("wordCont").innerHTML = markUp;
      addListeners();
      $('.edit-btn').on('click', function() {
        var tempWord = $(this).parent().parent().find('.word').html();
        var tempDef = $(this).parent().parent().find('.definition').html();

        $('#word-sub').val(tempWord);
        $('.def-sub').val(tempDef);
        $("#word-sub").prop("disabled", true);
        submissionTitle('Edit Translation');
  });

  });
   
}; 

var addWord =function(){
  if(document.getElementById('word-sub').value != "" || document.getElementsByClassName('def-sub').value != ""){
  var theUser = "test";
  var url = './addword?user=' + theUser;
  var defArray = $('.def-sub').valuesArr();
  url += "&word=" + encodeURIComponent(document.getElementById('word-sub').value);
  url += "&def=" + JSON.stringify(defArray);
  loadURL(url, function(data){
    
  });
  loadWords();
}
else{
  alert("Please add content dummy.");
}
  loadWords();
  $("#word-submission-form")[0].reset();
};

var deleteAllWords = function(){
  var theUser = "test";
  var url = './removeAllWords?user=' + theUser;
  loadURL(url, function(data){
  });
  loadWords();
}

$.fn.valuesArr = function()
  {
    var a = [];
    $.each(this, function(i, field){
        a.push(field.value);
    });
    return a;
  } 