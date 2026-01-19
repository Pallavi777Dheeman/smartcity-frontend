import { useState } from "react";
import API from "../api";

function CreateRequest() {
  const [wasteType, setWasteType] = useState("");
  const [location, setLocation] = useState("");

  const submit = async () => {
    await API.post("/request", { wasteType, location });
    alert("Request created");
  };

  return (
    <div className="container">
      <h2>Create Request</h2>
      <input
        placeholder="Waste Type"
        onChange={(e) => setWasteType(e.target.value)}
      />
      <input
        placeholder="Location"
        onChange={(e) => setLocation(e.target.value)}
      />
      <button onClick={submit}>Submit</button>
    </div>
  );
}

export default CreateRequest;
