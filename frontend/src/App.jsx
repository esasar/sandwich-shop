import SandwichList from "./components/SandwichList"

const sandwiches = [
  {
    name: "Ham and Cheese",
    ingredients: ["ham", "cheese"]
  },
  {
    name: "Club Sandwich",
    ingredients: ["ham", "turkey", "bacon", "lettuce", "tomato"]
  },
  {
    name: "Egg Salad",
    ingredients: ["egg", "mayo", "mustard"]
  }
]

const App = () => (
  <div>
    <h1>&#129386; Ugly font sandwich shop &#129386;</h1>
    <SandwichList sandwiches={sandwiches} />
  </div>
)

export default App