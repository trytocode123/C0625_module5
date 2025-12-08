import axios from "axios";

const URL = import.meta.env.VITE_URL;

export async function getFreeServiceList() {
    try {
        const res = await axios.get(`${URL}/attachedServices`);
        return res.data;
    } catch (error) {
        console.error(error);
    }
    return [];
}