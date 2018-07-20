import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import config from '../config'
import Link from 'gatsby-link'
import cx from 'classnames'
import { t } from '../config/strings'

import Logo from '../assets/img/logo.png'
import { Instagram, YouTube } from '../components/icons'

import Footer from '../components/footer'
import appleTouchIcon from '../assets/favicon/apple-touch-icon.png'
import favicon32 from '../assets/favicon/favicon-32x32.png'
import favicon16 from '../assets/favicon/favicon-16x16.png'

export default class Layout extends React.Component {
  state = {
    menuOpen: false
  }

  render() {
    let { children, location } = this.props
    let { menuOpen } = this.state
    let isHome = location.pathname === '/'

    let headerStyle = cx('header', {
      dark: !isHome
    })

    let headerRightStyle = cx('header__right', {
      menu_active: menuOpen
    })

    let overlayStyle = cx('overlay', {
      menu_active: menuOpen
    })

    return (
      <main>
        <Helmet>
          <title>{config.title}</title>
          <meta name="description" content={config.description} />
          <meta name="keywords" content={config.keywords} />
          <link rel="apple-touch-icon" sizes="180x180" href={appleTouchIcon} />
          <link rel="icon" type="image/png" sizes="32x32" href={favicon32} />
          <link rel="icon" type="image/png" sizes="16x16" href={favicon16} />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
          <link
            href="https://fonts.googleapis.com/css?family=Lato"
            rel="stylesheet"
          />
        </Helmet>

        <div id="page">
          <header className={headerStyle}>
            <div className="header__left">
              <span className="line" />

              <div className="social-links">
                <Instagram light={isHome} />
                <YouTube light={isHome} />
              </div>
            </div>

            <Link to={'/'} className="logo">
              <img src={Logo} width={48} />
            </Link>

            <div className={headerRightStyle}>
              <div className="menu_button_container" onClick={this.handleMenu}>
                <button className="btn">Menu</button>
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
          {children()}
        </div>
      </main>
    )
  }

  handleMenu = () => {
    this.setState({
      menuOpen: !this.state.menuOpen
    })
  }
}

Layout.propTypes = {
  children: PropTypes.func
}
