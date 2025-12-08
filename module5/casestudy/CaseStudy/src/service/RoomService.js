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

export async function findRoomById(id) {
    try {
        const res = await axios.get(`${URL}/rooms/${id}`);
        return res.data;
    } catch (error) {
        console.error(error);
    }
    return null;

}

export async function editRoom(room) {
    try {
        const res = await axios.patch(`${URL}/rooms/${room.id}`, room);
        return res.status === 200;
    } catch (error) {
        console.error(error);
    }
    return false;
}

export async function deleteRoom(id) {
    try {
        const res = await axios.delete(`${URL}/rooms/${id}`)
        return res.status === 200;
    } catch (error) {
        console.error(error);
    }
    return false;
}

export async function addRoom(room) {
    try {
        const res = await axios.post(`${URL}/rooms`, room);
        return res.status === 201;
    } catch (error) {
        console.error(error);
    }
    return false;

}

