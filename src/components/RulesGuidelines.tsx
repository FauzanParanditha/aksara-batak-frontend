import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Clock, FileText, Shield, Upload } from "lucide-react";
import Link from "next/link";

const RulesGuidelines = () => {
  const sections = [
    {
      id: "registration",
      title: "Registration",
      icon: <FileText className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <div>
            <ul className="space-y-2 text-gray-300">
              <li>• Each team may consist of up to 3 members.</li>
              <li>
                • Registration fee: IDR 200,000 per team. Registration via:{" "}
                <Link href={"https://domain.id/idfest2025/hackathon"}>
                  https://domain.id/idfest2025/hackathon before deadline.
                </Link>
                video
              </li>
              <li>• Include demo via s.id shortlink.</li>
              <li>• Only one proposal per team.</li>
              <li>• Projects must not have won or been published before.</li>
              <li>
                • Projects must be in development phase (not just an idea).
              </li>
              <li>
                • Provide accurate registration info, or risk disqualification.
              </li>
              <li>• Teams may represent institutions or individuals.</li>
              <li>• Team members can come from different backgrounds.</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "deadlines",
      title: "Deadlines",
      icon: <Clock className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
              <h4 className="font-semibold text-purple-400 mb-2">
                Registration Deadline
              </h4>
              <p className="text-white text-lg font-bold">August 10, 2025</p>
            </div>
            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
              <h4 className="font-semibold text-blue-400 mb-2">
                Proposal Deadline
              </h4>
              <p className="text-white text-lg font-bold">August 10, 2025</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">
              Important Milestones
            </h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                • <span className="text-purple-400">August 25:</span> Finalists
                Announced via @pandi.id & @domain.id
              </li>
              <li>
                • <span className="text-blue-400">September 2-3:</span> Final
                Presentation Offline pitch in front of judges
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "submission",
      title: "Paper Submission Instructions",
      icon: <Upload className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-white mb-2">
              Submission Requirements
            </h4>
            <ul className="space-y-2 text-gray-300">
              <li>• Language: English</li>
              <li>• Format: PDF with demo video shortlink (s.id)</li>
              <li>• Max 15 pages</li>
              <div className="ml-6">
                <h4 className="font-semibold text-white mb-2">Structure</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>1. Title Slide (Innovation Name)</li>
                  <li>2. Problem Statement</li>
                  <li>3. Target Users & Market</li>
                  <li>4. Proposed Solution</li>
                  <li>5. Key Features & Tech Stack</li>
                  <li>6. Screenshots or Product Demo (optional link)</li>
                  <li>7. Competitive Advantage</li>
                  <li>8. Current Status & Development Plan</li>
                  <li>9. Business Model</li>
                  <li>10. Impact Plan</li>
                  <li>11. Roadmap & Future Direction</li>
                  <li>12. Team Profile & Contact</li>
                  <li>13. References</li>
                </ul>
              </div>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property",
      icon: <Shield className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <div>
            {/* <h4 className="font-semibold text-white mb-2">Ownership Rights</h4> */}
            <ul className="space-y-2 text-gray-300">
              <li>Projects must be original.</li>
              <li>IP violations will result in disqualification.</li>
              <li>
                Organizer may publish or promote submitted works with credit.
              </li>
              <li>Open source usage allowed with proper attribution.</li>
            </ul>
          </div>
          {/* <div className="bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/20">
            <p className="text-yellow-400 text-sm">
              <strong>Note:</strong> Ensure all third-party libraries and assets
              used comply with their respective licenses and are properly
              attributed.
            </p>
          </div> */}
        </div>
      ),
    },
  ];

  return (
    <section className="py-20 px-4 relative" id="rules">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-6">
            Competition Rules & Guidelines
          </h2>
          <p className="text-xl text-gray-300">
            Everything you need to know to participate and succeed
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {sections.map((section) => (
              <AccordionItem
                key={section.id}
                value={section.id}
                className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-purple-400/30 transition-all duration-300"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline group">
                  <div className="flex items-center gap-3 text-left">
                    <div className="text-purple-400 group-hover:text-purple-300 transition-colors">
                      {section.icon}
                    </div>
                    <span className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
                      {section.title}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  {section.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">
            Questions about the rules? Contact us at{" "}
            <a
              href="mailto:rules@hackfuture.com"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              soskom@pandi.id
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default RulesGuidelines;
