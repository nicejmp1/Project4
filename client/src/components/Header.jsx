import React from 'react'
import { FiMenu } from "react-icons/fi";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaRankingStar } from "react-icons/fa6";
import { MdNewspaper } from "react-icons/md";
import { IoSearch } from "react-icons/io5";

import Search from './Search';
import { Link, useLocation } from 'react-router-dom';
import { headerMenu } from '../data';

const Header = ({ menuOpen, setMenuOpen }) => {
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const location = useLocation();

    return (
        <header id='header' role='banner'>
            <div className='header__inner'>
                <span onClick={toggleMenu}><FiMenu /></span>
                <h1 className='logo'>
                    <Link to={'/'}>비즈니스 스쿨</Link>
                </h1>
            </div>
            <Search />
            <div className="header__user">
                <Link to={'/'}><span>스튜디오 예약</span></Link>
                <Link to={'/'}><span>공지사항</span></Link>
                <button><IoSearch /></button>
                <div className='profile'>
                    <FaRegCircleUser />
                </div>
            </div>
            <nav className={`menu ${menuOpen ? 'open' : ''}`}>
                <ul>
                    <li className={location.pathname === '/star' ? 'active' : ''}>
                        <Link to={'/'}><FaRankingStar /><span>내가 찜한 학원</span></Link>
                    </li>
                    <ul className='menu__main'>
                        {headerMenu.map((menu, key) => (
                            <li key={key}>
                                <Link className={location.pathname === menu.src ? 'active' : ''} to={menu.src}>{menu.icon}<span>{menu.title}</span></Link>
                            </li>
                        ))}

                    </ul>
                    <li>
                        <Link to={'/'}><MdNewspaper /><span>취업 정보</span></Link>
                    </li>
                </ul>
            </nav>
        </header >
    )
}

export default Header
