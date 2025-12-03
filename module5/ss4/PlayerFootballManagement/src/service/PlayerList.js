let players = [
    {
        id: 1,
        code: "PL001",
        name: "Lionel Messi",
        dob: "1987-06-24",
        value: 35000000, // EUR
        position: "RW"
    },
    {
        id: 2,
        code: "PL002",
        name: "Cristiano Ronaldo",
        dob: "1985-02-05",
        value: 15000000,
        position: "ST"
    },
    {
        id: 3,
        code: "PL003",
        name: "Kylian Mbappé",
        dob: "1998-12-20",
        value: 180000000,
        position: "LW"
    },
    {
        id: 4,
        code: "PL004",
        name: "Erling Haaland",
        dob: "2000-07-21",
        value: 170000000,
        position: "ST"
    },
    {
        id: 5,
        code: "PL005",
        name: "Kevin De Bruyne",
        dob: "1991-06-28",
        value: 60000000,
        position: "CM"
    },
    {
        id: 6,
        code: "PL006",
        name: "Virgil van Dijk",
        dob: "1991-07-08",
        value: 45000000,
        position: "CB"
    },
    {
        id: 7,
        code: "PL007",
        name: "Luka Modrić",
        dob: "1985-09-09",
        value: 8000000,
        position: "CM"
    },
    {
        id: 8,
        code: "PL008",
        name: "Neymar Jr",
        dob: "1992-02-05",
        value: 90000000,
        position: "LW"
    }
];

export function getAll() {
    return [...players];
}

export function deletePlayer(id) {
    for (let i = 0; i < players.length; i++) {
        if (players[i].id === id) {
            players.splice(i, 1);
            break;
        }
    }
}

export function addPlayer(newPlayer) {
    players = [...players, newPlayer];
}

export function searchByName(name) {
    return players.filter((player) => player.name.toLowerCase().includes(name.toLowerCase()));
}
