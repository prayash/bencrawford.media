import React from 'react'
import { Link } from 'gatsby'
import styled from 'react-emotion'

import config, { t } from '../../config'
import { Instagram, YouTube } from './icons'
import logo from '../assets/img/logo.png'

const Wrapper = styled.header`
  align-items: center;
  background: transparent;
  color: #fff;
  display: flex;
  flex-direction: row;
  font-family: Lato, sans-serif;
  font-size: 16px;
  justify-content: center;
  letter-spacing: 2px;
  overflow: hidden;
  padding: 24px 0;
  position: absolute;
  text-transform: uppercase;
  transition: all 0.3s ease-in-out;
  width: 100%;
  z-index: 10;
`

const Partial = styled.div`
  align-items: center;
  display: flex;
  flex: 1;

  img {
    margin: 0;
  }
`

const HeaderRight = styled(Partial)`
  justify-content: flex-end;
`

const Line = styled.span`
  background: ${props => (props.dark ? 'black' : 'white')};
  display: inline-block;
  height: 1px;
  margin: -4px 20px 0 0;
  transition: width 0.3s ease-in-out;
  vertical-align: middle;
  width: 40px;
`

const Navigation = styled.nav`
  opacity: ${props => (props.active ? 1 : 0)};
  position: absolute;
  right: ${props => (props.active ? 50 : -50)}px;
  transition: all 0.3s ease-in-out;
  z-index: ${props => (props.active ? 20 : 9)};

  ul {
    list-style-type: none;
    margin: 0;
  }

  li {
    display: inline-block;
    letter-spacing: 0.1em;
    margin: 0;

    &:after {
      color: white;
      content: '/';
      padding: 0 10px;
    }

    &:last-child:after {
      content: '';
      padding: 0;
    }
  }

  a {
    color: white;
    font-family: CustomFont, Lato, sans-serif;
    font-size: 1rem;
    user-select: none;
    text-decoration: none;
  }
`

const MenuButtonContainer = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  position: relative;
  z-index: 13;
`

const MenuIcon = styled.span`
  background: ${props =>
    props.active ? '0 0' : props.dark ? 'black' : 'white'};
  display: inline-block;
  height: 1px;
  position: relative;
  transition: all 0.3s ease-in-out;
  width: 40px;

  &:before,
  &:after {
    background: ${props =>
      props.active ? 'white' : props.dark ? 'black' : 'white'};
    content: '';
    display: block;
    height: 1px;
    position: absolute;

    transition: all 0.3s ease-in-out;
    width: ${props => (props.active ? '20px' : '40px')};
    z-index: -1;
  }

  &:before {
    top: ${props => (props.active ? 'initial' : '8px')};
    transform: rotate(${props => (props.active ? '-45deg' : '0')});
  }

  &:after {
    top: ${props => (props.active ? 'initial' : '-8px')};
    transform: rotate(${props => (props.active ? '45deg' : '0')});
  }
`

const MenuButton = styled.button`
  background: 0;
  border: 0;
  color: ${props => (props.dark ? 'black' : 'white')};
  cursor: pointer;
  font-family: CustomFont, Lato, sans-serif;
  font-size: 1.15rem;
  letter-spacing: 0.2rem;
  line-height: normal;
  margin-right: 20px;
  opacity: ${props => (props.hide ? 0 : 1)};
  outline: 0;
  padding: 0;
  padding-top: 4px;
  position: relative;
  overflow: visible;
  text-transform: uppercase;
  transition: all 0.3s ease-in-out;
  user-select: none;
`

const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.7);
  height: 100%;
  left: 0;
  opacity: ${props => (props.active ? 1 : 0)};
  position: absolute;
  top: 0;
  transition: all 0.3s ease-in-out;
  width: 100%;
  z-index: ${props => (props.active ? 3 : -1)};
`

const Content = styled.div`
  max-width: 1000px;
  margin: 0 auto;

  a {
    color: white;
    &:hover {
      opacity: 0.85;
      color: white;
    }
  }
`

const SocialLinks = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;

  svg.icon {
    cursor: pointer;
    margin-right: 12px;
  }
`

class Header extends React.Component {
  state = {
    menuOpen: false
  }

  render() {
    let { menuOpen } = this.state
    let { dark } = this.props

    return (
      <React.Fragment>
        <Wrapper>
          <Partial>
            <Line dark={dark} />

            <SocialLinks>
              <Instagram link={config.userInstagram} light={!dark} />
              <YouTube link={config.userYoutube} light={!dark} />
            </SocialLinks>
          </Partial>

          <Partial style={{ flex: 0.1 }}>
            <Link
              to={'/'}
              className="logo"
              style={{ height: 40, display: 'flex', alignItems: 'center' }}
            >
              <img src={logo} width={40} />
            </Link>
          </Partial>

          <HeaderRight isMenuActive={menuOpen}>
            <MenuButtonContainer onClick={this.handleMenu}>
              <MenuButton dark={dark} hide={menuOpen}>
                {t('header.nav.button')}
              </MenuButton>
              <MenuIcon dark={dark} active={menuOpen} />
            </MenuButtonContainer>

            <Navigation active={menuOpen}>
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
            </Navigation>
          </HeaderRight>
        </Wrapper>

        <Overlay active={menuOpen} />
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
