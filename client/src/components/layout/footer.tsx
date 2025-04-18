import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-neutral-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <i className="ri-video-upload-line text-2xl text-primary"></i>
              <h2 className="text-xl font-semibold">VideoShare</h2>
            </div>
            <p className="text-gray-400 mb-4">
              The simplest way to share your videos online without limits or restrictions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <i className="ri-twitter-fill text-lg"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <i className="ri-facebook-fill text-lg"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <i className="ri-instagram-fill text-lg"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <i className="ri-github-fill text-lg"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="text-gray-400 hover:text-primary transition-colors">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/#upload-section">
                  <a className="text-gray-400 hover:text-primary transition-colors">Upload Video</a>
                </Link>
              </li>
              <li>
                <Link href="/#recent-videos">
                  <a className="text-gray-400 hover:text-primary transition-colors">My Videos</a>
                </Link>
              </li>
              <li>
                <Link href="/#features">
                  <a className="text-gray-400 hover:text-primary transition-colors">Help Center</a>
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">Contact Us</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Embedding Guide</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">API Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Video Formats</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Best Practices</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Video Optimization</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Content Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">DMCA</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Acceptable Use</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">&copy; {new Date().getFullYear()} VideoShare. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">Terms</a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
