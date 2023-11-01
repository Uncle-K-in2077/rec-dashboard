import AxiosService from "./axios.service";

const AuthService = {
  login: async ({ email, password }) => {
    const result = await AxiosService.post({
      url: "/auth/login",
      data: { email, password },
    });
    return result;
  },
};

export default AuthService;
