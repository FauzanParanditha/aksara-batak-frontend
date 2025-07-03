const Timeline = () => {
  const events = [
    {
      time: "March 15, 6:00 PM",
      title: "Opening Ceremony",
      description:
        "Welcome reception, team formation, and problem statement reveal",
      color: "purple",
    },
    {
      time: "March 15, 8:00 PM",
      title: "Hacking Begins",
      description: "48 hours of intensive coding and innovation starts now!",
      color: "blue",
    },
    {
      time: "March 16, 10:00 AM",
      title: "Workshop Sessions",
      description:
        "Technical workshops on AI, blockchain, and emerging technologies",
      color: "pink",
    },
    {
      time: "March 16, 2:00 PM",
      title: "Mentor Check-ins",
      description: "One-on-one sessions with industry experts and advisors",
      color: "green",
    },
    {
      time: "March 17, 6:00 AM",
      title: "Final Sprint",
      description:
        "Last 12 hours to polish your project and prepare presentation",
      color: "orange",
    },
    {
      time: "March 17, 6:00 PM",
      title: "Project Submissions",
      description: "Submit your final project and demo video",
      color: "red",
    },
    {
      time: "March 17, 8:00 PM",
      title: "Awards Ceremony",
      description: "Project presentations, judging, and winner announcements",
      color: "purple",
    },
  ];

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-6">
            Event Timeline
          </h2>
          <p className="text-xl text-gray-300">
            Your 48-hour journey to innovation
          </p>
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
