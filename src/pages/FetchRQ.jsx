import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../API/api";

export const FetchRQ = () => {
      const getPostData = async () => {
        try {
          const res = await fetchPosts();
          return res.status === 200 ? res.data : [];
        } catch (error) {
          console.log(error);
          return [];
        }
      }
    
    //   useEffect(() => {
    //     getPostData();
    //   }, [])

    const {data} = useQuery({
        queryKey:["posts"],
        queryFn: getPostData,
    })
    
      return (
        <div>
          <ul className="section-accordion">
            {
              data?.map((curElem) =>{
    
                const {id,title,body} = curElem;
                return(
                  <li key={id}>
                    <p>{title}</p>
                    <p>{body}</p>
                  </li>
                )
              })
            }
          </ul>
        </div>
      )
}