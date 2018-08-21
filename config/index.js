const tailwind = require('../tailwind')
const Polyglot = require('node-polyglot')
let polyglot = new Polyglot({ locale: 'en' })

polyglot.extend({
  header: {
    title: 'Ben Crawford',
    nav: {
      button: 'Menu',
      home: 'Home',
      about: 'About',
      stills: 'Stills',
      motion: 'Motion'
    }
  },
  footer: {
    copyright: 'Copyright © 2018 Ben Crawford Media'
  },
  about: {
    intro:
      'Ben is a filmmaker, photographer, and adventurer that is deeply rooted in the west.',
    body:
      'His passions lay within big days in the mountains, getting lost in the desert, and telling the stories of these incredibly important spaces and the people that interact with them. Ben strives to further explore artistic expression, the natural world, and where these entities intersect.'
  }
})

module.exports = {
  // Prefix for all links. If you deploy your site to example.com/site your pathPrefix should be "site"
  pathPrefix: '/',

  // Meta tags
  siteTitle: 'Ben Crawford Media', // Navigation and Site Title
  siteTitleAlt: 'Ben Crawford Media', // Alternative Site title for SEO
  siteUrl: 'http://bencrawford.media', // Domain of your site. No trailing slash!
  siteLanguage: 'en', // Language Tag on <html> element
  siteBanner: '/social/banner.jpg',
  siteDescription: 'The portfolio of Ben Crawford',

  // Misc meta
  siteFBAppID: '123456789', // Facebook App ID
  ogSiteName: 'Ben Crawford Media', // Facebook Site Name
  userTwitter: '', // Twitter Username
  userInstagram: 'bencrawford17', // Instagram Handle
  userYoutube: 'UCDqdV070AmECb-o36Gza4LQ', // YouTube Username

  // Manifest and Progress color
  themeColor: tailwind.colors.orange,
  backgroundColor: tailwind.colors.blue,

  // Settings for typography.js
  headerFontFamily: 'Lato',
  bodyFontFamily: 'Open Sans',
  baseFontSize: '18px',

  // Copy
  t: (string, params) => polyglot.t(string, params)
}
