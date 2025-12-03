import {useRef, useState} from "react";
import {searchByName} from "../service/PlayerList.js";

const SearchByNameComponent = ({searchPlayerList}) => {
    const handleSearchByName = () => {
        const playerSearchListResult = searchByName(inputRef.current.value);
        console.log(playerSearchListResult);
        searchPlayerList(playerSearchListResult);
    }
    const inputRef = useRef(null);
    return (<div className={'d-flex'}>
        <input ref={inputRef} className={'w-100'}/>
        <button onClick={handleSearchByName}>Tìm kiếm</button>
    </div>)
}

export default SearchByNameComponent;