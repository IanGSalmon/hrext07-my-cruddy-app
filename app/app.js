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
    }
  });

  
  $(".btn-select-student").on('click', function() {
    if ($(".dropdown-content").css("visibility") === "hidden") {
      $(".dropdown-content").css('visibility', 'visible');
    } else {
      $(".dropdown-content").css('visibility', 'hidden');
    }

  })

  //var keyData = 'ourKey'; // going to need to make this dynamic?


  $('.btn-add').on('click', function(e){
    console.log(e);
    var keyData = $('.input-key').val();
    var valueData = $('.input-value').val();
    console.log(keyData);
    // write to db
    localStorage.setItem(keyData, valueData);
    // read from db
    var displayText = keyData + ' | ' + localStorage.getItem(keyData);
    // this only displays the last one? might want to switch to html
    // and append a div
    // <div class="display-data-item" data-keyValue="keyData">valueData</div>
    // if you use backticks ` you can use ${templateLiterals}
    // TODO make this vars make sense across the app
    $('.notes-data').append('<div class="display-data-item" data-keyValue="'+ keyData +'">'+keyData+"&nbsp&nbsp&nbsp"+valueData+'</div>');
    $('.dropdown-content').append('<a href="#">' + keyData + '</a>');
    $('.input-key').val('');
    $('.input-value').val('');

    // add to viewing area
    // $(".notes-data").html('');
    // $(".container-view-notes").append()

  });


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
  $('.btn-clear').click(function(){
    localStorage.clear();
    $('.notes-data').text('');
  });

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