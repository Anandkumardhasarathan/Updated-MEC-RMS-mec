import { BrowserRouter, Route, Routes } from "react-router-dom"
import { HodMenu } from "./HodMenu"
import { ViewSeminar } from "./ViewSeminar"
import PDFGenerator from "./pdfGenerator"
import { HodECRPage } from "./HodECRPage"
import Setafbutton from "./Setaf/Setafbuttons"
import SetafConsolidation from "./Setaf/SetafConsolidate"
import SetafConsolidationHod from "./Setaf/SetafConsolidateHod"
import { JournalPublication } from "./Setaf/SetafFAcultyView"
import { Conferencefront, Journalfront } from "./Setaf/SetafForms"
import { ConferencePublicationHodDashboard, JournalPublicationHodDashboard } from "./Setaf/SetafHodView"

export const HodDashboard=()=>{
    return(
        <>
            <BrowserRouter>
                <HodMenu/>
                {/* <ViewSeminar/> */}
                <Routes >
               
               
                
                <Route path="" element={<ViewSeminar/>} />
                <Route path="viewPdf" element={<PDFGenerator/>} />
                <Route path="hodecr" element={<HodECRPage/>} />
                {/* setaf */}
                <Route path="/consolidation" element={<SetafConsolidationHod/>}/> 
                <Route path="/Setaf" element={<Setafbutton/>}/> 
                <Route path="/setaf/journalpublication" element={<JournalPublicationHodDashboard/>}/>
                <Route path="/Setaf/SetafForms/Journalfront" element={<Journalfront/>}/>
                <Route path="/conferencepublication" element={<ConferencePublicationHodDashboard/>}/>
                <Route path="/Setaf/SetafForms/Conferencefront" element={<Conferencefront/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}