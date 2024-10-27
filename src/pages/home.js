//import { debug_get_user } from "../api/db"
import { useState, useEffect } from "react"
import Notice from "../components/notice"
//import { Link } from "react-router-dom"

const Home = () => {

  const [Cove, setCove] = useState(null)
  
  useEffect(() => {
    const fetchUser = async () => {
      try{
        console.log("Fetching Cove user...")
        const response = await fetch("/debug/user")
        console.log("Response ok?: ", response.ok)
        if(!response.ok) throw new Error("Failed to fetch Cove data")
        const cove = await response.json()
        console.log("Cove: ", cove)
        setCove(cove)
      } catch (err) {
        console.error("Error in fetching user:", err)
        setCove({err: "Could not load Cove", username: "---", email: "---"})
      }
    }
    fetchUser();
  }, []);



  return (
    <div className="home page">
      <h1>Welcome to Endless Dish!</h1>
      <p>We're building community with great food. Whether you're here for a quick and easy snack or inspiration for the next friend group gossip session, hopefully you'll find all you need!</p>
      <Notice
        title="Latest Notice: <None>"
        body="No notices to show. Woohoo!"
      />
      <Notice
        title={`User: ${Cove ? Cove.username : "..."}`}
        body={`Email: ${Cove ? Cove.email : "..."}`}
      />
    </div>
  )
}
export default Home;