const ProblemStatement = () => {
  const challenges = [
    {
      category: "AI & Machine Learning",
      title: "Sustainable Future",
      description:
        "Develop AI solutions to combat climate change and promote sustainability",
      icon: "🤖",
      color: "purple",
    },
    {
      category: "Healthcare Tech",
      title: "Digital Health",
      description:
        "Create innovative healthcare applications to improve patient outcomes",
      icon: "🏥",
      color: "blue",
    },
    {
      category: "Fintech",
      title: "Financial Inclusion",
      description:
        "Build solutions to make financial services accessible to everyone",
      icon: "💰",
      color: "green",
    },
    {
      category: "Education",
      title: "Learning Revolution",
      description:
        "Transform education with technology for better learning experiences",
      icon: "📚",
      color: "pink",
    },
  ];

  return (
    <section className="py-20 px-4 relative" id="problems">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-6 h-[70px]">
            Category
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose your challenge and build solutions that matter
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {challenges.map((challenge, index) => (
            <div
              key={index}
              className="group bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-purple-400/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl"
            >
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {challenge.icon}
              </div>

              <div
                className={`inline-block px-4 py-2 rounded-full bg-${challenge.color}-500/20 text-${challenge.color}-400 text-sm font-semibold mb-4`}
              >
                {challenge.category}
              </div>

              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors duration-300">
                {challenge.title}
              </h3>

              <p className="text-gray-300 text-lg leading-relaxed">
                {challenge.description}
              </p>

              {/* <div className="mt-6 flex items-center text-purple-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>Choose this challenge</span>
                <span className="ml-2 transform group-hover:translate-x-2 transition-transform duration-300">
                  →
                </span>
              </div> */}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-gray-400 mb-6">
            Can&apos;t find your perfect challenge?
          </p>
          <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl p-6 backdrop-blur-sm border border-white/10 max-w-2xl mx-auto">
            <h4 className="text-xl font-bold text-white mb-2">
              Open Innovation Track
            </h4>
            <p className="text-gray-300">
              Build anything that solves a real problem. The sky&apos;s the
              limit for your creativity!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemStatement;
