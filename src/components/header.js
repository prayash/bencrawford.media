import React from 'react'
import Link from 'gatsby-link'

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <Link to={'/'} className="logo">
          ben crawford media
        </Link>

        <nav className="navigation hidden">
          <ul>
            <li>
              <Link to={'/motion'}>Motion</Link>
            </li>
            <li>
              <Link to={'/stills'}>Stills</Link>
            </li>
            <li>
              <Link to={'/about'}>About</Link>
            </li>
          </ul>
        </nav>
      </header>
    )
  }
}

export default Header
