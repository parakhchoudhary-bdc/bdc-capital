"use client";
import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import SectionHeader from "@/components/SectionHeader";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  heading: string
  faq: FAQItem[]
}

const FAQ: React.FC<FAQProps> = ({ heading, faq }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Close all answers initially
    answerRefs.current.forEach((el) => {
      if (el) {
        gsap.set(el, { height: 0, overflow: "hidden" });
      }
    });
  }, []);

  const toggleFAQ = (index: number) => {
    if (activeIndex === index) {
      // Close current open
      gsap.to(answerRefs.current[index], {
        height: 0,
        duration: 0.5,
        ease: "power2.out",
      });
      setActiveIndex(null);
    } else {
      // Close any open first
      if (activeIndex !== null && answerRefs.current[activeIndex]) {
        gsap.to(answerRefs.current[activeIndex], {
          height: 0,

          duration: 0.5,
          ease: "power2.out",
        });
      }
      // Open new one
      if (answerRefs.current[index]) {
        gsap.to(answerRefs.current[index], {
          height: "auto",
          duration: 0.5,
          ease: "power2.out",
        });
      }
      setActiveIndex(index);
    }
  };

  return (
    <section className="flex flex-col h-fit w-full lg:w-[80%] 2xl:w-full max-w-384 py-15 lg:py-20 px-5 md:px-10 lg:px-20 xl:px-25 bg-white mx-auto">
      <SectionHeader heading={heading} className="mb-10 lg:mb-15" />
      {faq.map((item, index) => (
        <div key={index}>
          <div
            className={`py-7 md:py-8 lg:py-10 cursor-pointer
              ${
                index === 0
                  ? `border-y border-y-borderColor`
                  : `border-b border-b-borderColor`
              } 
              `}
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between h-fit items-center">
              <p className="text-subHeading tracking-subHeading text-titleColor leading-[90%] font-medium">
                {item.question}
              </p>
              <img
                src={
                  activeIndex === index ? "/icons/remove.svg" : "/icons/add.svg"
                }
                alt={activeIndex === index ? "remove" : "add"}
                className="h-5 w-5"
              />
            </div>
            <div
              ref={(el) => {
                answerRefs.current[index] = el;
              }}
              className="overflow-hidden"
            >
              <p className="text-bodyBase tracking-base text-titleCopyColor md:max-w-[80%] leading-[124%] pt-4">
                {item.answer}
              </p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default FAQ;