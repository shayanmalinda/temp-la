// Copyright (c) 2023, WSO2 LLC. (http://www.wso2.com). All Rights Reserved.
//
// This software is the property of WSO2 LLC. and its suppliers, if any.
// Dissemination of any information or reproduction of any material contained
// herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
// You may not alter or remove any copyright or other notice from copies of this content.

import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
// import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Alert, Button, Chip, CircularProgress, Dialog, DialogContent, DialogContentText, DialogTitle, Divider, Grid, IconButton, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import { DatePicker, StaticDatePicker } from '@mui/x-date-pickers';
import { DateRange as DateRangeIcon, Work as WorkIcon } from '@mui/icons-material';
import { countDaysInRange, getLocalDisplayDateReadable } from '../utils/formatting';

import CloseIcon from '@mui/icons-material/Close';

function ResponsiveDialog(props) {
  // const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  var { open, type, handleClose, theme, startDate, endDate } = props;

  const getMinDate = () => {
    const today = new Date();
    switch (type) {
      case "From":
        return new Date(today.getFullYear(), today.getMonth() - 1, 1);
      case "To":
        return startDate;
      default:
        return null;
    }
  };

  const getDate = () => {
    switch (type) {
      case "From":
        return startDate;
      case "To":
        return endDate;
      default:
        return null;
    }
  };

  const handleOnChange = (date) => {
    switch (type) {
      case "From":
        props.handleStartDate(date);
        break;
      case "To":
        props.handleEndDate(date);
        break;
      default:
        break;
    }
    handleClose();
  };


  useEffect(() => {
  }, [open, type, startDate]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <Typography variant='h5'>{type}</Typography>
        {handleClose ? (
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={dayjs(getDate())}
            onChange={handleOnChange}
            minDate={dayjs(getMinDate())}
          />
        </LocalizationProvider>
      </DialogContent>
    </Dialog>
  );
}

export default function ResponsiveDatePickers(props) {
  const { label, startDate, endDate, isLoading, errorForWorkingDays, workingDays, amountOfDays, isFullDayLeave, isMorningLeave, hasOverlap, isSubmitted } = props;
  const theme = useTheme();
  const today = new Date();
  const matchedXs = useMediaQuery(theme => theme.breakpoints.only('xs'));
  const hidden = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const [openDialog, setOpenDialog] = useState("");

  const getSelectedDays = () => {
    var selectedDays = countDaysInRange(props.startDate, props.endDate);
    if (selectedDays === 1 && !props.isFullDayLeave) {
      selectedDays = 0.5;
    }
    return selectedDays;
  };

  const handleOpenDialog = (type) => () => {
    setOpenDialog(type);
  };

  const handleCloseDialog = () => {
    setOpenDialog("");
  };

  useEffect(() => { props.loadWorkingDays() }, [startDate, endDate, hasOverlap, isFullDayLeave, isMorningLeave]);
  useEffect(() => { }, [isLoading, workingDays, errorForWorkingDays, amountOfDays, isSubmitted]);

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={12}>
          <Stack direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}>
            <Button sx={{
              padding: 0,
              borderRadius: 6,
            }}
              onClick={handleOpenDialog("From")}
            >
              <Paper sx={{
                boxSizing: 'border-box',
                width: 220,
                padding: 2,
                border: '1px solid #E9E9E9',
                borderRadius: 6,
              }}
              >
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="flex-start"
                >
                  <Typography variant='h6'>
                    From
                  </Typography>
                  <Typography variant='h4'>
                    {getLocalDisplayDateReadable(startDate)}
                  </Typography>
                </Stack>
              </Paper>
            </Button>
            <Button sx={{
              padding: 0,
              borderRadius: 6,
            }}
              onClick={handleOpenDialog("To")}
            >
              <Paper sx={{
                boxSizing: 'border-box',
                width: 220,
                padding: 2,
                border: '1px solid #E9E9E9',
                borderRadius: 6,
              }}>
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="flex-start"
                >
                  <Typography variant='h6'>
                    To
                  </Typography>
                  <Typography variant='h4'>
                    {getLocalDisplayDateReadable(endDate)}
                  </Typography>
                </Stack>
              </Paper>
            </Button>
          </Stack >
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}>
            <div style={{ marginLeft: 18 }} />
            <Chip
              variant='outlined'
              color='primary'
              label={<Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
              >
                <span style={{ width: 160 }}>
                  {`Total days selected: ${getSelectedDays()}`}
                </span>
                <span style={{ width: 160 }}>
                  {`Working days selected: `}{isLoading ? "-" : workingDays}
                </span></Stack>} />
            <CircularProgress sx={{ visibility: isLoading ? 'visible' : 'hidden' }}
              color="secondary" size={18} />
          </Stack>
        </Grid>
      </Grid>
      < Grid item container spacing={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >

        <Grid item xs={6}>
          {!isLoading &&
            <>{isSubmitted ? <Alert sx={{ mt: 1 }} variant="filled" severity="success">Your leave request has been submitted!</Alert> : hasOverlap && <Alert sx={{ mt: 1 }} variant="filled" severity="error">Your leave request overlaps with an existing leave request!</Alert>}
              {props.errorForWorkingDays && <Alert sx={{ mt: 1 }} variant="filled" severity="error">Failed to fetch working days!</Alert>}
              {props.workingDays <= 0 && !props.errorForWorkingDays ? <Alert sx={{ mt: 1 }} variant="filled" severity="warning">This leave request doesn't contain any working days!</Alert> : ""}
            </>}
        </Grid>
        {/* </Grid> */}
      </Grid >
      {/* </LocalizationProvider> */}
      < ResponsiveDialog
        open={Boolean(openDialog)}
        type={openDialog}
        startDate={startDate}
        endDate={endDate}
        handleStartDate={props.handleStartDate}
        handleEndDate={props.handleEndDate}
        handleClose={handleCloseDialog}
        theme={theme} />
    </>
  );
}
