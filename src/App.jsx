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
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = "smooth";

    // Close menu when clicking outside
    const handleClickOutside = (event) => {
      if (
        showMenu &&
        !event.target.closest(".header-left") &&
        !event.target.closest(".mobile-menu")
      ) {
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
        <div className="header-container">
          <div className="header-left">
            <button
              className="menu-toggle"
              onClick={() => setShowMenu((s) => !s)}
              aria-label="menu"
              aria-expanded={showMenu}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {showMenu ? (
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ) : (
                  <>
                    <path
                      d="M4 6h16M4 12h16M4 18h16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </>
                )}
              </svg>
            </button>
            <a
              className="brand"
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <span className="brand-text">SolvImport</span>
            </a>
            {showMenu && (
              <nav className="mobile-menu" aria-label="primary">
                <a
                  href="#features"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("features")
                      ?.scrollIntoView({ behavior: "smooth" });
                    setShowMenu(false);
                  }}
                >
                  Fasilitas
                </a>
                <button
                  onClick={() => {
                    handleAffiliateClick();
                    setShowMenu(false);
                  }}
                >
                  Affiliate Program
                  <small>(Komisi 16%)</small>
                </button>
                <a
                  href="#pricing"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("pricing")
                      ?.scrollIntoView({ behavior: "smooth" });
                    setShowMenu(false);
                  }}
                >
                  Pricing
                </a>
                <a
                  href="#faq"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("faq")
                      ?.scrollIntoView({ behavior: "smooth" });
                    setShowMenu(false);
                  }}
                >
                  FAQ
                </a>
              </nav>
            )}
          </div>
          <nav className="header-nav" aria-label="main-nav">
            <a
              href="#features"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("features")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Fasilitas
            </a>
            <button className="nav-link-button" onClick={handleAffiliateClick}>
              Affiliate
            </button>
          </nav>
          <div className="header-actions">
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
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-grid">
            <div className="hero-content">
              <h1>Selamat Datang Di SolvImport</h1>
              <p className="subtitle">
                Platform untuk mengembangkan bisnis Anda ke level berikutnya
              </p>
              <p className="lead">
                SolvImport membantu pemula menjadi pengusaha sukses melalui
                program edukasi terstruktur, akses ke jaringan supplier
                internasional, dan dukungan operasional yang komprehensif.
              </p>
              <div className="hero-ctas">
                <button className="btn btn-primary">Gabung Sekarang</button>
                <button className="btn btn-ghost">Pelajari Lebih Lanjut</button>
              </div>
              <div className="partners-inline">
                <small>
                  Telah dipercaya oleh berbagai supplier terkemuka di luar
                  negeri
                </small>
                <button
                  className="btn btn-link"
                  onClick={() =>
                    document
                      .getElementById("features")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Lihat Fasilitas & Benefit ⌄
                </button>
              </div>
            </div>

            <aside className="hero-card">
              <div className="desc-title">Tentang SolvImport</div>
              <p className="desc">
                Platform profesional yang menghubungkan calon pengusaha dengan
                edukasi bisnis berkualitas, akses ke alat bisnis modern,
                jaringan supplier terpercaya, dan komunitas entrepreneur untuk
                memulai perjalanan bisnis Anda.
              </p>
              <div className="community-cta">
                <button className="icon-btn primary">
                  🔒 Gabung Komunitas Eksklusif
                </button>
                <p className="muted">Akses tersedia setelah pembelian kelas</p>
              </div>
            </aside>
          </div>
        </section>

        <section className="features" id="features">
          <h2>Fasilitas Lengkap untuk Member</h2>
          <div className="features-grid">
            <div className="feature">
              <span className="fi">🎓</span>
              <div>Program Edukasi Terstruktur dari Basic hingga Expert</div>
            </div>
            <div className="feature">
              <span className="fi">🌐</span>
              <div>Akses Eksklusif ke Jaringan Supplier Internasional</div>
            </div>
            <div className="feature">
              <span className="fi">💻</span>
              <div>Kelas Interaktif via Google Meet & Zoom</div>
            </div>
            <div className="feature">
              <span className="fi">📱</span>
              <div>Pendampingan Real-time via WhatsApp</div>
            </div>
            <div className="feature">
              <span className="fi">📜</span>
              <div>Sertifikat Digital yang Diakui</div>
            </div>
            <div className="feature">
              <span className="fi">🎁</span>
              <div>Merchandise Eksklusif SolvImport Gratis</div>
            </div>
            <div className="feature">
              <span className="fi">🤝</span>
              <div>Peluang Kemitraan Bisnis Khusus</div>
            </div>
            <div className="feature">
              <span className="fi">📚</span>
              <div>Modul Pembelajaran Comprehensive Basic-Expert</div>
            </div>
            <div className="feature">
              <span className="fi">🎤</span>
              <div>Webinar Eksklusif Setiap Batch</div>
            </div>
            <div className="feature">
              <span className="fi">💸</span>
              <div>Program Cashback hingga Jutaan Rupiah</div>
            </div>
            <div className="feature">
              <span className="fi">🧑‍🤝‍🧑</span>
              <div>Komunitas Entrepreneur Seumur Hidup</div>
            </div>
          </div>
        </section>

        <section className="faq" id="faq">
          <h2>Pertanyaan yang Sering Diajukan</h2>
          <div className="faq-list">
            <div
              className={`faq-accordion ${openFaqIndex === 0 ? "open" : ""}`}
              onClick={() => setOpenFaqIndex(openFaqIndex === 0 ? null : 0)}
            >
              <div className="faq-question">
                <span>
                  Saya seorang pemula dan dari 0 yang ingin memulai bisnis.
                  Apakah SolvImport cocok untuk saya?
                </span>
                <svg
                  className="faq-icon"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 9l6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="faq-answer">
                <p>
                  SolvImport dirancang khusus untuk pemula yang ingin memulai
                  bisnis dari nol. Kami menyediakan program edukasi terstruktur,
                  akses ke supplier, dan dukungan operasional yang diperlukan
                  sebagai fondasi kuat untuk memulai perjalanan bisnis Anda.
                </p>
              </div>
            </div>

            <div
              className={`faq-accordion ${openFaqIndex === 1 ? "open" : ""}`}
              onClick={() => setOpenFaqIndex(openFaqIndex === 1 ? null : 1)}
            >
              <div className="faq-question">
                <span>
                  Bisakah saya menjadi Brand Owner setelah bergabung di
                  SolvImport?
                </span>
                <svg
                  className="faq-icon"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 9l6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="faq-answer">
                <p>
                  Ya, SolvImport berkomitmen untuk membantu member menjadi Brand
                  Owner yang mandiri. Dengan mengikuti program edukasi secara
                  konsisten dan menerapkan pembelajaran dari mentor, Anda akan
                  memiliki pengetahuan dan jaringan yang diperlukan untuk
                  menjadi pemilik bisnis sendiri.
                </p>
              </div>
            </div>

            <div
              className={`faq-accordion ${openFaqIndex === 2 ? "open" : ""}`}
              onClick={() => setOpenFaqIndex(openFaqIndex === 2 ? null : 2)}
            >
              <div className="faq-question">
                <span>Bisakah saya menggunakan merk sendiri?</span>
                <svg
                  className="faq-icon"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 9l6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="faq-answer">
                <p>
                  Tentu bisa. Penggunaan merk sendiri dapat direalisasikan
                  melalui diskusi dan kesepakatan dengan supplier maupun brand.
                  Namun, perlu diketahui bahwa tidak semua produk atau brand
                  memperbolehkan perubahan merk, tergantung pada kebijakan
                  masing-masing supplier.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="journey" id="pricing">
          <h2>Mulai Perjalanan Bisnis Anda</h2>
          <p className="tag">
            Pengalaman dan pengetahuan eksklusif yang tidak bisa didapatkan di
            tempat lain
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
