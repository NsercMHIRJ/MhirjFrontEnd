import React, {useState,useEffect} from 'react';
import DailyReport from './DailyReport/DailyReport';
import FlagReport from './FlagReport/FlagReport';
import HistoryReport from './HistoryReport/HistoryReport';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
//Buttons Imports
import Button from '@material-ui/core/Button';
//Axios Imports 
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    margin:'50px auto',
    width:'95vw',
  },
  flagFilters: {
    margin: '20px',
    maxWidth: '100%',
    display: 'flex',
  },  
  flagH3: {
    marginLeft: '24px',
  },
  button:{
    margin:'9px 30px',
    backgroundColor:"#C5D3E0",
    width: '600px',
    height: '51px',
  },
  buttonFlag:{
    margin:'0px 50px 15px 0px',
    backgroundColor:"#C5D3E0",
    width: '89%',
    // height: '51px',
  },
}));

const Report = (props) => {
  const classes = useStyles();
  const [report, setReport] = useState(props.reportConditions);
  const [dailyReportData, setDailyReportData] = useState([]);
  const [historyReportData, setHistoryReportData] = useState([]);
  const [flagData, setFlagData] = useState([]);
  const [flagList,setFlagList] = useState('');
  const [flag,setFlag] = useState(false);
  const [flagConditions,setFlagConditions] = useState('');
  

  const [loadingDaily, setLoadingDaily] = useState(true);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [loadingFlag, setLoadingFlag] = useState(true);

  const HandleMultipleRowSelectReport = (flagList) => {
    console.log(flagList);
    setFlagList(flagList);
  }

  const [dailyValue,setDailyValue] = useState(0);
  const [histValue,setHistValue] = useState(0);
  const [flagValue,setFlagValue] = useState(0);

  useEffect(() => {
      setReport(props.reportConditions);
      let flag = false;
      for (var item in Object.entries(props.reportConditions)) {
        if (Object.entries(props.reportConditions)[item][1] === "" | Object.entries(props.reportConditions)[item][1] === undefined || Object.entries(props.reportConditions)[item][1] === "('')") {
          flag = true;
          if (report.analysis === "daily"){
            setLoadingDaily(false);
          }
          else if (report.analysis === "history"){
            setLoadingHistory(false);
          }
          // setLoading(false);
        }
      }
      setFlag(flag);
      console.log(flag);
      
    if (flag === false){
      localStorage.setItem("last",JSON.stringify(props.reportConditions)); 
      if(props.reportConditions.analysis === "daily"){
        localStorage.setItem("daily",JSON.stringify(props.reportConditions)); 
      }
      else if(props.reportConditions.analysis === "history"){
        localStorage.setItem("history",JSON.stringify(props.reportConditions));
      } 
    } 

  }, [props.reportConditions]);

  useEffect( () => {
    //if (report.ata !== null && report.ata !== undefined &&  report.ata !== ''){
      console.log(report.analysis);
      if (report.analysis === "daily"){
        setDailyValue(1);
        setDailyReportData([]);
        setLoadingDaily(true);
      }
      else if (report.analysis === "history"){
        setHistValue(1);
        setHistoryReportData([]);
        setLoadingHistory(true);
      }
    if (flag === false){
      /* Using useEffect so that axios can run only on the first render 
      http://localhost:8000/"/GenerateReport/{analysisType}/{occurences}/{legs}/{intermittent}/{consecutiveDays}/{ata}/{exclude_EqID}/{airline_operator}/{include_current_message}/{fromDate}/{toDate}") 
      Example of Daily Path: http://localhost:8000/GenerateReport/daily/2/2/3/0/SKW/28/0/2020-11-14/2020-11-15 */

      const {analysis, occurences, legs, intermittent} = report;
      let consecutiveDays;
      if (report.analysis === "daily") {
        consecutiveDays = 0;
      }
      else {
        consecutiveDays = report.days;
      }
      const operator = report.operator;          
      const ata = report.ata;
      const eqid = report.eqID;
      const messages = 0; 
      const fromDate = report.fromDate;
      const toDate = report.toDate;

      if (report.analysis !== "both") {
        /*http://localhost:8000/GenerateReport/history/2/2/2/3/('31','22','24','23')/('B1-007553','B1-005970')/skw/0/2020-11-18/2020-11-22*/

        const path = 'http://40.82.160.131/api/GenerateReport/' + analysis + '/' + occurences + '/' + legs + '/' + intermittent + '/' +
        consecutiveDays + '/' + ata + '/' + eqid + '/'+ operator + '/' + messages + '/' + fromDate + '/' + toDate;

          console.log(path);

          axios.post(path).then(function (res){
            var data = JSON.parse(res.data);
            if (report.analysis === "daily") {
              setDailyReportData(data);
              setLoadingDaily(false);
            }
            else if (report.analysis === "history") {
              setHistoryReportData(data);
              setLoadingHistory(false);
            }           
          }).catch(function (err){
            console.log(err);
            //setLoading(false);
            if (report.analysis === "daily"){
              setLoadingDaily(false);
            }
            else if (report.analysis === "history"){
              setLoadingHistory(false);
            }
          })
      }
    }
    else{
      if (report.analysis === "daily"){
        setLoadingDaily(false);
      }
      else if (report.analysis === "history"){
        setLoadingHistory(false);
      }
    }
  }, [report]);


  const handleGenerateFlagReport = (event) => {
    setFlagConditions(
      {         
        analysis: props.reportConditions.analysis,
        occurences: props.reportConditions.occurences,
        legs: props.reportConditions.legs,
        HistExEqID: props.reportConditions.eqID,
        intermittent: props.reportConditions.intermittent,
        days: props.reportConditions.days,
        operator: props.reportConditions.operator,
        HistAta: props.reportConditions.ata,
        messages: props.reportConditions.messages,
        fromDate: props.reportConditions.fromDate,
        toDate: props.reportConditions.toDate,
        flagList: flagList,
      },
    );
    console.log(flagList);
    setFlagData([]);
    setLoadingFlag(true);
    setFlagValue(1);
  }

  useEffect(() => {
    let flag = false;
    Object.values(flagConditions).map(item => {
      if (item === ""){
        flag = true;
        setLoadingFlag(false);
      }
    });

    if (flag === false) {  
      /*
      const path = 'http://localhost:8000/GenerateReport/{analysisType}/{occurences}/{legs}/{intermittent}/{consecutiveDays}/{ata}/
      {exclude_EqID}/{airline_operator}/{include_current_message}/{fromDate}/{toDate}/{acsn,bcode}';
      http://127.0.0.1:8000/GenerateReport/history/2/2/2/8/('32','22')/('B1-007553', 'B1-246748')/skw/1/2020-11-11/2020-11-12/('10214','B1-005815'), ('10214','B1-005831')
      */
      
      const flagPath = 'http://40.82.160.131/api/GenerateReport/' + flagConditions.analysis + '/' + flagConditions.occurences + '/' + 
      flagConditions.legs + '/' + flagConditions.intermittent + '/' + flagConditions.days + '/' + flagConditions.HistAta + '/' + 
      flagConditions.HistExEqID + '/'+ flagConditions.operator + '/' + flagConditions.messages + '/' + flagConditions.fromDate + '/' + 
      flagConditions.toDate + '/' + flagConditions.flagList;

        axios.post(flagPath).then(function (res){
          var data = JSON.parse(res.data);
          setFlagData(data);
          setLoadingFlag(false);
        }).catch(function (err){
          console.log(err);
          setLoadingFlag(false);
      })
    }
  },[flagConditions]);

  return(
    <div className={classes.root}>
      {historyReportData !== "" && historyReportData !== "undefined" && histValue === 1 &&
        <>
          <div>
            <Grid container spacing={0}>
              <Grid item xs={10}></Grid>
              <Grid item xs={2}>
                <Button 
                  variant="contained" 
                  onClick = {()=>handleGenerateFlagReport()}
                  className={classes.buttonFlag}>
                    Generate Flag Report
                </Button>
              </Grid>
              <Grid item xs={12}>
                <HistoryReport data = {historyReportData}  title = "History Report" reportConditions = {report} HandleMultipleRowSelectReport = {HandleMultipleRowSelectReport} loading = {loadingHistory}/>
              </Grid>
            </Grid>
          </div>
        </>
      }
      {dailyReportData !== "" && dailyReportData !== "undefined" && dailyValue === 1 &&
        <>
          <DailyReport data = {dailyReportData} title = "Daily Report" reportConditions = {report} loading = {loadingDaily}/>
        </>
      }
      {flagData !== "" && flagData !== "undefined" && flagValue === 1 &&
        <>
          <FlagReport data = {flagData} flagReportConditions = {flagConditions} title = "Flag Report" loading = {loadingFlag}/>
        </>
      }
    </div>  
  );    
};

export default Report;