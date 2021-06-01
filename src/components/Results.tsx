import * as React from 'react'
import MultiChoiceResult, { TMultiChoiceResult } from './MultiChoiceResult'
import RankResult, { TRankResult } from './RankResult'
import { API_URL } from '../constants'
import LoadingScreen from './LoadingScreen'

interface Props {
  questId: number
  schoolId: string
}
interface TSchool {
  id: number
  schoolname: string
  schoolid: string
  program: string
  status: boolean
}
interface TQuestionnaire {
  id: number
  questionnaire: string
  program: string
  for_: string
  status: boolean
  curr_school: string
}

interface TResult {
  questionnaire?: TQuestionnaire
  school?: TSchool
  result: (TMultiChoiceResult | TRankResult | null)[]
}
type TResults = {}
function Results({ questId, schoolId }: Props) {
  const [data, setData] = React.useState<TResult>({
    questionnaire: undefined,
    school: undefined,
    result: [],
  })
  const [loading, setLoading] = React.useState<boolean>(true)
  React.useEffect(() => {
    if (questId && schoolId) {
      fetch(`${API_URL}/results/${questId}/${schoolId}`)
        .then((res) => res.json())
        .then((data) => {
          setData(data)
          setLoading(false)
        })
    }
  }, [questId, schoolId])

  if (loading) {
    return <LoadingScreen />
  }
  if (!data) {
    return (
      <div className="bg-gray-200 min-h-screen w-full flex justify-center items-center">
        No data available
      </div>
    )
  }
  return (
    <div className="bg-gray-200 min-h-screen w-full flex justify-center pt-16">
      <div className="w-full p-2 md:w-2/3 space-y-4">
        {data?.result.map((item) => {
          if (item?.type_id === 3 || item?.type_id === 4) {
            return (
              <MultiChoiceResult
                key={item.question_id}
                data={item as TMultiChoiceResult}
              />
            )
          } else if (item?.type_id === 6) {
            return (
              <RankResult key={item?.question_id} data={item as TRankResult} />
            )
          } else if (!item) {
            return null
          }
        })}
      </div>
    </div>
  )
}

export default Results
