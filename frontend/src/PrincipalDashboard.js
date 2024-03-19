import { BrowserRouter, Route, Routes } from "react-router-dom"
import { PrincipalMenu } from "./PrincipalMenu"

import PDFGenerator from "./pdfGenerator"
import { ViewReqPrincipal } from "./ViewReqPriincipal"
import { PrincipalECRPage } from "./PrincipalECRPage"
import Setafbutton from "./Setaf/Setafbuttons"
import { ConferencePublicationPrincipalDashboard, JournalPublicationPrincipalDashboard } from "./Setaf/SetafPrincipalView"
import SetafConsolidationPrincipal from "./Setaf/SetafConsolidatePrincipal"
import { Conferencefront } from "./Setaf/SetafForms"

export const PrincipalDashboard=()=>{
    return(
        <>
            <BrowserRouter>
                <PrincipalMenu/>
                <Routes>
                <Route path="/Setaf" element={<Setafbutton/>}/> 
                <Route path="/setaf/journalpublication" element={<JournalPublicationPrincipalDashboard/>}/>
                <Route path="/consolidation" element={<SetafConsolidationPrincipal/>}/> 
                <Route path="/conferencepublication" element={<ConferencePublicationPrincipalDashboard/>}/>
                

                <Route path="" element={<ViewReqPrincipal/>} />
                <Route path="viewPdf" element={<PDFGenerator/>} />
                <Route path="principalecr" element={<PrincipalECRPage/>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}