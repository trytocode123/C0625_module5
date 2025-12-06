import axios from "axios";

const URL = "http://localhost:3000";

export async function getAll() {
    try {
        const res = await axios.get(`${URL}/positions`);
        return res.data;
    } catch (e) {
        console.log(e.message)
    }

    return [];
}