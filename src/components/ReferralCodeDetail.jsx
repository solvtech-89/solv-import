import { useState, useEffect } from "react";

function ReferralCodeDetail({ code, onBack, referralCodes }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code.code);
    setCopied(true);
  };

  // Calculate statistics (dummy data for now)
  const totalUsages = code.totalUsages || 0;
  const totalCommission = code.totalCommission || 0;

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
    <div className="referral-code-detail">
      <div className="detail-header">
        <button className="btn-back" onClick={onBack}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <div>
          <h1>{code.name || "Unnamed Code"}</h1>
          <p className="page-subtitle">
            Referral code details and usage statistics
          </p>
        </div>
      </div>

      <div className="code-info-section">
        <h2>Code Information</h2>
        <div className="info-grid">
          <div className="info-item">
            <label>Referral Code</label>
            <div className="code-display-row">
              <div className="code-value-large">{code.code}</div>
              <button
                className={`btn btn-copy-large ${copied ? "copied" : ""}`}
                onClick={handleCopy}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                {copied ? "Copied!" : "Copy Code"}
              </button>
            </div>
          </div>
          <div className="info-item">
            <label>Discount</label>
            <div className="info-value">5% commission</div>
          </div>
          <div className="info-item">
            <label>Type</label>
            <span className="type-badge">MEMBER</span>
          </div>
          <div className="info-item">
            <label>Created</label>
            <div className="info-value">{formatDate(code.createdAt)}</div>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <div className="stat-card">
          <div className="stat-value">{totalUsages}</div>
          <div className="stat-label">Total Usages</div>
          <div className="stat-desc">Times your code was used</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">Rp {totalCommission.toLocaleString()}</div>
          <div className="stat-label">Total Commission</div>
          <div className="stat-desc">5% of order values</div>
        </div>
      </div>

      <div className="usage-history-section">
        <h2>Usage History</h2>
        {totalUsages === 0 ? (
          <div className="empty-state">
            <p>No usage history yet</p>
            <p className="empty-desc">
              Share your code to start earning commissions!
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

export default ReferralCodeDetail;
