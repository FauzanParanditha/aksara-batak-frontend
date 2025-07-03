const About = () => {
  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-6">
            About the Event
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The ultimate playground for innovators, creators, and
            problem-solvers
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
              <h3 className="text-2xl font-bold text-purple-400 mb-3">
                Innovation Unleashed
              </h3>
              <p className="text-gray-300">
                Dive into 48 hours of non-stop coding, where groundbreaking
                ideas come to life. Our hackathon brings together the brightest
                minds to solve real-world challenges.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20">
              <h3 className="text-2xl font-bold text-blue-400 mb-3">
                Collaborative Spirit
              </h3>
              <p className="text-gray-300">
                Form teams, share knowledge, and build lasting connections with
                fellow developers, designers, and entrepreneurs from around the
                globe.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-pink-500/20">
              <h3 className="text-2xl font-bold text-pink-400 mb-3">
                Learning & Growth
              </h3>
              <p className="text-gray-300">
                Access workshops, mentorship sessions, and cutting-edge
                technologies. Whether you're a beginner or expert, there's
                something for everyone.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-white/10 rounded-2xl p-4">
                  <div className="text-3xl font-bold text-purple-400">500+</div>
                  <div className="text-gray-300">Participants</div>
                </div>
                <div className="bg-white/10 rounded-2xl p-4">
                  <div className="text-3xl font-bold text-blue-400">48</div>
                  <div className="text-gray-300">Hours</div>
                </div>
                <div className="bg-white/10 rounded-2xl p-4">
                  <div className="text-3xl font-bold text-pink-400">$50K</div>
                  <div className="text-gray-300">Prize Pool</div>
                </div>
                <div className="bg-white/10 rounded-2xl p-4">
                  <div className="text-3xl font-bold text-green-400">100+</div>
                  <div className="text-gray-300">Projects</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
