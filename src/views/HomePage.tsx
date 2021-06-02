import * as React from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import LoadingScreen from '../components/LoadingScreen'
import { API_URL } from '../constants'

interface TQuestionnaire {
  id: number
  questionnaire: string
  program: string
  for_: string
  status: boolean
  curr_school: string
}
function fetchQuestionnaire(): Promise<TQuestionnaire[]> {
  return fetch(`${API_URL}/questionnaires`)
    .then((res) => res.json())
    .catch((error) => error)
}
const HomePage = () => {
  const { isLoading, data, error } = useQuery<TQuestionnaire[]>(
    'questionnaires',
    fetchQuestionnaire,
  )

  if (isLoading) {
    return <LoadingScreen />
  }
  if (error || !data) {
    return (
      <div className="bg-gray-200 min-h-screen w-full flex justify-center items-center">
        No questionnaire available
      </div>
    )
  }
  return (
    <div className="bg-gray-200 min-h-screen w-full flex justify-center pt-20">
      <div className="w-full p-2 md:w-2/3 ">
        <ul className="space-y-2">
          {data.map((item) => (
            <li key={item.id}>
              <Link
                to={`/schools/${item.id}`}
                className="block bg-white py-4 px-5 rounded-lg hover:bg-gray-100"
              >
                <p className="text-sm font-medium text-yellow-600 opacity-80">
                  {item.program}
                </p>
                <p className="text-lg text-gray-700 font-medium tracking-wide">
                  {item.questionnaire}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default HomePage
