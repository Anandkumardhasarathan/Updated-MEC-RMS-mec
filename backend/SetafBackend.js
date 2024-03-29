const express= require('express')
const bodyparser=require('body-parser')
const database=require('./db')
const cors=require('cors')
const multer=require('multer')

const server=express.Router()
server.use(cors())
server.use(bodyparser.urlencoded({extended:true}))
server.use(bodyparser.json())

server.get('/journallist/:empId',async(req,res)=>{  
    const empid=req.params.empId;
    const query="select * from data_setaf_journal_publication as setaf inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year where emp_id=?"
    database.query(query,[empid],(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})


server.post('/journalnewrecord/:empid',async(req,res)=>{
    const  empid=req.params.empid;
    const {report_id,emp_id,dept_id,academic_year,semester,	name_of_author,	title_of_paper,	name_of_journal,date_of_publication,issn_number,volume_no,issue_no,page_no,journal_listed_in,link_to_website_of_journal,journal_first_page_PDF}=req.body
    const sql="insert into data_setaf_journal_publication values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
    database.query(sql,[report_id,empid,dept_id,
        academic_year,
        semester,
        name_of_author,	
        title_of_paper,	
        name_of_journal,
        date_of_publication,
        issn_number,
        volume_no,
        issue_no,
        page_no,
        journal_listed_in,
        link_to_website_of_journal,
        journal_first_page_PDF


    ],(err,result)=>{
        if (err) {
            console.log(err)
            res.status(404).json({ "error": err.message })
            return
        }
        res.status(200).json(result)
    })
})
/////hod dashboard
server.get('/journallist/hoddashboard/:deptID',async(req,res)=>{  
    const deptid=req.params.deptID;
    const query="select * from data_setaf_journal_publication as setaf inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year   where dept_id=?"
    database.query(query,[deptid],(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})

/////principal dashboard///
server.get('/journalrecs',async(req,res)=>{  
    // const empid=req.params.empId;
    const query="select * from data_setaf_journal_publication as setaf inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year "
    database.query(query,(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})


//////pdf fetch datas////////
server.get('/data/:report_id', (req, res) => {
    const report_id = req.params.report_id;
    const sql =  `SELECT * FROM data_setaf_journal_publication as setaf inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year  inner join data_dept on setaf.dept_id=data_dept.dept_id  where setaf.report_id=?`;

    database.query(sql,[report_id], (err, results) => {
      if (err) throw err;
  
      res.json(results[0]);
    });
  });

///////////////////conference publication and presentation//////////////////////////////
server.get('/conferencelist/:empId',async(req,res)=>{
    const empid=req.params.empId;
    const query="select  * from data_setaf_conference_publication_and_presentations as setaf inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year where emp_id=? "
    database.query(query,[empid],(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})
//post method
server.post('/conferencenewrecord/:empid',async(req,res)=>{
    const  empid=req.params.empid;
    const {report_id,dept_id,
        emp_id,
        academic_year,
        semester,
        name_of_the_authors,
        title_of_the_conference_paper,
        name_of_the_conference,
        place_of_the_conference,
        conference_type,
        date_of_conference,
        isbn_of_the_conference_proceeding,
        conference_certificate_and_proceeding_pdf
    }=req.body
    const sql="insert into data_setaf_conference_publication_and_presentations values (?,?,?,?,?,?,?,?,?,?,?,?,?);"
    database.query(sql,[report_id,dept_id,
            empid,
            academic_year,
        	semester,
            name_of_the_authors,
            title_of_the_conference_paper,
            name_of_the_conference,
            place_of_the_conference,
            conference_type,
            date_of_conference,
            isbn_of_the_conference_proceeding,
            conference_certificate_and_proceeding_pdf

    ],(err,result)=>{
        if (err) {
            res.status(404).json({ "error": err.message })
            return
        }
        res.status(200).json(result)
    })
})

/////hod dashboard
server.get('/conferencelist/hoddashboard/:deptID',async(req,res)=>{  
    const deptid=req.params.deptID;
    const query="select * from data_setaf_conference_publication_and_presentations  as setaf inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year where dept_id=?"
    database.query(query,[deptid],(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})
/////principal dashboard///
server.get('/conferencerecs',async(req,res)=>{  
    // const empid=req.params.empId;
    const query="select * from data_setaf_conference_publication_and_presentations  as setaf inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year "
    database.query(query,(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})

//////pdf fetch datas////////
server.get('/data/conf/:report_id', (req, res) => {
    const report_id = req.params.report_id;
    const sql =  `SELECT * FROM data_setaf_conference_publication_and_presentations as setaf inner join data_dept on setaf.dept_id=data_dept.dept_id inner join predefined_academic_year as acd on acd.acd_yr_id=setaf.academic_year  where setaf.report_id=?`;

    database.query(sql,[report_id], (err, results) => {
      if (err) throw err;
  
      res.json(results[0]);
    });
  });

/////////////////////////////////workshop//////////////////////////
server.get('/workshoplist/:empId',async(req,res)=>{
    const empid=req.params.empId;
    const query="select * from data_setaf_workshop_seminar_fdps_sdpa_participation where emp_id=?"
    database.query(query,[empid],(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})

server.post('/workshopnewrecord/:empid',async(req,res)=>{
    const  empid=req.params.empid;
    const {report_id,
        emp_id,
        dept_id,
        subtype,
        name_of_the_faculty,
        designation,
        nature_of_the_program,
        title_of_the_program,
        duration_from,
        duration_to,
        participation,
        name_of_the_organization_and_place,
        location_of_organization,
        amount_provided_by_the_HEI,
        Certificates_pdf
    }=req.body
    const sql="insert into data_setaf_workshop_seminar_fdps_sdpa_participation values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
    database.query(sql,[report_id,
        empid,
        dept_id,
        subtype,
        name_of_the_faculty,
        designation,
        nature_of_the_program,
        title_of_the_program,
        duration_from,
        duration_to,
        participation,
        name_of_the_organization_and_place,
        location_of_organization,
        amount_provided_by_the_HEI,
        Certificates_pdf	
    ],(err,result)=>{
        if (err) {
            res.status(404).json({ "error": err.message })
            return
        }
        res.status(200).json(result)
    })
})


////////Techtalks//////////

server.get('/techtalklist/:empId',async(req,res)=>{
    const empid=req.params.empId;
    const query="select * from data_setaf_tech_talks where emp_id=? "
    database.query(query,[empid],(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})

server.post('/techtalknewrecord/:empid',async(req,res)=>{
    const  empid=req.params.empid;
    const {emp_id,
        name_of_the_faculty,
        MuDiL_number,
        lecture_delivered_to_branch,
        semester,
        section,
        data_of_lecture_delivered,
        period,
        topic_of_discussion,
        no_of_beneficiaries,
        detail_of_discussion_made,
        outcome_of_the_discussion,
        outcome_of_he_activity,
        PO_and_PSO,
        attendance_sheet_pdf,
        handout_of_lecture_pdf	


    }=req.body
    const sql="insert into data_setaf_tech_talks values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
    database.query(sql,[empid,
        name_of_the_faculty,
        MuDiL_number,
        lecture_delivered_to_branch,
        semester,
        section,
        data_of_lecture_delivered,
        period,
        topic_of_discussion,
        no_of_beneficiaries,
        detail_of_discussion_made,
        outcome_of_the_discussion,
        outcome_of_he_activity,
        PO_and_PSO,
        attendance_sheet_pdf,
        handout_of_lecture_pdf	

    ],(err,result)=>{
        if (err) {
            res.status(404).json({ "error": err.message })
            return
        }
        res.status(200).json(result)
    })
})


///////////////////////faculty guest talk in other institutions/////////////////////////
server.get('/facultylist/:empId',async(req,res)=>{
    const empid=req.params.empId;
    const query="select * from data_setaf_faculty_guest_talk_in_other_institution where emp_id=? "
    database.query(query,[empid],(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})



server.post('/facultynewrecord/:empid',async(req,res)=>{
    const  empid=req.params.empid;
    const {emp_id,
        name_of_the_faculty,
        date,
        topic_of_guest_talk,
        name_of_institution_or_industry,
        place_of_institution_or_industry,
        no_of_beneficaries,
        letter_of_appreciation_or_certificate_pdf
    }=req.body
    const sql="insert into data_setaf_faculty_guest_talk_in_other_institution values(?,?,?,?,?,?,?,?);"
    database.query(sql,[empid,
        name_of_the_faculty,
        date,
        topic_of_guest_talk,
        name_of_institution_or_industry,
        place_of_institution_or_industry,
        no_of_beneficaries,
        letter_of_appreciation_or_certificate_pdf
    ],(err,result)=>{
        if (err) {
            res.status(404).json({ "error": err.message })
            return
        }
        res.status(200).json(result)
    })
})
////////////////////////////nptel//////////////////////////////

server.post('/nptelnewrecord',async(req,res)=>{
    const {academic_year,
        semester,
        name_of_the_faculty,
        year,
        session,
        course_name,
        score_obtained,
        certificate_type,
        certificate_pdf
    }=req.body
    const sql="insert into data_setaf_nptel_certification values (?,?,?,?,?,?,?,?,?);"
    database.query(sql,[academic_year,
        semester,
        name_of_the_faculty,
        year,
        session,
        course_name,
        score_obtained,
        certificate_type,
        certificate_pdf
    ],(err,result)=>{
        if (err) {
            res.status(404).json({ "error": err.message })
            return
        }
        res.status(200).json(result)
    })
})


////////////////////proposal submission for grants

server.post('/proposalnewrecord',async(req,res)=>{
    const {academic_year,
        semester,
        name_of_the_facculty,
        name_of_the_funding_agency,
        date_of_submission,
        type,
        title_of_the_proposal_submitted,
        duration,
        amount_quoted_in_lakhs,
        grant_sanctioned,
        proposal_proof_pdf,
        grant_sanctioned_proof_pdf

    }=req.body
    const sql="insert into data_setaf_proposal_submission_for_grants values (?,?,?,?,?,?,?,?,?,?,?,?);"
    database.query(sql,[academic_year,
        semester,
        name_of_the_facculty,
        name_of_the_funding_agency,
        date_of_submission,
        type,
        title_of_the_proposal_submitted,
        duration,
        amount_quoted_in_lakhs,
        grant_sanctioned,
        proposal_proof_pdf,
        grant_sanctioned_proof_pdf
    ],(err,result)=>{
        if (err) {
            res.status(404).json({ "error": err.message })
            return
        }
        res.status(200).json(result)
    })
})


server.get('/proposallist/:empId',async(req,res)=>{
    const query="select * from data_setaf_proposal_submission_for_grants "
    database.query(query,["%"+req.params.empId+"%"],(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})


///////////////////////participation in taste

server.post('/tastenewrecord',async(req,res)=>{
    const {name_of_the_faculty,
        date,
        taste_number,
        seminar_topic,
        resource_person_name,
        outcome_of_the_activity

    }=req.body
    const sql="insert into data_setaf_participation_in_taste values (?,?,?,?,?,?);"
    database.query(sql,[name_of_the_faculty,
        date,
        taste_number,
        seminar_topic,
        resource_person_name,
        outcome_of_the_activity
    ],(err,result)=>{
        if (err) {
            res.status(404).json({ "error": err.message })
            return
        }
        res.status(200).json(result)
    })
})

server.get('/tastelist/:empId',async(req,res)=>{
    const query="select * from data_setaf_participation_in_taste "
    database.query(query,["%"+req.params.empId+"%"],(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})

/////////////////////////////////////////////////visit to industry//////////////////////////////////////
server.get('/industrylist/:empId',async(req,res)=>{
    const query="select * from data_setaf_visit_to_industries_institution "
    database.query(query,["%"+req.params.empId+"%"],(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})


server.post('/newrecord',async(req,res)=>{
    const{S_NO,
        faculty_name,
        date_of_visit,	
        name_of_industry,	
        location_of_industry,	
        website_link_of_industry,	
        name_of_insdustry_instution_person_interacted,	
        designation_of_industry_instution_person_interacted,	
        purpose_of_the_visite,
        outcome_of_the_activity,
        attachments,
        report_of_visite_pdf,
        photo_jpg,
        geotagged_photos_jpg
    }=req.body
    const sql="insert into data_setaf_visit_to_industries_institution values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    database.query(sql,[S_NO,
        faculty_name,
        date_of_visit,	
        name_of_industry,	
        location_of_industry,	
        website_link_of_industry,	
        name_of_insdustry_instution_person_interacted,	
        designation_of_industry_instution_person_interacted,	
        purpose_of_the_visite,
        outcome_of_the_activity,
        attachments,
        report_of_visite_pdf,
        photo_jpg,
        geotagged_photos_jpg],(err,records)=>{
        if(err){
            res.status(500).json({'error':err.message})
            return
        }
        res.status(200).json({'message':'Registered successfully!!!!!!........'})

    })

})

//////////////////////////////////////Seed money proposal/////////////////////////////////////
server.post('/seednewrecord',async(req,res)=>{
    const{s_no,academic_year,semester,name_of_the_faculty,title_of_the_research_project,amount_of_seed_money,year_of_receiving,attachments,metrf_sanction_letter_pdf}=req.body
    const sql="insert into data_setaf_seed_money_proposal_for_research values(?,?,?,?,?,?,?,?,?)"
    database.query(sql,[s_no,academic_year,semester,name_of_the_faculty,title_of_the_research_project,amount_of_seed_money,year_of_receiving,attachments,metrf_sanction_letter_pdf],(err,records)=>{
        if(err){
            res.status(500).json({'error':err.message})
            return
        }
        res.status(200).json({'message':'Registered successfully!!!!!!........'})

    })

})



server.get('/seedlist/:empId',async(req,res)=>{
    const query="select * from data_setaf_seed_money_proposal_for_research  "
    database.query(query,["%"+req.params.empId+"%"],(err,result)=>{
        if(err){
            res.status(404).json({error:err.message})
            return
        }
        if(result.length==0){
            res.status(500).json({message:"the value in not found in the table"})
            
            return
        }
        else{
            //console.log(result)
            res.status(200).json(result)
        }
    })
})

//// pdf upload//////////
const storage1 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'D:/MEC/MEC PROJECT/New folder/Updated-MEC-RMS-mec/frontend/public/Journal_SETAF');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload1 = multer({ storage: storage1 });

server.post('/uploadPdf', upload1.any(), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('No file uploaded.');
    }
    res.send('PDF uploaded and saved on the server.');
});


//////////filter

server.post('/filterSetaf/:tableName',async(req,res)=>{
    try{

        const tableName = req.params.tableName
        const { acdyr_id, sem_id, dept_id, emp_id } = req.body
        const academic_id = acdyr_id.split(',')
        const dept = dept_id.split(",")
        const sem = sem_id.split(',')
        const emp = emp_id.split(',')
        let resultArray = []

        const processQuery = async (sql, params) => {
            return new Promise((resolve, reject) => {
                database.query(sql, params, (err, result) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        };

        const pushToResultArray = async (sql, params) => {
            console.log(sql)
            const temp = await processQuery(sql, params);
            if (temp.length > 0) {
                resultArray.push(...temp);
                // console.log("Resultarray"+resultArray)
            } else {
                console.log("No records");
            }
        };
// 1
        if(acdyr_id!="" && sem_id=="" && dept_id=="" && emp_id==""){
            await pushToResultArray(`select * from ${tableName} where academic_year in (${academic_id})`)
        }
// 2
        else if(acdyr_id=="" && sem_id=="" && dept_id!="" && emp_id==""){
            await pushToResultArray(`select * from ${tableName} where dept_id in (${dept})`)
        }
// 3
        else if(acdyr_id=="" && sem_id=="" && dept_id=="" && emp_id!=""){
            await pushToResultArray(`select * from ${tableName} where emp_id in (${emp})`)
        }
// 4
        else if(acdyr_id!="" && sem_id!="" && dept_id=="" && emp_id==""){
            await pushToResultArray(`select * from ${tableName} where academic_year in (${academic_id}) and semester in (${sem})`)
        }
// 5
        else if(acdyr_id!="" && sem_id=="" && dept_id!="" && emp_id==""){
            await pushToResultArray(`select * from ${tableName} where academic_year in (${academic_id}) and dept_id in (${dept})`)
        }
// 6
        else if(acdyr_id!="" && sem_id=="" && dept_id=="" && emp_id!=""){
            await pushToResultArray(`select * from ${tableName} where academic_year in (${academic_id}) and emp_id in (${emp})`)
        }
// 7
        else if(acdyr_id=="" && sem_id=="" && dept_id!="" && emp_id!=""){
            await pushToResultArray(`select * from ${tableName} where dept_id in (${dept}) and emp_id in (${emp})`)
        }
// 8
        else if(acdyr_id!="" && sem_id!="" && dept_id!="" && emp_id==""){
            await pushToResultArray(`select * from ${tableName} where academic_year in (${academic_id}) and semester in (${sem}) and dept_id in (${dept})`)
        }
// 9
        else if(acdyr_id!="" && sem_id!="" && dept_id=="" && emp_id!=""){
            await pushToResultArray(`select * from ${tableName} where academic_year in (${academic_id}) and semester in (${sem}) and emp_id in (${emp})`)
        }
// 10
        else if(acdyr_id!="" && sem_id=="" && dept_id!="" && emp_id!=""){
            await pushToResultArray(`select * from ${tableName} where dept_id in (${dept}) and academic_year in (${academic_id}) and emp_id in (${emp})`)
        }
// 11
        else if(acdyr_id!="" && sem_id!="" && dept_id!="" && emp_id!=""){
            await pushToResultArray(`select * from ${tableName} where dept_id in (${dept}) and academic_year in (${academic_id}) and emp_id in (${emp}) and semester in(${sem})`)
        }

        res.status(200).json({ resultArray });

    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

server.get('/getDeptById/:dept',async(req,res)=>{
    let sql= `select * from data_dept where dept_id = ${req.params.dept}`
    database.query(sql,(err,row)=>{
        if(err){
            console.log(err)
            return
        }
        res.status(200).json({row})
    })
})

server.get('/getAcdyr',async(req,res)=>{
    let sql= `select * from predefined_academic_year`
    database.query(sql,(err,row)=>{
        if(err){
            console.log(err)
            return
        }
        res.status(200).json({row})
    })
})

module.exports = server