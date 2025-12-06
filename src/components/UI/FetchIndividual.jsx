import { useQuery } from "@tanstack/react-query"
import { fetchInvPost } from "../../API/api"
import { useParams } from "react-router-dom"

export const FetchIndividual = () => {

    const { id } = useParams();

    const { data, isPending, isError, error } = useQuery({
        queryKey: ["post"],
        queryFn: () => fetchInvPost(id),
    })

    if (isPending) return <p>Loading....</p>
    if (isError) return <p>Error : {error.message || "Something went wrong"}</p>

    return(
        <div>
            <div className="section-accordion">
                <h1>Post Detail - {id}</h1>
                <div>
                    <p>Id:{data.id}</p>
                    <p>Title:{data.title}</p>
                    <p>Body:{data.body}</p>
                </div>
            </div>``
        </div>
    )
}