const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div>
              <h2 className="text-xl font-bold">YourLogo</h2>
              <p className="mt-2 text-sm text-gray-400">
                Building awesome experiences for the web.
              </p>
            </div>
  
            {/* Company Links */}
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase">Company</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Press</a></li>
              </ul>
            </div>
  
            {/* Support Links */}
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase">Support</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
  
            {/* Social Media */}
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase">Follow Us</h3>
              <div className="mt-4 flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    {/* Facebook Icon */}
                    <path d="M22 12.07C22 6.55 17.52 2 12 2S2 6.55 2 12.07c0 5 3.66 9.13 8.44 9.93v-7.03h-2.54v-2.9h2.54V9.41c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.77l-.44 2.9h-2.33V22c4.78-.8 8.44-4.93 8.44-9.93z" />
                  </svg>
                </a>
                {/* Add more icons here if needed */}
              </div>
            </div>
          </div>
  
          <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
            &copy; 2025 Your Company, Inc. All rights reserved.
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  