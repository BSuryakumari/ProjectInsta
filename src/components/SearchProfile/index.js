import {Component} from 'react'
import Loader from 'react-loader-spinner'
import UserPostItem from '../UserPostItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
class SearchProfile extends Component {
  onClickRetryButton = () => {
    const {getSearchResults} = this.props
    getSearchResults()
  }

  renderSearchResultsView = () => {
    const {searchResults} = this.props
    if (searchResults.length !== 0) {
      return (
        <>
          <h1 className="searched-posts-title">Search Results</h1>
          <ul className="user-posts-result-container">
            {searchResults.map(Post => (
              <UserPostItem
                key={Post.postId}
                UserPostDetails={Post}
                className="user-posts-result-container"
                testid="loader"
                alt="post author profile"
              />
            ))}
          </ul>
        </>
      )
    }
    return (
      <div className="search-results-not-found-view">
        <img
          src="https://res.cloudinary.com/srk999/image/upload/v1656908269/mobile/Group_humdxy.svg"
          alt="search not found"
          className="search-results-not-found-image"
        />
        <h1 className="search-results-not-found-heading">Search Not Found</h1>
        <p className="search-results-not-found-paragraph">
          Try different keyword or search again
        </p>
      </div>
    )
  }

  renderInitialView = () => (
    <div className="post-search-results-initial-view">
      <img
        className="initial-view-icon"
        alt="post"
        src="https://res.cloudinary.com/srk999/image/upload/v1656908079/mobile/Frame_1473_y7qwez.svg"
      />
      <h1 className="initial-view-heading">
        Search Results will be appear here
      </h1>
    </div>
  )

  renderLoadingView = () => (
    <div className="post-search-results-loading-view" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <>
      <div className="post-search-failure-view">
        <img
          src="https://res.cloudinary.com/srk999/image/upload/v1656750680/mobile/alert-triangle_agumai.svg"
          alt="failure view"
          className="post-search-results-failure-image"
        />
        <p className="post-search-results-failure-paragraph">
          Something went wrong. Please try again
        </p>
        <button
          className="post-search-results-failure-button"
          type="button"
          onClick={this.onClickRetryButton}
          alt="search not found"
        >
          Try Again
        </button>
      </div>
    </>
  )

  render() {
    const {apiStatus} = this.props

    switch (apiStatus) {
      case apiStatusConstants.initial:
        return this.renderInitialView()

      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSearchResultsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }
}

export default SearchProfile
