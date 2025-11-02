import { useState } from "react";

function AffiliateLinks({
  onViewDetail,
  affiliateLinks,
  onCreateLink,
  onDeleteLink,
  onRefresh,
}) {
  const [copiedLink, setCopiedLink] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newLinkName, setNewLinkName] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const handleCopy = (link) => {
    navigator.clipboard.writeText(link);
    setCopiedLink(link);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const handleCreate = () => {
    if (newLinkName.trim()) {
      onCreateLink(newLinkName.trim());
      setNewLinkName("");
      setShowCreateModal(false);
    }
  };

  const handleDelete = (linkId, linkName) => {
    if (
      window.confirm(
        `Are you sure you want to delete "${linkName}"? This action cannot be undone.`
      )
    ) {
      setDeletingId(linkId);
      onDeleteLink(linkId);
      setTimeout(() => setDeletingId(null), 500);
    }
  };

  return (
    <div className="affiliate-links-page">
      <div className="page-header">
        <h1>Affiliate Links</h1>
        <p className="page-subtitle">
          Manage your affiliate links and track their performance. Earn up to
          16% commission for each successful referral through your unique
          affiliate links.
        </p>
      </div>

      <div className="affiliate-links-section">
        <div className="section-header">
          <div>
            <h2>Your Affiliate Links</h2>
            <p className="link-count">
              You have {affiliateLinks.length} affiliate link
              {affiliateLinks.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div
            style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}
          >
            <button
              className="btn btn-secondary"
              onClick={onRefresh}
              title="Refresh statistics"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="23 4 23 10 17 10"></polyline>
                <polyline points="1 20 1 14 7 14"></polyline>
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
              </svg>
              Refresh
            </button>
            <button
              className="btn btn-create"
              onClick={() => setShowCreateModal(true)}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Create New Link
            </button>
          </div>
        </div>

        <div className="affiliate-links-grid">
          {affiliateLinks.map((link) => (
            <div
              key={link.id}
              className={`affiliate-link-card ${
                deletingId === link.id ? "deleting" : ""
              }`}
            >
              <div className="link-card-header">
                <div style={{ flex: 1 }}>
                  <h3>{link.name || "Unnamed Link"}</h3>
                  <span className="link-date">Created {link.createdDate}</span>
                </div>
                <button
                  className="btn btn-secondary"
                  onClick={() =>
                    handleDelete(link.id, link.name || "Unnamed Link")
                  }
                  style={{
                    padding: "0.5rem",
                    minWidth: "auto",
                    fontSize: "0.875rem",
                  }}
                  title="Delete link"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
              </div>
              <div className="link-display">
                <div className="link-value">{link.link}</div>
                <button
                  className={`btn btn-copy ${
                    copiedLink === link.link ? "copied" : ""
                  }`}
                  onClick={() => handleCopy(link.link)}
                >
                  {copiedLink === link.link ? "✓ Copied" : "Copy"}
                </button>
              </div>
              <div className="link-info-row">
                <div className="info-badge">
                  <span className="info-label">Commission</span>
                  <span className="info-value">{link.commissionRate}%</span>
                </div>
                <div className="info-badge">
                  <span className="info-label">Code</span>
                  <span className="info-value">{link.code}</span>
                </div>
              </div>
              <div className="link-actions">
                <button
                  className="btn btn-secondary"
                  onClick={() => onViewDetail(link.id)}
                >
                  Details
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => handleCopy(link.link)}
                >
                  Copy Link
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Link Modal */}
      {showCreateModal && (
        <div
          className="modal-backdrop"
          onClick={() => setShowCreateModal(false)}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Create New Affiliate Link</h3>
            <div className="modal-body">
              <p>Give your affiliate link a name to help you identify it.</p>
              <input
                type="text"
                placeholder="Link name (e.g., Social Media Campaign)"
                value={newLinkName}
                onChange={(e) => setNewLinkName(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleCreate()}
                style={{ width: "100%", marginTop: "1rem" }}
                autoFocus
              />
            </div>
            <div
              style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}
            >
              <button
                className="btn btn-secondary"
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleCreate}
                disabled={!newLinkName.trim()}
              >
                Create Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AffiliateLinks;
