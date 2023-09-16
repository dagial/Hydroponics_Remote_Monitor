import React from 'react';
import './Footer.css';
import leaf from '../../assets/leaf.png'
import {FaFacebook, FaTwitter, FaPinterest, FaLinkedin} from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='hydroponic__footer'>
      <div className='hydroponic__footer-content'>
        <div className='hydroponic__footer-content_first'>
          <div className='hydroponic__footer-content_hydro'>
            <div className='hydroponic__footer-content_hydro-logo'>
              <img src={leaf} alt='Logo' />
              <h2>Hydro</h2>
            </div>
            <p>Our Vission To Create Affordable Hydroponic System That Can BE Used At Home</p>
          </div>

          <div className='hydroponic__footer-content_follow'>
            <h2>Follow Us</h2>
            <div className='hydroponic__footer-content_follow-icons'>
              <a href='#facebook'><FaFacebook /></a>
              <a href='#twitter'><FaTwitter /></a>
              <a href='#pinterest'><FaPinterest /></a>
              <a href='#linkedin'><FaLinkedin /></a>
            </div>
          </div>

        </div>

        <div className='hydroponic__footer-content_about'>
          <h2>About</h2>
          
            <a href='#who'>Who We Are</a>
            <a href='#services'>Services</a>
            <a href='#blog'>Blog</a>
          

        </div>
        <div className='hydroponic__footer-content_Support'>
          <h2>Support</h2>
          
            <a href='faq'>FAQ</a>
            <a href='help'>Help</a>
          

        </div>
      </div>
    </div>
  )
}

export default Footer
