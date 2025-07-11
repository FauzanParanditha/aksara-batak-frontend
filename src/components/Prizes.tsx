import Image from "next/image";

const Prizes = () => {
  const prizes = [
    {
      // place: "2nd Place",
      amount: "IDR 20,000,000",
      description: "Runner-up prize",
      color: "from-gray-300 to-gray-500",
      icon: "🥈",
      features: [
        "Certificate, Merchandise",
        "Coaching & mentoring sessions",
        "Represent Indonesia at APICTA 2025 in Taipei",
      ],
      position: "second",
    },
    {
      // place: "1st Place",
      amount: "IDR 30,000,000",
      description: "Grand prize",
      color: "from-yellow-400 to-orange-500",
      icon: "/images/icon/trophy.png",
      features: [
        "Certificate, Merchandise",
        "Incubation opportunity",
        "Coaching & mentoring sessions",
        "Represent Indonesia at APICTA 2025 in Taipei",
      ],
      position: "first",
    },
    {
      // place: "3rd Place",
      amount: "IDR 10,000,000",
      description: "Third place",
      color: "from-orange-400 to-red-500",
      icon: "🥉",
      features: [
        "Certificate, Merchandise",
        "Coaching & mentoring sessions",
        "Represent Indonesia at APICTA 2025 in Taipei",
      ],
      position: "third",
    },
  ];

  // const specialPrizes = [
  //   { name: "Best AI Solution", prize: "$2,500", icon: "🤖" },
  //   { name: "Most Innovative", prize: "$2,500", icon: "💡" },
  //   { name: "Best Design", prize: "$2,500", icon: "🎨" },
  //   { name: "People's Choice", prize: "$2,500", icon: "❤️" },
  // ];

  const getPodiumHeight = (position: string) => {
    switch (position) {
      case "first":
        return "h-80"; // Tallest
      case "second":
        return "h-64"; // Medium
      case "third":
        return "h-48"; // Shortest
      default:
        return "h-64";
    }
  };

  const getPodiumOrder = (position: string) => {
    switch (position) {
      case "first":
        return "order-2"; // Center
      case "second":
        return "order-1"; // Left
      case "third":
        return "order-3"; // Right
      default:
        return "order-2";
    }
  };

  return (
    <section className="py-20 px-4 relative" id="prizes">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-6">
            Prizes & Rewards
          </h2>
          <p className="text-xl text-gray-300">
            IDR 60M total prize pool waiting for you
          </p>
        </div>

        {/* Podium Layout */}
        <div className="flex items-end justify-center gap-4 mb-16 max-w-4xl mx-auto">
          {prizes.map((prize, index) => (
            <div
              key={index}
              className={`flex flex-col items-center ${getPodiumOrder(
                prize.position
              )} flex-1 max-w-xs`}
            >
              {/* Winner Card */}
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:border-purple-400/50 transition-all duration-500 transform hover:scale-105 mb-4 w-full group">
                <div className="text-center">
                  {prize.icon.includes("/images") ? (
                    <div className="group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                      <Image
                        src={prize.icon}
                        alt="Logo"
                        width={80}
                        height={80}
                      />
                    </div>
                  ) : (
                    <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">
                      {prize.icon}
                    </div>
                  )}

                  {/* <h3 className="text-xl font-bold text-white mb-2">
                    {prize.place}
                  </h3> */}

                  <div
                    className={`text-3xl font-bold bg-gradient-to-r ${prize.color} bg-clip-text text-transparent mb-3`}
                  >
                    {prize.amount}
                  </div>

                  <p className="text-gray-300 text-sm mb-4">
                    {prize.description}
                  </p>

                  <div className="space-y-1">
                    {prize.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-center gap-2 text-gray-400 text-sm"
                      >
                        <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Podium Step */}
              <div
                className={`w-full ${getPodiumHeight(
                  prize.position
                )} bg-gradient-to-t from-purple-500/20 to-blue-500/20 rounded-t-2xl border border-white/10 border-b-0 relative overflow-hidden`}
              >
                {/* Podium Surface */}
                <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-r from-purple-500/30 to-blue-500/30 border-b border-white/20"></div>

                {/* Position Number */}
                {/* <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className={`text-6xl font-bold bg-gradient-to-r ${prize.color} bg-clip-text `}
                  >
                    {prize.position === "first"
                      ? "1"
                      : prize.position === "second"
                      ? "2"
                      : "3"}
                  </div>
                </div> */}

                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Podium Base */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="h-12 bg-gradient-to-r from-purple-600/30 via-blue-600/30 to-purple-600/30 rounded-b-3xl border border-white/10 border-t-0 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-white/60 font-bold text-lg">
              🎉 WINNERS PODIUM 🎉
            </div>
          </div>
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
