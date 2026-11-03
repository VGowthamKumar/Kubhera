import { Link } from 'react-router-dom';
import Logo1 from '../../../assets/Logo/fav_icon.jpeg';
import Logo2 from '../../../assets/Logo/logo-2.jpeg';
import './navbar.css';
export default function Navbar() {
    return (
        <header className="LandingPageNavbar">
            <Link to="/" className="LandingPageNavbar-sec1">
                <img src={Logo1} className="logo1" />
                <img src={Logo2} className="logo2" />
            </Link>
            <nav className="LandingPageNavbar-sec2">
                <a href="#about">About</a>
                <a href="#services">Services</a>
                <a href="#about">Locations</a>
                <a href="#partners">Partner Ecosystem</a>
                <a href="#help">Contact</a>
            </nav>
            <div className="LandingPageNavbar-sec3">
                <Link className="LandingPageNavbarbutton loginbutton" to="/login">Log In</Link>
                <Link className="LandingPageNavbarbutton OpenAccountbutton" to="/register">Open Account</Link>
            </div>
        </header>
    )
}
