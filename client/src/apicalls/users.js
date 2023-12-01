import { axiosInstance } from "./axiosInstance";
const baseUrl = process.env.REACT_APP_BASE_URL;
// register a user
export const RegisterUser = async (payload) => {
  try {
    console.log(payload)
    const response = await axiosInstance.post(baseUrl + "/api/users/register", payload);
    console.log(response)
    return response.data;
  } catch (error) {
    throw error;
  }
};

// login a user
export const LoginUser = async (payload) => {
  try {
    console.log(payload)
    const response = await axiosInstance.post(baseUrl + "/api/users/login", payload);
    console.log(response)
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get user details

export const GetLoggedInUserDetails = async () => {
  try {
    const response = await axiosInstance.get(baseUrl + "/api/users/get-logged-in-user");
    return response.data;
  } catch (error) {
    throw error;
  }
}

// get all users
export const GetAllUsers = async (role) => {
  try {
    const response = await axiosInstance.get(baseUrl + `/api/users/get-all-users/${role}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


// get user by id

export const GetUserById = async (id) => {
  try {
    const response = await axiosInstance.get(baseUrl + `/api/users/get-user-by-id/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}