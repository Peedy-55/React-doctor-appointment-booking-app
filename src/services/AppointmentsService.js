import { axiosInstance } from "./Axios-http-client";
class AppointmentsService {

    getAppointments(userType,userId) {
        // console.log(userType==="client",userId)
        if(userType === "doctor" || userType === "client"){
        return axiosInstance.get(`http://localhost:8090/${userType}/all-appointments/${userType}ID=${userId}`);
        }else{
            return axiosInstance.get(`http://localhost:8090/appointments`);
        }
         
    // if(userType === 'client' || userType === 'doctor'){
    //     return this.httpClient.get(`http://localhost:8090/${userType}/all-appointments/${userType}ID=${id}`)
    //   }else{
    //     return this.httpClient.get(`http://localhost:8090/appointments`)
    //   }
    }

}
const appointmentsService = new AppointmentsService();
export default appointmentsService;