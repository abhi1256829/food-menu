import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets' // Adjust the path as needed to where your assets are exported

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            {/* <p>This is our APP</p> */}
            {/* <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div> */}
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+91 9170165424</li>
                <li>contact@tomato.com</li>
                <li>support@tomato.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-content-right">Copyright 2025 TOMATO.com - All Right Reserved. </p>
    </div>
  )
}

export default Footer
