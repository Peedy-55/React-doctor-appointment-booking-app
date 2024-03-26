import React, { useState, useEffect } from 'react';
import displayAppointmentsService from '../../services/AppointmentsService';
import fetchAccountDetailsService from '../../services/FetchAccountDetailsService';

const Appointments = () => {
  const [client, setClient] = useState(null); 
  const [doctor, setDoctor] = useState(null); 
  const [appointments, setAppointments] = useState([]);
  const[selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [userType, setUserType] = useState("client")
  const [searchInput, setSearchInput] = useState("");

  const [error, setError] = useState('');
  const [count, setCount] = useState(0);

  useEffect(() => {
    const userDataStr = localStorage.getItem('user');
    if (userDataStr) {
      const userData = JSON.parse(userDataStr);
      const { id: userId, type: userType } = userData;
      setUserType(userType)
    //   console.log(userType,userId)
    //   console.log()
      
     
      displayAppointmentsService.getAppointments(userType, userId)
        .then(data => {
          console.log(data, typeof(data));
          const filteredAppointments = data.data.filter(appointment => {
            return appointment.appointmentDate === searchInput;
          });
          if(searchInput===""){
            setAppointments(data.data);
          }else{
            setAppointments(filteredAppointments);
          }
        //   setAppointments(filteredAppointments);
          
        })
        .catch(err => {
          console.error(err);
          setError(err.message || 'Failed to load appointments');
        });
    }
  }, [searchInput]); 
  

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };


  function fetchAdditionalDetails(clientId,doctorId,appointmentId) {
        setSelectedAppointmentId(appointmentId);
        setCount(count+1)
        if (count%2===0){
        if(userType === 'client'){
            fetchAccountDetailsService.fetchDoctorDetails(doctorId)
            .then(data => {
                console.log(data, typeof(data));
                setDoctor(data.data)
                setClient(null)
              })
              .catch(err => {
                console.error(err);
                // setError(err.message || 'Failed to load appointments');
              });
        }else if(userType==='doctor'){
            fetchAccountDetailsService.fetchClientDetails(clientId)
            .then(data => {
                console.log(data, typeof(data));
                setClient(data.data)
                setDoctor(null)
                // setAppointments(data.data);
              })
              .catch(err => {
                console.error(err);
                // setError(err.message || 'Failed to load appointments');
              });
        }else{


            fetchAccountDetailsService.fetchDoctorDetails(doctorId)
            .then(data => {
                console.log(data, typeof(data));
                setDoctor(data.data)
                // setAppointments(data.data);
              })
              .catch(err => {
                console.error(err);
                // setError(err.message || 'Failed to load appointments');
              });


              fetchAccountDetailsService.fetchClientDetails(clientId)
              .then(data => {
                  console.log(data, typeof(data));
                  setClient(data.data)
                  // setAppointments(data.data);
                })
                .catch(err => {
                  console.error(err);
                  // setError(err.message || 'Failed to load appointments');
                });
        }}
        else{
            setClient(null)
            setDoctor(null)
        }
  }

  return (
    <div>
      {error && <p>Error: {error}</p>}
      <input
        type="date"
        value={searchInput}
        onChange={handleSearchInputChange}
      />
        <div className="container p-5">
            <h3 className="heading">Appointments</h3><br/>
            <table className="table table-striped-columns">
                <thead>
                <tr>
                    <th>S.no</th>
                    {/* {(userType==='doctor'||userType==='admin') &&<th>Patient Name</th>} */}
                    {/* {(userType==='client'||userType==='admin') &&<th>Doctor Name</th>} */}
                    {/* {(userType==='doctor') && <th>Age of Patient</th>} */}
                    {/* {(userType==='client') && <th>Specialisation</th>} */}
                    {/* {(userType==='client') && <th>Experience</th>} */}
                    <th>Appointment Description</th>
                    <th>Payment Status</th>
                    <th>Appointment Date</th>
                    <th>Appointment Slot</th>
                    <th>Details</th>
                    {/* {(userType==='client') && <th>Consultancy Fee</th>} */}
                </tr>
                </thead>
                <tbody>
                {appointments.map((appointment, index) => (
                    <tr key={index}>
                        <td>{index}</td>
                        <td>{appointment.appointmentDescription}</td>
                        <td>{String(appointment.paymentStatus)}</td>
                        <td>{appointment.appointmentDate}</td>
                        <td>{appointment.appointmentSlot}</td>
                        {/* {(userType==='client') && <td>{appointment.doctor.consultancyFee}</td>} */}
                        <td><button className='btn btn-primary' onClick={()=>{fetchAdditionalDetails(appointment.clientID,appointment.doctorID,appointment.id)}} >Show More Details</button></td>
                        {client!==null && doctor!==null && appointment.id===selectedAppointmentId && <td>
                           <span>Patient's Name : {client.name}</span><br/>
                           <span>Doctor's Name : {doctor.name}</span><br/>
                            </td>}
                        {client!==null && doctor===null && appointment.id===selectedAppointmentId && <td>
                           <span>Patient's Name : {client.name}</span><br/>
                           <span>Patient's Age : {client.age}</span><br/>
                            </td>}
                        {client===null && doctor!==null && appointment.id===selectedAppointmentId && <td>
                           <span>Doctor's Name : {doctor.name}</span><br/>
                           <span>Doctor's Specialization : {doctor.specialization}</span><br/>
                           <span>Doctor's Experience: {doctor.experience}</span><br/>
                           <span>Doctor's Consultancy Fee: {doctor.consultancyFee}</span><br/>
                            </td>}
                            
                    </tr>
                    
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};







export default Appointments