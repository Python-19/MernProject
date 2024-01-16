import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const candidateProfileApi = createApi({
  reducerPath: "candidateProfileApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:3000/api" }),
  endpoints: (builder) => ({
    saveProfile: builder.mutation({
      query: (candidate) => {
        return {
          url: "resume",
          method: "POST",
          body: candidate,
        };
      },
    }),
    getResumeProfile:builder.query({
      query:()=>{
        return{
          url:"list",
          method:"GET",
        }
      }
    })
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useSaveProfileMutation,useGetResumeProfileQuery } = candidateProfileApi