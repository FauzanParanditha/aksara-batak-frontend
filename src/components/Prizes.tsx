const Prizes = () => {
  const prizes = [
    {
      place: "1st Place",
      amount: "IDR 30,000,000",
      description: "Grand prize",
      color: "from-yellow-400 to-orange-500",
      icon: "🏆",
      features: [
        "Certificate, Merchandise",
        "Incubation opportunity",
        "Coaching & mentoring sessions",
        "Represent Indonesia at APICTA 2025 in Taipei",
      ],
    },
    {
      place: "2nd Place",
      amount: "IDR 15,000,000",
      description: "Runner-up prize",
      color: "from-gray-300 to-gray-500",
      icon: "🥈",
      features: [
        "Certificate, Merchandise",
        "Coaching & mentoring sessions",
        "Represent Indonesia at APICTA 2025 in Taipei",
      ],
    },
    {
      place: "3rd Place",
      amount: "IDR 10,000,000",
      description: "Third place",
      color: "from-orange-400 to-red-500",
      icon: "🥉",
      features: [
        "Certificate, Merchandise",
        "Coaching & mentoring sessions",
        "Represent Indonesia at APICTA 2025 in Taipei",
      ],
    },
  ];

  // const specialPrizes = [
  //   { name: "Best AI Solution", prize: "$2,500", icon: "🤖" },
  //   { name: "Most Innovative", prize: "$2,500", icon: "💡" },
  //   { name: "Best Design", prize: "$2,500", icon: "🎨" },
  //   { name: "People's Choice", prize: "$2,500", icon: "❤️" },
  // ];

  return (
    <section className="py-20 px-4 relative" id="prizes">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-6">
            Prizes & Rewards
          </h2>
          <p className="text-xl text-gray-300">
            IDR 55M total prize pool waiting for you
          </p>
        </div>

        {/* Main Prizes */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {prizes.map((prize, index) => (
            <div
              key={index}
              className={`relative group ${
                index === 0 ? "md:scale-110 md:-mt-8" : ""
              }`}
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-purple-400/50 transition-all duration-500 transform hover:scale-105 h-full">
                <div className="text-center">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {prize.icon}
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2">
                    {prize.place}
                  </h3>

                  <div
                    className={`text-4xl font-bold bg-gradient-to-r ${prize.color} bg-clip-text text-transparent mb-4`}
                  >
                    {prize.amount}
                  </div>

                  <p className="text-gray-300 mb-6">{prize.description}</p>

                  <div className="space-y-2">
                    {prize.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-center gap-2 text-gray-400"
                      >
                        <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Special Prizes */}
        {/* <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
          <h3 className="text-3xl font-bold text-center text-white mb-8">
            Special Category Awards
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialPrizes.map((special, index) => (
              <div
                key={index}
                className="bg-white/5 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {special.icon}
                </div>
                <h4 className="font-bold text-white mb-2">{special.name}</h4>
                <div className="text-2xl font-bold text-purple-400">
                  {special.prize}
                </div>
              </div>
            ))}
          </div>
        </div> */}

        <div className="text-center mt-12">
          <p className="text-lg text-gray-400 mb-4">
            Plus amazing swag, networking opportunities, and career connections!
          </p>
          <div className="flex justify-center gap-4 text-4xl">
            <span>🎁</span>
            <span>🤝</span>
            <span>🚀</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Prizes;
