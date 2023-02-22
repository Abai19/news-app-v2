import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API } from '../api';


export const getNewsListFunction = createAsyncThunk(
    'getNewsListFunction',
    async  ({token},{dispatch}) =>{
        const response = await fetch(API.posts.newsList, {
            method: "GET",
            headers: {
              Authorization: `Token ${token}`,
            },
          });
          const list = await response.json();
          if (list) {
            dispatch(getNewsListReducer(list))
          }
          else {
            alert("что то пошло не так")
          }
    }
)

const initialState = {
    newsList: [],
}
export const newsSlice = createSlice({
    name: "news",
    initialState,
    reducers: {
        getNewsListReducer: (state,action)=>{
            state.newsList = action.payload
        }
    }
}) 
export const {getNewsListReducer} = newsSlice.actions
export default newsSlice.reducer