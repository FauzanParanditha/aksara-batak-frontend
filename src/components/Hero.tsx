import Image from "next/image";
import Navigation from "./Navigation";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Navigation />
      <div className="relative w-full h-screen">
        <Image
          src="/images/banner/banner1.jpg"
          alt="Banner"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40"></div>
      </div>
    </section>
  );
};

export default Hero;
