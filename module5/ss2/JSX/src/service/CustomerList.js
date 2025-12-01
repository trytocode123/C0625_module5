const customerList = [
    {
        id: 1,
        code: "KH01",
        name: "Nguyen Van A",
        address: "Đà Nẵng",
        type: "Diamond",
    },
    {
        id: 2,
        code: "KH02",
        name: "Tran Thi B",
        address: "Hà Nội",
        type: "Gold",
    },
    {
        id: 3,
        code: "KH03",
        name: "Le Van C",
        address: "Hồ Chí Minh",
        type: "Silver",
    },
    {
        id: 4,
        code: "KH04",
        name: "Pham Thi D",
        address: "Cần Thơ",
        type: "Diamond",
    },
    {
        id: 5,
        code: "KH05",
        name: "Hoang Van E",
        address: "Hải Phòng",
        type: "Member",
    },
    {
        id: 6,
        code: "KH06",
        name: "Nguyen Thi F",
        address: "Nha Trang",
        type: "Gold",
    },
    {
        id: 7,
        code: "KH07",
        name: "Do Van G",
        address: "Huế",
        type: "Silver",
    },
    {
        id: 8,
        code: "KH08",
        name: "Vo Thi H",
        address: "Quảng Nam",
        type: "Member",
    }
];

export function getInfo() {
    return [...customerList];
}
