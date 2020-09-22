import React, { useState, useEffect } from 'react'
import './components.css'

function Notifications(props) {

    const [notify, setNotify] = useState()
    const [notificationType, setNotificationType] = useState("")

    const highThreshold = 8.9
    const lowThreshold = 4.4

    // const testHigh = 8.1
    // const testLow = 5

    useEffect(() => {
        willNotify(props.reading)

    }, [props.reading, []])
    //on mount [] and [reading]

    function willNotify(reading) {
        if (reading > highThreshold) {
            setNotify(true)
            setNotificationType("high")
        }
        else if (reading < lowThreshold) {
            setNotify(true)
            setNotificationType("low")
        }
        else {
            setNotify(false)
        }
    }
    function notificationHeader() {
        let banner =
            <div className="Header" style={{ color: notificationType === "high" ? "yellow" : "red" }}>
                <h1>
                    {notificationType === "high" ? "High detected" : "Low detected"}
                </h1>
            </div>


        return (
            banner
        )
    }
    function nightscoutDownAlert() {
        let retroBanner =
            <div class="alert Alert-custom" role="alert" style={{
                background: "545b62",
                color: "545b62",
                width: "auto",
                margin: "auto"
            }}>
                <strong style={{ color: 'red' }}>Last reading</strong> detected {props.diffReading} minutes ago.
          </div>

        return retroBanner
    }

    return (
        <div>
            {notify ? notificationHeader() : null}
            {props.retroBG === "true" ? nightscoutDownAlert() : null}
        </div>

    )

}

export default Notifications

