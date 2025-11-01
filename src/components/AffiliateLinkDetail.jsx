import { useState, useEffect } from "react";

function AffiliateLinkDetail({ link, onBack, affiliateLinks }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopy = () => {
    navigator.clipboard.writeText(link.link);
    setCopied(true);
  };

  // Statistics
  const totalClicks = link.totalClicks || 0;
  const totalSignups = link.totalSignups || 0;
  const totalCommission = link.totalCommission || 0;
  const conversionRate = totalClicks > 0 ? ((totalSignups / totalClicks) * 100).toFixed(2) : 0;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="affiliate-link-detail">
      <div className="detail-header">
        <button className="btn-back" onClick={onBack}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <div>
          <h1>{link.name || "Unnamed Link"}</h1>
          <p className="page-subtitle">
            Affiliate link details and performance statistics
          </p>
        </div>
      </div>

      <div className="link-info-section">
        <h2>Affiliate Link Information</h2>
        <div className="info-grid">
          <div className="info-item full-width">
            <label>Affiliate Link</label>
            <div className="link-display-row">
              <div className="link-value-large">{link.link}</div>
              <button
                className={`btn btn-copy-large ${copied ? "copied" : ""}`}
                onClick={handleCopy}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                {copied ? "Copied!" : "Copy Link"}
              </button>
            </div>
          </div>
          <div className="info-item">
            <label>Affiliate Code</label>
            <div className="info-value-code">{link.code}</div>
          </div>
          <div className="info-item">
            <label>Commission Rate</label>
            <div className="info-value-commission">{link.commissionRate}%</div>
          </div>
          <div className="info-item">
            <label>Type</label>
            <span className="type-badge">{link.type}</span>
          </div>
          <div className="info-item">
            <label>Created</label>
            <div className="info-value">{formatDate(link.createdAt)}</div>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <div className="stat-card">
          <div className="stat-value">{totalClicks}</div>
          <div className="stat-label">Total Clicks</div>
          <div className="stat-desc">Number of clicks on your affiliate link</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{totalSignups}</div>
          <div className="stat-label">Total Signups</div>
          <div className="stat-desc">Successful registrations through your link</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{conversionRate}%</div>
          <div className="stat-label">Conversion Rate</div>
          <div className="stat-desc">Signups per clicks percentage</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">Rp {totalCommission.toLocaleString()}</div>
          <div className="stat-label">Total Commission</div>
          <div className="stat-desc">Earned from successful referrals</div>
        </div>
      </div>

      <div className="usage-history-section">
        <h2>Referral History</h2>
        {totalSignups === 0 ? (
          <div className="empty-state">
            <p>No referral history yet</p>
            <p className="empty-desc">
              Share your affiliate link to start earning commissions! Every successful referral brings you {link.commissionRate}% commission.
            </p>
          </div>
        ) : (
          <div className="history-list">
            {/* History items would go here */}
          </div>
        )}
      </div>
    </div>
  );
}

export default AffiliateLinkDetail;
