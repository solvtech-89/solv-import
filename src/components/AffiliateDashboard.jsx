import { useState } from "react";
import ReferralCodes from "./ReferralCodes";
import ReferralCodeDetail from "./ReferralCodeDetail";

// Mock data - replace with actual API calls
const mockReferralCodes = [
  {
    id: 1,
    code: "RI7UMP87",
    name: "Unnamed Code",
    createdDate: "8/9/2025",
    createdAt: "2025-08-09T11:39:53",
    type: "MEMBER",
    totalUsages: 0,
    totalCommission: 0,
  },
];

function AffiliateDashboard({ onSignOut, onBackToHome, isAuthenticated = false }) {
  const [activePage, setActivePage] = useState("referral-codes");
  const [selectedCodeId, setSelectedCodeId] = useState(null);
  const [referralCodes] = useState(mockReferralCodes);

  const selectedCode = referralCodes.find((c) => c.id === selectedCodeId);

  const handleViewDetail = (codeId) => {
    setSelectedCodeId(codeId);
    setActivePage("code-detail");
  };

  const handleBack = () => {
    setSelectedCodeId(null);
    setActivePage("referral-codes");
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "payment", label: "Payment", icon: "💳" },
    { id: "referral-codes", label: "Referral Codes", icon: "🔗" },
    { id: "profile", label: "Profile", icon: "👤" },
  ];

  return (
    <div className="affiliate-dashboard">
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <div className="logo">SolvImport</div>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`sidebar-item ${
                activePage === item.id ? "active" : ""
              }`}
              onClick={() => {
                if (item.id === "referral-codes") {
                  setActivePage("referral-codes");
                  setSelectedCodeId(null);
                } else {
                  setActivePage(item.id);
                }
              }}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button
            className="sidebar-item sign-out"
            onClick={isAuthenticated ? onSignOut : onBackToHome}
          >
            <span className="sidebar-icon">{isAuthenticated ? "🚪" : "🏠"}</span>
            <span className="sidebar-label">
              {isAuthenticated ? "Sign Out" : "Back to Home"}
            </span>
          </button>
        </div>
      </aside>

      <main className="dashboard-main">
        {activePage === "referral-codes" && !selectedCodeId && (
          <ReferralCodes
            onViewDetail={handleViewDetail}
            referralCodes={referralCodes}
          />
        )}
        {activePage === "code-detail" && selectedCode && (
          <ReferralCodeDetail
            code={selectedCode}
            onBack={handleBack}
            referralCodes={referralCodes}
          />
        )}
        {(activePage === "dashboard" ||
          activePage === "payment" ||
          activePage === "profile") && (
          <div className="dashboard-placeholder">
            <h1>{menuItems.find((m) => m.id === activePage)?.label}</h1>
            <p>This page is under development</p>
          </div>
        )}
        <button className="join-community-btn">
          Join the community
        </button>
      </main>
    </div>
  );
}

export default AffiliateDashboard;
