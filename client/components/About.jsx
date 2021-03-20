import React from 'react';

const About = (props) => {
  return (
    <div>
      ABOUT THIS GAME <br />
      <div dangerouslySetInnerHTML={{__html: props.product.description}}></div>

    </div>
  )
}

export default About;