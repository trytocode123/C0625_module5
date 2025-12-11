import axios from "axios";

const URL = "http://localhost:3000";

export async function getPigList() {
    try {
        const res = await axios.get(`${URL}/pigs`);
        return res.data
    } catch (e) {
        console.error(e);
    }
    return [];
}

export async function deletePig(id) {
    try {
        const res = await axios.delete(`${URL}/pigs/${id}`);
        return res.status === 200;
    } catch (e) {
        console.error(e);
    }
    return false;
}

export async function editPig(pig) {
    try {
        const res = await axios.patch(`${URL}/pigs/${pig.id}`, pig);
        return res.status === 200;
    } catch (e) {
        console.error(e);
    }
    return false;
}

export async function searchPigByName(param) {
    try {
        const res = await axios.get(`${URL}/pigs`, {
            params: param
        });
        return res.data;
    } catch (e) {
        console.error(e);
    }
    return [];
}

export async function addPig(pig) {
    try {
        const res = await axios.post(`${URL}/pigs`, pig);
        return res.status === 201;
    } catch (e) {
        console.error(e);
    }
    return false;
}

export async function findPigById(id) {
    try {
        const res = await axios.get(`${URL}/pigs/${id}`);
        return res.data;
    } catch (e) {
        console.error(e);
    }
    return null;
}