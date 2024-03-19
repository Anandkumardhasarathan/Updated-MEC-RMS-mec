import "./setafsty.css"


function Setafbutton(){
    return(
        <>
        <div>
             <div class="sels">

                <a href="/consolidation"><div className="consold-btn"><a><button class="bg-danger text-center" style={{color:"white"}}>Consolidated SeTAF</button></a></div></a>      
                <div class="button-containers" style={{marginTop:"-150px"}}>  

                    <a href="/setaf/journalpublication"><button class="menu-buttons" data-category="Journal Publications">Journal Publications</button></a>
                    <a href="/conferencepublication"><button class="menu-buttons" data-category="Conference Publications and Presentations">Conference Publications and Presentations</button></a>
                    <a href="/workshop"> <button class="menu-buttons" data-category="Workshop">Workshop and Seminar</button></a>
                    <a href="/techtalk"> <button class="menu-buttons" data-category="TechTalks to be delivered Multidisciplinary Lectures">TechTalks to be delivered Multidisciplinary Lectures</button></a>
                    <a href="/facultly"><button class="menu-buttons" data-category="Faculty Guest Talk in other Institutions">Faculty Guest Talk in other Institutions</button></a>
                    <a href="/nptel"> <button class="menu-buttons" data-category="NPTEL Certification">NPTEL Certification</button></a>
                    <a href="/taste"><button class="menu-buttons" data-category="Participation in TASTE">Participation in TASTE</button></a>
                    <button class="menu-buttons" data-category="e-Content,(Video Lecture)">e-Content,(Video Lecture)</button>
                    <a href="/industry"><button class="menu-buttons" data-category="Visit to Industries,Institution">Visit to Industries,Institution</button></a>
                    <a href="/seed"><button class="menu-buttons" data-category="Seed Money Proposal for Research">Seed Money Proposal for Research</button></a>
                    <a href="proposal"><button class="menu-buttons" data-category="Proposals  Submission for Grants">Proposals  Submission for Grants</button></a>
                    <button class="menu-buttons" data-category="Awards at National,International Level">Awards at National,International Level</button>
                    <button class="menu-buttons" data-category="Books, Chapters Authorship">Books, Chapters Authorship</button>
                    <button class="menu-buttons" data-category="Consultancy and Corporate Training done for Revenue Generation">Consultancy and Corporate Training done for Revenue Generation</button>
                    <button class="menu-buttons" data-category="Patents Filled,Published,Granted">Patents Filled,Published,Granted</button>
                    <button class="menu-buttons" data-category="Collaborative Activities with MoU Signed Industries,Institutions">Collaborative Activities with MoU Signed Industries,Institutions</button>
                    <button class="menu-buttons" data-category="Visits to the Library">Visits to the Library</button>
                    <button class="menu-buttons" data-category="Students Motivation for Paper Presentation,Project Submission,Other Contests">Students Motivation for Paper Presentation,Project Submission,Other Contests</button>
                    <button class="menu-buttons" data-category="Professional Society Membership">Professional Society Membership</button>
                    <button class="menu-buttons" data-category="Students Field Work,Internship Guidance">Students Field Work,Internship Guidance</button>
                </div>
        {/* <a className="topic-headings" href="/Setaf/addform"><button class="views" id="addButton">+ Add</button></a> */}
             </div>
        </div>
        </>
    )
}
export default Setafbutton;