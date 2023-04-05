import React, { useState, useEffect } from "react";
import './ScholarshipDetail.css';
import Header from "../Header/Header";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { addSaved, deleteSaved } from "../../slices/savedSlice";
import { apiCalls } from "../../apiCalls";
import { setAddSaveError, setDeleteSaveError } from "../../slices/errorSlice";

interface DetailProps {
  id: string;
//   image_url: string;
}

const ScholarshipDetail: React.FC<DetailProps> = (props) => {

  const { filtered } = useAppSelector(state => state.scholarships);
  const selectedScholarship = filtered.find(scholarship => scholarship.id === props.id);

  const { saved } = useAppSelector(state => state.saved);
  const dispatch = useAppDispatch();
  const [isSaved, setSaved] = useState(saved?.some(save => save.id === props.id));

  useEffect(() => {
  }, [saved])

  const user = JSON.parse(localStorage.user)

  const handleAdd = () => {
    if (!isSaved) {
      setSaved(true);
      apiCalls.addSavedScholarship(user.id, props.id)
          .then((data)=> {
            console.log("POST CONSOLE LOG:", data)
            dispatch(addSaved(selectedScholarship))
          })
          .catch(error => dispatch(setAddSaveError(error.message)))
    } else {
       apiCalls.deleteSavedScholarship(user.id, props.id)
            .then((data) => {
              console.log("DELETE CONSOLE LOG:", data)
              dispatch(deleteSaved(selectedScholarship))
              setSaved(false);
            })
            .catch(error => dispatch(setDeleteSaveError(error.message)))
    }
  }

  return (
    <>
      <Header />
      <div className='scholarshipDetail'>
        <h1> {selectedScholarship?.attributes.title} </h1>
        <section style={{
          backgroundImage: `url(${selectedScholarship?.attributes.image_url})`,
        }}>
          <div className="background-gradient">
            <h2> ${selectedScholarship?.attributes.amount} </h2>
            <p> {selectedScholarship?.attributes.description} </p>
            <h4> <label>Deadline for submission:</label><br/>{selectedScholarship?.attributes.deadline} </h4>
            <button className="scholarship-button" onClick={() => handleAdd()} style={{ backgroundColor: isSaved ? "red" : "#006c67ac"}}>{isSaved ? "Remove from Saved" : "Save this Scholarship"}</button>
          </div>
        </section>
      </div>
    </>
  );
}

export default ScholarshipDetail;