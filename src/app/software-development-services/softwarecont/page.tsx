"use client";

import * as React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { TestimonialCarousel } from "@/app/testimonials/page";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";


const SoftwareContents = () => {


  return (
    <div className="font-poppins">
    <section className="inner-sub-header bg-gray-100 py-6">
      <div className="container mx-auto text-center py-20">
        <h1 className="text-xl font-medium text-gray-800 text-center font-poppins sm:text-3xl md:text-4xl lg:text-4xl">
        Software Development Company in Bangalore

        </h1>
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mt-4">
          <Breadcrumb>
            <BreadcrumbList className="flex justify-center space-x-2 text-gray-600">
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="hover:text-blue-500">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-blue-500 font-semibold">
                Software Development Company

                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </nav>
      </div>
    </section>


<div className="container mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-center mt-16 mb-10 font-poppins max-w-7xl px-4 sm:px-6 lg:px-7 py-5">
        {/* Image Section (5 columns on larger screens) */}
        <div className="md:col-span-5 flex justify-center order-1 lg:order-1">
          <img
            src="https://res.cloudinary.com/s2ucdn/image/upload/v1744275890/erp-img_q8tu0b.webp"
            alt="ERP Software Development"
            className="w-[70%] sm:w-full max-w-xs sm:max-w-md md:max-w-sm lg:max-w-sm h-auto object-cover rounded-lg"
          />
        </div>

        {/* Content Section (7 columns on larger screens) */}
        <div className="md:col-span-7 text-justify px-2 order-2 lg:order-2">
          <h2 className="text-xl md:text-2xl font-medium text-black text-center">
          ERP Software Development
          </h2>
          <p className="mt-4 text-gray-700">
          If you are managing an established business, an efficient Enterprise Resource Planning (ERP) system is crucial for streamlining your operations. At OrganicAds, we specialize in delivering tailored ERP software solutions that are designed to optimize business processes and enhance overall productivity. As one of the leading software development companies in Bangalore, we offer comprehensive ERP systems that fit your specific needs. Simplify your business management and elevate your operations with a custom ERP solution from OrganicAds. Contact us today to get started!
         </p>
        
        </div>
</div>

<div className="container mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-center mt-10 mb-10 font-poppins max-w-7xl px-4 sm:px-6 lg:px-7 py-5">
        {/* Image Section (5 columns on larger screens) */}
        <div className="md:col-span-5 flex justify-center order-1 lg:order-2">
          <img
            src="https://res.cloudinary.com/s2ucdn/image/upload/v1744275900/crm-img_iwcaub.webp"
            alt="CRM Software Development"
            className="w-[70%] sm:w-full max-w-xs sm:max-w-md md:max-w-sm lg:max-w-sm h-auto object-cover rounded-lg"
          />
        </div>

        {/* Content Section (7 columns on larger screens) */}
        <div className="md:col-span-7 text-justify px-2 order-2 lg:order-1">
          <h2 className="text-xl md:text-2xl font-medium text-black text-center">
          CRM Software Development
          </h2>
          <p className="mt-4 text-gray-700">
          Maximize your ROI with a tailored Customer Relationship Management (CRM) system. At OrganicAds, we specialize in developing customized CRM solutions that align perfectly with your business needs. Whether you are looking for automated CRM software or a ready-to-use CRM demo, our expert developers can help you create a powerful CRM system. If you have been searching for a trusted CRM software development company in Bangalore, look no further. Partner with OrganicAds for cutting-edge CRM solutions that enhance customer relationships and drive business growth. Contact us today to learn more!
         </p>
        </div>
</div>


<div className="container mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-center mt-10 mb-10 font-poppins max-w-7xl px-4 sm:px-6 lg:px-7 py-5">
        {/* Image Section (5 columns on larger screens) */}
        <div className="md:col-span-5 flex justify-center order-1 lg:order-1">
          <img
            src="https://res.cloudinary.com/s2ucdn/image/upload/v1744275904/python-img_pskeey.webp"
            alt="Python Development Services"
            className="w-[70%] sm:w-full max-w-xs sm:max-w-md md:max-w-sm lg:max-w-sm h-auto object-cover rounded-lg"
          />
        </div>

        {/* Content Section (7 columns on larger screens) */}
        <div className="md:col-span-7 text-justify px-2 order-2 lg:order-2">
          <h2 className="text-xl md:text-2xl font-medium text-black text-center">
          Python Development Services
          </h2>
          <p className="mt-4 text-gray-700">
          Python is a powerful yet complex programming language that requires expertise to master. At OrganicAds, we specialize in Python development services, offering unmatched expertise in the field. Our dedicated teams of Python developers are highly skilled and experienced, delivering top-notch solutions tailored to your needs. Whether you are building web applications, data analytics solutions, or automation tools, OrganicAds ensures seamless, high-performance Python development that helps your business grow. Partner with us for reliable, scalable Python development services and unlock the full potential of your project. Contact us today to get started!
         </p>
        </div>
</div>


<div className="container mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-center mt-10 mb-10 font-poppins max-w-7xl px-4 sm:px-6 lg:px-7 py-5">
        {/* Image Section (5 columns on larger screens) */}
        <div className="md:col-span-5 flex justify-center order-1 lg:order-2">
          <img
            src="https://res.cloudinary.com/s2ucdn/image/upload/v1744275920/django-img_r2fywt.webp"
            alt="Django Development Services"
            className="w-[70%] sm:w-full max-w-xs sm:max-w-md md:max-w-sm lg:max-w-sm h-auto object-cover rounded-lg"
          />
        </div>

        {/* Content Section (7 columns on larger screens) */}
        <div className="md:col-span-7 text-justify px-2 order-2 lg:order-1">
          <h2 className="text-xl md:text-2xl font-medium text-black text-center">
          Django Development Services
          </h2>
          <p className="mt-4 text-gray-700">
          Looking for a leading Django development company in Bangalore? At OrganicAds, we specialize in providing top-quality Django development services tailored to your unique needs. Our expert team of Django developers ensures rapid development, clean code, and practical designs that deliver the results you desire. Whether you are building scalable web applications or need customized solutions, we offer the most affordable Django development services. Trust OrganicAds to bring your project to life with precision and efficiency. Contact us now for a free quote and experience the best in Django development.
         </p>
        </div>
</div>

<div className="mt-10 mb-10 items-center text-center">
<Link href="/contactus" passHref>
            <Button className="mt-5 inline-flex justify-center items-center rounded-lg text-sm font-semibold px-4 bg-slate-900 text-white hover:bg-slate-700 pointer-events-auto">
             Contact Us <ArrowRight className="ml-2" />
            </Button>
          </Link>
</div>


<TestimonialCarousel />


    </div>
  );
};

export default SoftwareContents;
