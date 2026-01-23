import { useEffect, useState } from "react";
import API from "../api";

function Dashboard() {
  const [requests, setRequests] = useState([]);
  const [wasteType, setWasteType] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await API.get("/requests", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setRequests(res.data);
      } catch (err) {
        alert("Failed to load requests");
      }
    };

    fetchRequests();
  }, []);

  const createRequest = async () => {
    try {
      await API.post(
        "/request",
        { wasteType, location },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Request created successfully");
      window.location.reload();
    } catch (err) {
      alert("Failed to create request");
    }
  };

  return (
    <div className="container">
      <h2>All Requests</h2>

      {/* Create Request */}
      <input
        placeholder="Waste Type"
        onChange={(e) => setWasteType(e.target.value)}
      />
      <input
        placeholder="Location"
        onChange={(e) => setLocation(e.target.value)}
      />
      <button onClick={createRequest}>Create Request</button>

      <hr />

      {/* List Requests */}
      {requests.length === 0 ? (
        <p>No requests found</p>
      ) : (
        requests.map((req) => (
          <div
            key={req._id}
            style={{
              padding: "10px",
              border: "1px solid #ddd",
              marginBottom: "10px",
            }}
          >
            <p><b>Waste:</b> {req.wasteType}</p>
            <p><b>Location:</b> {req.location}</p>
            <p><b>Status:</b> {req.status || "Pending"}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;
