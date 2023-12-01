import { axiosInstance } from "./axiosInstance";

export const GetReports = async () => {
  try {
    const response = await axiosInstance.get(baseUrl + "/api/reports/get-reports");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
