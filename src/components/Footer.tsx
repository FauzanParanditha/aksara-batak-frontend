const Footer = () => {
  return (
    <footer className="py-12 px-4 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
              Hack the Future
            </h3>
            <p className="text-gray-400 mb-4 max-w-md">
              The premier hackathon event bringing together innovators,
              creators, and problem-solvers to build tomorrow&apos;s solutions
              today.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
              >
                🐦 Twitter
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
              >
                💼 LinkedIn
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-pink-400 transition-colors duration-300"
              >
                📷 Instagram
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                  href="#"
                  className="hover:text-purple-400 transition-colors duration-300"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-purple-400 transition-colors duration-300"
                >
                  Timeline
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-purple-400 transition-colors duration-300"
                >
                  Prizes
                </a>
              </li>
              <li>
                <a
                  href="#register"
                  className="hover:text-purple-400 transition-colors duration-300"
                >
                  Register
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>📧 soskom@pandi.id</li>
              {/* <li>📱 +1 (555) 123-4567</li> */}
              <li>📍 Tangerang, Indonesia</li>
              {/* <li>💬 Join our Discord</li> */}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 mb-4 md:mb-0">
            © 2025 Hack the Future. All rights reserved.
          </div>
          <div className="flex gap-6 text-gray-400">
            <a
              href="#"
              className="hover:text-purple-400 transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-purple-400 transition-colors duration-300"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="hover:text-purple-400 transition-colors duration-300"
            >
              Code of Conduct
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
