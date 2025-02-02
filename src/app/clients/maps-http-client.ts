import axios from "axios";

export const mapsHttpClient = axios.create({
	baseURL: "https://maps.googleapis.com/maps/api/",
});
