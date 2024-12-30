import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [user, setUser] = useState(null);

    const toggleNavbar = () => {
        setIsVisible(!isVisible); 
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser)); 
        }
    }, []);

    return (
        <>
            <div className="navbar-toggle" onClick={toggleNavbar}>
                <span>&#9776;</span> 
            </div>

            <div className={`navbar ${isVisible ? "visible" : ""}`}>
                <div className="navbar-content">
                    <ul>
                        {user && (
                            <li>
                                <Link to={`/userprofile/${user._id}`} onClick={toggleNavbar}>Profile</Link>
                            </li>
                        )}
                        <li>
                            <Link to="/home" onClick={toggleNavbar}>Home</Link>
                        </li>
                        <li>
                            <Link to="/contact" onClick={toggleNavbar}>Contact</Link>
                        </li>
                        {user ? (
                            <li>
                                <Link to="/auth/login" onClick={() => {
                                    localStorage.removeItem('user'); 
                                    setUser(null); 
                                    toggleNavbar();
                                }}>Logout</Link>
                            </li>
                        ) : (
                            <li>
                                <Link to="/auth/login" onClick={toggleNavbar}>Login</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Navbar;
