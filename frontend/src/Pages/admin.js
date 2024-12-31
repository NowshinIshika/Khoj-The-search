import React from "react";
import ClaimRequests from "../components/ClaimRequests";

const Admin = ({ adminToken }) => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ClaimRequests adminToken={adminToken} />
    </div>
  );
};

export default Admin;
