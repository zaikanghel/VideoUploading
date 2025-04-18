export default function FeatureSection() {
  // Feature data array for easier management and consistency
  const features = [
    {
      icon: "ri-upload-cloud-2-line",
      title: "No File Size Limits",
      description: "Upload videos of any size without restrictions. No need to compress your content.",
      gradient: "from-blue-500 to-blue-400",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-500",
    },
    {
      icon: "ri-user-line",
      title: "No Account Required",
      description: "Start uploading immediately with no sign-up process. Quick and hassle-free.",
      gradient: "from-indigo-500 to-indigo-400",
      bgColor: "bg-indigo-50",
      iconColor: "text-indigo-500",
    },
    {
      icon: "ri-code-line",
      title: "Easy Embedding",
      description: "Seamlessly integrate your videos into any website with our embed codes.",
      gradient: "from-purple-500 to-purple-400",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-500",
    },
    {
      icon: "ri-video-line",
      title: "High-Quality Playback",
      description: "Enjoy smooth, adaptive video playback optimized for all devices and connection speeds.",
      gradient: "from-cyan-500 to-cyan-400",
      bgColor: "bg-cyan-50",
      iconColor: "text-cyan-500",
    },
    {
      icon: "ri-hard-drive-2-line",
      title: "30-Day Storage",
      description: "Your videos are securely stored for 30 days, giving you plenty of time to share them.",
      gradient: "from-teal-500 to-teal-400",
      bgColor: "bg-teal-50",
      iconColor: "text-teal-500",
    },
    {
      icon: "ri-speed-line",
      title: "Fast Processing",
      description: "Our optimized processing pipeline gets your videos ready to share quickly.",
      gradient: "from-blue-500 to-blue-400",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-500",
    },
  ];

  return (
    <section id="features" className="mb-20 mt-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent inline-block">
          Why Choose VideoShare?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Our platform is designed with simplicity and efficiency in mind, giving you the best video hosting experience.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow transform hover:-translate-y-1 duration-300"
          >
            <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white`}>
                <i className={`${feature.icon} text-2xl`}></i>
              </div>
            </div>
            
            <h3 className="font-bold text-xl mb-3 text-gray-800">{feature.title}</h3>
            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-16 bg-gray-50 rounded-2xl p-10 text-center border border-gray-100 shadow-sm">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Ready to share your videos?</h3>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Start uploading your videos today and experience the simplest way to share your content with the world.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <a 
            href="#upload-section" 
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all shadow-md"
          >
            <i className="ri-upload-cloud-2-line mr-2"></i>
            Upload Your First Video
          </a>
          <a 
            href="#recent-videos" 
            className="px-8 py-3 bg-white text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
          >
            <i className="ri-movie-line mr-2"></i>
            Browse Videos
          </a>
        </div>
      </div>
    </section>
  );
}
