import './index.css'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn,MdWork} from 'react-icons/md'

const Similarcard = props => {
  const {value} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    location,
    rating,
    title,
    jobDescription,
  } = value
  return (
    <li className="list-of-similar">
      <div>
        <div className="top-of-similarjob">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
            className="company-image-similar-job"
          />
          <div>
            <h1 className="">{title}</h1>
            <div className="align-rating">
              <div className="goldcolor">
                <FaStar />
              </div>
              <p className="middle-of-para">{rating}</p>
            </div>
          </div>
        </div>
        <h1>Description</h1>
        <p>{jobDescription}</p>
        <div className="middle-gobdetail-incard">
          <MdLocationOn />
          <p className="middle-of-para">{location}</p>
          <MdWork />
          <p className="middle-of-para">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}
export default Similarcard
