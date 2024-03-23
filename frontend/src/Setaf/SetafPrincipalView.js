import "./setafsty.css"
import { useEffect, useState } from "react"
import jsPDF from 'jspdf';
import axios from "axios";
import { conferencePrincipalView, conferenceRecords, facultyRecords, industryRecords, journalPrincipalView, journalRecords, journalRecordsDept, proposalRecords, seedRecords, tasteRecords, techtalkRecords, workshopRecords } from "./axios"
import { getDocument } from 'pdfjs-dist/webpack';

import dateFormat from 'dateformat'


export const JournalPublicationPrincipalDashboard=()=>{

    /////////////////pdf view///////////////

    const generatePDF = async (report_id)=> {
        try{
            // alert(report_id)
        const res = await axios.get(`http://localhost:1234/setaf/data/${report_id}`);
        const data = res.data;
        const doc = new jsPDF();
        let pdfDocument;
        try{
            const pdfUrl = `/Journal_SETAF/${data.journal_first_page_PDF}`;
            const pdfResponse = await axios.get(pdfUrl, { responseType: 'arraybuffer' });
            const pdfData = pdfResponse.data;
    
         pdfDocument = await getDocument({ data: pdfData }).promise;
           }catch(e){
            console.log(e)
           }
      

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
        doc.text(`${data.dept}`, 23, 55);
        doc.rect(88, 48, 32, 11).stroke();
        doc.text('SETAF', 95, 55);
        
        doc.rect(168, 48, 30, 11).stroke();
        doc.setFontSize(15); 
        doc.text(`${data.acd_yr}`, 173, 55);
        
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
        
           
        try{ 
            // Add pages from the original PDF
            for (let pageNumber = 1; pageNumber <= pdfDocument.numPages; pageNumber++) {
              const page = await pdfDocument.getPage(pageNumber);
              const pdfWidth = page.view[2];
              const pdfHeight = page.view[3];
          
              const canvas = document.createElement('canvas');
              const context = canvas.getContext('2d');
              canvas.width = pdfWidth;
              canvas.height = pdfHeight;
          
              await page.render({ canvasContext: context, viewport: page.getViewport({ scale: 1 }) }).promise;
          
              const imageDataUrl = canvas.toDataURL('image/jpeg');
              try{doc.addPage();
              doc.addImage(imageDataUrl, 'JPEG', 5, 0, 200, 300);
              }catch(error){
                console.error(error);
              }
            }
          }
          catch(e){
            console.log(e);
          }

    
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
            const temp = await journalPrincipalView()
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
           {/* <a className="topic-headings" href="/Setaf/SetafForms/Journalfront"><button style={{top:"27.5px",right:"50px"}} class="views" id="addButton">+ Add</button></a> */}
         </div>
         <table className='table table-striped '>
         <thead>
         <tr>
        <th>Report ID</th>
         <th>Academic Year</th>
         <th>Semester</th>
         <th>Name of the Author's</th>
         <th>Title of the Paper</th>
         <th>Name of the Journal</th>
         <th>Date of Publication</th>
         <th>Download PDF</th>
         </tr>
         
         {               
                        journalRecs.length>0?
                        journalRecs.map((val)=>(
                            <tr>
                                <td>{val.report_id}</td>
                                <td>{val.acd_yr}</td>
                                <td>{val.semester}</td>
                                <td>{val.name_of_author}</td>
                                <td>{val.title_of_paper}</td>
                                <td>{val.name_of_journal}</td>
                                <td>{val.date_of_publication}</td>
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



/////////////////conference///////
export const ConferencePublicationPrincipalDashboard=()=>{
    ///////pdf view///////////////
    
const generatePDF = async (report_id)=> {
    try{
        // alert(report_id)
    const res = await axios.get(`http://localhost:1234/conference/data/conf/${report_id}`);
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
    doc.text(`${data.dept}`, 23, 55);
    doc.rect(88, 48, 32, 11).stroke();
    doc.text('SETAF', 95, 55);
    
    doc.rect(168, 48, 30, 11).stroke();
    doc.setFontSize(15); 
    doc.text(`${data.acd_yr}`, 173, 55);
    
    doc.rect(12, 80, 58, 12).stroke();
    doc.text('Name of Conference', 14, 88);
    doc.setFont("times", "");
    doc.rect(70, 80, 132, 12).stroke();
    doc.text(`${data.name_of_the_conference}`, 73, 88);
    
    doc.setFont("times", "bold");
    doc.rect(12, 92, 58, 12).stroke();
    doc.text('Name of the Author', 14, 100);
    doc.setFont("times", "");
    doc.rect(70, 92, 132, 12).stroke();
    doc.text(`${data.name_of_the_authors}`, 73, 100);
    
    doc.setFont("times", "bold");
    doc.rect(12, 104, 58, 12).stroke();
    doc.text('Title of the Conference', 14, 112);
    doc.setFont("times", "");
    doc.rect(70, 104, 132, 12).stroke();
    doc.text(`${data.title_of_the_conference_paper}`, 73, 112);
      
    doc.setFont("times", "bold");
    doc.rect(12, 116, 190, 105).stroke();
    doc.text('', 18, 182);
    
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

    ////////////data fetch code/////////////////

    const [conferenceRecs,setConferenceRecs]=useState([])
    useEffect(()=>{
        fetchConferenceRecords()
    },[])
    const logged=JSON.parse(sessionStorage.getItem("person"))


    const fetchConferenceRecords=async()=>{
        try{
            const temp = await conferencePrincipalView()
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
                            <th>Name of the Author</th>
                            <th>Title of the Conference Paper</th>
                            <th>Name of the Conference</th>
                            <th>Place of the Conference</th>
                            <th>Type</th>
                            <th>Date</th>
                            <th>Download PDF</th>
                            
                          
          </tr>
          {               
                       conferenceRecs.length>0?
                       conferenceRecs.map((val)=>(
                            <tr>
                                <td>{val.acd_yr}</td>
                                <td>{val.semester}</td>
                                <td>{val.name_of_the_authors}</td>
                                <td>{val.title_of_the_conference_paper}</td>
                                <td>{val.name_of_the_conference}</td>
                                <td>{val.place_of_the_conference}</td>
                                <td>{val.conference_type}</td>
                                <td>{dateFormat(val.date_of_conference,'dd-mm-yyyy')}</td>
                                <th><button onClick={async()=>{generatePDF(val.report_id)}}>View</button></th>
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


