import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled, { keyframes } from 'react-emotion'
import SEO from '../components/seo'
import { media } from '../utils/media'
import '../styles/global'

import CustomFont from '../assets/fonts/31FF25_0_0.woff2'
import Header from './header'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
  background: #fafafa;
  animation: 1s ease-out 0s 1 ${fadeIn};
`

export default class Layout extends React.Component {
  render() {
    let { location, children, className } = this.props
    let darkMode = location !== undefined ? location.pathname !== '/' : false

    return (
      <StaticQuery
        query={graphql`
          query LayoutQuery {
            site {
              siteMetadata {
                buildTime
              }
            }
          }
        `}
        render={data => (
          <Wrapper className={className}>
            <Header dark={darkMode} />
            <SEO />
            {children}
          </Wrapper>
        )}
      />
    )
  }
}
