import {courses} from "./data.js";

courses.filter((e) => (e.rating < 4)).map(e => e.id + " - " + e.title + " - " + e.rating).forEach(e => {
    console.log(e)
});

