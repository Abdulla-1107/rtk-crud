import { mainApi } from './index'

const extendedApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    getRecipes: build.query({
      query: (params) => ({
        method: "GET",
        url:  '/recipes',
        params
      }),
    }),
    getSingleResipe: build.query({
        query: (id) => ({
            method: "GET",
            url: `/recipes/${id}`
        })
    }),
    createRecipe: build.mutation({
        query: (body) => ({
            method: "POST",
            url: "/recipe",
            body
        })
    }),
    deleteRecipe: build.mutation({
        query: (id)=> ({
            method: "DELETE",
            url: `/recipes/${id}`
        })
    })

  }),
  overrideExisting: false,
})

export const { useGetRecipesQuery, useCreateRecipeMutation, useGetSingleResipeQuery, useDeleteRecipeMutation } = extendedApi