import React, { useState, useContext, useRef } from 'react';
import { Box, Grid, TextField, Typography, Button, FormControl } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ReactComponent as ErrorIcon } from '../../assets/Error.svg';

import { VolunteerContext } from '../../lib/VolunteerProvider';

const useStyles = makeStyles({
  ContentArea: {
    '& .MuiOutlinedInput-input': {
      width: '328px',
    },

  }

});

export default function BasicInfoForm() {
  const Volunteer = useContext(VolunteerContext);
  const [basicInfo, setBasicInfo] = useState({
    email: Volunteer.email || '',
    name: Volunteer.name || '',
    pronouns: '',
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    pronouns: false,
  });


  const classes = useStyles();
  const completed = () => {
    const fields = Object.keys(basicInfo);
    for (let i=0; i<fields.length; i+=1) {
      const key = fields[i];
      if (!basicInfo[key]) {
        return false;
      }
    }
    return true;
  }

  const updateInfo = (e) => {
    setBasicInfo({
      ...basicInfo,
      [e.target.name]: e.target.value,
    });
  };




  const updateVolunteer = () => {
    let invalid = {};

    // Full Name Validation
    if (basicInfo.name.length<=3 || basicInfo.name.split(' ').length<2) {
      invalid.name = true;
    }

    // Pronouns Validation
    if (basicInfo.pronouns.length<=4) {
      invalid.pronouns = true;
    }

    // Email Validation
    if (basicInfo.email.length<=5 || !basicInfo.email.match(/^(.+)@(.+)$/)) {
      invalid.email = true;
    }

    const invalidFields = Object.keys(invalid);

    if (!invalidFields.length) {
      Volunteer.updateInfo(basicInfo);
      Volunteer.setRegistrationStep(2);

    } else {
      for (let i=0; i<invalidFields.length; i+=1) {
        const key = invalidFields[i];
        setErrors(e => ({
          ...e,
          [key]: true
        }));
        
      }
    }

    return true;
  };

  return (<>
      <Grid container justifyContent="left" className={classes.ContentArea}>
        <Grid item sm={4} xs={1} />
        <Grid item sm={3} xs={10}>
          <Typography variant="h4" component="h1" mb="16px">Basic Info</Typography>
          <Typography mb="16px">Input basic info about yourself</Typography>
          <Box mb="32px">
            <ErrorIcon variant="filled" sx={{ display: 'inline-block' }} /> 
            <Typography component="div" color="#B00020" sx={{ display: 'inline-block', marginLeft: '10px', verticalAlign: 'top'}}>All fields are required</Typography>
          </Box>
          <FormControl sx={{ width: '100%', marginBottom: '32px' }}>
            <TextField
              id="emailAddress"
              error={errors.email}
              type="email"
              name="email"
              onChange={updateInfo}
              label="Email Address"
              placeholder="email@domain.com"
              InputLabelProps={{ shrink: true, color: 'secondary' }}
              defaultValue={Volunteer?.email} 
              helperText={errors.email ? 'Please enter a valid email address.' : ''}
            />
          </FormControl>

          <FormControl sx={{ width: '100%', marginBottom: '32px' }}>
            <TextField
              error={errors.name}
              id="fullName"
              type="text"
              name="name"
              onChange={updateInfo}
              label="Full Name"
              placeholder="How would you want to be addressed?"
              InputLabelProps={{ shrink: true, color: 'secondary' }}
              defaultValue={Volunteer?.name}
              helperText={errors.name ? 'Please include your full name.' : ''}
            />
          </FormControl>

          <FormControl sx={{ width: '100%', marginBottom: '32px' }}>
            <TextField
              error={errors.pronouns}
              id="pronouns"
              type="text"
              name="pronouns"
              onChange={updateInfo}
              label="Pronouns"
              placeholder="How would you want to be addressed?"
              InputLabelProps={{ shrink: true, color: 'secondary' }}
              InputProps={{ color: 'secondary' }}
              helperText={errors.pronouns ? 'Please let us know your pronouns.' : ''}
            />
          </FormControl>


            <Button
              size="medium"
              variant="contained"
              onClick={completed() ? () => updateVolunteer() : null}
              disabled={!basicInfo.pronouns || !basicInfo.name || !basicInfo.email}
              type="button">
              Next
            </Button>
        </Grid>
      </Grid>
  </>);
}
