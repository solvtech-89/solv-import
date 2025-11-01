import { useState } from "react";

function ReferralCodes({ onViewDetail, referralCodes }) {
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="referral-codes-page">
      <div className="page-header">
        <h1>Referral Codes</h1>
        <p className="page-subtitle">
          Manage your referral codes and track their usage. Each member code
          gives you 5% commission when used.
        </p>
      </div>

      <div className="referral-codes-section">
        <div className="section-header">
          <div>
            <h2>Your Referral Codes</h2>
            <p className="code-count">
              You have {referralCodes.length} referral code
              {referralCodes.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button className="btn btn-create" onClick={() => alert("Create new code functionality")}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Create New Code
          </button>
        </div>

        <div className="referral-codes-grid">
          {referralCodes.map((code) => (
            <div key={code.id} className="referral-code-card">
              <div className="code-card-header">
                <h3>{code.name || "Unnamed Code"}</h3>
                <span className="code-date">Created {code.createdDate}</span>
              </div>
              <div className="code-display">
                <div className="code-value">{code.code}</div>
                <button
                  className={`btn btn-copy ${copiedCode === code.code ? "copied" : ""}`}
                  onClick={() => handleCopy(code.code)}
                >
                  {copiedCode === code.code ? "✓ Copied" : "Copy"}
                </button>
              </div>
              <div className="code-actions">
                <button
                  className="btn btn-secondary"
                  onClick={() => onViewDetail(code.id)}
                >
                  Details
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => handleCopy(code.code)}
                >
                  Copy
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ReferralCodes;
