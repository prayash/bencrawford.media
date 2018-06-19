import React from 'react'
import Link from 'gatsby-link'
import config from '../config'

import image from '../assets/img/very-professional-yet-casual.jpg'

export default () => {
  return (
    <div className="about container">
      <div className="about__title">
        <div className="title-wrapper">
          <img className="image" src={image} />

          <div>
            <h2 className="title-text">Ben Crawford</h2>
            <p className="about__content">
              Ben Crawford is a photographer, filmmaker, and outdoor enthusiast.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
