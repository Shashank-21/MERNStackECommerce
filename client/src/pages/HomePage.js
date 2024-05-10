import Jumbotron from "../components/cards/Jumbotron";
import { useAuth } from "../contexts/auth";

function HomePage() {
  const [auth] = useAuth();
  return (
    <div className='container'>
      <Jumbotron title='Hello World' subTitle='Welcome to React E-commerce' />
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </div>
  );
}

export default HomePage;
