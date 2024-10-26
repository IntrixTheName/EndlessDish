import { debug_get_user } from "../api/db"
import Notice from "../components/notice"
import { Link } from "react-router-dom"

const Home = () => {

  const user = async () => {
    const Cove = await debug_get_user()
    return (
      <Notice
        title={`User: ${Cove._username}`}
        body={`Email: ${Cove.email}`}
      />
    )
  }

  return (
    <div className="home page">
      <h1>Welcome to Endless Dish!</h1>
      <p>We're building community with great food. Whether you're here for a quick and easy snack or inspiration for the next friend group gossip session, hopefully you'll find all you need!</p>
      <Notice
        title="Latest Notice: <None>"
        body="No notices to show. Woohoo!"
      />
      {user()}
    </div>
  )
}
export default Home;