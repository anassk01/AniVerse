import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppData } from "../context/AppDataContext";
import { Loader, ErrorMessage, EmptyState } from "../components/StatusUI";

const STATUSES = ["Plan To Watch", "Watching", "Completed"];
const FILTERS = ["All", ...STATUSES];

function MyLibrary() {
  const { library, loading, error, setLibraryStatus, removeFromLibrary } =
    useAppData();
  const [activeFilter, setActiveFilter] = useState("All");

  if (loading) return <Loader label="Loading your library..." />;
  if (error) return <ErrorMessage message={error} />;

  const visibleEntries =
    activeFilter === "All"
      ? library
      : library.filter((entry) => entry.status === activeFilter);

  return (
    <div className="page">
      <h1>My Library</h1>

      <div className="filters-row">
        {FILTERS.map((status) => (
          <button
            key={status}
            className={activeFilter === status ? "btn btn-active" : "btn"}
            onClick={() => setActiveFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      {visibleEntries.length === 0 ? (
        <EmptyState message="No anime in this part of your library yet." />
      ) : (
        <div className="card-grid">
          {visibleEntries.map((entry) => (
            <div className="card" key={entry.id}>
              <img className="card-image" src={entry.image} alt={entry.title} />
              <div className="card-body">
                <h3 className="card-title">
                  <Link to={`/anime/${entry.mal_id}`}>{entry.title}</Link>
                </h3>

                {/* found by mal_id */}
                <select
                  value={entry.status}
                  onChange={(e) =>
                    setLibraryStatus({ mal_id: entry.mal_id }, e.target.value)
                  }
                >
                  {STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>

                <button className="btn" onClick={() => removeFromLibrary(entry.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyLibrary;
