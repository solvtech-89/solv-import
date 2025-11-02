// Utility functions for affiliate system using localStorage

const AFFILIATE_STORAGE_KEY = 'solvimport_affiliate_links';
const CLICKS_STORAGE_KEY = 'solvimport_affiliate_clicks';
const SIGNUPS_STORAGE_KEY = 'solvimport_affiliate_signups';
const REFERRAL_COOKIE_KEY = 'solvimport_referral';

// Generate unique affiliate code
export function generateAffiliateCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Get all affiliate links from localStorage
export function getAffiliateLinks() {
  try {
    const links = localStorage.getItem(AFFILIATE_STORAGE_KEY);
    return links ? JSON.parse(links) : [];
  } catch (error) {
    console.error('Error loading affiliate links:', error);
    return [];
  }
}

// Save affiliate links to localStorage
export function saveAffiliateLinks(links) {
  try {
    localStorage.setItem(AFFILIATE_STORAGE_KEY, JSON.stringify(links));
  } catch (error) {
    console.error('Error saving affiliate links:', error);
  }
}

// Create new affiliate link
export function createAffiliateLink(name = 'Unnamed Link') {
  const code = generateAffiliateCode();
  const baseUrl = 'https://import.solvtech.id';
  const link = `${baseUrl}?ref=${code}`;
  
  const newLink = {
    id: Date.now(),
    code,
    link,
    name,
    createdDate: new Date().toLocaleDateString('en-US'),
    createdAt: new Date().toISOString(),
    type: 'MEMBER',
    commissionRate: 16,
    totalClicks: 0,
    totalSignups: 0,
    totalCommission: 0,
  };

  const links = getAffiliateLinks();
  links.push(newLink);
  saveAffiliateLinks(links);

  return newLink;
}

// Get clicks for affiliate code
export function getClicks(code) {
  try {
    const clicks = localStorage.getItem(CLICKS_STORAGE_KEY);
    const clicksData = clicks ? JSON.parse(clicks) : {};
    return clicksData[code] || 0;
  } catch (error) {
    return 0;
  }
}

// Track click for affiliate code
export function trackClick(code) {
  try {
    const clicks = localStorage.getItem(CLICKS_STORAGE_KEY);
    const clicksData = clicks ? JSON.parse(clicks) : {};
    clicksData[code] = (clicksData[code] || 0) + 1;
    localStorage.setItem(CLICKS_STORAGE_KEY, JSON.stringify(clicksData));

    // Update affiliate link stats
    const links = getAffiliateLinks();
    const linkIndex = links.findIndex(l => l.code === code);
    if (linkIndex !== -1) {
      links[linkIndex].totalClicks = clicksData[code];
      saveAffiliateLinks(links);
    }

    return clicksData[code];
  } catch (error) {
    console.error('Error tracking click:', error);
    return 0;
  }
}

// Get signups for affiliate code
export function getSignups(code) {
  try {
    const signups = localStorage.getItem(SIGNUPS_STORAGE_KEY);
    const signupsData = signups ? JSON.parse(signups) : {};
    return signupsData[code] || 0;
  } catch (error) {
    return 0;
  }
}

// Track signup for affiliate code (called when user registers)
export function trackSignup(code) {
  if (!code) return false;

  try {
    const signups = localStorage.getItem(SIGNUPS_STORAGE_KEY);
    const signupsData = signups ? JSON.parse(signups) : {};
    
    // Generate unique user ID for this session if not exists
    let userId = sessionStorage.getItem('solvimport_user_id');
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('solvimport_user_id', userId);
    }
    
    // Check if this referral already converted for this user
    const referralKey = `${code}_${userId}`;
    if (signupsData[referralKey]) {
      return false; // Already converted for this user
    }

    // Increment signup count for this code
    const currentCount = Object.keys(signupsData).filter(key => 
      key.startsWith(`${code}_`) && signupsData[key] === true
    ).length;
    
    signupsData[code] = currentCount + 1;
    signupsData[referralKey] = true; // Mark as converted for this user
    localStorage.setItem(SIGNUPS_STORAGE_KEY, JSON.stringify(signupsData));

    // Update affiliate link stats
    const links = getAffiliateLinks();
    const linkIndex = links.findIndex(l => l.code === code);
    if (linkIndex !== -1) {
      links[linkIndex].totalSignups = currentCount + 1;
      // Calculate commission (simplified: assume each signup = 1 transaction)
      const commissionPerSignup = 100000; // Example: Rp 100.000 per signup
      links[linkIndex].totalCommission = (currentCount + 1) * commissionPerSignup * (links[linkIndex].commissionRate / 100);
      saveAffiliateLinks(links);
    }

    return true;
  } catch (error) {
    console.error('Error tracking signup:', error);
    return false;
  }
}

// Check URL for referral code and store it
export function checkReferralCode() {
  const urlParams = new URLSearchParams(window.location.search);
  const refCode = urlParams.get('ref');
  
  if (refCode) {
    // Store referral code in sessionStorage (lasts for browser session)
    sessionStorage.setItem(REFERRAL_COOKIE_KEY, refCode);
    
    // Track click
    trackClick(refCode);
    
    // Clean URL (remove ref parameter)
    const cleanUrl = window.location.origin + window.location.pathname;
    window.history.replaceState({}, document.title, cleanUrl);
    
    return refCode;
  }
  
  return null;
}

// Get stored referral code
export function getStoredReferralCode() {
  return sessionStorage.getItem(REFERRAL_COOKIE_KEY);
}

// Clear referral code after use
export function clearReferralCode() {
  sessionStorage.removeItem(REFERRAL_COOKIE_KEY);
}

// Update all link stats from clicks and signups
export function refreshLinkStats() {
  const links = getAffiliateLinks();
  
  try {
    const clicks = localStorage.getItem(CLICKS_STORAGE_KEY);
    const clicksData = clicks ? JSON.parse(clicks) : {};
    
    const signups = localStorage.getItem(SIGNUPS_STORAGE_KEY);
    const signupsData = signups ? JSON.parse(signups) : {};
    
    links.forEach(link => {
      link.totalClicks = clicksData[link.code] || 0;
      
      // Count unique signups for this code (look for keys that start with code_)
      const codeSignups = Object.keys(signupsData).filter(key => {
        return key.startsWith(`${link.code}_`) && signupsData[key] === true;
      }).length;
      
      // Also check for direct code count (backwards compatibility)
      const directCount = signupsData[link.code] || 0;
      link.totalSignups = Math.max(codeSignups, directCount);
      
      // Calculate commission
      const commissionPerSignup = 100000; // Rp 100.000 per signup
      link.totalCommission = link.totalSignups * commissionPerSignup * (link.commissionRate / 100);
    });
    
    saveAffiliateLinks(links);
    return links;
  } catch (error) {
    console.error('Error refreshing stats:', error);
    return links;
  }
}

// Delete affiliate link
export function deleteAffiliateLink(linkId) {
  const links = getAffiliateLinks();
  const filteredLinks = links.filter(l => l.id !== linkId);
  saveAffiliateLinks(filteredLinks);
  return filteredLinks;
}

// Update affiliate link name
export function updateAffiliateLinkName(linkId, newName) {
  const links = getAffiliateLinks();
  const linkIndex = links.findIndex(l => l.id === linkId);
  if (linkIndex !== -1) {
    links[linkIndex].name = newName;
    saveAffiliateLinks(links);
    return links[linkIndex];
  }
  return null;
}

