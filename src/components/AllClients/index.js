import React, { useEffect, useState } from 'react';
import viewAllClientsService from '../../services/ViewAllClientsService';


const AllClients=()=>{
  const [clients, setClients] = useState([]);
  const[filteredClients,setFilteredClients] = useState([...clients]); 
  const [error, setError] = useState('');
  const [businessLogicError, setBusinessLogicError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [formEnabled, setFormEnabled] = useState(false);
 

  const displayfilteredClients = () => {
    let updatedFilteredClients = [...clients];
    // console.log(searchType, searchInput);
    if (searchInput !== "") {
        updatedFilteredClients = updatedFilteredClients.filter((client) => {
          return client.name && typeof client.name === 'string' && client.name.toLowerCase().includes(searchInput.toLowerCase());
        });
      }
    
    
    updatedFilteredClients = updatedFilteredClients.sort((doctor1, doctor2) =>  doctor1.name.localeCompare(doctor2.name));
  
    setFilteredClients(updatedFilteredClients);
  };


  useEffect(() => {
    viewAllClientsService.getAllClients().then(data => {
        console.log(data);
        setBusinessLogicError('');
        setClients(data.data)
        setFilteredClients(data.data)
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

  useEffect(displayfilteredClients,[searchInput,clients])

  const onChangeSearchInput=(e)=>{
    setSearchInput(e.target.value);
    // console.log(searchInput);
}

    return(
        <div className="d-flex flex-column justify-content-center p-5">
            <div className="d-flex flex-column justify-content-center">
                <div>
                    <div>
                        <h3 className="heading">Search : </h3>
                        <input className="search-input" onChange={onChangeSearchInput} type="search" placeholder="Search"/><br/><br/><br/>
                    </div>
    
                </div>
                <button className="btn btn-primary" type="button" onClick={displayfilteredClients}>Show All Clients</button><br/><br/>
                {businessLogicError!=="" && <p className="alert alert-danger mt-3" >{businessLogicError}</p>}
                {successMessage!=="" && <p className="alert alert-success" >{successMessage}</p>}
            
            </div><br/><br/>

            {filteredClients.length<1 && <p className="alert alert-danger mt-3">No clients found</p>}

            {filteredClients.length>0 && <><h3 className="heading" >List of All Clients</h3>
            <table className="table table-striped-columns" >
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>E-Mail</th>
                        <th>Mobile Number</th>
                    </tr>
                </thead>
                <tbody>
                   {clients.map((client,index)=>(
                     <tr key={index}>
                     <td>{index}</td>
                     <td>{client.name}</td>
                     <td>{client.age}</td>
                     <td>{client.email}</td>
                     <td>{client.mobileNumber}</td>
                 </tr>
                   ))}
                </tbody>
            </table></>}
        </div>
    )
}

export default AllClients