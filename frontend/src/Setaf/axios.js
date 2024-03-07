import axios from "axios";

const url="http://localhost:1234"


export const journalRecords=async(empId)=>{
    let res;
try{
    res=await axios.get(`${url}/journal/journallist/${empId}`)
}
catch(e){
    console.log(e);
}
    
    // console.log(res.data.rows)
    return res
}



export const conferenceRecords=async(empId)=>{
    let res;
    try{
     res=await axios.get(`${url}/conference/conferencelist/${empId}`)
   }
   catch(e){
    console.log(e);
   }
    // console.log(res.data.rows)
    return res
}

export const workshopRecords=async(empId)=>{
    const res=await axios.get(`${url}/Workshop/workshoplist/${empId}`)
    console.log(res.data.rows)
    return res
}

export const techtalkRecords=async(empId)=>{
    const res=await axios.get(`${url}/techtalks/techtalklist/${empId}`)
    console.log(res.data.rows)
    return res
}

export const facultyRecords=async(empId)=>{
    const res=await axios.get(`${url}/faculty/facultylist/${empId}`)
    console.log(res.data.rows)
    return res
}

export const proposalRecords=async(empId)=>{
    const res=await axios.get(`${url}/proposal/proposallist/${empId}`)
    console.log(res.data.rows)
    return res
}

export const tasteRecords=async(empId)=>{
    const res=await axios.get(`${url}/taste/tastelist/${empId}`)
    console.log(res.data.rows)
    return res
}

export const industryRecords=async(empId)=>{
    const res=await axios.get(`${url}/industry/industrylist/${empId}`)
    console.log(res.data.rows)
    return res
}

export const seedRecords=async(empId)=>{
    const res=await axios.get(`${url}/seed/seedlist/${empId}`)
    console.log(res.data.rows)
    return res
}