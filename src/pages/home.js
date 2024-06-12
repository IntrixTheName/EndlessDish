const Home = () => {
  return (
    <div className="home page">
      <h1>Welcome to Endless Dish!</h1>
      <p>We're building community with great food. Whether you're here for a quick and easy snack or inspiration for the next friend group gossip session, hopefully you'll find all you need!</p>
      <ul>
        <li key="recipeOTD" className="home-item">
          <h2>Featured Recipe: Lorem Ipsum</h2>
          <p>Lorem ipsum dolor, sit amet...</p>
        </li>
        <li key="notice" class="home-item">
          <h2>Latest Notice</h2>
          <p>No notices to show. Woohoo!</p>
        </li>
      </ul>
    </div>
  )
}
export default Home;