import { axiosInstance } from "./Axios-http-client";
class FetchAccountDetailsService {


    fetchDoctorDetails(doctorId) {
        return axiosInstance.get(`doctor/${doctorId}`)
    }

    fetchClientDetails(clientId) { 
        return axiosInstance.get(`client/${clientId}`)
    }

    
    // loginUser(userCredentials,userType) {
    //     return axiosInstance.post(`http://localhost:8090/login/${userType}`, userCredentials);
    // }

}
const fetchAccountDetailsService = new FetchAccountDetailsService();
export default fetchAccountDetailsService;