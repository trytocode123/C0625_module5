import axios from "axios";

const URL = import.meta.env.VITE_URL;

export async function getRoomList() {
    try {
        const res = await axios.get(`${URL}/rooms`);
        return res.data;
    } catch (error) {
        console.error(error.message);
    }
    return [];
}

export async function searchRoomByName(param) {
    try {
        if (param) {
            const res = await axios.get(`${URL}/rooms`, {
                params: param
            });
            return res.data;
        }
    } catch (error) {
        console.error(error.message);
    }
    return [];
}