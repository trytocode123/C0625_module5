let players = [
    {
        id: 1,
        maCauThu: "PL001",
        ten: "Kevin De Bruyne",
        ngaySinh: "1991-06-28",
        gia: 120000000
    },
    {
        id: 2,
        maCauThu: "PL002",
        ten: "Erling Haaland",
        ngaySinh: "2000-07-21",
        gia: 180000000
    },
    {
        id: 3,
        maCauThu: "PL003",
        ten: "Lionel Messi",
        ngaySinh: "1987-06-24",
        gia: 35000000
    },
    {
        id: 4,
        maCauThu: "PL004",
        ten: "Cristiano Ronaldo",
        ngaySinh: "1985-02-05",
        gia: 15000000
    },
    {
        id: 5,
        maCauThu: "PL005",
        ten: "Kylian Mbappé",
        ngaySinh: "1998-12-20",
        gia: 190000000
    }
];

export function getAll() {
    return [...players];
}

export function add(player) {
    players = [...players, player];
}

export function deletePlayer(id) {
    for (let i = 0; i < players.length; i++) {
        if (players[i].id === id) {
            players.splice(i, 1);
            break;
        }
    }
}

export function findById(id) {
    // if (id == null) return null;
    // const idToFind = Number(id);
    // if (Number.isNaN(idToFind)) return null;

    // const found = players.find(p => p.id === idToFind);
    const found = players.find(p => p.id == id);
    return found ?? null;
}

export function edit(playerEdit) {
    for (let i = 0; i < players.length; i++) {
        if (players[i].id === playerEdit?.id) {
            players.splice(i, 1, playerEdit);
            break;
        }
    }
}

export function searchByName(name) {
    return players.filter((player) => player.ten.toLowerCase().includes(name.toLowerCase()));
}