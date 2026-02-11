import React, { useState } from "react";
import { jobs } from "./jobsData";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterType, setFilterType] = useState("");
  const [sortAlpha, setSortAlpha] = useState(false);

  // Filter jobs based on search, location, and type
  let filteredJobs = jobs
    .filter(job =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterLocation ? job.location === filterLocation : true) &&
      (filterType ? job.type === filterType : true)
    );

  // Sort alphabetically if checkbox checked
  if (sortAlpha) {
    filteredJobs.sort((a, b) => a.title.localeCompare(b.title));
  }

  // Get unique locations for the location filter dropdown
  const locations = [...new Set(jobs.map(job => job.location))];

  return (
    <div className="app">
      <h1>Job Listings</h1>

      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />

        <select value={filterLocation} onChange={e => setFilterLocation(e.target.value)}>
          <option value="">All Locations</option>
          {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
        </select>

        <select value={filterType} onChange={e => setFilterType(e.target.value)}>
          <option value="">All Types</option>
          <option value="Internship">Internship</option>
          <option value="Full-time">Full-time</option>
        </select>

        <label>
          <input
            type="checkbox"
            checked={sortAlpha}
            onChange={e => setSortAlpha(e.target.checked)}
          /> Sort Alphabetically
        </label>
      </div>
      

      {/* Job Cards */}
      <div className="job-list">
        {filteredJobs.length > 0 ? (
          filteredJobs.map(job => (
            <div key={job.id} className="job-card">
              <h2 dangerouslySetInnerHTML={{ __html: highlightText(job.title, searchTerm) }} />
              <p>{job.company}</p>
              <p>{job.location}</p>
              <p>{job.type}</p>
            </div>
          ))
        ) : (
          <p>No jobs found.</p>
        )}
      </div>
    </div>
  );
}

// Function to highlight search keyword in job title
function highlightText(text, keyword) {
  if (!keyword) return text;
  const regex = new RegExp(`(${keyword})`, "gi");
  return text.replace(regex, "<mark>$1</mark>");
}

export default App;
