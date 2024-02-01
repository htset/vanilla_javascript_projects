/////////////////////////////////////////////////////
///  Helper Functions
/////////////////////////////////////////////////////

//helper function for date comparison
export const areDatesEqual = function (date1, date2) {
  if (date1.getFullYear() == date2.getFullYear()
    && date1.getMonth() == date2.getMonth()
    && date1.getDate() == date2.getDate())
    return true;
  else
    return false;
}

export const getDateOnlyString = function (date) {
  return date.getFullYear()
    + "-" + ("0" + (date.getMonth() + 1)).slice(-2)
    + "-" + ("0" + date.getDate()).slice(-2);
}

export const getDateOnly = function (date) {
  return new Date(date.getFullYear()
    + "-" + ("0" + (date.getMonth() + 1)).slice(-2)
    + "-" + ("0" + date.getDate()).slice(-2));
}
