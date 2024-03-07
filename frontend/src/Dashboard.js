import { BrowserRouter, Route, Routes } from "react-router-dom"
import { FacultyMenu } from "./FacultyMenu"
import { CreateEvent } from "./CreateEvent"
import { useEffect, useState } from "react"
import { HodDashboard } from "./HodDashboard"
import { FacultyPage } from "./FacultyPage"
import { Add } from "./Add"
import { PrincipalDashboard } from "./PrincipalDashboard"
import { EcrInput } from "./ecrInput"
import PDFGenerator from "./pdfGenerator"
import SeSTAadd from "./Sesta/SestaAdd"
import SeSTAbuttons from "./Sesta/SestaButtons"
import { Intership, NptelCertification, OnlineCertification, StudentTechTalks, StudentsParticipation, ValueAdded } from "./Sesta/SestaFacultyView"
import { HodECRPage } from "./HodECRPage"
import Iv from "./Iv/Iv"
import Ivadd from "./Iv/Ivadd"
import IvInput from "./Iv/IvInput"
import Setafbutton from "./Setaf/Setafbuttons"
import { ConferencePublication, JournalPublication, Techtalk, Workshop,Nptel, FacultyGuestTalk, Proposal, Taste, Industry, Seed } from "./Setaf/SetafFAcultyView"
import { Facultyfront, Conferencefront, Journalfront, Nptelfront, Techtalks, Workshopfront, Proposalfront, Tastefront, Industryfront, Seedfront} from "./Setaf/SetafForms"
import SetafConsolidation from "./Setaf/SetafConsolidate"



export const Dashboard=()=>{
    const[hodLog,setHodLog]=useState(false)
    const[principalLog,setPrincipalLog]=useState(false)

    useEffect(()=>{
        const logged=JSON.parse(sessionStorage.getItem("person"))
        if(logged.faculty_desig===403){
            setHodLog(true)
        }
    },[])
    useEffect(()=>{
        const logged=JSON.parse(sessionStorage.getItem("person"))
        if(logged.faculty_desig===401){
            setPrincipalLog(true)
        }
    },[])

    return(
        <>
            {
                (principalLog) ?
                <>
                <PrincipalDashboard/>
                </>
                :
                (hodLog) ?
                <>
                <HodDashboard/>
                </>
                :
                <>
                    <BrowserRouter>
                        <FacultyMenu/>
                        <Routes>
                        <Route path="" element={<FacultyPage/>} />

                        {/* ECR routers */}
                            <Route path="ecr" element={<CreateEvent/>} />
                            <Route path="add" element={<Add/>} />
                            {/* <Route path="setaf" element={} /> */}
                            <Route path="ecrInput" element={<EcrInput/>} />
                            <Route path="viewPdf" element={<PDFGenerator/>} />
                            
                            {/* setaf */}
                            <Route path="/Setaf" element={<Setafbutton/>}/>  
                            <Route path="/setaf/journalpublication" element={<JournalPublication/>}/>
                                <Route path="/Setaf/SetafForms/Journalfront" element={<Journalfront/>}/>
                            <Route path="/conferencepublication" element={<ConferencePublication/>}/>
                                <Route path="/Setaf/SetafForms/Conferencefront" element={<Conferencefront/>}/>
                            <Route path="/workshop" element={<Workshop/>}/>
                                <Route path="/Setaf/SetafForms/Workshopfront" element={<Workshopfront/>}/>
                            <Route path="/techtalk" element={<Techtalk/>}/>
                                <Route path="/Setaf/SetafForms/techtalks" element={<Techtalks/>}/>
                            <Route path="/nptel" element={<Nptel/>}/>
                            <Route path="/Setaf/SetafForms/nptelform" element={<Nptelfront/>}/>
                            <Route path="/facultly" element={<FacultyGuestTalk/>}/>
                            <Route path="/Setaf/SetafForms/facultyfront" element={<Facultyfront/>}/>
                            <Route path="/proposal" element={<Proposal/>}/>
                            <Route path="/Setaf/SetafForms/proposalfront" element={<Proposalfront/>}/>
                            <Route path="/taste" element={<Taste/>}/>
                            <Route path="/Setaf/SetafForms/tastefront" element={<Tastefront/>}/>
                            <Route path="/industry" element={<Industry/>}/>
                            <Route path="/Setaf/SetafForms/visitindustry" element={<Industryfront/>}/>
                            <Route path="/seed" element={<Seed/>}/>
                            <Route path="/Setaf/SetafForms/seedfront" element={<Seedfront/>}/>
   
                            
                        {/* SeSTA routers */}
                            <Route path="/consolidation" element={<SetafConsolidation/>}/>  
                            <Route path="sesta" element={<SeSTAbuttons/>}/>
                            <Route path="sesta/addform" element={<SeSTAadd/>}/>
                            <Route path="/nptelcertification" element={<NptelCertification/>}/>
                            <Route path="/onlinecertification" element={<OnlineCertification/>}/>
                            <Route path="/studenttechtalks" element={<StudentTechTalks/>}/>
                            <Route path="/studentsparticipation" element={<StudentsParticipation/>}/>
                            <Route path="/intership" element={<Intership/>}/>
                            <Route path="/valueadded" element={<ValueAdded/>}/>
                            <Route path="/studenttechtalk" element={<StudentTechTalks/>}/>

                        {/* Iv routers */}
                            <Route path="/iv" element={<Iv/>}/>
                            <Route path="/ivproposal" element={<Ivadd/>}/>
                            <Route path="/ivinput" element={<IvInput/>}/>
                        </Routes>
                    </BrowserRouter>
                </>
            }
        </>
    )
}