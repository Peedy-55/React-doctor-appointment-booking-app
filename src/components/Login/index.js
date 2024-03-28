import React, { useState,useEffect } from 'react';
//import { useHistory } from 'react-router-dom'; 
import loginService from '../../services/LoginService';
import {useNavigate } from 'react-router-dom';


function Login() {

    const [userType, setUserType] = useState("client");
    const [userCredentials, setUserCredentials] = useState({});
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [businessLogicError, setBusinessLogicError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const navigate = useNavigate()
    
  //  const history = useHistory();
  
    const loginUser = async(e) => {
        //e.preventDefault();
        loginService.loginUser(userCredentials,userType)
        .then(data => {
          console.log(data);
          setBusinessLogicError("");
          userType === 'client' ? (setSuccessMessage(`Patient account logged in successfully!`)) : (setSuccessMessage(`${userType[0].toUpperCase()+userType.slice(1)} account logged in successfully!`))
          setData(data);
          localStorage.setItem("user", JSON.stringify({id:data.data.id,name:data.data.name,type:userType,email:data.data.email,password:data.data.password}));
          localStorage.setItem("loggedIn",true)
          
          setTimeout(() => {
            setSuccessMessage("");
            setBusinessLogicError("")
            //navigate('/homess')
          }, 3000);
  
        })
        .catch(err => {
            console.log(err)
          if (typeof(err.response.data) === "string") {
            setBusinessLogicError(err.response.data);
            setSuccessMessage("");
          }
          setTimeout(() => {
            setSuccessMessage("");
            setBusinessLogicError("")
          }, 3000);
          
          console.log(err);
        });


        // try {
        //     const data = await loginService.loginUser(userCredentials, userType);
        //     console.log(data);
        //     setBusinessLogicError("");
        //     const successMessage = userType === 'client' ? 'Patient account logged in successfully!' : `${userType[0].toUpperCase() + userType.slice(1)} account logged in successfully!`;
        //     setSuccessMessage(successMessage);
        //     setData(data);
        //     localStorage.setItem("user", JSON.stringify({ id: data.data.id, name: data.data.name, type: userType, email: data.data.email, password: data.data.password }));
        //     localStorage.setItem("loggedIn", true);
        //     setTimeout(() => {
        //     setSuccessMessage("");
        //     setBusinessLogicError("");
        //     navigate('/home'); // Adjust the route as necessary
        //     }, 3000);
        // } catch (err) {
        //     console.error(err);
        //     if (typeof(err.response?.data) === "string") {
        //     setBusinessLogicError(err.response.data);
        //     }
        //     setSuccessMessage("");
        //     setTimeout(() => {
        //     setSuccessMessage("");
        //     setBusinessLogicError("");
        //     }, 3000);
        // }
    };
  
    const handleCredentialChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUserCredentials({ ...userCredentials, [name]: value });
    }

    const onChangeUserType = (e) => {
        console.log(e.target.value);
        setUserType(e.target.value)
    }

    

    return(
            <div className="container d-flex flex-column justify-content-center p-5 w-75">
                <div className="card d-flex flex-row justify-content-center  p-3"> 
                    <form className="form-control mt-5 p-5" onSubmit={loginUser}>
                        <h3 className="heading">Who are you?</h3>
                        <select  className="form-select" name="userType" id="userType" required onChange={onChangeUserType} >
                            <option value="client">Patient</option>
                            <option value="doctor">Doctor</option>
                            <option value="admin">Admin</option>
                        </select><br/><br/>

                        {businessLogicError !=="" && (<p className="alert alert-danger">{businessLogicError}</p>)}
                        {successMessage !== "" && (<p className="alert alert-success">{successMessage}</p>)}

                        <label className="form-label" htmlFor="email">Email</label><br/>
                        <input className="form-control" onChange={handleCredentialChange} type="email" id="email" name="email" placeholder="username@domain.com" pattern="^[a-zA-Z0-9._+]{1,20}@(gmail\.com|yahoo\.com|ford\.com|outlook\.com)$" title="Email cannot be blank, and please enter a valid email: username@example.com"  required /><br/>
                
                        {/* <div *ngIf="emailRef.invalid && (emailRef.touched || emailRef.dirty)">
                            <p *ngIf="emailRef.errors?.['required']" className="text-danger">Email cannnot be blank</p>
                            <p *ngIf="emailRef.errors?.['pattern']" className="text-danger">Enter a valid email</p>
                        </div> */}

                        <label className="form-label" htmlFor="password">Password</label><br/>
                        <input className="form-control" onChange={handleCredentialChange} type="password" id="password" name="password" placeholder="Enter your password" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w]).{8,16}$" title="Password cannot be blank, and should contain atleast 1 Lowercase, 1 Uppercase, 1 Special Character, 1 Number. Password also should be between 8-16 characters in length"  required /><br/>
            {/*             
                        <div *ngIf="passwordRef.invalid && (passwordRef.touched || passwordRef.dirty)">
                            <p *ngIf="passwordRef.errors?.['required']" className="text-danger">Password cannnot be blank</p>
                            <p *ngIf="passwordRef.errors?.['pattern']" className="text-danger">Password should contain at least one of each of the following -> lowercase, uppercase, digit, special character with length between 8 to 16 characters</p>
                        </div>
                */}
                        <input className="btn btn-primary" type="submit" value="Login"/>
                    </form>
                </div>
            </div>
    )
}

export default Login