import { useParams } from "react-router"

export function JobDetail() {
  const { id } = useParams()

  return(
    <>
    <h1>Job Detail</h1>
    <h2>La id es {id}</h2>
    </>
  )
}