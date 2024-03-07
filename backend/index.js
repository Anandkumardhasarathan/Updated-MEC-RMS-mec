const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const workshop=require('./ecrWorkshopFlow')
const authorize=require('./logging')
const seminar=require('./ecrSeminarFlow')
const ecrFilter=require('./ecrFilter')
const cfilter=require('./commonFilter')
const load=require('./loadAndApprove')
const iv=require('./iv_workflow')
const setafjournal = require('./SetafBackend')
const setafconference = require('./SetafBackend')
const setafworkshop = require('./SetafBackend')
const setaftechtalk =require('./SetafBackend')
const setafnptel =require('./SetafBackend')
const setaffaculty =require('./SetafBackend')
const setafproposal =require('./SetafBackend')
const setafTaste =require('./SetafBackend')
const setafindustry =require('./SetafBackend')
const setafseed =require('./SetafBackend')

const app=express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())

app.use('/ecr',workshop)
app.use('',authorize)
app.use('/seminar',seminar)
app.use('/ecrFilter',ecrFilter)
app.use('/cfilter',cfilter)
app.use('/load',load)
app.use('/iv',iv)
app.use('/journal',setafjournal)
app.use('/conference',setafconference)
app.use('/Workshop',setafworkshop)
app.use('/techtalks',setaftechtalk)
app.use('/nptel',setafnptel)
app.use('/faculty',setaffaculty)
app.use('/proposal',setafproposal)
app.use('/taste',setafTaste)
app.use('/industry',setafindustry)
app.use('/seed',setafseed)


app.listen(1234,()=>{
    console.log("App is running")
})