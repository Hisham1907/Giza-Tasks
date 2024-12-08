import { useEffect, useState } from "react";
import "./App.css";
import Logo from "./Components/Logo/Logo.js";
import Table from "./Components/Table/Table.js";
import axios from "axios";
import Modal from "./Components/Modal/Modal.js";
import Swal from "sweetalert2";
import CustomButton from "./Components/CustomButton/CustomButton.js";
import Input from "./Components/Input/Input.js";

function App() {
  const [developers, setDevelopers] = useState([]);
  const [filteredDevelopers, setFilteredDevelopers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDeveloper, setSelectedDeveloper] = useState(null);
  const [mode, setMode] = useState("add");
  const [searchTerm, setSearchTerm] = useState("");

  const getData = async () => {
    try {
      const { data } = await axios.get("http://localhost:3001/frontend");
      setDevelopers(data);
      setFilteredDevelopers(data); // Initialize filteredDevelopers
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error fetching data",
        text: error.message,
        showConfirmButton: true,
      });
    }
  };

  const toggleModal = (mode = "add", developer = null) => {
    setShowModal(!showModal);
    setMode(mode);
    setSelectedDeveloper(developer);
  };

  const openAddModal = () => {
    setMode("add");
    setSelectedDeveloper(null);
    setShowModal(true);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = developers.filter((dev) =>
      `${dev.firstname} ${dev.lastname} ${dev.email} ${dev.id} ${dev.role} ${dev.department}`
        .trim()
        .toLowerCase()
        .includes(term.trim().toLowerCase())
    );
    setFilteredDevelopers(filtered);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="p-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
        <Logo />
        <Input
          className="mt-3 mt-md-0"
          placeholder="Search ...."
          onChange={(e) => handleSearch(e.target.value)}
          value={searchTerm}
        />
      </div>
      <h2 className="text-white my-4 text-center">Frontend Department</h2>
      <CustomButton className="mb-4" onClick={openAddModal}>
        New Member
      </CustomButton>
      <div className="table-responsive w-100">
        <Table
          developers={filteredDevelopers}
          toggleModal={toggleModal}
          setSelectedDeveloper={setSelectedDeveloper}
          getData={getData}
        />
      </div>
      {showModal ? (
        <Modal
          toggleModal={toggleModal}
          showModal={showModal}
          selectedDeveloper={selectedDeveloper}
          mode={mode}
          getData={getData}
        />
      ) : null}
    </div>
  );
}

export default App;
