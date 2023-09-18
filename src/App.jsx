import { HomePage } from "./pages/HomePage";
import "./styles/index.scss";

function App() {
  const getFoods = async () => {
    const response = await fetch(
      "https://hamburgueria-kenzie-json-serve.herokuapp.com/products"
    );

    const json = await response.json();
    console.log(json);
  };

  return (
    <>
      <HomePage />
    </>
  );
}

export default App;
