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

  var deleteLesson = function(key, date) {
    var copyNotesObj = JSON.parse(localStorage[key]);
    delete copyNotesObj[date];
    // console.log(typeof key);
    localStorage.setItem(key, JSON.stringify(copyNotesObj));
    createView(null, key);
  }

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

  var createButtonViewDelete = function() {
    var keyData = $('.display-data-name').text();
    var displayText = JSON.parse(localStorage.getItem(keyData));

    $('.notes-data').html('');
    $('.notes-data').append('<div class="delete-warning"><font color="red">Select which lesson you would like to delete</font></div><br>');
    $('.notes-data').append('<div class="display-data-name">Student:&nbsp' + keyData + '</div><br>');

    Object.keys(displayText).forEach(key => {
      $('.notes-data').append('<div><button class="btn-del-item">' + key +':&nbsp&nbsp' + JSON.stringify(displayText[key]) + '</button></div>');
    })
  }

  var createButtonViewUpdate = function() {
    var keyData = $('.display-data-name').text();
    var displayText = JSON.parse(localStorage.getItem(keyData));

    $('.notes-data').html('');
    $('.notes-data').append('<div class="update-notification"><font color="blue">Select which lesson you would like to update</font></div><br>');
    $('.notes-data').append('<div class="display-data-name">Student:&nbsp' + keyData + '</div><br>');

    Object.keys(displayText).forEach(key => {
      $('.notes-data').append('<div><button class="btn-update-item">' + key +':&nbsp&nbsp' + JSON.stringify(displayText[key]) + '</button></div>');
    })
  }

  var createLessonForm = function() {
    $('.container-workspace').prepend('<div class="container-notes"><div class="container-notes-title"><div class="notes-title">Take Notes Here</div></div><div class="container-form"><input type="text" class="input-name" placeholder="name"><input type="text" class="input-date" placeholder="date"><input type="text" class="input-instrument" placeholder="instrument"><input type="text" class="input-piece" placeholder="piece"><button class="btn-add">Submit</button><button class="btn-update">Update</button><button class="btn-delete">Delete</button><button class="btn-clear">Clear</button><button class="btn-cancel-note">Cancel this note</button></div></div>');
  }

  var clearForm = function() {
    $('.input-name').val('');
    $('.input-date').val('');
    $('.input-instrument').val('');
    $('.input-piece').val('');
  }

  var createNotesView = function() {
    $('.container-workspace').append('<div class="container-view-notes"><div class="notes-data">Select "View Student" or "Take Notes" to begin!</div></div>');
  }

  var addDividerEnd = function() {
    $('.container-workspace').append('<div class="divider"></div>');
  }

  var addDividerBegin = function(){
    $('.container-workspace').prepend('<div class="divider"></div>');
  }

  $(".btn-take-notes").on('click', function() {
    if ($(".container-select-student").css("visibility") === "hidden") {
      $(".container-select-student").css("visibility", "visible");
    } else {
      $(".container-select-student").css("visibility", "hidden");
      $(".dropdown-content").css('visibility', 'hidden');
    }

    $('.notes-data').text('');
    addDividerBegin();
    createLessonForm();
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

  $('.dropdown-content').on('click', 'button', function(e) {
    var student = e.currentTarget;
    createView(student);
  })

  $('.notes-data').on('click', '.btn-del-item', function(e) {
    var nameText = $('.display-data-name').text();
    var name = nameText.slice(9);
    var buttonText = e.currentTarget.innerText;
    var splitText = buttonText.split(':');
    var dateToDel = splitText[0];

    deleteLesson(name, dateToDel);
  })

  $('.notes-data').on('click', '.btn-update-item', function(e) {
    console.log('updating');
  })


  $('.container-main').on('click', '.btn-add', function(e){
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

  $('.container-main').on('click', '.btn-clear', function(){
    localStorage.clear();
    $('.container-data').text('');
  });

  $('.container-main').on('click','.btn-update', function(e) {
    createButtonViewUpdate();
  });

  $('.container-main').on('click','.btn-delete', function(e) {
    createButtonViewDelete();
  })

  $('.container-main').on('click', '.btn-cancel-note', function(e) {
    $('.container-notes').append('<button class="btn-confirm-cancel">Are you sure?</button>');
  })

  $('.container-main').on('click', '.btn-confirm-cancel', function(e) {
    $('.container-workspace').html('');
    createNotesView();
  })



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
  createNotesView();
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