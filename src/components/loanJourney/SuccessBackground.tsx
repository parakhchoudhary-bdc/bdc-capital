"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const SuccessBackground = () => {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const blobs = container.current!.children;
            const blob1 = blobs[0];
            const blob2 = blobs[1];

            const gradient1 = "radial-gradient(44.57% 44.57% at 44.87% 54.49%, rgba(0, 90, 69, 0.4) 0%, rgba(255, 255, 255, 0) 100%)";
            const gradient2 = "radial-gradient(44.57% 44.57% at 44.87% 54.49%, rgba(70, 194, 145, 0.4) 0%, rgba(255, 255, 255, 0) 100%)";

            // Animating gradients by swapping the color values smoothly
            gsap.to(blob1, {
                backgroundImage: gradient2,
                duration: 5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

            gsap.to(blob2, {
                backgroundImage: gradient1,
                duration: 5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        },
        { scope: container }
    );

    return (
        <div ref={container} className="fixed inset-0 w-full h-full -z-10">
            <div
                style={{
                    background:
                        "radial-gradient(44.57% 44.57% at 44.87% 54.49%, rgba(0, 90, 69, 0.35) 0%, rgba(255, 255, 255, 0) 100%)",
                    opacity: 0.6,
                    filter: "blur(10px)",
                }}
                className="h-screen aspect-square rounded-full absolute left-0 top-[30%]"
            />
            <div
                style={{
                    background:
                        "radial-gradient(44.57% 44.57% at 44.87% 54.49%, rgba(70, 194, 145, 0.35) 0%, rgba(255, 255, 255, 0) 100%)",
                    opacity: 0.6,
                    filter: "blur(10px)",
                }}
                className="h-screen aspect-square rounded-full absolute top-[30%] -right-[10%] -translate-y-1/2"
            />
        </div>
    );
};

export default SuccessBackground;
