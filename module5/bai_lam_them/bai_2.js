const person = {
    firstName: "John",
    lastName: 'Doe',
    age: '30',
    gender: 'male',
    occupation: 'development',
    nationality: 'American',
    city: 'New York',
    hobbies: ['reading', 'traveling', 'photography'],
    languages: ['English', 'Spanish'],
    education: {
        degree: 'Bachelor',
        major: 'Computer Science',
        university: 'Harvard University',
    }
};

const {firstName, gender, education, languages, ...restPerson} = person;
const student = {
    firstName: firstName,
    gender: gender,
    degree: education.degree,
    english: languages[0]
}
console.log(student);

