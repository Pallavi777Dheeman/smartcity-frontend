import { useEffect, useState } from "react";
import API from "../api";

function Dashboard() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    API.get("/requests").then((res) => setRequests(res.data));
  }, []);

  return (
    <div className="container">
      <h2>All Requests</h2>
      {requests.map((r) => (
        <div className="card" key={r._id}>
          <b>{r.wasteType}</b><br />
          {r.location}<br />
          Status: {r.status}
        </div>
      ))}
    </div>
  );
}

export default Dashboard;


