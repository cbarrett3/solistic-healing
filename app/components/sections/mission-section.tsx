"use client";

import { motion } from "framer-motion";
import MissionPoint from "../ui/mission-point";

interface MissionPoint {
  title: string;
  description: string;
}

interface MissionSectionProps {
  title: string;
  points: MissionPoint[];
}

export default function MissionSection({ title, points }: MissionSectionProps) {
  return (
    <motion.div
      className="about-card bg-card/30 backdrop-blur-md rounded-xl overflow-hidden shadow-lg border border-primary/20 transition-all duration-300 h-full flex flex-col"
      initial={{ opacity: 0.95 }}
      whileHover={{
        opacity: 1,
        scale: 1.01,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-4 sm:p-6 flex flex-col h-full">
        {/* Header section aligned with therapist card */}
        <div className="mb-4 sm:mb-5">
          <h3 className="text-lg sm:text-xl md:text-2xl font-light text-foreground">
            <span className="text-primary font-medium">{title}</span>
          </h3>
          <div className="h-0.5 w-16 sm:w-20 bg-primary mt-2"></div>
        </div>

        {/* Content section with more compact spacing */}
        <div className="flex-1 flex flex-col justify-between">
          <div className="space-y-2.5 sm:space-y-3.5">
            {points.map((point, index) => (
              <div key={index} className="cursor-pointer group">
                <MissionPoint
                  title={point.title}
                  description={point.description}
                  isCompact={true}
                />
              </div>
            ))}
          </div>

          {/* This empty div helps push content up to match therapist card height */}
          <div className="mt-auto pt-3 border-t border-border/20 opacity-0">
            <div className="h-[43px]"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
