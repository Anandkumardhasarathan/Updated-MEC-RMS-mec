import "./setafsty.css"
import { useEffect, useState } from "react"
import jsPDF from 'jspdf';
import axios from "axios";
import { getDocument } from 'pdfjs-dist/webpack';
import { AwardAtNationalDept, BooksDept, EcontentRecordsDept, NptelRecordsDept, ProposalRecordsDept, VisitRecordsDept, collaborativeRecordsDept, conferenceRecords, conferenceRecordsDept, consultancyRecordsDept, facultyRecords, facultyRecordsDept, industryRecords, industryRecordsDept, journalRecords, journalRecordsDept, patentRecordsDept, proposalRecords, proposalRecordsDept, seedRecords, seedRecordsDept, tasteRecords, tasteRecordsDept, techtalkRecords, techtalkRecordsDept, workshopRecords, workshopRecordsDept } from "./axios"
import dateFormat from 'dateformat'
import Image from '../logo.png';
import Image2 from '../logo2.png';
import Image3 from '../logo3.jpg';
import Image4 from '../logo4.jpg';
import { callAddBoldFont } from "../calibri-bold-normal";
import Select from 'react-select';
import '../facultyEcrFilter.css';


export const JournalPublicationHodDashboard=()=>{

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

           doc.addImage(Image, 'PNG', 10, 3, 20, 20);
     doc.addImage(Image2, 'PNG', 12,23, 15, 15);
     doc.addImage(Image3, 'JPG', 175, 3, 20, 15);
     doc.addImage(Image4, 'JPG', 175, 20, 20, 15);

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

       ///////////////
       /////////////////////filter options
       const[year,setYear]=useState([])
       const [currentRecords, setCurrentRecords] = useState([]);
       let [AcdVals,setAcdVals]=useState("")
       const[selectedSem,setSelectedSem]=useState([])
       let [empVals,setEmpVals]=useState("")
       const [emp,setEmp]=useState([])
       
       const[filter,setFilter]=useState({
        "acdyr_id":"",
        "sem_id":"",
        "emp_id":""
    })
    console.log(filter)
       const CustomClearText = () => <>X</>;
  
       const ClearIndicator =(props) =>{
         const {
           children = <CustomClearText />,
           getStyles,
           innerProps: {ref, ...restInnerProps },
         }= props;
         return(
           <div
             {...restInnerProps}
             ref={ref}
             style={getStyles('clearIndicator', props)}
           >
             <div style={{padding: '0px 5px'}}>{children}</div>
           </div>
         )
       }
     
       const ClearIndicatorStyles = (base, state) => ({
         ...base,
         cursor: 'pointer',
         color: state.isFocused ? 'blue' : 'black',
       });
     
       const acdInfoCollect=(eve)=>{
        if(eve.length==0){
          setFilter((old)=>({
            ...old,
            acdyr_id:""
        }))
        }else{
      
          const label = eve.label
          const value = eve.value
          const extraInfo = eve.extraInfo
      
          let isArray = Array.isArray(eve);
          // alert(JSON.stringify(eve))
          if(eve.length==1){
              if(typeof eve[0].value === 'string'){
                  setFilter((old)=>({
                      ...old,
                      [eve[0].extraInfo]:eve[0].value
                  }))
              }else{
              setFilter((old)=>({
                  ...old,
                  [eve[0].extraInfo]:JSON.stringify(eve[0].value)
              }))}
          }
          if(isArray){
              // if(eve.length==1){
              //     if(eve[0].extraInfo=="major_id"){
              //         Sub(eve[0].value)
              //     }
              //     setFilter((old)=>({
              //         ...old,
              //         [eve[0].extraInfo]:eve[0].value
              //     }))
              // }
              if(eve.length!=1){
              
          if(eve[0].extraInfo=="acdyr_id"){
              
                  // alert(JSON.stringify(eve))
                  for(let i=0;i<eve.length;i++){
                      // alert(JSON.stringify(eve[i].value))
                      AcdVals+=eve[i].value
                      if(i!=eve.length-1){
                          AcdVals+=","
                      }
                      setFilter((old)=>({
                          ...old,
                          [eve[i].extraInfo]:AcdVals
                      }))
                  }
                  // alert(majorVals)
              
          }
          }
          }
          else if(extraInfo=="sem_id"){
              setSelectedSem(value)
              // handleChange(value)
              setFilter((old)=>({
                  ...old,
                  [extraInfo]:JSON.stringify(value)
              }))
          }
        
      }
      }
  
      const semInfoCollect=(eve)=>{
        if(eve.length==0){
          setFilter((old)=>({
            ...old,
            sem_id:""
        }))
        }else{
      
        const label = eve.label
        const value = eve.value
        const extraInfo = eve.extraInfo
      
        let isArray = Array.isArray(eve);
        
        if(isArray){
            
            if(eve.length!=1){
            
        if(eve[0].extraInfo=="acdyr_id"){
            
                // alert(JSON.stringify(eve))
                for(let i=0;i<eve.length;i++){
                    // alert(JSON.stringify(eve[i].value))
                    AcdVals+=eve[i].value
                    if(i!=eve.length-1){
                        AcdVals+=","
                    }
                    setFilter((old)=>({
                        ...old,
                        [eve[i].extraInfo]:AcdVals
                    }))
                }
                // alert(majorVals)
            
        }
        }
        }
        else if(extraInfo=="sem_id"){
            setSelectedSem(value)
            // handleChange(value)
            setFilter((old)=>({
                ...old,
                [extraInfo]:JSON.stringify(value)
            }))
        }
        
      }}

      const facInfoCollect=(eve)=>{
        if(eve.length==0){
        setFilter((old)=>({
            ...old,
            emp_id:""
        }))
        }else{
    
        const label = eve.label
        const value = eve.value
        const extraInfo = eve.extraInfo
    
        let isArray = Array.isArray(eve);
        // alert(JSON.stringify(eve))
        if(eve.length==1){
           
            if(typeof eve[0].value === 'string'){
                setFilter((old)=>({
                    ...old,
                    [eve[0].extraInfo]:eve[0].value
                }))
            }else{
            setFilter((old)=>({
                ...old,
                [eve[0].extraInfo]:JSON.stringify(eve[0].value)
            }))}
        }
        if(isArray){
            // if(eve.length==1){
            //     if(eve[0].extraInfo=="major_id"){
            //         Sub(eve[0].value)
            //     }
            //     setFilter((old)=>({
            //         ...old,
            //         [eve[0].extraInfo]:eve[0].value
            //     }))
            // }
            if(eve.length!=1){
            if(eve[0].extraInfo=="emp_id"){
                // Sub(0)
                for(let i=0;i<eve.length;i++){
                    empVals+=eve[i].value
                    if(i!=eve.length-1){
                        empVals+=","
                    }
                    setFilter((old)=>({
                        ...old,
                        [eve[i].extraInfo]:empVals,
                        // sub_id:""
                    }))
                }
                // alert(majorVals)
            
        }
        if(eve[0].extraInfo=="acdyr_id"){
            
                // alert(JSON.stringify(eve))
                for(let i=0;i<eve.length;i++){
                    // alert(JSON.stringify(eve[i].value))
                    AcdVals+=eve[i].value
                    if(i!=eve.length-1){
                        AcdVals+=","
                    }
                    setFilter((old)=>({
                        ...old,
                        [eve[i].extraInfo]:AcdVals
                    }))
                }
                // alert(majorVals)
            
        }
       
        }
        }
        else if(extraInfo=="sem_id"){
            setSelectedSem(value)
            // handleChange(value)
            setFilter((old)=>({
                ...old,
                [extraInfo]:JSON.stringify(value)
            }))
        }
      
    }}
    
     
       const Acad=async()=>{
         const t = await axios.get("http://localhost:1234/setaffilter/getAcdYrList") 
        //  alert(JSON.stringify(t.data.result))
         setYear(t.data.result)
     }
     const years = year.map((val) => ({
      value: val.acd_yr_id,
      label: val.acd_yr,
      extraInfo: "acdyr_id"
      }));
     useEffect(()=>{
       Acad()
       fetchFac()
     },[])
   
     const semester = [
       {sem_id:1,sem:"Odd"},
       {sem_id:2,sem:"Even"},
       {sem_id:3,sem:"Both"},
     ]
     let sems = semester.map((val)=>({
       value: val.sem_id,
       label: val.sem,
       extraInfo: "sem_id"
     }))

     const fetchFac=async()=>{
      await axios.get(`http://localhost:1234/seminar/findFacWithDept/${logged.dept_id}`)
              .then((response) => {
              console.log(response);
              setEmp(response.data.rows);
              })
      }

     const facs=emp.map((val)=>({
      value: val.faculty_id,
      label: val.faculty_name,
      extraInfo: "emp_id"
      }))
     
     const onClickFilter=async()=>{
      alert("clicked")
      alert(JSON.stringify(filter))
      try{
          // alert("hi")
          const logged=JSON.parse(sessionStorage.getItem("person"))
          const filteredRecords=await axios.post(`http://localhost:1234/setaf/filterSetaf/hod/data_setaf_journal_publication/${logged.dept_id}`,filter)
          setJournalRecs(filteredRecords.data.resultArray)
          console.log(filteredRecords.data)
          setCurrentRecords(filteredRecords.data.resultArray)
      }
      catch(err){
          alert("No Reports in the selected filter")
          console.log(err)
      }
  
    }

    ///////////////journal fetch code
    const [journalRecs,setJournalRecs]=useState([])
    useEffect(()=>{
        FetchJournalRecords()
    },[])
    const logged=JSON.parse(sessionStorage.getItem("person"))


    const FetchJournalRecords=async()=>{
        try{
            const temp = await journalRecordsDept(`${logged.dept_id}`)
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
        <div>
        <div> <p>&nbsp;</p>
        <p>&nbsp;</p>

        </div>
        <div className="filter-dropdowns" style={{width:'100%',display:'flex',marginTop:"120px",alignItems:'center',marginLeft:'-5%',justifyContent:'center'}}>
        <label for="acdyr_id">Academic Year : </label>
       <Select
             closeMenuOnSelect={false}
             components={{ ClearIndicator }}
             styles={{ clearIndicator: ClearIndicatorStyles }}
             defaultValue={[]}
             name="acdyr_id"
             onChange={acdInfoCollect}
             isSearchable
             isMulti
             options={years}
           />

       
       {/* Filter of Sem--------------------------------------------------------- */}
       <label for="sem_id">Semester : </label>
    <Select
      closeMenuOnSelect={false}
      components={{ ClearIndicator }}
      styles={{ clearIndicator: ClearIndicatorStyles }}
      defaultValue={[]}
      name="sem_id"
      onChange={semInfoCollect}
      isSearchable
      // isMulti
      options={sems}
    />

<label for="emp_id">Faculty : </label>
    <Select
        closeMenuOnSelect={false}
        components={{ ClearIndicator }}
        styles={{ clearIndicator: ClearIndicatorStyles }}
        defaultValue={[]}
        name="emp_id"
        onChange={facInfoCollect}
        isSearchable
        isMulti
        options={facs}
        />

           <input
  className='filter-button'
  type='button'
  value="Filter"
  onClick={onClickFilter}
  style={{
  
    backgroundColor: '#4CAF50',
    border: 'none',
    color: 'white',
    padding: '10px 15px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '4px 2px',
    cursor: 'pointer',
    borderRadius: '12px'
  }}
/>
</div>
         <div class="overallcontent" style={{maxWidth:"85%",marginLeft:"120px",maxHeight:"50%"}}>
         <div class="report-header">
         <h1 class="recent-Articles">Journal Publication</h1>
           <a className="topic-headings" href="/Setaf/SetafForms/Journalfront"><button style={{top:"27.5px",right:"50px"}} class="views" id="addButton">+ Add</button></a>
         </div>
          
         <table className='table table-striped '>
         <thead>
         <tr>
         <th >Report ID</th>
         <th >Academic Year</th>
         <th>Semester</th>
         <th>Name of the Author's</th>
         <th>Title of the Paper</th>
         <th>Name of the Journal</th>
         <th>Date of Publication</th>
         <th>Download PDF</th>
         
         {/* <th>Journal First Page - PDF</th> */}
         </tr>
         
         {               
                        journalRecs.length>0?
                        journalRecs.map((val)=>(
                            <tr>
                                <td>{val.report_id}</td>
                                <td>{val.acd_yr}</td>
                                <td>{val.sem}</td>
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
         </div>     
        
      
        </>
    )
}




/////////////////conference///////
export const ConferencePublicationHodDashboard=()=>{
    ///////pdf view///////////////
    
const generatePDF = async (report_id)=> {
    try{
        // alert(report_id)
    const res = await axios.get(`http://localhost:1234/setaf/data/conf/${report_id}`);
    const data = res.data;
    const doc = new jsPDF();
    let pdfDocument;
    try{
        const pdfUrl = `/Journal_SETAF/${data.conference_certificate_and_proceeding_pdf}`;
        const pdfResponse = await axios.get(pdfUrl, { responseType: 'arraybuffer' });
        const pdfData = pdfResponse.data;

     pdfDocument = await getDocument({ data: pdfData }).promise;
       }catch(e){
        console.log(e)
       }  
       doc.addImage(Image, 'PNG', 10, 3, 20, 20);
       doc.addImage(Image2, 'PNG', 12,23, 15, 15);
       doc.addImage(Image3, 'JPG', 175, 3, 20, 15);
       doc.addImage(Image4, 'JPG', 175, 20, 20, 15);
  
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
    doc.rect(12, 53, 32, 11).stroke();
    doc.text(`${data.dept}`,25,60)
    doc.rect(90,38,32,11)
    doc.text('SETAF', 97, 45);
    doc.rect(50,54,112,11)
    doc.text("Conference Publication and Presentations",56,61)
    
    doc.rect(168, 53, 30, 11).stroke();
    doc.setFontSize(15); 
    doc.text(`${data.acd_yr}`,173,60)
    
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

    ////////////data fetch code/////////////////

    const [conferenceRecs,setConferenceRecs]=useState([])
    useEffect(()=>{
        fetchConferenceRecords()
    },[])
    const logged=JSON.parse(sessionStorage.getItem("person"))


    const fetchConferenceRecords=async()=>{
        try{
            const temp = await conferenceRecordsDept(`${logged.dept_id}`)
        // console.log(temp.data)
        setConferenceRecs(temp.data)
        }
        catch(e){
            console.log(e);
        }
    }

    return(
        <>
         <div class="overallcontent"  style={{maxWidth:"85%",marginLeft:"120px",maxHeight:"50%"}}>
         <div class="report-header">
         <h1 class="recent-Articles">Your Reports</h1>
         <a className="topic-headings" href="Setaf/SetafForms/Conferencefront"><button style={{top:"27.5px",right:"50px"}} class="views" id="addButton">+ Add</button></a>
         </div>
         <table className='table table-striped '>                           
          <thead>
          <tr>
                            <th>Report ID</th>
                            <th>Accademic Year</th>
                            <th>Semester</th>
                            <th>Name of the Author's</th>
                            <th>Title of the Conference Paper</th>
                            <th>Name of the Conference</th>
                            <th>Place of the Conference</th>
                            <th>Conference Type</th>
                            <th>Date of Conference</th>
                            <th>Download PDF</th>
                            
                          
          </tr>
          {               
                       conferenceRecs.length>0?
                       conferenceRecs.map((val)=>(
                            <tr>
                                <td>{val.report_id}</td>
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


///////////////workshop/////////////
export const WorkshopHodDashboard=()=>{
  const log=JSON.parse(sessionStorage.getItem('person'));

  const generatePDF = async (report_id)=> {
      try{
          // alert(report_id)
      const res = await axios.get(`http://localhost:1234/setaf/data/workshop/${report_id}`);
      const data = res.data;
      const doc = new jsPDF(); 
      let pdfDocument;
      try{
          const pdfUrl = `/Journal_SETAF/${data.certificates_pdf}`;
          const pdfResponse = await axios.get(pdfUrl, { responseType: 'arraybuffer' });
          const pdfData = pdfResponse.data;
  
       pdfDocument = await getDocument({ data: pdfData }).promise;
         }catch(e){
          console.log(e)
         }  
  
       doc.addImage(Image, 'PNG', 10, 3, 20, 20);
       doc.addImage(Image2, 'PNG', 12,23, 15, 15);
       doc.addImage(Image3, 'JPG', 175, 3, 20, 15);
       doc.addImage(Image4, 'JPG', 175, 20, 20, 15);
  
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
        doc.rect(12, 53, 32, 11).stroke();
        doc.text(`${data.dept}`,25,60)
        doc.rect(90,38,32,11)
        doc.text('SETAF', 97, 45);
        doc.rect(70,54,72,11)
        doc.text("Workshop and Seminar",79,61)
        
        doc.rect(168, 53, 30, 11).stroke();
        doc.setFontSize(15); 
        doc.text(`${data.acd_yr}`,173,60)
      
      doc.rect(12, 80, 64, 12).stroke();
      doc.text('Designation', 14, 88);
      doc.setFont("times", "");
      doc.rect(76, 80, 126, 12).stroke();
      doc.text(`${data.designation}`, 80, 88);
      
      doc.setFont("times", "bold");
      doc.rect(12, 92, 64, 12).stroke();
      doc.text('Nature of the Program', 14, 100);
      doc.setFont("times", "");
      doc.rect(76, 92, 126, 12).stroke();
      doc.text(`${data.nature_of_the_program}`, 80, 100);
      
      doc.setFont("times", "bold");
      doc.rect(12, 104, 64, 12).stroke();
      doc.text('Title of the Program', 14, 112);
      doc.setFont("times", "");
      doc.rect(76, 104, 126, 12).stroke();
      doc.text(`${data.title_of_the_program}`, 80, 112);
      doc.setFont("times", "bold");
      doc.rect(12, 116, 64, 12).stroke();
      doc.text('Participation', 14, 124);
      doc.setFont("times", "");
      doc.rect(76, 116, 126, 12).stroke();
      doc.text(`${data.participation}`, 80, 124);

      doc.setFont("times", "bold");
      doc.rect(12, 128, 64, 12).stroke();
      doc.text('Name of the Organization', 14, 136);
      doc.setFont("times", "");
      doc.rect(76, 128, 126, 12).stroke();
      doc.text(`${data.name_of_the_organization_and_place}`, 80, 136);
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

///////////////////////    

  const [workshopRecs,setWorkshopRecs]=useState([])
  useEffect(()=>{
      fetchWorkshopRecords()
  },[])
  const logged=JSON.parse(sessionStorage.getItem("person"))


  const fetchWorkshopRecords=async()=>{
     try{
      const temp = await workshopRecordsDept(`${logged.dept_id}`)
      // console.log(temp.data)
      setWorkshopRecs(temp.data)
     }
      
     catch(e){
      console.log(e);
     }

  }
  return(
      <>
       <div class="overallcontent" style={{maxWidth:"85%",marginLeft:"120px",maxHeight:"50%"}}>
       <div class="report-header">
       <h1 class="recent-Articles">Your Reports</h1>
       <a className="topic-headings" href="Setaf/SetafForms/Workshopfront"><button style={{top:"27.5px",right:"50px"}} class="views" id="addButton">+ Add</button></a>
       </div>
       <table className='table table-striped '>
        <thead>
        <tr>
                          <th>Report ID</th>
                          <th>Designation</th>
                          <th>Nature of the program</th>
                          <th>Title of the program</th>
                          <th>Duration From (Date)</th>
                          <th>Duration To (DAte)</th>
                          <th>Participation</th>
                          <th>Name of the Organization and Place</th>
                          <th>Location of Organization</th> 
                          <th>Download PDF</th>    
        </tr>
        {             
                      workshopRecs.length>0?   
                      workshopRecs.map((val)=>(
                          <tr>
                              <td>{val.report_id}</td>
                              <td>{val.designation}</td>
                              <td>{val.nature_of_the_program}</td>
                              <td>{val.title_of_the_program}</td>
                              <td>{val.duration_from}</td>
                              <td>{val.duration_to}</td>
                              <td>{val.participation}</td>
                              <td>{val.name_of_the_organization_and_place}</td>
                              <td>{val.location_of_organization}</td>
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
////////Tech talk/////////

export const TechtalkHodView=()=>{
  const [techtalkRecs,setTechtalksRecs]=useState([])
  useEffect(()=>{
      fetchTechtalkRecords()
  },[])
  const logged=JSON.parse(sessionStorage.getItem("person"))


  const fetchTechtalkRecords=async()=>{
      try{
          const temp = await techtalkRecordsDept(`${logged.dept_id}`)
      // console.log(temp.data)
      setTechtalksRecs(temp.data)
      }
      catch(e){
          console.log(e)
      }

  }


  ///////////////////////pdf view code///////////////////
  const log=JSON.parse(sessionStorage.getItem('person'));

  const generatePDF = async (report_id)=> {
      try{
          // alert(report_id)
      const res = await axios.get(`http://localhost:1234/setaf/data/techtalk/${report_id}`);
      const data = res.data;
      const doc = new jsPDF(); 
      let pdfDocument;
      let pdfDocument2;
      
      try{
          const pdfUrl = `/Journal_SETAF/${data.attendance_sheet_pdf}`;
          const pdfResponse = await axios.get(pdfUrl, { responseType: 'arraybuffer' });
          const pdfData = pdfResponse.data;
  
       pdfDocument = await getDocument({ data: pdfData }).promise;
         }catch(e){
          console.log(e)
         }  
         try{
          const pdfUrl = `/Journal_SETAF/${data.handout_of_lecture_pdf}`;
          const pdfResponse = await axios.get(pdfUrl, { responseType: 'arraybuffer' });
          const pdfData = pdfResponse.data;
  
       pdfDocument2 = await getDocument({ data: pdfData }).promise;
         }catch(e){
          console.log(e)
         } 
  
       doc.addImage(Image, 'PNG', 10, 3, 20, 20);
       doc.addImage(Image2, 'PNG', 12,23, 15, 15);
       doc.addImage(Image3, 'JPG', 175, 3, 20, 15);
       doc.addImage(Image4, 'JPG', 175, 20, 20, 15);
  
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
        doc.rect(12, 53, 32, 11).stroke();
        doc.text(`${data.dept}`,25,60)
        doc.rect(90,38,32,11)
        doc.text('SETAF', 97, 45);
        doc.rect(50,54,112,11)
        doc.text("Tech Talk to be Delivered Multidisciplinary ",56,61)
        
        doc.rect(168, 53, 30, 11).stroke();
        doc.setFontSize(15); 
        doc.text(`${data.acd_yr}`,173,60)
      
        doc.rect(12, 80, 84, 12).stroke();
        doc.text('Name of the Faculty', 14, 88);
        doc.setFont("times", "");
        doc.rect(96, 80, 102, 12).stroke();
        doc.text(`${data.name_of_the_faculty}`, 100, 88);
        
        doc.setFont("times", "bold");
        doc.rect(12, 92, 84, 12).stroke();
        doc.text('MUDIL Number', 14, 100);
        doc.setFont("times", "");
        doc.rect(96, 92, 102, 12).stroke();
        doc.text(`${data.MuDiL_number}`, 100, 100);
        
        doc.setFont("times", "bold");
        doc.rect(12, 104, 84, 12).stroke();
        doc.text('Lecture Delievered to the Branch', 14, 112);
        doc.setFont("times", "");
        doc.rect(96, 104, 102, 12).stroke();
        doc.text(`${data.dept}`, 100, 112);
        doc.setFont("times", "bold");
        doc.rect(12, 116, 84, 12).stroke();
        doc.text('Topic of Discussion', 14, 124);
        doc.setFont("times", "");
        doc.rect(96, 116, 102, 12).stroke();
        doc.text(`${data.topic_of_discussion}`, 100, 124);

        doc.setFont("times", "bold");
        doc.rect(12, 128, 84, 12).stroke();
        doc.text('No of Beneficiaries', 14, 136);
        doc.setFont("times", "");
        doc.rect(96, 128, 102, 12).stroke();
        doc.text(`${data.no_of_beneficiaries}`, 100, 136);
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
        
        try{ 
          // Add pages from the original PDF
          for (let pageNumber = 1; pageNumber <= pdfDocument2.numPages; pageNumber++) {
            const page = await pdfDocument2.getPage(pageNumber);
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
/////////// 

  return(
      <>
       <div class="overallcontent" style={{maxWidth:"85%",marginLeft:"120px",maxHeight:"50%"}}>
       <div class="report-header">
       <h1 class="recent-Articles">Tech Talk to be delivered Multidisciplinary Lectures</h1>
       <a className="topic-headings" href="Setaf/SetafForms/techtalks"><button style={{top:"27.5px",right:"50px"}} class="views" id="addButton">+ Add</button></a>
       </div>
       <table className='table table-striped '>
        <thead>
        <tr>
                          <th>MuDiL naumber</th>
                          <th>Lecture delivered to branch</th>
                          <th>Semester</th>
                          <th>Section</th>
                          <th>Data of lecture delivered</th>
                          <th>Topic of discussion</th>
                          <th>No of beneficiaries</th>
                          <th>Outcome of the discussion</th>
                          <th>Outcome of the activity</th>
                          <th>Download PDF</th>
        </tr>
        {             
                      techtalkRecs.length>0?  
                      techtalkRecs.map((val)=>(
                          <tr>  
                              <td>{val.MuDiL_number}</td>
                              <td>{val.dept}</td>
                              <td>{val.semester}</td>
                              <td>{val.section}</td>
                              <td>{dateFormat(val.data_of_lecture_delivered,'dd-mm-yyyy')}</td>
                              <td>{val.topic_of_discussion}</td>
                              <td>{val.no_of_beneficiaries}</td>
                              <td>{val.outcome_of_the_discussion}</td>
                              <td>{val.outcome_of_the_activity}</td>
                              <td><button onClick={async()=>{generatePDF(val.report_id)}}>View</button></td>
                              
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

export const FacultyGuestTalkHodDashboard=()=>{
  const generatePDF = async (report_id)=> {
      try{
          // alert(report_id)
      const res = await axios.get(`http://localhost:1234/setaf/data/faculty/${report_id}`);
      const data = res.data;
      const doc = new jsPDF();
      jsPDF.API.events.push(["addFonts", callAddBoldFont]);
      let pdfDocument;
      try{
          const pdfUrl = `/Journal_SETAF/${data.letter_of_appreciation_or_certificate_pdf}`;
          const pdfResponse = await axios.get(pdfUrl, { responseType: 'arraybuffer' });
          const pdfData = pdfResponse.data;
          
       pdfDocument = await getDocument({ data: pdfData }).promise;
         }catch(e){
          console.log(e)
         }  
      doc.addImage(Image, 'PNG', 10, 3, 20, 20);
      doc.addImage(Image2, 'PNG', 12,23, 15, 15);
      doc.addImage(Image3, 'JPG', 175, 3, 20, 15);
      doc.addImage(Image4, 'JPG', 175, 20, 20, 15);

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
      doc.rect(12, 54, 32, 11).stroke();
      doc.text(`${data.dept}`,25,61)
      doc.rect(90,38,32,11)
      doc.text('SETAF', 97, 45);
      doc.rect(58,54,94,11)
      doc.text("Faculty Guest Talk in Other Institution",60,61)
      
      doc.rect(168, 54, 30, 11).stroke();
      doc.setFontSize(15); 
      doc.text(`${data.acd_yr}`,172,61)
      
      doc.rect(12, 80, 80, 12).stroke();
      doc.text('Name of the Faculty', 14, 88);
      doc.setFont("times", "");
      doc.rect(92, 80, 110, 12).stroke();
      doc.text(`${data.name_of_the_faculty}`, 95, 88);
      
      doc.setFont("times", "bold");
      doc.rect(12, 92, 80, 12).stroke();
      doc.text('Topic of the Guest Talk', 14, 100);
      doc.setFont("times", "");
      doc.rect(92, 92, 110, 12).stroke();
      doc.text(`${data.topic_of_guest_talk}`, 95, 100);
      
      doc.setFont("times", "bold");
      doc.rect(12, 104, 80, 12).stroke();
      doc.text('Name of Institution/Industry', 14, 112);
      doc.setFont("times", "");
      doc.rect(92, 104, 110, 12).stroke();
      doc.text(`${data.name_of_institution_or_industry}`, 95, 112);
      
      doc.setFont("times", "bold");
      doc.rect(12, 116, 80, 12).stroke();
      doc.text('Place of Institution/Industry', 14, 124);
      doc.setFont("times", "");
      doc.rect(92, 116, 110, 12).stroke();
      doc.text(`${data.place_of_institution_or_industry}`, 95, 124);

      try{ 
          // alert("working")
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
          // alert(e);
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




//////////////////////facultyView page fetch code/////////////////////
  const [facultyRecs,setFacultyRecs]=useState([])
  useEffect(()=>{
     fetchFacultyRecords()
  },[])
  const logged=JSON.parse(sessionStorage.getItem("person"))

  const fetchFacultyRecords=async()=>{
      try{
          const temp = await facultyRecordsDept(`${logged.dept_id}`)
      // console.log(temp.data)
      setFacultyRecs(temp.data)
      }
      catch(e){
          console.log(e);
      }
  }
  return(
      <>
       <div class="overallcontent" style={{maxWidth:"85%",marginLeft:"120px",maxHeight:"50%"}}>
       <div class="report-header">
       <h1 class="recent-Articles">Your Reports</h1>
       <a className="topic-headings" href="Setaf/SetafForms/facultyfront"><button style={{top:"27.5px",right:"50px"}} class="views" id="addButton">+ Add</button></a>
       </div>
       <table className='table table-striped'>
        <thead>
        <tr>
                          <th>Report ID</th>
                          <th>Name of the Faculty</th>
                          <th>Academic Year</th>
                          <th>Date</th>
                          <th>Topic of the Guest Talk</th>
                          <th>Name of the Institution or Industry</th>
                          <th>Place of the Institution or Industry</th>
                          <th>No of Beneficiaries</th>
                          <th>Download PDF</th>
                          
        </tr>
                 {       
                      facultyRecs.length>0?        
                      facultyRecs.map((val)=>(
                          <tr>
                              <td>{val.report_id}</td>
                              <td>{val.name_of_the_faculty}</td>
                              <td>{val.acd_yr}</td>
                              <td>{dateFormat(val.date,'dd-mm-yyyy')}</td>
                              <td>{val.topic_of_guest_talk}</td>
                              <td>{val.name_of_institution_or_industry}</td>
                              <td>{val.place_of_institution_or_industry}</td>
                              <td>{val.no_of_beneficaries}</td>
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
////Nptel/////


export const NptelhodDashboard=()=>{

    
  const generatePDF = async (report_id)=> {
      try{
          
      const res = await axios.get(`http://localhost:1234/setaf/nptel/data/${report_id}`);
      const data = res.data;
      const doc = new jsPDF();
      let pdfDocument;
      try{
        const pdfUrl = `/Journal_SETAF/${data.certificate_pdf}`;
        const pdfResponse = await axios.get(pdfUrl, { responseType: 'arraybuffer' });
        // alert("working")
        const pdfData = pdfResponse.data;

     pdfDocument = await getDocument({ data: pdfData }).promise;
       }catch(e){
        console.log(e)
       }  
    doc.addImage(Image, 'PNG', 10, 3, 20, 20);
doc.addImage(Image2, 'PNG', 12,23, 15, 15);
doc.addImage(Image3, 'JPG', 175, 3, 20, 15);
doc.addImage(Image4, 'JPG', 175, 20, 20, 15);

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
    doc.text('Name of the Faculty', 14, 88);
    doc.setFont("times", "");
    doc.rect(62, 80, 140, 12).stroke();
    doc.text(`${data.name_of_the_faculty}`, 65, 88);
    
    doc.setFont("times", "bold");
    doc.rect(12, 92, 50, 12).stroke();
    doc.text('Session', 14, 100);
    doc.setFont("times", "");
    doc.rect(62, 92, 140, 12).stroke();
    doc.text(`${data.session}`, 65, 100);
    
    doc.setFont("times", "bold");
    doc.rect(12, 104, 50, 12).stroke();
    doc.text('Course Name', 14, 112);
    doc.setFont("times", "");
    doc.rect(62, 104, 140, 12).stroke();
    doc.text(`${data.course_name}`, 65, 112);

    doc.setFont("times", "bold");
    doc.rect(12, 116, 50, 12).stroke();
    doc.text('Score Obtained', 14, 124);
    doc.setFont("times", "");
    doc.rect(62, 116, 140, 12).stroke();
    doc.text(`${data.score_obtained}`, 65, 124);

    doc.setFont("times", "bold");
    doc.rect(12, 128, 50, 12).stroke();
    doc.text('Certeficate Type', 14, 136);
    doc.setFont("times", "");
    doc.rect(62, 128, 140, 12).stroke();
    doc.text(`${data.certificate_type}`, 65, 136);
    
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

            ///////////////NPTEL fetch code///////////////
  const [nptelRecs,setnptelRecs]=useState([])
  useEffect(()=>{
      fetchNptelRecords()
  },[])
  const logged=JSON.parse(sessionStorage.getItem("person"))


  const fetchNptelRecords=async()=>{
      try{
          const temp = await NptelRecordsDept(`${logged.dept_id}`)
          // console.log(temp.data)
          setnptelRecs(temp.data)
      }
      catch(e){
          console.log(e);
      }

  }

  return(
      <>
       <div class="overallcontent" style={{maxWidth:"85%",marginLeft:"120px",maxHeight:"50%"}}>
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
                          <th>Download PDF</th>
                          
        </tr>
        {               
                      nptelRecs.length>0?
                      nptelRecs.map((val)=>(
                          <tr>
                              <td>{val.acd_yr}</td>
                              <td>{val.semesters}</td>
                              <td>{val.name_of_the_faculty}</td>
                              <td>{val.year}</td>
                              <td>{val.session}</td>
                              <td>{val.course_name}</td>
                              <td>{val.score_obtained}</td>
                              <td>{val.certificate_type}</td>

                              
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
       
                    
      </>
  )


        }
       

        //////TASTE hod dashboard///////
export const TastehodDashboard=()=>{

          const generatePDF = async (report_id)=> {
              try{
                  
              const res = await axios.get(`http://localhost:1234/setaf/taste/data/${report_id}`);
              const data = res.data;
              const doc = new jsPDF();
      
              let pdfDocument;
        try{
            const pdfUrl = `/Taste_SETAF/${data.Certificate_pdf}`;
            const pdfResponse = await axios.get(pdfUrl, { responseType: 'arraybuffer' });
            const pdfData = pdfResponse.data;
    
         pdfDocument = await getDocument({ data: pdfData }).promise;
           }catch(e){
            console.log(e)
           }  
           doc.addImage(Image, 'PNG', 10, 3, 20, 20);
           doc.addImage(Image2, 'PNG', 12,23, 15, 15);
           doc.addImage(Image3, 'JPG', 175, 3, 20, 15);
           doc.addImage(Image4, 'JPG', 175, 20, 20, 15);
   
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
        doc.rect(12, 54, 32, 11).stroke();
        doc.text(`${data.dept}`,25,61)
        doc.rect(90,38,32,11)
        doc.text('SETAF', 97, 45);
        doc.rect(58,54,94,11)
        doc.text("Participation in TASTE",80,61)
        
        doc.rect(168, 54, 30, 11).stroke();
        doc.setFontSize(15); 
        doc.text(`${data.acd_yr}`,172,61)
        
        doc.rect(12, 80, 57, 12).stroke();
        doc.text('Name of the Faculty', 14, 88);
        doc.setFont("times", "");
        doc.rect(69, 80, 130, 12).stroke();
        doc.text(`${data.name_of_the_faculty}`, 72, 88);
        
        doc.setFont("times", "bold");
        doc.rect(12, 92, 57, 12).stroke();
        doc.text('Resource Person Name', 14, 100);
        doc.setFont("times", "");
        doc.rect(69, 92, 130, 12).stroke();
        doc.text(`${data.resource_person_name}`, 72, 100);
        
        doc.setFont("times", "bold");
        doc.rect(12, 104, 57, 12).stroke();
        doc.text('Seminar Topic', 14, 112);
        doc.setFont("times", "");
        doc.rect(69, 104, 130, 12).stroke();
        doc.text(`${data.seminar_topic}`, 72, 112);

        doc.setFont("times", "bold");
        doc.rect(12, 116, 57, 12).stroke();
        doc.text('Taste Number', 14, 124);
        doc.setFont("times", "");
        doc.rect(69, 116, 130, 12).stroke();
        doc.text(`${data.taste_number}`, 72, 124);
        
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



      
      //////TASTE fetch Code////
          const [tasteRecs,setTasteRecs]=useState([])
          useEffect(()=>{
             fetchTasteRecords()
          },[])
          const logged=JSON.parse(sessionStorage.getItem("person"))
      
          const fetchTasteRecords=async()=>{
              try{
              const temp = await tasteRecordsDept(`${logged.dept_id}`)
              // console.log(temp.data)
              setTasteRecs(temp.data)
              }
              catch(e){
                  console.log(e);
              }
      
          }
          return(
              <>
               <div class="overallcontent" style={{maxWidth:"85%",marginLeft:"120px",maxHeight:"50%"}}>
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
                                  <th>Download PDF</th>

                                  
                </tr>
                {               
                              tasteRecs.map((val)=>(
                                  <tr>
                                      <td>{val.name_of_the_faculty}</td>
                                      <td>{dateFormat(val.date,'dd-mm-yyyy')}</td>
                                      <td>{val.taste_number}</td>
                                      <td>{val.seminar_topic}</td>
                                      <td>{val.resource_person_name}</td>
                                      <td>{val.outcome_of_the_activity}</td>
      
                                      <td><button onClick={async()=>{generatePDF(val.report_id)}}>View</button></td>
                  
                                  </tr>
                              ))
                          }
                </thead>
               </table>
               </div>
               
                            
              </>
          )
      }
/////SEED money Proposal///////////

export const SeedHodDashboard=()=>{


  const generatePDF = async (report_id)=> {
      try{
          // alert(report_id)
      const res = await axios.get(`http://localhost:1234/setaf/seeddata/${report_id}`);
      const data = res.data;
      const doc = new jsPDF();

      let pdfDocument;
      try{
          const pdfUrl = `/Journal_SETAF/${data.metrf_sanction_letter_pdf}`;
          const pdfResponse = await axios.get(pdfUrl, { responseType: 'arraybuffer' });
          const pdfData = pdfResponse.data;
  
       pdfDocument = await getDocument({ data: pdfData }).promise;
         }catch(e){
          console.log(e)
         }  
         doc.setFontSize(18);
         doc.addImage(Image, 'PNG', 10, 3, 20, 20);
         doc.addImage(Image2, 'PNG', 12,23, 15, 15);
         doc.addImage(Image3, 'JPG', 175, 3, 20, 15);
         doc.addImage(Image4, 'JPG', 175, 20, 20, 15);
    
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
      doc.rect(12, 54, 32, 11).stroke();
      doc.text(`${data.dept}`,25,61)
      doc.rect(90,38,32,11)
      doc.text('SETAF', 97, 45);
      doc.rect(58,54,94,11)
      doc.text("Seed Money Proposal for Research",70,61)
      
      doc.rect(168, 54, 30, 11).stroke();
      doc.setFontSize(15); 
      doc.text(`${data.acd_yr}`,172,61)
      
      doc.rect(12, 80, 50, 12).stroke();
      doc.text('Title of the Project', 14, 88);
      doc.setFont("times", "");
      doc.rect(62, 80, 140, 12).stroke();
      doc.text(`${data.title_of_the_research_project}`, 65, 88);
      
      doc.setFont("times", "bold");
      doc.rect(12, 92, 50, 12).stroke();
      doc.text('Name of the Faculty', 14, 100);
      doc.setFont("times", "");
      doc.rect(62, 92, 140, 12).stroke();
      doc.text(`${data.name_of_the_faculty}`, 65, 100);
      
      doc.setFont("times", "bold");
      doc.rect(12, 104, 50, 12).stroke();
      doc.text('Amout of Seed money', 14, 112);
      doc.setFont("times", "");
      doc.rect(62, 104, 140, 12).stroke();
      doc.text(`${data.amount_of_seed_money}`, 65, 112);
      
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

///seed fetch code////
  const [seedRecs,setSeedRecs]=useState([])
  useEffect(()=>{
     fetchSeedRecords()
  },[])
  const logged=JSON.parse(sessionStorage.getItem("person"))

  const fetchSeedRecords=async()=>{
      const temp = await seedRecordsDept(`${logged.dept_id}`)
      // console.log(temp.data)
      setSeedRecs(temp.data)
      // alert(JSON.stringify(temp.data));

  }
  return(
      <>
       <div class="overallcontent" style={{maxWidth:"85%",marginLeft:"120px",maxHeight:"50%"}}>
       <div class="report-header">
       <h1 class="recent-Articles">Your Reports</h1>
       <a className="topic-headings" href="/Setaf/SetafForms/seedfront"><button style={{top:"27.5px",right:"50px"}} class="views" id="addButton">+ Add</button></a>
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
                          <th>Download PDF</th>
                          {/* <th>METRF Sanction Letter PDF</th>                    */}
        </tr>
        {               
                      seedRecs.map((val)=>(
                          <tr>
                              <td>{val.academic_year}</td>
                              <td>{val.semester}</td>
                              <td>{val.name_of_the_faculty}</td>
                              <td>{val.title_of_the_research_project}</td>
                              <td>{val.amount_of_seed_money}</td>
                              <td>{val.year_of_receiving}</td>
                              {/* <th>{val.metrf_sanction_letter_pdf}</th> */}

                              <th><button onClick={async()=>{generatePDF(val.report_id)}}>View</button></th>
          
                          </tr>
                      ))
                  }
        </thead>
       </table>
       </div>
       
                    
      </>
  );
}

///////////////////consultancy////////////////////////////////////

export const ConsultancyHodDashboard =()=>{

  const [consultancyRecs,setconsultancyRecs]=useState([])
 
   useEffect(()=>{
      fetchconsultancyRecords()
  },[])
  const logged=JSON.parse(sessionStorage.getItem("person"))


  const fetchconsultancyRecords=async()=>{
      const temp = await consultancyRecordsDept(`${logged.dept_id}`)
      // console.log(temp.data)
      setconsultancyRecs(temp.data)
  }

 /////////////////////////////////////////////////////////////////////////////PDF VIWE //////////////////////////////
 const generatePDF = async (report_id)=> {
  try{
      // alert(report_id)
  const res = await axios.get(`http://localhost:1234/setaf/consultancy_data/${report_id}`);
  const data = res.data;
  const doc = new jsPDF();

  let pdfDocument;
  try{
      const pdfUrl = `/Journal_SETAF/${data.enclose_proof_pdf}`;
      const pdfResponse = await axios.get(pdfUrl, { responseType: 'arraybuffer' });
      const pdfData = pdfResponse.data;

   pdfDocument = await getDocument({ data: pdfData }).promise;
     }catch(e){
      console.log(e)
     }  
     doc.addImage(Image, 'PNG', 10, 3, 20, 20);
     doc.addImage(Image2, 'PNG', 12,23, 15, 15);
     doc.addImage(Image3, 'JPG', 175, 3, 20, 15);
     doc.addImage(Image4, 'JPG', 175, 20, 20, 15);

     doc.setFontSize(18);
     doc.setFont("times", "bold");
     doc.text('MUTHAYAMMAL ENGINEERING COLLEGE',35, 15);
     doc.setFontSize(10);
     doc.setFont("times", "");
     doc.text('(An Autonomous Institution)', 80, 20);
     doc.text('(Approved by AICTE, New Delhi, Accredited by NAAC & Affiliated to Anna University)', 35, 25);
     doc.text('Rasipuram - 637 408, Namakkal Dist., Tamil Nadu', 65, 30);
     doc.setFont("times", "bold");
     
     doc.setFont("times", "bold");
  
     doc.setFontSize(15); 
     doc.rect(12, 54, 32, 11).stroke();
     doc.text(`${data.dept}`,25,61)
     doc.rect(90,38,32,11)
     doc.text('SETAF', 97, 45);
     doc.rect(46,54,120,11)
     doc.text("CONSULTANCY AND CORPORATE TRAINING",47,61)
     
     doc.rect(168, 54, 28, 11).stroke();
     doc.setFontSize(15); 
     doc.text(`${data.acd_yr}`,172,61)

  doc.rect(12, 80, 80, 12).stroke();
  doc.text('Name of the faculty', 14, 88);
  doc.setFont("times", "");
  doc.rect(92, 80, 105, 12).stroke();
  doc.text(`${data.name_of_the_faculty}`, 98, 88);

  doc.setFont("times", "bold");
  doc.rect(12, 92, 80, 12).stroke();
  doc.text('Name of consultancy project', 14, 100);
  doc.setFont("times", "");
  doc.rect(92, 92, 105, 12).stroke();
  doc.text(`${data.name_of_consultancy_project}`, 98, 100);
  
  doc.setFont("times", "bold");
  doc.rect(12, 104, 80, 12).stroke();
  doc.text('Sponsoring agency details', 14, 112);
  doc.setFont("times", "");
  doc.rect(92, 104, 105, 12).stroke();
  doc.text(`${data.sponsoring_agency_details}`, 98, 112);

  doc.setFont("times", "bold");
  doc.rect(12, 116, 80, 12).stroke();
  doc.text('Sponsoring agency contact details', 14, 124);
  doc.setFont("times", "");
  doc.rect(92, 116, 105, 12).stroke();
  doc.text(`${data.sponsoring_agency_contact_details}`, 98, 124);

  doc.setFont("times", "bold");
  doc.rect(12, 128, 80, 12).stroke();
  doc.text('Revenue Generated', 14, 136);
  doc.setFont("times", "");
  doc.rect(92, 128, 105, 12).stroke();
  doc.text(`${data.revenue_generated}`, 98, 136);
  
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

 
  return(
      <>
      
      <div>
       <div class="overallcontent" style={{maxWidth:"85%",marginLeft:"120px",maxHeight:"50%"}}>
       <div class="report-header">
       <h1 class="recent-Articles">Your Reports</h1>
       <a className="topic-headings" href="/Setaf/SetafForms/Consultancyfront"><button style={{top:"27.5px",right:"50px"}} class="views" id="addButton">+ Add</button></a>
       </div>
       <table className='table table-striped '>
       <thead >
       <tr className="table-active">
          <th>Academic Year/Semester</th>
          {/* <th style={{width:"120px"}}>Semester</th> */}
          <th  style={{width:"150px"}}>Name of the faculty</th>
          <th>Name of consultancy project</th>
          <th>Sponsoring agency details</th>
          <th>Sponsoring agency contact details</th>
          <th style={{width:"120px"}}>Date</th>
          <th>Revenue Generated</th>
          <th>Number of Trainees</th>
          {/* <th>enclose_proof_pdf</th> */}
          <th>REPORT VIEW</th>
       {/* <th>Journal First Page - PDF</th> */}
       </tr>
       {               
                      consultancyRecs.length>0? 
                      consultancyRecs.map((val)=>(
                          <tr className="table-striped">
                              <td>{val.acd_yr}/{val.semester}</td>
                              <td>{val.name_of_the_faculty}</td>
                              <td>{val.name_of_consultancy_project}</td>
                              <td>{val.sponsoring_agency_details}</td>
                              <td>{val.sponsoring_agency_contact_details  }</td>
                              <td>{dateFormat(val.date,'dd-mm-yyyy')}</td>
                              <td>{val.revenue_generated}</td>
                              <td>{val.number_to_trainees}</td>
                              {/* <th>{val.enclose_proof_pdf}</th> */}
                              <td><button onClick={async()=>{generatePDF(val.report_id)}}>View</button></td>
                          </tr>
                      ))
                      :
                      <tr>No records</tr>
                  }
       </thead>         
       </table>
       </div>
       </div>
      </>
  )
}
//////////////////////////////patent filled/////////////////////////////////
export const PatentsfilledHod=()=>{

  const [patentRecs,setpatentRecs]=useState([])
  useEffect(()=>{
      fetchpatentRecords()
  },[])

  const logged=JSON.parse(sessionStorage.getItem("person"))
  // emp_id=logged.faculty_id
  const fetchpatentRecords=async()=>{
    try{
        const temp = await patentRecordsDept(`${logged.dept_id}`)
        // console.log(temp.data)
        setpatentRecs(temp.data)
    }
    catch(e){
        console.log(e)
    }

  }

        ////////////////////////PDF////////////////////////////////////////
     const generatePDF = async (report_id)=> {
      try{
        // alert(report_id)
    const res = await axios.get(`http://localhost:1234/setaf/patent/data/${report_id}`);
    const data = res.data;
    const doc = new jsPDF();

    let pdfDocument;
    try{
        const pdfUrl = `/Journal_SETAF/${data.enclose_first_page_pdf}`;
        const pdfResponse = await axios.get(pdfUrl, { responseType: 'arraybuffer' });
        const pdfData = pdfResponse.data;

     pdfDocument = await getDocument({ data: pdfData }).promise;
       }catch(e){
        console.log(e)
       }  
       
   doc.addImage(Image, 'PNG', 10, 3, 20, 20);
   doc.addImage(Image2, 'PNG', 12,23, 15, 15);
   doc.addImage(Image3, 'JPG', 175, 3, 20, 15);
   doc.addImage(Image4, 'JPG', 175, 20, 20, 15);

   doc.setFontSize(18);
   doc.setFont("times", "bold");
   doc.text('MUTHAYAMMAL ENGINEERING COLLEGE',35, 15);
   doc.setFontSize(10);
   doc.setFont("times", "");
   doc.text('(An Autonomous Institution)', 80, 20);
   doc.text('(Approved by AICTE, New Delhi, Accredited by NAAC & Affiliated to Anna University)', 35, 25);
   doc.text('Rasipuram - 637 408, Namakkal Dist., Tamil Nadu', 65, 30);
   doc.setFont("times", "bold");
   
   doc.setFont("times", "bold");

   doc.setFontSize(15); 
   doc.rect(12, 54, 32, 11).stroke();
   doc.text(`${data.dept}`,25,61)
   doc.rect(90,38,32,11)
   doc.text('SETAF', 97, 45);
   doc.rect(46,54,120,11)
   doc.text("PATENT FILLED PUBLISHED GRANTED",59,61)
   
   doc.rect(168, 54, 28, 11).stroke();
   doc.setFontSize(15); 
   doc.text(`${data.acd_yr}`,172,61)

    doc.rect(12, 80, 70, 12).stroke();
    doc.text('Name of the faculty', 14, 88);
    doc.setFont("times", "");
    doc.rect(82, 80, 120, 12).stroke();
    doc.text(`${data.name_of_the_faculty}`, 90, 88);
    //name_of_consultancy_project
    doc.setFont("times", "bold");
    doc.rect(12, 92, 70, 12).stroke();
    doc.text('Title of the patent', 14, 100);
    doc.setFont("times", "");
    doc.rect(82, 92, 120, 12).stroke();
    doc.text(`${data.title_of_the_patent}`, 90, 100);
    
    doc.setFont("times", "bold");
    doc.rect(12, 104, 70, 12).stroke();
    doc.text('Application No', 14, 112);
    doc.setFont("times", "");
    doc.rect(82, 104, 120, 12).stroke();
    doc.text(`${data.application_no}`, 90, 112);

    doc.setFont("times", "bold");
    doc.rect(12, 116, 70, 12).stroke();
    doc.text('Date of application', 14, 124);
    doc.setFont("times", "");
    doc.rect(82, 116, 120, 12).stroke();
    doc.text(`${dateFormat(data.date_of_application, "dd-mm-yyyy")}`, 90 , 124);

    doc.setFont("times", "bold");
    doc.rect(12, 128, 70, 12).stroke();
    doc.text('Date of publication', 14, 136);
    doc.setFont("times", "");
    doc.rect(82, 128, 120, 12).stroke();
    doc.text(`${dateFormat(data.date_of_publication, "dd-mm-yyyy")}`, 90, 136);
    
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


  return(
      <>
     <div class="overallcontent" style={{maxWidth:"85%",marginLeft:"120px",maxHeight:"50%"}}>
       <div class="report-header">
       <h1 class="recent-Articles">Your Reports</h1>
       <a className="topic-headings" href="/Setaf/SetafForms/patentfront"><button style={{top:"27.5px",right:"50px"}} class="views" id="addButton">+ Add</button></a>
    
       </div>
       <table className='table table-striped'>
        <thead>
        <tr className="table-active">
                     <th>Academic Year/Semester</th>
                     <th>Name of the Faculty</th>
                     <th>Title of the patent</th>
                     <th>Application_No</th>
                     <th>Date of application</th>
                     <th>Date of publication</th>
                     <th>REPORT VIEW</th>
        </tr>
       {              
                      patentRecs.length>0? 
                      patentRecs.map((val)=>(
                          <tr>
                              <td>{val.acd_yr}/{val.semester}</td>
                              <td>{val.name_of_the_faculty}</td>
                              <td>{val.title_of_the_patent}</td>
                              <td>{val.application_no }</td>
                              <td>{dateFormat(val.date_of_application, "dd-mm-yyyy")}</td> 
                              <td>{dateFormat(val.date_of_publication,"dd-mm-yyyy")}</td>
                              <td><button onClick={async()=>{generatePDF(val.report_id)}}>View</button></td>
                          </tr>
                      ))
                      :
                      <tr>No records</tr>
                  }
        </thead>
       </table>
       </div>  
       
                    
      </>
  )
}

/////////////////////////////econtent///////////////

export const Econtent=()=>{

  const [EcontentRecs,setEcontentRecs]=useState([])
  useEffect(()=>{
     fetchecontentRecords()
  },[])
  const logged=JSON.parse(sessionStorage.getItem("person"))

  const fetchecontentRecords=async()=>{
      const temp = await EcontentRecordsDept(`${logged.dept_id}`)
      // console.log(temp.data)
      setEcontentRecs(temp.data)

  }

  const generatePDF = async (report_id)=> {
      try{
          // alert(report_id)
      const res = await axios.get(`http://localhost:1234/setaf/data/econtent/${report_id}`);
      const data = res.data;
      const doc = new jsPDF();    
      doc.addImage(Image, 'PNG', 10, 3, 20, 20);
      doc.addImage(Image2, 'PNG', 12,23, 15, 15);
      doc.addImage(Image3, 'JPG', 175, 3, 20, 15);
      doc.addImage(Image4, 'JPG', 175, 20, 20, 15);
 
      doc.setFontSize(18);
      doc.setFont("times", "bold");
      doc.text('MUTHAYAMMAL ENGINEERING COLLEGE',35, 15);
      doc.setFontSize(10);
      doc.setFont("times", "");
      doc.text('(An Autonomous Institution)', 80, 20);
      doc.text('(Approved by AICTE, New Delhi, Accredited by NAAC & Affiliated to Anna University)', 35, 25);
      doc.text('Rasipuram - 637 408, Namakkal Dist., Tamil Nadu', 65, 30);
      doc.setFont("times", "bold");
      
      doc.setFont("times", "bold");
   
      doc.setFontSize(15); 
      doc.rect(12, 54, 32, 11).stroke();
      doc.text(`${data.dept}`,25,61)
      doc.rect(90,38,32,11)
      doc.text('SETAF', 97, 45);
      doc.rect(82,54,50,11)
      doc.text("E-CONTENT",88,61)
      
      doc.rect(168, 54, 28, 11).stroke();
      doc.setFontSize(15); 
      doc.text(`${data.acd_yr}`,172,61)
   
      doc.rect(12, 80, 78, 12).stroke();
      doc.text('Name of the Faculty', 14, 88);
      doc.setFont("times", "");
      doc.rect(90, 80, 112, 12).stroke();
      doc.text(`${data.name_of_the_faculty}`, 100, 88);
      
      doc.setFont("times", "bold");
      doc.rect(12, 92, 78, 12).stroke();
      doc.text('Name of the Module Developed', 14, 100);
      doc.setFont("times", "");
      doc.rect(90, 92, 112, 12).stroke();
      doc.text(`${data.name_of_the_module_developed}`, 100, 100);
      
      doc.setFont("times", "bold");
      doc.rect(12, 104, 78, 12).stroke();
      doc.text('Date of launching e-Content', 14, 112);
      doc.setFont("times", "");
      doc.rect(90, 104, 112, 12).stroke();
      doc.text(`${data.date_of_launching_e_content}`, 100, 112);

      doc.setFont("times", "bold");
      doc.rect(12, 116, 78, 12).stroke();
      doc.text('Link to the Module Developed', 14, 123);
      doc.setFont("times", "");
      doc.rect(90, 116, 112, 12).stroke();
      doc.text(`${data.link_to_the_module_developed}`, 100, 123);
        
  
      
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
  return(
      <>
       <div class="overallcontent" style={{maxWidth:"85%",marginLeft:"120px",maxHeight:"50%"}}>
       <div class="report-header">
       <h1 class="recent-Articles">Your Reports</h1>
       <a className="topic-headings" href="Setaf/SetafForms/Econtentfront"><button style={{top:"27.5px",right:"50px"}} class="views" id="addButton">+ Add</button></a>
       </div>
       <table className='table table-striped'>
        <thead>
        <tr>
                          <th>Academic Year</th>
                          <th>Name of the Faculty</th>
                          <th>Name of the Module Developed</th>
                          <th>Module of Platform</th>
                          <th>Date of launching e-Content</th>
                          <th>Link to the Module Developed</th>
                          <th>Action</th>
                                  
                          
        </tr>
        {              EcontentRecs.length>0?
                      EcontentRecs.map((val)=>(
                          <tr>
                              <td>{val.acd_yr}</td>
                              <td>{val.name_of_the_faculty}</td>
                              <td>{val.name_of_the_module_developed}</td>
                              <td>{val.module_of_platform}</td>
                              <td>{val.date_of_launching_e_content}</td>
                              <td>{val.link_to_the_module_developed}</td> 
                              <td><button onClick={async()=>{generatePDF(val.report_id)}}>View</button></td> 
                          </tr>
                      ))
                      :
                      <tr>No records</tr>
                  }
        </thead>
       </table>
       </div>
       
                    
      </>
  )
}


///////////////////////proposal//////////////////////////////////////////////////////////////////
export const ProposalHodView=()=>{

  const [proposalRecs,setProposalRecs]=useState([])
  useEffect(()=>{
     fetchProposalRecords()
  },[])
  const logged=JSON.parse(sessionStorage.getItem("person"))

  const fetchProposalRecords=async()=>{
      const temp = await ProposalRecordsDept(`${logged.dept_id}`)
      console.log(temp.data)
      setProposalRecs(temp.data)

  }

  const generatePDF = async (report_id)=> {
    try{
    const res = await axios.get(`http://localhost:1234/setaf/proposal_data/${report_id}`);
    const data = res.data;
    const doc = new jsPDF();

    let pdfDocument;
    let pdfDocument2;

    try{
        const pdfUrl = `/Journal_SETAF/${data.proposal_proof_pdf}`;
        const pdfResponse = await axios.get(pdfUrl, { responseType: 'arraybuffer' });
        const pdfData = pdfResponse.data;

     pdfDocument = await getDocument({ data: pdfData }).promise;
       }catch(e){
        console.log(e)
       } 
       try{
        const pdfUrl = `/Journal_SETAF/${data.grant_sanctioned_proof_pdf}`;
        const pdfResponse = await axios.get(pdfUrl, { responseType: 'arraybuffer' });
        const pdfData = pdfResponse.data;

     pdfDocument2 = await getDocument({ data: pdfData }).promise;
       }catch(e){
        console.log(e)
       }  
       doc.addImage(Image, 'PNG', 10, 3, 20, 20);
       doc.addImage(Image2, 'PNG', 12,23, 15, 15);
       doc.addImage(Image3, 'JPG', 175, 3, 20, 15);
       doc.addImage(Image4, 'JPG', 175, 20, 20, 15);

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
       doc.rect(12, 54, 32, 11).stroke();
       doc.text(`${data.dept}`,25,61)
       doc.rect(90,38,32,11)
       doc.text('SETAF', 97, 45);
       doc.rect(56,54,103,11)
       doc.text("PROPOSAL SUBMISSION FOR GRANTS",58,61)
       
       doc.rect(168, 54, 30, 11).stroke();
       doc.setFontSize(15); 
       doc.text(`${data.acd_yr}`,172,61)
    
  
  doc.rect(12, 80, 70, 12).stroke();
  doc.text('Name of the faculty', 14, 88);
  doc.setFont("times", "");
  doc.rect(82, 80, 120, 12).stroke();
  doc.text(`${data.name_of_the_faculty}`, 90, 88);
  //name_of_consultancy_project
  doc.setFont("times", "bold");
  doc.rect(12, 92, 70, 12).stroke();
  doc.text('Name of the Funding Agency', 14, 100);
  doc.setFont("times", "");
  doc.rect(82, 92, 120, 12).stroke();
  doc.text(`${data.name_of_the_funding_agency}`, 90, 100);
  
  doc.setFont("times", "bold");
  doc.rect(12, 104, 70, 12).stroke();
  doc.text('Title of Proposal Submission', 14, 112);
  doc.setFont("times", "");
  doc.rect(82, 104, 120, 12).stroke();
  doc.text(`${data.title_of_the_proposal_submitted}}`, 90, 112);

  doc.setFont("times", "bold");
  doc.rect(12, 116, 70, 12).stroke();
  doc.text('Amount Quoted(in lakhs)', 14, 124);
  doc.setFont("times", "");
  doc.rect(82, 116, 120, 12).stroke();
  doc.text(`${data.amount_quoted_in_lakhs}`,90, 124);

  doc.setFont("times", "bold");
  doc.rect(12, 128, 70, 12).stroke();
  doc.text('Type', 14, 136);
  doc.setFont("times", "");
  doc.rect(82, 128, 120, 12).stroke();
  doc.text(`${data.type}`, 90, 136);
    
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
      try{ 
        // Add pages from the original PDF
        for (let pageNumber = 1; pageNumber <= pdfDocument2.numPages; pageNumber++) {
          const page = await pdfDocument2.getPage(pageNumber);
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
  return(
      <>
       <div class="overallcontent" style={{maxWidth:"85%",marginLeft:"120px",maxHeight:"50%"}}>
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
                          <th>Viwe</th>    
        </tr>
        {               
                      proposalRecs.map((val)=>(
                          <tr>
                              <td>{val.acd_yr}</td>
                              <td>{val.semester}</td>
                              <td>{val.name_of_the_faculty}</td>
                              <td>{val.name_of_the_funding_agency}</td>
                              <td>{dateFormat(val.date_of_submission,"dd-mm-yyyy")}</td>
                              <td>{val.type}</td>
                              <td>{val.title_of_the_proposal_submitted}</td>
                              <td>{dateFormat(val.duration,"dd-mm-yyyy")}</td>
                              <td>{val.amount_quoted_in_lakhs}</td>
                              <td>{val.grant_sanctioned}</td>
                              <td><button onClick={async()=>{generatePDF(val.report_id)}}>View</button></td>
                          </tr>
                      ))
                  }
        </thead>
       </table>
       </div>
       
                    
      </>
  )
}


////Visit to Industry HOD dashboard/////

export const IndustryHodDashboard=()=>{

  const generatePDF = async (report_id)=> {
    try{
        // alert(report_id)
    const res = await axios.get(`http://localhost:1234/setaf/industry/${report_id}`);
    const data = res.data;
    const doc = new jsPDF();

    let pdfDocument;
    let pdfDocument2;
    let pdfDocument3;
    try{
        const pdfUrl = `/Journal_SETAF/${data.report_of_visit_pdf}`;
        const pdfResponse = await axios.get(pdfUrl, { responseType: 'arraybuffer' });
        const pdfData = pdfResponse.data;

     pdfDocument = await getDocument({ data: pdfData }).promise;
       }catch(e){
        console.log(e)
       }  

       try{
        const pdfUrl = `/Journal_SETAF/${data.photo_jpg}`;
        const pdfResponse = await axios.get(pdfUrl, { responseType: 'arraybuffer' });
        const pdfData = pdfResponse.data;

     pdfDocument2 = await getDocument({ data: pdfData }).promise;
       }catch(e){
        console.log(e)
       }  
       try{
        const pdfUrl = `/Journal_SETAF/${data.geotagged_photos_jpg}`;
        const pdfResponse = await axios.get(pdfUrl, { responseType: 'arraybuffer' });
        const pdfData = pdfResponse.data;

     pdfDocument3 = await getDocument({ data: pdfData }).promise;
       }catch(e){
        console.log(e)
       }  

       doc.addImage(Image, 'PNG', 10, 3, 20, 20);
       doc.addImage(Image2, 'PNG', 12,23, 15, 15);
       doc.addImage(Image3, 'JPG', 175, 3, 20, 15);
       doc.addImage(Image4, 'JPG', 175, 20, 20, 15);

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
    doc.rect(12, 54, 32, 11).stroke();
    doc.text(`${data.dept}`,25,61)
    doc.rect(90,38,32,11)
    doc.text('SETAF', 97, 45);
    doc.rect(58,54,94,11)
    doc.text("Visit to Industry and Institution",70,61)
    
    doc.rect(168, 54, 30, 11).stroke();
    doc.setFontSize(15); 
    doc.text(`${data.acd_yr}`,172,61)
    
    doc.rect(12, 80, 50, 12).stroke();
    doc.text('Name of Industry', 14, 88);
    doc.setFont("times", "");
    doc.rect(62, 80, 140, 12).stroke();
    doc.text(`${data.name_of_industry}`, 65, 88);
    
    doc.setFont("times", "bold");
    doc.rect(12, 92, 50, 12).stroke();
    doc.text('Name of the Faculty', 14, 100);
    doc.setFont("times", "");
    doc.rect(62, 92, 140, 12).stroke();
    doc.text(`${data.faculty_name}`, 65, 100);
    
    doc.setFont("times", "bold");
    doc.rect(12, 104, 50, 12).stroke();
    doc.text('Purpose of Visit', 14, 112);
    doc.setFont("times", "");
    doc.rect(62, 104, 140, 12).stroke();
    doc.text(`${data.purpose_of_the_visite}`, 65, 112);
    
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
      try{ 
        // Add pages from the original PDF
        for (let pageNumber = 1; pageNumber <= pdfDocument2.numPages; pageNumber++) {
          const page = await pdfDocument2.getPage(pageNumber);
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
      try{ 
        // Add pages from the original PDF
        for (let pageNumber = 1; pageNumber <= pdfDocument2.numPages; pageNumber++) {
          const page = await pdfDocument3.getPage(pageNumber);
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

  const [industryRecs,setIndustryRecs]=useState([])
  useEffect(()=>{
     fetchIndustryRecords()
  },[])
  const logged=JSON.parse(sessionStorage.getItem("person"))

  const fetchIndustryRecords=async()=>{

      try{
      const temp = await industryRecordsDept(`${logged.dept_id}`)
      // console.log(temp.data)
      setIndustryRecs(temp.data)
      }catch(e){
          console.log(e);
      }

  }
  return(
      <>
       <div class="overallcontent" style={{maxWidth:"85%",marginLeft:"120px",maxHeight:"50%"}}>
       <div class="report-header">
       <h1 class="recent-Articles">Your Reports</h1>
       <a className="topic-headings" href="/Setaf/SetafForms/visittoindustry"><button style={{top:"27.5px",right:"50px"}} class="views" >+ Add</button></a>
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
        {               industryRecs.length>0?
                      industryRecs.map((val)=>(
                          <tr>
                              <td>{val.faculty_name}</td>
                              <td>{dateFormat(val.date_of_visit,'dd-mm-yyyy')}</td>
                              <td>{val.name_of_industry}</td>
                              <td>{val.location_of_industry}</td>
                              <td>{val.website_link_of_industry}</td>
                              <td>{val.name_of_insdustry_instution_person_interacted}</td>
                              <td>{val.designation_of_industry_instution_person_interacted}</td>
                              <td>{val.purpose_of_the_visite}</td>
                              <td>{val.outcome_of_the_activity}</td>
                              {/* <th>{val.report_of_visite_pdf}</th>
                              <th>{val.photo_jpg}</th>
                              <th>{val.geotagged_photos_jpg}</th> */}
                              <th><button onClick={async()=>{generatePDF(val.report_id)}}>View</button></th>
          
                          </tr>
                      ))
                      :
                      <tr>
                          No records
                      </tr>
                  }
        </thead>
       </table>
       </div>
       
                    
      </>
  )
}

export const CollabrativeHod=()=>{

  const [collabrativeRecs,setcollabrativeRecs]=useState([])
  useEffect(()=>{
      fetchcollabrativeRecords()
  },[])

  const logged=JSON.parse(sessionStorage.getItem("person"))
  // emp_id=logged.faculty_id
  const fetchcollabrativeRecords=async()=>{
      try{
          const temp = await collaborativeRecordsDept(`${logged.dept_id}`)
      // console.log(temp.data)
      setcollabrativeRecs(temp.data)
      }catch(e){
          console.log(e)
      }

  }

          ////////////////////////PDF////////////////////////////////////////
   const generatePDF = async (report_id)=> {
      try{
          // alert(report_id)
      const res = await axios.get(`http://localhost:1234/setaf/collaborative_data/${report_id}`);
      const data = res.data;
      const doc = new jsPDF();
  
      let pdfDocument;
      try{
          const pdfUrl = `/Journal_SETAF/${data.enclose_first_page_pdf}`;
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
      doc.text(`${data.dept_id}`, 23, 55);
      doc.rect(88, 48, 32, 11).stroke();
      doc.text('SETAF', 95, 55);
      
      doc.rect(168, 48, 30, 11).stroke();
      doc.setFontSize(15); 
      doc.text(`${data.academic_year}`, 173, 55);
      doc.rect(12, 80, 70, 12).stroke();
      doc.text('Name of the Faculty Coordinator', 14, 88);
      doc.setFont("times", "");
      doc.rect(82, 80, 120, 12).stroke();
      doc.text(`${data.name_of_the_faculty_coordinator}`, 90, 88);
      //name_of_consultancy_project
      doc.setFont("times", "bold");
      doc.rect(12, 92, 70, 12).stroke();
      doc.text('Nature of the activity', 14, 100);
      doc.setFont("times", "");
      doc.rect(82, 92, 120, 12).stroke();
      doc.text(`${data.nature_of_the_activity}`, 90, 100);
      
      doc.setFont("times", "bold");
      doc.rect(12, 104, 70, 12).stroke();
      doc.text('Name of MoU signed industry or institution', 14, 112);
      doc.setFont("times", "");
      doc.rect(82, 104, 120, 12).stroke();
      doc.text(`${data.name_of_MoU_signed_industry_or_institution}`, 90, 112);
  
      doc.setFont("times", "bold");
      doc.rect(12, 116, 70, 12).stroke();
      doc.text('Title of the activity', 14, 124);
      doc.setFont("times", "");
      doc.rect(82, 116, 120, 12).stroke();
      doc.text(`${data.title_of_the_activity}`, 90 , 124);
  
      doc.setFont("times", "bold");
      doc.rect(12, 128, 70, 12).stroke();
      doc.text('Name of resource person', 14, 136);
      doc.setFont("times", "");
      doc.rect(82, 128, 120, 12).stroke();
      doc.text(`${data.name_of_resource_person}`, 90, 136);
      
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


  return(
      <>
       <div class="overallcontent" style={{maxWidth:"85%",marginLeft:"120px",maxHeight:"50%"}}>
       <div class="report-header">
       <h1 class="recent-Articles">Your Reports</h1>
       <a className="topic-headings" href="Setaf/SetafForms/collabrative"><button style={{top:"27.5px",right:"50px"}} class="views" id="addButton">+ Add</button></a>
       </div>
       <table className='table table-striped'>
        <thead>
        <tr>
                     <th>Academic Year/Semester</th>
                     <th>Name of the Faculty Coordinator</th>
                     <th>Nature of the activity</th>
                     <th>Name of MoU signed industry or institution</th>
                     <th>Title of the activity</th>
                     <th>Duration from</th>
                     <th>Duration to</th>
                     <th>Name of resource person</th>
                     <th>Contact details of resource person</th>
                     <th>Designation of resource person</th>
                     <th>Organization details of resource person</th>
                     <th> No of beneficiaries</th>
                     <th>REPORT VIEW</th>
                     {/* <th>Enclose first page pdf</th> */}
        </tr>
       {              
                      collabrativeRecs.length>0? 
                      collabrativeRecs.map((val)=>(
                          <tr>
                              <td>{val.acd_yr}/{val.semester}</td>
                              <td>{val.name_of_the_faculty_coordinator}</td>
                              <td>{val.nature_of_the_activity}</td>
                              <td>{val.name_of_MoU_signed_industry_or_institution}</td>
                              <td>{val.title_of_the_activity}</td>
                              <td>{dateFormat(val.duration_from, "dd-mm-yyyy")}</td> 
                              <td>{dateFormat(val.duration_to,"dd-mm-yyyy")}</td>
                              <td>{val.name_of_resource_person}</td>
                              <td>{val.contact_details_of_resource_person}</td>
                              <td>{val.designation_of_resource_person}</td>
                              <td>{val.organization_details_of_resource_person}</td>
                              <td>{val.no_of_beneficiaries}</td>
                              <td><button onClick={async()=>{generatePDF(val.report_id)}}>View</button></td>

                          </tr>
                      ))
                      :
                      <tr>No records</tr>
                  }
        </thead>
       </table>
       </div>             
      </>
  )
}


//////////////////////////////////Visit to library////////////

export const VisitToLibraryHod=()=>{

  const [VisittoLibrary,setVisitToLibrary]=useState([])
  useEffect(()=>{
     fetchvisittolibrary()
  },[])
  const logged=JSON.parse(sessionStorage.getItem("person"))

  const fetchvisittolibrary=async()=>{
      const temp = await VisitRecordsDept(`${logged.dept_id}`)
      // console.log(temp.data)
      setVisitToLibrary(temp.data)

  }

  const generatePDF = async (report_id)=> {
      try{
          // alert(report_id)
      const res = await axios.get(`http://localhost:1234/setaf/data/visittolibrary/${report_id}`);
      const data = res.data;
      const doc = new jsPDF();    
    
      doc.addImage(Image, 'PNG', 10, 3, 20, 20);
      doc.addImage(Image2, 'PNG', 12,23, 15, 15);
      doc.addImage(Image3, 'JPG', 175, 3, 20, 15);
      doc.addImage(Image4, 'JPG', 175, 20, 20, 15);
 
      doc.setFontSize(18);
      doc.setFont("times", "bold");
      doc.text('MUTHAYAMMAL ENGINEERING COLLEGE',35, 15);
      doc.setFontSize(10);
      doc.setFont("times", "");
      doc.text('(An Autonomous Institution)', 80, 20);
      doc.text('(Approved by AICTE, New Delhi, Accredited by NAAC & Affiliated to Anna University)', 35, 25);
      doc.text('Rasipuram - 637 408, Namakkal Dist., Tamil Nadu', 65, 30);
      doc.setFont("times", "bold");
      
      doc.setFont("times", "bold");
   
      doc.setFontSize(15); 
      doc.rect(12, 54, 32, 11).stroke();
      doc.text(`${data.dept}`,25,61)
      doc.rect(90,38,32,11)
      doc.text('SETAF', 97, 45);
      doc.rect(82,54,52,11)
      doc.text("VISIT TO LIBRARY",84,61)

      doc.rect(168, 54, 28, 11).stroke();
      doc.setFontSize(15); 
      doc.text(`${data.acd_yr}`,172,61)
  
      
      doc.rect(12, 80, 78, 12).stroke();
      doc.text('Name of the Faculty', 14, 88);
      doc.setFont("times", "");
      doc.rect(90, 80, 112, 12).stroke();
      doc.text(`${data.name_of_the_faculty}`, 100, 88);
      
      doc.setFont("times", "bold");
      doc.rect(12, 92, 78, 12).stroke();
      doc.text('Date of Visit', 14, 100);
      doc.setFont("times", "");
      doc.rect(90, 92, 112, 12).stroke();
      doc.text(`${data.date}`, 100, 100);
      
      doc.setFont("times", "bold");
      doc.rect(12, 104, 78, 12).stroke();
      doc.text('Purpose of Visit', 14, 112);
      doc.setFont("times", "");
      doc.rect(90, 104, 112, 12).stroke();
      doc.text(`${data.purpose_of_visit}`, 100, 112);

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
  return(
      <>
      <p>&nbsp;</p>
        <p>&nbsp;</p>
       <div class="overallcontent" style={{maxWidth:"85%",marginLeft:"120px",maxHeight:"50%",marginTop:"-60px"}}>
       <div class="report-header">
       <h1 class="recent-Articles">Your Reports</h1>
       <a className="topic-headings" href="/Setaf/SetafForms/visittolibraryfront"><button style={{top:"27.5px",right:"50px"}} class="views" id="addButton">+ Add</button></a>
       </div>
       <table className='table table-striped'>
        <thead>
        <tr  className="table table-active">
                          <th>Name of the Faculty</th>
                          <th>Academic Year</th>
                          <th>Date</th>
                          <th>Purpose of Visit</th>
                          <th>Download Pdf</th>
                          
        </tr>
        {              VisittoLibrary.length>0?
                      VisittoLibrary.map((val)=>(
                          <tr>
                              <td>{val.name_of_the_faculty}</td>
                              <td>{val.acd_yr}</td>
                              <td>{val.date}</td>
                              <td>{val.purpose_of_visit}</td>
                              <td><button onClick={async()=>{generatePDF(val.report_id)}}>View</button></td> 
                          </tr>
                      ))
                      :
                      <tr>No records</tr>
                  }
        </thead>
       </table>
       </div>
       
                    
      </>
  )
}


/////////////////////Award at national and International/////////////////////

export const AwardHod=()=>{
  ///////pdf view///////////////
  
const generatePDF = async (report_id)=> {
  try{
      // alert(report_id)
  const res = await axios.get(`http://localhost:1234/setaf/data/awardatnational/${report_id}`);
  const data = res.data;
  const doc = new jsPDF(); 
  let pdfDocument;
  try{
      const pdfUrl = `/Journal_SETAF/${data.award_certificate_pdf}`;
      const pdfResponse = await axios.get(pdfUrl, { responseType: 'arraybuffer' });
      const pdfData = pdfResponse.data;

   pdfDocument = await getDocument({ data: pdfData }).promise;
     }catch(e){
      console.log(e)
     }  

   doc.addImage(Image, 'PNG', 10, 3, 20, 20);
   doc.addImage(Image2, 'PNG', 12,23, 15, 15);
   doc.addImage(Image3, 'JPG', 175, 3, 20, 15);
   doc.addImage(Image4, 'JPG', 175, 20, 20, 15);

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
  doc.setFontSize(15); 
  doc.rect(12, 54, 32, 11).stroke();
  doc.text(`${data.dept}`,25,60)
  doc.rect(90,38,32,11)
  doc.text('SETAF', 97, 45);
  doc.rect(46,54,121,11)
  doc.text("AWARD AT NATIONAL AND INTERNATIONAL",47,61)
  
  doc.rect(168, 54, 30, 11).stroke();
  doc.setFontSize(15); 
  doc.text(`${data.acd_yr}`,173,60)
  
  doc.rect(12, 80, 80, 12).stroke();
  doc.text('Name of the Faculty', 14, 88);
  doc.setFont("times", "");
  doc.rect(92, 80, 108, 12).stroke();
  doc.text(`${data.name_of_the_faculty}`, 95, 88);
  
  doc.setFont("times", "bold");
  doc.rect(12, 92, 80, 12).stroke();
  doc.text('Name of the Award', 14, 100);
  doc.setFont("times", "");
  doc.rect(92, 92, 108, 12).stroke();
  doc.text(`${data.name_of_the_award}`, 95, 100);
  
  doc.setFont("times", "bold");
  doc.rect(12, 104, 80, 12).stroke();
  doc.text('Category', 14, 112);
  doc.setFont("times", "");
  doc.rect(92, 104, 108, 12).stroke();
  doc.text(`${data.category}`, 95, 112);

  doc.setFont("times", "bold");
  doc.rect(12, 116, 80, 12).stroke();
  doc.text('Date of Award', 14, 124);
  doc.setFont("times", "");
  doc.rect(92, 116, 108, 12).stroke();
  doc.text(`${dateFormat(data.date_of_award,'dd-mm-yyyy')}`, 95, 124);

  doc.setFont("times", "bold");
  doc.rect(12, 128, 80, 12).stroke();
  doc.text('Name of Awarding Organization', 14, 136);
  doc.setFont("times", "");
  doc.rect(92, 128, 108, 12).stroke();
  doc.text(`${data.name_of_awarding_organization}`, 95, 136);

    
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

  ////////////data fetch code/////////////////

  const [Award,setAward]=useState([])
  useEffect(()=>{
      fetchAwardRecords()
  },[])
  const logged=JSON.parse(sessionStorage.getItem("person"))


  const fetchAwardRecords=async()=>{
      try{
          const temp = await AwardAtNationalDept(`${logged.dept_id}`)
      // console.log(temp.data)
      setAward(temp.data)
      }
      catch(e){
          console.log(e);
      }
  }

  return(
      <>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
       <div class="overallcontent" style={{maxWidth:"85%",marginLeft:"120px",maxHeight:"50%",marginTop:"-60px"}}>
       <div class="report-header">
       <h1 class="recent-Articles">Your Reports</h1>
       <a className="topic-headings" href="/Setaf/SetafForms/award"><button style={{top:"27.5px",right:"50px"}} class="views" id="addButton">+ Add</button></a>
       </div>
       <table className='table table-striped '>                           
        <thead>
        <tr className="table-active">
                          <th>Report ID</th>
                          <th>Academic Year</th>
                          <th>Semester</th>
                          <th>Name of the Faculty</th>
                          <th>Name of the Award</th>
                          <th>Category</th>
                          <th>Date of Award</th>
                          <th>Name of Awarding Organization</th>
                          <th>Download PDF</th>
        </tr>
        {               
                     Award.length>0?
                     Award.map((val)=>(
                          <tr>
                              <td>{val.report_id}</td>
                              <td>{val.acd_yr}</td>
                              <td>{val.semester}</td>
                              <td>{val.name_of_the_faculty}</td>
                              <td>{val.name_of_the_award}</td>
                              <td>{val.category}</td>
                              <td>{dateFormat(val.date_of_award,'dd-mm-yyyy')}</td>
                              <td>{val.name_of_awarding_organization}</td>
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


export const BooksHod=()=>{
  ///////pdf view///////////////
  
const generatePDF = async (report_id)=> {
  try{
      // alert(report_id)
  const res = await axios.get(`http://localhost:1234/setaf/data/books/${report_id}`);
  const data = res.data;
  const doc = new jsPDF(); 
  let pdfDocument;
  try{
      const pdfUrl = `/Journal_SETAF/${data.enclose_proof_pdf}`;
      const pdfResponse = await axios.get(pdfUrl, { responseType: 'arraybuffer' });
      const pdfData = pdfResponse.data;

   pdfDocument = await getDocument({ data: pdfData }).promise;
     }catch(e){
      console.log(e)
     }  

   doc.addImage(Image, 'PNG', 10, 3, 20, 20);
   doc.addImage(Image2, 'PNG', 12,23, 15, 15);
   doc.addImage(Image3, 'JPG', 175, 3, 20, 15);
   doc.addImage(Image4, 'JPG', 175, 20, 20, 15);

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
  doc.setFontSize(15); 
  doc.rect(12, 54, 32, 11).stroke();
  doc.text(`${data.dept}`,25,60)
  doc.rect(90,38,32,11)
  doc.text('SETAF', 97, 45);
  doc.rect(53,54,110,11)
  doc.text("BOOKS CHAPTERS AUTHORSHIP",66,61)
  
  doc.rect(168, 54, 30, 11).stroke();
  doc.setFontSize(15); 
  doc.text(`${data.acd_yr}`,173,60)
  
  doc.rect(12, 80, 80, 12).stroke();
  doc.text('Name of the Faculty', 14, 88);
  doc.setFont("times", "");
  doc.rect(92, 80, 108, 12).stroke();
  doc.text(`${data.name_of_the_faculty}`, 95, 88);
  
  doc.setFont("times", "bold");
  doc.rect(12, 92, 80, 12).stroke();
  doc.text('Name of the Author', 14, 100);
  doc.setFont("times", "");
  doc.rect(92, 92, 108, 12).stroke();
  doc.text(`${data.name_of_the_authors}`, 95, 100);
  
  doc.setFont("times", "bold");
  doc.rect(12, 104, 80, 12).stroke();
  doc.text('Title of the Book', 14, 112);
  doc.setFont("times", "");
  doc.rect(92, 104, 108, 12).stroke();
  doc.text(`${data.title_of_the_book}`, 95, 112);

  doc.setFont("times", "bold");
  doc.rect(12, 116, 80, 12).stroke();
  doc.text('Date of Publication', 14, 124);
  doc.setFont("times", "");
  doc.rect(92, 116, 108, 12).stroke();
  doc.text(`${dateFormat(data.date_of_publication,'dd-mm-yyyy')}`, 95, 124);

  doc.setFont("times", "bold");
  doc.rect(12, 128, 80, 12).stroke();
  doc.text('ISBN Number', 14, 136);
  doc.setFont("times", "");
  doc.rect(92, 128, 108, 12).stroke();
  doc.text(`${data.isbn_number}`, 95, 136);

  
  doc.setFont("times", "bold");
  doc.rect(12, 140, 80, 12).stroke();
  doc.text('Category', 14, 148);
  doc.setFont("times", "");
  doc.rect(92, 140, 108, 12).stroke();
  doc.text(`${data.category}`, 95, 148);
    
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

  ////////////data fetch code/////////////////

  const [books,setBooks]=useState([])
  useEffect(()=>{
      fetchBooksRecords()
  },[])
  const logged=JSON.parse(sessionStorage.getItem("person"))

  const fetchBooksRecords=async()=>{
      try{
          const temp = await BooksDept(`${logged.dept_id}`)
      // console.log(temp.data)
      setBooks(temp.data)
      }
      catch(e){
          console.log(e);
      }
  }

  return(
      <>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
       <div class="overallcontent" style={{maxWidth:"85%",marginLeft:"120px",maxHeight:"50%",marginTop:"-60px"}}>
       <div class="report-header">
       <h1 class="recent-Articles">Your Reports</h1>
       <a className="topic-headings" href="/Setaf/SetafForms/books"><button style={{top:"27.5px",right:"50px"}} class="views" id="addButton">+ Add</button></a>
       </div>
       <table className='table table-striped '>                           
        <thead>
        <tr className="table-active">
                          <th>Report ID</th>
                          <th>Academic Year</th>
                          <th>Semester</th>
                          <th>Name of the Faculty</th>
                          <th>Name of the Author</th>
                          <th>Title of the Books</th>
                          <th>Date of Publication</th>
                          <th>ISBN Number</th>
                          <th>Category</th>
                          <th>Download PDF</th>
        </tr>
        {               
                     books.length>0?
                     books.map((val)=>(
                          <tr>
                              <td>{val.report_id}</td>
                              <td>{val.acd_yr}</td>
                              <td>{val.semester}</td>
                              <td>{val.name_of_the_faculty}</td>
                              <td>{val.name_of_the_authors}</td>
                              <td>{val.title_of_the_book}</td>
                              <td>{dateFormat(val.date_of_publication,'dd-mm-yyyy')}</td>
                              <td>{val.isbn_number}</td>
                              <td>{val.category}</td>
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