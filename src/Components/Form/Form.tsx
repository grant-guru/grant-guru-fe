import React, { useState, useEffect } from "react";
import './Form.css';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setScholarships } from "../../slices/scholarshipsSlice";
import { setSaved } from "../../slices/savedSlice";
import { usStates } from "../../data/data";
import { apiCalls } from "../../apiCalls";
import Error from "../Error/Error";
import { setScholarshipsError } from "../../slices/errorSlice";
import { setSavedError } from "../../slices/errorSlice";

const Form = () => {
    const { user } = useAppSelector(state => state.user)
    const { userError } = useAppSelector(state => state.error.error)

    const currentUser = JSON.parse(localStorage.user)

    const dispatch = useAppDispatch()

    const [isFetching, setFetch] = useState(false)

    useEffect(() => {
        if(!isFetching) {
            apiCalls.getSaved(currentUser.id)
                .then(data => dispatch(setSaved(data.data)))
                .catch(error => dispatch(setSavedError(error.message)))
            setFetch(true)
        }
    }, [currentUser, isFetching])

    const [form, setForm] = useState<any>({
        location: "",
        educationLevel: "",
        gender: "",
        veteranStatus: null,
        immigrantStatus: null,
        ethnicity: []
    })

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
        const baseUrl = "https://grant-guru-be.herokuapp.com/api/v1/scholarships";
        const url = new URL(baseUrl);
        const queryParams = new URLSearchParams();

        const changeFirstLetterToUpperCase = (boolean: boolean) => {
            const string = boolean.toString();
            return string.charAt(0).toUpperCase() + string.slice(1);
        };

        if (form.location) queryParams.append("state", form.location);
        if (form.educationLevel) queryParams.append("education", form.educationLevel);
        if (form.gender) queryParams.append("lgbt", changeFirstLetterToUpperCase(form.gender));
        if (form.veteranStatus !== null) queryParams.append("veteran", changeFirstLetterToUpperCase(form.veteranStatus));
        if (form.immigrantStatus !== null) queryParams.append("immigrant", changeFirstLetterToUpperCase(form.immigrantStatus));
        if (form.ethnicity.length > 0) queryParams.append("ethnicity", form.ethnicity.join(','));

        url.search = queryParams.toString();

        return url;
    };

    const fetchFormData = () => {
        let scholarshipsUrl = createUrlWithQueryParams().toString()

        apiCalls.getScholarships(scholarshipsUrl)
            .then(data => {
                dispatch(setScholarships(data.data))
                resetForm()
            })
            .catch(error => dispatch(setScholarshipsError(error.message)))

        apiCalls.getSaved(user.id)
            .then(data => {
                dispatch(setSaved(data.data))
            })
            .catch(error => dispatch(setSavedError(error.message)))
    }

    if (userError) {
        return (
            <Error errorMessage={userError}/>
        )
    } else {
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
                            <p>Are you a military veteran?</p>
                            <label>
                                <input
                                    type="radio"
                                    name="veteranStatus"
                                    value="true"
                                    checked={form.veteranStatus === true}
                                    onChange={() => setForm({ ...form, veteranStatus: true })}
                                /> Yes
                            </label>
                            <br />
                            <label>
                                <input
                                    type="radio"
                                    name="veteranStatus"
                                    value="false"
                                    checked={form.veteranStatus === false}
                                    onChange={() => setForm({ ...form, veteranStatus: false })}
                                /> No
                            </label>
                        </section>
                        <h2 className="form-titles">Immigrant Status:</h2>
                        <p>Are you an immigrant to the US?</p>
                        <section className="button-residency-container">
                            <section className="residency-form">
                                <label>
                                    <input
                                        type="radio"
                                        name="immigrantStatus"
                                        value="true"
                                        checked={form.immigrantStatus === true}
                                        onChange={() => setForm({ ...form, immigrantStatus: true })}
                                    /> Yes
                                </label>
                                <br />
                                <label>
                                    <input
                                        type="radio"
                                        name="immigrantStatus"
                                        value="false"
                                        checked={form.immigrantStatus === false}
                                        onChange={() => setForm({ ...form, immigrantStatus: false })}
                                    /> No
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
}

export default Form