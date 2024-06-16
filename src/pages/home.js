import Notice from "../components/notice"
import { Link } from "react-router-dom"

const Home = () => {

  const randomRecipe = async () => {
    await fetch("/get/recipes")
    .then((res) => res.json())
    .then((data) => {
      if(data.length === 1) {return }
      return data.at((new Date()).getTime() % data.length)
    })
    .catch((err) => {console.log(err)})
  }

  const featuredRecipe = () => {
    const recipe = randomRecipe()
    return (
      <Notice
        title={`Featured Recipe: ${recipe.title}`}
        body={recipe.desc}
        extra={<Link to={`/recipes/${recipe._id}`} className="link">Check it out!</Link>}
      />
    )
  }

  return (
    <div className="home page">
      <h1>Welcome to Endless Dish!</h1>
      <p>We're building community with great food. Whether you're here for a quick and easy snack or inspiration for the next friend group gossip session, hopefully you'll find all you need!</p>
      <Notice
        title="Featured Recipe:"
        body="Lorem ipsum dolor, sit amet..."
      />
      <Notice
        title="Latest Notice: <None>"
        body="No notices to show. Woohoo!"
      />
    </div>
  )
}
export default Home;