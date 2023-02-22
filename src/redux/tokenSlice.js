import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API } from '../api';


export const getTokenFunction = createAsyncThunk(
    'getToken',
    async  ({data,navigate},{dispatch}) =>{
        const response = await fetch(API.users.login, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          if (response.ok) {
            const result = await response.json();
            localStorage.setItem("token", result.token);
            navigate("/NewsPage");
            dispatch(getTokenReducer(result.token))
           
          } else {
            alert("Incorrect nickname or password");
          }
    }
)
const token = localStorage.getItem('token');
const initialState = {
    token: token,
}
export const tokenSlice = createSlice({
    name: "token",
    initialState,
    reducers: {
        getTokenReducer: (state,action)=>{
            state.token = action.payload
        }
    }
}) 
export const {getTokenReducer} = tokenSlice.actions
export default tokenSlice.reducer