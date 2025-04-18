import { Link } from "wouter";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/">
          <a className="flex items-center space-x-2">
            <i className="ri-video-upload-line text-2xl text-primary"></i>
            <h1 className="text-xl font-semibold">VideoShare</h1>
          </a>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/">
                <a className="text-gray-600 hover:text-primary transition-colors">Home</a>
              </Link>
            </li>
            <li>
              <Link href="/#recent-videos">
                <a className="text-gray-600 hover:text-primary transition-colors">My Videos</a>
              </Link>
            </li>
            <li>
              <Link href="/#features">
                <a className="text-gray-600 hover:text-primary transition-colors">Help</a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
