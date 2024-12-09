import React, { Fragment, useEffect, useState } from "react";
import styles from "./Modal.module.css";
import { createPortal } from "react-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Input from "../Input/Input.js";
import CustomButton from "../CustomButton/CustomButton.js";
const Backdrop = ({ toggleModal, showModal }) => {
  return (
    <div
      className={`${styles.backdrop} ${showModal ? styles.backdropShow : null}`}
      onClick={toggleModal}
    ></div>
  );
};
const Overlay = ({
  toggleModal,
  showModal,
  selectedDeveloper,
  mode,
  getData,
  devCount,
  developers
}) => {
  const [devFirstname, setDevFirstname] = useState("");
  const [devLastname, setDevLastname] = useState("");
  const [devId, setDevId] = useState("");
  const [devEmail, setDevEmail] = useState("");
  const [devRole, setDevRole] = useState("");
  const [devDepartment, setDevDepartment] = useState("");
  const errors = {};

  useEffect(() => {
    if (mode == "view" || mode == "update") {
      setDevFirstname(selectedDeveloper.firstname);
      setDevLastname(selectedDeveloper.lastname);
      setDevId(selectedDeveloper.id);
      setDevEmail(selectedDeveloper.email);
      setDevRole(selectedDeveloper.role);
      setDevDepartment(selectedDeveloper.department);
    }
  }, [selectedDeveloper, mode]);

  const validateFirstName = () => {
    if (!devFirstname.trim()) errors.firstname = "First Name cannot be empty.";
    if (devFirstname.length < 3)
      errors.firstname = "Name must be at least 3 characters long";
    if (devFirstname.length > 30)
      errors.firstname = "Name can't be more than 30 characters long";
  };

  const validateLastName = () => {
    if (!devLastname.trim()) errors.lastname = "Last Name cannot be empty.";
    if (devLastname.length < 3)
      errors.lastname = "Name must be at least 3 characters long";
    if (devLastname.length > 30)
      errors.lastname = "Name can't be more than 30 characters long";
  };
  const validateEmail = () => {
    if (!devEmail.trim()) {
      errors.email = "Email field cannot be empty.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(devEmail)) {
      errors.email = "Please enter a valid email address.";
    }
    if (mode === "add" && developers.some(developer => developer.email === devEmail)) {
      errors.email = "Email already exists.";
    } else if (
      mode === "update" &&
      developers.some(developer => developer.email === devEmail && developer.id !== selectedDeveloper.id)
    ) {
      errors.email = "Email already exists.";
    }
   
  
  };
  const validateInputs = () => {
    validateFirstName();
    validateLastName();
    validateEmail();
     if (!devRole.trim()) errors.role = "Role is required.";
    if (!devDepartment.trim()) errors.department = "Department is required.";
  };
  const handleSubmition = async (e) => {
    e.preventDefault();
    validateInputs();
    if (Object.keys(errors).length > 0) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Validation Error",
        html: `<ul style="text-align: left; color: red;">
          ${Object.values(errors)
            .map((error) => `<li>${error}</li>`)
            .join("")}
        </ul>`,
        showConfirmButton: true,
      });
      return;
    }

    // Prepare the developer data
    const newDeveloper = {
      id: devId,
      firstname: devFirstname,
      lastname: devLastname,
      email: devEmail,
      role: devRole,
      department: devDepartment,
    };

    try {
      if (mode === "add") {
        await axios.post("https://675696bf11ce847c992d52f1.mockapi.io/frontendSystem/frontend", newDeveloper);
      } else if (mode === "update") {
        if (
          selectedDeveloper.firstname === devFirstname &&
          selectedDeveloper.lastname === devLastname &&
          selectedDeveloper.id === devId &&
          selectedDeveloper.email === devEmail &&
          selectedDeveloper.role === devRole &&
          selectedDeveloper.department === devDepartment
        ) {
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "No Changes Detected",
            text: "Please make changes and try again.",
            showConfirmButton: true,
          });
          return;
        }
        await axios.put(
          `https://675696bf11ce847c992d52f1.mockapi.io/frontendSystem/frontend/${selectedDeveloper.id}`,
          newDeveloper
        );
      }
      getData();
      Swal.fire({
        position: "center",
        icon: "success",
        title: `${mode === "add" ? "Added" : "Updated"} Successfully!`,
        showConfirmButton: false,
        timer: 1500,
      });
      toggleModal();
    } catch (error) {
      console.error(error.message);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Something went wrong!",
        text: error.message,
        showConfirmButton: true,
      });
    }
  };

  return (
    <div
      className={`${styles.overlay} ${showModal ? styles.overlayShow : null}`}
    >
      <form onSubmit={handleSubmition}>
        <header className="border-bottom d-flex justify-content-between align-items-center p-2 position-relative">
          <h4 className="mb-0">Developer Details</h4>
          <button className={styles.closeButton} onClick={toggleModal}>
            ×
          </button>
        </header>
        <main className={`border-bottom ${styles.inputFields} `}>
          <Input
            label="First Name"
            id="firstname"
            type="text"
            value={devFirstname}
            onChange={(e) => setDevFirstname(e.target.value)}
            placeholder={"Enter First Name"}
            disabled={mode === "view" ? true : false}
          />
          <Input
            label="Last Name"
            id="lastname"
            type="text"
            value={devLastname}
            onChange={(e) => setDevLastname(e.target.value)}
            placeholder={"Enter Last Name"}
            disabled={mode === "view" ? true : false}
          />
          <Input
            label="ID"
            id="id"
            type="number"
            value={mode==='add'?devCount:devId}
            onChange={(e) => setDevId(e.target.value)}
             disabled={true}
          />
          <Input
            label="Email"
            id="email"
            type="email"
            value={devEmail}
            onChange={(e) => setDevEmail(e.target.value)}
            placeholder={"Enter the email"}
            disabled={mode === "view" ? true : false}
          />
          <Input
            label="Role"
            id="role"
            type="text"
            value={devRole}
            onChange={(e) => setDevRole(e.target.value)}
            placeholder={"Enter the role"}
            disabled={mode === "view" ? true : false}
          />
          <Input
            label="Department"
            id="department"
            type="text"
            value={devDepartment}
            onChange={(e) => setDevDepartment(e.target.value)}
            placeholder={"Enter the department"}
            disabled={mode === "view" ? true : false}
          />
        </main>
        {mode !== "view" && (
          <footer>
            <CustomButton>{mode === "add" ? "Add" : "Update"}</CustomButton>
          </footer>
        )}
      </form>
    </div>
  );
};
const Modal = ({
  toggleModal,
  showModal,
  selectedDeveloper,
  mode,
  getData,
  devCount,
  developers
}) => {
  return (
    <Fragment>
      {createPortal(
        <Fragment>
          <Backdrop toggleModal={toggleModal} showModal={showModal} />
          <Overlay
            toggleModal={toggleModal}
            mode={mode}
            showModal={showModal}
            selectedDeveloper={selectedDeveloper}
            getData={getData}
            devCount={devCount}
            developers={developers}
          />
        </Fragment>,
        document.getElementById("modal")
      )}
    </Fragment>
  );
};

export default Modal;
