"use strict";
const form = document.querySelector("#stringForm");
const userInput = document.querySelector("#userString");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (userInput.value.length < 3) {
    Swal.fire({
      icon: "error",
      title: "Oops!",
      text: "The string must be at least 3 characters. Try again! ",
      confirmButtonText: "Okay",
    });
  } else {
    let slicedPart = userInput.value.split("").slice(-3);
    const result = slicedPart.join("") + userInput.value + slicedPart.join("");
    // Clearing the input
    userInput.value = "";
    Swal.fire({
      title: "🚀 Your Twisted String is Ready!",
      text: `${result}`,
      icon: "success",
      confirmButtonText: "Awesome!",
    });
  }
});
