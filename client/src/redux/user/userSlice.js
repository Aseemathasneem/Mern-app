import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser : null,
    loading : false,
    error:false,
    userData: []
    
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        signInstart :(state)=>{
            state.loading= true
        },
        signInSuccess : (state,action)=>{
            state.currentUser =action.payload;
            state.loading =false;
            state.error =false;
        },
        signInFailure:(state,action)=>{
            state.loading= false;
            state.error = action.payload;
        },
        updateUserStart: (state) => {
            state.loading = true;
          },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
          },
          updateUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
          },
          deleteUserStart: (state) => {
            state.loading = true;
          },
          deleteUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
          },
          deleteUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
          },
          signOut: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
          },
          updateUserDataStart: state => {
            state.loading = true;
            state.error = null;
          },
          updateUserDataSuccess: (state, action) => {
            state.userData = action.payload;
            state.loading = false;
            state.error = null;
          },
          updateUserDataFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
          }
         
          
    }
})

export const {signInstart,signInSuccess,signInFailure,
     updateUserStart,updateUserSuccess,updateUserFailure,
    deleteUserStart,deleteUserSuccess,deleteUserFailure,signOut,
    updateUserDataStart, updateUserDataSuccess, updateUserDataFailure } =userSlice.actions
export default userSlice.reducer;