"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const Registration = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    university: "",
    experience: "",
    interests: "",
    teamStatus: "",
    dietary: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Registration Successful! 🎉",
      description:
        "Welcome to Hack the Future! Check your email for confirmation.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      university: "",
      experience: "",
      interests: "",
      teamStatus: "",
      dietary: "",
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section className="py-20 px-4 relative" id="register">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-6">
            Register Now
          </h2>
          <p className="text-xl text-gray-300">
            Secure your spot in the most exciting hackathon of 2024
          </p>
        </div>

        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-white">
              Join Hack the Future 2024
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="university" className="text-white">
                    University/Organization
                  </Label>
                  <Input
                    id="university"
                    type="text"
                    value={formData.university}
                    onChange={(e) => handleChange("university", e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400"
                    placeholder="Your university or company"
                  />
                </div>
              </div>

              {/* Experience Level */}
              <div className="space-y-2">
                <Label htmlFor="experience" className="text-white">
                  Experience Level *
                </Label>
                <Select
                  value={formData.experience}
                  onValueChange={(value) => handleChange("experience", value)}
                >
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select your experience level" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-white/20">
                    <SelectItem value="beginner">
                      Beginner (0-1 years)
                    </SelectItem>
                    <SelectItem value="intermediate">
                      Intermediate (2-4 years)
                    </SelectItem>
                    <SelectItem value="advanced">
                      Advanced (5+ years)
                    </SelectItem>
                    <SelectItem value="expert">Expert (10+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Team Status */}
              <div className="space-y-2">
                <Label htmlFor="teamStatus" className="text-white">
                  Team Status *
                </Label>
                <Select
                  value={formData.teamStatus}
                  onValueChange={(value) => handleChange("teamStatus", value)}
                >
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select your team status" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-white/20">
                    <SelectItem value="solo">
                      I want to participate solo
                    </SelectItem>
                    <SelectItem value="team">I have a team already</SelectItem>
                    <SelectItem value="looking">
                      I'm looking for teammates
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Interests */}
              <div className="space-y-2">
                <Label htmlFor="interests" className="text-white">
                  Areas of Interest
                </Label>
                <Textarea
                  id="interests"
                  value={formData.interests}
                  onChange={(e) => handleChange("interests", e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 min-h-[100px]"
                  placeholder="Tell us about your technical interests, skills, or what you'd like to work on..."
                />
              </div>

              {/* Dietary Requirements */}
              <div className="space-y-2">
                <Label htmlFor="dietary" className="text-white">
                  Dietary Requirements
                </Label>
                <Input
                  id="dietary"
                  type="text"
                  value={formData.dietary}
                  onChange={(e) => handleChange("dietary", e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400"
                  placeholder="Any allergies or dietary restrictions?"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 text-lg font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Register for Hack the Future 2024 🚀
                </Button>
              </div>

              <p className="text-center text-gray-400 text-sm">
                By registering, you agree to our terms and conditions. We'll
                send you important updates about the event.
              </p>
            </form>
          </CardContent>
        </Card>

        {/* Registration Stats */}
        <div className="mt-12 grid grid-cols-3 gap-4 text-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
            <div className="text-2xl font-bold text-purple-400">347</div>
            <div className="text-gray-400">Registered</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
            <div className="text-2xl font-bold text-blue-400">153</div>
            <div className="text-gray-400">Spots Left</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
            <div className="text-2xl font-bold text-pink-400">72</div>
            <div className="text-gray-400">Universities</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;
