import React,{useState} from 'react';
import MUIDataTable from "mui-datatables";
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
//Date Imports
import {DateConverter} from '../../../Helper/Helper';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    alignItems:"center",
    maxWidth: '92vw',
    margin:  '20px',
  },
}));

const RawDataTable = (props) => {

  const columns = [
    {
      name: "aircraft",
      label: "Aircraft",
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap'}})
      }
    },
    {
      name: 'tail', 
      label: 'Tail#',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap'}})
      }
    },
    {
      name: 'fightLeg', 
      label: 'Flight Leg',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap', minWidth: "90px"}})
      }
    },
    {
      name: 'ATAMain', 
      label: 'ATAMain',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap'}})
      }
    },
    {
      name: 'ATASub', 
      label: 'ATASub',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap'}})
      }
    },
    {
      name: 'ATA', 
      label: 'ATA',
      options: {
       filter: false,
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap'}})
      }
    },
    {
      name: 'ATADesc', 
      label: 'ATA Description',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap'}})
      }
    },
    {
      name: 'LRU', 
      label: 'LRU',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap'}})
      }
    },
    {
      name: 'date', 
      label: 'Date and Time',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap'}})
      }
     },
     {
      name: 'MDCMessages', 
      label: 'MDC Messages',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap',minWidth: "120px"}})
      }
     },
     {
      name: 'status', 
      label: 'Status',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap'}})
      }
     },
     {
      name: 'phase', 
      label: 'Phase',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap'}})
      }
     },
     {
      name: 'type', 
      label: 'Type',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap'}})
      }
     },
     {
      name: 'intermittent', 
      label: 'Intermittent',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap'}})
      }
     },
     {
      name: 'equationID', 
      label: 'Equation ID',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap',minWidth: "100px"}})
      }
     },
     {
      name: 'diagnostic', 
      label: 'Diagnostic',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap'}})
      }
     },
     {
      name: 'data', 
      label: 'Data Used to Determine Msg',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap'}})
      }
     },
     {
      name: 'id', 
      label: 'ID',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap'}})
      }
     },
     {
      name: 'flightNumber', 
      label: 'Flight Number',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap'}})
      }
     },
    ];

    let data = [];
    props.data?.map((item => {
      data.push(
          {
            aircraft: item["Aircraft"], 
            tail: item["Tail"], 
            fightLeg: item["Flight Leg No"], 
            ATAMain: item["ATA Main"],  
            ATASub: item["ATA Sub"],  
            ATA: item["ATA"],  
            ATADesc: item["ATA Description"],  
            LRU: item["LRU"],   
            date: DateConverter(item["DateAndTime"]),   
            MDCMessages: item["MDC Message"],  
            status: item["Status"],  
            phase: item["Flight Phase"],  
            type: item["Type"],   
            intermittent: item["Intermittent"],   
            equationID: item["Equation ID"],  
            source: item["Source"], 
            diagnostic: item["Diagnostic Data"],  
            data: item["Data Used to Determine Msg"],  
            id:item["ID"],
            flightNumber: item["Flight"],
          }
        );
        return data;
      }));

    const options = {
      filter: true,
      filterType: 'multiselect',
      responsive: "standard",
      fixedHeader: true,
      fixedSelectColumn: true,
      downloadOptions: {
        filename: 'MDC Raw Data from ' + props.rawDataConditions.fromDate + ' to ' + props.rawDataConditions.toDate + '.csv',
        separator: ',',
      },
      draggableColumns: {
        enabled: false,
        transitionTime: 300,
      },
      textLabels: {
        body: {
            noMatch: props.loading ? 'Please wait, loading data ...' : "Sorry, there is no matching data to display"
        },
      },
      elevation: 4,
      rowsPerPage: 7,
      rowsPerPageOptions: [7,20,50],
      selectToolbarPlacement:"none",
      tableBodyHeight: props.loading === true || data.length === 0 ? '200px' : '500px'
    };

    const theme = createMuiTheme({
      palette: {type: 'light'},
      typography: {useNextVariants: true},
  });
  
const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
            <MuiThemeProvider theme={theme}>
              <MUIDataTable
                title={"MDC Raw Data"}
                data={data}
                columns={columns}
                options={options}
              />
            </MuiThemeProvider> 
        </Grid> 
      </Grid> 
    </div>
  );
}
export default RawDataTable;

