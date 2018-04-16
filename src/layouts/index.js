import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import config from '../config'

import Header from '../components/header'
import Footer from '../components/footer'

import appleTouchIcon from '../assets/favicon/apple-touch-icon.png'
import favicon32 from '../assets/favicon/favicon-32x32.png'
import favicon16 from '../assets/favicon/favicon-16x16.png'

const Layout = ({ children }) => (
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
    </Helmet>
    <Header />

    <div id="page">{children()}</div>
  </main>
)

Layout.propTypes = {
  children: PropTypes.func
}

export default Layout
