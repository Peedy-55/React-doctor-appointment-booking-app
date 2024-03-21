import React, { useState, useEffect } from 'react'; 
import loginService from '../../services/LoginService';



function View (){
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
          }).catch(err => {
            console.error(err);
          });
        }
      }, [])

    return (
        <div className="container p-5 w-75">
            {userType === 'client' ? (<h3 className="heading m-2">Details of Patient: {client.name}</h3>) : (<h3 className="heading m-2">Details of {userType[0].toUpperCase()+userType.slice(1)}: {doctor.name}</h3>)}
            <div className="card p-5">

           {userType === "client" && <form className="form-control p-5 text-left" name="client">
                
                <label className="form-label " htmlFor="name">Name</label><br/>
                <input className="form-control" type="text" id="name" name="name" value={client.name} disabled pattern="^[a-zA-Z ]{3,20}$" /><br/>

                {/* <div *ngIf="nameRef.invalid && (nameRef.touched || nameRef.dirty)">
                    <p *ngIf="nameRef.errors?.['required']" className="text-danger">Name cannnot be blank</p>
                    <p *ngIf="nameRef.errors?.['pattern']" className="text-danger">Name can only contain letters, length should be between 3-20 characters</p>
                </div> */}

                <label className="form-label" htmlFor="email">Email</label><br/>
                <input className="form-control" type="email" id="email" name="email" value={client.email} pattern="^[a-zA-Z0-9._+]{1,20}@(gmail\.com|yahoo\.com|ford\.com|outlook\.com)$" disabled /><br/>

                {/* <div *ngIf="emailRef.invalid && (emailRef.touched || emailRef.dirty)">
                    <p *ngIf="emailRef.errors?.['required']" className="text-danger">Email cannnot be blank</p>
                    <p *ngIf="emailRef.errors?.['pattern']" className="text-danger">Enter a valid email</p>
                </div> */}

                <label className="form-label" htmlFor="password">Password</label><br/>
                <input className="form-control" type="password" id="password" name="password" value={client.password} pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w]).{8,16}$"  disabled /><br/>
                
                {/* <div *ngIf="passwordRef.invalid && (passwordRef.touched || passwordRef.dirty)">
                    <p *ngIf="passwordRef.errors?.['required']" className="text-danger">Password cannnot be blank</p>
                    <p  className="text-danger"></p>
                </div> */}
                
                <label className="form-label" htmlFor="dateOfBirth">Date of Birth</label><br/>
                <input className="form-control" type="date" id="dateOfBirth" name="dateOfBirth" value={client.dateOfBirth} disabled /><br/>
                
                {/* <div *ngIf="dateOfBirthRef.invalid && (dateOfBirthRef.touched || dateOfBirthRef.dirty)">
                    <p *ngIf="dateOfBirthRef.errors?.['required']" className="text-danger">Date of birth cannnot be blank</p>
                    <!-- <p *ngIf="dateOfBirthRef.errors?.['pattern']" className="text-danger">dateOfBirth should contain at least one of each of the following -> lowercase, uppercase, digit, special character with length between 8 to 16 characters</p> -->
                </div>
                */}
                <label className="form-label" htmlFor="mobile">Mobile Number</label><br/>
                <input className="form-control" type="tel" id="mobile" name="mobileNumber" value={client.mobileNumber} pattern="[1-9][0-9]{9}" disabled /><br/>
                
                {/* <div *ngIf="mobileRef.invalid && (mobileRef.touched || mobileRef.dirty)">
                    <p *ngIf="mobileRef.errors?.['required']" className="text-danger">Mobile number cannnot be blank</p>
                    <p *ngIf="mobileRef.errors?.['pattern']" className="text-danger">Enter a 10 digit mobile number</p>
                </div> */}
            </form>
            }

        
        {userType==="doctor" && <form className="form-control p-5" name="doctor">
        
        <label className="form-label" htmlFor="name2">Name</label>
        <input className="form-control" type="text" id="name2" name="name" value={doctor.name} disabled pattern="^[a-zA-Z ]{3,20}$" /><br/>

         {/* <div *ngIf="nameRef.invalid && (nameRef.touched || nameRef.dirty)">
            <p *ngIf="nameRef.errors?.['required']" className="text-danger">Name cannnot be blank</p>
            <p *ngIf="nameRef.errors?.['pattern']" className="text-danger">Name can only contain letters, length should be between 3-20 characters</p>
        </div> */}
        
        <label className="form-label" htmlFor="email2">Email</label><br/>
        <input className="form-control" type="email" id="email2" name="email" value={doctor.email} pattern="^[a-zA-Z0-9._+]{1,20}@(gmail\.com|yahoo\.com|ford\.com|outlook\.com)$"  disabled /><br/>
{/* 
        <div *ngIf="emailRef.invalid && (emailRef.touched || emailRef.dirty)">
            <p *ngIf="emailRef.errors?.['required']" className="text-danger">Email cannnot be blank</p>
            <p *ngIf="emailRef.errors?.['pattern']" className="text-danger">Enter a valid email</p>
        </div> */}
        
        <label className="form-label" htmlFor="password2">Password</label><br/>
        <input className="form-control" type="password" id="password2" name="password" value={doctor.password} pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w]).{8,16}$"  disabled /><br/>
        
        {/* <div *ngIf="passwordRef.invalid && (passwordRef.touched || passwordRef.dirty)">
            <p *ngIf="passwordRef.errors?.['required']" className="text-danger">Password cannnot be blank</p>
            <p *ngIf="passwordRef.errors?.['pattern']" className="text-danger">Password should contain at least one of each of the following -> lowercase, uppercase, digit, special character with length between 8 to 16 characters</p>
        </div> */}
        
        <label className="form-label" htmlFor="specialization2">Specialization</label><br/>
        <input className="form-control" type="text" id="specialization2" name="specialization" value={doctor.specialization} disabled pattern="^[a-zA-Z]{3,20}$" /><br/>
        
        {/* // <div *ngIf="specializationRef.invalid && (specializationRef.touched || specializationRef.dirty)">
        //     <p *ngIf="specializationRef.errors?.['required']" className="text-danger">Specialization cannnot be blank</p>
        //     <p *ngIf="specializationRef.errors?.['pattern']" className="text-danger">Specialization can only contain letters with size 3-20 characters</p>
        // </div> */}
        
        <label className="form-label" htmlFor="experience2">Experience(in Years)</label><br/>
        <input className="form-control" type="number" id="experience2" name="experience" value={doctor.experience} disabled min={0} max={80} /><br/>
        
        {/* // <div *ngIf="experienceRef.invalid && (experienceRef.touched || experienceRef.dirty)">
        //     <p *ngIf="experienceRef.errors?.['required']" className="text-danger">Experience cannnot be blank</p>
        //     <p *ngIf="experienceRef.errors?.['pattern']" className="text-danger">Enter a valid number of years as experience</p>
        // </div> */}

        <label className="form-label" htmlFor="mobile2">Mobile Number</label><br/>
        <input className="form-control" type="tel" id="mobile2" name="mobileNumber" value={doctor.mobileNumber} pattern="[1-9][0-9]{9}" disabled /><br/>
        
        {/* <div *ngIf="mobileRef.invalid && (mobileRef.touched || mobileRef.dirty)">
            <p *ngIf="mobileRef.errors?.['required']" className="text-danger">Mobile number cannnot be blank</p>
            <p *ngIf="mobileRef.errors?.['pattern']" className="text-danger">Enter a 10 digit mobile number</p>
        </div> */}

        <label className="form-label" htmlFor="consultancyFee2">Consultancy Fee(in INR)</label><br/>
        <input className="form-control" type="number" id="consultancyFee2" name="consultancyFee" value={doctor.consultancyFee} min={0} max={10000} disabled /><br/>

        {/* // <div *ngIf="consultancyFeeRef.invalid && (consultancyFeeRef.touched || consultancyFeeRef.dirty)">
        //     <p *ngIf="consultancyFeeRef.errors?.['required']" className="text-danger">Consultancy Fee cannnot be blank</p>
        //     <p *ngIf="consultancyFeeRef.errors?.['pattern']" className="text-danger">Enter a valid amount as consultancy Fee</p>
        // </div> */}

    </form>
    }




            </div>
        </div>  
    )
}

export default View