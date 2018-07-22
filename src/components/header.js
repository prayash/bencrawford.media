import React from 'react'
import Link from 'gatsby-link'
import cx from 'classnames'

import { t } from '../config'
import Logo from '../assets/img/logo.png'
import { Instagram, YouTube } from './icons'

class Header extends React.Component {
  state = {
    menuOpen: false
  }

  render() {
    let { menuOpen } = this.state
    let { dark } = this.props

    let headerStyle = cx('header', { dark })
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
              <Instagram light={!dark} />
              <YouTube light={!dark} />
            </div>
          </div>

          <Link to={'/'} className="logo">
            <img src={Logo} width={48} />
          </Link>

          <div className={headerRightStyle}>
            <div className="menu_button_container" onClick={this.handleMenu}>
              <button className="btn">{t('header.nav.button')}</button>
              <span className="menu_icon" />
            </div>

            <nav className="main_navigation">
              <ul className="menu">
                <li className="menu-item">
                  <Link to={'/'} onClick={this.handleMenu}>
                    {t('header.nav.home')}
                  </Link>
                </li>

                <li className="menu-item">
                  <Link to={'/about'} onClick={this.handleMenu}>
                    {t('header.nav.about')}
                  </Link>
                </li>

                <li className="menu-item">
                  <Link to={'/stills'} onClick={this.handleMenu}>
                    {t('header.nav.stills')}
                  </Link>
                </li>

                <li className="menu-item">
                  <Link to={'/motion'} onClick={this.handleMenu}>
                    {t('header.nav.motion')}
                  </Link>
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
