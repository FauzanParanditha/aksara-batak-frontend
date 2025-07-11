import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle,
  Clock,
  FileText,
  Shield,
  Target,
  Trophy,
  Users,
} from "lucide-react";
import Link from "next/link";

const datas = [
  "Title Slide (Innovation Name)",
  "Problem Statement",
  "Target Users & Market",
  "Proposed Solution",
  "Key Features & Tech Stack",
  "Screenshots or Product Demo (optional link)",
  "Competitive Advantage",
  " Current Status & Development Plan",
  " Business Model",
  "Impact Plan",
  "Roadmap & Future Direction",
  "Team Profile & Contact",
  "References",
];

const RulesGuidelines = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8" id="rules">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Competition Rules & Guidelines
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to know to participate in DeveloperDay. Please
            read through all guidelines carefully.
          </p>
        </div>

        {/* Rules Accordion */}
        <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
          <CardContent className="p-8">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {/* Registration */}
              <AccordionItem
                value="registration"
                className="border border-white/10 rounded-lg bg-white/5 backdrop-blur-sm"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline group">
                  <div className="flex items-center space-x-4 text-left">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white group-hover:text-purple-300 transition-colors">
                        Registration Requirements
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Eligibility and team formation guidelines
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-2">
                  <div className="space-y-4 text-gray-300">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <p>Each team may consist of up to 3 members.</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <p>
                        Registration fee: IDR 200,000 per team. Registration
                        via:{" "}
                        <Link
                          href={"https://developerday.id"}
                          className="text-blue-400 hover:underline"
                        >
                          https://developerday.id before deadline.
                        </Link>
                        video
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <p>Include demo via s.id shortlink.</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <p>Only one proposal per team.</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <p>
                        Projects must not have won or been published before.
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <p>
                        Projects must be in development phase (not just an
                        idea).
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <p>
                        Provide accurate registration info, or risk
                        disqualification.
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <p>Teams may represent institutions or individuals.</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <p>Team members can come from different backgrounds.</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Deadlines */}
              <AccordionItem
                value="deadlines"
                className="border border-white/10 rounded-lg bg-white/5 backdrop-blur-sm"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline group">
                  <div className="flex items-center space-x-4 text-left">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white group-hover:text-pink-300 transition-colors">
                        Important Deadlines
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Key dates and submission timelines
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-2">
                  <div className="space-y-4 text-gray-300">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <h4 className="font-semibold text-purple-300 mb-2">
                          Registration Phase
                        </h4>
                        <p className="text-sm">
                          <strong>Opens:</strong> July 7, 2025
                        </p>
                        <p className="text-sm">
                          <strong>Closes:</strong> July 11, 2025
                        </p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <h4 className="font-semibold text-pink-300 mb-2">
                          Competition Period
                        </h4>
                        <p className="text-sm">
                          <strong>Start:</strong> July 7, 2025
                        </p>
                        <p className="text-sm">
                          <strong>End:</strong> August 15, 2025
                        </p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <h4 className="font-semibold text-blue-300 mb-2">
                          Submission Deadline
                        </h4>
                        <p className="text-sm">
                          <strong>Final Deadline:</strong> August 16, 2025
                        </p>
                        <p className="text-xs text-gray-400">
                          No extensions will be granted
                        </p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <h4 className="font-semibold text-green-300 mb-2">
                          Results
                        </h4>
                        <p className="text-sm">
                          <strong>Judging:</strong> August 18-22, 2025
                        </p>
                        <p className="text-sm">
                          <strong>Winners:</strong> August 25-29, 2025
                        </p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Paper Submission */}
              <AccordionItem
                value="submission"
                className="border border-white/10 rounded-lg bg-white/5 backdrop-blur-sm"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline group">
                  <div className="flex items-center space-x-4 text-left">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors">
                        Submission Instructions
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Project deliverables and submission format
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-2">
                  <div className="space-y-6 text-gray-300">
                    <div>
                      <h4 className="font-semibold text-blue-300 mb-3">
                        Structure
                      </h4>
                      <div className="space-y-3">
                        {datas.map((item, index) => (
                          <div
                            className="flex items-start space-x-3"
                            key={index}
                          >
                            <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <p>{item}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <h4 className="font-semibold text-cyan-300 mb-2">
                        Submission Format
                      </h4>
                      <p className="text-sm">• Language English</p>
                      <p className="text-sm">
                        • PDF with demo video shortlink (s.id)
                      </p>
                      <p className="text-sm">• Max 15 pages</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="output"
                className="border border-white/10 rounded-lg bg-white/5 backdrop-blur-sm"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline group">
                  <div className="flex items-center space-x-4 text-left">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white group-hover:text-green-300 transition-colors">
                        Expected Output
                      </h3>
                      <p className="text-gray-400 text-sm">
                        What judges expect from your project
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-2">
                  <div className="space-y-6 text-gray-300">
                    <div>
                      {/* <h4 className="font-semibold text-green-300 mb-3">
                        Technical Requirements
                      </h4> */}
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <p>
                            Output in the form of digital innovation on develop
                            (not only in concept form) to follow APICTA.
                          </p>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <p>Project has a landing page using domain.id</p>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <p>
                            The proposed innovation must be integrated and
                            increase the value of PANDI products (s.id/e.id)
                          </p>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <p>
                            Have a business plan (Budgeting, long-term plan,
                            user projections)
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <h4 className="font-semibold text-emerald-300 mb-2">
                          Code Quality
                        </h4>
                        <p className="text-sm">
                          Clean, well-documented, and maintainable code with
                          proper version control practices.
                        </p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <h4 className="font-semibold text-teal-300 mb-2">
                          Documentation
                        </h4>
                        <p className="text-sm">
                          Clear README, API documentation, and setup
                          instructions for easy project reproduction.
                        </p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Judging Criteria */}
              <AccordionItem
                value="judging"
                className="border border-white/10 rounded-lg bg-white/5 backdrop-blur-sm"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline group">
                  <div className="flex items-center space-x-4 text-left">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white group-hover:text-orange-300 transition-colors">
                        Judging Criteria
                      </h3>
                      <p className="text-gray-400 text-sm">
                        How projects will be evaluated
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-2">
                  <div className="space-y-6 text-gray-300">
                    <div>
                      {/* <h4 className="font-semibold text-green-300 mb-3">
                        Technical Requirements
                      </h4> */}
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <p>Uniqueness</p>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <p>Proof of concept</p>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <p>Functionalities/features</p>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <p>Product quality</p>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <p>Presentation</p>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <p>Impact</p>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <p>Innovation</p>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <p>Commercial potential</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Intellectual Property */}
              <AccordionItem
                value="ip"
                className="border border-white/10 rounded-lg bg-white/5 backdrop-blur-sm"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline group">
                  <div className="flex items-center space-x-4 text-left">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white group-hover:text-cyan-300 transition-colors">
                        Intellectual Property
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Rights, ownership, and usage terms
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-2">
                  <div className="space-y-4 text-gray-300">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p>Projects must be original.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <div>IP violations will result in disqualification.</div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p>
                          Organizer may publish or promote submitted works with
                          credit.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p>
                          Open source usage allowed with proper attribution.
                        </p>
                      </div>
                    </div>
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mt-4">
                      <h4 className="font-semibold text-yellow-300 mb-2">
                        Important Note
                      </h4>
                      <p className="text-sm">
                        Projects using proprietary or copyrighted materials
                        without permission will be disqualified. When in doubt,
                        contact our support team before submission.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default RulesGuidelines;
