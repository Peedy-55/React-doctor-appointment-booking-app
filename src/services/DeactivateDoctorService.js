import { axiosInstance } from "./Axios-http-client";
class DeactivateDoctorsService {

    deactivateDoctor(id) {
            return axiosInstance.delete(`http://localhost:8090/deactivate/doctor/doctor-id=${id}`);
            // return this.httpClient.delete(`http://localhost:8090/deactivate/doctor/doctor-id=${id}`)
    }

}
const deactivateDoctorsService = new DeactivateDoctorsService();
export default deactivateDoctorsService;