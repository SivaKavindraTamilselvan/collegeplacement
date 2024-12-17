import React from 'react'
import { Fragment } from 'react'
import { InterviewApplicationList } from './interviewuser'
import { Navbar } from '../../components/NavBar/navbar'
export const Inter = () => {
  return (
    <Fragment>
        <Navbar/>
        <InterviewApplicationList/>
    </Fragment>
  )
}
