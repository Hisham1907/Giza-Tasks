"use strict";
const itemInput = document.getElementById("itemInput"),
  addBtn = document.querySelector("#addBtn"),
  displayBtn = document.querySelector("#displayBtn"),
  deleteAllBtn = document.querySelector("#deleteAllBtn"),
  itemTableBody = document.getElementById("itemTableBody");
let items = [];
if (localStorage.getItem("items")) {
  items = JSON.parse(localStorage.getItem("items"));
}

function addItem() {
  items.push(itemInput.value);
  localStorage.setItem("items", JSON.stringify(items));
}
function displayItems() {
  let content = "";
  items.forEach((item, index) => {
    content += ` <tr>
                          <td>Element ${index}</td>
                          <td>${item}</td>
                        </tr>`;
  });
  itemTableBody.innerHTML = content;
}

function clearInput() {
  itemInput.value = "";
}
function deleteAll() {
  if (items.length === 0) {
    Swal.fire({
      icon: "info",
      title: "Nothing to delete!",
      text: "No items found in the list.",
    });
  } else {
    items.splice(0);
    localStorage.setItem("items", JSON.stringify(items));
    Swal.fire("Deleted!", "All items have been deleted.", "success");
  }
}
addBtn.addEventListener("click", () => {
  if (itemInput.value.trim() == "") {
    Swal.fire({
      icon: "error",
      title: "Wake up !",
      text: "Input field can't be empty",
    });
  } else {
    addItem();
    clearInput();
    // displayItems();
    Swal.fire({
      icon: "success",
      title: "Item Added",
      text: "Your item has been added successfully!",
    });
  }
});
displayBtn.addEventListener("click", () => {
  if (items.length === 0) {
    Swal.fire({
      icon: "info",
      title: "No items found!",
      text: "There are no items to display.",
    });
  } else {
    displayItems();
  }
});
deleteAllBtn.addEventListener("click", () => {
  deleteAll();
  displayItems();
});
