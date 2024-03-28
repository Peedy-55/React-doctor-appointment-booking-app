import { axiosInstance } from "./Axios-http-client";
class LoginService {

    loginUser(userCredentials,userType) {
        return axiosInstance.post(`http://localhost:8090/login/${userType}`, userCredentials);
    }

}
const loginService = new LoginService();
export default loginService;