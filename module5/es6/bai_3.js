import {courses} from "./data.js";

let addedCourses = [
    {
        id: 6,
        title: "PHP Tutorial",
        rating: 3,
    },
    {
        id: 7,
        title: "C# Tutorial",
        rating: 2,
    },
    {
        id: 8,
        title: "Docker Tutorial",
        rating: 3.8,
    }
];

const mergeArray = ((arr1, arr2) => {
    let newArray;
    return newArray = [...arr1, ...arr2];
})

mergeArray(courses, addedCourses).forEach((e) => {
    console.log(e);
});