import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/LandingNav/Navbar'
import Banner from '../../components/Banner/Banner'



const Home = () => {

// let navigate=useNavigate()  

// function gotologin(){
//     console.log("hii")
// navigate("/login")
// }

    return (
        <div>
            <Navbar />
            <Banner />



            <h2>Bannu</h2>
            <Link to="/login">login</Link>
        </div>
    )
}

export default Home
