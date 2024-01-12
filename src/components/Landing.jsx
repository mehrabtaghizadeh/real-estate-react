import React from 'react'
import SearchBarHomePage from './SearchBarHomePage'
function Landing() {
  return (
    <div className='landing'>
        <div className='landing-text'>
          <h3>دنبال خونه میگردی؟</h3>
          <p>بیش از 2000+ آگهی در سراسر استان های کشور</p>
        </div>
        <SearchBarHomePage/>
    </div>
  )
}

export default Landing