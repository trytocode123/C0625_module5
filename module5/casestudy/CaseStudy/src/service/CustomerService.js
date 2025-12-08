import axios from "axios";

const URL = import.meta.env.VITE_URL;

export async function getCustomerList() {
    try {
        const res = await axios.get(`${URL}/customers`);
        return res.data;
    } catch (error) {
        console.error(error.message);
    }
    return [];
}

export async function searchCustomerByName(param) {
    try {
        if (param) {
            const res = await axios.get(`${URL}/customers`, {
                params: param
            });
            return res.data;
        }
    } catch (error) {
        console.error(error.message);
    }
    return [];
}

export async function findCustomerById(id) {
    try {
        const res = await axios.get(`${URL}/customers/${id}`);
        return res.data
    } catch (error) {
        console.error(error);
    }
    return null;
}

export async function editCustomer(customerEdit) {
    try {
        const res = await axios.patch(`${URL}/customers/${customerEdit.id}`, customerEdit);
        return res.status === 200;
    } catch (error) {
        console.error(error);

    }
    return false;
}

export async function deleteCustomer(id) {
    try {
        const res = await axios.delete(`${URL}/customers/${id}`);
        return res.status === 200;
    } catch (error) {
        console.error(error);
    }
    return false;
}

export async function addCustomer(customer) {
    try {
        const res = await axios.post(`${URL}/customers`, customer);
        return res.status === 201;
    } catch (error) {
        console.error(error);
    }
    return false;
}

