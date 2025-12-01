import './App.css'
import React from "react";

function App() {
    const header = React.createElement("h3", null, "Danh sách các thành phố trực thuộc trung ương")
    const li1 = React.createElement("li", null, 'HN');
    const li2 = React.createElement("li", null, 'DN');
    const li3 = React.createElement("li", null, 'HP');
    const li4 = React.createElement("li", null, 'HCM');
    const li5 = React.createElement("li", null, 'Cần Thơ');

    const ul = React.createElement("ul", {style: {listStyle: "none"}}, li1, li2, li3, li4, li5);
    return (
        <>
            {header}
            {ul}
        </>
    )
}

export default App
