import axios from "axios";

const URL = "http://localhost:3000";

export async function getAllOrigin() {
    try {
        const res = await axios(`${URL}/origins`);
        return res.data;
    } catch (e) {
        console.error(e);
    }
    return [];
}