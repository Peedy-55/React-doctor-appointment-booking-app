import { axiosInstance } from "./Axios-http-client";
class ViewAllClientsService {

    getAllClients() {
            return axiosInstance.get(`http://localhost:8090/clients`);
    }

}
const viewAllClientsService = new ViewAllClientsService();
export default viewAllClientsService;