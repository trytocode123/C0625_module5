import axios from "axios";

const URL = import.meta.env.VITE_URL;

export async function getCustomerTypeList() {
    try {

        const res = await axios.get(`${URL}/customerTypes`);
        return res.data;
    } catch (error) {
        console.error(error);
    }
    return [];

}