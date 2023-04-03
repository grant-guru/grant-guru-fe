import React, { useState } from "react";
import './Form.css';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import { useAppDispatch } from "../../app/hooks";
import { setScholarships } from "../../slices/scholarshipsSlice";
import usStates from "../../data/usStates";

const Form = () => {

    const [form, setForm] = useState<any>({
        location: "",
        educationLevel: "",
        gender: "",
        veteranStatus: null,
        immigrantStatus: null,
        ethnicity: []
    })

    const dispatch = useAppDispatch()

    const handleSelectChange = (e: any, selectType: any) => {
        const value = e.target.value;
        setForm({ ...form, [selectType]: value });
    };

    const ethnicities = [
        "White",
        "Black or African American",
        "American Indian or Alaska Native",
        "Hispanic or Latino",
        "Asian",
        "Native Hawaiian or Other Pacific Islander",
        "Other",
    ];

    const handleEthnicityCheckboxChange = (e: any) => {
        const name = e.target.name;
        const checked = e.target.checked;

        if (checked && !form.ethnicity.includes(name)) {
            setForm({
                ...form,
                ethnicity: [...form.ethnicity, name],
            });
        } else if (!checked && form.ethnicity.includes(name)) {
            setForm({
                ...form,
                ethnicity: form.ethnicity.filter((item: string) => item !== name),
            });
        }
    };

    const renderEthnicityCheckboxes = () => {
        return ethnicities.map((ethnicity) => (
            <label key={ethnicity}>
                <input
                    type="checkbox"
                    name={ethnicity}
                    checked={form.ethnicity.includes(ethnicity)}
                    onChange={handleEthnicityCheckboxChange}
                />
                {ethnicity}
            </label>
        ));
    };

    const resetForm = () => {
        setForm({
            location: "",
            educationLevel: "",
            gender: "",
            veteranStatus: null,
            immigrantStatus: null,
            ethnicity: []
        });
    };

    const createUrlWithQueryParams = () => {
        const baseUrl = "https://college-fund-mock-data-api.herokuapp.com/scholarships";
        const url = new URL(baseUrl);
        const queryParams = new URLSearchParams();
    
        if (form.location) queryParams.append("location", form.location);
        if (form.educationLevel) queryParams.append("educationLevel", form.educationLevel);
        if (form.gender) queryParams.append("gender", form.gender);
        if (form.veteranStatus !== null) queryParams.append("veteranStatus", form.veteranStatus);
        if (form.immigrantStatus !== null) queryParams.append("immigrantStatus", form.immigrantStatus);
        if (form.ethnicity.length > 0) queryParams.append("ethnicity", form.ethnicity.join(','));
    
        url.search = queryParams.toString();
    
        return url;
    };
    


    const fetchFormData = () => {
        //the following 8 lines will be refactored into a method in apiCalls.ts
        fetch("https://college-fund-mock-data-api.herokuapp.com/scholarships")
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    return new Error("Trouble fetching form-filtered scholarships")
                }
            })

            .then(data => {
                dispatch(setScholarships(data.data))
                let scholarships = (data.data)
                window.localStorage.setItem('scholarships', JSON.stringify(scholarships))
                console.log("here is the query params url",createUrlWithQueryParams().toString())
                resetForm()
            })
    }

    return (
        <>
            <Header />
            <form className="user-form">
                <section className="input-container">
                    <label htmlFor="state-selector">State
                        <select
                            name="usStates"
                            id="state-selector"
                            value={form.location}
                            onChange={(e) => handleSelectChange(e, "location")}
                        >
                            <option>select one ...</option>
                            {usStates.map(({ value, label }) => (
                                <option key={label} value={value}>{value}</option>
                            ))}
                        </select>
                    </label>
                    <label htmlFor="education-level">Education Level
                        <select
                            name="education-level"
                            id="education-level"
                            value={form.educationLevel}
                            onChange={(e) => handleSelectChange(e, "educationLevel")}
                        >
                            <option value="blank">select one...</option>
                            <option value="high-school">High School</option>
                            <option value="undergraduate">Undergraduate</option>
                            <option value="Graduate">Graduate</option>
                            <option value="Trade-Technical">Trade/Technical</option>
                        </select>
                    </label>
                    <label>
                        LGBTQ+
                        <select
                            name="gender-identity"
                            id="gender-identity"
                            value={form.gender}
                            onChange={(e) => handleSelectChange(e, "gender")}
                        >
                            <option value="blank">select one...</option>
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                    </label>
                </section>
                <section className="bottom-half">
                    <h2 className="form-titles">Ethnicity</h2>
                    <section className="ethnicity-form">
                        {renderEthnicityCheckboxes()}
                    </section>
                    <h2 className="form-titles">Military Status:</h2>
                    <section className="military-form">
                        <p>Are you a military Veteran?</p>
                        <label>
                            <input
                                type="radio"
                                name="veteranStatus"
                                value="true"
                                checked={form.veteranStatus === true}
                                onChange={() => setForm({ ...form, veteranStatus: true })}
                            /> True
                        </label>
                        <br />
                        <label>
                            <input
                                type="radio"
                                name="veteranStatus"
                                value="false"
                                checked={form.veteranStatus === false}
                                onChange={() => setForm({ ...form, veteranStatus: false })}
                            /> False
                        </label>
                    </section>
                    <h2 className="form-titles">Immigrant Status:</h2>
                    <section className="button-residency-container">
                        <section className="residency-form">
                            <label>
                                <input
                                    type="radio"
                                    name="immigrantStatus"
                                    value="true"
                                    checked={form.immigrantStatus === true}
                                    onChange={() => setForm({ ...form, immigrantStatus: true })}
                                /> True
                            </label>
                            <br />
                            <label>
                                <input
                                    type="radio"
                                    name="immigrantStatus"
                                    value="false"
                                    checked={form.immigrantStatus === false}
                                    onChange={() => setForm({ ...form, immigrantStatus: false })}
                                /> False
                            </label>
                        </section>
                        <Link to={'/scholarships'}><button className="form-submit" onClick={() => fetchFormData()}>Form submit</button>
                        </Link>
                    </section>
                </section>
            </form>
        </>
    );
}

export default Form