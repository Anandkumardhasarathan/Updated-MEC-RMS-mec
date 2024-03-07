import React, { useState } from 'react';
import jsPDF from 'jspdf';
import axios from 'axios';

// var base64js = require('base64-js')
// import Image from './logo.png';
// import Image2 from './logo2.png';
// import Image3 from './logo3.jpg';
// import Image4 from './logo4.jpg';


const Pdf =() => {
 
  const [id, setId] = useState('');

  const generatePDF = async ()=> {
    try{

    const res = await axios.get(`http://localhost:1234/journal/journallist/${id}`);
      const data = res.data;
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
doc.text(`${data.emp_id}`,180,76)
  

doc.rect(10,77,10,8).stroke.apply()
doc.setFont("times","")
doc.text('1',14,83)
doc.rect(20,77,133,8).stroke.apply()
doc.text("Journal Publications",23,83)
doc.rect(153,77,23,8).stroke.apply()
doc.rect(176,77,22,8).stroke.apply()
doc.text(`${data.academic_year}`,180,85)

doc.rect(10,85,10,8).stroke.apply()
doc.setFont("times","")
doc.text('2',14,91)
doc.rect(20,85,133,8).stroke.apply()
doc.text("Conference Publications and Presentations",23,91)
doc.rect(153,85,23,8).stroke.apply()
doc.rect(176,85,22,8).stroke.apply()
doc.text(`${data.semester}`,185,80)

doc.rect(10,93,10,8).stroke.apply()
doc.setFont("times","")
doc.text('3',14,99)
doc.rect(20,93,133,8).stroke.apply()
doc.text("Workshop/Seminar Participation",23,99)
doc.rect(153,93,23,8).stroke.apply()
doc.rect(176,93,22,8).stroke.apply()

doc.rect(10,101,10,8).stroke.apply()
doc.setFont("times","")
doc.text('4',14,107)
doc.rect(20,101,133,8).stroke.apply()
doc.text("Workshop/Seminar organized as a Coordinator",23,107)
doc.rect(153,101,23,8).stroke.apply()
doc.rect(176,101,22,8).stroke.apply()

doc.rect(10,109,10,8).stroke.apply()
doc.setFont("times","")
doc.text('5',14,115)
doc.rect(20,109,133,8).stroke.apply()
doc.text("TechTalks to be delivered Multidisciplinary Lectures (MuDiL)",23,115)
doc.rect(153,109,23,8).stroke.apply()
doc.rect(176,109,22,8).stroke.apply()

doc.rect(10,117,10,8).stroke.apply()
doc.setFont("times","")
doc.text('6',14,123)
doc.rect(20,117,133,8).stroke.apply()
doc.text("Faculty Guest Talk in other Institutions",23,123)
doc.rect(153,117,23,8).stroke.apply()
doc.rect(176,117,22,8).stroke.apply()

doc.rect(10,125,10,8).stroke.apply()
doc.setFont("times","")
doc.text('7',14,131)
doc.rect(20,125,133,8).stroke.apply()
doc.text("NPTEL Certification",23,131)
doc.rect(153,125,23,8).stroke.apply()
doc.rect(176,125,22,8).stroke.apply()

doc.rect(10,133,10,8).stroke.apply()
doc.setFont("times","")
doc.text('8',14,139)
doc.rect(20,133,133,8).stroke.apply()
doc.text("Participation in TASTE",23,139)
doc.rect(153,133,23,8).stroke.apply()
doc.rect(176,133,22,8).stroke.apply()

doc.rect(10,141,10,8).stroke.apply()
doc.setFont("times","")
doc.text('9',14,147)
doc.rect(20,141,133,8).stroke.apply()
doc.text("FDPs/SDPS Certificates ",23,147)
doc.rect(153,141,23,8).stroke.apply()
doc.rect(176,141,22,8).stroke.apply()

doc.rect(10,149,10,8).stroke.apply()
doc.setFont("times","")
doc.text('10',12,155)
doc.rect(20,149,133,8).stroke.apply()
doc.text("e-Content/(Video Lecture)",23,155)
doc.rect(153,149,23,8).stroke.apply()
doc.rect(176,149,22,8).stroke.apply()

doc.rect(10,157,10,8).stroke.apply()
doc.setFont("times","")
doc.text('11',12,163)
doc.rect(20,157,133,8).stroke.apply()
doc.text("Visit to Industries/Institution",23,163)
doc.rect(153,157,23,8).stroke.apply()
doc.rect(176,157,22,8).stroke.apply()

doc.rect(10,165,10,8).stroke.apply()
doc.setFont("times","")
doc.text('12',12,171)
doc.rect(20,165,133,8).stroke.apply()
doc.text("Seed Money Proposal for Research",23,171)
doc.rect(153,165,23,8).stroke.apply()
doc.rect(176,165,22,8).stroke.apply()


doc.rect(10,173,10,8).stroke.apply()
doc.setFont("times","")
doc.text('13',12,179)
doc.rect(20,173,133,8).stroke.apply()
doc.text("Awards at National /International Level ",23,179)
doc.rect(153,173,23,8).stroke.apply()
doc.rect(176,173,22,8).stroke.apply()

doc.rect(10,181,10,8).stroke.apply()
doc.setFont("times","")
doc.text('14',12,187)
doc.rect(20,181,133,8).stroke.apply()
doc.text("Proposals Submission for Grants",23,187)
doc.rect(153,181,23,8).stroke.apply()
doc.rect(176,181,22,8).stroke.apply()

doc.rect(10,189,10,8).stroke.apply()
doc.setFont("times","")
doc.text('15',12,195)
doc.rect(20,189,133,8).stroke.apply()
doc.text("Books/ Chapters Authorship",23,195)
doc.rect(153,189,23,8).stroke.apply()
doc.rect(176,189,22,8).stroke.apply()

doc.rect(10,197,10,8).stroke.apply()
doc.setFont("times","")
doc.text('16',12,203)
doc.rect(20,197,133,8).stroke.apply()
doc.text("Consultancy and Corporate Training",23,203)
doc.rect(153,197,23,8).stroke.apply()
doc.rect(176,197,22,8).stroke.apply()

doc.rect(10,205,10,8).stroke.apply()
doc.setFont("times","")
doc.text('17',12,211)
doc.rect(20,205,133,8).stroke.apply()
doc.text("Books/ Chapters Authorship",23,211)
doc.rect(153,205,23,8).stroke.apply()
doc.rect(176,205,22,8).stroke.apply()

doc.rect(10,213,10,8).stroke.apply()
doc.setFont("times","")
doc.text('18',12,219)
doc.rect(20,213,133,8).stroke.apply()
doc.text("Books/ Chapters Authorship",23,219)
doc.rect(153,213,23,8).stroke.apply()
doc.rect(176,213,22,8).stroke.apply()

doc.rect(10,221,10,8).stroke.apply()
doc.setFont("times","")
doc.text('19',12,227)
doc.rect(20,221,133,8).stroke.apply()
doc.text("Books/ Chapters Authorship",23,227)
doc.rect(153,221,23,8).stroke.apply()
doc.rect(176,221,22,8).stroke.apply()

doc.rect(10,229,10,8).stroke.apply()
doc.setFont("times","")
doc.text('20',12,235)
doc.rect(20,229,133,8).stroke.apply()
doc.text("Books/ Chapters Authorship",23,235)
doc.rect(176,229,22,8).stroke.apply()
doc.rect(153,229,23,8).stroke.apply()

doc.rect(10,237,10,8).stroke.apply()
doc.setFont("times","")
doc.text('21',12,243)
doc.rect(20,237,133,8).stroke.apply()
doc.text("Books/ Chapters Authorship",23,243)
doc.rect(153,237,23,8).stroke.apply()
doc.rect(176,237,22,8).stroke.apply()

doc.rect(10,245,10,8).stroke.apply()
doc.setFont("times","")
doc.text('22',12,251)
doc.rect(20,245,133,8).stroke.apply()
doc.text("Books/ Chapters Authorship",23,251)
doc.rect(153,245,23,8).stroke.apply()
doc.rect(176,245,22,8).stroke.apply()

doc.rect(10,253,10,8).stroke.apply()
doc.setFont("times","")
doc.text('23',12,259)
doc.rect(20,253,133,8).stroke.apply()
doc.text("Books/ Chapters Authorship",23,259)
doc.rect(153,253,23,8).stroke.apply()
doc.rect(176,253,22,8).stroke.apply()

doc.rect(10,261,10,8).stroke.apply()
doc.setFont("times","")
doc.text('24',12,267)
doc.rect(20,261,133,8).stroke.apply()
doc.text("Books/ Chapters Authorship",23,267)
doc.rect(153,261,23,8).stroke.apply()
doc.rect(176,261,22,8).stroke.apply()

doc.rect(10,269,10,8).stroke.apply()
doc.setFont("times","")
doc.text('25',12,275)
doc.rect(20,269,133,8).stroke.apply()
doc.text("Books/ Chapters Authorship",23,275)
doc.rect(153,269,23,8).stroke.apply()
doc.rect(176,269,22,8).stroke.apply()

   
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
  

  return (
    <div>
      <label>
        Id:
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
      </label>
      <button onClick={generatePDF}>Generate and View PDF</button>
      
    </div>
  );
  
}
  


export default Pdf;