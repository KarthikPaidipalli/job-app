import './index.css'
import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn,MdWork} from 'react-icons/md'

const Jobscard = props => {
  const {value} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = value
  return (
    <Link to={`/jobs/${id}`} className="links">
      <li className="jobcard-li">
        <div>
          <div className="top-of-jobcard">
            <img
              src={companyLogoUrl}
              alt=" company logo"
              className="company-imagE"
            />
            <div>
              <h1>{title}</h1>
              <div className="align-rating">
                <div className="goldcolor">
                  <FaStar />
                </div>
                <p className="middle-of-para">{rating}</p>
              </div>
            </div>
          </div>
          <div className="middle-jobcard">
            <div className="middle-jobcard-incard">
              <MdLocationOn />
              <p className="middle-of-para">{location}</p>
              <MdWork />
              <p className="middle-of-para">{employmentType}</p>
            </div>
            <h1>{packagePerAnnum}</h1>
          </div>
          <hr />
          <h1>Description</h1>
          <p>{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}
export default Jobscard
