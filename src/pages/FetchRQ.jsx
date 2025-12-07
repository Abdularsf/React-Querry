import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deletePost, fetchPosts, updatePost } from "../API/api";
import { NavLink } from "react-router-dom";
import { useState } from "react";

export const FetchRQ = () => {

    const [pageNumber,setPageNumber] = useState(0);
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn : (id) => deletePost(id),
        onSuccess : (data,id) => {
            queryClient.setQueriesData(["posts",pageNumber],(curElem) => {
                return curElem?.filter((post) =>{
                    return post.id != id;
                })
            });
        },
    })
    const updateMutation = useMutation({
        mutationFn : (id) => updatePost(id),
        onSuccess : (apiData,postId) => {
            queryClient.setQueriesData(["posts",pageNumber],(curElem) => {
                return curElem?.map((curPost) =>{
                    return curPost.id == postId ? {...curPost , title : apiData.data.title} : curPost;
                })
            });
        },
    })

    const { data, isPending, isError, error } = useQuery({
        queryKey: ["posts",pageNumber],
        queryFn: () => fetchPosts(pageNumber),
        placeholderData: keepPreviousData,
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
                                <button onClick={() => deleteMutation.mutate(id)}>Delete</button>
                                <button onClick={() => updateMutation.mutate(id)}>update</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div className="pagination-section container">
                <button onClick={() => setPageNumber((prev) => prev-3)}>Prev</button>
                <p>{(pageNumber/3) + 1}</p>
                <button onClick={() => setPageNumber((prev) => prev+3)}>Next</button>
            </div>
        </div>
    )
}