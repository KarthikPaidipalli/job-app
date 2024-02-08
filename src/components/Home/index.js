import './index.css'
import {Link} from 'react-router-dom'
import Header from '../Header'

const Home = () => {
  return (
    <div className="home-container">
      <Header />
      <div>
        <div className="home-aligning-top">
          <h1 className="headinfg-top-home">
            Find The Job That Fits Your Life
          </h1>
          <p className="para-top-home">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <Link to="/jobs">
            <button className="buttons-to-find">Find Jobs</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
