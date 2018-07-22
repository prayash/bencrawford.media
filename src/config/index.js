import { t } from './strings'
import logo from '../assets/img/logo.png'
import appleTouchIcon from '../assets/favicon/apple-touch-icon.png'
import favicon32 from '../assets/favicon/favicon-32x32.png'
import favicon16 from '../assets/favicon/favicon-16x16.png'

module.exports = {
  // Meta tags
  title: 'Ben Crawford Media',
  description: 'The portfolio of Ben Crawford',
  keywords: 'photography, cinematography, music videos, landscapes',
  url: 'http://bencrawford.media',
  image: '',
  logo,

  // Misc meta
  twitter: '@',
  fbAppID: '',
  msAppTileColor: '#da532c',
  themeColor: '#ffffff',
  appleTouchIcon,

  // This is used for generating blog preview pages in `gatsby-node.js`.
  postsPerPage: 10,

  // Favicons
  favicon16,
  favicon32,

  // All copy is stored here
  t
}
