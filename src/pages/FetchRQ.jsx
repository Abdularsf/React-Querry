import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../API/api";
import { NavLink } from "react-router-dom";

export const FetchRQ = () => {

    const { data, isPending, isError, error } = useQuery({
        queryKey: ["posts"],
        queryFn: fetchPosts,
    })

    if (isPending) return <p>Loading....</p>
    if (isError) return <p>Error : {error.message || "Something went wrong"}</p>

    return (
        <div>
            <ul className="section-accordion">
                {
                    data?.map((curElem) => {

                        const { id, title, body } = curElem;
                        return (
                            <li key={id}>
                                <NavLink to={`${id}`}>
                                    <p>{id}</p>
                                    <p>{title}</p>
                                    <p>{body}</p>
                                </NavLink>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}