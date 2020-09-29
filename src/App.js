import React, { useState, useEffect } from 'react'
import './App.css';
import DisplayReading from './components/DisplayReading'
import TreatmentProfile from './components/TreatmentProfile'
import Notifications from './components/Notifications'
function App() {
  const [currentReading, setCurrentReading] = useState()
  const [pastReading, setPastReading] = useState()
  const [currentTime, setCurrentTime] = useState()
  const [diffOfLastReading, setDiffOfLastReading] = useState()
  const [isNSDown, setIsNSDown] = useState()

  const NSURL = process.env.REACT_APP_NS

  useEffect(() => {
    document.title = currentReading
  })

  useEffect(() => {

    function getReadings() {
      const proxyurl = "https://cors-anywhere.herokuapp.com/";
      const url = "https://" + NSURL + "/api/v1/entries.json";
      fetch(proxyurl + url)
        .then(response => response.json())
        .then(data => {

          const reading = (data[0].sgv / 18).toFixed(1);
          const pastBG = (data[1].sgv / 18).toFixed(2);

          const currentReadingTime = new Date(data[0].dateString);
          const time = currentReadingTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

          let testDown = 15

          // const testHigh = 11.2
          // const testLow = 3.8
          // const testNormal = 6.5

          setIsNSDown((lastReadingTime(currentReadingTime) >= testDown) ? "true" : "false")
          setDiffOfLastReading(lastReadingTime(currentReadingTime))
          setCurrentReading(reading);
          setPastReading(pastBG)
          setCurrentTime(time)



        })
        .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"));
      //TODO:catch nightscout server down
      //set no new reading in header and display box
    }

    getReadings()
    const interval = setInterval(() => getReadings(), 300000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  function lastReadingTime(currentTime) {
    const localTime = new Date()
    let diff = Math.floor((((localTime - currentTime) % 86400000) % 3600000) / 60000)
    // console.log("Local: " + localTime);
    // console.log("Current: " + currentTime);
    // console.log("DIFF: " + diff);
    return diff
  }

  return (
    <div >
      <Notifications
        reading={currentReading}
        retroBG={isNSDown}
        diffReading={diffOfLastReading}
      />
      <div className="App-header">
        <DisplayReading
          reading={currentReading}
          pastBG={pastReading}
          time={currentTime}
          retroBG={isNSDown}
        />
        <TreatmentProfile
          reading={currentReading}
        />
      </div>
    </div>
  );


}

export default App;
