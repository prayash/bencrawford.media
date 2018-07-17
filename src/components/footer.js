import React from 'react'
import { t } from '../config/strings'

export default () => {
  return (
    <footer className="footer">
      <nav className="copyright">
        <p>{t('footer.copyright')}</p>
      </nav>
      <nav className="Navigation social">
        <ul />
      </nav>
    </footer>
  )
}
