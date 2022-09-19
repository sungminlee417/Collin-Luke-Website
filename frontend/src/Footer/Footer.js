import "./Footer.css";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <section className="footer-section content-margin">
      <div className="footer-content">
        <div className="footer-copyright">&copy; {year} Muse Duo</div>
        <div className="social-media-links">
          <a
            target="_blank"
            href="https://www.youtube.com/channel/UCx_i6ym655rtGxqCg6d27ew"
            className="social-media-link"
          >
            <i class="fa-brands fa-youtube fa-3x"></i>
          </a>
          <a
            target="_blank"
            href="https://www.instagram.com/muse__duo/"
            className="social-media-link"
          >
            <i class="fa-brands fa-instagram fa-3x"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Footer;
