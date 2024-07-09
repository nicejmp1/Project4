import React from 'react'
import { IoSearch } from "react-icons/io5";

const Search = () => {
    return (
        <>
            <div className='search__box'>
                <input
                    type="text"
                    placeholder='어떤 강의를 찾고 있나요?'
                    autoCapitalize='off'
                />
                <span><IoSearch /></span>
            </div>
            <div className="m__search__box">
                <div className="mb__search__box">
                    <span><IoSearch /></span>
                    <input
                        type="text"
                        placeholder='어떤 강의를 찾고 있나요?'
                        autoCapitalize='off'
                    />
                </div>
                <button>취소</button>
            </div>
        </>

    )
}

export default Search
