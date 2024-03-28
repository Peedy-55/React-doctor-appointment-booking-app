
import React, { useEffect, useState } from 'react';
import displayDoctorsService from '../../services/DisplayDoctorsService';
import bookAppointmentService from '../../services/BookAppointmentService';
import deactivateDoctorsService from '../../services/DeactivateDoctorService';
import viewAllDoctorsService from '../../services/ViewAllDoctorsService';


const AllDoctors=()=>{
  const [doctors, setDoctors] = useState([]);
  const [doctor, setDoctor] = useState({});
  const [filteredDoctors, setFilteredDoctors] = useState([...doctors]); 
  const [appointment, setAppointment] = useState({ clientID: '', doctorID: '' });
  const [error, setError] = useState('');
  const [businessLogicError, setBusinessLogicError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [sortType, setSortType] = useState('name');
  const [searchType, setSearchType] = useState('name');
  const [searchInput, setSearchInput] = useState('');
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [formEnabled, setFormEnabled] = useState(false);

 

  const displayfilteredDoctors = () => {
    let updatedFilteredDoctors = [...doctors];
    // console.log(searchType, searchInput);
    if (searchInput !== "") {
        updatedFilteredDoctors = updatedFilteredDoctors.filter((doctor) => {
          return doctor[searchType] && typeof doctor[searchType] === 'string' && doctor[searchType].toLowerCase().includes(searchInput.toLowerCase());
        });
      }
    console.log(sortType,"sortType")
    // switch(sortType){
    //     case 'name':
    //       updatedFilteredDoctors.sort((doctor1,doctor2)=>doctor1.name.localeCompare(doctor2.name))
    //       break
    //     case 'specialization':
    //       updatedFilteredDoctors.sort((doctor1,doctor2)=>doctor1.specialization.localeCompare(doctor2.specialization))
    //        break         
    //     case 'experience':
    //       updatedFilteredDoctors.sort((doctor1,doctor2)=>doctor1.experience-doctor2.experience)
    //      break
    //     case 'consultancy-fee':
    //       updatedFilteredDoctors.sort((doctor1,doctor2)=>JSON.parse(doctor1.consultancyFee)-JSON.parse(doctor2.consultancyFee))
    //       break
    // }
    updatedFilteredDoctors = updatedFilteredDoctors.sort((doctor1, doctor2) => {
        switch (sortType) {
          case 'name':
            return doctor1.name.localeCompare(doctor2.name);
          case 'specialization':
            return doctor1.specialization.localeCompare(doctor2.specialization);
          case 'experience':
            // Assuming experience is a number. If it's a string, you'll need to parse it
            return doctor1.experience - doctor2.experience;
          case 'consultancy-fee':
            // Assuming consultancyFee is stored as a string that needs parsing into a number
            return parseFloat(doctor1.consultancyFee) - parseFloat(doctor2.consultancyFee);
          default:
            return 0; // No sorting
        }
      });
    // console.log(sortType)
    setFilteredDoctors(updatedFilteredDoctors);
  };

  useEffect(()=>{
    viewAllDoctorsService.getAllDoctors().then(data => {
        console.log(data);
        setBusinessLogicError('');
        setDoctors(data.data)
        setFilteredDoctors(data.data)
      })
      .catch(err => {
        console.error(err);
        if (typeof(err.response.data) === 'string') {
          setBusinessLogicError(err.response.data);
        }
        setSuccessMessage('');
      });
      setTimeout(() => {
        setSuccessMessage("");
        setBusinessLogicError("")
      }, 3000);
  },[])

  useEffect(displayfilteredDoctors,[searchInput,searchType,sortType,doctors])



  const deactivateDoctor=(id)=>{
    deactivateDoctorsService.deactivateDoctor(id).then(data => {
        console.log(data);
        setBusinessLogicError('');
        setSuccessMessage('Doctor Account Deactivated!');
      })
      .catch(err => {
        console.error(err);
        if (typeof(err.response) === 'string') {
          setBusinessLogicError(err.response);
        }
        setSuccessMessage('');
      });
      setTimeout(() => {
        setSuccessMessage("");
        setBusinessLogicError("")
      }, 3000);
  }

  const onChangesearchType=(e)=>{
    setSearchType(e.target.value);
}

const onChangeSearchInput=(e)=>{
    setSearchInput(e.target.value);
    // console.log(searchInput);
}

const onChangeSortType=(e)=>{
    setSortType(e.target.value);
}

    return(
        <div className="d-flex flex-column justify-content-center p-5">
            <div className="d-flex flex-column justify-content-center">
                <div>
                    <div>
                        <h3 className="heading">Search by: </h3>
                        <select className="form-select" onChange={onChangesearchType} name="searchType" id="searchType">
                            <option value="name" defaultValue={true}>Name</option>
                            <option value="specialization">Specialization</option>
                        </select> <br/><br/>
                        
                        <input className="search-input" onChange={onChangeSearchInput} type="search" placeholder="Search"/><br/><br/><br/>
                    </div>
                    <div>
                        <h3 className="heading">Sort by: </h3>
                        <select className="form-select" onChange={onChangeSortType} name="sortType" id="sortType" >
                            <option value="name" defaultValue={true}>Name</option>
                            <option value="specialization">Specialization</option>
                            <option value="experience">Experience</option>
                            <option value="consultancy-fee">Consultancy Fee</option>
                        </select> <br/><br/>
                    </div>
                </div>
                <button className="btn btn-primary" type="button" onClick={displayfilteredDoctors}>Show All Doctors</button><br/><br/>
                {businessLogicError!=="" && <p className="alert alert-danger mt-3" >{businessLogicError}</p>}
                {successMessage!=="" && <p className="alert alert-success" >{successMessage}</p>}
            
            </div><br/><br/>

            {filteredDoctors.length<1 && <p className="alert alert-danger mt-3">No doctors found</p>}
            {filteredDoctors.length>0 && <><h3 className="heading" >Available Doctors</h3>
            <table className="table table-striped-columns" >
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Specialization</th>
                        <th>Experience</th>
                        <th>Consultancy Fee</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                   {filteredDoctors.map((doctor,index)=>(
                     <tr key={index}>
                     <td>{index}</td>
                     <td>{doctor.name}</td>
                     <td>{doctor.specialization}</td>
                     <td>{doctor.experience}</td>
                     <td>{doctor.consultancyFee}</td>
                     <td>
                         <button className="btn btn-danger" type="button" disabled={doctor.isActive===false} onClick={()=>{deactivateDoctor(doctor.id)}}>Deactivate Account</button>
                     </td>
                 </tr>
                   ))}
                </tbody>
            </table></>}
        </div>
    )
}

export default AllDoctors