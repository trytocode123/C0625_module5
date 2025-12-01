import './App.css'
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import {getInfo} from "./service/CustomerList.js";

function App() {

    return (
        <>
            <table className="table table-dark">
                <thead>
                <tr>
                    <th>
                        ID
                    </th>
                    <th>
                        Mã khách hàng
                    </th>
                    <th>
                        Tên khách hàng
                    </th>
                    <th>
                        Địa chỉ
                    </th>
                    <th>
                        Loại khách hàng
                    </th>
                </tr>
                </thead>

                <tbody>
                {getInfo().map((custom, i) => (<tr key={custom.id}>
                    <td>
                        {custom.id}
                    </td>

                    <td>
                        {custom.code}
                    </td>
                    <td>
                        {custom.name}
                    </td>
                    <td>
                        {custom.address}
                    </td>
                    <td>
                        {custom.type}
                    </td>
                </tr>))}
                </tbody>

            </table>
        </>
    )
}

export default App
