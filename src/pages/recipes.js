import React, { useState, useEffect } from "react"
import Notice from "../components/notice"
import { Link } from "react-router-dom"
import DownloadButton from "../components/download_button"

const Recipes = () => {

  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    async function getRecipes() {
      try {
        const res = await fetch("/get/recipes")
        if(!res.ok) {throw new Error(`HTTP Error, ${res.status}`)}
        const data = await res.json()
        setRecipes(data)
      } catch (err) {
        console.error("Failed to fetch recipes:", err)
      }
    }
    getRecipes()
  }, [])

  const listItems = recipes.map((x) => (
    <Notice
      title={x.title}
      body={x.desc}
      extra={<DownloadButton src={`/get/recipes/download/${x._id}`} text="Download Recipe Card" filename={`${x.title}.docx`} />}
    />
  ))

  return(
    <div className="recipes page">
      <h1>Recipes</h1>
      {listItems}
    </div>
  )
}
export default Recipes;