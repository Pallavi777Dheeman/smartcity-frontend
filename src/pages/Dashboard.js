import { useEffect, useState } from "react";
import API from "../api";

function Dashboard() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    API.get("/requests").then(res => setRequests(res.data));
  }, []);

  return (
    <div>
      <h2>All Requests</h2>
      {requests.map(r => (
        <div key={r._id}>
          {r.wasteType} - {r.location} - {r.status}
        </div>
      ))}
    </div>
  );
}

export default Dashboard;

