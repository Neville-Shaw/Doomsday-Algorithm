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

  

  let month = GetData(Qdate, "month");
  let day = GetData(Qdate, "day");
  let year = GetData(Qdate, "year");

  console.log("Date:", lookupTable[0][month - 1] + ",", day + ",", year);

  // Find Doomsday.
  year %= 100;
  // Check leap year
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

  // Get anchor day for the year
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

  // Use the "Odd + 11" method.
  let anchorYear = year;
  if (anchorYear % 2 == 1) {
    anchorYear += 11;
  }
  anchorYear = anchorYear / 2;
  if (anchorYear % 2 == 1) {
    anchorYear += 11;
  }
  anchorYear = 7 - (anchorYear % 7);
  let doomsday = (anchorYear + anchorCentury) % 7;
  console.log("Anchor Day:", lookupTable[1][doomsday]);

  // Find the anchor day for the month.
  let monthAnchor = gatherDoom(month, leapYear);

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

  console.log("Doomsday:", lookupTable[1][doomsday]);

  FinalDate.html(
    lookupTable[0][month - 1] + ", " + day + ", " + GetData(Qdate, "year")
  );
  FinalDay.html("--" + lookupTable[1][doomsday] + "--");
}
