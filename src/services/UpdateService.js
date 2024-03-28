import { axiosInstance } from "./Axios-http-client";
class UpdateService {

    updateClient(client, userType) {
        console.log("Patient updated");
        return axiosInstance.put(`http://localhost:8090/update-account/${userType}`, client);
    }

    updateDoctor(doctor, userType) {
        console.log("Doctor updated");
        return axiosInstance.put(`http://localhost:8090/update-account/${userType}`, doctor);
    }

    // registerClient(clientDetails:any):Observable<any>{
    //     return this.httpClient.post(`http://localhost:8090/sign-up/client`, clientDetails)
    //   }

    // deleteProductById(id){
    //     return axiosInstance.delete("http://localhost:8090/product/"+id);
    // }
}
const updateService = new UpdateService();
export default updateService;