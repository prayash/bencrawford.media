import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import config, { t } from '../config'
import Header from '../components/header'
import Footer from '../components/footer'
import '../scss/index.scss'

export default class Layout extends React.Component {
  render() {
    let { children, location } = this.props
    let isHome = location.pathname === '/'

    return (
      <main>
        <Helmet>
          <title>{config.title}</title>
          <meta name="description" content={config.description} />
          <meta name="keywords" content={config.keywords} />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={config.appleTouchIcon}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={config.favicon32}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={config.favicon16}
          />
          <meta
            name="msapplication-TileColor"
            content={config.msAppleTileColor}
          />
          <meta name="theme-color" content={config.themeColor} />
          <link
            href="https://fonts.googleapis.com/css?family=Lato"
            rel="stylesheet"
          />
        </Helmet>

        <Header dark={!isHome} />

        <div id="page">{children()}</div>
      </main>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.func
}
