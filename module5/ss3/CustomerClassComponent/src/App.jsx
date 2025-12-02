import { useState } from 'react'
import './App.css'
import CustomerList from "./component/CustomerList.jsx";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CustomerList/>
    </>
  )
}

export default App
