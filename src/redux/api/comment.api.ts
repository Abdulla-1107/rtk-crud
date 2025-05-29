import { mainApi } from './index'

const extendedApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    getComments: build.query({
      query: (params) => ({
        method: "GET",
        url:  '/comments',
        params
      }),
      providesTags: ['COMMENTS']
    }),
    createComment: build.mutation({
      query: (body) => ({
        method: "POST",
        url: "/comments",
        body
      }),
      invalidatesTags: ["COMMENTS"]
    }),
    deleteComment: build.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/comments/${id}`
      }),
      invalidatesTags: ["COMMENTS"]
    }),
    updateComment: build.mutation({
      query: ({id, body})=> ({
        method:"PATCH",
        url: `/comments/${id}`,
        body
      }),
      invalidatesTags: ["COMMENTS"]
    })
  }),
  overrideExisting: false,
})

export const { useGetCommentsQuery, useCreateCommentMutation, useDeleteCommentMutation, useUpdateCommentMutation } = extendedApi