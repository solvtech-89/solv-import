import { useState, useEffect } from "react";
import "./App.css";
import AffiliateDashboard from "./components/AffiliateDashboard";

function Modal({ title, children, onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <div className="modal-body">{children}</div>
        <button className="btn btn-close" onClick={onClose}>
          Tutup
        </button>
      </div>
    </div>
  );
}

function App() {
  const [showMenu, setShowMenu] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState("home"); // 'home' or 'affiliate'

  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = "smooth";

    // Close menu when clicking outside
    const handleClickOutside = (event) => {
      if (showMenu && !event.target.closest(".left")) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showMenu]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setShowLogin(false);
    setCurrentView("affiliate");
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setCurrentView("home");
  };

  const handleBackToHome = () => {
    setCurrentView("home");
  };

  const handleAffiliateClick = () => {
    setCurrentView("affiliate");
  };

  // Render Affiliate Dashboard if viewing affiliate (no login required)
  if (currentView === "affiliate") {
    return (
      <AffiliateDashboard
        onSignOut={handleSignOut}
        onBackToHome={handleBackToHome}
        isAuthenticated={isAuthenticated}
      />
    );
  }

  return (
    <div className="page-root">
      <header className="site-header" role="banner">
        <div className="left">
          <button
            className="dots"
            onClick={() => setShowMenu((s) => !s)}
            aria-label="menu"
            aria-expanded={showMenu}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="5" cy="12" r="1.8" fill="#111827" />
              <circle cx="12" cy="12" r="1.8" fill="#111827" />
              <circle cx="19" cy="12" r="1.8" fill="#111827" />
            </svg>
          </button>
          {showMenu && (
            <nav className="menu-pop" aria-label="primary">
              <a href="#dashboard">
                Dashboard <span className="badge">New</span>
              </a>
              <button
                className="menu-link-btn"
                onClick={handleAffiliateClick}
                style={{
                  width: "100%",
                  background: "none",
                  border: "none",
                  textAlign: "left",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: "inherit",
                }}
              >
                Affiliate Program <small>(Komisi 16%)</small>
              </button>
              <a href="#contact">Contact Admin</a>
            </nav>
          )}
          <a className="brand" href="#home">
            SolvImport
          </a>
          <nav className="nav" aria-label="main-nav">
            <button
              className="nav-link"
              onClick={handleAffiliateClick}
              style={{
                background: "none",
                border: "none",
                color: "var(--accent)",
                cursor: "pointer",
                fontSize: "inherit",
                fontFamily: "inherit",
                textDecoration: "none",
              }}
            >
              Affiliate
            </button>
            <a href="#features">Fasilitas</a>
          </nav>
        </div>
        <div className="right">
          <button
            className="btn btn-secondary"
            onClick={() => setShowRegister(true)}
            aria-label="Daftar"
          >
            Daftar
          </button>
          <button
            className="btn btn-primary"
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-grid">
            <div className="hero-content">
              <h1>Selamat Datang Di SolvImport</h1>
              <p className="subtitle">
                Tempat dimana kamu bisa berkembang dan maju
              </p>
              <p className="lead">
                SolvImport membantu pemula menjadi pengusaha melalui edukasi,
                jaringan supplier internasional, dan dukungan operasional.
              </p>
              <div className="hero-ctas">
                <button className="btn btn-primary">Gabung Sekarang</button>
                <button className="btn btn-ghost">Pelajari Lebih Lanjut</button>
              </div>
              <div className="partners-inline">
                <small>
                  “Kami Telah berkerjasama dengan berbagai supplier di Luar
                  Negeri”
                </small>
                <button className="btn btn-link">
                  Cek Fasilitas & Benefit ⌄
                </button>
              </div>
            </div>

            <aside className="hero-card">
              <div className="desc-title">SolvImport</div>
              <p className="desc">
                Wadah yang menghubungkan calon pengusaha dengan edukasi, alat,
                jaringan supplier, dan komunitas untuk memulai usaha.
              </p>
              <div className="community-cta">
                <button className="icon-btn primary">
                  🔒 Gabung Komunitas
                </button>
                <p className="muted">(Tersedia setelah pembelian kelas)</p>
              </div>
            </aside>
          </div>
        </section>

        <section className="features">
          <h2>Fasilitas ketika sudah menjadi member</h2>
          <div className="features-grid">
            <div className="feature">
              <span className="fi">🎓</span>
              <div>Edukasiterstruktur sampai menjadi expert</div>
            </div>
            <div className="feature">
              <span className="fi">🌐</span>
              <div>Akses jaringan supplier tangan pertama</div>
            </div>
            <div className="feature">
              <span className="fi">💻</span>
              <div>Edukasi via Google Meet/Zoom</div>
            </div>
            <div className="feature">
              <span className="fi">📱</span>
              <div>Edukasi via WhatsApp</div>
            </div>
            <div className="feature">
              <span className="fi">📜</span>
              <div>E-Sertifikat</div>
            </div>
            <div className="feature">
              <span className="fi">🎁</span>
              <div>Free Merchandise SolvImport</div>
            </div>
            <div className="feature">
              <span className="fi">🤝</span>
              <div>Akses Kemitraan Khusus</div>
            </div>
            <div className="feature">
              <span className="fi">📚</span>
              <div>Modul Bisnis Basic-Expert</div>
            </div>
            <div className="feature">
              <span className="fi">🎤</span>
              <div>Akses Webinar setiap batch</div>
            </div>
            <div className="feature">
              <span className="fi">💸</span>
              <div>Cashback hingga ratusan ribu hingga jutaan</div>
            </div>
            <div className="feature">
              <span className="fi">🧑‍🤝‍🧑</span>
              <div>Akses komunitas seumur hidup</div>
            </div>
          </div>
        </section>

        <section className="faq">
          <h2>Pertanyaan yang sering diajukan</h2>
          <div className="faq-card">
            <p className="q">
              Saya seorang pemula dan dari 0 yang ingin memulai bisnis. Apakah
              SolImport cocok untuk saya?
            </p>
            <p className="a">
              SolImport merupakan sebuah tempat yang diciptakan benar-benar
              untuk pemula yang belum tau mau mulai dari mana memulai bisnis
              atau menjadi seorang pengusaha. Kami menyediakan fasilitas B2B
              yang cukup untuk sebagai titik awal kalian memulai bisnis.
            </p>

            <p className="q">
              Bisakah saya menjadi Brand Owner sesudah bergabung di SolImport?
            </p>
            <p className="a">
              SolImport akan menjamin ketika mengikuti semua arahan disini dan
              mengusai apa yang disampaikan mentor, maka seseorang tersebut akan
              menjadi Brand Owner (Pemilik dari bisnis mereka).
            </p>

            <p className="q">Bisakah saya menggunakan merk saya sendiri?</p>
            <p className="a">
              Bisa, hal itu dapat di realisasikan dengan supplier maupun product
              dengan berdiskusi dan kesepakatan, karena tidak semua barang
              maupun brand memperbolehkan merk mereka diganti.
            </p>
          </div>
        </section>

        <section className="journey">
          <h2>Mulai Perjalanan & Pengalaman</h2>
          <p className="tag">
            yang tidak bisa didapatkan ditempat lain bersama SolvImport
          </p>
          <p className="motto">Bismillah Jadi Pengusaha</p>

          <div className="pricing-grid">
            <div className="price-card">
              <div className="price-badge">
                <div className="price-title">Basic</div>
                <div className="price-duration">Akses 3 Bulan</div>
                <div className="price-old">699k</div>
                <div className="price-new">299k</div>
                <button className="btn">Pilih Basic</button>
              </div>
            </div>

            <div className="price-card popular">
              <div className="price-badge">
                <div className="price-title">Intermediate</div>
                <div className="price-duration">Akses 6 Bulan</div>
                <div className="price-old">999k</div>
                <div className="price-new">499k</div>
                <button className="btn">Pilih Intermediate</button>
              </div>
            </div>

            <div className="price-card">
              <div className="price-badge">
                <div className="price-title">Advance</div>
                <div className="price-duration">Akses Life Time</div>
                <div className="price-old">1.999k</div>
                <div className="price-new">999k</div>
                <button className="btn">Pilih Advance</button>
              </div>
            </div>
          </div>

          <div className="student-discount">
            <p>Tunjukan kartu pelajar kalian dan dapatkan DISKON KHUSUS</p>
            <a
              className="wa-link"
              href="https://wa.me/62882003843947"
              target="_blank"
              rel="noreferrer"
            >
              Hubungi via WhatsApp
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} SolvImport</p>
      </footer>

      {showRegister && (
        <Modal title="Buat akun Anda" onClose={() => setShowRegister(false)}>
          <p>Selamat Datang! Silahkan isi detailnya untuk memulai.</p>
          <div className="modal-actions">
            <button className="btn btn-google">Lanjutkan dengan Google</button>
            <div className="divider">atau</div>
            <input placeholder="Alamat Email" />
            <input placeholder="Kata sandi" type="password" />
            <button className="btn">Lanjutkan</button>
          </div>
        </Modal>
      )}

      {showLogin && (
        <Modal
          title="Masuk Ke SolvImport 18 Tahun"
          onClose={() => setShowLogin(false)}
        >
          <p>Selamat datang kembali! Silahkan masuk untuk melanjutkan.</p>
          <div className="modal-actions">
            <button className="btn btn-google" onClick={handleLogin}>
              Lanjutkan dengan Google
            </button>
            <div className="divider">atau</div>
            <input placeholder="Alamat Email" />
            <input placeholder="Kata sandi" type="password" />
            <button className="btn" onClick={handleLogin}>
              Lanjutkan
            </button>
          </div>
          <p className="muted">
            Belum punya akun?{" "}
            <button
              className="link-btn"
              onClick={() => {
                setShowLogin(false);
                setShowRegister(true);
              }}
            >
              Mendaftar
            </button>
          </p>
        </Modal>
      )}
    </div>
  );
}

export default App;
