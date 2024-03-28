import { axiosInstance } from "./Axios-http-client";
class RegistrationService {

    registerClient(client) {
        console.log("Client registered");
        return axiosInstance.post('http://localhost:8090/sign-up/client', client);
    }

    registerDoctor(doctor) {
        console.log("Doctor registered");
        return axiosInstance.post('http://localhost:8090/sign-up/doctor', doctor);
    }

    // registerClient(clientDetails:any):Observable<any>{
    //     return this.httpClient.post(`http://localhost:8090/sign-up/client`, clientDetails)
    //   }

    // deleteProductById(id){
    //     return axiosInstance.delete("http://localhost:8090/product/"+id);
    // }
}
const registrationService = new RegistrationService();
export default registrationService;