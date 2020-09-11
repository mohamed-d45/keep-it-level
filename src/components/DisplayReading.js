import React, { useState, useEffect } from 'react'

function DisplayReading(props) {
    const [delta, setDelta] = useState()
    const [displayBoxColor, setDisplayBoxColor] = useState("grey")

    useEffect(() => {
        const deltaBG = Math.abs(props.pastBG - props.reading).toFixed(2);
        const changeInBG = ((deltaBG >= 0) ? "+" : "-") + deltaBG

        let displayColor = "grey"

        if ((props.reading >= 4.9)) {
            displayColor = "green"
        }
        if ((props.reading > 7.0)) {
            displayColor = "orange"
        }
        if ((props.reading < 4.9)) {
            displayColor = "red"
        }

        console.log(props.reading, props.time) //

        setDisplayBoxColor(displayColor)
        setDelta(changeInBG)
        console.log(changeInBG);

    }, [props.pastBG, []])


    return (
        <div className="DisplayBox" style={{ background: displayBoxColor }}>
            <h1>{props.reading}</h1>
            <h3> {delta} mmol/L  || {props.time}</h3>

        </div>
    )
}

export default DisplayReading