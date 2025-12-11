import axios from "axios";

const URL = "http://localhost:3000";

export async function getProductList() {
    try {
        const res = await axios.get(`${URL}/products`);
        return res.data
    } catch (e) {
        console.error(e);
    }
    return [];
}

export async function deleteProduct(id) {
    try {
        const res = await axios.delete(`${URL}/products/${id}`);
        return res.status === 200;
    } catch (e) {
        console.error(e);
    }
    return false;
}

export async function editProduct(product) {
    try {
        const res = await axios.patch(`${URL}/products/${pig.id}`, product);
        return res.status === 200;
    } catch (e) {
        console.error(e);
    }
    return false;
}

export async function searchProductByName(param) {
    try {
        const res = await axios.get(`${URL}/products`, {
            params: param
        });
        return res.data;
    } catch (e) {
        console.error(e);
    }
    return [];
}

export async function addProduct(product) {
    try {
        const res = await axios.post(`${URL}/products`, product);
        return res.status === 201;
    } catch (e) {
        console.error(e);
    }
    return false;
}

export async function findProductById(id) {
    try {
        const res = await axios.get(`${URL}/products/${id}`);
        return res.data;
    } catch (e) {
        console.error(e);
    }
    return null;
}