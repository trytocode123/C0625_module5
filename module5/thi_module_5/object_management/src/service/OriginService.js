import axios from "axios";

const URL = "http://localhost:3000";

export async function getAllOrder() {
    try {
        const res = await axios.get(`${URL}/orders`);
        return res.data;
    } catch (e) {
        console.error(e);
    }
    return [];
}

export async function deleteOrder(id) {
    try {
        const res = await axios.delete(`${URL}/orders/${id}`);
        return res.status === 200;
    } catch (e) {
        console.error(e);
    }
    return false;
}

export async function findOrderById(id) {
    try {
        const res = await axios.get(`${URL}/orders/${id}`);
        return res.data;
    } catch (e) {
        console.error(e);
    }
    return null;
}

export async function addOrder(order) {
    try {
        const res = await axios.post(`${URL}/orders`, order);
        return res.status === 201;
    } catch (e) {
        console.error(e);
    }
    return false;
}

export async function searchOrderByName(param) {
    try {
        const res = await axios.get(`${URL}/orders`, {
            params: param
        });
        return res.data;
    } catch (e) {
        console.error(e);
    }
    return [];
}