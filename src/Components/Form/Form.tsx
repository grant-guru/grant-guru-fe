import React, {useState} from "react";
import './Form.css';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import { useAppDispatch } from "../../app/hooks";
import { setScholarships } from "../../slices/scholarshipsSlice";
import usStates from "../../data/usStates";

const Form = () => {
    // const [ fetching, setFetch ] = useState(false)
    const [ location, setLocation ] = useState<string>("")
    const [ educationLevel, setEducation ] = useState<string>("")
    const [ gender, setGender ] = useState<string>("")
    const [ veteranTrue, setVeteranTrue ] = useState(false)
    const [ veteranFalse, setVeteranFalse ] = useState(false)
    const [ immigrantTrue, setImmigrantTrue ] = useState(false)
    const [ immigrantFalse, setImmigrantFalse ] = useState(false)
    const [ ethnicity, setEthnicity ] = useState <Array<string>>([])
    const [ form,  setForm ] = useState<any>({
                        location: "",
                        educationLevel: "",
                        gender: "",
                        veteranStatus: false,
                        immigrantTrue: false,
                        ethnicity: []
                    })
 
const dispatch = useAppDispatch()

    

    const handleVeteran = (e: any) => {
        const name = e.target.name;
        const checked = e.target.checked;
        if(name === "veteranTrue" ){
            setVeteranTrue(!veteranTrue)
            setVeteranFalse(false)

        } else if(name === "veteranFalse" && checked){
            setVeteranFalse(!veteranFalse)
            setVeteranTrue(false)
        }
    }

    const handleImmigrant= (e: any) => {
        const name = e.target.name;
        const checked = e.target.checked;

        if(name === "immigrantTrue"){
            setImmigrantTrue(!immigrantTrue)
            setImmigrantFalse(false)
        } else if(name === "immigrantFalse"){
            setImmigrantFalse(!immigrantFalse)
            setImmigrantTrue(false)
        }
    }

const handleEthnicity = (e: any) => {
    const name = e.target.name;
    const checked = e.target.checked;

    if (checked && !ethnicity.includes(name)) {
        setEthnicity([...ethnicity, name]);
    } else if (!checked && ethnicity.includes(name)) {
        setEthnicity(ethnicity.filter((item) => item !== name));
    }
};
   
const fetchFormData = () => {
    //the following 8 lines will be refactored into a method in apiCalls.ts
    fetch("https://college-fund-mock-data-api.herokuapp.com/scholarships")
      .then(res => {
        if(res.ok){
            return res.json()
        } else {
           return new Error("Trouble fetching form-filtered scholarships")
        }
      })
    
    .then(data => {
        dispatch(setScholarships(data.data))
        let scholarships = (data.data)
        window.localStorage.setItem('scholarships', JSON.stringify(scholarships))
    })
}

    return (
        <>
        <Header />
            <form className="user-form">
                <section className="input-container">
                    <label htmlFor="state-selector">State
                        <select placeholder="select one ..." name="usStates" id="state-selector" value={location} onChange={(e) => setLocation(e.target.value)}>
                            <option>select one ...</option>
                            {usStates.map(({value, label}) => (
                                <option key={label} value={value}>{value}</option>
                            ))}
                        </select>
                    </label>
                    <label htmlFor="education-level">Education Level
                        <select placeholder="select one ..." name="education-level" id="education-level" value={educationLevel} onChange={e => setEducation(e.target.value)}>
                            <option value="blank">select one...</option>
                            <option value="high-school">High School</option>
                            <option value="undergraduate">Undergraduate</option>
                            <option value="Graduate">Graduate</option>
                            <option value="Trade-Technical">Trade/Technical</option>
                        </select>
                    </label>
                    <label >
                        LGBTQ+
                        <select name="gender-identity" id="gender-identity" value={gender} onChange={(e) => setGender(e.target.value)}>
                            <option value="blank">select one...</option>
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                    </label>
                </section>
                <section className="bottom-half">
                        <h2 className="form-titles">Ethnicity</h2>
                    <section className="ethnicity-form">
                        <label className="checkbox-label">
                            <input type="checkbox" name="White" id="checkbox-1" onChange={(e) => handleEthnicity(e)} /> White
                        </label>
                        <label>
                            <input type="checkbox" name="Black or African American" onChange={(e) => handleEthnicity(e)} /> Black or African American
                        </label>
                        <label>
                            <input type="checkbox" name="American Indian or Alaska Native" onChange={(e) => handleEthnicity(e)} /> American Indian or Alaska Native
                        </label>
                        <label>
                            <input type="checkbox" name="Hispanic or Latino" onChange={(e) => handleEthnicity(e)} /> Hispanic or Latino
                        </label>
                        <label>
                            <input type="checkbox" name="Asian" onChange={(e) => handleEthnicity(e)} /> Asian
                        </label>
                        <label>
                            <input type="checkbox" name="Native Hawaiian or Other Pacific Islander" onChange={(e) => handleEthnicity(e)} /> Native Hawaiian or Other Pacific Islander
                        </label>
                        <label>
                            <input type="checkbox" name="Other" onChange={(e) => handleEthnicity(e)} /> Other
                        </label>
                    </section>
                    <h2 className="form-titles">Military Status:</h2>
                    <section className="military-form">
                        <p>Are you a miltary Veteran?</p>
                        <label>
                            <input type="checkbox" checked={veteranTrue} name="veteranTrue" onChange={(e) => handleVeteran(e)}/> True
                        </label>
                        <br/>
                        <label>
                            <input type="checkbox" checked={veteranFalse} name="veteranFalse" onChange={(e) => handleVeteran(e)}/> False
                        </label>
                    </section>
                    <h2 className="form-titles">Immigrant Status:</h2>
                    <section className="button-residency-container">
                        <section className="residency-form">
                            <label>
                                <input type="checkbox" checked={immigrantTrue} name="immigrantTrue" onChange={(e) => handleImmigrant(e)}/> True
                            </label>
                            <br/>

                            <label>
                                <input type="checkbox" checked={immigrantFalse} name="immigrantFalse" onChange={(e) => handleImmigrant(e)}/> False
                            </label>
                        </section>
                        <Link to={'/scholarships'}><button className="form-submit" onClick={() => fetchFormData()}>Form submit for demographics</button>
                        </Link>
                    </section>
                </section>
            </form>

        </>

    )
}

export default Form