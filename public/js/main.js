// sidebar
const sidebarTabs = document.querySelectorAll(".sidebar ul li");
const mainSections = document.querySelectorAll(".main section");

sidebarTabs.forEach((tab ,index) => {
    tab.addEventListener("click", () => {
        sidebarTabs.forEach(tabs => {
            tabs.classList.remove("hover");
            mainSections.forEach((section, sectionIndex) => {
                if(sectionIndex === index){
                    section.setAttribute("style", "display: block")
                }
                else{
                    section.setAttribute("style", "display: none");    
                }
            });
        });
        tab.setAttribute("class", "hover");
    });
});

// Date and Time Decoder
function date_decoder(utcTime) {
    var utcDate = new Date(utcTime);
    var options = {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    };
    var utcPlus8Time = utcDate.toLocaleString('en-US', options);
    
    return utcPlus8Time;
}

function time_decoder(timestamp) {
  const date = new Date(timestamp);

  // Add the timezone offset to the timestamp
  date.setUTCHours(date.getUTCHours() + 8);
  // date.setUTCMinutes(date.getUTCMinutes() + 23);

  // Retrieve the hour and minute components
  var hours = date.getUTCHours();
  var minutes = date.getUTCMinutes();
  var minutes_set = 0;

  if (minutes >= 0 && minutes <= 22) {
    // Code to be executed if minutes is between 0 and 22
    if(hours >= 0 && minutes <= 22){
      hours = parseInt(hours) + 24 - 1;
      minutes_set = parseInt(minutes) + 60 - 23;  
    } else {
      hours = parseInt(hours) - 1;
      minutes_set = parseInt(minutes) + 60 - 23;  
    }
  } else {
    minutes_set = parseInt(minutes) - 23;
  }
  // Determine AM or PM
  var period = hours >= 12 ? 'PM' : 'AM';

  // Convert to 12-hour format
  if(hours == 24){
    hours = 12;
    period = "AM";
  } else{
    hours = hours % 12;
    hours = hours ? hours : 12;

  }
  // Format the time string
  const timeString = hours.toString().padStart(2, '0') + ':' + minutes_set.toString().padStart(2, '0') + ' ' + period;
  return timeString;
}

function time_decoder2(timestamp) {
  const date = new Date(timestamp);

  // Add the timezone offset to the timestamp
  date.setUTCHours(date.getUTCHours() + 8);
  // date.setUTCMinutes(date.getUTCMinutes() + 23);

  // Retrieve the hour and minute components
  var hours = date.getUTCHours();
  var minutes = date.getUTCMinutes();
  var minutes_set = 0;

  if (minutes >= 0 && minutes <= 22) {
    // Code to be executed if minutes is between 0 and 22
    if(hours >= 0 && minutes <= 22){
      hours = parseInt(hours);
      minutes_set = parseInt(minutes);  
    } else {
      hours = parseInt(hours);
      minutes_set = parseInt(minutes);  
    }
  } else {
    minutes_set = parseInt(minutes);
  }
  // Determine AM or PM
  var period = hours >= 12 ? 'PM' : 'AM';

  // Convert to 12-hour format
  if(hours == 24){
    hours = 12;
    period = "AM";
  } else{
    hours = hours % 12;
    hours = hours ? hours : 12;

  }
  // Format the time string
  const timeString = hours.toString().padStart(2, '0') + ':' + minutes_set.toString().padStart(2, '0') + ' ' + period;
  return timeString;
}

function convertTo24HourFormat(timeStr) {
  // Split the time string into hour, minute, and AM/PM components
  const [time, amPm] = timeStr.split(' ');

  // Convert hour and minute to integers
  const [hour, minute] = time.split(':').map(Number);

  // Convert to 24-hour format if PM
  let hour24 = hour;
  if (amPm.toLowerCase() === 'pm') {
    hour24 = (hour + 12) % 24;
  }

  // Return the formatted time
  return `${hour24.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
}

function convertToOrdinal(cardinal) {
    var lastDigit = cardinal % 10;
    var lastTwoDigits = cardinal % 100;
  
    if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
      return cardinal + "th";
    } else if (lastDigit === 1) {
      return cardinal + "st";
    } else if (lastDigit === 2) {
      return cardinal + "nd";
    } else if (lastDigit === 3) {
      return cardinal + "rd";
    } else {
      return cardinal + "th";
    }
}

function convertToMonthName(number) {
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
  
    if (number >= 1 && number <= 12) {
      return months[number - 1];
    } else {
      return "Invalid month number";
    }
}

// General Code
// Weight Calculator
var gross_weight = document.getElementById("gross_weight");
var tare_weight = document.getElementById("tare_weight");
var net_weight = document.getElementById("net_weight");

function weight_calculator(){
  net_weight.value = gross_weight.value - tare_weight.value;
}

function pushUniqueElement(arr, element) {
  if (!arr.includes(element)) {
    arr.push(element);
  }
}

// Set the idle time in milliseconds (e.g., 1 minutes)
const idleTime = 5 * 60 * 1000; // 1 minute

let idleTimer;

// Reset the timer when there is user activity
function resetIdleTimer() {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(reloadPage, idleTime);
}

// Reload the page
function reloadPage() {
  location.reload();
}

// Start the idle timer when the page loads
window.addEventListener('load', function() {
  resetIdleTimer();
});

// Add event listeners for user activity
window.addEventListener('mousemove', resetIdleTimer);
window.addEventListener('keydown', resetIdleTimer);
window.addEventListener('scroll', resetIdleTimer);
// Add any other relevant event listeners

function calculateTravelTime(departureDate, departureTime, arrivalDate, arrivalTime) {
  const departureDateTime = new Date(`${departureDate} ${departureTime}`);
  const arrivalDateTime = new Date(`${arrivalDate} ${arrivalTime}`);

  // Calculate the time difference in milliseconds
  const timeDifference = arrivalDateTime - departureDateTime;

  // Convert milliseconds to hours and minutes
  let hours = Math.floor(timeDifference / (1000 * 60 * 60));
  let minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

  // Check if travel time exceeds 24 hours
  if (hours >= 24) {
    const days = Math.floor(hours / 24);
    hours = hours % 24;

    // Determine the correct plural form for days, hours, and minutes
    const pluralDays = days > 1 ? 'days' : 'day';
    const pluralHours = hours > 1 ? 'hrs' : 'hr';
    const pluralMinutes = minutes > 1 ? 'mins' : 'min';

    return `${days} ${pluralDays} ${hours} ${pluralHours} ${minutes} ${pluralMinutes}`;
  } else {
    let travelTime = '';

    // Determine the correct plural form for hours and minutes
    const pluralHours = hours > 1 ? 'hrs' : 'hr';
    const pluralMinutes = minutes > 1 ? 'mins' : 'min';

    if (hours > 0) {
      travelTime += `${hours} ${pluralHours} `;
    }
    if (minutes > 0) {
      travelTime += `${minutes} ${pluralMinutes}`;
    }
    return travelTime.trim();
  }
}

function capitalizeInputs(event) {
  const form = event.target;
  const inputs = form.getElementsByTagName('input');
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = inputs[i].value.toUpperCase();
  }
}

// Get all the forms on the page
const forms = document.getElementsByTagName('form');

// Attach the event listener to each form
for (let i = 0; i < forms.length; i++) {
  forms[i].addEventListener('submit', capitalizeInputs);
}

function refreshPage() {
  location.reload();
}

function generateExactTime() {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  var ampm = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // If hours is 0, set it to 12

  // Format the time to ensure leading zeros for single-digit values
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  var exactTime = hours + ":" + minutes + ":" + seconds + " " + ampm;
  return exactTime;
  }

  // Update the content of the HTML element with the exact time every second
  function updateExactTime() {
  var exactTimeElement = document.getElementById("exactTime");
  exactTimeElement.textContent = generateExactTime();
  }

  // Call the updateExactTime function every second
  setInterval(updateExactTime, 1000);


  function generateFormattedDate() {
  var now = new Date();
  
  // Define the month names
  var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // Get the date components
  var month = monthNames[now.getMonth()];
  var day = now.getDate();
  var year = now.getFullYear();

  // Define the day names
  var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  // Get the day of the week
  var dayOfWeek = dayNames[now.getDay()];

  // Format the date
  var formattedDate = month.toUpperCase() + " " + day + ", " + year + "<br>" + dayOfWeek.toUpperCase();

  return formattedDate;
  }

  function updateDate() {
  var dateElement = document.getElementById("exactDate");
  dateElement.innerHTML = generateFormattedDate();
  }

  // Update the date every second (1000 milliseconds)
  setInterval(updateDate, 1000);
  
  function goBack() {
    history.back();
  }
  
  function calculateWorkHours(timeInValue, timeOutValue) {
    // Convert time strings to Date objects
    const timeInDate = new Date(`2000-01-01T${timeInValue}`);
    const timeOutDate = new Date(`2000-01-01T${timeOutValue}`);
  
    // Calculate the time difference in milliseconds
    let timeDiff = timeOutDate - timeInDate;
  
    // Handle overnight work scenario
    if (timeDiff < 0) {
      const nextDay = new Date(timeOutDate);
      nextDay.setDate(nextDay.getDate() + 1);
      timeDiff = nextDay - timeInDate;
    }
  
    // Convert time difference from milliseconds to hours
    const hours = timeDiff / (1000 * 60 * 60);
  
    // Round down to the nearest whole hour or half-hour
    const roundedHours = Math.floor(hours * 2) / 2;
  
    // Display the result
    return roundedHours;
  }
  
  function roundHourRate(rate) {
    const roundedRate = Math.floor(rate * 2) / 2;
    return roundedRate;
  }
  
  function roundDownTime(timeStr) {
    // Parse the time string to get hours and minutes
    const [time, meridian] = timeStr.split(' ');
    const [hour, minute] = time.split(':').map(Number);
    
    // Calculate the decimal representation of the time
    const decimalTime = hour + minute / 60;
    
    // Round down to the nearest 0, 0.5, or 1
    const roundedTime = Math.floor(decimalTime * 2) / 2;
    
    return roundedTime;
  }
    
  function formatDateToInputValue(dateString) {
    // Convert the date string to a Date object
    const dateObject = new Date(dateString);
  
    // Get the year, month, and day from the Date object
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");
  
    // Format the date in "YYYY-MM-DD" format
    const formattedDate = `${year}-${month}-${day}`;
  
    return formattedDate;
  }
  
  function formatTimeToInputValue(timestamp) {
    const date = new Date(timestamp);

    // Add the timezone offset to the timestamp
    date.setUTCHours(date.getUTCHours() + 8);
    // date.setUTCMinutes(date.getUTCMinutes() + 23);
  
    // Retrieve the hour and minute components
    var hours = date.getUTCHours();
    var minutes = date.getUTCMinutes();
    var minutes_set = 0;
  
    if (minutes >= 0 && minutes <= 22) {
      // Code to be executed if minutes is between 0 and 22
      if(hours >= 0 && minutes <= 22){
        hours = parseInt(hours) + 24 - 1;
        minutes_set = parseInt(minutes) + 60 - 23;  
      } else {
        hours = parseInt(hours) - 1;
        minutes_set = parseInt(minutes) + 60 - 23;  
      }
    } else {
      minutes_set = parseInt(minutes) - 23;
    }

    // Format the time string
    const timeString = hours.toString().padStart(2, '0') + ':' + minutes_set.toString().padStart(2, '0');
    return timeString;
  }
    
  // Get all input elements of type "number"
const numberInputs = document.querySelectorAll('input[type="number"]');

// Loop through each input and set the "step" attribute
numberInputs.forEach(input => {
    input.setAttribute('step', '0.01'); // Set the desired step value
});

function formatNumber(number) {
  return number.toLocaleString('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}   

function addConfirmationListener(form, validateFunction = null) {
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting immediately

    if (window.confirm('Are you sure you want to submit the data?')) {
      if (validateFunction) {
        if (!validateFunction()) {
          return; // Do not submit if validation fails
        }
      }

      form.submit(); // Use the form's submit() method
    } else {
      // If user clicks Cancel, do nothing or perform other actions
      // For example, you can reset form fields or show a message
    }
  });
}

// Example of a custom validation function for a form
function customValidation() {
  const remaining = parseInt(document.getElementById('batch_weight').value);

  if (remaining !== 0) {
    alert('Batch Weight must be 0 to submit the form.');
    return false;
  }

  return true;
}

function customValidation2() {
  const remaining = parseInt(document.getElementById('remaining').value);

  if (remaining !== 0) {
    alert('Remaining budget must be 0 to submit the form.');
    return false;
  }

  return true;
}

function customValidation3() {
  const fund_amount = parseFloat(document.getElementById('fund_amount').value);
  const fund_source_amount = parseFloat(document.getElementById('fund_source_amount').value);
  const fund_source = parseFloat(document.getElementById('fund_source').value);
  
  if(fund_source != "BANK"){
    if (fund_amount > fund_source_amount) {
      alert('Invalid Transation! Fund Amount is Greater than Fund Source Amount.');
      
      return false;
    }
  }

  return true;
}

function customValidation4() {
  const available_funds = parseFloat(document.querySelector('#budget_form #available_funds').value);
  const budget = parseFloat(document.querySelector('#budget_form #budget').value);
  console.log("🚀 ~ file: main.js:509 ~ customValidation4 ~ trucking_fund:", trucking_fund)
  
  if (budget > available_funds) {
    alert('Invalid Transation! Insufficient Funds.');
    
    return false;
  }

  return true;
}

var form_elements = document.querySelectorAll('form');

form_elements.forEach(function(form) {
  if (form.id === 'sorting_form_id') {
    addConfirmationListener(form, customValidation);
  } 
  else if (form.id === 'liquidation_form') {
    addConfirmationListener(form, customValidation2);
  } 
  else if (form.id === 'fund_transfer_form_id') {
    addConfirmationListener(form, customValidation3);
  } 
  else if (form.id === 'budget_form') {
    addConfirmationListener(form, customValidation4);
  } 
  else {
    addConfirmationListener(form);
  }
});

function getWeekNumber(dateString) {
  const date = new Date(dateString);

  if (isNaN(date)) {
    throw new Error("Invalid date format");
  }

  const currentDate = new Date(date);
  currentDate.setHours(0, 0, 0, 0);
  currentDate.setDate(currentDate.getDate() + 4 - (currentDate.getDay() || 7));
  const yearStart = new Date(currentDate.getFullYear(), 0, 1);
  const weekNumber = Math.ceil(((currentDate - yearStart) / 86400000 + 1) / 7);

  return weekNumber;
}

function getYearFromDate(dateString) {
  const date = new Date(dateString);

  if (isNaN(date)) {
    throw new Error("Invalid date format");
  }

  const year = date.getFullYear();
  return year;
}

function getWeekDates(dateString) {
  const date = new Date(dateString);

  if (isNaN(date)) {
    throw new Error("Invalid date format");
  }

  const currentDate = new Date(date);
  const dayOfWeek = currentDate.getDay(); // 0 (Sunday) to 6 (Saturday)

  // Calculate the date of the Monday of the same week
  currentDate.setDate(currentDate.getDate() - dayOfWeek + 1);

  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + i);
    weekDates.push(newDate);
  }

  return weekDates;
}

function getWeekDates2(dateString) {
  const date = new Date(dateString);

  if (isNaN(date)) {
    throw new Error("Invalid date format");
  }

  const currentDate = new Date(date);
  const dayOfWeek = currentDate.getDay(); // 0 (Sunday) to 6 (Saturday)

  // Calculate the date of the Saturday of the same week
  currentDate.setDate(currentDate.getDate() - dayOfWeek -1);

  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + i);
    weekDates.push(newDate);
  }

  return weekDates;
}

function findTextInArray(textArray, targetText) {
  for (let q = 0; q < textArray.content[0].length; q++) {
    if (textArray.content[0][q] == targetText) {
      return q; // Found the target text, return its index
    }
  }
  return -1; // Target text not found in the array
}