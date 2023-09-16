import React from 'react';
import './About.css';
import Reliable from '../../assets/Reliable.png'
import fast from '../../assets/fast.png'
import Trustworthy from '../../assets/Trustworthy.png'

const About = () => {
  return (
    <div className='hydroponic__about'>
      <div className='hydroponic__about-content'>
        <h2>About Us</h2>
      </div>
      <div className='hydroponic__about-list'>
      <div className='hydroponic__about-list_Reliable'>
          <h3>Reliable</h3>
          <img src={Reliable} alt='Reliable' />
        </div>
        <div className='hydroponic__about-list_fast'>
          <h3>Fast</h3>
          <img src={fast} alt='Fast' />
        </div>
        <div className='hydroponic__about-list_Trustworthy'>
          <h3>Trustworthy</h3>
          <img src={Trustworthy} alt='Trustworthy' />
        </div>
      </div>

    </div>
      
  )
}

export default About
