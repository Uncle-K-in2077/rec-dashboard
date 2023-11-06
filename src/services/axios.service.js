import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

class AxiosService {
  constructor() {
    this.initializeHttpClient();
    this.setupRequestInterceptor();
    this.setupResponseInterceptor();
  }

  async get({ url, params, headers }) {
    return this.sendRequest({ method: "get", url, params, headers });
  }

  async post({ url, data, headers }) {
    return this.sendRequest({ method: "post", url, data, headers });
  }

  async put({ url, data, headers }) {
    return this.sendRequest({ method: "put", url, data, headers });
  }

  async patch({ url, data, headers }) {
    return this.sendRequest({ method: "patch", url, data, headers });
  }

  async delete({ url, headers }) {
    return this.sendRequest({ method: "delete", url, headers });
  }

  initializeHttpClient() {
    const baseURL = import.meta.env.VITE_REACT_API_URL;

    this.httpClient = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
        baseUrl: baseURL,
      },
    });
  }

  setupRequestInterceptor() {
    this.httpClient.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("access_token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  setupResponseInterceptor() {
    this.httpClient.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          if (error.response.status === 401 || error.response.status === 403) {
            this.handleUnauthenticated();
          } else {
            this.handleResponseError(error);
          }
        } else {
          this.handleRequestError(error);
        }
        return Promise.reject(error);
      }
    );
  }

  async sendRequest(config) {
    const defaultHeaders = { "Content-Type": "application/json" };
    config.headers = {
      ...defaultHeaders,
      ...config.headers,
    };

    try {
      const response = await this.httpClient(config);
      return response.data;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message || "Something wrong...");
        throw new Error(error.response.data.message);
      } else {
        throw error;
      }
    }
  }

  handleResponseError(error) {
    if (error.response) {
      console.error("Response Error:", error.response.data);
      console.error("Status Code:", error.response.status);

      const errorMessage =
        error.response.data && error.response.data.message
          ? error.response.data.message
          : "An error occurred";

      toast.error(errorMessage);
      throw new Error(errorMessage);
    } else if (error.request) {
      console.error("Request Error:", error.request);
    } else {
      console.error("Error:", error.message);
    }
    throw new Error(error);
  }

  handleRequestError(error) {
    toast.error(error.message);

    if (error.response) {
      console.error("Response Error:", error.response.data);
      console.error("Status Code:", error.response.status);
    } else if (error.request) {
      console.error("Request Error:", error.request);
    } else {
      console.error("Error:", error.message);
    }
  }

  handleUnauthenticated() {
    window.location.href = "/auth/login";
  }
}

export default new AxiosService();
