import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const CryptoNewsHeaders = {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_NEWS_HOST,
}

const baseUrl = process.env.REACT_APP_RAPID_API_NEWS_URL;

const createRequest = (url) => ({ url, headers: CryptoNewsHeaders })

export const CryptoNewsApi = createApi({
    reducerPath: 'CryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({ newsCategory, count }) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
        })
    })
});

export const { useGetCryptoNewsQuery }  = CryptoNewsApi;