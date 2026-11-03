import Navbar from '../../components/Navbar/LandingNav/Navbar';
import Banner from '../../components/Banner/Banner';
import About from '../../components/about/About';
import './LandingPage.css';
export default function LandingPage() {
    return(
    <div className="landingpage">
        <Navbar />
        <Banner />
        <section className="landing-features">
            <div>
                <b>Secure banking</b>
                <span>Protected accounts and transactions.</span>
            </div>
            <div>
                <b>Instant transfers</b>
                <span>Move money quickly and simply.</span>
            </div>
            <div>
                <b>Smart dashboard</b>
                <span>See your finances at a glance.</span>
            </div>
        </section>
        <About/>
    </div>
)}
