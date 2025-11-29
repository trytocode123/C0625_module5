const spread = ((param) => {
    if (Array.isArray(param)) {
        // merge array
        const newArr = [...param, 4];
        console.log("Spread with array: " + newArr);
        // copy array
        const copyArr = [...param];
        console.log("Copy array by spread: " + copyArr);
    } else {
        // copy array
        const newObj = {...param, class: "C062025-CGDN"};
        console.log("Spread witch array: ");
        console.log(newObj);

        // copy object
        const copyObject = {...param};
        console.log("Copy object by spread: ");
        console.log(copyObject);
    }
})

const destructuring = ((param) => {
    if (Array.isArray(param)) {
        const [a, b, ...array1] = param;
        console.log("Destructuring with array: " + a);
        console.log(array1)
    } else {
        const {name, age} = param;
        console.log("Destructuring with object: " + name)
    }
})

const restToArray = ((...param) => {
    console.log(param);
})

const restToObject = (param => {
    const {name, ...rest} = param;
    console.log(name);
    console.log(rest);
})

const restToObject1 = ({...rest}) => {
    console.log(rest);
}

// KN
// Cách dùng

// spread([1, 2, 3])
// spread({name: "Nguyen Van A", age: 22});
// destructuring([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
// destructuring({name: "Nguyen Van A", age: 22})
// restToArray(1, 2, 3);
// restToObject({name: "Nguyen Van A", age: 20, address: "Da Nang"})
// restToObject1({name: "Nguyen Van A", age: 20, address: "Da Nang"})
// (() => {
//     console.log(1 + 1);
// })();


const object1 = {
    name: "nguyen van a",
}

setTimeout(() => {
    console.log(object1.name)
}, 2000)


