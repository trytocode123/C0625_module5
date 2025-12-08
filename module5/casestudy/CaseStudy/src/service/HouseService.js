import axios from "axios";

const URL = import.meta.env.VITE_URL;

export async function getHouseList() {
    try {
        const res = await axios.get(`${URL}/houses`);
        return res.data;
    } catch (error) {
        console.error(error);
    }
    return [];

}

export async function searchHouseByName(param) {
    try {
        if (param) {
            const res = await axios.get(`${URL}/houses`, {
                params: param
            });
            return res.data;
        }
    } catch (error) {
        console.error(error.message);
    }
    return [];
}