// src/components/SeTAFPage.js
import axios from "axios";
import React, { useEffect, useState } from 'react';
import './SetafConsolidate.css'
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import jsPDF from "jspdf";

const SetafConsolidation = () => {

//////////////pdf generator//////////////////
const logged=JSON.parse(sessionStorage.getItem("person"))
const empId=logged.faculty_id;

const generatePDF = async ()=> {
  try{

  // const res = await axios.get(`http://localhost:1234/setaf/journallist/${empId}`);
  //   const data = res.data;
  const doc = new jsPDF();
  
    
doc.setFontSize(18);
doc.setFont("times", "bold");
doc.text('MUTHAYAMMAL ENGINEERING COLLEGE',35, 15);
doc.setFontSize(10);
doc.setFont("times", "");
doc.text('(An Autonomous Institution)', 80, 20);
doc.text('(Approved by AICTE, New Delhi, Accredited by NAAC & Affiliated to Anna University)', 35, 25);
doc.text('Rasipuram - 637 408, Namakkal Dist., Tamil Nadu', 65, 30);


doc.rect(10,60,40,8).stroke.apply()
doc.setFontSize(10)
doc.setFont("times","bold")
doc.text('Name of the faculty',11,66)
doc.rect(50,60,65,8).stroke.apply()
doc.rect(115,60,35,8).stroke.apply()
doc.text('Designation',118,66)
doc.rect(115,60,35,8).stroke.apply()
doc.rect(150,60,48,8).stroke.apply()

doc.rect(10,68,10,9).stroke.apply()
doc.text('S.no',11,75)
doc.rect(20,68,133,9).stroke.apply()
doc.getFontSize()
doc.text('Contributors',75,72)
doc.text('(Score Points Alloted)',73,76)
doc.rect(153,68,23,9).stroke.apply()
doc.text('Target',158,72)
doc.text('Number',157,76)
doc.rect(176,68,22,9).stroke.apply()
doc.text('Score',182,74)
// doc.text(180,76)


doc.rect(10,77,10,8).stroke.apply()
doc.setFont("times","")
doc.text('1',14,83)
doc.rect(20,77,133,8).stroke.apply()
doc.text("Journal Publications",23,83)
doc.rect(153,77,23,8).stroke.apply()
doc.rect(176,77,22,8).stroke.apply()
doc.text('1',162,83)
doc.text(`${journ}`,185,83)

doc.rect(10,85,10,8).stroke.apply()
doc.setFont("times","")
doc.text('2',14,91)
doc.rect(20,85,133,8).stroke.apply()
doc.text("Conference Publications and Presentations",23,91)
doc.rect(153,85,23,8).stroke.apply()
doc.rect(176,85,22,8).stroke.apply()
doc.text('1',162,90)
doc.text(`${conf}`,185,90)
// doc.text(`${data.semester}`,185,80)

doc.rect(10,93,10,8).stroke.apply()
doc.setFont("times","")
doc.text('3',14,99)
doc.rect(20,93,133,8).stroke.apply()
doc.text("Workshop/Seminar Participation",23,99)
doc.rect(153,93,23,8).stroke.apply()
doc.rect(176,93,22,8).stroke.apply()
doc.text('2',162,98)


doc.rect(10,101,10,8).stroke.apply()
doc.setFont("times","")
doc.text('4',14,107)
doc.rect(20,101,133,8).stroke.apply()
doc.text("Workshop/Seminar organized as a Coordinator",23,107)
doc.rect(153,101,23,8).stroke.apply()
doc.rect(176,101,22,8).stroke.apply()
doc.text('1',162,106)


doc.rect(10,109,10,8).stroke.apply()
doc.setFont("times","")
doc.text('5',14,115)
doc.rect(20,109,133,8).stroke.apply()
doc.text("TechTalks to be delivered Multidisciplinary Lectures (MuDiL)",23,115)
doc.rect(153,109,23,8).stroke.apply()
doc.rect(176,109,22,8).stroke.apply()
doc.text('2',162,114)


doc.rect(10,117,10,8).stroke.apply()
doc.setFont("times","")
doc.text('6',14,123)
doc.rect(20,117,133,8).stroke.apply()
doc.text("Faculty Guest Talk in other Institutions",23,123)
doc.rect(153,117,23,8).stroke.apply()
doc.rect(176,117,22,8).stroke.apply()
doc.text('1',162,122)


doc.rect(10,125,10,8).stroke.apply()
doc.setFont("times","")
doc.text('7',14,131)
doc.rect(20,125,133,8).stroke.apply()
doc.text("NPTEL Certification",23,131)
doc.rect(153,125,23,8).stroke.apply()
doc.rect(176,125,22,8).stroke.apply()
doc.text('1',162,130)


doc.rect(10,133,10,8).stroke.apply()
doc.setFont("times","")
doc.text('8',14,139)
doc.rect(20,133,133,8).stroke.apply()
doc.text("Participation in TASTE",23,139)
doc.rect(153,133,23,8).stroke.apply()
doc.rect(176,133,22,8).stroke.apply()
doc.text('10',162,138)


doc.rect(10,141,10,8).stroke.apply()
doc.setFont("times","")
doc.text('9',14,147)
doc.rect(20,141,133,8).stroke.apply()
doc.text("FDPs/SDPS Certificates ",23,147)
doc.rect(153,141,23,8).stroke.apply()
doc.rect(176,141,22,8).stroke.apply()
doc.text('2',162,146)


doc.rect(10,149,10,8).stroke.apply()
doc.setFont("times","")
doc.text('10',12,155)
doc.rect(20,149,133,8).stroke.apply()
doc.text("e-Content/(Video Lecture)",23,155)
doc.rect(153,149,23,8).stroke.apply()
doc.rect(176,149,22,8).stroke.apply()
doc.text('4',162,154)


doc.rect(10,157,10,8).stroke.apply()
doc.setFont("times","")
doc.text('11',12,163)
doc.rect(20,157,133,8).stroke.apply()
doc.text("Visit to Industries/Institution",23,163)
doc.rect(153,157,23,8).stroke.apply()
doc.rect(176,157,22,8).stroke.apply()
doc.text('1',162,162)


doc.rect(10,165,10,8).stroke.apply()
doc.setFont("times","")
doc.text('12',12,171)
doc.rect(20,165,133,8).stroke.apply()
doc.text("Seed Money Proposal for Research",23,171)
doc.rect(153,165,23,8).stroke.apply()
doc.rect(176,165,22,8).stroke.apply()
doc.text('1',162,170)



doc.rect(10,173,10,8).stroke.apply()
doc.setFont("times","")
doc.text('13',12,179)
doc.rect(20,173,133,8).stroke.apply()
doc.text("Awards at National /International Level ",23,179)
doc.rect(153,173,23,8).stroke.apply()
doc.rect(176,173,22,8).stroke.apply()
doc.text('1',162,178)


doc.rect(10,181,10,8).stroke.apply()
doc.setFont("times","")
doc.text('14',12,187)
doc.rect(20,181,133,8).stroke.apply()
doc.text("Proposals Submission for Grants",23,187)
doc.rect(153,181,23,8).stroke.apply()
doc.rect(176,181,22,8).stroke.apply()
doc.text('2',162,186)


doc.rect(10,189,10,8).stroke.apply()
doc.setFont("times","")
doc.text('15',12,195)
doc.rect(20,189,133,8).stroke.apply()
doc.text("Books/ Chapters Authorship",23,195)
doc.rect(153,189,23,8).stroke.apply()
doc.rect(176,189,22,8).stroke.apply()
doc.text('1',162,194)


doc.rect(10,197,10,8).stroke.apply()
doc.setFont("times","")
doc.text('16',12,203)
doc.rect(20,197,133,8).stroke.apply()
doc.text("Consultancy and Corporate Training",23,203)
doc.rect(153,197,23,8).stroke.apply()
doc.rect(176,197,22,8).stroke.apply()
doc.text('1',162,202)


doc.rect(10,205,10,8).stroke.apply()
doc.setFont("times","")
doc.text('17',12,211)
doc.rect(20,205,133,8).stroke.apply()
doc.text("Patents Filed/Published/Granted",23,211)
doc.rect(153,205,23,8).stroke.apply()
doc.rect(176,205,22,8).stroke.apply()
doc.text('1',162,210)

doc.rect(10,213,10,8).stroke.apply()
doc.setFont("times","")
doc.text('18',12,219)
doc.rect(20,213,133,8).stroke.apply()
doc.text("Collaborative Activities with MoU Signed Industries/Institutions",23,219)
doc.rect(153,213,23,8).stroke.apply()
doc.rect(176,213,22,8).stroke.apply()
doc.text('1',162,218)

doc.rect(10,221,10,8).stroke.apply()
doc.setFont("times","")
doc.text('19',12,227)
doc.rect(20,221,133,8).stroke.apply()
doc.text("PSDeG / LSDeG Activities Organized",23,227)
doc.rect(153,221,23,8).stroke.apply()
doc.rect(176,221,22,8).stroke.apply()
doc.text('1',162,226)


doc.rect(10,229,10,8).stroke.apply()
doc.setFont("times","")
doc.text('20',12,235)
doc.rect(20,229,133,8).stroke.apply()
doc.text("Visits to the Library",23,235)
doc.rect(176,229,22,8).stroke.apply()
doc.rect(153,229,23,8).stroke.apply()
doc.text('40 days',157,234)

doc.rect(10,237,10,8).stroke.apply()
doc.setFont("times","")
doc.text('21',12,243)
doc.rect(20,237,133,8).stroke.apply()
doc.text("Alumni Interaction arranged",23,243)
doc.rect(153,237,23,8).stroke.apply()
doc.rect(176,237,22,8).stroke.apply()
doc.text('1',162,242)

doc.rect(10,245,10,8).stroke.apply()
doc.setFont("times","")
doc.text('22',12,251)
doc.rect(20,245,133,8).stroke.apply()
doc.text("Students Motivation for Paper Presentation/Project Submission/Other Contests",23,251)
doc.rect(153,245,23,8).stroke.apply()
doc.rect(176,245,22,8).stroke.apply()
doc.text('5',162,250)


doc.rect(10,253,10,8).stroke.apply()
doc.setFont("times","")
doc.text('23',12,259)
doc.rect(20,253,133,8).stroke.apply()
doc.text("Professional Society Membership",23,259)
doc.rect(153,253,23,8).stroke.apply()
doc.rect(176,253,22,8).stroke.apply()
doc.text('1',162,258)


doc.rect(10,261,10,8).stroke.apply()
doc.setFont("times","")
doc.text('24',12,267)
doc.rect(20,261,133,8).stroke.apply()
doc.text("Students Field Work/Internship Guidance",23,267)
doc.rect(153,261,23,8).stroke.apply()
doc.rect(176,261,22,8).stroke.apply()
doc.text('5',162,266)


doc.rect(10,269,10,8).stroke.apply()
doc.setFont("times","")
doc.text('25',12,275)
doc.rect(20,269,133,8).stroke.apply()
doc.text("Extension and Outreach Activities Organized",23,275)
doc.rect(153,269,23,8).stroke.apply()
doc.rect(176,269,22,8).stroke.apply()
doc.text('1',162,274)

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



////////////////////ui count code///////////////
  const [journ,setJourn]=useState("")

  let res;
  useEffect(() => {
    const demo=async()=>{
      const url="http://localhost:1234"

const logged=JSON.parse(sessionStorage.getItem("person"))
const empId=logged.faculty_id;

   
try{
    res=await axios.get(`${url}/setaf/journallist/${empId}`)
    // alert(JSON.stringify(res.data.length))
    setJourn(JSON.stringify(res.data.length))
    console.log(res.data)
}
catch(e){
    console.log(e);
}


// alert(JSON.stringify(res))

    }
    demo();
  })
  

   
/////////////////////////////////conference///////////
const [conf,setConf]=useState("")

let cres;
useEffect(() => {
  const demo=async()=>{
    const url="http://localhost:1234"

const logged=JSON.parse(sessionStorage.getItem("person"))
const empId=logged.faculty_id;

 
try{
  cres=await axios.get(`${url}/setaf/conferencelist/${empId}`)
  // alert(JSON.stringify(res.data.length))
  setConf(JSON.stringify(cres.data.length))
  console.log(cres.data)
}
catch(e){
  console.log(e);
}


// alert(JSON.stringify(res))

  }
  demo();
})



  return (
    <div className=" container-fluid" >
      {/* <div className='' accordion style={{marginLeft:"220px"}}> <img src={logo} style={{height:"150px"} }/></div>
      <div className='' accordion style={{marginTop:"-140px",marginLeft:"20px"}}>
      <h1 className="text-center mt-4">MUTHAYAMMAL ENGINEERING COLLEGE</h1>
       <h4 className="text-center "style={{marginTop:"-10px"}} >(An Autonomus Instiution)</h4>
       <h5 className="text-center" style={{marginTop:"-7px"}}>(Approved by AICTE, New Delhi, Accredited by NAAC & Affliated to Anna Univeristy)</h5>
       <h6 className="text-center" style={{marginTop:"-9px"}}>Rasipuram -637 408, Namakkal Dist., Tamilnadu</h6>
      </div> */}
     
     <div>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        {/* <p>&nbsp;
        </p> */}
        <p>&nbsp;</p>
      </div>
     <div >
      <div className="" style={{color: "#5500cb"}}><h1>SETAF CONSOLIDATION</h1></div>
     
     <table  className="table table-striped " >

{/* <thead  className="table table-bordered mt-9">
    <tr>
      <th scope="col" >Name of the Faculty</th>
      <th></th>
      <th scope="col">Designation</th>
      <th scope="col"></th>
    </tr>
  </thead> */}


  <thead>
    <tr>
      <th scope="col" >S. No.</th>
      <th scope="col"> Contributions</th>
      <th scope="col">(Score Points Allotted)</th>
      <th scope="col"> Target Number</th>
      <th scope="col"> Score</th>
      
    </tr>
  </thead>
  <tbody>
    
    <tr>
      <td>1</td>
      <td>Journal Publications</td>
      <td>(International - 25, National - 20)</td>
      <td>1</td>
      <td>{journ}</td>
    </tr>

    <tr>
      <td>2</td>
      <td>Conference Publications and Presentations</td>
      <td>(International - 20, National - 10)</td>
      <td>1</td>
      <td>{conf}</td>
    </tr>

    <tr>
      <td>3</td>
      <td>WorkShop/Seminar Participation</td>
      <td>(Internal - 5 perday, External- 10 perday)</td>
      <td>2</td>
      <td></td>
    </tr>

    <tr>
      <td>4</td>
      <td>WorkShop/Seminar organized as a Coordinator</td>
      <td>(10 per day)</td>
      <td>1</td>
      <td></td>
    </tr>

    <tr>
      <td>5</td>
      <td>TechTalks to be delivered Multidisciplinary Lectures </td>
      <td>(5 per Lecture)</td>
      <td>2</td>
      <td></td>
    </tr>

    <tr>
      <td>6</td>
      <td>Faculty Guest Talk in other Institutions </td>
      <td> (15 per Lecture)</td>
      <td>1</td>
      <td></td>
    </tr>

    <tr>
      <td>7</td>
      <td>NPTEL Certification</td>
      <td> (Max. 25 per Certificate; Gold/Topper 25, Silver 20, Elite 15, Pass 10)</td>
      <td>1</td>
      <td></td>
    </tr>

    <tr>
      <td>8</td>
      <td>Participation in TASTE</td>
      <td>(2 for each TASTE; Caped to Max. 30)</td>
      <td>10</td>
      <td></td>
    </tr>

    <tr>
      <td>9</td>
      <td> FDPs/SDPS  Certificates </td>
      <td>(5 per Day) </td>
      <td>2</td>
      <td></td>
    </tr>

    <tr>
      <td>10</td>
      <td>e-Content/(Video Lecture)</td>
      <td> (5 per Lecture, Lecture Materials-(20 per Material)) </td>
      <td>4</td>
      <td></td>
    </tr>

    <tr>
      <td>11</td>
      <td>Visit to Industries/Institution</td>
      <td>  (10 per Day) </td>
      <td>1</td>
      <td></td>
    </tr>

    <tr>
      <td>12</td>
      <td>Seed Money Proposal for Research</td>
      <td>  (15 per Proposal) </td>
      <td>1</td>
      <td></td>
    </tr>

    <tr>
      <td>13</td>
      <td>Awards at National /International Level  </td>
      <td>  (International-15, National -10) </td>
      <td>1</td>
      <td></td>
    </tr>

    <tr>
      <td>14</td>
      <td>Proposals  Submission for Grants </td>
      <td> (100 per Proposal if Sanctioned otherwise 25 per Proposal; 10 per Seminar Proposal if Sanctioned) </td>
      <td>2</td>
      <td></td>
    </tr>

    <tr>
      <td>15</td>
      <td>Books/ Chapters Authorship  </td>
      <td>    (International-15, National -10) </td>
      <td>1</td>
      <td></td>
    </tr>

    <tr>
      <td>16</td>
      <td>Consultancy and Corporate Training done for Revenue Generation</td>
      <td>  (15 per Consultancy)  </td>
      <td>1</td>
      <td></td>
    </tr>

    <tr>
      <td>17</td>
      <td> Patents Filed/Published/Granted     </td>
      <td> (Published - 5 Points, Granted - 25 Points) </td>
      <td>1</td>
      <td></td>
    </tr>

    <tr>
      <td>18</td>
      <td>Collaborative Activities with MoU Signed Industries/Institutions</td>
      <td>   (25 per Industry/ Insti.) </td>
      <td>1</td>
      <td></td>
    </tr>

    <tr>
      <td>19</td>
      <td>PSDeG / LSDeG Activities Organized  </td>
      <td>   (10 per Day)  </td>
      <td>2</td>
      <td></td>
    </tr>

    <tr>
      <td>20</td>
      <td>Visits to the Library </td>
      <td>   ( 0.5 per Day)  </td>
      <td>40 Days</td>
      <td></td>
    </tr>

    <tr>
      <td>21</td>
      <td>Alumni Interaction arranged     </td>
      <td>   (10 per Alumni Interaction)</td>
      <td>1</td>
      <td></td>
    </tr>

    <tr>
      <td>22</td>
      <td>Students  Motivation for Paper Presentation/Project Submission/Other Contests  </td>
      <td>  (for every Participation by individual Student 2Points) </td>
      <td>5</td>
      <td></td>
    </tr>

    <tr>
      <td>23</td>
      <td>Professional Society Membership </td>
      <td>    (10 Per Membership)</td>
      <td>1</td>
      <td></td>
    </tr>

    <tr>
      <td>24</td>
      <td>Students Field Work/Internship Guidance </td>
      <td>  (10 Points per Student) </td>
      <td>5</td>
      <td></td>
    </tr>

    <tr>
      <td>25</td>
      <td>Extension and Outreach Activities Organized  </td>
      <td>    (10 Points) </td>
      <td>1</td>
      <td>   </td>
    </tr>
  </tbody>
</table>
     </div>
        {/* <div>
        <h3 className='col-md-6 col-sm-12 ' style={{marginLeft:'100px',marginTop:"150px"}}>SIGNATURE</h3>
        <h3 className='col-md-6 col-sm-12 '   style={{marginLeft:'450px',marginTop:"-40px"}}>HOD</h3>
        </div> */}

        <button style={{right:"100px"}} onClick={generatePDF}>Download Pdf</button>
    </div>

    
  );
};

export default SetafConsolidation;
