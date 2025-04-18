import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl p-8 mb-12 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400 rounded-full opacity-20 -mt-20 -mr-20"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-400 rounded-full opacity-20 -mb-10 -ml-10"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
              <p className="text-blue-100">Get notified about new features and updates to our video platform.</p>
            </div>
            
            <div className="md:w-1/2 w-full">
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="px-4 py-3 rounded-lg flex-grow bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-blue-100 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <Link href="/">
              <a className="flex items-center space-x-2 group mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white">
                  <i className="ri-video-upload-line text-xl"></i>
                </div>
                <div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">VideoShare</h2>
                  <span className="text-xs text-gray-400">Unlimited Video Hosting</span>
                </div>
              </a>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              The simplest way to share your videos online without limits or restrictions. No accounts needed.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1">
                <i className="ri-twitter-fill text-lg"></i>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1">
                <i className="ri-facebook-fill text-lg"></i>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1">
                <i className="ri-instagram-fill text-lg"></i>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1">
                <i className="ri-github-fill text-lg"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-6 text-blue-300">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/">
                  <a className="text-gray-400 hover:text-white transition-colors flex items-center group">
                    <i className="ri-arrow-right-s-line mr-2 text-blue-500 group-hover:translate-x-1 transition-transform"></i>
                    <span>Home</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/#upload-section">
                  <a className="text-gray-400 hover:text-white transition-colors flex items-center group">
                    <i className="ri-arrow-right-s-line mr-2 text-blue-500 group-hover:translate-x-1 transition-transform"></i>
                    <span>Upload Video</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/#recent-videos">
                  <a className="text-gray-400 hover:text-white transition-colors flex items-center group">
                    <i className="ri-arrow-right-s-line mr-2 text-blue-500 group-hover:translate-x-1 transition-transform"></i>
                    <span>My Videos</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/#features">
                  <a className="text-gray-400 hover:text-white transition-colors flex items-center group">
                    <i className="ri-arrow-right-s-line mr-2 text-blue-500 group-hover:translate-x-1 transition-transform"></i>
                    <span>Features</span>
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-6 text-blue-300">Resources</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <i className="ri-arrow-right-s-line mr-2 text-blue-500 group-hover:translate-x-1 transition-transform"></i>
                  <span>Embedding Guide</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <i className="ri-arrow-right-s-line mr-2 text-blue-500 group-hover:translate-x-1 transition-transform"></i>
                  <span>Video Formats</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <i className="ri-arrow-right-s-line mr-2 text-blue-500 group-hover:translate-x-1 transition-transform"></i>
                  <span>Best Practices</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <i className="ri-arrow-right-s-line mr-2 text-blue-500 group-hover:translate-x-1 transition-transform"></i>
                  <span>Help Center</span>
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-6 text-blue-300">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <i className="ri-map-pin-line text-blue-500 mt-1"></i>
                <span className="text-gray-400">San Francisco, CA 94103, United States</span>
              </li>
              <li className="flex items-center space-x-3">
                <i className="ri-mail-line text-blue-500"></i>
                <span className="text-gray-400">support@videoshare.example</span>
              </li>
              <li className="flex items-center space-x-3">
                <i className="ri-phone-line text-blue-500"></i>
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <i className="ri-time-line text-blue-500"></i>
                <span className="text-gray-400">24/7 Support</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Footer bottom */}
        <div className="border-t border-gray-800 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 mb-4 md:mb-0">&copy; {new Date().getFullYear()} VideoShare. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
            <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Cookie Policy</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">DMCA</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
