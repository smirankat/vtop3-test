//Date of Birth start
const yearSelect = document.getElementById("year");
const monthSelect = document.getElementById("month");
const daySelect = document.getElementById("day");

const months = [
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

//Months are always the same
(function populateMonths() {
  for (let i = 0; i < months.length; i++) {
    const option = document.createElement("option");
    option.textContent = months[i];
    monthSelect.appendChild(option);
  }
  monthSelect.value = "December";
})();

let previousDay;

function populateDays(month) {
  //Delete all of the children of the day dropdown
  //if they do exist
  while (daySelect.firstChild) {
    daySelect.removeChild(daySelect.firstChild);
  }
  //Holds the number of days in the month
  let dayNum;
  //Get the current year
  let year = yearSelect.value;

  if (
    month === "January" ||
    month === "March" ||
    month === "May" ||
    month === "July" ||
    month === "August" ||
    month === "October" ||
    month === "December"
  ) {
    dayNum = 31;
  } else if (
    month === "April" ||
    month === "June" ||
    month === "September" ||
    month === "November"
  ) {
    dayNum = 30;
  } else {
    //Check for a leap year
    if (new Date(year, 1, 29).getMonth() === 1) {
      dayNum = 29;
    } else {
      dayNum = 28;
    }
  }
  //Insert the correct days into the day <select>
  for (let i = 1; i <= dayNum; i++) {
    const option = document.createElement("option");
    option.textContent = i;
    daySelect.appendChild(option);
  }
  if (previousDay) {
    daySelect.value = previousDay;
    if (daySelect.value === "") {
      daySelect.value = previousDay - 1;
    }
    if (daySelect.value === "") {
      daySelect.value = previousDay - 2;
    }
    if (daySelect.value === "") {
      daySelect.value = previousDay - 3;
    }
  }
}

function populateYears() {
  //Get the current year as a number
  let year = new Date().getFullYear();
  //Make the previous 100 years be an option
  for (let i = 0; i < 101; i++) {
    const option = document.createElement("option");
    option.textContent = year - i;
    yearSelect.appendChild(option);
  }
}

populateDays(monthSelect.value);
populateYears();

yearSelect.onchange = function () {
  populateDays(monthSelect.value);
};
monthSelect.onchange = function () {
  populateDays(monthSelect.value);
};
daySelect.onchange = function () {
  previousDay = daySelect.value;
};
daySelect.value = 21;
yearSelect.value = 1995;
//Date of Birth end

//Validation start
const inputFirstName = document.getElementById("first-name");
const inputLastName = document.getElementById("last-name");
const inputEmail = document.getElementById("email");
const inputPsw = document.getElementById("psw");
const inputPswRepeat = document.getElementById("psw-repeat");
const emailError = document.querySelector("#email + span");
const pswError = document.querySelector("#psw + span");
const pswRepeatError = document.querySelector("#psw-repeat + span");
const submitButton = document.querySelector(".signup-btn");

let validEmail;
const re = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
validEmail = re.test(inputEmail.value);

inputEmail.addEventListener("input", function () {
  validEmail = re.test(inputEmail.value);
  if (inputEmail.value && validEmail) {
    emailError.textContent = "";
    emailError.className = "";
    inputEmail.className = "email";
  } else {
    showEmailError();
  }
});

function showEmailError() {
  if (!inputEmail.value) {
    emailError.textContent = "You need to enter your email";
  } else if (!validEmail) {
    emailError.textContent = "Incorrect value entered";
  }
  emailError.className = "error";
  inputEmail.className = "invalid";
}

let validPsw;

inputPsw.addEventListener("input", function () {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  validPsw = re.test(inputPsw.value);
  if (inputPsw.value && validPsw) {
    pswError.textContent = "";
    pswError.className = "";
    inputPsw.className = "";
  } else {
    showPswError();
  }
});

function showPswError() {
  if (!inputPsw.value) {
    pswError.textContent = "Please enter your password";
  } else if (!validPsw) {
    pswError.textContent = "Incorrect value entered";
  }
  pswError.className = "error";
  inputPsw.className = "invalid";
}

inputPswRepeat.addEventListener("input", function () {
  if (
    inputPsw.value &&
    validPsw &&
    inputPswRepeat.value &&
    inputPswRepeat.value === inputPsw.value
  ) {
    pswRepeatError.textContent = "";
    pswRepeatError.className = "";
    inputPswRepeat.className = "";
    inputPsw.className = "";
  } else {
    showPswError();
    showPswRepeatError();
  }
});

function showPswRepeatError() {
  if (!inputPswRepeat.value || !inputPsw.value || !validPsw) {
    pswRepeatError.textContent = "Please repeat your correct password";
  } else if (inputPswRepeat.value !== inputPsw.value) {
    pswRepeatError.textContent = "Passwords do not match";
  }
  pswRepeatError.className = "error";
  inputPswRepeat.className = "invalid";
}

document.forms.formName.onsubmit = async (e) => {
  e.preventDefault();

  if (
    !inputEmail.value ||
    !validEmail ||
    !inputPsw.value ||
    !validPsw ||
    !inputPswRepeat.value ||
    inputPswRepeat.value !== inputPsw.value
  ) {
    submitButton.className = "signup-btn shake";

    if (!inputEmail.value || !validEmail) {
      showEmailError();
    }
    if (!inputPsw.value || !validPsw) {
      showPswError();
    }
    if (!inputPswRepeat.value || inputPswRepeat.value !== inputPsw.value) {
      showPswRepeatError();
    }
    return;
  }
  if (inputEmail.value && inputPsw.value && inputPswRepeat.value) {
    let email = inputEmail.value;
    let psw = inputPsw.value;

    let user = JSON.stringify({
      email: email,
      password: psw,
    });

    let response = await fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: user,
    });

    alert("Регистрация прошла успешно");
    inputFirstName.value = "";
    inputLastName.value = "";
    inputEmail.value = "";
    inputPsw.value = "";
    inputPswRepeat.value = "";
  }
};
submitButton.addEventListener("animationend", AnimationHandler, false);
function AnimationHandler() {
  submitButton.classList.remove("shake");
}
