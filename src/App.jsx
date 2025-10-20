import { useState } from "react";
import "./App.css";

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

  return (
    <div className="page-root">
      <header className="site-header">
        <div className="left">
          <button
            className="dots"
            onClick={() => setShowMenu((s) => !s)}
            aria-label="menu"
          >
            ⋯
          </button>
          {showMenu && (
            <div className="menu-pop">
              <a href="#dashboard">Dashboard</a>
              <a href="#affiliate">Affiliate Program (Komisi 16%)</a>
              <a href="#contact">Contact Admin</a>
            </div>
          )}
          <span className="brand">SolvImport</span>
        </div>
        <div className="right">
          <button
            className="btn btn-ghost"
            onClick={() => setShowRegister(true)}
          >
            Daftar
          </button>
          <button className="btn" onClick={() => setShowLogin(true)}>
            Login
          </button>
        </div>
      </header>

      <main>
        <section className="hero">
          <h1>Selamat Datang Di SolvImport</h1>
          <p className="subtitle">
            Tempat dimana kamu bisa berkembang dan maju
          </p>

          <div className="description-card">
            <p className="desc-title">SolvImport</p>
            <p className="desc">
              SolvImport merupakan sebuah wadah yang menjadikan anak muda, serta
              orang tua menjadi seorang pengusaha dan tempat yang menghubungkan
              Pengusaha tersebut dengan semua hal yang dibutuhkan untuk memulai
              untuk menjadi seorang Pengusaha — mulai dari Edukasi, alat tempur
              untuk menjadi bekal memulai usaha, jaringan dan mendapatkan
              informasi bermacam-macam supplier.
            </p>

            <div className="community-cta">
              <button className="icon-btn" title="Gabung Komunitas (berbayar)">
                🔒 Grup Komunitas
              </button>
              <p className="muted">
                Icon dapat diklik setelah membayar kelas tersebut.
              </p>
            </div>

            <div className="partners">
              <p>
                “Kami Telah berkerjasama dengan berbagai supplier di Luar
                Negeri”
              </p>
              <button className="btn btn-link">
                Cek Fasilitas & Benefit yang kami berikan ⌄
              </button>
            </div>
          </div>
        </section>

        <section className="features">
          <h2>Fasilitas ketika sudah menjadi member</h2>
          <div className="features-grid">
            <div className="feature">
              1. Edukasi secara berurutan sampai menjadi pengusaha yang expert.
            </div>
            <div className="feature">
              2. Akses jaringan supplier tangan pertama diluar negeri.
            </div>
            <div className="feature">
              3. Edukasi melalui Google Meet atau Zoom.
            </div>
            <div className="feature">4. Edukasi melalui Whatsapp.</div>
            <div className="feature">5. E-Sertifikat.</div>
            <div className="feature">6. Free Merchandise SolvImport.</div>
            <div className="feature">7. Akses Kemitraan Khusus.</div>
            <div className="feature">8. Modul Bisnis Basic-Expert.</div>
            <div className="feature">9. Akses Webinar setiap Batch gratis.</div>
            <div className="feature">
              10. Cashback hingga ratusan ribu hingga jutaan disetiap
              pembelanjaan.
            </div>
            <div className="feature">11. Akses Komunitas seumur hidup.</div>
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
              <div className="price-title">Basic</div>
              <div className="price-duration">Akses 3 Bulan</div>
              <div className="price-old">699k</div>
              <div className="price-new">299k</div>
              <button className="btn">Pilih Basic</button>
            </div>

            <div className="price-card popular">
              <div className="price-title">Intermediate</div>
              <div className="price-duration">Akses 6 Bulan</div>
              <div className="price-old">999k</div>
              <div className="price-new">499k</div>
              <button className="btn">Pilih Intermediate</button>
            </div>

            <div className="price-card">
              <div className="price-title">Advance</div>
              <div className="price-duration">Akses Life Time</div>
              <div className="price-old">1.999k</div>
              <div className="price-new">999k</div>
              <button className="btn">Pilih Advance</button>
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
            <button className="btn btn-google">Lanjutkan dengan Google</button>
            <div className="divider">atau</div>
            <input placeholder="Alamat Email" />
            <input placeholder="Kata sandi" type="password" />
            <button className="btn">Lanjutkan</button>
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
