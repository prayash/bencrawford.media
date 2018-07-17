import React from 'react'
import Link from 'gatsby-link'
import cx from 'classnames'
import { t } from '../config/strings'

import Logo from '../assets/img/logo.png'

class Header extends React.Component {
  state = {
    menuOpen: false
  }

  render() {
    let headerStyle = cx('header', {
      dark: location.pathname !== '/'
    })

    let headerRightStyle = cx('header__right', {
      menu_active: menuOpen
    })

    let overlayStyle = cx('overlay', {
      menu_active: menuOpen
    })

    return (
      <React.Fragment>
        <header className={headerStyle}>
          <div className="header__left">
            <span className="line" />

            <div className="social-links">
              <Instagram />
              <YouTube />
            </div>
          </div>

          <Link to={'/'} className="logo">
            <img src={Logo} width={48} />
          </Link>

          <div className={headerRightStyle}>
            <div className="menu_button_container" onClick={this.handleMenu}>
              <button>Menu</button>
              <span className="menu_icon" />
            </div>

            <nav className="main_navigation">
              <ul className="menu">
                <li className="menu-item">
                  <Link to={'/'}>{t('header.nav.home')}</Link>
                </li>

                <li className="menu-item">
                  <Link to={'/about'}>{t('header.nav.about')}</Link>
                </li>

                <li className="menu-item">
                  <Link to={'/stills'}>{t('header.nav.stills')}</Link>
                </li>

                <li className="menu-item">
                  <Link to={'/motion'}>{t('header.nav.motion')}</Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <div className={overlayStyle} />
      </React.Fragment>
    )
  }

  handleMenu = () => {
    this.setState({
      menuOpen: !this.state.menuOpen
    })
  }
}

export default Header
