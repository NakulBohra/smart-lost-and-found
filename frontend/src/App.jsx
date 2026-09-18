import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");
  const [items, setItems] = useState([]);

  const [lostItem, setLostItem] = useState({
    name: "",
    category: "",
    location: "",
    date: "",
    description: "",
    contact: "",
  });

  const [foundItem, setFoundItem] = useState({
    name: "",
    category: "",
    location: "",
    date: "",
    description: "",
    contact: "",
  });

  // Get all items from MongoDB
  const fetchItems = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/items");

      const data = await response.json();

      if (response.ok) {
        setItems(data);
      } else {
        console.error("Failed to fetch items");
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  // Fetch items when website loads
  useEffect(() => {
    fetchItems();
  }, []);

  // Submit Lost Item
  const handleLostSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...lostItem,
          type: "lost",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Lost item reported successfully!");

        setLostItem({
          name: "",
          category: "",
          location: "",
          date: "",
          description: "",
          contact: "",
        });

        await fetchItems();

        setPage("home");
      } else {
        alert(data.message || "Failed to report lost item");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Cannot connect to backend");
    }
  };

  // Submit Found Item
  const handleFoundSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...foundItem,
          type: "found",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Found item reported successfully!");

        setFoundItem({
          name: "",
          category: "",
          location: "",
          date: "",
          description: "",
          contact: "",
        });

        await fetchItems();

        setPage("home");
      } else {
        alert(data.message || "Failed to report found item");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Cannot connect to backend");
    }
  };

  // Separate lost and found items
  const lostItems = items.filter((item) => item.type === "lost");
  const foundItems = items.filter((item) => item.type === "found");

  return (
    <div>
      {/* Navigation */}
      <nav>
        <h2>🔎 Smart Lost & Found</h2>

        <div>
          <button onClick={() => setPage("home")}>
            Home
          </button>

          <button
            onClick={() => {
              fetchItems();
              setPage("lost-items");
            }}
          >
            Lost Items
          </button>

          <button
            onClick={() => {
              fetchItems();
              setPage("found-items");
            }}
          >
            Found Items
          </button>

          <button>
            Login
          </button>
        </div>
      </nav>

      <main>

        {/* HOME PAGE */}
        {page === "home" && (
          <>
            <section className="hero">
              <h1>Smart Lost & Found Portal</h1>

              <p>
                Lost something on campus? Found something that belongs
                to someone? Report it here and help reunite people with
                their belongings.
              </p>

              <div>
                <button
                  className="primary"
                  onClick={() => setPage("lost")}
                >
                  Report Lost Item
                </button>

                <button
                  className="secondary"
                  onClick={() => setPage("found")}
                >
                  Report Found Item
                </button>
              </div>
            </section>

            <section className="features">
              <div>
                <h2>🔍 Find Items</h2>
                <p>
                  Search and filter reported lost and found items.
                </p>
              </div>

              <div>
                <h2>📱 Report Easily</h2>
                <p>
                  Quickly report a lost or found item.
                </p>
              </div>

              <div>
                <h2>🤝 Reunite</h2>
                <p>
                  Help return lost belongings to their owners.
                </p>
              </div>
            </section>
          </>
        )}

        {/* LOST ITEM FORM */}
        {page === "lost" && (
          <section className="form-section">
            <h1>Report Lost Item</h1>

            <form onSubmit={handleLostSubmit}>

              <input
                type="text"
                placeholder="Item name"
                value={lostItem.name}
                onChange={(e) =>
                  setLostItem({
                    ...lostItem,
                    name: e.target.value,
                  })
                }
                required
              />

              <input
                type="text"
                placeholder="Category"
                value={lostItem.category}
                onChange={(e) =>
                  setLostItem({
                    ...lostItem,
                    category: e.target.value,
                  })
                }
                required
              />

              <input
                type="text"
                placeholder="Location lost"
                value={lostItem.location}
                onChange={(e) =>
                  setLostItem({
                    ...lostItem,
                    location: e.target.value,
                  })
                }
                required
              />

              <input
                type="date"
                value={lostItem.date}
                onChange={(e) =>
                  setLostItem({
                    ...lostItem,
                    date: e.target.value,
                  })
                }
                required
              />

              <textarea
                placeholder="Describe the item"
                value={lostItem.description}
                onChange={(e) =>
                  setLostItem({
                    ...lostItem,
                    description: e.target.value,
                  })
                }
                required
              ></textarea>

              <input
                type="text"
                placeholder="Your contact information"
                value={lostItem.contact}
                onChange={(e) =>
                  setLostItem({
                    ...lostItem,
                    contact: e.target.value,
                  })
                }
                required
              />

              <button
                className="primary"
                type="submit"
              >
                Submit Lost Item
              </button>

              <button
                className="secondary"
                type="button"
                onClick={() => setPage("home")}
              >
                Back
              </button>

            </form>
          </section>
        )}

        {/* FOUND ITEM FORM */}
        {page === "found" && (
          <section className="form-section">
            <h1>Report Found Item</h1>

            <form onSubmit={handleFoundSubmit}>

              <input
                type="text"
                placeholder="Item name"
                value={foundItem.name}
                onChange={(e) =>
                  setFoundItem({
                    ...foundItem,
                    name: e.target.value,
                  })
                }
                required
              />

              <input
                type="text"
                placeholder="Category"
                value={foundItem.category}
                onChange={(e) =>
                  setFoundItem({
                    ...foundItem,
                    category: e.target.value,
                  })
                }
                required
              />

              <input
                type="text"
                placeholder="Location found"
                value={foundItem.location}
                onChange={(e) =>
                  setFoundItem({
                    ...foundItem,
                    location: e.target.value,
                  })
                }
                required
              />

              <input
                type="date"
                value={foundItem.date}
                onChange={(e) =>
                  setFoundItem({
                    ...foundItem,
                    date: e.target.value,
                  })
                }
                required
              />

              <textarea
                placeholder="Describe the item"
                value={foundItem.description}
                onChange={(e) =>
                  setFoundItem({
                    ...foundItem,
                    description: e.target.value,
                  })
                }
                required
              ></textarea>

              <input
                type="text"
                placeholder="Your contact information"
                value={foundItem.contact}
                onChange={(e) =>
                  setFoundItem({
                    ...foundItem,
                    contact: e.target.value,
                  })
                }
                required
              />

              <button
                className="primary"
                type="submit"
              >
                Submit Found Item
              </button>

              <button
                className="secondary"
                type="button"
                onClick={() => setPage("home")}
              >
                Back
              </button>

            </form>
          </section>
        )}

        {/* LOST ITEMS PAGE */}
        {page === "lost-items" && (
          <section className="form-section">
            <h1>Lost Items</h1>

            {lostItems.length === 0 ? (
              <p>No lost items reported yet.</p>
            ) : (
              lostItems.map((item) => (
                <div key={item._id}>

                  <h2>{item.name}</h2>

                  <p>
                    <strong>Category:</strong>{" "}
                    {item.category}
                  </p>

                  <p>
                    <strong>Location:</strong>{" "}
                    {item.location}
                  </p>

                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(item.date).toLocaleDateString()}
                  </p>

                  <p>
                    <strong>Description:</strong>{" "}
                    {item.description}
                  </p>

                  <p>
                    <strong>Contact:</strong>{" "}
                    {item.contact}
                  </p>

                  <hr />

                </div>
              ))
            )}

            <button
              className="secondary"
              onClick={() => setPage("home")}
            >
              Back
            </button>
          </section>
        )}

        {/* FOUND ITEMS PAGE */}
        {page === "found-items" && (
          <section className="form-section">
            <h1>Found Items</h1>

            {foundItems.length === 0 ? (
              <p>No found items reported yet.</p>
            ) : (
              foundItems.map((item) => (
                <div key={item._id}>

                  <h2>{item.name}</h2>

                  <p>
                    <strong>Category:</strong>{" "}
                    {item.category}
                  </p>

                  <p>
                    <strong>Location:</strong>{" "}
                    {item.location}
                  </p>

                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(item.date).toLocaleDateString()}
                  </p>

                  <p>
                    <strong>Description:</strong>{" "}
                    {item.description}
                  </p>

                  <p>
                    <strong>Contact:</strong>{" "}
                    {item.contact}
                  </p>

                  <hr />

                </div>
              ))
            )}

            <button
              className="secondary"
              onClick={() => setPage("home")}
            >
              Back
            </button>
          </section>
        )}

      </main>
    </div>
  );
}

export default App;