import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";

const TableCard = ({ developer, toggleModal, setSelectedDeveloper,getData }) => {
  const { id,firstname,lastname, email, role, department } = developer;
  const handleView = (id) => {
    const fetchData = async () => {
      const { data } = await axios.get(`https://675696bf11ce847c992d52f1.mockapi.io/frontendSystem/frontend/${id}`);
      setSelectedDeveloper(data);
      toggleModal("view", developer);
    };
    fetchData();
  };
  const handleEdit = () => {
    toggleModal("update", developer);
  };
  const handleDelete=(id,firstname)=>{
    Swal.fire({
      title: `Are you sure?`,
      text: `You ware going to delete ${firstname}'s data`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async(result) => {
      if (result.isConfirmed) {
        const fetchData = async () => {
          await axios.delete(`https://675696bf11ce847c992d52f1.mockapi.io/frontendSystem/frontend/${id}`);
        };
        await fetchData();
        getData();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      
      }
    });
   
  }
  return (
    <tr>
      <td className="p-2 p-md-3 text-start text-white">{id}</td>
      <td className="p-2 p-md-3 text-start text-white">{firstname}</td>
      <td className="p-2 p-md-3 text-start text-white">{lastname}</td>
      <td className="p-2 p-md-3 text-start text-white">{email}</td>
      <td className="p-2 p-md-3 text-start text-white">{role}</td>
      <td className="p-2 p-md-3 text-start text-white">{department}</td>
      <td className="p-2 p-md-3">
  {/* Buttons for larger screens */}
  <div className="d-none d-md-flex gap-2">
    <button
      className="btn btn-primary btn-sm"
      onClick={() => handleView(id)}
    >
      <i className="fa-regular fa-eye"></i>
    </button>
    <button
      className="btn btn-warning text-white btn-sm"
      onClick={handleEdit}
    >
      <i className="fa-solid fa-pen-to-square"></i>
    </button>
    <button
      className="btn btn-danger btn-sm"
      onClick={() => handleDelete(id, firstname)}
    >
      <i className="fa-solid fa-trash"></i>
    </button>
  </div>

  {/* Dropdown for smaller screens */}
  <div className="d-md-none dropdown">
    <button
      className="btn btn-secondary btn-sm dropdown-toggle"
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      Actions
    </button>
    <ul className="dropdown-menu">
      <li>
        <button
          className="dropdown-item"
          onClick={() => handleView(id)}
        >
          <i className="fa-regular fa-eye me-2"></i> View
        </button>
      </li>
      <li>
        <button
          className="dropdown-item"
          onClick={handleEdit}
        >
          <i className="fa-solid fa-pen-to-square me-2"></i> Edit
        </button>
      </li>
      <li>
        <button
          className="dropdown-item text-danger"
          onClick={() => handleDelete(id, firstname)}
        >
          <i className="fa-solid fa-trash me-2"></i> Delete
        </button>
      </li>
    </ul>
  </div>
</td>

    </tr>
  );
};

export default TableCard;
