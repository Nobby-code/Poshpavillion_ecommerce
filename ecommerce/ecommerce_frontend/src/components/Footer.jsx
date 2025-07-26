// import React from 'react'
// import { FaInstagram, FaWhatsapp, FaEnvelope } from 'react-icons/fa'

// const Footer = () => {
//   return (
//     <footer style={{ position: 'relative', height: '300px', overflow: 'hidden' }}>
//       {/* Background Image */}
//       <div
//         style={{
//           backgroundImage: `url('/images/footer-bg.jpg')`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           height: '100%',
//           width: '100%',
//           zIndex: 0,
//         }}
//       />

//       {/* Dark Overlay */}
//       <div
//         style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           height: '100%',
//           width: '100%',
//           backgroundColor: 'rgba(0, 0, 0, 0.6)',
//           zIndex: 1,
//         }}
//       />

//       {/* Footer Content */}
//       <div
//         style={{
//           position: 'relative',
//           zIndex: 2,
//           // color: 'white',
//           padding: '40px 20px',
//           textAlign: 'center',
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//         }}
//       >
//         <h4 style={{ fontSize: '1.5rem', margin: 0 }}>Poshpavillion Fashion Store</h4>
//         <p style={{ margin: '10px 0' }}>
//           Discover your unique style with our elegant collections.
//         </p>

//         {/* Icons */}
//         <div
//           style={{
//             marginTop: '20px',
//             display: 'flex',
//             gap: '20px',
//             justifyContent: 'center',
//             flexWrap: 'wrap',
//             fontSize: '24px',
//           }}
//         >
//           <a
//             href="https://wa.me/254712345678"
//             target="_blank"
//             rel="noopener noreferrer"
//             style={{ color: 'white' }}
//           >
//             <FaWhatsapp />
//           </a>
//           <a
//             href="https://instagram.com/yourstore"
//             target="_blank"
//             rel="noopener noreferrer"
//             style={{ color: 'white' }}
//           >
//             <FaInstagram />
//           </a>
//           <a
//             href="mailto:info@poshpavillion.com"
//             style={{ color: 'white' }}
//           >
//             <FaEnvelope />
//           </a>
//         </div>

//         {/* Copyright */}
//         <div style={{ marginTop: '30px', fontSize: '14px' }}>
//           <p style={{ margin: '5px 0' }}>
//             © {new Date().getFullYear()} Poshpavillion. All rights reserved.
//           </p>
//           <p style={{ margin: 0 }}>
//             <a href="/privacy" style={{ color: 'white', marginRight: '10px' }}>
//               Privacy Policy
//             </a>
//             |
//             <a href="/terms" style={{ color: 'white', marginLeft: '10px' }}>
//               Terms of Service
//             </a>
//           </p>
//         </div>
//       </div>
//     </footer>
//   )
// }

// export default Footer

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaFacebook,
  FaPhoneAlt,
  FaTwitter,
  FaWhatsapp,
  FaInstagram,
  FaTiktok,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      {/* <div>
        <h4>Poshpavillion Fashion Store</h4>
        <p>© {new Date().getFullYear()} All rights reserved.</p>
      </div> */}
      <div className="row">
        {/* Address & Contact */}
        <div className="col-md-4 mb-4" >
          {/* <h5 className="text-uppercase mb-3">Contact Us</h5>
          <p>Afya Center,</p>
          <p>Third Floor, Room XXX</p>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dark d-block mb-2"
          >
            Show on map
          </a> */}
          {/* <p>Need help? Call or WhatsApp:</p>
          <p>
            <strong>+254 758 549 135</strong>
          </p> */}
          <Row>
            <Col
              className="text-center py-3"
              style={{ borderRight: "2px solid #ccc" }}
            >
              <h5 className="text-uppercase mb-3">Contact Us</h5>
              <p>Afya Center,</p>
              <p>Third Floor, Room XXX</p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark d-block mb-2"
              >
                Show on map
              </a>
              <div className="mb-3">
                <Link
                  className="text-decoration-none text-dark me-3"
                  to="https://wa.me/254713627939"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp />
                </Link>
                {/* <Link className="text-decoration-none text-dark me-3" to="/contact">     */}
                {/* <Link ><FaFacebook /></Link> */}
                <Link
                  className="text-decoration-none text-dark me-3"
                  to="/about"
                >
                  <FaFacebook />
                </Link>
                {/* <Link ><FaTwitter /></Link> */}
                <Link
                  className="text-decoration-none text-dark me-3"
                  to="/about"
                >
                  <FaTwitter />
                </Link>
                <Link
                  className="text-decoration-none text-dark me-3"
                  to="/about"
                >
                  <FaInstagram />
                </Link>
                <Link
                  className="text-decoration-none text-dark me-3"
                  to="/about"
                >
                  <FaTiktok />
                </Link>
              </div>
            </Col>
          </Row>
          {/* <p>
            Mon–Fri: 9:00–18:00
            <br />
            Sat: 09:00–17:00
          </p>
          <p>
            Email:{" "}
            <a
              href="mailto:info@futuretechcomputers.co.ke"
              className="text-light"
            >
              info@futuretechcomputers.co.ke
            </a>
          </p> */}
        </div>

        {/* Social Media */}
        <div className="col-md-2 mb-4">
          <h5 className=" mb-3">Need help?</h5>
          <div className="gap-3">
            <br />
            <a
              href="tel:+254758543195"
              className="text-decoration-none text-dark fw-bold fs-5"
            >
              <FaPhoneAlt
                style={{ color: "#eab676", fontSize: "30px", padding: "6px" }}
              />
              +254 13627939
            </a>
            <p style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
              Mon–Fri: 9:00–18:00
              <br />
              Sat: 09:00–17:00
            </p>
            <p>
              <FaEnvelope
                className="me-1"
                style={{ color: "#eab676", fontSize: "30px", padding: "6px" }}
              />
              {"info@poshpavillion.co.ke "}
              <a href="mailto: " className="text-decoration-none text-dark"></a>
            </p>
          </div>
        </div>

        {/* Information Links */}
        <div className="col-md-2 mb-4">
          <h5 className="text-uppercase mb-3">Quick links</h5>
          <ul className="list-unstyled">
            <li>
              <a href="/cart" className="text-dark">
                My Cart
              </a>
            </li>
            <li>
              <a href="#" className="text-dark">
                Refund Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-dark">
                About us
              </a>
            </li>
            <li>
              <a href="#" className="text-dark">
                Delivery
              </a>
            </li>
          </ul>
        </div>

        {/* My Account Links */}
        <div className="col-md-2 mb-4">
          <h4 className="text-uppercase mb-3">Make Payments Easily</h4>
          <p>You can pay through paybill, M-Pesa, or cash on delivery.</p>
          <h5>Paybill No: 247247</h5>
          <p>Account No: 123456</p>
        </div>
      </div>
      <Container>
        <div className="bg-light text-dark py-5">
          <Row>
            <Col className="text-center py-3">
              <div className="mb-3">
                <Link
                  className="text-decoration-none text-dark me-3"
                  to="https://wa.me/254713627939"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp />
                </Link>
                {/* <Link className="text-decoration-none text-dark me-3" to="/contact">     */}
                {/* <Link ><FaFacebook /></Link> */}
                <Link
                  className="text-decoration-none text-dark me-3"
                  to="/about"
                >
                  <FaFacebook />
                </Link>
                {/* <Link ><FaTwitter /></Link> */}
                <Link
                  className="text-decoration-none text-dark me-3"
                  to="/about"
                >
                  <FaTwitter />
                </Link>
                <Link
                  className="text-decoration-none text-dark me-3"
                  to="/about"
                >
                  <FaInstagram />
                </Link>
                <Link
                  className="text-decoration-none text-dark me-3"
                  to="/about"
                >
                  <FaTiktok />
                </Link>
              </div>
              <div className="mb-3">
                {/* <a href="tel:+254712345678" className="text-decoration-none text-dark me-3">
              <FaPhoneAlt /> +254 712345678 </a> */}
                <h5>Poshpavillion Fashion Store</h5>
                <h6>© {new Date().getFullYear()} All rights reserved.</h6>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
