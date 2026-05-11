import { useEffect, useState } from "react";
import ToyForm from "./ToyForm";
import ToyCard from "./ToyCard";

function App() {
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/toys")
      .then((res) => res.json())
      .then((data) => setToys(data));
  }, []);

  function handleLike(updatedToy) {
    setToys((prev) =>
      prev.map((toy) => (toy.id === updatedToy.id ? updatedToy : toy))
    );
  }

  function handleDelete(id) {
    setToys((prev) => prev.filter((toy) => toy.id !== id));
  }

  function addToy(newToy) {
    setToys((prev) => [...prev, newToy]);
  }

  return (
    <div className="app">
      <h1>Toy Tales</h1>

      <ToyForm addToy={addToy} />

      <div className="toy-container">
        {toys.map((toy) => (
          <ToyCard
            key={toy.id}
            toy={toy}
            onLike={handleLike}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default App;