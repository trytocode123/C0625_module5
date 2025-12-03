import {useState} from 'react'

import './App.css'
import InputComponent from "./component/InputComponent.jsx";

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <InputComponent/>
        </>
    )
}

export default App
