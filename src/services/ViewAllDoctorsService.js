import { axiosInstance } from "./Axios-http-client";
class ViewAllDoctorsService {

    getAllDoctors() {
            return axiosInstance.get(`http://localhost:8090/doctors`);
            // return this.httpClient.get(`http://localhost:8090/client/available-doctors`)
    }

}
const viewAllDoctorsService = new ViewAllDoctorsService();
export default viewAllDoctorsService;