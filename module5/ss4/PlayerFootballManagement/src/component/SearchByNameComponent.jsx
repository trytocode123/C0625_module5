import {useRef} from "react";
import {searchByName} from "../service/PlayerList.js";

const SearchByNameComponent = ({searchPlayerList}) => {
    const inputRef = useRef(null);

    const handleSearchByName = () => {
        const keyword = inputRef.current.value.trim();
        const result = searchByName(keyword);
        searchPlayerList(result);
    };

    return (
        <div className="input-group input-group-sm">
            <input
                ref={inputRef}
                type="text"
                placeholder="Tìm kiếm theo tên..."
                className="form-control"
            />
            <button
                onClick={handleSearchByName}
                className="btn btn-primary"
            >
                Tìm
            </button>
        </div>
    );
};

export default SearchByNameComponent;
