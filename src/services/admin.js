import api from '../configs/api'
const addCategory=(data)=>api.post("category",data);

const getCategory=()=>api.get("category");



export {addCategory,getCategory}