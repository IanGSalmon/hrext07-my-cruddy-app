$(document).ready(function(){

  var deleteLesson = function(key, date) {
    var copyNotesObj = JSON.parse(localStorage[key]);
    delete copyNotesObj[date];
    localStorage.setItem(key, JSON.stringify(copyNotesObj));
  }

  var createDropdownButtons = function() {
    $('.dropdown-content').html('');
    Object.keys(localStorage).forEach(key => {
      if (key !== 'temp') {
        $('.dropdown-content').append('<button class="btn-dropdown-name">' + key + '</button>&nbsp&nbsp');
      }
    })
  }

  var createLargeView = function(event, keyData) {
    var keyData = keyData || event.innerText;
    var displayText = JSON.parse(localStorage.getItem(keyData));

    $('.container-workspace').html('');
    $('.container-workspace').append('<div class="display-large-view"></div>');
    $('.display-large-view').append('<h3 class="display-data-name">' + keyData + '</h3>');
    $('.display-large-view').append('<div class="container-large-view-btns"><button class="btn-update">Update</button>&nbsp<button class="btn-delete">Delete</button></div><br>');
    $('.display-large-view').append('<div class="container-large-view-data"></div>');

    if ($('.container-large-view-data').css('display') !== 'grid') {
      $('.container-large-view-data').css('display', 'grid');
    }

    $('.container-large-view-data').append('<h3>Date</h3>');
    $('.container-large-view-data').append('<h3>Instrument</h3>');
    $('.container-large-view-data').append('<h3>Tonalization</h3>');
    $('.container-large-view-data').append('<h3>Scales</h3>');
    $('.container-large-view-data').append('<h3>Etude</h3>');
    $('.container-large-view-data').append('<h3>Review Pieces</h3>');
    $('.container-large-view-data').append('<h3>Working Piece</h3>');
    $('.container-large-view-data').append('<h3>Reading</h3>');

    Object.keys(displayText).forEach(key => {
      var currLessonData = displayText[key];
      $('.container-large-view-data').append('<div class="display-data-item">' + key + '</div>');
      Object.keys(currLessonData).forEach(item => {
        $('.container-large-view-data').append('<span>' + currLessonData[item] + '</span>')
      })
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
    $('.container-large-view-data').css('display', 'flex');
    $('.container-large-view-data').css('flex-direction', 'column');
    Object.keys(displayText).forEach(key => {
      $('.container-large-view-data').append('<div class="display-data-item"><button class="btn-delete-item">Delete</button>&nbsp' + key + '&nbsp&nbsp</div>');
      $('.container-large-view-data').append('<p class="display-data-details"><i>Instrument:</i>&nbsp' + displayText[key]["instrument"] + ',&nbsp&nbsp<i>Tonalization:</i>&nbsp' + displayText[key]["tonalization"] +',&nbsp&nbsp<i>Scales:</i>&nbsp' + displayText[key]["scales"] + ',&nbsp&nbsp<i>Etude:</i>&nbsp' + displayText[key]["etude"] +',&nbsp&nbsp<i>Review Pieces:</i>&nbsp' + displayText[key]["review pieces"] + ',&nbsp&nbsp<i>Working Piece:</i>&nbsp' + displayText[key]["working piece"] +',&nbsp&nbsp<i>Reading:</i>&nbsp' + displayText[key]["reading"]);
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
    $('.container-large-view-data').css('display', 'flex');
    $('.container-large-view-data').css('flex-direction', 'column');
    $('.notes-data').append('<div class="display-data-name">Student:&nbsp' + keyData + '</div><br>');

    Object.keys(displayText).forEach(key => {
      $('.container-large-view-data').append('<div class="display-data-item"><button class="btn-update-item">Update</button>&nbsp' + key + '&nbsp&nbsp</div>');
      $('.container-large-view-data').append('<p class="display-data-details"><i>Instrument:</i>&nbsp' + displayText[key]["instrument"] + ',&nbsp&nbsp<i>Tonalization:</i>&nbsp' + displayText[key]["tonalization"] +',&nbsp&nbsp<i>Scales:</i>&nbsp' + displayText[key]["scales"] + ',&nbsp&nbsp<i>Etude:</i>&nbsp' + displayText[key]["etude"] +',&nbsp&nbsp<i>Review Pieces:</i>&nbsp' + displayText[key]["review pieces"] + ',&nbsp&nbsp<i>Working Piece:</i>&nbsp' + displayText[key]["working piece"] +',&nbsp&nbsp<i>Reading:</i>&nbsp' + displayText[key]["reading"])
    })
    $('.container-large-view-data').append('<div><br><button class="btn-return-to-large-view">Cancel</button>');
  }

  var createUpdateForm = function() {
    $('.container-workspace').prepend('<div class="container-notes"><div class="container-notes-title"></div><div class="container-form">Name:&nbsp<input type="text" class="input-name" value="' + arguments[0] + '">Date:&nbsp<input type="text" class="input-date" value="' + arguments[1] + '">Instrument:&nbsp<input type="text" class="input-instrument" placeholder="instrument"><br>Tonalization:&nbsp<input type="text" class="input-tonalization" placeholder="tonalization">Scales:&nbsp<input type="text" class="input-scales" placeholder="scales">Etude:&nbsp<input type="text" class="input-etude" placeholder="etude">Review&nbspPieces:&nbsp<input type="text" class="input-review" placeholder="review pieces">Working&nbspPiece:&nbsp<input type="text" class="input-working-piece" placeholder="working piece">Reading:&nbsp<input type="text" class="input-reading" placeholder="reading"></div><div class="form-btns"><button class="btn-save">Save</button><button class="btn-cancel-note">Cancel this note</button><button class="btn-confirm-cancel">Are you sure?</button></div>');
  }

  var createLessonForm = function() {
    $('.container-workspace').prepend('<div class="container-notes"><div class="container-notes-title"></div><div class="container-form">Name:&nbsp<input type="text" class="input-name" placeholder="name">Date:&nbsp<input type="text" class="input-date" placeholder="date">Instrument:&nbsp<input type="text" class="input-instrument" placeholder="instrument"><br>Tonalization:&nbsp<input type="text" class="input-tonalization" placeholder="tonalization">Scales:&nbsp<input type="text" class="input-scales" placeholder="scales">Etude:&nbsp<input type="text" class="input-etude" placeholder="etude">Review&nbspPieces:&nbsp<input type="text" class="input-review" placeholder="review pieces">Working&nbspPiece:&nbsp<input type="text" class="input-working-piece" placeholder="working piece">Reading:&nbsp<input type="text" class="input-reading" placeholder="reading"></div><div class="form-btns"><button class="btn-save">Save</button><button class="btn-cancel-note">Cancel this note</button><button class="btn-confirm-cancel">Are you sure?</button></div>');
  }

  var clearForm = function() {
    $('.input-name').val('');
    $('.input-date').val('');
    $('.input-instrument').val('');
    $('.input-tonalization').val('');
    $('.input-scales').val('');
    $('.input-etude').val('');
    $('.input-review').val('');
    $('.input-working-piece').val('');
    $('.input-reading').val('');
  }

  var createInstructionsView = function() {
    $('.container-workspace').html('');
    $('.container-workspace').append('<div class="container-view-notes"><div class="notes-data"><div class="text-instructions">Select "View Student" or "Take Notes" to begin!&nbsp&nbsp&nbsp&nbsp</div></div></div>');
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

  var writeNoteToView = function() {
    var name = $('.input-name').val();
    var date = $('.input-date').val();
    var tempObj = JSON.parse(localStorage[name]);

    var instrument = tempObj[date]["instrument"];
    var tonalization = tempObj[date]["tonalization"];
    var scales = tempObj[date]["scales"];
    var etude = tempObj[date]["etude"];
    var reviewPieces = tempObj[date]["review pieces"];
    var workingPiece = tempObj[date]["working piece"];
    var reading = tempObj[date]["reading"];

    $('.notes-data').text('');
    $('.notes-data').append('<div class="temp-name">Name:&nbsp</div><div class="temp-date">Date:&nbsp</div><div class="temp-instrument">Instrument:&nbsp</div><br><div class="temp-tonalization">Tonalization:</div><br><div class="temp-scales">Scales:</div><br><div class="temp-etude">Etude:</div><br><div class="temp-review">Review&nbspPieces:</div><br><div class="temp-working-piece">Working&nbspPiece:</div><br><div class="temp-reading">Reading:</div>');


    $('.temp-name').append('<span class="inline-notes">' + name + '</span>');
    $('.temp-date').append('<span class="inline-notes">' + date + '</span>');
    $('.temp-instrument').append('<span class="inline-notes">' + instrument + '</span>');
    $('.temp-tonalization').append('<div class="temp-notes">' + tonalization + '</div>');
    $('.temp-scales').append('<div class="temp-notes">' + scales + '</div>');
    $('.temp-etude').append('<div class="temp-notes">' + etude + '</div>');
    $('.temp-review').append('<div class="temp-notes">' + reviewPieces + '</div>');
    $('.temp-working-piece').append('<div class="temp-notes">' + workingPiece + '</div>');
    $('.temp-reading').append('<div class="temp-notes">' + reading + '</div>');

    $('.notes-data').append('<br><div class="submission-area"></div>');
    $('.submission-area').append('<span class="warning-submit">WARNING:&nbsp <br> Note is not fully saved until you click "submit"!</span><br><button class="btn-add">Submit</button>');
  }

  var writeTempToView = function() {
    var name = $('.input-name').val();
    var date = $('.input-date').val();
    var tempObj = JSON.parse(localStorage.temp);
    var parsedVal = tempObj[date]["instrument"];

    var instrument = tempObj[date]["instrument"];
    var tonalization = tempObj[date]["tonalization"];
    var scales = tempObj[date]["scales"];
    var etude = tempObj[date]["etude"];
    var reviewPieces = tempObj[date]["review pieces"];
    var workingPiece = tempObj[date]["working piece"];
    var reading = tempObj[date]["reading"];

    $('.notes-data').text('');
    $('.notes-data').append('<div class="temp-name">Name:&nbsp</div><div class="temp-date">Date:&nbsp</div><div class="temp-instrument">Instrument:&nbsp</div><br><div class="temp-tonalization">Tonalization:</div><br><div class="temp-scales">Scales:</div><br><div class="temp-etude">Etude:</div><br><div class="temp-review">Review&nbspPieces:</div><br><div class="temp-working-piece">Working&nbspPiece:</div><br><div class="temp-reading">Reading:</div>');

    $('.temp-name').append('<span class="inline-notes">' + name + '</span>');
    $('.temp-date').append('<span class="inline-notes">' + date + '</span>');
    $('.temp-instrument').append('<span class="inline-notes">' + instrument + '</span>');
    $('.temp-tonalization').append('<div class="temp-notes">' + tonalization + '</div>');
    $('.temp-scales').append('<div class="temp-notes">' + scales + '</div>');
    $('.temp-etude').append('<div class="temp-notes">' + etude + '</div>');
    $('.temp-review').append('<div class="temp-notes">' + reviewPieces + '</div>');
    $('.temp-working-piece').append('<div class="temp-notes">' + workingPiece + '</div>');
    $('.temp-reading').append('<div class="temp-notes">' + reading + '</div>');

    $('.notes-data').append('<br><div class="submission-area"></div>');
    $('.submission-area').append('WARNING::&nbsp <br> Note is not fully saved until you click "submit"!<br><button class="btn-add">Submit</button>');
  }

  $(".btn-take-notes").on('click', function() {
      $(".container-select-student").css("visibility", "hidden");
      $(".dropdown-content").css('visibility', 'hidden');

    createInstructionsView();
    addDividerBegin();
    createLessonForm();
    createTempSaveObject();
    $('.notes-data').html('');
    $('.notes-data').append('<div class="temp-name">Name:&nbsp</div><div class="temp-date">Date:&nbsp</div><div class="temp-instrument">Instrument:&nbsp</div><br><div class="temp-tonalization">Tonalization:</div><br><div class="temp-scales">Scales:</div><br><div class="temp-etude">Etude:</div><br><div class="temp-review">Review&nbspPieces:</div><br><div class="temp-working-piece">Working&nbspPiece:</div><br><div class="temp-reading">Reading:</div>');

});

  var writeNoteToTemp = function() {
    var name = $('.input-name').val();
    var date = $('.input-date').val();
    var tempObj = JSON.parse(localStorage[name]);

    localStorage.setItem('temp', JSON.stringify(tempObj));
  }

  var hasText = function(selector, key) {
    var date = $('.input-date').val();
    var tempObj = JSON.parse(localStorage.temp);
    
    if (selector.val().length) {
      return selector.val();
    }

    if (tempObj.hasOwnProperty(date)) {
      var oldNote = tempObj[date];
      var oldVal = oldNote[key];
      return oldVal;
    } else {
      return '';
    }
  }

  $(".btn-view-student").on('click', function() {
    if ($(".container-select-student").css("visibility") === "hidden") {
      $(".container-select-student").css("visibility", "visible");
    } else {
      $(".container-select-student").css("visibility", "hidden");
      $(".dropdown-content").css('visibility', 'hidden');
    }
    createInstructionsView();
  });
  
  $(".container-main").on('click', '.btn-select-student', function() {
    if ($(".dropdown-content").css("visibility") === "hidden") {
      $(".dropdown-content").css('visibility', 'visible');
    } else {
      $(".dropdown-content").css('visibility', 'hidden');
    }
  })

  $('.container-main').on('click', '.btn-dropdown-name', function(e) {
    var student = e.currentTarget;
    createLargeView(student);
  })

  $('.container-main').on('click', '.btn-delete-item', function(e) {
    var name = $('.display-data-name').text();
    var splitText = $(this).parent().text().split(/\s{1}/);
    var date = splitText[1] + ' ' + splitText[2];

    deleteLesson(name, date);
    createLargeViewDeleteBtns();
  })

  $('.container-main').on('click', '.btn-update-item', function(e) {
    var name = $('.display-data-name').text();
    var splitText = $(this).parent().text().split(/\s{1}/);
    var date = splitText[1] + ' ' + splitText[2];

    $('.container-workspace').html('');
    createInstructionsView();
    $('.notes-data').html('');
    addDividerBegin();
    createUpdateForm(name, date);
    writeNoteToView();
    writeNoteToTemp();
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
                instrument: hasText($('.input-instrument'), 'instrument'),
                tonalization: hasText($('.input-tonalization'), 'tonalization'),
                scales: hasText($('.input-scales'), 'scales'),
                etude: hasText($('.input-etude'), 'etude'),
                "review pieces": hasText($('.input-review'), 'review pieces'),
                "working piece": hasText($('.input-working-piece'), 'working piece'),
                reading: hasText($('.input-reading'), 'reading'),
                },
        };

    createTempSaveObject();
    localStorage.setItem(keyTemp, JSON.stringify(valueData));
    writeTempToView();
  })

  $('.container-main').on('click', '.btn-add', function(e){
    var tempObj = JSON.parse(localStorage.temp);
    var keyData = $('.input-name').val();
    var date = Object.keys(tempObj)[0];
    var valueData = {};
    valueData[date] = tempObj[date];

    if (localStorage[keyData]) {
      var existingObj = JSON.parse(localStorage.getItem(keyData));
      existingObj[date] = valueData[date];
      localStorage.setItem(keyData, JSON.stringify(existingObj));
    } else {
      localStorage.setItem(keyData, JSON.stringify(valueData));
    };
 
    clearForm();
    $('.notes-data').html('');
    createDropdownButtons();
    $('.container-view-notes').append('<div><font color="green">Success!</font></div>')

  });

  $('.container-main').on('click', '.btn-clear', function(){
    localStorage.clear();
    $('.container-data').text('');
  });

  $('.container-main').on('click', '.btn-cancel-note', function(e) {
    if ($('.btn-confirm-cancel').css('visibility') === 'hidden') {
      $('.btn-confirm-cancel').css('visibility', 'visible');
    } else {
      $('.btn-confirm-cancel').css('visibility', 'hidden');
    } 
  })

  $('.container-main').on('click', '.btn-confirm-cancel', function(e) {
    $('.container-workspace').html('');
    createInstructionsView();
  })

  $('.container-main').on('click', '.btn-return-to-large-view', function(e) {
    var keyData = $('.display-data-name').text();
    createLargeView(null, keyData);
  })

  createInstructionsView();
  createDropdownButtons();
  createTempSaveObject();

});