import React, { useState} from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import "./SetafAddForm.css"

export const Journalfront=()=>{

    const[journal,setjournal]=useState({
        "dept_id":"",
        "academic_year":"",
        "semester":"",
        "department":"",
        "name_of_author":"",
        "title_of_paper":"",
        "name_of_journal":"",
        "year_of_publication":"",
        "month_of_publication":"",
        "issn_number":"",
        "volume_no":"",
        "issue_no":"",
        "page_no":"",
        "journal_listed_in":"",
        "link_to_website_of_journal":"",
        "journal_first_page_PDF":""
        })
    
      console.log(journal)
      const navigate = useNavigate()
      const [newFileName, setNewFileName] = useState('');


       ////image and pdf upload 
       const [selectedFile1, setSelectedFile1] = useState(null);
    const handleFileChange1 = (e) => {
 
    setNewFileName(journal.name_of_author);
        const file = e.target.files[0];
        if (file && file.size > 500 * 1024) {
        alert("Please choose an image with a size below 500kb.");
        e.target.value = null; // Reset the file input
        return;
        }
        else{
        
          // alert("handle upload working")
        const currentDate = new Date();
        const dd = String(currentDate.getDate()).padStart(2, '0');
        const mm = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
        const yyyy = currentDate.getFullYear();
        
        const hh = String(currentDate.getHours()).padStart(2, '0');
        const min = String(currentDate.getMinutes()).padStart(2, '0');
        const ss = String(currentDate.getSeconds()).padStart(2, '0');
        
        const dateTimeString = `${dd}-${mm}-${yyyy}_${hh}-${min}-${ss}`;
         // Maximum value for the random number
        let random =Math.random()*Math.random()*1;
        const name1=journal.name_of_journal+'_journal_'+dateTimeString+'_'+random+'.pdf';
       
        setjournal((old)=>{
        return{
        ...old,
        journal_first_page_PDF:name1
        }
        });
        
        }
        setSelectedFile1(e.target.files[0]);

        
        // call();
      }


const call=async()=>{
  if(selectedFile1){
    // setLoading(true);
    const formData6 = new FormData();
  formData6.append('file', selectedFile1, journal.journal_first_page_PDF);
  fetch('http://localhost:1234/setaf/uploadPdf', {
    method: 'POST',
    body: formData6,
  })
    .then((response) => {
      if (!response.ok) {
        // Check if the response status is 400
        if (response.status === 400) {
          // You can parse the response JSON to get more details about the error
          return response.json().then((errorData) => {
            throw new Error(`Bad Request: ${JSON.stringify(errorData)}`);
          });
        } else {
          // For other errors, throw a general error
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      }
      return response.text();
    })
    .then((data) => {
      // alert(formData.pdf)
      alert(data);
      setFile(false)
      
    })
    .catch((error) => {
      console.error('Error uploading the PDF:', error);
      alert('Error uploading the PDF: ' + error.message);
    });
    // setLoading(false)
  }
  else{
    alert("Error")
  }
  // window.location.reload(false);
}
    
 ////////
      const log=JSON.parse(sessionStorage.getItem('person'));
      
      const infoCollect=(eve)=>{
        setjournal((old)=>{
          return {
            ...old,
            dept_id:log.dept_id
          }
        })
        const{name,value}=eve.target
        setjournal((old)=>{
            if(name==="academic_year"||name==="semester"||name==="department"||name==="name_of_author"||name==="title_of_paper"||name==="name_of_journal"||name==="year_of_publication"||name==="month_of_publication"||name==="issn_number"||name==="volume_no"||name==="issue_no"||name==="page_no"||name==="journal_listed_in"||name==="link_to_website_of_journal"||name==="journal_first_page_pdf"){
                return{
                    ...old,
                    [name]:value
                }
            }
            else if(name==="s_no"){
                // fillPorposals(value)
                return{
                    ...old,
                    [name]:parseInt(value)
                }
            }
            else{
                return{
                    ...old,
                    [name]:parseInt(value),
                   
                }
            }
        })   
       
    }
    const Submit=async()=>{
      try{
            
        // const log=JSON.parse(sessionStorage.getItem('person'));
        await axios.post(`http://localhost:1234/setaf/journalnewrecord/${log.faculty_id}`,journal)
        navigate("/setaf/journalpublication")
        }
    catch(err){
          alert(err)
        }
        
    }
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(true);
   
    return(
        <>
        <div className='overallcontent' style={{maxWidth:"50%",marginLeft:"25%"}}>
        <div className="style" style={{justifyContent:"center",marginLeft:"100px"}}>
        <div class="head"><h1 class="recent-Articles" style={{color:'purple',marginLeft:"70px"}}>JOURNAL PUBLICATIONS</h1></div>
        <div className="row justify-content-center"style={{justifyContent:'center'}}>
        <div className="ej">
            <label>Academic Year</label>
            <select name="academic_year" value={journal.academic_year} onChange={infoCollect}>
              <option value="">Select The Academic Year</option>
              <option value="2022-23">2022-23</option>
              <option value="2023-24">2023-24</option>
            </select>

            <label>Semester</label>
            <select name='semester' onChange={infoCollect} value={journal.semester}>
                <option >Select the Semester</option>
                <option >Odd Sem</option>
                <option >Even Sem</option>
            </select>

            <label>Department</label>
            <input type='text' placeholder='Enter the Department' name='department' value={journal.department} onChange={infoCollect}/>

            <label>Name of the Author's</label>
            <input type="text" placeholder="Enter the Author's Name" name='name_of_author' onChange={infoCollect} value={journal.name_of_author}/>
            
            <label>Title of Paper</label>
            <input type='text' placeholder='Title of Paper' name='title_of_paper' onChange={infoCollect} value={journal.title_of_paper}/>

            <label>Name of Journal</label>
            <input type="text" placeholder="Enter the Journal Name" name='name_of_journal' onChange={infoCollect} value={journal.name_of_journal}/>

            <label>Year of Publication</label>
            <input type="text" placeholder="Enter the Year" name='year_of_publication' onChange={infoCollect} value={journal.year_of_publication}/>

            <label>Month of Publication</label>
            <input type="text" placeholder="Enter the Month" name='month_of_publication' onChange={infoCollect} value={journal.month_of_publication}/>

            <label>ISSN Number</label>
            <input type="text" placeholder="Enter the Number" name='issn_number' onChange={infoCollect} value={journal.issn_number}/>

            <label>Volume No</label>
            <input type="text" placeholder="Enter the Number" name='volume_no' onChange={infoCollect} value={journal.volume_no}/>

            <label>Issue No</label>
            <input type="text" placeholder="Enter the Number" name='issue_no' onChange={infoCollect} value={journal.issue_no}/>

            <label>Page No</label>
            <input type="text" placeholder="Enter the Number" name='page_no' onChange={infoCollect} value={journal.page_no}/>

            <label>Journal listed in</label>
            <select name='journal_listed_in' onChange={infoCollect} value={journal.journal_listed_in}>
                <option value="">Select the Journal</option>
                <option>SCI</option>
                <option>Scopus</option>
                <option>WoS</option>
                <option>Others</option>
            </select>

            <label>Link to Website of the Journal</label>
            <input type="text" placeholder="Enter the Link" name='link_to_website_of_journal' onChange={infoCollect} value={journal.link_to_website_of_journal}/>

                <option>UGC CARE</option>
              {file&&(<div>
                <label>Journal First Page - PDF</label>
          <input type="file" onChange={handleFileChange1}  id="event" name="pdf" accept = "application/pdf"/>
          <button onClick={call}>Upload</button>
              </div>)}
         
           {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <div>Loading...</div>
        </div>
      )}
            <br />
        </div>
        
        <div style={{marginRight:"100px"}} className='row mt-5 justify-content-around'>
          <input type='button' onClick={Submit} value="Submit"  className='col-3 btn btn-primary' />
          
          <input type='button' onClick={()=>{}} value="Clear" className='col-3 btn btn-danger' />
        
        </div>  
        </div>
        </div>
        </div>
        </>
    )
}


//conference
export const Conferencefront=()=>{

    const[conference,setconference]=useState({
        "dept_id":"",
        "academic_year":"",	
        "semester":"",	
        "department":"",
        "name_of_the_authors":"",
        "title_of_the_conference_paper":"",
        "name_of_the_conference":"",
        "place_of_the_conference":"",
        "conference_type":"",
        "date_of_conference":"",
        "isbn_of_the_conference_proceeding":"",
        "conference_certificate_and_proceeding_pdf":""	
      })
        
      console.log(conference)
      const navigate = useNavigate()
      const [newFileName, setNewFileName] = useState('');
      const [loading, setLoading] = useState(false);
      const [file, setFile] = useState(true);

       ////image and pdf upload 
       const [selectedFile1, setSelectedFile1] = useState(null);
    const handleFileChange1 = (e) => {
 
    setNewFileName(conference.name_of_the_conference);
        const file = e.target.files[0];
        if (file && file.size > 2 * 1024 * 1024) {
        alert("Please choose an image with a size below 2MB.");
        e.target.value = null; // Reset the file input
        return;
        }
        else{
        
          // alert("handle upload working")
        const currentDate = new Date();
       
        const dd = String(currentDate.getDate()).padStart(2, '0');
        const mm = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
        const yyyy = currentDate.getFullYear();
        
        const hh = String(currentDate.getHours()).padStart(2, '0');
        const min = String(currentDate.getMinutes()).padStart(2, '0');
        const ss = String(currentDate.getSeconds()).padStart(2, '0');
        
        const dateTimeString = `${dd}-${mm}-${yyyy}_${hh}-${min}-${ss}`;
         // Maximum value for the random number
        let random =Math.random()*Math.random()*1;
        const name1=conference.name_of_the_conference+'_conference_'+dateTimeString+'_'+random+'.pdf';
       
        setconference((old)=>{
        return{
        ...old,
        conference_certificate_and_proceeding_pdf:name1
        }
        });
        
        }
        setSelectedFile1(e.target.files[0]);

        
        // call();
      }


const call=async()=>{
  if(selectedFile1){
    // setLoading(true);
    const formData6 = new FormData();
  formData6.append('file', selectedFile1, conference.conference_certificate_and_proceeding_pdf);
  fetch('http://localhost:1234/conference/uploadPdf', {
    method: 'POST',
    body: formData6,
  })
    .then((response) => {
      if (!response.ok) {
        // Check if the response status is 400
        if (response.status === 400) {
          // You can parse the response JSON to get more details about the error
          return response.json().then((errorData) => {
            throw new Error(`Bad Request: ${JSON.stringify(errorData)}`);
          });
        } else {
          // For other errors, throw a general error
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      }
      return response.text();
    })
    .then((data) => {
      // alert(formData.pdf)
      alert(data);
      setFile(false)
      
    })
    .catch((error) => {
      console.error('Error uploading the PDF:', error);
      alert('Error uploading the PDF: ' + error.message);
    });
    // setLoading(false)
  }
  else{
    alert("Error")
  }
  // window.location.reload(false);
}
    









      ////////////////////////////
console.log(conference)
const navi=useNavigate()


const log=JSON.parse(sessionStorage.getItem('person'));
const handlechange=(e)=>{
  setconference((old)=>{
    return {
      ...old,
      dept_id:log.dept_id
    }
  })
    setconference((prev)=>({
      ...prev,
      [e.target.name]:e.target.value
    }))
}

    const callPropose=async()=>{
        try{
          const log=JSON.parse(sessionStorage.getItem('person'));
            await axios.post(`http://localhost:1234/setaf/conferencenewrecord/${log.faculty_id}`,conference)
            navi("/conferencepublication")
            }
            catch(err){
              alert("Error in axios")
            }
        //     setconference(()=>{
        //         return{
        //             "academic_year":"",	
        //             "semester":"",	
        //             "department":"",
        //             "name_of_the_authors":"",
        //             "title_of_the_conference_paper":"",
        //             "name_of_the_conference":"",
        //             "place_of_the_conference":"",
        //             "conference_type":"",
        //             "date_of_conference":"",
        //             "isbn_of_the_conference_proceeding":"",
        //             "conference_certificate_and_proceeding_pdf":""	
        //           }
        //     })
         }

    return(
        <>
        <div className='overallcontent'style={{maxWidth:"50%",marginLeft:"25%"}}>
        <div className="style" style={{justifyContent:'center'}}>
        <div class="head"><h1 class="recent-Articles" style={{color:'purple'}}>CONFERENCE PUBLICATIONS AND PRESENTATIONS</h1></div>
        <div className="row justify-content-center"style={{justifyContent:'center'}}>
        <div className="ej">
            <label>Academic Year</label>
            <select  value={setconference.academic_year} onClick={handlechange}  name='academic_year' >
                <option >--</option>
                <option >2022-23</option>
                <option >2023-24</option>
            </select>

            <label>Semester</label>
            <select value={setconference.semester} onClick={handlechange}  name='semester'>
                <option >--</option>
                <option>Odd Sem</option>
                <option>Even Sem</option>
            </select>
         
            <label>Department</label>
            <input type="text" placeholder="Enter the Department" value={setconference.department} name='department' onChange={(e)=>handlechange(e)}/>

            <label>Name of the Author's</label>
            <input type="text" placeholder="Enter the Name" value={setconference.name_of_the_authors} name='name_of_the_authors' onChange={handlechange}/>

            <label>Title of the Conference Paper</label>
            <input type="text" placeholder="Enter the Title" value={setconference.title_of_the_conference_paper} name='title_of_the_conference_paper' onChange={handlechange}/>

            <label>Name of the Conference</label>
            <input type="text" placeholder="Enter the Name" value={setconference.name_of_the_conference} name='name_of_the_conference' onChange={handlechange}/>

            <label>Place of the Conference</label>
            <input type="text" placeholder="Enter the Place" value={setconference.place_of_the_conference} name='place_of_the_conference' onChange={handlechange}/>

            <label>Conference Type</label>
            <select value={setconference.conference_type} name='conference_type' onClick={handlechange}>
                <option>Select the Type</option>
                <option >National</option>
                <option >International</option>
            </select>

            <label>Date of Conference</label>
            <input type="date" value={setconference.date_of_conference} name='date_of_conference' onChange={handlechange}/>

            <label>ISBN of the Conference Proceeding</label>
            <input type="text" placeholder="Enter the ISBN" value={setconference.isbn_of_the_conference_proceeding} name='isbn_of_the_conference_proceeding' onChange={handlechange}/>

           
            <option>UGC CARE</option>
              {file&&(<div>
                <label>Conference Certificate and Proceedings - PDF</label>
          <input type="file" onChange={handleFileChange1}   id="event" name="pdf" accept = "application/pdf"/>
          <button onClick={call}>Upload</button>
              </div>)}
         
           {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <div>Loading...</div>
        </div>
      )}
            <br />
        </div>
        
        <div className='row mt-5 justify-content-around'>
          <input type='button' onClick={callPropose} value="Submit" className='col-3 btn btn-primary' />
          <input type='button' onClick={()=>{}} value="Clear" className='col-3 btn btn-danger' />
        </div>
        </div>
        </div>
        </div>
        </>
    )
}

////////////////workshop///////////////////
 export const Workshopfront=()=>{
  
  const [workshop,setworkshop]=useState({
    "subtype":"",
    "name_of_the_faculty":"",
    "designation":"",
    "nature_of_the_program":"",
    "title_of_the_program":"",
    "duration_from":"",
    "duration_to":"",
    "participation":"",
    "name_of_the_organization_and_place":""	,
    "location_of_organization":"",
    "amount_provided_by_the_HEI":"",
    "Certificates_pdf":""	
		
    })
 
console.log(workshop)
const navi=useNavigate()
  const handlechange=(e)=>{
      setworkshop((prev)=>({
        ...prev,
        [e.target.name]:e.target.value
      }))
  }
    
  const handleclick=async(e)=>{
    e.preventDefault()
     try{
      //alert(workshop)
      const log=JSON.parse(sessionStorage.getItem('person'));
      await axios.post(`http://localhost:1234/setaf/workshopnewrecord/${log.faculty_id}  `,workshop)
      navi('/workshop')
    }
  
      catch(err){
      console.log(err)
    } 
    setworkshop(()=>{
        return{
            "subtype":"",
            "name_of_the_faculty":"",
            "designation":"",
            "nature_of_the_program":"",
            "title_of_the_program":"",
            "duration_from":"",
            "duration_to":"",
            "participation":"",
            "name_of_the_organization_and_place":""	,
            "location_of_organization":"",
            "amount_provided_by_the_HEI":"",
            "Certificates_pdf":""	   
            }
    })
  }

  return (
  <>
  
  <div className='overallcontent' style={{maxWidth:"50%",marginLeft:"25%"}}>
        <div className="style" style={{justifyContent:'center'}}>
        <div class="head"><h1 class="recent-Articles" style={{color:'purple'}}>WORKSHOP,SEMINAR,FDPs,SDPs PARTICIPATION</h1></div>
        <div className="row justify-content-center"style={{justifyContent:'center'}}>
        <div className="ej">
                
                  <label>Subtype</label>
                  <select name="subtype" onClick={handlechange} value={setworkshop.subtype}>
                  <option>--</option>
                  <option >Workshop</option>
                  <option >Seminar</option>
                  </select>
                 
                  <label>Name of the Faculty</label>
                  <input type='text' name='name_of_the_faculty'  value={setworkshop.name_of_the_faculty} placeholder=''  onChange={handlechange}/>
                 
               
               
                  <label>Designation </label>
                  <input type='text' name='designation'  value={setworkshop.ndesignation} placeholder=''  onChange={handlechange}/>
                 
               
                  <label> Nature of the program</label>
                  <select name="nature_of_the_program" onClick={handlechange} value={setworkshop.nature_of_the_program}>
                  <option></option>
                  <option >Workshop</option>
                  <option >Seminar</option>
                  <option>FDP</option>
                  <option>SDP</option>
                  <option>STTP</option>
                  <option>Webinar</option>
                  </select>
               
        
                  <label> Title of the program</label>
                  <input type='text' name='title_of_the_program'  value={setworkshop.title_of_the_program} placeholder='' onChange={handlechange}  />
               
               
                  <label> Duration From</label>
                  <input type='date' name='duration_from'  value={setworkshop.duration_from} placeholder='' onChange={handlechange}  />


                  <label> Duration TO</label>
                  <input type='date' name='duration_to'  value={setworkshop.duration_to} placeholder='' onChange={handlechange}  />
           
                
               
                  
                  <label>Participation</label>
                  <select name="participation" onClick={handlechange} value={setworkshop.participation}>
                  <option></option>
                  <option >Internal</option>
                  <option >External</option>
                  </select>
               
                  <label>Name of the organization and place</label>
                  <input type='text' name='name_of_the_organization_and_place' value={setworkshop.name_of_the_organization_and_place} placeholder='' onChange={handlechange}  />
         
                
               
                  <label>Location of organization</label>
                  <input type='text' name='location_of_organization' value={setworkshop.location_of_organization} placeholder='' onChange={handlechange}  />
                 
               
                
                  <label>Amount provided by the HEI</label>
                  <input type='text' name='amount_provided_by_the_HEI' value={setworkshop.amount_provided_by_the_HEI} placeholder='' onChange={handlechange}  />


                   
                  <label>Certificate PDF</label>
                  <input type='file' name='certificate_pdf' value={setworkshop.Certificate_pdf}  placeholder=' Paste Certificate-PDF'onChange={ handlechange}  />
               
               
             
                  </div>
        
        <div className='row mt-5 justify-content-around'>
          <input type='button' onClick={handleclick} value="Submit" className='col-3 btn btn-primary' />
          <input type='button' onClick={()=>{}} value="Clear" className='col-3 btn btn-danger' />
        
        </div> 
        </div>
        </div>
        </div>

  
  </>

  )
}

//////////////////////////////tech talk //////////////////////////////////////

export const Techtalks=()=>{

    const[techtalk,settechtalk]=useState({
        "name_of_the_faculty":"",
        "MuDiL_number":"",
        "lecture_delivered_to_branch":"",
        "semester":"",
        "section":"",
        "data_of_lecture_delivered":"",
        "period":"",
        "topic_of_discussion":"",
        "no_of_beneficiaries":"",
        "detail_of_discussion_made":"",
        "outcome_of_the_discussion":"",
        "outcome_of_he_activity":"",
        "PO_and_PSO":"",
        "attachments":"",
        "attendance_sheet_pdf":"",
        "handout_of_lecture_pdf":""	

      })
    
      console.log(techtalk)
      const navi=useNavigate()


      const handlechange=(e)=>{
        settechtalk((prev)=>({
          ...prev,
          [e.target.name]:e.target.value
        }))
    }
    
      
    
    const callPropose=async()=>{
        try{
          const log=JSON.parse(sessionStorage.getItem('person'));
            await axios.post(`http://localhost:1234/setaf/techtalknewrecord/${log.faculty_id}`,techtalk)
            navi('/techtalk')
            }
            catch(err){
              alert("Error in axios")
            }
            settechtalk(()=>{
                return{
                    "name_of_the_faculty":"",
                    "MuDiL_number":"",
                    "lecture_delivered_to_branch":"",
                    "semester":"",
                    "section":"",
                    "data_of_lecture_delivered":"",
                    "period":"",
                    "topic_of_discussion":"",
                    "no_of_beneficiaries":"",
                    "detail_of_discussion_made":"",
                    "outcome_of_the_discussion":"",
                    "outcome_of_he_activity":"",
                    "PO_and_PSO":"",
                    "attachments":"",
                    "attendance_sheet_pdf":"",
                    "handout_of_lecture_pdf":""	
            
                  }
            })
        }

    return(
        <>
        <div className='overallcontent' style={{maxWidth:"50%",marginLeft:"25%"}}>
        <div className="style" style={{justifyContent:'center'}}>
        <div class="head"><h1 class="recent-Articles" style={{color:'purple'}}>TECHTALKS TO BE DELIVERED MULTIDISCIPLINARY LECTURES</h1></div>
        <div className="row justify-content-center"style={{justifyContent:'center'}}>
        <div className="ej">
            <label>Name of the Faculty</label>
            <input type="text" placeholder="Enter the Name" value={settechtalk.name_of_the_faculty} name='name_of_the_faculty' onChange={handlechange}/>

            <label>MuDiL Number</label>
            <input type="text" placeholder="Enter the Number" value={settechtalk.MuDiL_number} name='MuDiL_number' onChange={handlechange}/>

            <label>Lecture Delivered to Branch</label>
            <select value={settechtalk.lecture_delivered_to_branch} name='lecture_delivered_to_branch' onClick={handlechange}>
                <option >Select the Branch</option>
                <option >B.E</option>
            </select>

            <label>Semester</label>
            <select value={settechtalk.semester} name='semester' onClick={handlechange}>
                <option >Select the Semester</option>
                <option >Odd Sem</option>
                <option >Even Sem</option>
            </select>

            <label>Section</label>
            <select value={settechtalk.section} name='section' onClick={handlechange}>
                <option >Select the Section</option>
                <option >A</option>
                <option >B</option>
                <option >C</option>
            </select>

            <label>Date of Lecture Delivered</label>
            <input type="date" name='data_of_lecture_delivered' value={settechtalk.data_of_lecture_delivered} onChange={handlechange}/>

            <label>Period</label>
            <select name='period' value={settechtalk.period} onClick={handlechange}>
                <option >Select the Period</option>
                <option >1</option>
                <option >2</option>
                <option >3</option>
                <option >4</option>
                <option >5</option>
                <option >6</option>
                <option >7</option>
                <option >8</option>
                <option >9</option>
            </select>

            <label>Topic of Discussion</label>
            <input type="text" placeholder="Enter the Topic" name='topic_of_discussion' value={settechtalk.topic_of_discussion} onChange={handlechange}/>

            <label>No.of.Beneficiaries</label>
            <input type="number" placeholder="Enter the Number" name='no_of_beneficiaries' value={settechtalk.no_of_beneficiaries} onChange={handlechange}/>

            <label>Details of the Discussion made</label>
            <input type="text" placeholder="Enter the Details" name='detail_of_discussion_made' value={settechtalk.detail_of_discussion_made} onChange={handlechange}/>

            <label>Outcome of the Discussion</label>
            <input type="text" placeholder="Enter the Outcome" name='outcome_of_the_discussion' value={settechtalk.outcome_of_he_activity} onChange={handlechange}/>

            <label>Outcome of the Activity</label>
            <input type="text" placeholder="Enter the Outcome" name='outcome_of_he_activity' value={settechtalk.outcome_of_he_activity} onChange={handlechange}/>

            <label>PO and PSO</label>
            <input type="text" placeholder="Enter the PO and PSO" name='PO_and_PSO' value={settechtalk.PO_and_PSO} onChange={handlechange}/>

            <label>Attendance Sheet - PDF</label>
            <input type="file" name='attendance_sheet_pdf' value={settechtalk.attendance_sheet_pdf} onChange={handlechange}/>

            <label>Handouts of Lecture - PDF</label>
            <input type="file" name='handout_of_lecture_pdf' value={settechtalk.handout_of_lecture_pdf} onChange={handlechange}/>
        </div>
        
        <div className='row mt-5 justify-content-around'>
          <input type='button' onClick={callPropose} value="Submit" className='col-3 btn btn-primary' />
          <input type='button' onClick={()=>{}} value="Clear" className='col-3 btn btn-danger' />
        </div> 
        </div>
        </div>
        </div>
        </>
    )
}


///////////////////////Facult Guest Talk in other institutions////////////////////

export const Facultyfront=()=>{

    const[faculty,setfaculty]=useState({
        "name_of_the_faculty":"",
        "date":"",
        "topic_of_guest_talk":"",
        "name_of_institution_or_industry":"",
        "place_of_institution_or_industry":"",
        "no_of_beneficaries":"",
        "letter_of_appreciation_or_certificate_pdf":""
      })
    
      console.log(faculty)
      const navi=useNavigate()

      
    
      const infoCollect=(eve)=>{
        const{name,value}=eve.target
        setfaculty((old)=>{
            if(name==="name_of_the_faculty"||name==="date"||name==="topic_of_guest_talk"||name==="name_of_institution_or_industry"||name==="place_of_institution_or_industry"||name==="no_of_beneficaries"||name==="letter_of_appreciation_or_certificate_pdf"){
                return{
                    ...old,
                    [name]:value
                }
            }
            else if(name==="s_no"){
                   // fillPorposals(value)
                return{
                    ...old,
                    [name]:parseInt(value)
                }
            }
            else{
                return{
                    ...old,
                    [name]:parseInt(value)
                }
            }
        })
      }
     const callPropose=async()=>{
        try{
            const log=JSON.parse(sessionStorage.getItem('person'));
            await axios.post(`http://localhost:1234/setaf/facultynewrecord/${log.faculty_id}`,faculty)
            navi('/facultly')
            }
            catch(err){
              console.log(err)
            }
            setfaculty(()=>{
                return{
                    "name_of_the_faculty":"",
                    "date":"",
                    "topic_of_guest_talk":"",
                    "name_of_institution_or_industry":"",
                    "place_of_institution_or_industry":"",
                    "no_of_beneficaries":"",
                    "letter_of_appreciation_or_certificate_pdf":""
                  }
            })
        }

    return(
        <>
        <div className='overallcontent' style={{maxWidth:"50%",marginLeft:"25%"}}>
        <div className="style" style={{justifyContent:'center'}}>
        <div class="head"><h1 class="recent-Articles" style={{color:'purple'}}>FACULTY GUEST TALK IN OTHER INSTITUTIONS</h1></div>
        <div className="row justify-content-center"style={{justifyContent:'center'}}>
        <div className="ej">
            <label>Name of the Faculty</label>
            <input type="text" placeholder="Enter the Name" value={setfaculty.name_of_the_faculty} name='name_of_the_faculty' onChange={infoCollect}/>

            <label>Date</label>
            <input type="date" value={setfaculty.date} name='date' onChange={infoCollect}/>

            <label>Topic of Guest Talk</label>
            <input type="text" placeholder="Enter the Topic" value={setfaculty.topic_of_guest_talk} name='topic_of_guest_talk' onChange={infoCollect}/>

            <label>Name of the Institution/Industry</label>
            <input type="text" placeholder="Enter the Name" value={setfaculty.name_of_institution_or_industry} name='name_of_institution_or_industry' onChange={infoCollect}/>

            <label>Place of the Institution/Industry</label>
            <input type="text" placeholder="Enter the Place" value={setfaculty.place_of_institution_or_industry} name='place_of_institution_or_industry' onChange={infoCollect}/>

            <label>No.of.Beneficiaries</label>
            <input type="text" placeholder="Enter the Number" value={setfaculty.no_of_beneficaries} name='no_of_beneficaries' onChange={infoCollect}/>

            <label>Letter of Appreciation/Certificate - PDF</label>
            <input type="file" onChange={infoCollect} value={setfaculty.letter_of_appreciation_or_certificate_pdf} name='letter_of_appreciation_or_certificate_pdf'/>
        </div>
        
        <div className='row mt-5 justify-content-around'>
          <input type='button' onClick={callPropose} value="Submit" className='col-3 btn btn-primary' />
          <input type='button' onClick={()=>{}} value="Clear" className='col-3 btn btn-danger' />
        </div> 
        </div>
        </div>
        </div>
        </>
    )
}


/////////////////////NPTEL///////////////////////////////////////////////////////////////////////////////////////////


export const Nptelfront=()=>{

    const[nptel,setnptel]=useState({
        "academic_year":"",
        "semesters":"",
        "name_of_the_faculty":"",
        "year":"",
        "session":"",
        "course_name":"",
        "score_obtained":"",
        "certificate_type":"",
        "certificate_pdf":""
      })
    
      console.log(nptel)

    
      const infoCollect=(eve)=>{
        const{name,value}=eve.target
        setnptel((old)=>{
            if(name==="academic_year"||name==="semesters"||name==="name_of_the_faculty"||name==="year"||name==="session"||name==="course_name"||name==="score_obtained"||name==="certificate_type"||name==="certificate_pdf"){
                return{
                    ...old,
                    [name]:value
                }
            }
            else if(name==="s_no"){
                // fillPorposals(value)
                return{
                    ...old,
                    [name]:parseInt(value)
                }
            }
            else{
                return{
                    ...old,
                    [name]:parseInt(value)
                }
            }
        })
      }
    
    const callPropose=async()=>{
        try{
            await axios.post(`http://localhost:1234/setaf/nptelnewrecord`,nptel)
            }
            catch(err){
              alert("Error in axios")
            }
            setnptel(()=>{
                return{
                    "academic_year":"",
                    "semesters":"",
                    "name_of_the_faculty":"",
                    "year":"",
                    "session":"",
                    "course_name":"",
                    "score_obtained":"",
                    "certificate_type":"",
                    "certificate_pdf":""
                  }
            })
        }
    return(
        <>
        
        <div class="overallcontent" style={{maxWidth:"50%",marginLeft:"25%"}} >
        <div className="style" style={{justifyContent:'center'}}>
        <div class="head"><h1 class="recent-Articles" style={{color:'purple'}}>NPTEL CERTIFICATION</h1></div>
        <div className="row justify-content-center"style={{justifyContent:'center'}}>
        <div className="ej">
            <label>Academic Year</label>
            <select name="academic_year" onClick={infoCollect} value={setnptel.academic_year}>
            <option value="">Select The Academic Year</option>
            <option value="2022-23">2022-23</option>
            <option value="2023-24">2023-24</option>
            </select>

            <label>Semester</label>
            <select name="semesters" onClick={infoCollect} value={setnptel.semesters} >
            <option value="">Select The Semester</option>
            <option value="ODD">ODD</option>
            <option value="EVEN">EVEN</option>
            </select>
        </div>
                
<div className="ej">
     <label >Name of the Faculty</label>
     <input  type="text" name="name_of_the_faculty" placeholder="Enter Your Name" onChange={infoCollect} value={setnptel.name_of_the_faculty}/>
     </div>

     <div className="ej">
     <label >Year</label>
     <input  type="text" name="year" placeholder="Enter the year" className="form-control" onChange={infoCollect} value={setnptel.year}/>
     </div>


     <div className="ej">
     <label >Session</label>
     <input  type="text" name="session" placeholder="Enter The Session" className="form-control" onChange={infoCollect} value={setnptel.session}/>
     </div>

     <div className="ej">
     <label >Course Name</label>
     <input  type="text" name="course_name" placeholder="Enter The Session" className="form-control" onChange={infoCollect} value={setnptel.course_name}/>
     </div>


     <div className="ej">
     <label >Score Obtained</label>
     <input  type="text" name="score_obtained" placeholder="Score Obtained" className="form-control" onChange={infoCollect} value={setnptel.score_obtained}/>
     </div>
     
     
     <div className="ej">
   <label >Certificate Type</label>
    <select onClick={infoCollect} value={setnptel.certificate_type} name='certificate_type'>
    <option value="">select The Type</option>
    <option value="Gold">Gold</option>
    <option value="Silver">Silver</option>
    <option value="Elite">Elite</option>
    <option value="Successfully Completed">Successfully Completed</option>
    </select>
                            
     </div>

     <div className="ej">
     <label >Certificate-PDF</label>
     <input  type="file"  onChange={infoCollect} value={setnptel.certificate_pdf} name='certificate_pdf'/>
     </div>
    

      
 </div>
    {/*  */}
      <div className='row mt-5 justify-content-around'>
        <input type='button' onClick={callPropose} value="Submit" className='col-3 btn btn-primary' />
        <input type='button' onClick={()=>{}} value="Clear" className='col-3 btn btn-danger' />
      </div>   
    
 </div>
 
 </div>
        
        </>
    )
}





////////////////////////////////participation in taste/////////////////////////////////


export const Tastefront=()=>{

    const[taste,setTaste]=useState({
        "name_of_the_faculty":"",
        "date":"",
        "taste_number":"",
        "seminar_topic":"",
        "resource_person_name":"",
        "outcome_of_the_activity":""
        
      })
    
      console.log(taste)
      const navi=useNavigate()
    
      const infoCollect=(eve)=>{
        const{name,value}=eve.target
        setTaste((old)=>{
            if(name==="name_of_the_faculty"||name==="date"||name==="taste_number"||name==="seminar_topic"||name==="resource_person_name"||name==="outcome_of_the_activity"){
                return{
                    ...old,
                    [name]:value
                }
            }
            else if(name==="s_no"){
                // fillPorposals(value)
                return{
                    ...old,
                    [name]:parseInt(value)
                }
            }
            else{
                return{
                    ...old,
                    [name]:parseInt(value)
                }
            }
        })
      }
    
    const callPropose=async()=>{
        try{
            await axios.post(`http://localhost:1234/setaf/tastenewrecord`,taste)
            navi('/taste')
            }
            catch(err){
              alert("Error in axios")
            }
        }

    return(
        <>
        <div className='overallcontent'  style={{maxWidth:"50%",marginLeft:"25%"}}>
        <div className="style" style={{justifyContent:'center'}}>
        <div class="head"><h1 class="recent-Articles" style={{color:'purple'}}>PARTICIPATION IN TASTE</h1></div>
        <div className="row justify-content-center"style={{justifyContent:'center'}}>
        <div className="ej">
            <label>Name of the Faculty Participated</label>
            <input name='name_of_the_faculty' onChange={infoCollect} value={setTaste.name_of_the_faculty} type="text" placeholder="Enter the Name"/>

            <label>Date</label>
            <input type="date" name='date' onChange={infoCollect} value={setTaste.date} placeholder='Date' />

            <label>Taste Number</label>
            <input type="text" onChange={infoCollect} value={setTaste.taste_number} name='taste_number' placeholder="Enter the Number"/>

            <label>Seminar Topic</label>
            <input type="text" name='seminar_topic' onChange={infoCollect} value={setTaste.seminar_topic} placeholder="Enter the Topic"/>

            <label>Resource Person Name</label>
            <input type="text" name='resource_person_name' onChange={infoCollect} value={setTaste.resource_person_name} placeholder="Enter the Name"/>

            <label>Outcome of the Activity</label>
            <input type="text" name='outcome_of_the_activity' onChange={infoCollect} value={setTaste.outcome_of_the_activity} placeholder="Enter the Outcome"/>
        </div>
        <h1 style={{color:'red',}}></h1>
        <div className='row mt-5 justify-content-around'>
          <input type='button' onClick={callPropose} value="Submit" className='col-3 btn btn-primary' />
          <input type='button' onClick={()=>{}} value="Clear" className='col-3 btn btn-danger' />
        
        </div> 
        </div>
        </div>
        </div>
        </>
    )
}

//////////////////////////////proposal submission for grants////////////////////////////////////////////////////////
export const Proposalfront=()=>{

    const[proposal,setproposal]=useState({
        "academic_year":"",
        "semester":"",
        "name_of_the_faculty":"",
        "name_of_the_funding_agency":"",
        "date_of_submission":"",
        "type":"",
        "title_of_the_proposal_submitted":"",
        "duration":"",
        "amount_quoted_in_lakhs":"",
        "grant_sanctioned":"",
        "proposal_proof_pdf":"",
        "grant_sanctioned_proof_pdf":""
      })
    
      console.log(proposal)
      const navi=useNavigate()

    
      const infoCollect=(eve)=>{
        const{name,value}=eve.target
        setproposal((old)=>{
            if(name==="academic_year"||name==="semester"||name==="name_of_the_faculty"||name==="name_of_the_funding_agency"||name==="date_of_submission"||name==="type"||name==="title_of_the_proposal_submitted"||name==="duration"||name==="amount_quoted_in_lakhs"||name==="grant_sanctioned"||name==="proposal_proof_pdf"||name==="grant_sanctioned_proof_pdf"){
                return{
                    ...old,
                    [name]:value
                }
            }
            else if(name==="s_no"){
                   // fillPorposals(value)
                return{
                    ...old,
                    [name]:parseInt(value)
                }
            }
            else{
                return{
                    ...old,
                    [name]:parseInt(value)
                }
            }
        })
      }
    
    const callPropose=async()=>{
        try{
            await axios.post(`http://localhost:1234/setaf/proposalnewrecord`,proposal)
            navi('/proposal')
            }
            catch(err){
              console.log(err)
            }
           setproposal(()=>{
            return{
                    "academic_year":"",
                    "semester":"",
                    "name_of_the_faculty":"",
                    "name_of_the_funding_agency":"",
                    "date_of_submission":"",
                    "type":"",
                    "title_of_the_proposal_submitted":"",
                    "duration":"",
                    "amount_quoted_in_lakhs":"",
                    "grant_sanctioned":"",
                    "proposal_proof_pdf":"",
                    "grant_sanctioned_proof_pdf":""
                  }  
        })
        }

    return(
        <>
        <div className='overallcontent'  style={{maxWidth:"50%",marginLeft:"25%"}}>
        <div className="style" style={{justifyContent:'center'}}>
        <div class="head"><h1 class="recent-Articles" style={{color:'purple'}}>PROPOSAL SUBMISSION FOR GRANTS</h1></div>
        <div className="row justify-content-center"style={{justifyContent:'center'}}>
        <div className="ej">
            
        <label>Academic Year</label>
            <select name="academic_year" value={setproposal.academic_year} onChange={infoCollect}>
              <option value="">Select The Academic Year</option>
              <option value="2022-23">2022-23</option>
              <option value="2023-24">2023-24</option>
            </select>

            <label>Semester</label>
            <select name='semester' onChange={infoCollect} value={setproposal.semester}>
                <option >Select the Semester</option>
                <option >Odd Sem</option>
                <option >Even Sem</option>
            </select>
            
            
            <label>Name of the Faculty</label>
            <input type="text" placeholder="Enter the Name" value={setproposal.name_of_the_faculty} name='name_of_the_faculty' onChange={infoCollect}/>
            
            <label>Name of the Funding Agency</label>
            <input type="text" placeholder="Enter the Name of Funding Agency" value={setproposal.name_of_the_funding_agency} name='name_of_the_funding_agency' onChange={infoCollect}/>

            <label>Date of Submission</label>
            <input type="date" value={setproposal.date_of_submission} name='date_of_submission' onChange={infoCollect}/>

            <label>Type</label>
            <select name='type' onChange={infoCollect} value={setproposal.type}>
                <option >Select the type</option>
                <option >Government</option>
                <option >Non-Government</option>
            </select>

            <label>Title of The Proposal Submitted</label>
            <input type="text" placeholder="Enter the Title" value={setproposal.title_of_the_proposal_submitted} name='title_of_the_proposal_submitted' onChange={infoCollect}/>

            <label>Duration</label>
            <input type="date" value={setproposal.duration} name='duration' onChange={infoCollect}/>

            <label>Amount Quoted(in lakhs)</label>
            <input type="text" placeholder="Amount Quoted" value={setproposal.amount_quoted_in_lakhs} name='amount_quoted_in_lakhs' onChange={infoCollect}/>

            <label>Grant Sanctioned</label>
            <select name='grant_sanctioned' onChange={infoCollect} value={setproposal.grant_sanctioned}>
                <option >Select the type</option>
                <option >Yes</option>
                <option >No</option>
            </select>

            <label>Proposal Proof - PDF</label>
            <input type="file" onChange={infoCollect} value={setproposal.proposal_proof_pdf} name='proposal_proof_pdf'/>

            <label>Grant Sanctioned Proof - PDF</label>
            <input type="file" onChange={infoCollect} value={setproposal.grant_sanctioned_proof_pdf} name='grant_sanctioned_proof_pdf'/>

        </div>
       
        <div className='row mt-5 justify-content-around'>
          <input type='button' onClick={callPropose} value="Submit" className='col-3 btn btn-primary' />
          <input type='button' onClick={()=>{}} value="Clear" className='col-3 btn btn-danger' />
        </div> 
        </div>
        </div>
        </div>
        </>
    )
}

////////////////////visit to industry////////////////////////////
export const Industryfront=()=>{
  
    const [industry,setindustry]=useState({
      
      "faculty_name":"",
      "date_of_visit":"",	
      "name_of_industry":"",	
      "location_of_industry":"",	
      "website_link_of_industry":"",	
      "name_of_insdustry_instution_person_interacted":"",	
      "designation_of_industry_instution_person_interacted":"",	
      "purpose_of_the_visite":"",
      "outcome_of_the_activity":"",
      "report_of_visite_pdf":"",
      "photo_jpg":"",
     " geotagged_photos_jpg":""
  
  
     
      })
    
  console.log(industry)
  const navi=useNavigate()
    const handlechange=(e)=>{
        setindustry((prev)=>({
          ...prev,
          [e.target.name]:e.target.value
        }))
    }
    const handleclick=async(e)=>{
      //e.preventDefault()
       try{
        await axios.post(`http://localhost:1234/setaf/newrecord`,industry)
        navi('/industry')
      }
      catch(err){
        console.log(err)
      } 
    }
    return (
    <>
     <div className='overallcontent'  style={{maxWidth:"50%",marginLeft:"25%"}}>
          <div className="style" style={{justifyContent:'center'}}>
          <div class="head"><h1 class="recent-Articles" style={{color:'purple'}}>VISITE TO INDUSTRIES,INSTITUTION</h1></div>
          <div className="row justify-content-center"style={{justifyContent:'center'}}>
          <div className="ej">
  
                  
                    
                    <label>Name Of the Faculty </label>
                    <input type='text' name='faculty_name' value={industry.faculty_name} placeholder='Enter the Facultay_Name'onChange={handlechange}  />
  
                  <label>Date Of Visit </label>
                  <input type='date' name='date_of_visit'  value={industry.date_of_visit} placeholder='Enter the Date of visiting'onChange={handlechange}  />
  
                    <label>Name Of Industry/Insitution Visited</label>
                    <input type='text' name='name_of_industry'  value={industry.name_of_industry} placeholder='Enter the Industry_Name'onChange={handlechange}  />
     
                    <label>Location of Industry/Insitution Visited</label>
                    <input type='text' name='location_of_industry'value={industry.location_of_industry} placeholder='Enter the Location of Industry'onChange={handlechange}  />
                
                  
                    <label>Website link of Industry/Insitution Visited</label>
                    <input type='text' name='website_link_of_industry'  value={industry.website_link_of_industry} placeholder='Enter the website link'onChange={handlechange}  />
                               
                  
                    <label>Name Of Industry/Insitution person Interacted</label>
                    <input type='text' name='name_of_insdustry_instution_person_interacted' value={industry.name_of_insdustry_instution_person_interacted} placeholder='Enter the Score'onChange={handlechange}  />
                        
                    <label>Designation Of Industry/Insitution person Interacted</label>
                    <input type='text' name='designation_of_industry_instution_person_interacted' value={industry.designation_of_industry_instution_person_interacted} placeholder='Enter the Score'onChange={handlechange}  />
                  
                    <label>Purpose Of the Visite</label>
                    <input type='text' name='purpose_of_the_visite' value={industry.purpose_of_the_visite} placeholder='What purpose of visite the Industry'onChange={handlechange}  />   
                  
                    <label>Outcome Of the  Activity </label>
                    <input type='text' name='outcome_of_the_activity' value={industry.outcome_of_the_activity} placeholder='Enter the Outecome the activity 'onChange={handlechange}  />
                            
                    <label>report_of_visite_pdf </label>
                    <input type='file' name='report_of_visite_pdf' value={industry.report_of_visite_pdf} placeholder=' 'onChange={handlechange}  />
  
                    <label>	photo_jpg </label>
                    <input type='file' name='photo_jpg' value={industry.photo_jpg} placeholder=' 'onChange={handlechange}  />
  
                    <label>geotagged_photos_jpg </label>
                    <input type='file' name='geotagged_photos_jpg' value={industry.geotagged_photos_jpg} placeholder=' 'onChange={handlechange}  />

                </div>
                <h1 style={{color:'red',}}></h1>
          <div className='row mt-5 justify-content-around'>
            <input type='button' onClick={handleclick} value="Submit" className='col-3 btn btn-primary' />
            <input type='button' onClick={()=>{}} value="Clear" className='col-3 btn btn-danger' />
          
            </div>
            </div>
         
        </div>
      </div>
    </>
    )
  }

  //////////////////////////////////Seed Money for Proposal////////////////////////////////////////////
  export const Seedfront=()=>{
  
    const [Seed,setSeed]=useState({
      academic_year:"",
      semester:"",
      name_of_the_faculty:"",
      title_of_the_research_project:"",
      amount_of_seed_money:"",
      year_of_receiving:"",
      metrf_sanction_letter_pdf:""
      })
  
  
      console.log(Seed)
      
      const infoCollect=(eve)=>{
        const{name,value}=eve.target
        setSeed((old)=>{
            if(name==="academic_year"||name==="semester"||name==="name_of_the_faculty"||name==="title_of_the_research_project"||name==="amount_of_seed_money"||name==="year_of_receiving"||name==="metrf_sanction_letter_pdf"){
                return{
                    ...old,
                    [name]:value
                }
            }
            else if(name==="s_no"){
                // fillPorposals(value)
                return{
                    ...old,
                    [name]:parseInt(value)
                }
            }
            else{
                return{
                    ...old,
                    [name]:parseInt(value)
                }
            }
          })
      }
      
      const callPropose=async()=>{
        try{
        await axios.post(`http://localhost:1234/setaf/newrecord`,Seed)
        }
        catch(err){
          alert("Error in axios")
        }
        // setInformation(temp.message)
      
      
    }
    return (
      <>
       <div class="overallcontent"  style={{maxWidth:"50%",marginLeft:"25%"}} >
          <div className="style" style={{justifyContent:'center'}}>
          <div class="head"><h1 class="recent-Articles" style={{color:'purple'}}>SEED MONEY PROPOSAL FOR RESEARCH</h1></div>
          <div className="row justify-content-center"style={{justifyContent:'center'}}>
          <div className="ej">
              <label>Academic Year</label>
              <select name="academic_year" onChange={infoCollect} value={Seed.academic_year}>
              <option >Select The Academic Year</option>
              <option >2022-23</option>
              <option >2023-24</option>
              </select>
  
              <label>Semester</label>
              <select name="semester" value={Seed.semester} onChange={infoCollect}>
              <option >Select The Semester</option>
              <option >ODD</option>
              <option >EVEN</option>
              </select>
              
              <label>Name of the Faculty</label>
              <select name="name_of_the_faculty" value={Seed.name_of_the_faculty} onChange={infoCollect}>
              <option value="">--</option>
              <option >ODD</option>
              <option >kavitha mam</option>
              </select>
  
          </div>
                  
  <div className="ej">
       <label >Title of the Research Project</label>
       <input  type="text" name="title_of_the_research_project" placeholder="Title of the Research Project" value={Seed.title_of_the_research_project} onChange={infoCollect}/>
       </div>   
  
       <div className="ej">
       <label >Amount of Seed Money(in lakhs)</label>
       <input  type="text" name="amount_of_seed_money" placeholder="Amount of Seed Money" className="form-control" value={Seed.amount_of_seed_money} onChange={infoCollect}/>
       </div>
  
       <div className="ej">
       <label >Year of Receiving</label>
       <input  type="text" name="year_of_receiving" placeholder="YYYY" className="form-control" value={Seed.year_of_receiving} onChange={infoCollect}/>
       </div>
       
       <div className="ej">
       <label >METRF Sanction Letter Pdf</label>
       <input  type="file" name='metrf_sanction_letter_pdf' value={Seed.metrf_sanction_letter_pdf} onChange={infoCollect}/>
       </div>
        
   </div>
      <h1 style={{color:'red',}}></h1>
        <div className='row mt-5 justify-content-around'>
          <input type='button' onClick={callPropose} value="Submit" className='col-3 btn btn-primary' />
          <input type='button' onClick={()=>{}} value="Clear" className='col-3 btn btn-danger' />
        </div>   
      
   </div>
   
   </div>    
      </>
  
    )
  }
  