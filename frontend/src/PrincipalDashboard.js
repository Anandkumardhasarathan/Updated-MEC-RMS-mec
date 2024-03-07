import { BrowserRouter, Route, Routes } from "react-router-dom"
import { PrincipalMenu } from "./PrincipalMenu"

import PDFGenerator from "./pdfGenerator"
import { ViewReqPrincipal } from "./ViewReqPriincipal"
import { PrincipalECRPage } from "./PrincipalECRPage"

export const PrincipalDashboard=()=>{
    return(
        <>
            <BrowserRouter>
                <PrincipalMenu/>
                <Routes>
                <Route path="" element={<ViewReqPrincipal/>} />
                <Route path="viewPdf" element={<PDFGenerator/>} />
                <Route path="principalecr" element={<PrincipalECRPage/>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}