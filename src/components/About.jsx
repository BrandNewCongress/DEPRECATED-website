import React from 'react'
import Link from 'react-router/lib/Link';
import TeamMember from './TeamMember'
import PageWrapper from './PageWrapper'
import team from '../data/team'

export default () => (

  <PageWrapper>
    <h2>Who's proposing this?</h2>

    <p>
      We're a group of people who got tired of the partisan politics we were seeing in the news.
      We saw the problems we were facing as a nation, and we just wanted to see solutions. If our
      current congress wasn't going to do it, we decided we will. Then we'll present that solution
      to the American people for a vote during the 2018 mid-term elections. Find out more by reading
      our <Link to='/plan'>Plan</Link>. If you'd like updates or to get
      involved, <Link to="/home#sign-up">please sign up</Link> and someone from Brand New Congress will be in touch.
    </p>

    {
      team.map((teamMember, index) => <TeamMember key={index} teamMember={teamMember} />)
    }
  </PageWrapper>
)
