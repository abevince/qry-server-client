import * as React from 'react'
import { useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import LoadingScreen from '../components/LoadingScreen'
import { API_URL } from '../constants'
interface TParams {
  questId: string
}

interface TSchool {
  id: number
  schoolname: string
  schoolid: string
  program: string
  status: boolean
}
function fetchSchool(questId: string): Promise<TSchool[]> {
  return fetch(`${API_URL}/schools/${questId}`)
    .then((res) => res.json())
    .catch((error) => error)
}
const SchoolsPage = () => {
  const params = useParams<TParams>()
  const { isLoading, data, error } = useQuery<TSchool[]>(
    ['schools', params.questId],
    () => fetchSchool(params.questId),
  )
  if (isLoading) {
    return <LoadingScreen />
  }
  if (error) {
    return (
      <div className="bg-gray-200 min-h-screen w-full flex justify-center items-center">
        No school available
      </div>
    )
  }

  return (
    <div className="bg-gray-200 min-h-screen w-full flex justify-center pt-16">
      <div className="w-full p-2 md:w-2/3 ">
        <Link
          to="/"
          className="text-blue-600 bg-white px-4 py-2 rounded-lg hover:bg-blue-200 active:bg-blue-50"
        >
          {'Home'}
        </Link>
        <ul className="space-y-2 mt-4">
          {!data
            ? null
            : data.map((school) => (
                <li key={school.id}>
                  <Link
                    to={`/result/${params.questId}/${school.schoolid}`}
                    className="block bg-white py-2 px-3 rounded-lg hover:bg-gray-100"
                  >
                    <p className="text-xs font-medium text-yellow-600 opacity-80">
                      {school.program}
                    </p>
                    <p className="text-lg text-gray-700 font-medium tracking-wide">
                      {school.schoolname}
                    </p>
                    <p className="text-xs font-light text-blue-600 opacity-60">
                      {school.schoolid}
                    </p>
                  </Link>
                </li>
              ))}
        </ul>
      </div>
    </div>
  )
}

export default SchoolsPage
