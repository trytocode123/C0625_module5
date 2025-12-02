import {Component} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js'
import {getAll} from "../service/WorkList.js";


class AddWork extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            item: ""
        };
    }

    componentDidMount() {
        this.setState({
            list: [...getAll()]
        })
    }

    handleChange = (event) => {
        this.setState({item: event.target.value});
    };

    handleAddItem = () => {
        const {item, list} = this.state;
        if (item.trim() !== "") {
            this.setState({
                list: [...list, item],
                item: ""
            });
        }
    };

    render() {
        return (
            <div>
                <h1>Todo List</h1>
                <div className={'d-flex'}>
                <input
                    type="text"
                    value={this.state.item}
                    onChange={this.handleChange}
                    className={'w-100'}
                />
                <button onClick={this.handleAddItem}>Add</button>
                </div>
                <ul className={'list-group'}>
                    {this.state.list.map((todo, index) => (
                        <li className={'list-group-item'} key={index}>{todo}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default AddWork;