import "./setafsty.css"
import { useEffect, useState } from "react"
import jsPDF from 'jspdf';
import axios from "axios";
import { conferenceRecords, facultyRecords, industryRecords, journalRecords, proposalRecords, seedRecords, tasteRecords, techtalkRecords, workshopRecords } from "./axios"
// import React, { useEffect, useState } from "react";
// import { Journal } from "./axios"
import dateFormat from 'dateformat'
export const JournalPublication=()=>{

    /////////////////pdf view///////////////

    const generatePDF = async (report_id)=> {
        try{
            alert(report_id)
        const res = await axios.get(`http://localhost:1234/journal/data/${report_id}`);
        const data = res.data;
        const doc = new jsPDF();
        // doc.addImage( 'PNG', 10, 7, 25, 25);
        // doc.addImage( 'PNG', 173, 7, 25, 25);    
        doc.setFontSize(18);
        doc.setFont("times", "bold");
        doc.text('MUTHAYAMMAL ENGINEERING COLLEGE',35, 15);
        doc.setFontSize(10);
        doc.setFont("times", "");
        doc.text('(An Autonomous Institution)', 80, 20);
        doc.text('(Approved by AICTE, New Delhi, Accredited by NAAC & Affiliated to Anna University)', 35, 25);
        doc.text('Rasipuram - 637 408, Namakkal Dist., Tamil Nadu', 65, 30);
        
        doc.setFont("times", "bold");
        
        doc.setFontSize(15); 
        doc.rect(12, 48, 32, 11).stroke();
        doc.text(`${data.department}`, 23, 55);
        doc.rect(88, 48, 32, 11).stroke();
        doc.text('SETAF', 95, 55);
        
        doc.rect(168, 48, 30, 11).stroke();
        doc.setFontSize(15); 
        doc.text(`${data.academic_year}`, 173, 55);
        
        doc.rect(12, 80, 50, 12).stroke();
        doc.text('Nature of Journal', 14, 88);
        doc.setFont("times", "");
        doc.rect(62, 80, 140, 12).stroke();
        doc.text(`${data.name_of_journal}`, 65, 88);
        
        doc.setFont("times", "bold");
        doc.rect(12, 92, 50, 12).stroke();
        doc.text('Name of the Author', 14, 100);
        doc.setFont("times", "");
        doc.rect(62, 92, 140, 12).stroke();
        doc.text(`${data.name_of_author}`, 65, 100);
        
        doc.setFont("times", "bold");
        doc.rect(12, 104, 50, 12).stroke();
        doc.text('Title of the Paper', 14, 112);
        doc.setFont("times", "");
        doc.rect(62, 104, 140, 12).stroke();
        doc.text(`${data.title_of_paper}`, 65, 112);
        
        // doc.setFont("times", "bold");
        // doc.rect(12, 116, 50, 12).stroke();
        // doc.text('Name of Journal', 14, 124);
        // doc.setFont("times", "");
        // doc.rect(62, 116, 140, 12).stroke();
        // doc.text(`${data.month_of_publication}`, 65, 124);
        
        // doc.setFont("times", "bold");
        
        
        
        
        
        doc.setFont("times", "bold");
        doc.rect(12, 116, 190, 105).stroke();
        doc.text('', 18, 182);
        
        
        
        
        doc.text('HOD',168,274)
    
       
    // doc.roundedRect(180,270,22,8,5,5,'S')
    
    
    
    
        // Generate a data URI for the PDF
        const pdfDataUri = doc.output('datauristring');
    
        // Open the PDF in a new tab or window
        const newWindow = window.open();
        newWindow.document.write(`<iframe width='100%' height='100%' src='${pdfDataUri}'></iframe>`);
      }
      catch(e)
      {
        console.log(e);
      }
    }


    ///////////////journal fetch code
    const [journalRecs,setJournalRecs]=useState([])
    useEffect(()=>{
        fetchJournalRecords()
    },[])
    const logged=JSON.parse(sessionStorage.getItem("person"))


    const fetchJournalRecords=async()=>{
        try{
            const temp = await journalRecords(`${logged.faculty_id}`)
            // console.log(temp.data)
            setJournalRecs(temp.data)
        }
        catch(e){
            console.log(e);
        }
       

    }
   
    return(
        <>
        <div>
         <div class="overallcontent">
         <div class="report-header">
         <h1 class="recent-Articles">Journal Publication</h1>
           <a className="topic-headings" href="/Setaf/SetafForms/Journalfront"><button style={{top:"27.5px",right:"50px"}} class="views" id="addButton">+ Add</button></a>
         </div>
         <table className='table table-striped '>
         <thead>
         <tr>
         <th >Academic Year</th>
         <th>Semester</th>
         <th>Department</th>
         <th>Name of the Author's</th>
         <th>Title of the Paper</th>
         <th>Name of the Journal</th>
         <th>Year of Publication</th>
         <th>Month of Publication</th>
         <th>ISSN Number</th>
         <th>Volume NO</th>
         <th>Issue No</th>
         <th>Page No</th>
         <th>Journal Listed in</th>
         <th>Link to Website of the JOurnal</th>
         
         {/* <th>Journal First Page - PDF</th> */}
         </tr>
         
         {               
                        journalRecs.length>0?
                        journalRecs.map((val)=>(
                            <tr>
                                <td>{val.academic_year}</td>
                                <td>{val.semester}</td>
                                <td>{val.department}</td>
                                <td>{val.name_of_author}</td>
                                <td>{val.title_of_paper}</td>
                                <td>{val.name_of_journal}</td>
                                <td>{val.year_of_publication}</td>
                                <td>{val.month_of_publication}</td>
                                <td>{val.issn_number}</td>
                                <td>{val.volume_no}</td>
                                <td>{val.issue_no}</td>
                                <td>{val.page_no}</td>
                                <td>{val.journal_listed_in}</td>
                                <td>{val.link_to_website_of_journal}</td>
                                {/* <th>{val.journal_first_page_pdf}</th> */}
                                
                                <th><button onClick={async()=>{generatePDF(val.report_id)}}>View</button></th>
                            </tr>
                        ))
                    :
                    <tr> 
                        
                        No records
                        
                        </tr>}

     
         </thead>         
         </table>
         </div>
         </div>
      
        
      
        </>
    )
}

/////////////////////conference/////////////////////

export const ConferencePublication=()=>{

    const [conferenceRecs,setConferenceRecs]=useState([])
    useEffect(()=>{
        fetchConferenceRecords()
    },[])
    const logged=JSON.parse(sessionStorage.getItem("person"))


    const fetchConferenceRecords=async()=>{
        try{
            const temp = await conferenceRecords(`${logged.faculty_id}`)
        // console.log(temp.data)
        setConferenceRecs(temp.data)
        }
        catch(e){
            console.log(e);
        }
    }


    return(
        <>
         <div class="overallcontent ">
         <div class="report-header">
         <h1 class="recent-Articles">Your Reports</h1>
         <a className="topic-headings" href="Setaf/SetafForms/Conferencefront"><button style={{top:"27.5px",right:"50px"}} class="views" id="addButton">+ Add</button></a>
         </div>
         <table className='table table-striped '>
          <thead>
          <tr>
          
                            <th>Accademic Year</th>
                            <th>Semester</th>
                            <th>Department</th>
                            <th>Name of the Author's</th>
                            <th>Title of the Conference Paper</th>
                            <th>Name of the Conference</th>
                            <th>Place of the Conference</th>
                            <th>Conference Type</th>
                            <th>Date of Conference</th>
                            <th>ISBN of the Conference Proceeding</th>
                            <th>Conference Certificate and Proceeding-PDF</th>
                            
                          
          </tr>
          {               
                       conferenceRecs.length>0?
                       conferenceRecs.map((val)=>(
                            <tr>
                                <th>{val.academic_year}</th>
                                <th>{val.semester}</th>
                                <th>{val.department}</th>
                                <th>{val.name_of_the_authors}</th>
                                <th>{val.title_of_the_conference_paper}</th>
                                <th>{val.name_of_the_conference}</th>
                                <th>{val.place_of_the_conference}</th>
                                <th>{val.conference_type}</th>
                                <th>{dateFormat(val.date_of_conference,'dd-mm-yyyy')}</th>
                                <th>{val.isbn_of_the_conference_proceeding}</th>
                                <th>{val.conference_certificate_and_proceeding_pdf}</th>
                                <th><button>View</button></th>
                            </tr>
                        ))
                        :
                        <tr>No Records</tr>
                    }
          </thead>
         </table>
         </div>
         
                      
        </>
    )
}

///////////////workshop/////////////


export const Workshop=()=>{
    const [workshopRecs,setWorkshopRecs]=useState([])
    useEffect(()=>{
        fetchWorkshopRecords()
    },[])
    const logged=JSON.parse(sessionStorage.getItem("person"))


    const fetchWorkshopRecords=async()=>{
       try{
        const temp = await workshopRecords(`${logged.faculty_id}`)
        // console.log(temp.data)
        setWorkshopRecs(temp.data)
       }
        
       catch(e){
        console.log(e);
       }

    }


    return(
        <>
         <div class="overallcontent">
         <div class="report-header">
         <h1 class="recent-Articles">Your Reports</h1>
         <a className="topic-headings" href="Setaf/SetafForms/Workshopfront"><button style={{top:"27.5px",right:"50px"}} class="views" id="addButton">+ Add</button></a>
         </div>
         <table className='table table-striped '>
          <thead>
          <tr>
                            <th>SubType</th>
                            <th>Name of the faculty</th>
                            <th>Designation</th>
                            <th>Nature of the program</th>
                            <th>Title of the program</th>
                            <th>Duration From (Date)</th>
                            <th>Duration To (DAte)</th>
                            <th>Participation</th>
                            <th>Name of the Organization and Place</th>
                            <th>Location of Organization</th>
                            <th>Amount provided by the HEI</th>
                            <th>Certificate-PDF</th>            
          </tr>
          {             
                        workshopRecs.length>0?   
                        workshopRecs.map((val)=>(
                            <tr>
                                <th>{val.subtype}</th>
                                <th>{val.name_of_the_faculty}</th>
                                <th>{val.designation}</th>
                                <th>{val.nature_of_the_program}</th>
                                <th>{val.title_of_the_program}</th>
                                <th>{val.duration_from}</th>
                                <th>{val.duration_to}</th>
                                <th>{val.participation}</th>
                                <th>{val.name_of_the_organization_and_place}</th>
                                <th>{val.location_of_organization}</th>
                                <th>{val.amount_provided_by_the_HEI}</th>
                                <th>{val.Certificate_pdf}</th>


                            </tr>
                        ))
                        :
                        <tr>No Records</tr>
                    }
          </thead>
         </table>
         </div>
         
                      
        </>
    )
}


////////Tech talk/////////

export const Techtalk=()=>{
    const [techtalkRecs,setTechtalksRecs]=useState([])
    useEffect(()=>{
        fetchTechtalkRecords()
    },[])
    const logged=JSON.parse(sessionStorage.getItem("person"))


    const fetchTechtalkRecords=async()=>{
        try{
            const temp = await techtalkRecords(`${logged.faculty_id}`)
        // console.log(temp.data)
        setTechtalksRecs(temp.data)
        }
        catch(e){
            console.log(e)
        }

    }

    return(
        <>
         <div class="overallcontent">
         <div class="report-header">
         <h1 class="recent-Articles">Your Reports</h1>
         <a className="topic-headings" href="Setaf/SetafForms/techtalks"><button style={{top:"27.5px",right:"50px"}} class="views" id="addButton">+ Add</button></a>
         </div>
         <table className='table table-striped '>
          <thead>
          <tr>
                            <th>Name of the faculty</th>
                            <th>MuDiL naumber</th>
                            <th>Lecture delivered to branch</th>
                            <th>Semester</th>
                            <th>Section</th>
                            <th>Data of lecture delivered</th>
                            <th>Period</th>
                            <th>Topic of discussion</th>
                            <th>No of beneficiaries</th>
                            <th>Detail of discussion made	</th>
                            <th>Outcome of the discussion</th>
                            <th>Outcome of the activity</th>
                            <th>PO_and_PSO</th>
                            {/* <th>Attendance sheet pdf</th>
                            <th>Handout of lecture pdf</th> */}
          </tr>
          {             
                        techtalkRecs.length>0?  
                        techtalkRecs.map((val)=>(
                            <tr>
                                <th>{val.name_of_the_faculty}</th>
                                <th>{val.MuDiL_number}</th>
                                <th>{val.lecture_delivered_to_branch}</th>
                                <th>{val.semester}</th>
                                <th>{val.section}</th>
                                <th>{val.data_of_lecture_delivered}</th>
                                <th>{val.period}</th>
                                <th>{val.topic_of_discussion}</th>
                                <th>{val.no_of_beneficiaries}</th>
                                <th>{val.detail_of_discussion_made}</th>
                                <th>{val.outcome_of_the_discussion}</th>
                                <th>{val.outcome_of_he_activity}</th>
                                <th>{val.PO_and_PSO}</th>
                                {/* <th>{val.attendance_sheet_pdf}</th> */}
                                {/* <th>{val.handout_of_lecture_pdf}</th> */}
                                
                            </tr>
                        ))
                        :
                        <tr>No Records</tr>
                    }
          </thead>
         </table>
         </div>
         
                      
        </>
    )
}
//////////////Faculty guest talk in other institutions//////////////////////

export const FacultyGuestTalk=()=>{

    const [facultyRecs,setFacultyRecs]=useState([])
    useEffect(()=>{
       fetchFacultyRecords()
    },[])
    const logged=JSON.parse(sessionStorage.getItem("person"))

    const fetchFacultyRecords=async()=>{
        try{
            const temp = await facultyRecords(`${logged.faculty_id}`)
        // console.log(temp.data)
        setFacultyRecs(temp.data)
        }
        catch(e){
            console.log(e);
        }

    }
    return(
        <>
         <div class="overallcontent">
         <div class="report-header">
         <h1 class="recent-Articles">Your Reports</h1>
         <a className="topic-headings" href="Setaf/SetafForms/facultyfront"><button style={{top:"27.5px",right:"50px"}} class="views" id="addButton">+ Add</button></a>
         </div>
         <table className='table table-striped'>
          <thead>
          <tr>
                            <th>Name of the Faculty</th>
                            <th>Date</th>
                            <th>Topic of the Guest Talk</th>
                            <th>Name of the Institution or Industry</th>
                            <th>Place of the Institution or Industry</th>
                            <th>No of Beneficiaries</th>
                            <th>Letter of Appreciation/Certificate-PDF</th>
                            
          </tr>
                   {       
                        facultyRecs.length>0?        
                        facultyRecs.map((val)=>(
                            <tr>
                                <th>{val.name_of_the_faculty}</th>
                                <th>{val.date}</th>
                                <th>{val.topic_of_guest_talk}</th>
                                <th>{val.name_of_institution_or_industry}</th>
                                <th>{val.place_of_institution_or_industry}</th>
                                <th>{val.no_of_beneficaries}</th>
                                <th>{val.letter_of_appreciation_or_certificate_pdf}</th>
                            </tr>
                        ))
                        :
                        <tr>No Records</tr>
                    }

          </thead>
         </table>
         </div>
         
                      
        </>
    )
}

/////////////////////////NPTEL/////////////////////////////////////////////////


export const Nptel=()=>{
    return(
        <>
         <div class="overallcontent">
         <div class="report-header">
         <h1 class="recent-Articles">Your Reports</h1>
         <a className="topic-headings" href="Setaf/SetafForms/nptelform"><button style={{top:"27.5px",right:"50px"}} class="views" id="addButton">+ Add</button></a>
         </div>
         <table className='table table-striped'>
          <thead>
          <tr>
                            <th>Academic year</th>
                            <th>Semster</th>
                            <th>Name of the faculty</th>
                            <th>Year</th>
                            <th>Section</th>
                            <th>Course name</th>
                            <th>Score obtained</th>
                            <th>Certificate type</th>
                            <th>Certificate pdf</th>
                            
          </tr>
          </thead>
         </table>
         </div>
         
                      
        </>
    )
}

////////////////////////PARTICIPATION IN TASTE////////////////////////////////
export const Taste=()=>{

    const [tasteRecs,setTasteRecs]=useState([])
    useEffect(()=>{
       fetchTasteRecords()
    },[])
    const logged=JSON.parse(sessionStorage.getItem("person"))

    const fetchTasteRecords=async()=>{
        const temp = await tasteRecords(`${logged.faculty_id}`)
        // console.log(temp.data)
        setTasteRecs(temp.data)

    }
    return(
        <>
         <div class="overallcontent">
         <div class="report-header">
         <h1 class="recent-Articles">Your Reports</h1>
         <a className="topic-headings" href="Setaf/SetafForms/tastefront"><button style={{top:"27.5px",right:"50px"}} class="views" id="addButton">+ Add</button></a>
         </div>
         <table className='table table-striped'>
          <thead>
          <tr>
                            <th>Name of the faculty</th>
                            <th>date</th>
                            <th>Taste Number</th>
                            <th>Seminar Topic</th>
                            <th>Respirce Person Name</th>
                            <th>Outcome of the Activity</th>
                    
                            
          </tr>
          {               
                        tasteRecs.map((val)=>(
                            <tr>
                                <th>{val.name_of_the_faculty}</th>
                                <th>{val.date}</th>
                                <th>{val.taste_number}</th>
                                <th>{val.seminar_topic}</th>
                                <th>{val.resource_person_name}</th>
                                <th>{val.outcome_of_the_activity}</th>
            
                            </tr>
                        ))
                    }
          </thead>
         </table>
         </div>
         
                      
        </>
    )
}
/////////////////////////////PROPOSAL SUBMISSION FOR GRANTS///////////////////
export const Proposal=()=>{

    const [proposalRecs,setProposalRecs]=useState([])
    useEffect(()=>{
       fetchProposalRecords()
    },[])
    const logged=JSON.parse(sessionStorage.getItem("person"))

    const fetchProposalRecords=async()=>{
        const temp = await proposalRecords(`${logged.faculty_id}`)
        // console.log(temp.data)
        setProposalRecs(temp.data)

    }
    return(
        <>
         <div class="overallcontent">
         <div class="report-header">
         <h1 class="recent-Articles">Your Reports</h1>
         <a className="topic-headings" href="Setaf/SetafForms/proposalfront"><button style={{top:"27.5px",right:"50px"}} class="views" id="addButton">+ Add</button></a>
         </div>
         <table className='table table-striped'>
          <thead>
          <tr>
                            <th>Academic Year</th>
                            <th>Semester</th>
                            <th>Name of the Faculty</th>
                            <th>Name of the Funding Agency</th>
                            <th>Date of Submission</th>
                            <th>Type</th>
                            <th>Title of Proposal Submission</th>
                            <th>Duration</th>
                            <th>Amount Quoted(in lakhs)</th>
                            <th>Grant Sanctioned</th>
                            <th>Proposal Proof-PDF</th>
                            <th>Grant Sanctioned Proof-PDF</th>
                            
          </tr>
          {               
                        proposalRecs.map((val)=>(
                            <tr>
                                <th>{val.academic_year}</th>
                                <th>{val.semester}</th>
                                <th>{val.name_of_the_faculty}</th>
                                <th>{val.name_of_the_funding_agency}</th>
                                <th>{val.date_of_submission}</th>
                                <th>{val.type}</th>
                                <th>{val.title_of_the_proposal_submitted}</th>
                                <th>{val.duration}</th>
                                <th>{val.amount_quoted_in_lakhs}</th>
                                <th>{val.grant_sanctioned}</th>
                                <th>{val.proposal_proof_pdf}</th>
                                <th>{val.grant_sanctioned_proof_pdf}</th>

                            </tr>
                        ))
                    }
          </thead>
         </table>
         </div>
         
                      
        </>
    )
}


/////////////////////////////////visit to industry//////////////////////////////////////
export const Industry=()=>{

    const [industryRecs,setIndustryRecs]=useState([])
    useEffect(()=>{
       fetchIndustryRecords()
    },[])
    const logged=JSON.parse(sessionStorage.getItem("person"))

    const fetchIndustryRecords=async()=>{
        const temp = await industryRecords(`${logged.faculty_id}`)
        // console.log(temp.data)
        setIndustryRecs(temp.data)

    }
    return(
        <>
         <div class="overallcontent">
         <div class="report-header">
         <h1 class="recent-Articles">Your Reports</h1>
         <a className="topic-headings" href="Setaf/SetafForms/visitindustry"><button style={{top:"27.5px",right:"50px"}} class="views" id="addButton">+ Add</button></a>
         </div>
         <table className='table table-striped'>
          <thead>
          <tr>
                            <th>Name of the faculty</th>
                            <th>Date of Visit</th>
                            <th>Name of Industry/Institution Visited</th>
                            <th>Location of Industry/Institution Visited</th>
                            <th>Website Link of Industry Visited</th>
                            <th>Name ofn Industry/Institution person Interacted</th>
                            <th>Designation of Industry Person Interacted</th>
                            <th>Purpose of thee Visit</th>
                            <th>Outcome of the Activity</th>
                            {/* <th>Reports of Visit PDF</th>
                            <th>Photo JPG</th>
                            <th>Geotagged Photos JPG</th> */}


                    
                            
          </tr>
          {               
                        industryRecs.map((val)=>(
                            <tr>
                                <th>{val.faculty_name}</th>
                                <th>{dateFormat(val.date_of_visit,'dd-mm-yyyy')}</th>
                                <th>{val.name_of_industry}</th>
                                <th>{val.location_of_industry}</th>
                                <th>{val.website_link_of_industry}</th>
                                <th>{val.name_of_insdustry_instution_person_interacted}</th>
                                <th>{val.designation_of_industry_instution_person_interacted}</th>
                                <th>{val.purpose_of_the_visite}</th>
                                <th>{val.outcome_of_the_activity}</th>
                                {/* <th>{val.report_of_visite_pdf}</th>
                                <th>{val.photo_jpg}</th>
                                <th>{val.geotagged_photos_jpg}</th> */}
            
                            </tr>
                        ))
                    }
          </thead>
         </table>
         </div>
         
                      
        </>
    )
}

////////////////////////////seed money proposal ////////////////////////////
export const Seed=()=>{

    const [seedRecs,setSeedRecs]=useState([])
    useEffect(()=>{
       fetchSeedRecords()
    },[])
    const logged=JSON.parse(sessionStorage.getItem("person"))

    const fetchSeedRecords=async()=>{
        const temp = await seedRecords(`${logged.faculty_id}`)
        // console.log(temp.data)
        setSeedRecs(temp.data)
        alert(JSON.stringify(temp.data));

    }
    return(
        <>
         <div class="overallcontent">
         <div class="report-header">
         <h1 class="recent-Articles">Your Reports</h1>
         <a className="topic-headings" href="Setaf/SetafForms/seedfront"><button style={{top:"27.5px",right:"50px"}} class="views" id="addButton">+ Add</button></a>
         </div>
         <table className='table table-striped'>
          <thead>
          <tr>
                            <th>Accademic Year</th>
                            <th>Semester</th>
                            <th>Name of the Faculty</th>
                            <th>Title of the Research Project</th>
                            <th>Amount of Seed Money</th>
                            <th>Year of Receiving</th>
                            {/* <th>METRF Sanction Letter PDF</th>                    */}
          </tr>
          {               
                        seedRecs.map((val)=>(
                            <tr>
                                <th>{val.academic_year}</th>
                                <th>{val.semester}</th>
                                <th>{val.name_of_the_faculty}</th>
                                <th>{val.title_of_the_research_project}</th>
                                <th>{val.amount_of_seed_money}</th>
                                <th>{val.year_of_receiving}</th>
                                {/* <th>{val.metrf_sanction_letter_pdf}</th> */}
            
                            </tr>
                        ))
                    }
          </thead>
         </table>
         </div>
         
                      
        </>
    )
}