import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import updateService from '../../services/UpdateService';
import loginService from '../../services/LoginService';



function Update (){
    const [userType, setUserType] = useState("client");
    const [client, setClient] = useState({name: '', 
    email: '', 
    password: '', 
    dateOfBirth: '', 
    mobileNumber: ''}); 
    const [doctor, setDoctor] = useState({name: '', 
    email: '', 
    password: '', 
    specialization: '', 
    experience: '', 
    mobileNumber: '', 
    consultancyFee: ''}); 
    
    const [error, setError] = useState("");
    const [businessLogicError, setBusinessLogicError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    
    const navigate = useNavigate();

    const updateClient = (e) => {
        e.preventDefault();
        updateService.updateClient(client, userType)
        .then(data => {
          console.log(data);
          setBusinessLogicError("");
          setSuccessMessage("Patient details updated successfully! Kindly check updated details");
          setTimeout(() => {
            setSuccessMessage("");
            setBusinessLogicError("")
          }, 3000);   
        })
        .catch(err => {
          if (typeof(err.response.data) === "string") {
            setBusinessLogicError(err.response.data);
            setTimeout(() => {
                setSuccessMessage("");
                setBusinessLogicError("")
              }, 3000);
          }
          setSuccessMessage("");
          console.log(err);
        });
    };

    const handleClientChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setClient({ ...client, [name]: value });
    }
  
    const updateDoctor = (e) => {
        e.preventDefault();
        updateService.updateDoctor(doctor, userType)
        .then(data => {
          console.log(data);
          setBusinessLogicError("");
          setSuccessMessage("Doctor details updated successfully! Kindly check updated details");
          setTimeout(() => {
            setSuccessMessage("");
            setBusinessLogicError("")
          }, 3000);
          
        //   setTimeout(() => {
        //     navigate('/login');
        //   }, 3000);
        })
        .catch(err => {
          if (typeof(err.response.data) === "string") {
            setBusinessLogicError(err.response.data);
            setTimeout(() => {
                setSuccessMessage("");
                setBusinessLogicError("")
              }, 3000);
          }
          setSuccessMessage("");
          console.log(err);
        });
    };

    const handleDoctorChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setDoctor({ ...doctor, [name]: value });
    }

    useEffect(() => {
        const userDetails = localStorage.getItem('user');
        if (userDetails !== null) {
          const parsedDetails = JSON.parse(userDetails);
          setUserType(parsedDetails.type);    
          loginService.loginUser({email:parsedDetails.email, password: parsedDetails.password}, parsedDetails.type).then(data => {
            if (parsedDetails.type === 'client') {
              setClient({...data.data});
            } else if (parsedDetails.type === 'doctor') {
              setDoctor({...data.data});
            }
            setError('');
          }).catch(err => {
            setError(err.error);
            console.error(err);
          });
        }
      }, [])

    return (
        <div className="container p-5 w-75">
            {userType === 'client' ? (<h3 className="heading m-2">Update Details for Patient: </h3>) : (<h3 className="heading m-2">Update Details for Doctor</h3>)}
            <div className="card p-5">

           {businessLogicError !=="" && (<p className="alert alert-danger">{businessLogicError}</p>)}
           {successMessage !== "" && (<p className="alert alert-success">{successMessage}</p>)}


           {userType === "client" && <form className="form-control p-5 text-left" name="client" onSubmit={updateClient}>
                
                <label className="form-label " htmlFor="name">Name</label><br/>
                <input className="form-control" onChange={handleClientChange} type="text" id="name" name="name" value={client.name} placeholder="Enter your Name" required pattern="^[a-zA-Z ]{3,20}$" title="Name cannot be blank, and should only contain letters and between 3-20 characters in length"/><br/>

                {/* <div *ngIf="nameRef.invalid && (nameRef.touched || nameRef.dirty)">
                    <p *ngIf="nameRef.errors?.['required']" className="text-danger">Name cannnot be blank</p>
                    <p *ngIf="nameRef.errors?.['pattern']" className="text-danger">Name can only contain letters, length should be between 3-20 characters</p>
                </div> */}

                <label className="form-label" htmlFor="email">Email</label><br/>
                <input className="form-control" type="email" id="email" name="email" value={client.email} placeholder="username@domain.com"  pattern="^[a-zA-Z0-9._+]{1,20}@(gmail\.com|yahoo\.com|ford\.com|outlook\.com)$" disabled title="Email cannot be blank, and please enter a valid email: username@example.com" /><br/>

                {/* <div *ngIf="emailRef.invalid && (emailRef.touched || emailRef.dirty)">
                    <p *ngIf="emailRef.errors?.['required']" className="text-danger">Email cannnot be blank</p>
                    <p *ngIf="emailRef.errors?.['pattern']" className="text-danger">Enter a valid email</p>
                </div> */}

                <label className="form-label" htmlFor="password">Password</label><br/>
                <input className="form-control" onChange={handleClientChange} type="password" id="password" name="password" value={client.password}  placeholder="Enter your password" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w]).{8,16}$"  required title="Password cannot be blank, and should contain atleast 1 Lowercase, 1 Uppercase, 1 Special Character, 1 Number. Password also should be between 8-16 characters in length" /><br/>
                
                {/* <div *ngIf="passwordRef.invalid && (passwordRef.touched || passwordRef.dirty)">
                    <p *ngIf="passwordRef.errors?.['required']" className="text-danger">Password cannnot be blank</p>
                    <p  className="text-danger"></p>
                </div> */}
                
                <label className="form-label" htmlFor="dateOfBirth">Date of Birth</label><br/>
                <input className="form-control" onChange={handleClientChange} type="date" id="dateOfBirth" name="dateOfBirth" value={client.dateOfBirth} placeholder="Enter your date of birth" required /><br/>
                
                {/* <div *ngIf="dateOfBirthRef.invalid && (dateOfBirthRef.touched || dateOfBirthRef.dirty)">
                    <p *ngIf="dateOfBirthRef.errors?.['required']" className="text-danger">Date of birth cannnot be blank</p>
                    <!-- <p *ngIf="dateOfBirthRef.errors?.['pattern']" className="text-danger">dateOfBirth should contain at least one of each of the following -> lowercase, uppercase, digit, special character with length between 8 to 16 characters</p> -->
                </div>
                */}
                <label className="form-label" htmlFor="mobile">Mobile Number</label><br/>
                <input className="form-control" onChange={handleClientChange} type="tel" id="mobile" name="mobileNumber" value={client.mobileNumber} placeholder="Enter your mobile number" pattern="[1-9][0-9]{9}" required title="Please enter a 10-digit mobile number"/><br/>
                
                {/* <div *ngIf="mobileRef.invalid && (mobileRef.touched || mobileRef.dirty)">
                    <p *ngIf="mobileRef.errors?.['required']" className="text-danger">Mobile number cannnot be blank</p>
                    <p *ngIf="mobileRef.errors?.['pattern']" className="text-danger">Enter a 10 digit mobile number</p>
                </div> */}

                <button className="btn btn-primary" type="submit" disabled={false}> Update Details</button>
            </form>
            }

        
        {userType==="doctor" && <form className="form-control p-5" name="doctor" onSubmit={updateDoctor}>
        
        <label className="form-label" htmlFor="name2">Name</label><br/>
        <input className="form-control" onChange={handleDoctorChange} type="text" id="name2" name="name" value={doctor.name} placeholder="Enter your Name"  required pattern="^[a-zA-Z ]{3,20}$" title="Name cannot be blank, and should only contain letters and between 3-20 characters in length"/><br/>

         {/* <div *ngIf="nameRef.invalid && (nameRef.touched || nameRef.dirty)">
            <p *ngIf="nameRef.errors?.['required']" className="text-danger">Name cannnot be blank</p>
            <p *ngIf="nameRef.errors?.['pattern']" className="text-danger">Name can only contain letters, length should be between 3-20 characters</p>
        </div> */}
        
        <label className="form-label" htmlFor="email2">Email</label><br/>
        <input className="form-control" type="email" id="email2" name="email" value={doctor.email} placeholder="username@domain.com"  pattern="^[a-zA-Z0-9._+]{1,20}@(gmail\.com|yahoo\.com|ford\.com|outlook\.com)$"  required title="Email cannot be blank, and please enter a valid email: username@example.com" disabled/><br/>
{/* 
        <div *ngIf="emailRef.invalid && (emailRef.touched || emailRef.dirty)">
            <p *ngIf="emailRef.errors?.['required']" className="text-danger">Email cannnot be blank</p>
            <p *ngIf="emailRef.errors?.['pattern']" className="text-danger">Enter a valid email</p>
        </div> */}
        
        <label className="form-label" htmlFor="password2">Password</label><br/>
        <input className="form-control" onChange={handleDoctorChange} type="password" id="password2" name="password" value={doctor.password} placeholder="Enter your password" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w]).{8,16}$"  required title="Password cannot be blank, and should contain atleast 1 Lowercase, 1 Uppercase, 1 Special Character, 1 Number. Password also should be between 8-16 characters in length"/><br/>
        
        {/* <div *ngIf="passwordRef.invalid && (passwordRef.touched || passwordRef.dirty)">
            <p *ngIf="passwordRef.errors?.['required']" className="text-danger">Password cannnot be blank</p>
            <p *ngIf="passwordRef.errors?.['pattern']" className="text-danger">Password should contain at least one of each of the following -> lowercase, uppercase, digit, special character with length between 8 to 16 characters</p>
        </div> */}
        
        <label className="form-label" htmlFor="specialization2">Specialization</label><br/>
        <input className="form-control" onChange={handleDoctorChange} type="text" id="specialization2" name="specialization" value={doctor.specialization} placeholder="Enter your Valid specialization" required pattern="^[a-zA-Z]{3,20}$" title="Please enter a Valid Specialisation, between 3-20 characters in length"/><br/>
        
        {/* // <div *ngIf="specializationRef.invalid && (specializationRef.touched || specializationRef.dirty)">
        //     <p *ngIf="specializationRef.errors?.['required']" className="text-danger">Specialization cannnot be blank</p>
        //     <p *ngIf="specializationRef.errors?.['pattern']" className="text-danger">Specialization can only contain letters with size 3-20 characters</p>
        // </div> */}
        
        <label className="form-label" htmlFor="experience2">Experience(in Years)</label><br/>
        <input className="form-control" onChange={handleDoctorChange} type="number" id="experience2" name="experience" value={doctor.experience} placeholder="Enter your experience in years" required min={0} max={80} title="Please enter Valid number of Years as Experience(less than 100 years), and not a blank field" /><br/>
        
        {/* // <div *ngIf="experienceRef.invalid && (experienceRef.touched || experienceRef.dirty)">
        //     <p *ngIf="experienceRef.errors?.['required']" className="text-danger">Experience cannnot be blank</p>
        //     <p *ngIf="experienceRef.errors?.['pattern']" className="text-danger">Enter a valid number of years as experience</p>
        // </div> */}

        <label className="form-label" htmlFor="mobile2">Mobile Number</label><br/>
        <input className="form-control" onChange={handleDoctorChange} type="tel" id="mobile2" name="mobileNumber" value={doctor.mobileNumber} placeholder="Enter your mobile number" pattern="[1-9][0-9]{9}" required title="Please enter a 10-digit mobile number"/><br/>
        
        {/* <div *ngIf="mobileRef.invalid && (mobileRef.touched || mobileRef.dirty)">
            <p *ngIf="mobileRef.errors?.['required']" className="text-danger">Mobile number cannnot be blank</p>
            <p *ngIf="mobileRef.errors?.['pattern']" className="text-danger">Enter a 10 digit mobile number</p>
        </div> */}

        <label className="form-label" htmlFor="consultancyFee2">Consultancy Fee(in INR)</label><br/>
        <input className="form-control" type="number" onChange={handleDoctorChange} id="consultancyFee2" name="consultancyFee" value={doctor.consultancyFee} placeholder="Enter your consultancy fee" min={0} max={10000} title="Consultancy fees should be lesser than Rs. 10000" required /><br/>

        {/* // <div *ngIf="consultancyFeeRef.invalid && (consultancyFeeRef.touched || consultancyFeeRef.dirty)">
        //     <p *ngIf="consultancyFeeRef.errors?.['required']" className="text-danger">Consultancy Fee cannnot be blank</p>
        //     <p *ngIf="consultancyFeeRef.errors?.['pattern']" className="text-danger">Enter a valid amount as consultancy Fee</p>
        // </div> */}

        <input className="btn btn-primary" type="submit" value="Update Details"/>
    </form>
    }




            </div>
        </div>  
    )
}

export default Update