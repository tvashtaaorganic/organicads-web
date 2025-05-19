"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    name: "Xavarin Daniel",
    post: "CEO, Texas Smile Office, USA",
    title: "SEO & WEB Services",
    feedback:
      "Excellent work done for our company based in Texas. Highly recommend their SEO services and overall support!",
  },
  {
    name: "Jessy Cilenti",
    post: "Writer, USA",
    title: "SEO Support",
    feedback:
      "OrganicAds has been a game-changer for my business. Their customer service is exceptional!",
  },
  {
    name: "Pranitha Chaudhary",
    post: "Founder, PlanB Capital India",
    title: "SEO & WEB Services",
    feedback:
      "OrganicAds has made our website traffic soar! The service is professional and ensures our goals are met.",
  },
  {
    name: "Dr. Sankruthi Prasad",
    post: "Founder, NewU Hair Clinic, Mumbai",
    title: "SEO & WEB Services",
    feedback:
      "Best company to work with .. Great company to work with! Totally professional and excellent at what they do. They consistently meet expectations and deliver the best ROI on SEO services.",
  },
  {
    name: "Ritesh Shenoy",
    post: "Founder, Sri Lalitha Travels",
    title: "SEO & PPC Services",
    feedback:
      "Great knowledge of Google Ads! Im really happy with my Google Ads results, and the SEO has been amazing too. My business page reached the first page in just 1 months, showing 100% growth. Targeted 20k Keywords.. Thanks to Mr. Srikanth and the team!",
  },
  {
    name: "Anchala G",
    post: "Manager, Localaids, Bangalore",
    title: "Website Design & SEO Services",
    feedback:
      "An incredibly talented and friendly team. If you are looking to take your business to the next level with amazing visibility, OrganicAds is the way to go...",
  },
];

export default function TestimonialCarousel() {
  return (
    <div className="w-full max-w-[1000px] mx-auto mt-10 mb-10 py-10">
      <h2 className="text-2xl font-medium text-center mb-10 font-poppins">
      Check whats our client say about us!
      </h2>

      <Carousel opts={{ align: "center" }} className="w-full">
        <CarouselContent>
          {testimonials.map((testimonial, index) => (
            <CarouselItem key={index} className="w-full md:basis-1/2 lg:basis-1/3">
              <div className="p-3 flex justify-center">
                <Card className="w-[300px] h-[350px] flex flex-col justify-between items-center p-3 shadow-md border border-gray-200 rounded-lg font-poppins relative">
                    {/* Quote Icon */}
                  <div className="absolute top-[-10px] right-[40px] w-[65px] h-[52px] bg-contain bg-no-repeat" 
                       style={{ backgroundImage: "url('https://www.organicads.in/assets/img/quote-icon2.png')" }}>
                  </div>
                  <CardContent className="flex flex-col justify-center h-full relative mt-7">
                    <h3 className="text-lg font-semibold text-[#b70b5e]">{testimonial.title}</h3>
                    <p className="text-gray-600 text-sm mt-2 flex-grow">
                      {testimonial.feedback}
                    </p>
                    <div className="mt-4 font-semibold text-blue-600">{testimonial.name}</div>
                    <div className="text-xs text-gray-500">{testimonial.post}</div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
       <CarouselPrevious className="absolute left-5 top-1/2 transform -translate-y-1/2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 hover:text-white" />
       <CarouselNext className="absolute right-5 top-1/2 transform -translate-y-1/2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 hover:text-white" />
      </Carousel>
    </div>
  );
}
