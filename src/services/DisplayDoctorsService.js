import { axiosInstance } from "./Axios-http-client";
class DisplayDoctorsService {

    getDoctors() {
            return axiosInstance.get(`http://localhost:8090/client/available-doctors`);
            // return this.httpClient.get(`http://localhost:8090/client/available-doctors`)
    }

}
const displayDoctorsService = new DisplayDoctorsService();
export default displayDoctorsService;