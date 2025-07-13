import { Button } from "@/components/ui/button";
import { Book, Calendar, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover opacity-40"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40"></div>
      </div>

      {/* Floating Tech Elements */}
      {/* <div className="absolute inset-0 pointer-events-none"> */}
      {/* Code Icon */}
      {/* <div
          className="absolute top-20 left-10 animate-float"
          style={{ animationDelay: "0s" }}
        >
          <Code className="w-8 h-8 text-purple-400/60" />
        </div> */}

      {/* Database Icon */}
      {/* <div
          className="absolute top-32 right-20 animate-float"
          style={{ animationDelay: "1s" }}
        >
          <Database className="w-10 h-10 text-blue-400/60" />
        </div> */}

      {/* Zap Icon */}
      {/* <div
          className="absolute top-1/4 left-1/4 animate-float"
          style={{ animationDelay: "2s" }}
        >
          <Zap className="w-6 h-6 text-yellow-400/60" />
        </div> */}

      {/* CPU Icon */}
      {/* <div
          className="absolute top-1/3 right-1/3 animate-float"
          style={{ animationDelay: "0.5s" }}
        >
          <Cpu className="w-12 h-12 text-green-400/60" />
        </div> */}

      {/* Terminal Icon */}
      {/* <div
          className="absolute bottom-1/4 left-16 animate-float"
          style={{ animationDelay: "1.5s" }}
        >
          <Terminal className="w-8 h-8 text-pink-400/60" />
        </div> */}

      {/* Monitor Icon */}
      {/* <div
          className="absolute bottom-1/3 right-16 animate-float"
          style={{ animationDelay: "2.5s" }}
        >
          <Monitor className="w-10 h-10 text-cyan-400/60" />
        </div> */}

      {/* WiFi Icon */}
      {/* <div
          className="absolute top-1/2 left-8 animate-float"
          style={{ animationDelay: "3s" }}
        >
          <Wifi className="w-7 h-7 text-indigo-400/60" />
        </div> */}

      {/* Microchip Icon */}
      {/* <div
          className="absolute top-3/4 right-8 animate-float"
          style={{ animationDelay: "1.8s" }}
        >
          <Microchip className="w-9 h-9 text-orange-400/60" />
        </div> */}

      {/* Laptop Icon */}
      {/* <div
          className="absolute bottom-20 left-1/3 animate-float"
          style={{ animationDelay: "2.2s" }}
        >
          <Laptop className="w-8 h-8 text-teal-400/60" />
        </div> */}

      {/* Computer Icon */}
      {/* <div
          className="absolute top-16 right-1/4 animate-float"
          style={{ animationDelay: "0.8s" }}
        >
          <Code className="w-6 h-6 text-red-400/60" />
        </div> */}

      {/* Geometric Shapes */}
      {/* <div
          className="absolute top-1/5 right-1/5 animate-float"
          style={{ animationDelay: "1.2s" }}
        >
          <div className="w-4 h-4 bg-purple-400/40 rounded-full"></div>
        </div> */}

      {/* <div
          className="absolute bottom-1/5 left-1/5 animate-float"
          style={{ animationDelay: "2.8s" }}
        >
          <div className="w-3 h-3 bg-blue-400/40 rotate-45"></div>
        </div> */}

      {/* <div
          className="absolute top-2/3 right-1/6 animate-float"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="w-2 h-8 bg-gradient-to-b from-pink-400/40 to-transparent rounded-full"></div>
        </div>
      </div> */}

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className="animate-fade-in flex items-center flex-col justify-center h-full space-y-6">
          {/* <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-6 leading-tight">
            ID
            <span className="block text-5xl md:text-7xl mt-2">
              DEVELOPER DAY
            </span>
          </h1> */}
          <Image
            src="/images/banner/banner.jpg"
            alt="Banner"
            width={600}
            height={600}
          />
          <div className="relative group">
            <Image
              src="/images/logo/logo2.png"
              alt="Logo"
              width={420}
              height={420}
              className="object-contain transition-opacity duration-200 group-hover:opacity-0"
            />
            <Image
              src="/images/logo/logo.png"
              alt="Logo Hover"
              fill
              className="object-contain opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            />
          </div>

          <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto">
            Join the developer day road to APICTA Chinese Taipei
          </p>

          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            Our mission is to create impactful solutions to solve national
            challenges in the field of applications, websites, and internet
            infrastructure driven by the spirit of innovation and digital
            sovereignty.
          </p>

          {/* Event details */}
          <div className="flex flex-wrap justify-center gap-6 mb-8 text-gray-300">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Calendar className="w-5 h-5 text-purple-400" />
              <span>September 1-2, 2025</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Users className="w-5 h-5 text-blue-400" />
              <span>500+ Participants</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Book className="w-5 h-5 text-pink-400" />
              <span>IDR 60M Prize Pool</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href={"#register"}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Register Now
              </Button>
            </Link>
            <Link href={"#rules"}>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-4 text-lg font-semibold rounded-full backdrop-blur-sm bg-white/5 transform hover:scale-105 transition-all duration-300"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-purple-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-purple-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
