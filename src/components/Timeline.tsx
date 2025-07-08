const Timeline = () => {
  const events = [
    {
      time: "July 7-11, 2025",
      title: "Launch of .id Hackathon",
      description:
        "Official announcement and publication of the .id Hackathon 2025, inviting innovators across Indonesia to participate.",
      color: "purple",
    },
    {
      time: "July 7–11, 2025",
      title: "Registration Period",
      description:
        "Participants register and submit their initial proposals to join the hackathon.",
      color: "blue",
    },
    {
      time: "July 7 - August 15, 2025",
      title: "Hacking Begins",
      description:
        "Judges and mentors evaluate submitted proposals to shortlist the most promising ideas.",
      color: "pink",
    },
    {
      time: "August 18–22, 2025",
      title: "Proposal Selection Phase",
      description:
        "Judges and mentors evaluate submitted proposals to shortlist the most promising ideas.",
      color: "pink",
    },
    {
      time: "August 25, 2025",
      title: "Announcement of Top 10 .id Hackathon Teams",
      description:
        "Top 10 selected teams are announced and will advance to the final hackathon stage.",
      color: "green",
    },
    {
      time: "September 2–3, 2025",
      title: ".id Hackathon Day",
      description: "Finalists gather presentation their projects on-site.",
      color: "purple",
    },
    {
      time: "September 4, 2025",
      title: "Project Presentations & Winner Announcement",
      description:
        "Each team presents their final product to the jury panel. Winners of the .id Hackathon 2025 are officially announced.",
      color: "blue",
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
