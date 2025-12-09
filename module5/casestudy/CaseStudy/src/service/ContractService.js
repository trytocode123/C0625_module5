import axios from "axios";

const URL = import.meta.env.VITE_URL;

export async function getContractList() {
    try {
        const res = await axios.get(`${URL}/contracts`);
        return res.data;
    } catch (error) {
        console.error(error.message);
    }
    return [];
}

export async function findContractById(id) {
    try {
        const res = await axios.get(`${URL}/contracts/${id}`);
        return res.data;
    } catch (error) {
        console.error(error.message);
    }
    return null;
}

export async function editContract(contract) {
    try {
        const res = await axios.patch(`${URL}/contracts/${contract.id}`, contract);
        return res.status === 200;
    } catch (error) {
        console.error(error);
    }
    return false;
}

export async function deleteContract(id) {
    try {
        const res = await axios.delete(`${URL}/contracts/${id}`);
        return res.status === 200;
    } catch (error) {
        console.error(error);
    }

    return false;
}

export async function searchContractByName(param) {
    try {
        if (param) {
            const res = await axios.get(`${URL}/contracts`, {
                params: param
            });
            return res.data;
        }

    } catch (error) {
        console.error(error);
    }

    return [];
}

export async function addContract(contract) {
    try {
        const res = await axios.post(`${URL}/contracts`, contract);
        return res.status === 201;
    } catch (error) {
        console.error(error);
    }
    return false;
}