const customerList = [
    {
        "id": 1,
        "name": "Nguyễn Văn A",
        "email": "nguyenvana@example.com",
        "phone": "0987123456",
        "address": "123 Lê Lợi, Q1, TP. Hồ Chí Minh"
    },
    {
        "id": 2,
        "name": "Trần Thị B",
        "email": "tranthib@example.com",
        "phone": "0973456789",
        "address": "45 Nguyễn Trãi, Hà Nội"
    },
    {
        "id": 3,
        "name": "Lê Hoàng C",
        "email": "lehoangc@example.com",
        "phone": "0909988776",
        "address": "88 Hai Bà Trưng, Đà Nẵng"
    },
    {
        "id": 4,
        "name": "Phạm Minh D",
        "email": "phamminhd@example.com",
        "phone": "0912345678",
        "address": "12 Nguyễn Huệ, Cần Thơ"
    },
    {
        "id": 5,
        "name": "Đỗ Thị E",
        "email": "dothie@example.com",
        "phone": "0938877665",
        "address": "67 Lý Thường Kiệt, TP. Hội An"
    }
]

export function getInfo() {
    return [...customerList];
}

export function deleteCustomer(id) {
    for (let i = 0; i < customerList.length; i++) {
        if (customerList[i].id === id) {
            customerList.splice(i, 1);
            break;
        }
    }

}