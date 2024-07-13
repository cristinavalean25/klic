import axios from "axios";

const GEOCODING_API_URL = "https://maps.googleapis.com/maps/api/geocode/json";
const API_KEY = "AIzaSyAwGS8zbRcH96HWmk1KypGDtv8pSSYFxZQ"; // Cheia ta API

export const getCoordinates = async (address: string): Promise<{ lat: number; lng: number } | null> => {
  try {
    const response = await axios.get(GEOCODING_API_URL, {
      params: {
        address,
        key: API_KEY,
      },
    });

    if (response.data.status === "OK") {
      const results = response.data.results;
      const { lat, lng } = results[0].geometry.location;
      return { lat, lng };
    } else {
      console.error("Geocoding API error:", response.data.status);
      return null;
    }
  } catch (error) {
    console.error("Geocoding request error:", error);
    return null;
  }
};
