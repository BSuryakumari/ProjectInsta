import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import Header from '../Header'

import './index.css'

const Profile = props => {
  const renderStories = () => {
    const {profileDetails, owner} = props
    const {stories} = profileDetails

    if (stories.length !== 0) {
      return (
        <ul className="profile-render-stories">
          {stories.map(each => {
            const {id, image} = each
            return (
              <li className="profile-render-list-item" key={id}>
                <img
                  className="profile-render-list-item-image"
                  src={image}
                  alt={`${owner} story`}
                />
              </li>
            )
          })}
        </ul>
      )
    }
    return null
  }
  const renderPosts = () => {
    const {profileDetails, owner} = props
    const {posts} = profileDetails

    if (posts.length !== 0) {
      return (
        <ul className="profile-page-posts-unordered-list">
          {posts.map(each => {
            const {id, image} = each
            return (
              <li key={id}>
                <img
                  className="profile-page-posts"
                  src={image}
                  alt={`${owner} post`}
                />
              </li>
            )
          })}
        </ul>
      )
    }
    return (
      <div className="profile-page-no-posts-yet-container">
        <div className="profile-page-camera-icon-container">
          <BiCamera className="profile-page-camera-icon" />
        </div>
        <h1>No Posts Yet</h1>
      </div>
    )
  }

  const {profileDetails, owner} = props
  const {
    followersCount,
    followingCount,
    postsCount,
    profilePic,
    userBio,
    userId,
    userName,
  } = profileDetails

  return (
    <>
      <Header />
      <div className="profile-page-main-container">
        <div>
          <div className="profile-page-upto-userbio-container">
            <h1 className="profile-page-main-heading-user-name">{userName}</h1>
            <div className="profile-page-image-user-info-container">
              <img
                className="profile-page-image-user-info-image "
                src={profilePic}
                alt={`${owner} profile`}
              />
              <ul className="profile-page-user-info-unordered-list-container">
                <li className="profile-page-list-items">
                  <h1 className="profile-page-list-items-heading">
                    {postsCount}
                  </h1>
                  <p className="profile-page-list-items-paragraph">posts</p>
                </li>
                <li className="profile-page-list-items">
                  <h1 className="profile-page-list-items-heading">
                    {followersCount}
                  </h1>
                  <p className="profile-page-list-items-paragraph">followers</p>
                </li>
                <li className="profile-page-list-items">
                  <h1 className="profile-page-list-items-heading">
                    {followingCount}
                  </h1>
                  <p className="profile-page-list-items-paragraph">following</p>
                </li>
              </ul>
            </div>
            <p className="profile-page-userId">{userId}</p>
            <p className="profile-page-user-bio">{userBio}</p>
          </div>
          {renderStories()}
          {renderPosts()}
        </div>
        <hr className="profile-page-horizontal-line" />
        <div className="posts-icon-heading-container">
          <div>
            <BsGrid3X3 className="profile-page-posts-icon" />
          </div>
          <div>
            <h1 className="posts-title-heading">Posts</h1>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
