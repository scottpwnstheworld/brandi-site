import React from "react";
import { BulkUploader, Reset, SingleUploader } from "../components";

export const Admin = () => {
  return (
    <div>
      <h2>Admin</h2>

      <div>
        <h3>Add single entry</h3>
        <SingleUploader />
      </div>

      <div>
        <h3>Bulk upload</h3>
        <BulkUploader />
      </div>

      <div>
        <Reset />
      </div>
    </div>
  );
};
