import React, { useState, useEffect } from "react";
import './ScholarshipDetail.css';
import Header from "../Header/Header";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { addSaved, deleteSaved } from "../../slices/savedSlice";
import { apiCalls } from "../../apiCalls";
import { setAddSaveError, setDeleteSaveError } from "../../slices/errorSlice";

interface DetailProps {
  id: string;
}

const ScholarshipDetail: React.FC<DetailProps> = (props) => {

  const { saved } = useAppSelector(state => state.saved);

  const dispatch = useAppDispatch();

  const [isSaved, setIsSaved] = useState(saved?.some(save => save.id === props.id));
  const [allScholarships, setAllSchoolarship] = useState<Array<any>>([])
  
  const selectedScholarship = allScholarships?.find(scholarship => scholarship.id === props.id);

  useEffect(() => {
    apiCalls.getScholarships("https://grant-guru-be.herokuapp.com/api/v1/scholarships")
    .then((data) => setAllSchoolarship(data.data))
    .catch(()=> console.error("Error Fetchng All Scholarships"))
  }, [])

  useEffect(() => {
  }, [saved])

  const user = JSON.parse(localStorage.user)

  const handleAdd = () => {
    if (!isSaved) {
      setIsSaved(true);
      apiCalls.addSavedScholarship(user.id, props.id)
          .then(()=> {
            dispatch(addSaved(selectedScholarship))
          })
          .catch(error => dispatch(setAddSaveError(error.message)))
    } else {
       apiCalls.deleteSavedScholarship(user.id, props.id)
            .then(() => {
              dispatch(deleteSaved(selectedScholarship))
              setIsSaved(false);
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