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
            <p className="about__content">
              Ben is a filmmaker, photographer, and adventurer that is deeply
              rooted in the west. His passions lay within big days in the
              mountains, getting lost in the desert, and telling the stories of
              these incredibly important spaces and the people that interact
              with them. Ben strives to further explore artistic expression, the
              natural world, and where these entities intersect.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
