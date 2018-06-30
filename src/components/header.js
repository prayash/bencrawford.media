import React from 'react'
import Link from 'gatsby-link'
import Logo from '../assets/img/logo.png'

class Header extends React.Component {
  render() {
    let isHome = this.props.route === '/'

    return (
      <header className="header">
        <Link to={'/'} className="logo">
          {isHome ? (
            <img src={Logo} width={48} />
          ) : (
            <h1 className="title-text">Ben Crawford</h1>
          )}
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
