import React, { useState } from "react";
import './ScholarshipDetail.css';
import Header from "../Header/Header";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { addSaved, deleteSaved } from "../../slices/savedSlice";
import { apiCalls } from "../../apiCalls";

interface DetailProps {
  id: string;
//   image_url: string;
}

const ScholarshipDetail: React.FC<DetailProps> = (props) => {

  const { filtered } = useAppSelector(state => state.scholarships);
  const selectedScholarship = filtered.find(scholarship => scholarship.id === props.id);

  const { saved } = useAppSelector(state => state.saved);
  const dispatch = useAppDispatch();
  const [isSaved, setSaved] = useState(saved.some(save => save.id === props.id));

  const handleAdd = () => {
    if (!isSaved) {
      dispatch(addSaved(props));
      setSaved(true);
    } else {
      dispatch(deleteSaved(props));
      setSaved(false);
    }
    // apiCalls.addSavedScholarship(user.id, props.id)
    //     .then(json => console.log(json))
    //     .catch(err => console.log(err))
  }

  return (
    <>
      <Header />
      <div className='scholarshipDetail'>
        <h1> {selectedScholarship?.attributes.title} </h1>
        <body style={{
          backgroundImage: `url(${selectedScholarship?.attributes.image_url})`,
        }}>
          <div className="background-gradient">
            <h2> ${selectedScholarship?.attributes.amount} </h2>
            <p> {selectedScholarship?.attributes.description} </p>
            <h4> <label>Deadline for submission:</label><br/>{selectedScholarship?.attributes.deadline} </h4>
            <button className="scholarship-button" onClick={() => handleAdd()} style={{ backgroundColor: isSaved ? "red" : "green"}}>{isSaved ? "Remove from Saved" : "Save this Scholarship"}</button>
          </div>
        </body>
      </div>
    </>
  );
}

export default ScholarshipDetail;