import React from "react";
import './Form.css';
import {Link} from 'react-router-dom';
import Header from '../Header/Header';

const Form = () => {

    
    return (
        <>
        <Header />
            <form className="user-form">
                <section className="input-container">
                    <label >College/University
                        <input className="text-inputs" type="text" name="" />
                    </label>
                    <label >State
                        <input className="text-inputs" type="text" name="" />
                    </label>
                    <label >Keywords
                        <input className="text-inputs" type="text" name="" />
                    </label>
                    <label >Education Level
                        <select name="education-level" id="education-level">
                            <option value="blank">select one...</option>
                            <option value="high-school">High School</option>
                            <option value="undergraduate">Undergraduate</option>
                            <option value="Graduate">Graduate</option>
                            <option value="Trade-Technical">Trade/Technical</option>
                        </select>
                    </label>
                    <label >
                        Gender Identity
                        <select name="gender-identity" id="gender-identity">
                            <option value="blank">select one...</option>
                            <option value="male">Male/Man</option>
                            <option value="female">Female/Woman</option>
                            <option value="trans-male">TransMale/TransMan</option>
                            <option value="trans-female">TransFemale/TransWoman</option>
                            <option value="gender-neutral">Gender Neutral</option>
                            <option value="decline">Decline to Answer</option>
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
                            <input type="checkbox" /> True
                        </label>
                        <label>
                            <input type="checkbox" /> False
                        </label>
                    </section>
                    <h2 className="form-titles">Residency Status:</h2>
                    <section className="button-residency-container">
                        <section className="residency-form">
                            <label>
                                <input type="checkbox" /> US Citizen
                            </label>
                            <label>
                                <input type="checkbox" /> Immigrant
                            </label>
                            <label>
                                <input type="checkbox" /> Legal US Resident
                            </label>
                        </section>
                        <Link to={'/scholarships'}><button className="form-submit">Form submit for demographics</button>
                        </Link>
                    </section>
                </section>
            </form>

        </>

    )
}

export default Form