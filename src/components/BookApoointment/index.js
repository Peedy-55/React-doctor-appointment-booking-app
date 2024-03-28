
import React, { useEffect, useState } from 'react';
import displayDoctorsService from '../../services/DisplayDoctorsService';
import bookAppointmentService from '../../services/BookAppointmentService';


const BookAppointment=()=>{
  const [doctors, setDoctors] = useState([]);
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

  useEffect(displayfilteredDoctors,[searchInput,searchType,sortType,doctors])


  useEffect(() => {
    // console.log(searchType, searchInput);
    displayDoctorsService.getDoctors(searchType, searchInput)
      .then(data => {
        // console.log(data.data[0].name,typeof(data.data));
        // setError('');
        setDoctors(data.data);
        setFilteredDoctors(data.data); 
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
      });
  },[])

  const initiateBooking = (doctorId) => {
    setSelectedDoctorId(doctorId);
    setFormEnabled(true);
    const userDetails = JSON.parse(localStorage.getItem("user"));
    
    // console.log(userDetails.id,selectedDoctorId);
   
    setAppointment({ ...appointment, clientID: userDetails.id, doctorID: doctorId });
  };

  const makeBooking = (e) => {
    e.preventDefault();
   
    console.log(appointment.appointmentDescription==null)
    // console.log(doctorId);

    bookAppointmentService.bookAppointment(appointment)
      .then(data => {
        console.log(data);
        setBusinessLogicError('');
        setSuccessMessage('Appointment booking successful!');
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
  };

  const handleAppointmentChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setAppointment({ ...appointment, [name]: value });
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
                        
                        <input className="search-input" type="search" onChange={onChangeSearchInput} placeholder="Search"/><br/><br/><br/>
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

            <h3 className="heading" >Available Doctors</h3>
            <table className="table table-striped-columns" >
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Specialization</th>
                        <th>Experience</th>
                        <th>Consultancy Fee</th>
                        <th>Booking</th>
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
                         <button className="btn btn-primary" type="button" onClick={()=>{initiateBooking(doctor.id)}}>Book Appointment</button>
                     </td>
                     {formEnabled && selectedDoctorId===doctor.id && <td>
                         <form className="form-control p-3 m-3" onSubmit={makeBooking} name="bookAppointment">
                         <div>
                          
                        </div>
                             <h3>Enter appointment details</h3>
                             <label className="form-label" htmlFor="appointmentDescription">Description</label><br/>
                             <input className="form-control" id="appointmentDescription" type="text" name="appointmentDescription" onChange={handleAppointmentChange} placeholder="Brief description(150 characters) for the doctor" required maxLength={150} minLength={1} title="Please enter a valid description of your ailment in 150 characters."/><br/>
                             <label className="form-label" htmlFor="appointmentDate">Appointment Date</label><br/>
                             <input className="form-control" id="appointmentDate" type="date" name="appointmentDate" onChange={handleAppointmentChange} placeholder="Enter Appointment Date" required/><br/>
                             
                             <label className="form-label" htmlFor="appointmentSlot">Appointment Slot</label><br/>
                             <input className="form-control" id="appointmentSlot" type="number" name="appointmentSlot" onChange={handleAppointmentChange} placeholder="Enter Appointment Slot"  required min={1} max={4} title="Slot range is 1 to 4" /><br/>
                             
                             {/* <div *ngIf="appointmentSlotRef.invalid && (appointmentSlotRef.touched || appointmentSlotRef.dirty)">
                                 <p *ngIf="appointmentSlotRef.errors?.['required']" className="text-danger">Appointment Slot cannnot be blank</p>
                                 <p *ngIf="appointmentSlotRef.errors?.['pattern']" className="text-danger">Appointment Slot should be between 1 and 4</p>
                             </div> */}
                             
                             <button className="btn btn-primary" type="submit">Book</button>


                         </form>

                         <h3>Note:</h3>
                            <h4 className="text-center">Slot 1: 9:00am to 9:15am</h4>
                           <h4 className="text-center">Slot 2: 9:15am to 9:30am</h4>
                           <h4 className="text-center">Slot 3: 9:30am to 9:45am</h4>
                            <h4 className="text-center">Slot 4: 9:45am to 10:00am</h4>
                     </td> }
                     {formEnabled&&doctor.id===selectedDoctorId&&<td>
                       
                        </td>}

                 </tr>
                   ))}
                </tbody>
            </table>
        </div>
    )
}

export default BookAppointment