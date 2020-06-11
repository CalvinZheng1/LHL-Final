import React from 'react';
import { Paper } from '@material-ui/core';
import '../styles/Info.scss';

interface IProps {

}

const InfoView: React.FC<IProps> = () => {
  return (
  <Paper elevation={1} className= "Container">
    <h1 className="Title"> Info You Need To Know
    </h1>
    <Paper className="coughing" >
      <img src='https://github.com/kurtgalvin/LHL-Final/blob/Stretch/Infograph/frontend/docs/coughing.png?raw=true' alt='coughing' width="300" />
      <div className='text'>
        Stay home if you're sick or showing any flue like symptoms.
      </div>
    </Paper>
    <Paper className="distancing">
      <img src='https://github.com/kurtgalvin/LHL-Final/blob/Stretch/Infograph/frontend/docs/social-distance.png?raw=true' alt='distance' width="300" />
      <div className="text">
        {/* 2. Physical distancing:   */}
        Stay at least 2 m away from others outside your home.
      </div>
    </Paper>
    <Paper className="Gathering">
      <img src='https://github.com/kurtgalvin/LHL-Final/blob/Stretch/Infograph/frontend/docs/gathering.png?raw=true' alt='gather' width="300" />
      <div className='text'>
        Avoid any gatherings of people on private property, at work, or in parks.
      </div>
    </Paper>
    <Paper className="Work">
      <img src='https://github.com/kurtgalvin/LHL-Final/blob/Stretch/Infograph/frontend/docs/Work.png?raw=true' alt='work' width="300" />
      <div className= "text">
        {/* 4. Work at home if you can. */}
        If your business or organization isn't an essential service, you must ensure 2 m distancing for customers or staff. If 2 m isn't possible, you must close.
      </div>
    </Paper>
    <Paper className="Essential">
      <img src='https://github.com/kurtgalvin/LHL-Final/blob/Stretch/Infograph/frontend/docs/essential.png?raw=true' alt='essential' width="300" />
      <div className="text">
        {/* 5. Avoid non-essential outings. */}
        Only go out for groceries, medical needs, or exercise. Exercise alone or with members of your household.
      </div>
    </Paper>
  </Paper>
  )
}

export default InfoView