import React, {useEffect, useState} from "react";
import './Form.css';
import {Link} from 'react-router-dom';
import Header from '../Header/Header';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setScholarships } from "../../slices/scholarshipsSlice";

const Form = () => {
    // const [ fetching, setFetch ] = useState(false)
    const [ location, setLocation ] = useState("")
    const [ educationLevel, setEducation ] = useState("")
    const [ gender, setGender ] = useState("")
    const [ veteranTrue, setVeteranTrue ] = useState(false)
    const [ veteranFalse, setVeteranFalse ] = useState(false)
    const [ immigrantTrue, setImmigrantTrue ] = useState(false)
    const [ immigrantFalse, setImmigrantFalse ] = useState(false)
    // const [ form,  setForm ] = useState({
    //     location: "",
    //     educationLevel: "",
    //     gender: ""
    // })
 
const dispatch = useAppDispatch()

    const usStates = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
];
    const handleVeteranTrue = () => {
        setVeteranTrue(!veteranTrue)
        setVeteranFalse(false)
    }

    const handleVeteranFalse = () => {
        setVeteranFalse(!veteranFalse)
        setVeteranTrue(false)
    }

    const handleImmigrantTrue = () => {
        setImmigrantTrue(!immigrantTrue)
        setImmigrantFalse(false)
    }

    const handleImmigrantFalse = () => {
        setImmigrantFalse(!immigrantFalse)
        setImmigrantTrue(false)
    }

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
        console.log(data)
        })
    }

    return (
        <>
        <Header />
            <form className="user-form">
                <section className="input-container">
                    <label htmlFor="state">State
                        <input placeholder=" State" className="text-inputs" type="text" name="state" value={location} onChange={(e) => setLocation(e.target.value)} />
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
                        LGBT
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
                            <input type="checkbox" name="checkbox-1" id="checkbox-1" /> White
                        </label>
                        <label>
                            <input type="checkbox" /> Black or African American
                        </label>
                        <label>
                            <input type="checkbox" /> American Indian or Alaska Native
                        </label>
                        <label>
                            <input type="checkbox" /> Asian
                        </label>
                        <label>
                            <input type="checkbox" /> Native Hawaiin or Other Pacific Islander
                        </label>
                    </section>
                    <h2 className="form-titles">Military Status:</h2>
                    <section className="military-form">
                        <p>Are you a miltary Veteran?</p>
                        <label>
                            <input type="checkbox" checked={veteranTrue} onChange={handleVeteranTrue}/> True
                        </label>
                        <br />
                        <label>
                            <input type="checkbox" checked={veteranFalse} onChange={handleVeteranFalse}/> False
                        </label>
                    </section>
                    <h2 className="form-titles">Immigrant Status:</h2>
                    <section className="button-residency-container">
                        <section className="residency-form">
                            <label>
                                <input type="checkbox" checked={immigrantTrue} onChange={handleImmigrantTrue}/> True
                            </label>
                            <label>
                                <input type="checkbox" checked={immigrantFalse} onChange={handleImmigrantFalse}/> False
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