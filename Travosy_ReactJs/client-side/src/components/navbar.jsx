import React, { useState, useEffect, useRef  } from 'react';
import { Link } from "react-router-dom";

import logoLight from "../assets/images/logo-light.png"

import {FiSearch, FiUser, FiHelpCircle, FiSettings, FiLogOut} from '../assets/icons/vander'

export default function Navbar({navclass, navlight, manuclass}){
    let [scrolling, setScrolling] = useState(false);
    let [isToggle, setToggle] = useState(false);
    let [manu , setManu] = useState('');
    let [subManu , setSubManu] = useState('');
    let [isOpen, setIsOpen] = useState(false);
    let [userManu, setUserManu] = useState(false);

    let dropdownRef = useRef(null);
    let userRef = useRef(null)

    useEffect(()=>{
        const handleScroll = () => {
            const isScrolling = window.scrollY > 50;
            setScrolling(isScrolling);
        };

        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
              setIsOpen(false);
            }
          };

        const userOutsideClick = (e) =>{
            if(userRef.current && !userRef.current.contains(e.target)){
                setUserManu(false)
            }
        }

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('click', handleOutsideClick);
        window.addEventListener('click', userOutsideClick);
        
        let current = window.location.pathname
        setManu(current)
        setSubManu(current)
        window.scrollTo(0, 0);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('click', handleOutsideClick);
            window.removeEventListener('click', userOutsideClick);
          };
    },[])

    const toggleMenu = () =>{
        setToggle(!isToggle)
      }

    return(
        <nav id="topnav" className={`${navclass} ${scrolling ? 'nav-sticky' : ''}`}>
            <div className="container relative">
                {navlight && (
                    <Link className="logo" to="/">
                        <span className="inline-block dark:hidden">
                        <img src={logoLight} className="h-24 l-dark" alt=""/>
                        <img src={logoLight} className="h-24 l-light" alt=""/>
                        </span>
                        <img src={logoLight} className="hidden h-16 dark:inline-block" alt=""/>
                    </Link>
                )}
                {!navlight && (
                    <Link className="logo" to="/">
                        <div>
                        <img src={logoLight} className="h-16 inline-block dark:hidden" alt=""/>
                        <img src={logoLight} className="h-16 hidden dark:inline-block" alt=""/>
                        </div>
                    </Link>
                )}

                <div className="menu-extras">
                    <div className="menu-item">
                        <Link to="#" className={`navbar-toggle ${isToggle ? 'open' : ''}`} id="isToggle" onClick={() =>toggleMenu()}>
                            <div className="lines">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </Link>
                    </div>
                </div>

                <ul className="buy-button list-none mb-0 space-x-1">
                    {navlight === true ? (
                        <li className="dropdown inline-block relative pe-1" ref={dropdownRef}>
                            <button className="dropdown-toggle align-middle inline-flex search-dropdown" type="button" onClick={()=>setIsOpen(!isOpen)}>
                                <FiSearch className="size-5 dark-icon"></FiSearch>
                                <FiSearch className="size-5 white-icon text-white"></FiSearch>
                            </button>
                            {isOpen && (
                                <div className="dropdown-menu absolute overflow-hidden end-0 m-0 mt-5 z-10 md:w-52 w-48 rounded-md bg-white dark:bg-slate-900 shadow dark:shadow-gray-800">
                                    <div className="relative">
                                        <FiSearch className="size-4 absolute top-[9px] end-3"></FiSearch>
                                        <input type="text" className="h-9 px-3 pe-10 w-full border-0 focus:ring-0 outline-none bg-white dark:bg-slate-900" name="s" id="searchItem" placeholder="Search..."/>
                                    </div>
                                </div>
                            )}
                        </li>
                    ) : (

                        <li className="dropdown inline-block relative pe-1" ref={dropdownRef}>
                            <button className="dropdown-toggle align-middle inline-flex search-dropdown" type="button" onClick={()=>setIsOpen(!isOpen)}>
                                <FiSearch className="size-5"></FiSearch>
                            </button>
                            {isOpen && (
                                <div className="dropdown-menu absolute overflow-hidden end-0 m-0 mt-5 z-10 md:w-52 w-48 rounded-md bg-white dark:bg-slate-900 shadow dark:shadow-gray-800">
                                    <div className="relative">
                                        <FiSearch className="size-4 absolute top-[9px] end-3"></FiSearch>
                                        <input type="text" className="h-9 px-3 pe-10 w-full border-0 focus:ring-0 outline-none bg-white dark:bg-slate-900" name="s" id="searchItem" placeholder="Search..."/>
                                    </div>
                                </div>
                            )}
                        </li>
                    )}

            
                </ul>

                <div id="navigation" style={{display: isToggle === true ? 'block' : 'none'}}>
                    <ul className={`navigation-menu ${manuclass}`}>
                        <li className={`has-submenu parent-menu-item ${['/','/index-two','/index-three','/index-four','/index-five','/index-item'].includes(manu) ? 'active' : '' }`}>
                            <Link to="/">Home</Link>
                        </li>


                {/* <li className={`has-submenu parent-menu-item ${['/grid','/grid-left-sidebar','/grid-right-sidebar','/grid-item'].includes(manu) ? 'active' : ''}`}>
                        <Link to="/grid" onClick={()=>setSubManu(subManu === '/grid-item' ? '' : '/grid-item')}>Tour Grid </Link><span className="submenu-arrow"></span>
                                
                    </li> */}
        <li className={`has-submenu parent-menu-item ${['/','/index-two','/index-three','/index-four','/index-five','/index-item'].includes(manu) ? 'active' : '' }`}>
                            <Link to="/adventure" onClick={()=>setSubManu(setManu === '/index-item' ? '' : '/index-item')}>Adventure</Link><span className="menu-arrow"></span>
                            <ul className={`submenu ${['/list','/grid','/list','/grid','/list','/index-item'].includes(subManu) ? 'open' : '' }`}>
                                <li className={`${manu === '/adventure' ? 'active' : '' }`}><Link to="/adventure" className="sub-menu-item">Rishikesh</Link></li>
                                <li className={`${manu === '/adventure' ? 'active' : '' }`}><Link to="/adventure" className="sub-menu-item">Trekking</Link></li>
                                <li className={`${manu === '/adventure' ? 'active' : '' }`}><Link to="/adventure" className="sub-menu-item">Leh Ladakh Package</Link></li>
                                <li className={`${manu === '/adventure' ? 'active' : '' }`}><Link to="/adventure" className="sub-menu-item">Spiti Valley</Link></li>
                                <li className={`${manu === '/adventure' ? 'active' : '' }`}><Link to="/adventure" className="sub-menu-item">Winter Spiti Valley</Link></li>
                            </ul>
                        </li>

                        <li className={`${manu === '/grid' ? 'active' : '' }`}><Link to="/domestic" className="sub-menu-item">Domestic</Link></li>

          
                        <li className={`has-submenu parent-menu-item ${['/','/index-two','/index-three','/index-four','/index-five','/index-item'].includes(manu) ? 'active' : '' }`}>
                            <Link to="/international" onClick={()=>setSubManu(setManu === '/index-item' ? '' : '/index-item')}>International</Link><span className="menu-arrow"></span>
                            <ul className={`submenu ${['/list','/grid','/list','/grid','/list','/index-item'].includes(subManu) ? 'open' : '' }`}>
                                <li className={`${manu === '/international' ? 'active' : '' }`}><Link to="/international" className="sub-menu-item">Dubai</Link></li>
                                <li className={`${manu === '/international' ? 'active' : '' }`}><Link to="/international" className="sub-menu-item">Malaysia</Link></li>
                                <li className={`${manu === '/international' ? 'active' : '' }`}><Link to="/international" className="sub-menu-item">Singapore</Link></li>
                                <li className={`${manu === '/international' ? 'active' : '' }`}><Link to="/international" className="sub-menu-item">Thailand</Link></li>
                            </ul>
                        </li>

                        <li className={`${manu === '/contact' ? 'active' : '' }`}><Link to="/contact" className="sub-menu-item">Contact</Link></li>
                        <li className={`${manu === '/aboutus' ? 'active' : '' }`}><Link to="/aboutus" className="sub-menu-item">About</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}