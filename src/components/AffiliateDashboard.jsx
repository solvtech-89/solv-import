import { useState } from "react";
import AffiliateLinks from "./AffiliateLinks";
import AffiliateLinkDetail from "./AffiliateLinkDetail";

// Mock data - replace with actual API calls
const mockAffiliateLinks = [
  {
    id: 1,
    link: "https://solvimport.com/ref/RI7UMP87",
    code: "RI7UMP87",
    name: "Unnamed Link",
    createdDate: "8/9/2025",
    createdAt: "2025-08-09T11:39:53",
    type: "MEMBER",
    commissionRate: 16,
    totalClicks: 0,
    totalSignups: 0,
    totalCommission: 0,
  },
];

function AffiliateDashboard({ onSignOut, onBackToHome, isAuthenticated = false }) {
  const [activePage, setActivePage] = useState("affiliate-links");
  const [selectedLinkId, setSelectedLinkId] = useState(null);
  const [affiliateLinks] = useState(mockAffiliateLinks);

  const selectedLink = affiliateLinks.find((l) => l.id === selectedLinkId);

  const handleViewDetail = (linkId) => {
    setSelectedLinkId(linkId);
    setActivePage("link-detail");
  };

  const handleBack = () => {
    setSelectedLinkId(null);
    setActivePage("affiliate-links");
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "payment", label: "Payment", icon: "💳" },
    { id: "affiliate-links", label: "Affiliate Links", icon: "🔗" },
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
                if (item.id === "affiliate-links") {
                  setActivePage("affiliate-links");
                  setSelectedLinkId(null);
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
        {activePage === "affiliate-links" && !selectedLinkId && (
          <AffiliateLinks
            onViewDetail={handleViewDetail}
            affiliateLinks={affiliateLinks}
          />
        )}
        {activePage === "link-detail" && selectedLink && (
          <AffiliateLinkDetail
            link={selectedLink}
            onBack={handleBack}
            affiliateLinks={affiliateLinks}
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
