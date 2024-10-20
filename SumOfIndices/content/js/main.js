"use strict";
let firstInput = document.querySelector("#arr1"),
  secondInput = document.querySelector("#arr2"),
  submitBtn = document.querySelector("#submit-btn");

function sumOfArrays(arr1, arr2) {
  if (arr1.length > arr2.length) {
    let plus = arr1.length - arr2.length;
    for (let i = 0; i < plus; i++) {
      arr2.push(0);
    }
  } else if (arr1.length < arr2.length) {
    let plus = arr2.length - arr1.length;
    for (let i = 0; i < plus; i++) {
      arr1.push(0);
    }
  }
  if (arr1.length == arr2.length) {
    let arr3 = arr1.map((element, idx) => element + arr2[idx]);
    return arr3;
  }
}
function clearInputs() {
  firstInput.value = "";
  secondInput.value = "";
}
function isValidNumberArray(input) {
  return /^\s*\[\s*(-?\d+(\.\d+)?\s*,\s*)*-?\d+(\.\d+)?\s*\]\s*$/.test(input);
  // I didn't make this regex to be honest 😀, I searched for it .
}

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (firstInput.value.trim() === "" || secondInput.value.trim() === "") {
    Swal.fire({
      title: "Wake Up!",
      text: `Input fields can't be empty`,
      icon: "error",
      confirmButtonText: "OK",
    });
  } 
  else if (
    !isValidNumberArray(firstInput.value) ||
    !isValidNumberArray(secondInput.value)
  ) {
    Swal.fire({
      title: "Invalid Input!",
      text: `Please enter valid arrays of numbers in the format [1, 2, 3].`,
      icon: "error",
      confirmButtonText: "OK",
    });
  } else {
    let arr1 = JSON.parse(firstInput.value);
    let arr2 = JSON.parse(secondInput.value);
    let result = sumOfArrays(arr1, arr2);
    Swal.fire({
      title: "✨ Array Summed Successfully!",
      text: `Result: [${result}]`,
      icon: "success",
      confirmButtonText: "Awesome!",
    });

    clearInputs();
  }
});
