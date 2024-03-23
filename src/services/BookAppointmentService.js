import { axiosInstance } from "./Axios-http-client";
class BookApoointmentService {

    bookAppointment(appointment) {
        return axiosInstance.post(`http://localhost:8090/client/new-appointment`, appointment);

        // return this.httpClient.post(`http://localhost:8090/client/new-appointment`, appointment)
    }

}
const bookAppointmentService = new BookApoointmentService();
export default bookAppointmentService;