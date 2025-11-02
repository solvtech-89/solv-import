import { useState, useEffect } from "react";
import AffiliateLinks from "./AffiliateLinks";
import AffiliateLinkDetail from "./AffiliateLinkDetail";
import { 
  getAffiliateLinks, 
  refreshLinkStats,
  createAffiliateLink,
  deleteAffiliateLink,
  updateAffiliateLinkName 
} from "../utils/affiliateUtils";

function AffiliateDashboard({ onSignOut, onBackToHome, isAuthenticated = false }) {
  const [activePage, setActivePage] = useState("affiliate-links");
  const [selectedLinkId, setSelectedLinkId] = useState(null);
  const [affiliateLinks, setAffiliateLinks] = useState([]);

  // Load links on mount and refresh stats
  useEffect(() => {
    const links = refreshLinkStats();
    setAffiliateLinks(links);
    
    // If no links exist, create a default one
    if (links.length === 0) {
      const defaultLink = createAffiliateLink("My First Affiliate Link");
      setAffiliateLinks([defaultLink]);
    }
  }, []);

  // Refresh stats periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedLinks = refreshLinkStats();
      setAffiliateLinks(updatedLinks);
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const selectedLink = affiliateLinks.find((l) => l.id === selectedLinkId);

  const handleViewDetail = (linkId) => {
    setSelectedLinkId(linkId);
    setActivePage("link-detail");
  };

  const handleBack = () => {
    setSelectedLinkId(null);
    setActivePage("affiliate-links");
    // Refresh stats when going back
    const updatedLinks = refreshLinkStats();
    setAffiliateLinks(updatedLinks);
  };

  const handleCreateLink = (name) => {
    const newLink = createAffiliateLink(name);
    const updatedLinks = refreshLinkStats();
    setAffiliateLinks(updatedLinks);
    return newLink;
  };

  const handleDeleteLink = (linkId) => {
    const updatedLinks = deleteAffiliateLink(linkId);
    setAffiliateLinks(updatedLinks);
    if (selectedLinkId === linkId) {
      setSelectedLinkId(null);
      setActivePage("affiliate-links");
    }
  };

  const handleUpdateLinkName = (linkId, newName) => {
    const updatedLink = updateAffiliateLinkName(linkId, newName);
    if (updatedLink) {
      const updatedLinks = refreshLinkStats();
      setAffiliateLinks(updatedLinks);
    }
  };

  const handleRefreshStats = () => {
    const updatedLinks = refreshLinkStats();
    setAffiliateLinks(updatedLinks);
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
            onCreateLink={handleCreateLink}
            onDeleteLink={handleDeleteLink}
            onRefresh={handleRefreshStats}
          />
        )}
        {activePage === "link-detail" && selectedLink && (
          <AffiliateLinkDetail
            link={selectedLink}
            onBack={handleBack}
            affiliateLinks={affiliateLinks}
            onUpdateName={handleUpdateLinkName}
            onRefresh={handleRefreshStats}
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
