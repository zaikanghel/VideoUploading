import { Link } from "wouter";
import { useState } from "react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link href="/">
            <a className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white shadow-md transform group-hover:scale-105 transition-transform">
                <i className="ri-video-upload-line text-xl"></i>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">VideoShare</h1>
                <span className="text-xs text-gray-500">Unlimited Video Hosting</span>
              </div>
            </a>
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <i className={`ri-${isMobileMenuOpen ? 'close' : 'menu'}-line text-xl`}></i>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6 items-center">
              <li>
                <Link href="/">
                  <a className="flex items-center text-gray-700 hover:text-primary transition-colors font-medium">
                    <i className="ri-home-line mr-1"></i>
                    <span>Home</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/#recent-videos">
                  <a className="flex items-center text-gray-700 hover:text-primary transition-colors font-medium">
                    <i className="ri-film-line mr-1"></i>
                    <span>My Videos</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/#features">
                  <a className="flex items-center text-gray-700 hover:text-primary transition-colors font-medium">
                    <i className="ri-question-line mr-1"></i>
                    <span>Help</span>
                  </a>
                </Link>
              </li>
              <li>
                <a 
                  href="#upload-section"
                  className="bg-primary hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center"
                >
                  <i className="ri-upload-cloud-2-line mr-1"></i>
                  <span>Upload</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 border-t pt-4">
            <ul className="flex flex-col space-y-4">
              <li>
                <Link href="/">
                  <a className="flex items-center text-gray-700 hover:text-primary transition-colors font-medium">
                    <i className="ri-home-line mr-2 text-lg"></i>
                    <span>Home</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/#recent-videos">
                  <a className="flex items-center text-gray-700 hover:text-primary transition-colors font-medium">
                    <i className="ri-film-line mr-2 text-lg"></i>
                    <span>My Videos</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/#features">
                  <a className="flex items-center text-gray-700 hover:text-primary transition-colors font-medium">
                    <i className="ri-question-line mr-2 text-lg"></i>
                    <span>Help</span>
                  </a>
                </Link>
              </li>
              <li>
                <a 
                  href="#upload-section"
                  className="bg-primary hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center w-full justify-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <i className="ri-upload-cloud-2-line mr-2 text-lg"></i>
                  <span>Upload Video</span>
                </a>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
