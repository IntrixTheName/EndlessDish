import React, { useState } from 'react'
import Notice from "../components/notice"
import DownloadButton from "../components/download_button"
import "./submit.css"

const Submit = () => {
  const tags = {
    type: ["Breakfast", "Lunch", "Dinner", "Side", "Dessert", "Snack"],
    dietary_needs: ["Gluten-Free", "Vegetarian", "Vegan"],
    serving_size: ["Individual", "Small Group", "Large Group"],
    prep: ["Quick", "Average", "Involved"]
  }
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [customTags, setCustomTags] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [doc, setDoc] = useState(null);

  const handleCheckboxChange = (tag) => {
    if (selectedTags.includes(tag)) { setSelectedTags(selectedTags.filter((s) => s !== tag)) }
    else { setSelectedTags(selectedTags.concat([tag])) }
  }

  const handleFileChange = (e) => {
    setDoc(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('desc', desc);
    formData.append('tags', selectedTags.concat([customTags]));
    formData.append('doc', doc);

    fetch('/post/recipes/submit-recipe', { method: 'POST', body: formData })
      .then((response) => response.json())
      .then((data) => {
        alert("Successfully submitted recipe!")
        console.log('Success:', data)
        window.location.reload() //Reload the page to reset form to default values
      })
      .catch((error) => { alert("There was an error when submitting the recipe. The error has been logged and will be looked into."); console.error('Error:', error); });
  };

  const renderTags = () => {
    return (Object.keys(tags).map((cat) => (
      <div key={cat} className='checkboxGroup'>
        <h6>{cat.replace('_', ' ').toUpperCase()}</h6>
        {tags[cat].map((tag) => (
          <div key={tag}>
            <label>
              <input className='checkbox' type='checkbox' value={tag} checked={selectedTags.includes(tag)} onChange={() => handleCheckboxChange(tag)} />
              {tag}
            </label>
          </div>
        ))}
      </div>
    )
    )
    )
  }

  return (
    <div className="submit page">
      <h1>Submit a Recipe</h1>
      <div style={{ width: "60%" }}>
        <Notice
          title="Looking to Contribute? Read This"
          body="Endless Dish encourages everyone to share dishes that are important to them! Download the template below, then submit your recipe card with the form here. A project volunteer will finalize it and upload the recipe to the site for the community to enjoy!"
          extra={<DownloadButton src="/get/recipes/template" text="Download Template" />}
        />
      </div>
      <form onSubmit={handleSubmit} style={{ width: "80%" }}>
        <div className='form-container'>
          <input
            placeholder=' Title'
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className='form-split'>
            <div className='form-left'>
              <input placeholder="Recipe Card" type="file" accept=".docx,.doc" onChange={handleFileChange} />
              <h4>Common Tags</h4>
              <div className='commonTags'>
                {renderTags()}
                <textarea
                  className='checkboxGroup'
                  placeholder=' Custom Tags'
                  type='text'
                  value={customTags}
                  onChange={(e) => setCustomTags(e.target.value)}
                />
              </div>
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