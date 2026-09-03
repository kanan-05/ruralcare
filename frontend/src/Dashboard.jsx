import {
  Users,
  Clock3,
  Siren,
  MapPinned,
  AlertTriangle,
  Ambulance,
  TrendingUp,
  Activity
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "./Dashboard.css";


const demandData = [
  { name: "General", requests: 42 },
  { name: "Pediatrics", requests: 31 },
  { name: "Women's Health", requests: 24 },
  { name: "Other", requests: 16 }
];


const villages = [
  {
    name: "Rampur",
    requests: 34,
    providers: 0,
    distance: 18,
    status: "HIGH",
    latitude: 28.6139,
    longitude: 77.2090
  },
  {
    name: "Shivpur",
    requests: 21,
    providers: 1,
    distance: 12,
    status: "HIGH",
    latitude: 28.6250,
    longitude: 77.2150
  },
  {
    name: "Lakshmi Nagar",
    requests: 15,
    providers: 2,
    distance: 7,
    status: "MODERATE",
    latitude: 28.6020,
    longitude: 77.2250
  },
  {
    name: "Devgaon",
    requests: 9,
    providers: 3,
    distance: 4,
    status: "GOOD",
    latitude: 28.6200,
    longitude: 77.1950
  }
];


function StatCard({
  icon: Icon,
  title,
  value,
  subtitle,
  type
}) {
  return (
    <div className={`stat-card ${type}`}>

      <div className="stat-icon">
        <Icon size={23} />
      </div>

      <div className="stat-info">

        <p>{title}</p>

        <div className="stat-value-row">

          <h2>{value}</h2>

          {type === "served" && (
            <span className="success-check">
              ✓
            </span>
          )}

          {type === "pending" && (
            <span className="pending-dot"></span>
          )}

          {type === "emergency" && (
            <span className="emergency-indicator">
              !
            </span>
          )}

          {type === "high-need" && (
            <span className="high-need-indicator">
              !
            </span>
          )}

        </div>

        <span className="stat-subtitle">
          {subtitle}
        </span>

      </div>

    </div>
  );
}


function Dashboard({ onStartPatient }) {
  return (
    <div className="dashboard">

      {/* HEADER */}

      <header className="dashboard-header">

        <div className="brand">

          <div className="brand-icon">
            ✚
          </div>

          <div>
            <h1>RuralCare</h1>
            <span>Healthcare Operations</span>
          </div>

        </div>

        <div className="header-right">
           <button
  className="patient-button"
  onClick={onStartPatient}
>
  Find Care
</button>
          <span className="live-status">
            <span className="live-dot"></span>
            Live data
          </span>

          <div className="admin">
            <Activity size={18} />
            Admin
          </div>

        </div>

      </header>


      {/* MAIN */}

      <main className="dashboard-content">

        {/* TITLE */}

        <div className="page-title">

          <div>

            <h2>
              Operations Dashboard
            </h2>

            <p>
              Monitor healthcare access and identify underserved villages.
            </p>

          </div>

          <div className="location-filter">

            <MapPinned size={18} />

            District Overview

          </div>

        </div>


        {/* STAT CARDS */}

        <section className="stats-grid">

          <StatCard
            icon={Users}
            title="Patients Served"
            value="248"
            subtitle="This month"
            type="served"
          />

          <StatCard
            icon={Clock3}
            title="Pending Requests"
            value="31"
            subtitle="Needs attention"
            type="pending"
          />

          <StatCard
            icon={Siren}
            title="Emergency Cases"
            value="7"
            subtitle="This month"
            type="emergency"
          />

          <StatCard
            icon={AlertTriangle}
            title="High-Need Villages"
            value="4"
            subtitle="Require intervention"
            type="high-need"
          />

        </section>


        {/* MAP + CHART */}

        <section className="main-grid">

          {/* MAP */}

          <div className="panel map-panel">

            <div className="panel-header">

              <div>

                <h3>
                  Healthcare Access Map
                </h3>

                <p>
                  Village-level access status
                </p>

              </div>

              <div className="legend">

                <span>
                  <i className="legend-dot high"></i>
                  High need
                </span>

                <span>
                  <i className="legend-dot moderate"></i>
                  Moderate
                </span>

                <span>
                  <i className="legend-dot good"></i>
                  Good
                </span>

              </div>

            </div>


            <div className="map-container">

              <MapContainer
                center={[28.6139, 77.2090]}
                zoom={12}
                scrollWheelZoom={false}
                style={{
                  height: "100%",
                  width: "100%"
                }}
              >

                <TileLayer
                  attribution="&copy; OpenStreetMap contributors"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />


                {villages.map((village) => {

                  const markerColor =
                    village.status === "HIGH"
                      ? "#dc2626"
                      : village.status === "MODERATE"
                      ? "#d97706"
                      : "#16a34a";

                  return (

                    <CircleMarker
                      key={village.name}
                      center={[
                        village.latitude,
                        village.longitude
                      ]}
                      radius={12}
                      pathOptions={{
                        color: markerColor,
                        fillColor: markerColor,
                        fillOpacity: 0.7
                      }}
                    >

                      <Popup>

                        <strong>
                          {village.name}
                        </strong>

                        <br />

                        Requests: {village.requests}

                        <br />

                        Providers: {village.providers}

                        <br />

                        Avg travel: {village.distance} km

                      </Popup>

                    </CircleMarker>

                  );

                })}

              </MapContainer>

            </div>

          </div>


          {/* DEMAND */}

          <div className="panel demand-panel">

            <div className="panel-header">

              <div>

                <h3>
                  Healthcare Demand
                </h3>

                <p>
                  Requests by healthcare need
                </p>

              </div>

              <TrendingUp size={20} />

            </div>


            <div className="chart-container">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <BarChart
                  data={demandData}
                  layout="vertical"
                  margin={{
                    top: 10,
                    right: 20,
                    left: 20,
                    bottom: 10
                  }}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e5ebe7"
                  />

                  <XAxis
                    type="number"
                    stroke="#69736d"
                  />

                  <YAxis
                    dataKey="name"
                    type="category"
                    width={90}
                    stroke="#69736d"
                  />

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#f1f8f3",
                      border: "1px solid #c8dfce",
                      borderRadius: "8px"
                    }}
                  />

                  <Bar
                    dataKey="requests"
                    fill="#3A7D57"
                    activeBar={{
                      fill: "#245536"
                    }}
                    radius={[0, 6, 6, 0]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>

        </section>


        {/* PRIORITY VILLAGES */}

        <section className="panel priority-panel">

          <div className="panel-header">

            <div>

              <h3>
                Priority Villages
              </h3>

              <p>
                Areas with the greatest healthcare access gaps
              </p>

            </div>

            <button className="view-button">
              View all
            </button>

          </div>


          <div className="table-wrapper">

            <table>

              <thead>

                <tr>

                  <th>Village</th>
                  <th>Requests</th>
                  <th>Nearby Providers</th>
                  <th>Avg. Travel</th>
                  <th>Access Status</th>

                </tr>

              </thead>


              <tbody>

                {villages.map((village) => (

                  <tr key={village.name}>

                    <td className="village-name">
                      {village.name}
                    </td>

                    <td>
                      {village.requests}
                    </td>

                    <td>
                      {village.providers}
                    </td>

                    <td>
                      {village.distance} km
                    </td>

                    <td>

                      <span
                        className={`status ${village.status.toLowerCase()}`}
                      >
                        {village.status}
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </section>


        {/* RECOMMENDATION */}

        <section className="recommendation">

          <div className="recommendation-icon">
            <Ambulance size={30} />
          </div>


          <div className="recommendation-content">

            <span className="recommendation-label">
              RECOMMENDED ACTION
            </span>


            <h2>
              Deploy a mobile medical unit to Rampur
            </h2>


            <p>

              Rampur has{" "}

              <strong>
                34 healthcare requests
              </strong>

              , no nearby providers and an average travel distance of{" "}

              <strong>
                18 km
              </strong>

              .

            </p>


            <div className="recommendation-tags">

              <span>
                Highest demand: Pediatrics
              </span>

              <span>
                34 patients
              </span>

              <span>
                0 nearby providers
              </span>

            </div>

          </div>


          <button className="action-button">
            View Details
          </button>

        </section>

      </main>

    </div>
  );
}


export default Dashboard;