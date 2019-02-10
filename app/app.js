/*
Init app
interact with DOM
interact with localstorage

 */

$(document).ready(function(){
  // this is where we jquery
  //var keyData = 'ourKey'; // going to need to make this dynamic?

  // function showStudents() {
  //   if ($(".container-select-student").css("visibility") === "hidden") {
  //     $(".container-select-student").css("visibility", "visible");
  //   } else {
  //     $(".container-select-student").css("visibility", "hidden");
  //   }
  // }


  $(".btn-take-notes").on('click', function() {
    if ($(".container-select-student").css("visibility") === "hidden") {
      $(".container-select-student").css("visibility", "visible");
    } else {
      $(".container-select-student").css("visibility", "hidden");
    }
  });

  $(".btn-view-student").on('click', function() {
    if ($(".container-select-student").css("visibility") === "hidden") {
      $(".container-select-student").css("visibility", "visible");
    } else {
      $(".container-select-student").css("visibility", "hidden");
      $(".dropdown-content").css('visibility', 'hidden');
    }
  });
  
  $(".btn-select-student").on('click', function() {
    if ($(".dropdown-content").css("visibility") === "hidden") {
      $(".dropdown-content").css('visibility', 'visible');
    } else {
      $(".dropdown-content").css('visibility', 'hidden');
    }
  })



  $('.btn-delete').on('click', function() {
    // re-build viewing area, but dates are buttons
    // click date to delete item
    createButtonView();
  })

  $('.notes-data').on('click', 'button', function(e) {
    // find person to use as key
    var nameText = $('.display-data-name').text();
    var name = nameText.slice(9);

    // find date to delete
    var buttonText = e.currentTarget.innerText;
    var splitText = buttonText.split(':');
    var dateToDel = splitText[0];

    console.log(name);
    deleteLesson(name, dateToDel);
  })

  var deleteLesson = function(key, date) {
    var copyNotesObj = JSON.parse(localStorage[key]);
    delete copyNotesObj[date];
    // console.log(typeof key);
    localStorage.setItem(key, JSON.stringify(copyNotesObj));
    createView(null, key);
  }

  var createButtonView = function() {
    var keyData = $('.display-data-name').text();
    
    var displayText = JSON.parse(localStorage.getItem(keyData));
    console.log(displayText);

    $('.notes-data').html('');
    $('.notes-data').append('<div class="delete-warning"><font color="red">Select which lesson you would like to delete</font></div><br>');
    $('.notes-data').append('<div class="display-data-name">Student:&nbsp' + keyData + '</div><br>');

    Object.keys(displayText).forEach(key => {
      $('.notes-data').append('<div><button class="btn-data-item">' + key +':&nbsp&nbsp' + JSON.stringify(displayText[key]) + '</button></div>');
    })
  }

  $('.btn-add').on('click', function(e){
    var keyData = $('.input-name').val();
    var date = $('.input-date').val();
    var valueData = {  
        [date]: {
                instrument: $('.input-instrument').val(),
                piece: $('.input-piece').val()
                },
        };

    // write to db
    if (localStorage[keyData]) {
      var existingObj = JSON.parse(localStorage.getItem(keyData));
      existingObj[date] = valueData[date];
      localStorage.setItem(keyData, JSON.stringify(existingObj));
    } else {
      localStorage.setItem(keyData, JSON.stringify(valueData));
    };
    // read from db
    var displayText = JSON.parse(localStorage.getItem(keyData));

    createView(undefined, keyData, displayText);
    createDropdownButtons();
    clearForm();

  });


  $('.dropdown-content').on('click', 'button', function(e) {
    var student = e.currentTarget;
    createView(student);
  })

  $('.btn-clear').click(function(){
    localStorage.clear();
    $('.container-data').text('');
  });

  var createDropdownButtons = function() {
    $('.dropdown-content').html('');
    Object.keys(localStorage).forEach(key => {
      $('.dropdown-content').append('<button class="btn-dropdown-name">' + key + '</button>&nbsp&nbsp');
    })
  }

  var createView = function(event, keyData, displayText) {
    var keyData = keyData || event.innerText;
    var displayText = displayText || JSON.parse(localStorage.getItem(keyData));

    $('.notes-data').html('');
    $('.notes-data').append('<div class="display-data-name">' + keyData + '</div><br>');

    Object.keys(displayText).forEach(key => {
      $('.notes-data').append('<div class="display-data-item">' + key + JSON.stringify(displayText[key]) + '</div>');
    })
  }

  var clearForm = function() {
    $('.input-name').val('');
    $('.input-date').val('');
    $('.input-instrument').val('');
    $('.input-piece').val('');
  }


  // update db
    // need to expand when  more than 1 item is added

  // delete item
  // $('.container-data').on('click', '.display-data-item', function(e){
  //   console.log(e.currentTarget.dataset.keyvalue);
  //   var keyData = e.currentTarget.dataset.keyvalue;
  //   localStorage.removeItem(keyData);
  //   $('.container-data').text('');
  // });

  // delete all?
  createDropdownButtons();

});

// $(document).ready(function(){
//   // this is where we jquery
//   //var keyData = 'ourKey'; // going to need to make this dynamic?


//   $('.btn-add').on('click', function(e){
//     console.log(e);
//     var keyData = $('.input-key').val();
//     var valueData = $('.input-value').val();
//     // write to db
//     localStorage.setItem(keyData, valueData);
//     // read from db
//     var displayText = keyData + ' | ' + localStorage.getItem(keyData);
//     // this only displays the last one? might want to switch to html
//     // and append a div
//     // <div class="display-data-item" data-keyValue="keyData">valueData</div>
//     // if you use backticks ` you can use ${templateLiterals}
//     // TODO make this vars make sense across the app
//     $('.container-data').html('<div class="display-data-item" data-keyValue="'+ keyData +'">'+valueData+'</div>');
//     $('.input-key').val('');
//     $('.input-value').val('');
//   });


//   // update db
//     // need to expand when  more than 1 item is added

//   // delete item
//   $('.container-data').on('click', '.display-data-item', function(e){
//     console.log(e.currentTarget.dataset.keyvalue);
//     var keyData = e.currentTarget.dataset.keyvalue;
//     localStorage.removeItem(keyData);
//     $('.container-data').text('');
//   });
//   // delete all?
//   $('.btn-clear').click(function(){
//     localStorage.clear();
//     $('.container-data').text('');
//   });

// });