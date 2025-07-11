const About = () => {
  return (
    <section className="py-20 px-4 relative" id="about">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-6">
            About the Event
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Advancing national digital collaboration for a sovereign future.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-gray-300">
            {/* National Digital Empowerment */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
              <h3 className="text-2xl font-bold text-purple-400 mb-3">
                National Digital Empowerment
              </h3>
              <p>
                To strengthen Indonesia’s digital ecosystem, PANDI is launching{" "}
                <strong>.idFest 2025</strong> as a center of excellence for
                Indonesian digital innovation. This initiative brings together
                stakeholders from the public sector, private industry,
                communities, and academia.
              </p>
            </div>

            {/* Strategic Collaboration & Digital Literacy */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20">
              <h3 className="text-2xl font-bold text-blue-400 mb-3">
                Strategic Collaboration & Digital Literacy
              </h3>
              <p>
                The event aims to become a strategic collaboration platform for
                enhancing digital literacy and promoting the use of the{" "}
                <strong>.id</strong> domain as a core element of digital
                identity aligned with national sovereignty.
              </p>
            </div>

            {/* Driving Innovation through .id Hackathon */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-pink-500/20">
              <h3 className="text-2xl font-bold text-pink-400 mb-3">
                Driving Innovation through .id DeveloperDay
              </h3>
              <p>
                As part of the .idFest 2025 series, the{" "}
                <strong>.id DeveloperDay</strong> encourages digital innovation
                and fosters collaboration among Indonesia’s tech talents. It
                serves as a platform for developers, designers, and young
                innovators to showcase their best ideas and build impactful,
                relevant solutions in response to the country’s accelerating
                digital transformation.
              </p>
            </div>
          </div>

          {/* Statistics */}
          <div className="relative">
            <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-white/10 rounded-2xl p-4">
                  <div className="text-3xl font-bold text-purple-400">500+</div>
                  <div className="text-gray-300">Participants</div>
                </div>
                <div className="bg-white/10 rounded-2xl p-4">
                  <div className="text-3xl font-bold text-blue-400">10</div>
                  <div className="text-gray-300">Days</div>
                </div>
                <div className="bg-white/10 rounded-2xl p-4">
                  <div className="text-3xl font-bold text-pink-400">
                    IDR 60M
                  </div>
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
