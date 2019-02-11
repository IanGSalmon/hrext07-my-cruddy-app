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
    $('.notes-data').append('<br><button class="btn-update">Update</button>&nbsp<button class="btn-delete">Delete</button>');
  }

  var createLargeView = function(event, keyData) {
    var keyData = keyData || event.innerText;
    var displayText = JSON.parse(localStorage.getItem(keyData));

    $('.container-workspace').html('');
    $('.container-workspace').append('<div class="display-large-view"></div>');
    $('.display-large-view').append('<div class="display-data-name">' + keyData + '</div><br>');
    $('.display-large-view').append('<div class="container-large-view-btns"><br><button class="btn-update">Update</button>&nbsp<button class="btn-delete">Delete</button></div><br>');
    $('.display-large-view').append('<div class="container-large-view-data"></div>');
    Object.keys(displayText).forEach(key => {
      $('.container-large-view-data').append('<div class="display-data-item">' + key + JSON.stringify(displayText[key]) + '</div>');
    })
  }

  var createLargeViewDeleteBtns = function(event) {
    var keyData = $('.display-data-name').text();
    var displayText = JSON.parse(localStorage.getItem(keyData));

    $('.container-workspace').html('');
    $('.container-workspace').append('<div class="display-large-view"></div>');
    $('.display-large-view').append('<div class="display-data-name">' + keyData + '</div><br>');
    $('.display-large-view').append('<div class="delete-warning"><font color="red">Select which lesson you would like to delete</font></div><br>');
    $('.display-large-view').append('<div class="container-large-view-data"></div>');
    Object.keys(displayText).forEach(key => {
      $('.container-large-view-data').append('<div class="display-data-item"><button class="btn-delete-item">Delete</button>&nbsp' + key + '&nbsp&nbsp' + JSON.stringify(displayText[key]) + '</div>');
    })
    $('.container-large-view-data').append('<div><br><button class="btn-return-to-large-view">Cancel</button>');
  }

  var createLargeViewUpdateBtns = function(event) {
      var keyData = $('.display-data-name').text();
    var displayText = JSON.parse(localStorage.getItem(keyData));

    $('.container-workspace').html('');
    $('.container-workspace').append('<div class="display-large-view"></div>');
    $('.display-large-view').append('<div class="display-data-name">' + keyData + '</div><br>');
    $('.display-large-view').append('<div class="update-notification"><font color="blue">Select which lesson you would like to update</font></div><br>');
    $('.display-large-view').append('<div class="container-large-view-data"></div>');

    $('.notes-data').append('<div class="display-data-name">Student:&nbsp' + keyData + '</div><br>');

    Object.keys(displayText).forEach(key => {
      $('.container-large-view-data').append('<div class="display-data-item"><button class="btn-update-item">Update</button>&nbsp' + key + '&nbsp&nbsp' + JSON.stringify(displayText[key]) + '</div>');
    })
    $('.container-large-view-data').append('<div><br><button class="btn-return-to-large-view">Cancel</button>');
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

    $('.notes-data').append('<br><div><button class="btn-back-to-notes">Return to notes</button></div>');
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

    $('.notes-data').append('<br><div><button class="btn-back-to-notes">Return to notes</button></div>');
  }

  var createLessonForm = function() {
    $('.container-workspace').prepend('<div class="container-notes"><div class="container-notes-title"><div class="notes-title">Take Notes Here</div></div><div class="container-form"><input type="text" class="input-name" placeholder="name"><input type="text" class="input-date" placeholder="date"><input type="text" class="input-instrument" placeholder="instrument"><input type="text" class="input-piece" placeholder="piece"><button class="btn-save">Save</button><button class="btn-clear">Clear</button><button class="btn-cancel-note">Cancel this note</button></div></div>');
  }

  var clearForm = function() {
    $('.input-name').val('');
    $('.input-date').val('');
    $('.input-instrument').val('');
    $('.input-piece').val('');
  }

  var createInstructionsView = function() {
    $('.container-workspace').html('');
    $('.container-workspace').append('<div class="container-view-notes"><div class="notes-data">Select "View Student" or "Take Notes" to begin!</div></div>');
  }

  var addDividerEnd = function() {
    $('.container-workspace').append('<div class="divider"></div>');
  }

  var addDividerBegin = function(){
    $('.container-workspace').prepend('<div class="divider"></div>');
  }

  var createTempSaveObject = function() {
    localStorage.setItem('temp', "{}");
  }

  var writeTempToView = function() {
    $('.notes-data').append(localStorage.temp);
    $('.notes-data').append('<div class="submission-area"></div>');
    $('.submission-area').append('<button class="btn-add">Submit</button>');
  }

  $(".btn-take-notes").on('click', function() {
    if ($(".container-select-student").css("visibility") === "hidden") {
      $(".container-select-student").css("visibility", "visible");
    } else {
      $(".container-select-student").css("visibility", "hidden");
      $(".dropdown-content").css('visibility', 'hidden');
    }

    createInstructionsView();
    addDividerBegin();
    createLessonForm();
    $('.notes-data').text('');
  });

  $(".btn-view-student").on('click', function() {
    if ($(".container-select-student").css("visibility") === "hidden") {
      $(".container-select-student").css("visibility", "visible");
    } else {
      $(".container-select-student").css("visibility", "hidden");
      $(".dropdown-content").css('visibility', 'hidden');
      createInstructionsView();
    }
  });
  
  $(".container-main").on('click', '.btn-select-student', function() {
    if ($(".dropdown-content").css("visibility") === "hidden") {
      $(".dropdown-content").css('visibility', 'visible');
    } else {
      $(".dropdown-content").css('visibility', 'hidden');
      createInstructionsView();

    }
  })

  $('.container-main').on('click', '.btn-back-to-notes', function(e) {
    var keyData = $('.display-data-name').text().slice(9);
    createView(null, keyData);
  })

  $('.container-main').on('click', '.btn-dropdown-name', function(e) {
    var student = e.currentTarget;
    createLargeView(student);
  })

  $('.container-main').on('click', '.btn-delete-item', function(e) {
    var name = $('.display-data-name').text();
    console.log(this.parent());

    // deleteLesson(name, dateToDel);
  })

  // might not need when I move button to large view
  $('.container-main').on('click', '.btn-update-item', function(e) {
    console.log('updating');
  })

  $('.container-main').on('click', '.btn-update', function(e) {
    createLargeViewUpdateBtns();
  })

  $('.container-main').on('click', '.btn-delete', function(e) {
    createLargeViewDeleteBtns();
  })

  $('.container-main').on('click', '.btn-save', function(e) {
    var keyTemp = 'temp';
    var keyData = $('.input-name').val();
    var date = $('.input-date').val();
    var valueData = {  
        [date]: {
                instrument: $('.input-instrument').val(),
                piece: $('.input-piece').val()
                },
        };

    localStorage.setItem(keyTemp, JSON.stringify(valueData));
    writeTempToView();
  })

  $('.container-main').on('click', '.btn-add', function(e){
    var tempObj = JSON.parse(localStorage.temp);
    var keyData = $('.input-name').val();
    var date = Object.keys(tempObj)[0];
    var valueData = {};
    valueData[date] = tempObj[date];
    console.log(valueData);
    // var valueData = {  
    //     [date]: {
    //             instrument: $('.input-instrument').val(),
    //             piece: $('.input-piece').val()
    //             },
    //     };

    // // write to db
    if (localStorage[keyData]) {
      var existingObj = JSON.parse(localStorage.getItem(keyData));
      existingObj[date] = valueData[date];
      localStorage.setItem(keyData, JSON.stringify(existingObj));
    } else {
      localStorage.setItem(keyData, JSON.stringify(valueData));
    };
    // // read from db
    // var displayText = JSON.parse(localStorage.getItem(keyData));

    // createView(undefined, keyData, displayText);
    // createDropdownButtons();
    // clearForm();
    clearForm();
    $('.notes-data').html('');
    createDropdownButtons();
  });

  $('.container-main').on('click', '.btn-clear', function(){
    localStorage.clear();
    $('.container-data').text('');
  });

  // hiding while I play with large view
  // $('.container-main').on('click','.btn-update', function(e) {
  //   createButtonViewUpdate();
  // });

  // $('.container-main').on('click','.btn-delete', function(e) {
  //   createButtonViewDelete();
  // })

  $('.container-main').on('click', '.btn-cancel-note', function(e) {
    $('.container-notes').append('<button class="btn-confirm-cancel">Are you sure?</button>');
  })

  $('.container-main').on('click', '.btn-confirm-cancel', function(e) {
    $('.container-workspace').html('');
    createInstructionsView();
  })

  $('.container-main').on('click', '.btn-delete-item', function(e) {
    // deleteLesson(name, date);
    var keyData = $('.display-data-name').text();

  })

  $('.container-main').on('click', '.btn-return-to-large-view', function(e) {
    var keyData = $('.display-data-name').text();
    createLargeView(null, keyData);
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
  createInstructionsView();
  createDropdownButtons();
  createTempSaveObject();


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