import React from 'react'

import YouTube from '../../components/icons/YouTube'
import Instagram from '../../components/icons/Instagram'

export default () => {
  return (
    <div className="social-links">
      <ul>
        <li>
          <a
            href="http://instagram.com/bencrawford17"
            className="icon instagram"
            title="Instagram"
          >
            <Instagram />
          </a>
        </li>
        <li>
          <a
            href="http://whoisryosuke.tumblr.com/"
            className="icon youtube"
            title="YouTube"
          >
            <YouTube />
          </a>
        </li>
      </ul>
    </div>
  )
}
