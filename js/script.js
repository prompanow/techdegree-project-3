// -------------------- assignment 1 ---------- Basic Info

// this will select the name-input as the first thing when entering index.html or refreshing the page
const inputName = document.querySelector('#name');

window.onload = () => {
  inputName.focus();
  inputName.select();
}

// -------------------- assignment 2 ---------- BasicInfo -> Job Role
const jobRoleOther = document.querySelector('#title');
const otherInput = document.querySelector('#other-title');
otherInput.style.display = 'none'; // the input(text) is set på none-display, because the user first needs to select the 'Other' option

// when selecting 'Other' in Job-Role, the input(text) will appear just below the select
jobRoleOther.addEventListener('change', function () {
  let otherInput = document.querySelector('#other-title')
  if (jobRoleOther.value === 'other') {
    otherInput.style.display = 'block';
  } else {
    otherInput.style.display = 'none';
  }
});

// -------------------- assignment 3 ---------- T-shirt Info
const shirtDesign = document.querySelector('#design');
const shirtColor = document.querySelector('#color');
let shirtColorOption = shirtColor.children;
const selectOption = document.createElement('option'); // this createElement is in GlobalScope because different functions will use the variable

let designPuns = [];
for (let i = 0; i < 3; i += 1) { // loops through the color options and stores the options in a group
  designPuns.push(shirtColorOption[i]);
}

let designHeart = [];
for (let i = 3; i < 6; i += 1) { // loops through the color options and stores the options in a group
  designHeart.push(shirtColorOption[i]);
}

// sets every color options to none-display, and creates a new options that tells the user to select a design first
function selectColor () {
  for (let i = 0; i < shirtColorOption.length; i += 1) {
    shirtColorOption[i].style.display = 'none';
  }

  selectOption.value = 'selectoption';
  selectOption.textContent = '<--- Please select a design!';
  selectOption.selected = true;
  shirtColor.insertAdjacentElement('afterBegin', selectOption);
}

// when selecting a design, this function will determine which color options shall be visible
// arg1 is those options that will be visible and arg2 will be set to invisible for the user
function designShow (arg1, arg2) {
  for (let i = 0; i < arg1.length; i += 1) {
    arg1[i].style.display = 'block';
  }
  for (let i = 0; i < arg2.length; i += 1) {
    arg2[i].style.display = 'none';
  }

  selectOption.style.display = 'none'; // this will remove the default option that tells the user to pick a design
  arg1[0].selected = true; // selects a choosen design first color option
}

// the if and else-if statement both calls the designShow function because they have the same task to perform
shirtDesign.addEventListener('change', function () {
  if (shirtDesign.value === 'js puns') {
    designShow(designPuns, designHeart);

  } else if (shirtDesign.value === 'heart js') {
    designShow(designHeart, designPuns);

  } else { // if the user does not pick a design, then the different color options will not be visible and the user is told to pick a design
    for (let i = 0; i < shirtColorOption.length; i += 1) {
      shirtColorOption[i].style.display = 'none';
    }

    selectOption.style.display = 'block';
    selectOption.selected = true;
  }
});

selectColor();

// -------------------- assignment 4 ---------- Register for Activities

const fieldsetActivities = document.querySelector('.activities');
const activities = document.querySelectorAll('.activities label');
let amount = 0;

// creates a div element with two p elements that will contain the total price of added activities
function amountShow () {
  const div = document.createElement('div');
  let p1 = document.createElement('p');
  let p2 = document.createElement('p');
  p1.textContent = 'Total: $';
  p2.textContent = amount;
  p2.style.fontWeight = 'bold';
  p2.id = 'amount';
  p1.style.display = 'inline';
  p2.style.display = 'inline';
  fieldsetActivities.insertAdjacentElement('beforeend', div); // the div will be appended just below the last activity choice
  div.append(p1);
  div.append(p2);

  div.style.display = 'none'; // per default the total amount will not show as it amount is zero
}

// the function takes in two arguments, and a conditional statement determines if the total amount shall plus or minus total amount
function totalAmount (arg1, arg2) {
  let p = document.querySelector('#amount');
  const div = document.querySelector('.activities div');

  if (arg1 === 'plus') {
    amount += arg2;
    p.textContent = amount;
  } else if (arg1 === 'minus') {
    amount -= arg2;
    p.textContent = amount;
  }

  if (amount > 0) { // this statement will make sure that total amount is only visible when more than zero
    div.style.display = 'block';
  } else {
    div.style.display = 'none';
  }
}

// loops through all the activities and adds an addEventListener
for (let i = 0; i < activities.length; i += 1) {
    activities[i].addEventListener('change', listener.bind( null, i));
}

// this function will analyse each activity text content and see if it contains either 100 or 200
function listener (index) {
  let str = activities[index].textContent;
  let resHundred = str.match(/100/g);
  let resTwoHundred = str.match(/200/g);

  // if a match is true between text content and either 100 or 200, then below will call the totalAmount function with specific arguments
  if (resHundred !== null && activities[index].firstChild.checked === true) {
    totalAmount('plus', 100);
  } else if (resHundred !== null && activities[index].firstChild.checked === false) {
    totalAmount('minus', 100);
  } else if (resTwoHundred !== null && activities[index].firstChild.checked === true) {
    totalAmount('plus', 200);
  } else if (resTwoHundred !== null && activities[index].firstChild.checked === false) {
    totalAmount('minus', 200);
  }
}

// this function will make sure that it is not possible to select activities that is on the same day and time
function activity (arg1, arg2) {
  if (arg1 === 'check') { // when checking an activity, another activity with the same day and time will be disabled and become gray
    for (let i = 0; i < activities.length; i += 1) {

      let str = activities[i].textContent;
      let res = str.match(arg2);

      if (res !== null && activities[i].firstChild.checked !== true) {
        activities[i].firstChild.disabled = true;
        activities[i].style.color = '#7f7f7f';
      }
    }
  } else if (arg1 === 'uncheck') { // when unchecking the activity will be available again
    for (let i = 0; i < activities.length; i += 1) {

      let str = activities[i].textContent;
      let res = str.match(arg2);

      if (res !== null && activities[i].firstChild.disabled === true) {
        activities[i].firstChild.disabled = false;
        activities[i].style.color = '#000';
      }
    }
  }
}

// loops through all the activities and adds an addEventListener
for (let i = 0; i < activities.length; i += 1) {
    activities[i].addEventListener('change', listenerTwo.bind( null, i));
}

// this function will analyse each activity text content and see if it contains either 'Tuesday 1pm-4pm' or 'Tuesday 9am-12pm'
function listenerTwo (index) {
  let str = activities[index].textContent;
  let resT14 = str.match(/Tuesday 1pm-4pm/g);
  let resT912 = str.match(/Tuesday 9am-12pm/g);

  if (resT14 !== null && activities[index].firstChild.checked === true) {
    activity('check', /Tuesday 1pm-4pm/g);
  } else if (resT14 !== null && activities[index].firstChild.checked === false) {
    activity('uncheck', /Tuesday 1pm-4pm/g);
  } else if (resT912 !== null && activities[index].firstChild.checked === true) {
    activity('check', /Tuesday 9am-12pm/g);
  } else if (resT912 !== null && activities[index].firstChild.checked === false) {
    activity('uncheck', /Tuesday 9am-12pm/g);
  }

}

amountShow();

// -------------------- assignment 5 ---------- Payment Info section of the form

const payment = document.querySelector('#payment');
const creditCard = document.querySelector('.credit-card');
const paypal = creditCard.nextSibling.nextSibling;
const bitcoin = creditCard.nextSibling.nextSibling.nextSibling.nextSibling;

// This function will determine the payment default setting when the page is loaded for the first time or refreshed
function defaultSet () {
  payment[1].selected = true;

  paypal.style.display = 'none';
  bitcoin.style.display = 'none';
}

// this determines what payment-method shall be visible for the user
function selectPayment (arg1, arg2, arg3, arg4) {
  creditCard.style.display = arg1;
  paypal.style.display = arg2;
  bitcoin.style.display = arg3;

  payment[arg4].selected = true;
}

payment.addEventListener('change', function () {
  if (payment.value === 'credit card') {
    selectPayment('block', 'none', 'none', 1);
  } else if (payment.value === 'paypal') {
    selectPayment('none', 'block', 'none', 2);
  } else if (payment.value === 'bitcoin') {
    selectPayment('none', 'none', 'block', 3);
  } else {
    selectPayment('none', 'none', 'none', 0);
  }
});

defaultSet();

// -------------------- assignment 6 ---------- Form validation

const form = document.querySelector('form');
form.id = 'target';
const email = document.querySelector('#mail');
const ccNum = document.querySelector('#cc-num');
const zip = document.querySelector('#zip');
const cvv = document.querySelector('#cvv');
const regex = /[0-9]{13,16}/;

// Creates an error message and makes the input-border color red
function error (arg1, arg2) {
  if (arg1.style.borderColor !== 'red') {
    const div = document.createElement('div');
    const span = document.createElement('span');
    span.textContent = arg2;
    arg1.insertAdjacentElement('beforebegin', div);
    div.appendChild(span);
  }
  arg1.style.borderColor = 'red';
  event.preventDefault(); // Makes sure that the page does not get reset
}

// Removes the error message and the red input-border
function errorElse (arg1) {
  arg1.style.borderColor = 'transparent';
  arg1.previousSibling.textContent = '';
}

// When clicking the submit buttom will all the inputs be checked to see if valid.
// If valid is true, the page will be reset, or else the user will se error messages
target.addEventListener('submit', function () {

  if (inputName.value === '') {
    error(inputName, 'Please enter your Name !');
  } else {
    errorElse(inputName);
  }

  if (email.value === '') {
    error(email, 'Please enter your Email !');
  } else {
    errorElse(email);
  }

  if (amount === 0) {
    alert('Please register for one or more activities !');
    event.preventDefault();
  }

  if (payment[1].selected === true) {
    if (ccNum.value === '' || isNaN(ccNum.value) || ccNum.value.length < 13 || ccNum.value.length > 16) {
      error(ccNum, 'Please enter a valid Credit Card !');
    } else {
      errorElse(ccNum);
    }

    if (zip.value === '' || isNaN(zip.value) || zip.value.length !== 5) {
      error(zip, 'Needs to be 5 digit !');
    } else {
      errorElse(zip);
    }

    if (cvv.value === '' || isNaN(cvv.value) || cvv.value.length !== 3) {
      error(cvv, 'Needs to be 3 digit !');
    } else {
      errorElse(cvv);
    }
  }

});
