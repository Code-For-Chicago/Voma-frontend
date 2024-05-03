import React, { useState, useContext, useEffect } from 'react';
import { Box, Grid, Button, Radio, RadioGroup, Typography, FormControlLabel } from '@mui/material';
import { ReactComponent as ErrorIcon } from '../../assets/Error.svg';
import { VolunteerContext } from '../../lib/VolunteerProvider';
import { fetchSkills } from '../../lib/Requests';


export default function Skills({ leadershipRole }) {
  // Todo: include leadershipRole here, with the same set of skills. Also refactor to styled components
  const Volunteer = useContext(VolunteerContext);

  const [skill, setSkill] = useState('');
  const [skillList, setSkillList] = useState([])
  const [unfinished, setUnfinished] = useState(true);

  useEffect(() => {
    async function getSkills() {
      let skills = await fetchSkills();
      let skillNames = skills.map((skillType) => skillType.name)
      setSkillList(skillNames)
    }
    getSkills()
  }, [])

  const handleSkillChoice = (e) => { 
    setSkill(e.target.value); 
    setUnfinished(false);
  };

  const updateVolunteer = () => {
    if (skill) {
      Volunteer.updateInfo({ skills: skill });
      Volunteer.setRegistrationStep(3);
    } else {
      setUnfinished(true);
    }
  }

  const toCamelCase = (str) =>
    str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
        index === 0 ? word.toLowerCase() : word.toUpperCase(),
      )
      .replace(/\s+/g, '');

  return (<>
    <Grid container justifyContent="flex-end" >
      <Grid item sm={9} xs={11}>
        <Typography variant="h4" component="h1" mb="16px">Skills</Typography>
      </Grid>
    </Grid>
    <Grid container justifyContent="center" mb="16px">
      <Grid item sm={6} xs={10}>
        <Typography >
          Select the skill you will practice the most at Code for Chicago. You don&apos;t have to be
          an expert in this skill.
        </Typography>
      </Grid>
    </Grid>
    <Grid container justifyContent="flex-end">
      <Grid item sm={9} xs={11}>
        <Box mb="32px">
          <ErrorIcon variant="filled" sx={{ display: 'inline-block' }} /> 
          <Typography component="div" color="#B00020" sx={{ display: 'inline-block', marginLeft: '10px', verticalAlign: 'top'}}>All fields are required</Typography>
        </Box>
      </Grid>
      <Grid item sm={9} xs={11} mb="24px">
        <Typography variant="h5">Choose only one</Typography>

        <RadioGroup
          defaultValue="female"
          name="radio-buttons-group">
          {skillList.map((skillOption) => (
            <FormControlLabel
              key={skillOption}
              type="radio"
              name="skill"
              id={toCamelCase(skillOption)}
              value={skillOption}
              onChange={(e) => handleSkillChoice(e)}
              checked={skillOption === skill}
              label={skillOption}
              control={<Radio />}
            />
          ))}
        </RadioGroup>
      </Grid>

      <Grid item sm={9} xs={11}>
        <Typography variant="button">
          <Button 
            sx={{ marginRight: '16px' }}
            onClick={() => Volunteer.setRegistrationStep(2)} 
            size="medium"
            variant="contained">
            Back
          </Button>
          <Button 
            onClick={() => updateVolunteer()} 
            size="medium"
            variant="contained" 
            disabled={unfinished}>
            Next
          </Button>
        </Typography>
      </Grid>
    </Grid>
  </>);
}
