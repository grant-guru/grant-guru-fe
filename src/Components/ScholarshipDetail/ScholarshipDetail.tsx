import React, { useState, useEffect } from "react";
import './ScholarshipDetail.css';
import Header from "../Header/Header";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { addSaved, deleteSaved } from "../../slices/savedSlice";
import { apiCalls } from "../../apiCalls";
import { setSaved } from "../../slices/savedSlice";

interface DetailProps {
  id: string;
}

const ScholarshipDetail: React.FC<DetailProps> = (props) => {

  const { filtered } = useAppSelector(state => state.scholarships);

  const initialSelectedScholarship = filtered.find(scholarship => scholarship.id === props.id);
  const [selectedScholarship, setSelectedScholarship] = useState(initialSelectedScholarship);
  const { saved } = useAppSelector(state => state.saved);
  const dispatch = useAppDispatch();
  const [isSaved, setIsSaved] = useState(false);

  if (selectedScholarship?.id !== undefined) {
    window.localStorage.setItem('selectedLocalScholarship', JSON.stringify(selectedScholarship));
  }

  useEffect(() => {
    if (localStorage.getItem('selectedLocalScholarship') !== null && !selectedScholarship) {
      const storedScholarship = JSON.parse(localStorage.getItem('selectedLocalScholarship') as string);
      setSelectedScholarship(storedScholarship);
    }
  }, [])

  useEffect(() => {
    if (localStorage.getItem('saved') !== null && saved.length === 0) {
      const storedSaved = JSON.parse(localStorage.getItem('saved') as string);
      dispatch(setSaved(storedSaved));
    }
  }, [])

  useEffect(() => {
    const isScholarshipSaved = saved?.some(save => save.id === props.id);
    setIsSaved(isScholarshipSaved);
  }, [saved, selectedScholarship]);

  const user = JSON.parse(localStorage.user);

  const handleAdd = () => {
    if (!isSaved) {
      setIsSaved(true);
      apiCalls.addSavedScholarship(user.id, props.id)
        .then((data) => {
          console.log("POST CONSOLE LOG:", data)
          dispatch(addSaved(selectedScholarship));
        })
        .catch(err => console.log(err));
    } else {
      apiCalls.deleteSavedScholarship(user.id, props.id)
        .then((data) => {
          console.log("DELETE CONSOLE LOG:", data);
          dispatch(deleteSaved(selectedScholarship));
          setIsSaved(false);
        })
        .catch(err => console.log(err));
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