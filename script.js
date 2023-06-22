const inputDays = document.getElementById('js-days');
const inputMonths = document.getElementById('js-months');
const inputYears = document.getElementById('js-years');
const submitButton = document.querySelector('.submit-btn');
const errorDays = document.querySelector('.error-days');
const errorMonths = document.querySelector('.error-months');
const errorYears = document.querySelector('.error-years');
const year = document.getElementById('year');
const month = document.getElementById('month');
const day = document.getElementById('day');
const today = new Date();
let valid = true;
const inputDate = {
  days: 0,
  months: 0,
  years: 0,
  inpDate: function (){
    return new Date(this.years, this.months-1, this.days);
  }
};

function createDate (event) {
  valid = true;
  resetAnimation();
  insertDate();
  checkPast();
  checkInputs();
  checkValidDate();
  displayAge();
  event.preventDefault();
}

function resetAnimation(){
  year.classList.remove('slide-in-left');
  month.classList.remove('slide-in-left');
  day.classList.remove('slide-in-left');
  void year.offsetWidth;
}


function insertDate(){
  inputDate.days = inputDays.value;
  inputDate.months = inputMonths.value;
  inputDate.years = inputYears.value;

}

function checkInputs(){
  if(inputDate.days === ""){
    errorDays.innerHTML = "This field is required";
    valid = false;
  }
  if(inputDate.months === ""){
    errorMonths.innerHTML = "This field is required";
    valid = false;
  }
  if(inputDate.years === "") {
    errorYears.innerHTML = "This field is required";
    valid = false;
  }

  if(inputDate.days > 31){
    errorDays.innerHTML = "Must be a valid day";
    valid = false;
  }
  if(inputDate.months > 12){
    errorMonths.innerHTML = "Must be a valid month";
    valid = false;
  }
  const daysInMonth = (month, year) => {
    // Use a Date object to get the last day of the given month
    return new Date(year, month, 0).getDate();
    };
    
    if(inputDate.days > daysInMonth(inputDate.months, inputDate.years)){
    errorDays.innerHTML = "Must be a valid day";
    valid = false;
    }
}

function checkPast(){

  if(today.getTime() < inputDate.inpDate().getTime()){
    if(inputDate.years > today.getFullYear()){
      errorYears.innerHTML = "Must be in the past";
      valid = false;
    }
    if(inputDate.months > today.getMonth() + 1){
      errorMonths.innerHTML = "Must be in the past";
      valid = false;
    }
    if(inputDate.days > today.getDate()){
      errorDays.innerHTML = "Must be in the past";
      valid = false;
    } 
  }
}

function checkValidDate(){
  if(!(inputDate.inpDate() instanceof Date && !isNaN(inputDate.inpDate()))){
    errorDays.innerHTML = "Must be a valid date";
  }
}

function resetError(){
  document.querySelectorAll('.input').forEach(elem => elem.classList.remove('border-red'));
    document.querySelectorAll('.label-input').forEach(elem => elem.classList.remove('text-color'));
    errorDays.innerHTML = "";
    errorMonths.innerHTML = "";
    errorYears.innerHTML = "";
}

function displayAge (){
  if(valid === false){
  document.querySelectorAll('.input').forEach(elem => elem.classList.add('border-red'));
  document.querySelectorAll('.label-input').forEach(elem => elem.classList.add('text-color'));
  } else{
    resetError();
    let difference = dateDiff(inputDate.inpDate(), today).split(" ");
    year.innerHTML = difference[0];
    month.innerHTML = difference[1];
    day.innerHTML = difference[2];
    year.classList.add('slide-in-left');
    month.classList.add('slide-in-left');
    day.classList.add('slide-in-left');
  }

}

function dateDiff(startingDate, endingDate) {
  let startDate = new Date(new Date(startingDate).toISOString().substring(0, 10));
  if (!endingDate) {
    endingDate = new Date().toISOString().substring(0, 10); // need date in YYYY-MM-DD format
  }
  let endDate = new Date(endingDate);
  const startYear = startDate.getFullYear();
  const february = (startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0 ? 29 : 28;
  const daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  let yearDiff = endDate.getFullYear() - startYear;
  let monthDiff = endDate.getMonth() - startDate.getMonth();
  if (monthDiff < 0) {
    yearDiff--;
    monthDiff += 12;
  }
  let dayDiff = endDate.getDate() - startDate.getDate();
  if (dayDiff < 0) {
    if (monthDiff > 0) {
      monthDiff--;
    } else {
      yearDiff--;
      monthDiff = 11;
    }
    dayDiff += daysInMonth[startDate.getMonth()];
  }

  return yearDiff + ' ' + monthDiff + ' ' + dayDiff;
}

submitButton.addEventListener('click', createDate)
