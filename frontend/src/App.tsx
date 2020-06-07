import React, { useState } from 'react';
import { Paper, Tabs, Tab } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'

import './App.css';
import MapView from './views/Map';
import StatsView from './views/Stats';
import NewsView from './views/News';

enum Routes {
  Map,
  Stats,
  News
}

interface Link {
  label: string,
  to: () => void
}

function App() {
  const [route, setRoute] = useState<Routes>(Routes.Map)

  const links: Link[] = [
    {
      label: "Map",
      to: () => setRoute(Routes.Map)
    },
    {
      label: "Stats",
      to: () => setRoute(Routes.Stats)
    },
    {
      label: "News",
      to: () => setRoute(Routes.News)
    }
  ]

  return (
    <div className="App">
      <Paper>
        <Tabs 
          value={route}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          {links.map(link => <Tab label={link.label} onClick={link.to} />)}
        </Tabs>
      </Paper>

      {route === Routes.Map && <MapView />}
      {route === Routes.Stats && <StatsView />}
      {route === Routes.News && <NewsView />}
    </div>
  );
}

export default App;
