"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Who can participate in the DeveloperDay?",
      answer:
        "Anyone passionate about technology! Whether you're a student, professional developer, designer, or entrepreneur, you're welcome to join. We encourage diverse teams and skill levels.",
    },
    {
      question: "Do I need to have a team?",
      answer:
        "Of course! You are required to participate as a team, come with a pre-formed team (maximum 3 people)",
    },
    {
      question: "What should I bring?",
      answer:
        "Bring your laptop, chargers, any hardware you might need, and your creativity!",
    },
    {
      question: "Is there a registration fee?",
      answer:
        "To be able to take part in the DeveloperDay participants / teams are required to pay a registration fee of IDR 200,000",
    },
    {
      question: "What technologies can we use?",
      answer:
        "Any technology stack you're comfortable with! We'll have APIs, datasets, and cloud credits available. Popular choices include React, Node.js, Python, mobile frameworks, and emerging tech like AI/ML tools.",
    },
    {
      question: "How are projects judged?",
      answer:
        "Projects are evaluated on innovation, technical implementation, design, and potential impact. Our panel includes industry experts, investors, and technical leaders who will provide valuable feedback.",
    },
    {
      question: "Can I work on an existing project?",
      answer:
        "Projects that have been submitted to other DeveloperDay but have not previously won any prizes are allowed to be reused for this event.",
    },
  ];

  return (
    <section className="py-20 px-4 relative" id="faq">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-300">
            Got questions? We&apos;ve got answers!
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card
              key={index}
              className="bg-white/5 backdrop-blur-sm border-white/10 hover:border-purple-400/50 transition-all duration-300"
            >
              <CardHeader
                className="cursor-pointer"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <CardTitle className="flex justify-between items-center text-white hover:text-purple-400 transition-colors duration-300">
                  <span className="text-left">{faq.question}</span>
                  <span
                    className={`text-2xl transform transition-transform duration-300 ${
                      openIndex === index ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </CardTitle>
              </CardHeader>

              {openIndex === index && (
                <CardContent className="pt-0">
                  <div className="text-gray-300 leading-relaxed animate-fade-in">
                    {faq.answer}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-300 mb-6">
              Our team is here to help! Reach out to us anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:info@eveloperday.id"
                className="text-purple-400 hover:text-purple-300 font-semibold transition-colors duration-300"
              >
                📧 info@eveloperday.id
              </a>
              {/* <a
                href="#"
                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-300"
              >
                💬 Join our Discord
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
