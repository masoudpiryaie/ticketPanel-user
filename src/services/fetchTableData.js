// import axios from "axios";
import fetchApi from "./FetchApi";

export const fetchTableData = async (tabName, page, pageSize) => {
  try {
    const response = fetchApi.get("Nv-adminTicets/v1/tikets", {});

    // Assuming response data structure looks like this
    // You may need to adjust based on the actual API response
    return response.data;
  } catch (error) {
    console.error("Error fetching table data:", error);
    throw error;
  }
};
