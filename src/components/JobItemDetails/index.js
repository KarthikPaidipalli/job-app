import {Component} from 'react'
import {FaStar} from 'react-icons/fa'
import Cookies from 'js-cookie'
import {MdLocationOn, MdWork} from 'react-icons/md'
import Header from '../Header'
import './index.css'
import Similarcard from '../Similarcard'
const results = {
  success: 'success',
  failure: 'failure',
  loading: 'loading',
  initial: 'initial',
}

class JobItemDetails extends Component {
  state = {
    similar: [],
    jobdetails: [],
    skills: [],
    description: '',
    imageurl: '',
    statusof: results.initial,
  }
  componentDidMount() {
    this.renderinfcompany()
  }

  renderinfcompany = async () => {
    this.setState({statusof: results.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const changingid = id.replace(':', '')
    const urlofcompany = `https://apis.ccbp.in/jobs/${changingid}`
    const auth = Cookies.get('jwt_token')
    const optionsof = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    }

    const responseofcompany = await fetch(urlofcompany, optionsof)

    if (responseofcompany.ok) {
      const dataofcompany = await responseofcompany.json()
      console.log(dataofcompany)
      const {similar_jobs} = dataofcompany
      const updatedsimilarlist = similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        location: each.location,
        rating: each.rating,
        title: each.title,
        jobDescription: each.job_description,
      }))
      const {job_details} = dataofcompany
      const {life_at_company} = job_details
      const {skills} = job_details
      console.log(job_details)
      const updatinglistofskills = skills.map(a => ({
        image_url: a.image_url,
        name: a.name,
      }))
      this.setState({
        description: life_at_company.description,
        imageurl: life_at_company.image_url,
        similar: updatedsimilarlist,
        skills: updatinglistofskills,
        jobdetails: job_details,
        statusof: results.success,
      })
    } else {
      this.setState({statusof: results.failure})
    }
  }

  render() {
    const {similar, jobdetails, skills, description, imageurl} = this.state

    return (
      <div className='bottom-alignment-of-jobdetails'>
        <Header />
        <div className='jobdetailscontainer'>
          <div className='jobdetailscontainer-card'>
            <div className='top-of-jobcarddetail'>
              <img
                src={jobdetails.company_logo_url}
                alt='job details company logo'
                className='company-image'
              />
              <div>
                <h1 className='heading'>{jobdetails.title}</h1>
                <div className='align-rating'>
                  <div className='goldcolor'>
                    <FaStar />
                  </div>
                  <p className='middle-of-para'>{jobdetails.rating}</p>
                </div>
              </div>
            </div>
            <div className='middle-jobdeatilcard'>
              <div className='middle-gobdetail-incard'>
                <MdLocationOn />
                <p className='middle-of-para'>{jobdetails.location}</p>
                <MdWork />
                <p className='middle-of-para'>{jobdetails.employment_type}</p>
              </div>
              <p>{jobdetails.package_per_annum}</p>
            </div>
            <hr />
            <div className='middle-jobdeatilcard'>
              <h1 className='heading'>Description</h1>
              <a id='' href={jobdetails.company_website_url} target='_blank'>
                Visit
              </a>
            </div>
            <p>{jobdetails.job_description}</p>
            <h1>Skills</h1>
            <ul className='skillsaligning'>
              {skills.map(eachone => (
                <li key={eachone.name} className='list-of-skills'>
                  <img
                    src={eachone.image_url}
                    alt={eachone.name}
                    className='skillsimage'
                  />
                  <p>{eachone.name}</p>
                </li>
              ))}
            </ul>
            <div>
              <h1>Life at Company</h1>
              <div className='bottom-jobItem'>
                <p className='lifecompanypara'>{description}</p>
                <img
                  src={imageurl}
                  alt='life at company'
                  className='lifeatcompanyimage'
                />
              </div>
            </div>
          </div>
          <h1 className='headind-similar'>Similar Jobs</h1>
          <ul className='ul-in-similar'>
            {similar.map(item => (
              <Similarcard key={item.id} value={item} />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default JobItemDetails
