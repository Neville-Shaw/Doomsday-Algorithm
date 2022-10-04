function GetData(date, Query) {
  let dateLookup = [];
  dateLookup[0] = {
    type: "day",
    val: 0,
  };
  dateLookup[1] = {
    type: "month",
    val: 0,
  };
  dateLookup[2] = {
    type: "year",
    val: 0,
  };

  let currentQuery = 0;
  let curIndex = 0;
  let heldVal = "";
  for (let i = 0; i <= date.length; i++) {
    if (date[i] == "/" || i == date.length) {
      dateLookup[currentQuery].val = parseInt(heldVal);
      currentQuery++;
      curIndex = 0;
      heldVal = "";
    } else {
      heldVal += date[i];
      curIndex++;
    }
  }

  if (Query == "day") {
    return dateLookup[0].val;
  } else if (Query == "month") {
    return dateLookup[1].val;
  } else if (Query == "year") {
    return dateLookup[2].val;
  }
}

function CreateLookupTable(array) {
  array[0] = [
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
    "December",
  ];
  array[1] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
}

function gatherDoom(month, leapYear) {
  let anchorDay;

  switch (month) {
    case 1:
      if (leapYear == true) {
        anchorDay = 4;
      } else {
        anchorDay = 3;
      }
      break;
    case 2:
      if (leapYear == true) {
        anchorDay = 29;
      } else {
        anchorDay = 28;
      }
      break;
    case 3:
      anchorDay = 14;
      break;
    case 4:
      anchorDay = 4;
      break;
    case 5:
      anchorDay = 9;
      break;
    case 6:
      anchorDay = 6;
      break;
    case 7:
      anchorDay = 11;
      break;
    case 8:
      anchorDay = 8;
      break;
    case 9:
      anchorDay = 5;
      break;
    case 10:
      anchorDay = 10;
      break;
    case 11:
      anchorDay = 7;
      break;
    case 12:
      anchorDay = 12;
      break;
  }
  return anchorDay;
}
