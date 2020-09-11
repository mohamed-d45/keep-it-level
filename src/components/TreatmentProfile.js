import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

function TreatmentProfile(props) {
    const [dailyDose, setDailyDose] = useState()
    const [iSF, setISF] = useState(0)
    const [targetGlucose, setTargetGlucose] = useState()
    const [correctionDose, setCorrectionDose] = useState(0)

    const [profile, setProfile] = useState(false)

    useEffect(() => {
        setISF((100 / dailyDose).toFixed(2))
    }, [dailyDose])

    useEffect(() => {
        const localTDD = localStorage.getItem("TDD")
        const total = JSON.parse(localTDD)

        const localISF = localStorage.getItem("ISF")
        const iSF = JSON.parse(localISF)

        const target = localStorage.getItem("TRG")
        const trg = JSON.parse(target)

        if (total) {
            setDailyDose(total)
            setISF(iSF)
            setTargetGlucose(trg)
        }
    }, [])

    useEffect(() => {
        calculateCorrectionDose(props.reading, targetGlucose, iSF)
    }, [props.reading, iSF, targetGlucose])
    // function updateISF() {
    //     const json = JSON.stringify(iSF);
    //     localStorage.setItem("ISF", json)
    //     console.log("Insulin Sensitivity Factor: ", localStorage.getItem("ISF"));
    // }
    // function handleTDDChange(event) {
    //     setDailyDose(event.target.value);
    // }
    // function handleTargetChange(event) {
    //     setTargetGlucose(event.target.value);
    // }
    function updateLocal() {
        const total = JSON.stringify(dailyDose);
        localStorage.setItem("TDD", total)
        console.log("Total Daily Dose: ", localStorage.getItem("TDD"));

        const factor = JSON.stringify(iSF);
        localStorage.setItem("ISF", factor)
        console.log("Insulin Sensitivity Factor: ", localStorage.getItem("ISF"));

        const target = JSON.stringify(targetGlucose);
        localStorage.setItem("TRG", target)
        console.log("Glucose Target Range: ", localStorage.getItem("TRG"));


    }

    function updateProfile() {
        setProfile(prevProfile => !prevProfile)
    }
    function calculateCorrectionDose(current, target, iSF) {
        let correction = ((current - target) / iSF).toFixed(2)
        setCorrectionDose(correction)

    }
    function displayCorrection() {
        let correctionMsg = ""
        if ((props.reading <= 8.9) && (props.reading > 7.0)) {
            correctionMsg = "Correction Of : " + correctionDose + " U neccessary with meal bolus."
        }
        else if (props.reading > 8.9) {
            correctionMsg = "Blood Sugar is above Target, Suggested Correction of: " + correctionDose + " U."
        }
        else if (props.reading < 4.9) {
            correctionMsg = "Blood Sugar is below Target, Correction of: " + correctionDose + " U neccessary with meal bolus."
        }
        else {
            correctionMsg = "In Range No Correction."
        }
        return (
            correctionMsg
        )
    }

    //for writting
    let dose = "";
    let isf = "";
    if (dailyDose && (iSF > 0)) {
        dose = <h5>Total Daily Dose {dailyDose} U</h5>
        isf = <h5>Insulin sensitivty factor for correction doses: {iSF}</h5>
    }




    return (

        <div>


            <div>
                <br></br>
                <h3>Suggested Correction Dose</h3>
                <p>{displayCorrection()}</p>


            </div>

            <div>
                <br></br>
                <h3>
                    Treatment Profile
                </h3>
                {/* <Button variant="primary">Primary</Button>{' '} */}
                <Button variant="primary" onClick={updateProfile}>Update Profile</Button>
            </div>
            {profile ? <div>


                <h6>TODO: info</h6>
                {/* <input
                        type="text"
                        placeholder="Enter Total Daily Dose"
                        style={{ width: "170px" }}
                        onChange={handleTDDChange}
                    /> */}
                <label>
                    Enter your total daily insulin dose(TDD):
                    <br></br>
                    <input
                        type="text"
                        placeholder={dailyDose}
                        style={{ width: "170px" }}
                        onChange={event => setDailyDose(event.target.value)}
                    />
                </label>
                <br></br>

                <label>
                    Enter your high glucose target:
                    <br></br>

                    <input
                        type="text"
                        onChange={event => setTargetGlucose(event.target.value)}
                        //value={targetGlucose}
                        placeholder={targetGlucose}
                        style={{ width: "170px" }}
                    />

                </label>
                <br></br>
                <Button
                    variant="success"
                    size='lg'
                    onClick={updateLocal()}
                >Save</Button>



                {dose}
                {isf}
            </div> : null}


        </div>
    )
}

export default TreatmentProfile