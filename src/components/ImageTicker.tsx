"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";

interface ImageTickerProps {
  images: string[];
  speed?: number;
  direction?: "left" | "right";
  height?: number;
}

export default function ImageTicker({ images, speed = 40, direction = "left", height = 300 }: ImageTickerProps) {
  const controls = useAnimation();
  const imageWidth = height * 1.5;
  const gap = 20;
  const totalWidth = (imageWidth + gap) * images.length;

  useEffect(() => {
    const distance = direction === "left" ? -totalWidth : totalWidth;
    controls.set({ x: direction === "left" ? 0 : -totalWidth });
    controls.start({
      x: distance,
      transition: { duration: totalWidth / speed, ease: "linear", repeat: Infinity },
    });
  }, [controls, totalWidth, direction, speed]);

  if (!images.length) return null;

  return (
    <div style={{ height }} className="overflow-hidden w-full">
      <motion.div
        animate={controls}
        style={{ display: "flex", gap, height: "100%", alignItems: "center" }}
      >
        {[...images, ...images].map((src, i) => (
          <div
            key={i}
            style={{ width: imageWidth, height: "100%", flexShrink: 0 }}
            className="relative rounded-xl overflow-hidden bg-white/5"
          >
            <Image src={src} alt={`Gallery ${i}`} fill className="object-cover" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
