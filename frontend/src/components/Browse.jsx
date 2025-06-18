import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import useGetAllJobs from '@/hooks/useGetAllJobs'

const Browse = () => {
  useGetAllJobs()
  const { allJobs } = useSelector(store => store.job)
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""))
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 text-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-semibold mb-6 text-black">
          Search Results <span className="text-blue-400">({allJobs.length})</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allJobs.map((job) => (
            <Job key={job._id} job={job} />
          ))}
        </div>

        {allJobs.length === 0 && (
          <div className="mt-10 text-center text-gray-400 text-lg">
            No jobs found. Try adjusting your search.
          </div>
        )}
      </div>
    </div>
  )
}

export default Browse
