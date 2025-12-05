import axios from "axios";

const URL = "http://localhost:3001";

export async function getAll() {
    try {
        const res = await axios.get(`${URL}/players`);
        return res.data;
    } catch (e) {
        console.log(e.message)
    }
    return [];
}

export async function deletePlayer(id) {
    try {
        const res = await axios.delete(`${URL}/players/${id}`)
        return res.status === 200;
    } catch (e) {
        console.log(e.message)
    }
    return false;
}

export async function findById(id) {
    try {
        const res = await axios.get(`${URL}/players/${id}`);
        return res.data;
    } catch (e) {
        console.log(e.message);
    }
    return null;
}

export async function edit(playerEdit) {
    try {
        const res = await axios.patch(`${URL}/players/${playerEdit.id}`, playerEdit);
        return res.status === 200;
    } catch (e) {
        console.log(e.message);
    }
    return false;
}


export async function searchByName(name) {
    try {
        const res = await axios.get(`${URL}/players`);
        return res.data.filter(player => player.ten.trim().toLowerCase().includes(name.trim().toLowerCase()));
    } catch (e) {
        console.log(e.message)
    }
    return [];
}

export async function add(newPlayer) {
    try {
        const res = await axios.post(`${URL}/players`, newPlayer)
        return res.status === 201;
    } catch (e) {
        console.log(e.message)
    }
    return false;
}