import {courses} from "./data.js";

courses.filter((e) => (e.rating < 4)).forEach(e => {
    console.log(e.id + " - " + e.title + " - " + e.rating);
});

