import React, { useState, useEffect } from 'react'
import './App.css';
import DisplayReading from './components/DisplayReading'
import TreatmentProfile from './components/TreatmentProfile'
import Notifications from './components/Notifications'
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
function App() {
  const [currentReading, setcurrentReading] = useState()
  const [pastReading, setPastReading] = useState()
  const [currentTime, setcurrentTime] = useState()

  useEffect(() => {
    document.title = currentReading
  })

  useEffect(() => {

    function getReadings() {
      const proxyurl = "https://cors-anywhere.herokuapp.com/";
      const url = "https://NS_URL/api/v1/entries.json";
      //env
      fetch(proxyurl + url)
        .then(response => response.json())
        .then(data => {
          const reading = (data[0].sgv / 18).toFixed(1);
          const pastBG = (data[1].sgv / 18).toFixed(2);

          var t = new Date(data[0].dateString);
          const time = t.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

          setcurrentReading(reading);
          setPastReading(pastBG)
          setcurrentTime(time)
        })
        .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"));
      //catch nightscout server down
      //catch no new reading retro
    }

    getReadings()

    const interval = setInterval(() => getReadings(), 300000)
    return () => {
      clearInterval(interval)
    }
  }, [])



  return (
    <div >

      <Notifications
        reading={currentReading} />




      <div className="App-header">
        <DisplayReading
          reading={currentReading}
          pastBG={pastReading}
          time={currentTime} />
        <TreatmentProfile
          reading={currentReading} />
      </div>


    </div>
  );
}

export default App;
