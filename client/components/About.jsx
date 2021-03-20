import React from 'react';
import css from '../styles/about.css';

const About = (props) => {
  return (
    <div className='aboutContainer'>
      <h2 className='aboutTitle'>ABOUT THIS GAME</h2>
      <div dangerouslySetInnerHTML={{__html: props.product.description}}></div>
    </div>
  )
}

export default About;