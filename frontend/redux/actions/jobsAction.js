import { api } from "@/utils/api";
import { API } from "../../config";
import axios from "axios";

export const addJob = ( job ) => async ( dispatch ) => {
  try {
    const res = await api.post( `${API}/job/create`, job );
    dispatch({
      type: "ADD_JOB",
      payload: res.data,
    });
  } catch ( err ) {
    dispatch({
      type: "JOB_ERROR",
      payload: { err },
    });
  }
};

export const jobsByUser = () => async ( dispatch ) => {
  try {
    const res = await api.get( `${API}/jobs/by/user` );
    dispatch({
      type: "GET_USER_JOBS",
      payload: res.data,
    });
  } catch ( err ) {
    dispatch({
      type: "JOB_ERROR",
      payload: { err },
    });
  }
};

export const jobById = ( jobId ) => async ( dispatch ) => {
  try {
    const res = await api.get( `${API}/job/${jobId}` );
    dispatch({
      type: "GET_JOB_BY_ID",
      payload: res.data,
    });
  } catch ( err ) {
    dispatch({
      type: "JOB_ERROR",
      payload: { err },
    });
  }
};

export const updateJob = ( jobId, job ) => async ( dispatch ) => {
  try {
    const res = await api.post( `${API}/job/update/${jobId}`, job );
    dispatch({
      type: "UPDATE_JOB",
      payload: res.data,
    });
  } catch ( err ) {
    dispatch({
      type: "JOB_ERROR",
      payload: { err },
    });
  }
};

export const deleteJob = ( jobId ) => async ( dispatch ) => {
  try {
    const res = await api.put( `${API}/job/delete/${jobId}` );
    dispatch({
      type: "UPDATE_JOB",
      payload: res.data,
    });
  } catch ( err ) {
    dispatch({
      type: "JOB_ERROR",
      payload: { err },
     });
  }
};

export  const getJobs = ( page= 0 , params ) => async (dispatch) => {
  try {
    const res = await api.get(
      `${API}/jobs/list/${page}${params}`
    );
    dispatch({
      type: "GET_JOBS",
      payload: res.data,
    });
  } catch (err) {
    dispatch({  
      type: "JOBS_ERROR",
    });
  }  
};
