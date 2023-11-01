import {Component} from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const settings = {
  dots: false,
  infinite: false,
  initialSlide: 0,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },

    {
      breakpoint: 660,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 1,
      },
    },
  ],
}

class UserStories extends Component {
  state = {
    userStoriesData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount = () => {
    this.getUserStories()
  }

  getUserStories = async () => {
    const jwtToken = Cookies.get('jwt_token')
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const getFormattedData = data =>
      data.map(eachItem => ({
        storyUrl: eachItem.story_url,
        userId: eachItem.user_id,
        userName: eachItem.user_name,
      }))

    const url = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const responseData = await response.json()
      const updatedResponseData = getFormattedData(responseData.users_stories)
      this.setState({
        userStoriesData: updatedResponseData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderStoriesView = () => {
    const {userStoriesData} = this.state

    return (
      userStoriesData.length !== 0 && (
        <>
          <div className="slider-main-div-container">
            <div className="slider-container">
              <Slider {...settings}>
                {userStoriesData.map(eachStory => {
                  const {storyUrl, userId, userName} = eachStory
                  return (
                    <div key={userId}>
                      <div className="story-user-and-name-container">
                        <img
                          className="story-image"
                          src={storyUrl}
                          alt="user story"
                        />
                        <p className="story-user-name scrolling">
                          <span>{userName}</span>
                        </p>
                      </div>
                    </div>
                  )
                })}
              </Slider>
            </div>
          </div>
          <hr className="horizontal-line" />
        </>
      )
    )
  }

  renderLoadingView = () => (
    <>
      <div className="loader-container" testid="loader">
        <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
      </div>
    </>
  )

  renderFailureView = () => (
    <>
      <div className="user-stories-failure-view">
        <img
          src="https://res.cloudinary.com/srk999/image/upload/v1656750680/mobile/alert-triangle_agumai.svg"
          alt="failure view"
        />
        <p>Something went wrong. Please try again</p>
        <button
          className="failure-button"
          type="button"
          onClick={this.getUserStories}
        >
          Try again
        </button>
      </div>
      <hr />
    </>
  )

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()

      case apiStatusConstants.success:
        return this.renderStoriesView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }
}

export default UserStories
