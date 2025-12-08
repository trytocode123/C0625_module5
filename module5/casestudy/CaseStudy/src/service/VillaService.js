import axios from "axios";

const URL = import.meta.env.VITE_URL;

export async function getVillaList() {
    try {
        const res = await axios.get(`${URL}/villas`);
        return res.data;
    } catch (error) {
        console.error(error.message);
    }
    return [];
}

export async function searchVillaByName(param) {
    try {
        if (param) {
            const res = await axios.get(`${URL}/villas`, {
                params: param
            });
            return res.data;
        }
    } catch (error) {
        console.error(error.message);
    }
    return [];
}