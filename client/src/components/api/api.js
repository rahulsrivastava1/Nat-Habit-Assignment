import axios from "axios";

export const getLocations = () => {
  return axios.get(`${import.meta.env.VITE_BACKEND_URL}/location/get`);
};

export const getLocationData = async (selectedLocation) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/location/getlocationdata`,
      {
        location: selectedLocation,
      }
    );
    return response.data.forecast;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
