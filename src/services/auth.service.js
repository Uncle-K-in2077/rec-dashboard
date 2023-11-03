import AxiosService from "./axios.service";

const AuthService = {
  login: async ({ email, password }) => {
    const result = await AxiosService.post({
      url: "/login",
      data: { email, password },
    });
    return result;
  },
  logout: async () => {
    const result = await AxiosService.post({
      url: "/logout",
    });
    return result;
  },
};

export default AuthService;
