export default function FeatureSection() {
  return (
    <section id="features" className="mb-16">
      <h3 className="text-xl font-semibold mb-8 text-center">Why Choose VideoShare?</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Feature 1 */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-primary mb-4">
            <i className="ri-upload-cloud-2-line text-xl"></i>
          </div>
          <h4 className="font-semibold text-lg mb-2">No File Size Limits</h4>
          <p className="text-gray-600">Upload videos of any size without restrictions. No need to compress your content.</p>
        </div>
        
        {/* Feature 2 */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-primary mb-4">
            <i className="ri-user-line text-xl"></i>
          </div>
          <h4 className="font-semibold text-lg mb-2">No Account Required</h4>
          <p className="text-gray-600">Start uploading immediately with no sign-up process. Quick and hassle-free.</p>
        </div>
        
        {/* Feature 3 */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-primary mb-4">
            <i className="ri-code-line text-xl"></i>
          </div>
          <h4 className="font-semibold text-lg mb-2">Easy Embedding</h4>
          <p className="text-gray-600">Seamlessly integrate your videos into any website with our embed codes.</p>
        </div>
        
        {/* Feature 4 */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-primary mb-4">
            <i className="ri-video-line text-xl"></i>
          </div>
          <h4 className="font-semibold text-lg mb-2">High-Quality Playback</h4>
          <p className="text-gray-600">Enjoy smooth, adaptive video playback optimized for all devices and connection speeds.</p>
        </div>
        
        {/* Feature 5 */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-primary mb-4">
            <i className="ri-hard-drive-2-line text-xl"></i>
          </div>
          <h4 className="font-semibold text-lg mb-2">30-Day Storage</h4>
          <p className="text-gray-600">Your videos are securely stored for 30 days, giving you plenty of time to share them.</p>
        </div>
        
        {/* Feature 6 */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-primary mb-4">
            <i className="ri-speed-line text-xl"></i>
          </div>
          <h4 className="font-semibold text-lg mb-2">Fast Processing</h4>
          <p className="text-gray-600">Our optimized processing pipeline gets your videos ready to share quickly.</p>
        </div>
      </div>
    </section>
  );
}
