import React from 'react'
import Link from 'gatsby-link'
import config from '../config'
import { t } from '../config/strings'

import image from '../assets/img/very-professional-yet-casual.jpg'

export default () => {
  return (
    <div className="about container">
      <div className="about__content">
        <p>{t('about.intro')}</p>
        <p>{t('about.body')}</p>
      </div>

      <div className="about__title">
        <img className="image" src={image} />
      </div>
    </div>
  )
}
