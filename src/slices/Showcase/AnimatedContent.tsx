"use client";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";

export default function AnimatedContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const container = useRef(null);
  const prefersReduceMotion = usePrefersReducedMotion();
  gsap.registerPlugin(useGSAP, ScrollTrigger);

  useGSAP(
    () => {
      if (prefersReduceMotion) {
        gsap.set(container.current, { y: 0 });
        return;
      }
      gsap.fromTo(
        container.current,
        {
          y: 100,
        },
        {
          y: 0,
          ease: "power2.inOut",
          duration: 1,
          scrollTrigger: {
            trigger: container.current,
            start: "top bottom-=40%",
            toggleActions: "play pause resume reverse",
            // markers: true,
          },
        },
      );
    },
    { scope: container },
  );

  return <div ref={container}>{children}</div>;
}
