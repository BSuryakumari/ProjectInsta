import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-page-container">
    <img
      src="https://res.cloudinary.com/srk999/image/upload/v1657021500/mobile/erroring_1_n2l2qw.svg"
      alt="page not found"
      className="not-found-page-image"
    />
    <h1 className="not-found-page-heading">Page Not Found</h1>
    <p className="not-found-page-paragraph">
      we are sorry, the page you requested could not be found. Please go back to
      the homepage.
    </p>
    <Link to="/" className="not-found-page-link">
      <button className="not-found-page-button" type="button">
        Home page
      </button>
    </Link>
  </div>
)

export default NotFound
