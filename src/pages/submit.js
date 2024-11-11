import React, { useState } from 'react'
import Notice from "../components/notice"
import DownloadButton from "../components/download_button"
import "./submit.css"

const Submit = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [doc, setDoc] = useState(null);

  const handleFileChange = (e) => {
    setDoc(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('desc', desc);
    formData.append('doc', doc);

    fetch('/post/recipes/submit-recipe', { method: 'POST', body: formData })
      .then((response) => response.json())
      .then((data) => {
        alert("Successfully submitted recipe! Submission ID: " + data.ticket)
        console.log('Success:', data)
        window.location.reload() //Reload the page to reset form to default values
      })
      .catch((error) => { alert("There was an error when submitting the recipe. The error has been logged and will be looked into."); console.error('Error:', error); });
  };



  return (
    <div className="submit page">
      <h1>Submit a Recipe</h1>
      <div style={{ width: "100%" }}>
        <Notice
          title="Looking to Contribute? Read This"
          body="Endless Dish encourages everyone to share dishes that are important to them! Download the template below, then submit your recipe card with the form here. A project volunteer will finalize it and upload the recipe to the site for the community to enjoy!"
          extra={<DownloadButton src="/get/recipes/template" text="Download Template" filename="Endless Dish Template.dotx"/>}
        />
      </div>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <div className='form-container'>
          <input
            placeholder=' Title'
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className='form-split'>
            <div className='form-left'>
              <input placeholder="Recipe Card" type="file" accept=".docx,.doc" onChange={handleFileChange} />
            </div>
            <div className='form-right'>
              <textarea
                placeholder='A short text blurb to introduce the dish, additional notes for the reviewer, or any other messages to pass on with the submission'
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
export default Submit;