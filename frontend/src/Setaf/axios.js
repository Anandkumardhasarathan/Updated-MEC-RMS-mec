import axios from "axios";

const url="http://localhost:1234"


export const journalRecords=async(empId)=>{
    let res;
try{
    res=await axios.get(`${url}/setaf/journallist/${empId}`)
}
catch(e){
    console.log(e);
}
    
    // console.log(res.data.rows)
    return res
}
///hod view
export const journalRecordsDept=async(deptID)=>{
    let res;
try{
    res=await axios.get(`${url}/setaf/journallist/hoddashboard/${deptID}`)
}
catch(e){
    console.log(e);
}
    
    // console.log(res.data.rows)
    return res
}
///principal view
export const journalPrincipalView=async()=>{
    let res;
try{
    res=await axios.get(`${url}/setaf/journalrecs`)
}
catch(e){
    console.log(e);
}
    
    // console.log(res.data.rows)
    return res
}




///conference
export const conferenceRecords=async(empId)=>{
    let res;
    try{
     res=await axios.get(`${url}/setaf/conferencelist/${empId}`)
   }
   catch(e){
    console.log(e);
   }
    // console.log(res.data.rows)
    return res
}
////hod view
export const conferenceRecordsDept=async(deptID)=>{
    let res;
try{
    res=await axios.get(`${url}/setaf/conferencelist/hoddashboard/${deptID}`)
}
catch(e){
    console.log(e);
}
    
    // console.log(res.data.rows)
    return res
}

////principalview
export const conferencePrincipalView=async()=>{
    let res;
try{
    res=await axios.get(`${url}/setaf/conferencerecs`)
}
catch(e){
    console.log(e);
}
    
    // console.log(res.data.rows)
    return res
}



///workshop
export const workshopRecords=async(empId)=>{
    const res=await axios.get(`${url}/setaf/workshoplist/${empId}`)
    console.log(res.data.rows)
    return res
}


export const techtalkRecords=async(empId)=>{
    const res=await axios.get(`${url}/setaf/techtalklist/${empId}`)
    console.log(res.data.rows)
    return res
}

export const facultyRecords=async(empId)=>{
    const res=await axios.get(`${url}/setaf/facultylist/${empId}`)
    console.log(res.data.rows)
    return res
}

export const proposalRecords=async(empId)=>{
    const res=await axios.get(`${url}/setaf/proposallist/${empId}`)
    console.log(res.data.rows)
    return res
}

export const tasteRecords=async(empId)=>{
    const res=await axios.get(`${url}/setaf/tastelist/${empId}`)
    console.log(res.data.rows)
    return res
}

export const industryRecords=async(empId)=>{
    const res=await axios.get(`${url}/setaf/industrylist/${empId}`)
    console.log(res.data.rows)
    return res
}

export const seedRecords=async(empId)=>{
    const res=await axios.get(`${url}/setaf/seedlist/${empId}`)
    console.log(res.data.rows)
    return res
}