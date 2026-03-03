import React from "react";
import axios from 'axios'

export const axiosinstance=axios.create({
    baseURL:"http://localhost:5002/api",
    withCredentials:true
})