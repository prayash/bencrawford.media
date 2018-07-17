import Polyglot from 'node-polyglot'

let polyglot = new Polyglot({ locale: 'en' })
export const t = (string, params) => polyglot.t(string, params)

export const strings = {
  header: {
    title: 'Ben Crawford',
    nav: {
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
      'His passions lay within big days in the mountains, getting lost in the desert, and telling the stories of these incredibly important spaces and the people that interact with them.Ben strives to further explore artistic expression, the natural world, and where these entities intersect.'
  }
}

polyglot.extend(strings)
