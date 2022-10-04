var Qdate;

// Sunday = 0... saturday = 6
var lookupTable = [];

function preload() {
  GenerateDoomsday = select("#FindDoomsdayButton");
  GenerateDoomsday.mousePressed(CreateDoomsday);

  FinalDate = select("#FinalDateTextID");
  FinalDay = select("#FinalDayTextID");
}

function setup() {
  // initilize the canvas position to the canvas container div
  let canvas = createCanvas(700, 700);
  canvas.parent("canvascontainer");

  CreateLookupTable(lookupTable);
}

function draw() {
  background(51);
  Qdate = document.getElementById("fname").value;
}

function CreateDoomsday() {
  // Separate the date input into multiple outputs
  let month = GetData(Qdate, "month");
  let day = GetData(Qdate, "day");
  let year = GetData(Qdate, "year");
  console.log("Date:", lookupTable[0][month - 1] + ",", day + ",", year);

  // ------------ Get anchor day for the century ------------ //
  let century = floor(year / 100) % 4;
  if (century == 0) {
    anchorCentury = 2;
  } else if (century == 1) {
    anchorCentury = 0;
  } else if (century == 2) {
    anchorCentury = 5;
  } else if (century == 3) {
    anchorCentury = 3;
  }
  console.log("anchorcentury", anchorCentury);
  // ------------------------------------------------------ //

  // --------------- Get the anchor day for the last two digits of year ---------- //
  let L2 = year % 100;

  let a = floor(L2 / 12); // Inc every 12 months
  let b = L2 % 12; // get remainder
  let c = floor(b / 4); // account for leap years using b

  // Calc total
  let total = a + b + c;
  // ----------------------------------------------------------- //

  // total both up and % 7 to get num within days of the week
  let doomsday = (total + anchorCentury) % 7;

  // Check if its a leap year because that alters the anchor day for some months
  let leapYear;
  if (year % 4 != 0) {
    leapYear = false;
  } else if (year % 100 != 0) {
    leapYear = true;
  } else if (year % 400 != 0) {
    leapYear = false;
  } else {
    leapYear = true;
  }

  // Find the anchor day for the chosen month.
  let monthAnchor = gatherDoom(month, leapYear);

  // ----- calculate how far away the nearest anchor day is from day input and change day accordingly ------ //
  if (abs(day - monthAnchor) % 7 != 0 && day != monthAnchor) {
    let temp = abs(monthAnchor - day);
    temp = temp % 7;
    for (let i = 0; i < temp; i++) {
      if (day < monthAnchor) {
        doomsday--;
      } else {
        doomsday++;
      }

      if (doomsday < 0) {
        doomsday = 6;
      } else if (doomsday > 6) {
        doomsday = 0;
      }
    }
  }
  // ------------------------------------------------------------------------ //
  
  // Convert numerical months to alphabetical and display
  FinalDate.html(
    lookupTable[0][month - 1] + ", " + day + ", " + GetData(Qdate, "year")
  );

  // Convert numerical day of the week to alphabetical and display
  FinalDay.html("--" + lookupTable[1][doomsday] + "--");
  console.log("Doomsday:", lookupTable[1][doomsday]);
}
