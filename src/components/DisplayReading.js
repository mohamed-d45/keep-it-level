import React, { useState, useEffect } from 'react'
//import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
function DisplayReading(props) {
    const [delta, setDelta] = useState()
    const [displayBoxColor, setDisplayBoxColor] = useState()

    useEffect(() => {
        const deltaBG = Math.abs(props.pastBG - props.reading).toFixed(2);
        const changeInBG = ((deltaBG >= 0) ? "+" : "-") + deltaBG

        let displayColor = displayBoxStyle()

        // console.log(props.reading, props.time) //

        setDisplayBoxColor(displayColor)
        setDelta(changeInBG)
        // console.log(changeInBG);

    }, [props.pastBG, []])


    return (
        <div className="DisplayBox" style={{ background: props.retroBG === "true" ? "grey" : displayBoxColor }}>
            <h1 style={{ textDecoration: props.retroBG === "true" ? 'line-through' : 'none' }}>{props.reading}</h1>
            <h3> {delta} mmol/L  || {props.time}</h3>

        </div>
    )

    function displayBoxStyle() {
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
        return displayColor
    }
}

export default DisplayReading