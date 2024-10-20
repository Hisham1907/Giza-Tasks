"use strict";
// Initializations
const tableContent = document.getElementById("table-content"),
  customerName = document.querySelector("#customerName"),
  customerCompany = document.querySelector("#customerCompany"),
  customerCart = document.querySelector("#customerCart"),
  updateBtn = document.querySelector("#updateBtn"),
  searchBar = document.querySelector("#searchBar");
let currentIndex, customers;

if (localStorage.getItem("customers") === null) {
  customers = [
    {
      customerName: "Bessie Cooper",
      customerCompany: "IBM",
      customerImgSrc: "Bessie.svg",
      customerCart: "453",
    },
    {
      customerName: "Wade Warren",
      customerCompany: "L'Oréal",
      customerImgSrc: "Wade.svg",
      customerCart: "994",
    },
    {
      customerName: "Arlene McCoy",
      customerCompany: "Gillette",
      customerImgSrc: "Arlene.svg",
      customerCart: "429",
    },
    {
      customerName: "Jenny Wilson",
      customerCompany: "MasterCard",
      customerImgSrc: "Jenny.svg",
      customerCart: "826",
    },
    {
      customerName: "Kristin Watson",
      customerCompany: "Gillette",
      customerImgSrc: "Kristin.svg",
      customerCart: "561",
    },

    {
      customerName: "Cameron Williamson",
      customerCompany: "Louis Vuitton",
      customerImgSrc: "Cameron.svg",
      customerCart: "540",
    },
  ];
} else {
  customers = JSON.parse(localStorage.getItem("customers"));
}
// Functions
function displayData() {
  let content = "";
  customers.forEach((customer, idx) => {
    content += `
     <tr >
          <td class="p-3" ><input type="checkbox"></th>
          <td class="p-3 text-start" >${customer.customerName}</td>
          <td class="p-3 text-start">${customer.customerCompany}</td>
          <td class="p-3 text-start"><img src="./content/images/${customer.customerImgSrc}" alt="${customer.customerName}"></td>
          <td class="p-3 text-start">${customer.customerCart} €</td>
          <td class="p-3 ">
            <svg onclick="showData(${idx})" class="me-md-4 mb-2 mb-md-0  cursor-pointer" data-bs-toggle="modal" data-bs-target="#updateModal" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 17.75V21.5H6.75L17.81 10.44L14.06 6.69L3 17.75ZM20.71 7.54C21.1 7.15 21.1 6.52 20.71 6.13L18.37 3.79C17.98 3.4 17.35 3.4 16.96 3.79L15.13 5.62L18.88 9.37L20.71 7.54Z" fill="#357860"/>
            </svg>
            <svg onclick="deleteData(${idx})" class="cursor-pointer"  width="14" height="19" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 16.5C1 17.6 1.9 18.5 3 18.5H11C12.1 18.5 13 17.6 13 16.5V4.5H1V16.5ZM14 1.5H10.5L9.5 0.5H4.5L3.5 1.5H0V3.5H14V1.5Z" fill="#b91c1c"/>
</svg>
            </td>
        </tr>`;
  });
  tableContent.innerHTML = content;
}
function showData(index) {
  currentIndex = index;
  customerName.value = customers[index].customerName;
  customerCompany.value = customers[index].customerCompany;
  customerCart.value = customers[index].customerCart;
}
function updateData() {
  if (
    customerName.value === customers[currentIndex].customerName &&
    customerCompany.value === customers[currentIndex].customerCompany &&
    customerCart.value === customers[currentIndex].customerCart
  ) {
    Swal.fire({
      title: "No changes detected",
      text: "No updates were made as no changes were detected.",
      icon: "info",
    });
  } else {
    if (
      (customerName.value.trim() === ""||
      customerCompany.value.trim() === ""||
      customerCart.value.trim() === "")
    ) {
      Swal.fire({
        title: "Input field can't be empty",
        icon: "warning",
      });
    } else {
      customers[currentIndex].customerName = customerName.value;
      customers[currentIndex].customerCompany = customerCompany.value;
      customers[currentIndex].customerCart = +customerCart.value;
      Swal.fire("Data Updated successfully", "", "success");
      localStorage.setItem("customers", JSON.stringify(customers));
    }
  }
}
function deleteData(index) {
  Swal.fire({
    title: "Are you sure?",
    text: "This will delete the customer from your table!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      customers.splice(index, 1);
      localStorage.setItem("customers", JSON.stringify(customers));
      displayData();

      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "Cancelled!",
        icon: "success",
      });
    }
  });
}
function searchData() {
  const searchTerm = searchBar.value.toLowerCase().trim();
  let searchResults = customers.filter((customer) => {
    return (
      customer.customerName.toLowerCase().includes(searchTerm) ||
      customer.customerCompany.toLowerCase().includes(searchTerm)
    );
  });
  let content = "";
  searchResults.forEach((customer, idx) => {
    content += `
     <tr class="cursor-pointer">
          <td class="p-3" ><input type="checkbox"></th>
          <td class="p-3 text-start" >${customer.customerName}</td>
          <td class="p-3 text-start">${customer.customerCompany}</td>
          <td class="p-3 text-start"><img src="./content/images/${customer.customerImgSrc}" alt="${customer.customerName}"></td>
          <td class="p-3 text-start">${customer.customerCart} €</td>
          <td class="p-3 text-start d-flex align-content-center">
            <svg onclick="showData(${idx})" class="me-3 cursor-pointer" data-bs-toggle="modal" data-bs-target="#updateModal" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 17.75V21.5H6.75L17.81 10.44L14.06 6.69L3 17.75ZM20.71 7.54C21.1 7.15 21.1 6.52 20.71 6.13L18.37 3.79C17.98 3.4 17.35 3.4 16.96 3.79L15.13 5.62L18.88 9.37L20.71 7.54Z" fill="#357860"/>
            </svg>
            <svg onclick="deleteData(${idx})" class="cursor-pointer"  width="14" height="19" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 16.5C1 17.6 1.9 18.5 3 18.5H11C12.1 18.5 13 17.6 13 16.5V4.5H1V16.5ZM14 1.5H10.5L9.5 0.5H4.5L3.5 1.5H0V3.5H14V1.5Z" fill="#b91c1c"/>
</svg>

            </td>
        </tr>`;
  });
  tableContent.innerHTML = content;

  /* You will find duplicated code here between the displayData function and the searchResults functionallity , I didn't pass the array to the displayData Function as an argument and then just display the data inside it , Because when you have the new array filtered the elements it have are at different indices than in the original array so when you delete or update you will update based on the wrong index number so a wrong element will be deleted from the original array , I had this problem before and I solved it by adding a unique id to each element by using date.now() it generates a new id each time I add a new element in the array and then in the delete function or the update function , I use findIndex to get the right index using the id but here , I have the array data given , Iam not adding by myself , I could have used name or company name but it will be weird */
}
// Events
updateBtn.addEventListener("click", () => {
  updateData();
  displayData();
});
searchBar.addEventListener("keyup", () => {
  searchData();
});

// default function calls
displayData();
