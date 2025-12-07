import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});


export const fetchPosts = async (pageNumber) => {
  const res =  await api.get(`/posts?_start=${pageNumber}&_limit=3`);
  return res.status === 200 ? res.data : [];
}

export const fetchInvPost = async (id) => {
   try {
    const res = await api.get(`/posts/${id}`);
    return res.status === 200 ? res.data : [];
   } catch (error) {
    console.log(error);
   }
}

export const deletePost = (id) => {
  return api.delete(`/posts/${id}`);
}
export const updatePost = (id) => {
  return api.patch(`/posts/${id}`,{title: "I have updated"});
}