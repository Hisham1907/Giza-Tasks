import React from 'react'
import './Table.module.css'
import TableCard from '../TableCard/TableCard'
const Table = ({developers,toggleModal,setSelectedDeveloper,getData}) => {
const tableData=developers.map(developer =><TableCard developer={developer} key={developer.id} toggleModal={toggleModal} setSelectedDeveloper={setSelectedDeveloper} getData={getData}/>)
  return <>
<table className="table w-100">
  <thead >
    <tr >
      <th className="p-2 p-md-3 text-white">ID</th>
      <th className="p-2 p-md-3 text-white">First Name</th>
      <th className="p-2 p-md-3 text-white">Last Name</th>
      <th className="p-2 p-md-3 text-white">Email</th>
      <th className="p-2 p-md-3 text-white">Role</th>
      <th className="p-2 p-md-3 text-white">Department</th>
      <th className="p-2 p-md-3 text-white">Actions</th>
    </tr>
  </thead>
  <tbody>
{tableData}
  </tbody>
</table>
  </>
}

export default Table;
