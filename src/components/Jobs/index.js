import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import Jobscard from '../Jobscard'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const results = {
  success: 'success',
  failure: 'failure',
  loading: 'loading',
  initial: 'initial',
}

class Jobs extends Component {
  state = {
    employmenttype: [],
    packagerange: [],
    search: '',
    name: '',
    imageurl: '',
    bio: '',
    listofjobs: [],
    profilecard: results.initial,
    jobsdisplaying: results.initial,
  }


  componentDidMount() {
    this.renderingprofile()
    this.rendering()
  }
  renderingprofile = async () => {
    this.setState({
      profilecard: results.loading,
    })
    const auth = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
      method: 'GET',
    }

    const response = await fetch('https://apis.ccbp.in/profile', options)
    if (response.ok === true) {
      this.setState({profilecard: results.success})
      const data = await response.json()
      const {profile_details} = data

      this.setState({
        name: profile_details.name,
        imageurl: profile_details.profile_image_url,
        bio: profile_details.short_bio,
      })
    } else {
      this.setState({profilecard: results.failure})
    }
  }
  rendering = async () => {
    this.setState({
      jobsdisplaying: results.loading,
    })

    const {employmenttype, packagerange, search} = this.state
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmenttype.join(
      ',',
    )}&minimum_package=${packagerange.join(',')}&search=${search}`
    const auth1 = Cookies.get('jwt_token')
    const optionsof = {
      headers: {
        Authorization: `Bearer ${auth1}`,
      },
      method: 'GET',
    }

    const responesofjobs = await fetch(url, optionsof)

    if (responesofjobs.ok === true) {
      this.setState({jobsdisplaying: results.success})
      const dataofjobs = await responesofjobs.json()
      const {jobs} = dataofjobs
      const updatingkeys = jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      console.log(updatingkeys)
      this.setState({listofjobs: updatingkeys})
    } else {
      this.setState({jobsdisplaying: results.failure})
    }
  }
  filterPackage = values => {
    this.setState(
      previous => ({
        packagerange: [...previous.packagerange, values],
      }),
      this.rendering,
    )
  }

  filterEmploymentType = values => {
    this.setState(
      previous => ({
        employmenttype: [...previous.employmenttype, values],
      }),
      this.rendering,
    )
  }
  successcard = () => {
    const {bio, imageurl, name} = this.state
    return (
      <div className="card-profile">
        <img src={imageurl} alt="profile" />
        <h1 className="profile-heading">{name}</h1>
        <p className="profile-para">{bio}</p>
      </div>
    )
  }

  loadingjobs = () => {
    return (
      <div className="loader-container aligning-loader" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    )
  }

  loadingcard = () => {
    return (
      <div className="loader-container aligning-loader" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    )
  }

  retrytheurl = () => {
    this.renderingprofile()
  }

  failurecard = () => {
    return <button onClick={this.retrytheurl}>Retry</button>
  }
  retrytheurlforjobs = () => {
    this.rendering()
  }

  failuretoretrivejob = () => {
    return (
      <div className="jobcontentalignment">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for</p>
        <button onClick={this.retrytheurlforjobs}>Retry</button>
      </div>
    )
  }

  nojobsoffilters = () => {
    return (
      <div className="jobcontentalignment">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1>No Jobs Found</h1>
        <p>We could not find any jobs. Try other filters.</p>
      </div>
    )
  }

  morejobs = () => {
    const {listofjobs} = this.state
    return (
      <ul>
        {listofjobs.map(Item => (
          <Jobscard key={Item.id} value={Item} />
        ))}
      </ul>
    )
  }
  typrofSal = () => {
    const {filterPackage} = this.state

    return (
      <ul className="ul-in-left">
        {salaryRangesList.map(eachItem => {
          const clickedCheckboxofsaleryrange = () => {
            filterPackage(eachItem.salaryRangeId)
          }

          return (
            <li key={eachItem.salaryRangeId} className="lival">
              <input
                type="checkbox"
                onChange={clickedCheckboxofsaleryrange}
                id={eachItem.salaryRangeId}
                value={eachItem.salaryRangeId}
              />
              <label htmlFor={eachItem.salaryRangeId}>{eachItem.label}</label>
            </li>
          )
        })}
      </ul>
    )
  }

  typeofemp = () => {
    const {filterEmploymentType} = this.state

    return (
      <ul className="ul-in-left">
        {employmentTypesList.map(eachItem => {
          const clickedCheckboxoftypeemployment = () => {
            filterEmploymentType(eachItem.employmentTypeId)
          }

          return (
            <li key={eachItem.employmentTypeId} className="lival">
              <input
                type="checkbox"
                onChange={clickedCheckboxoftypeemployment}
                id={eachItem.employmentTypeId}
                value={eachItem.employmentTypeId}
              />
              <label htmlFor={eachItem.employmentTypeId}>
                {eachItem.label}
              </label>
            </li>
          )
        })}
      </ul>
    )
  }

  successretrivejobs = () => {
    const {listofjobs} = this.state
    return listofjobs.length > 0 ? this.morejobs() : this.nojobsoffilters()
  }
  searched = event => {
    this.setState({search: event.target.value})
  }

  typeofissearched = () => {
    this.rendering()
  }

  render() {
    const {input} = this.state
    let displayingcard
    let jobsdispalyincards
    const {profilecard, jobsdisplaying} = this.state
    switch (jobsdisplaying) {
      case results.success:
        jobsdispalyincards = this.successretrivejobs()
        break
      case results.failure:
        jobsdispalyincards = this.failuretoretrivejob()
        break
      case results.loading:
        jobsdispalyincards = this.loadingjobs()
        break
    }

    switch (profilecard) {
      case results.success:
        displayingcard = this.successcard()
        break
      case results.failure:
        displayingcard = this.failurecard()
        break
      case results.loading:
        displayingcard = this.loadingcard()
        break
    }
    return (
      <div className="jobs-container">
        <Header />
        <div className="aligning-jobs-section">
          <div className="left-item">
            {displayingcard}
            <div className="leftcard-container">
              <hr className="hr" />
              <h1 className="heading-in-left-card">Type of Employment</h1>
              {this.typeofemp()}
              <hr className="hr" />
              <h1 className="heading-in-left-card">Salary Range</h1>
              {this.typrofSal()}
            </div>
          </div>
          <div className="right-item">
            <div className="bottom-ofnave">
              <input
                type="search"
                onChange={this.searched}
                className="searchbarofclass"
                value={input}
              />
              <button
                type="button"
                data-testid="searchButton"
                onClick={this.typeofissearched}
                className="searchButton-ofmain-page"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {jobsdispalyincards}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
