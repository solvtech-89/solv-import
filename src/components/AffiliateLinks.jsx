import { useState } from "react";

function AffiliateLinks({ onViewDetail, affiliateLinks }) {
  const [copiedLink, setCopiedLink] = useState(null);

  const handleCopy = (link) => {
    navigator.clipboard.writeText(link);
    setCopiedLink(link);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  return (
    <div className="affiliate-links-page">
      <div className="page-header">
        <h1>Affiliate Links</h1>
        <p className="page-subtitle">
          Manage your affiliate links and track their performance. Earn up to 16% commission for each successful referral through your unique affiliate links.
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
          <button className="btn btn-create" onClick={() => alert("Create new affiliate link functionality")}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Create New Link
          </button>
        </div>

        <div className="affiliate-links-grid">
          {affiliateLinks.map((link) => (
            <div key={link.id} className="affiliate-link-card">
              <div className="link-card-header">
                <h3>{link.name || "Unnamed Link"}</h3>
                <span className="link-date">Created {link.createdDate}</span>
              </div>
              <div className="link-display">
                <div className="link-value">{link.link}</div>
                <button
                  className={`btn btn-copy ${copiedLink === link.link ? "copied" : ""}`}
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
    </div>
  );
}

export default AffiliateLinks;
