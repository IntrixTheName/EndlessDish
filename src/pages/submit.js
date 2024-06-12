import React, { useState } from 'react';

const Submit = () => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [tags, setTags] = useState([]);
  const [doc, setDoc] = useState(null);

  const handleTagChange = (e) => {
    setTags(e.target.value.split(','));
  };

  const handleFileChange = (e) => {
    setDoc(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('desc', desc);
    formData.append('tags', JSON.stringify(tags));
    formData.append('doc', doc);

    // Replace this with your actual API call
    fetch('localhost:5000/post/recipes/new-recipe', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  return (
    <div className="submit page">
      <h1>Submit a Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label>Tags (comma separated):</label>
          <input
            type="text"
            value={tags.join(',')}
            onChange={handleTagChange}
          />
        </div>
        <div>
          <label>Document:</label>
          <input type="file" onChange={handleFileChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
export default Submit;