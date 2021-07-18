let hours = [
  "9AM",
  "10AM",
  "11AM",
  "12PM",
  "1PM",
  "2PM",
  "3PM",
  "4PM",
  "5PM",
  "6PM",
  "7PM",
  "8PM",
  "9PM",
  "10PM",
  "11PM",
];

let currDay = moment().format("dddd, MMMM Do");
let getHour = moment().hours();

$("#currentDay").append(currDay);

// Dynamically creates Timeblock HTML elements
$.each(hours, function (index, value) {
  $(".container").append(`<div class='row' id='${index + 9}'>
  <p class='col col-md-1 hour'>${value}</p>
  <textarea id='desc${index + 9}' class="col col-md-10 description"></textarea>
  <button id='save${
    index + 9
  }' class="saveBtn col col-md-1"><i class="fas fa-save"></i></button>
  </div>   
  `);
});

// Styles to apply if past, present or future
$.each($("textarea"), function () {
  let hourEl = parseInt($(this).parent().attr("id"));

  if (getHour > hourEl) {
    $(this).addClass("past");
    $(this).removeClass("present");
    $(this).removeClass("future");
  } else if (getHour === hourEl) {
    $(this).addClass("present");
    $(this).removeClass("past");
    $(this).removeClass("future");
  } else if (getHour < hourEl) {
    $(this).addClass("future");
    $(this).removeClass("present");
    $(this).removeClass("past");
  } else {
    $(this).removeClass("present");
    $(this).removeClass("past");
    $(this).removeClass("future");
  }
});

//Save to local storage
$(".saveBtn").on("click", function () {
  let textareaId = $(this).siblings(".description").val();
  let time = $(this).parent().attr("id");
  localStorage.setItem(time, textareaId);
});

//Get data from local storage
$.each($("textarea"), function (index, value) {
  let time = $(this).parent().attr("id");
  $(`#desc${index + 9}`).val(localStorage.getItem(time));
});
