import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'
import {GiHamburgerMenu} from 'react-icons/gi'

import './index.css'

class Header extends Component {
  state = {showHamburger: false, searchInput: '', showSearchBar: false}

  onClickHamburger = () => {
    if (this.getActiveRoute() === '/') {
      this.setState(prevState => ({showHamburger: !prevState.showHamburger}))
    }
  }

  getActiveRoute = () => {
    const {match} = this.props
    return match.path
  }

  onClickCancelIcon = () => {
    this.setState({showHamburger: false})
  }

  performSearchIcon = () => {
    const {searchInput} = this.state
    const {onClickSearchIcon} = this.props
    if (onClickSearchIcon !== undefined) {
      onClickSearchIcon(searchInput)
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value}, this.performSearchIcon)
  }

  onClickLogout = () => {
    const {history} = this.props
    history.replce('/login')
    Cookies.remove('jwt_token')
  }

  onClickSearch = () => {
    const {onClickSearchIcon} = this.props
    const {searchInput} = this.state
    if (onClickSearchIcon !== undefined) {
      onClickSearchIcon(searchInput)
    }
  }

  onClickSearchBa = () => {
    this.setState(prevState => ({showSearchBar: !prevState.showSearchBar}))
  }

  showMobileNavitems = () => {
    const {showSearchBar, searchInput} = this.state

    return (
      <>
        <ul className='nav-items-container-item-mobile'>
          {showSearchBar && (
            <div className='caption-search-container search-icon-sm'>
              <input
                placeholder='Search Caption'
                className='search-caption'
                type='search'
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />
              <div className='search-icon-container'>
                <button type='button' className='search-btn'>
                  <FaSearch
                    onClick={this.onClickSearch}
                    className='search-icon'
                  />
                </button>
              </div>
            </div>
          )}
        </ul>
      </>
    )
  }

  render() {
    const {showHamburger} = this.state
    const {searchInput} = this.state

    return (
      <div>
        <div className='header-logo-container'>
          <div className='header-logo-container_1'>
            <Link to='/'>
              <img
                src='https://res.cloudinary.com/dzjf06ctr/image/upload/v1668934317/Standard_Collections_8_aq667t.png'
                alt='website logo'
                className='header-logo-image'
              />
            </Link>
            <h1 className='header-logo-name'>Insta Share </h1>
          </div>
          <ul className='nav-items-container'>
            <div className='caption-search-container'>
              <input
                placeholder='Search Caption'
                className='search-caption'
                type='search'
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />
              <div className='search-icon-container'>
                <button type='button' className='search-btn'>
                  <FaSearch
                    onClick={this.onClickSearch}
                    className='search-icon'
                  />
                </button>
              </div>
            </div>
            <Link to='/' className='nav-link'>
              <li>Home</li>
            </Link>
            <Link to='/my-profile' className='nav-link'>
              <li>Profile </li>
            </Link>
            <li>
              <button
                onClick={this.onClickLogout}
                className='logout-btn'
                type='button'
              >
                Logout{' '}
              </button>
            </li>
          </ul>
          <button
            type='button'
            onClick={this.onClickHamburger}
            className='hamburger-menu'
          >
            <GiHamburgerMenu />
          </button>
        </div>
        {showHamburger && this.showMobileNavitems()}
      </div>
    )
  }
}

export default withRouter(Header)
