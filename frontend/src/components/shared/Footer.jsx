import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#1f1f2e] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ---- TOP GRID ---- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <div>
            <h2 className="text-2xl font-bold mb-3">About JobPortal</h2>
            <p className="text-sm leading-relaxed text-gray-300">
              JobPortal connects ambitious talent with world‑class companies.
              Search roles, compare employers, and apply in one seamless flow —
              whether you’re a fresh graduate or a seasoned pro.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Quick Links</h2>
            <ul className="space-y-2 text-sm text-gray-300">
              {[
                { to: "/", label: "Home" },
                { to: "/jobs", label: "Find Jobs" },
                { to: "/browse", label: "Browse Companies" },
                { to: "/profile", label: "My Profile" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Legal</h2>
            <ul className="space-y-2 text-sm text-gray-300">
              {[
                { to: "/about", label: "About" },
                { to: "/privacy", label: "Privacy Policy" },
                { to: "/terms", label: "Terms & Conditions" },
                { to: "/contact", label: "Contact Us" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Connect With Us</h2>
            <div className="flex flex-wrap gap-4 sm:gap-3">
              {[
                {
                  href: "https://facebook.com",
                  label: "Facebook",
                  icon: "facebook",
                },
                {
                  href: "https://twitter.com",
                  label: "Twitter",
                  icon: "twitter",
                },
                {
                  href: "https://linkedin.com",
                  label: "LinkedIn",
                  icon: "linkedin",
                },
              ].map((s) => (
                <a
                  key={s.icon}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {s.icon === "facebook" && (
                      <path d="M22.676 0H1.324C.593 0 0 .592 0 1.324v21.352C0 23.408.593 24 1.324 24H12.82V14.706H9.692v-3.578h3.128V8.408c0-3.1 1.893-4.787 4.657-4.787 1.325 0 2.463.1 2.794.144v3.238l-1.918.001c-1.503 0-1.794.715-1.794 1.762v2.31h3.587l-.468 3.578h-3.119V24h6.116C23.407 24 24 23.408 24 22.676V1.324C24 .592 23.407 0 22.676 0z" />
                    )}
                    {s.icon === "twitter" && (
                      <path d="M24 4.557a9.835 9.835 0 01-2.828.775 4.934 4.934 0 002.165-2.724 9.867 9.867 0 01-3.127 1.195 4.924 4.924 0 00-8.38 4.49A13.978 13.978 0 011.67 3.149 4.93 4.93 0 003.16 9.724a4.903 4.903 0 01-2.229-.616v.062a4.93 4.93 0 003.946 4.827 4.902 4.902 0 01-2.224.084 4.93 4.93 0 004.6 3.417A9.869 9.869 0 010 21.543a13.978 13.978 0 007.548 2.212c9.057 0 14.01-7.507 14.01-14.01 0-.213-.004-.425-.015-.636A10.012 10.012 0 0024 4.557z" />
                    )}
                    {s.icon === "linkedin" && (
                      <path d="M20.447 20.452H16.85v-5.569c0-1.327-.027-3.037-1.852-3.037-1.854 0-2.137 1.446-2.137 2.94v5.666H9.147V9.756h3.448v1.464h.05c.48-.91 1.653-1.871 3.401-1.871 3.634 0 4.307 2.39 4.307 5.498v5.605zM5.337 8.29c-1.105 0-2-.896-2-2 0-1.106.895-2 2-2 1.104 0 2 .895 2 2 0 1.104-.896 2-2 2zM7.119 20.452H3.553V9.756h3.566v10.696zM22.225 0H1.771C.791 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451c.979 0 1.771-.774 1.771-1.729V1.729C24 .774 23.205 0 22.225 0z" />
                    )}
                  </svg>
                </a>
              ))}
            </div>
            <p className="text-sm text-gray-400 mt-3 break-all">
              support@jobportal.com
            </p>
          </div>
        </div>

        {/* ---- BOTTOM NOTE ---- */}
        <div className="mt-10 text-center text-sm text-gray-500 border-t border-gray-700 pt-6">
          © 2025 <span className="text-white font-medium">JobPortal</span>. Crafted with <span role="img" aria-label="love">❤️</span> to connect talent with opportunity.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
