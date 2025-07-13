const Timeline = () => {
  const events = [
    {
      time: "July 14, 2025",
      title: "Launch of DeveloperDay.id",
      description:
        "Official announcement and publication of the .id DeveloperDay 2025, inviting innovators across Indonesia to participate.",
      color: "purple",
    },
    {
      time: "July 14 - August 14, 2025",
      title: "Registration Period",
      description: "Participants register their teams",
      color: "blue",
    },
    {
      time: "August 14-24, 2025",
      title: "DeveloperDay Begins",
      description:
        "The official start of the .id DeveloperDay 2025 competition. Participants submit their proposals, and the journey to become one of the top 10 teams begins.",
      color: "pink",
    },
    {
      time: "August 25-26, 2025",
      title: "Proposal Selection Phase",
      description:
        "Judges and mentors evaluate submitted proposals to shortlist the most promising ideas.",
      color: "pink",
    },
    {
      time: "August 26, 2025",
      title: "Announcement of Top 10 Teams",
      description:
        "Top 10 selected teams are announced and will advance to the final DeveloperDay stage.",
      color: "green",
    },
    {
      time: "September 1–2, 2025",
      title: "DeveloperDay.id Finals",
      description: "Finalists gather to present their projects on-site.",
      color: "purple",
    },
  ];

  return (
    <section className="py-20 px-4 relative" id="timeline">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-6">
            Event Timeline
          </h2>
          <p className="text-xl text-gray-300">Your journey to innovation</p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-purple-400 via-blue-400 to-pink-400"></div>

          <div className="space-y-8">
            {events.map((event, index) => (
              <div
                key={index}
                className={`relative flex items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } flex-col md:flex-row`}
              >
                {/* Timeline dot */}
                <div
                  className={`absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-${event.color}-400 rounded-full border-4 border-gray-900 z-10`}
                ></div>

                {/* Content */}
                <div
                  className={`w-full md:w-1/2 ${
                    index % 2 === 0
                      ? "md:pr-8 ml-12 md:ml-0"
                      : "md:pl-8 ml-12 md:ml-0"
                  }`}
                >
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-400/50 transition-all duration-300">
                    <div
                      className={`text-${event.color}-400 font-semibold mb-2`}
                    >
                      {event.time}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {event.title}
                    </h3>
                    <p className="text-gray-300">{event.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
