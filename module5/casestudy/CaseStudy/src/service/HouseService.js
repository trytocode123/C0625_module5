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

export async function findHouseById(id) {
    try {
        const res = await axios.get(`${URL}/houses/${id}`);
        return res.data;
    } catch (error) {
        console.error(error);
    }
    return null;

}

export async function editHouse(house) {
    try {
        const res = await axios.patch(`${URL}/houses/${house.id}`, house);
        return res.status === 200;
    } catch (error) {
        console.error(error);
    }
    return false;
}

export async function deleteHouse(id) {
    try {
        const res = await axios.delete(`${URL}/houses/${id}`)
        return res.status === 200;
    } catch (error) {
        console.error(error);
    }
    return false;
}

export async function addHouse(house) {
    try {
        const res = await axios.post(`${URL}/houses`, house);
        return res.status === 201;
    } catch (error) {
        console.error(error);
    }
    return false;

}