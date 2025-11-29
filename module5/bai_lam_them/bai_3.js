const getInfo = ((object) => {
    const {firstName = "Quân", degree = "NA"} = object;
    console.log("firstName: " + firstName);
    console.log("degree: " + degree);
})

const sv1 = {
    firstName: "John",
    gender: 'male',
    degree: 'Bachelor',
    english: 'English',
}

const sv2 = {
    name: 'John',
    gender: 'male',
    degree: 'Bachelor',
    english: 'English'

}

getInfo(sv1);
getInfo(sv2);