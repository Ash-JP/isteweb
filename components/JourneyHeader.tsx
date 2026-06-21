"use client";

import { motion } from "framer-motion";

export default function JourneyHeader() {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="container-centered mb-12 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-500">Journey</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-sky-400 to-purple-500 rounded-full mx-auto"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Explore our history of workshops, hackathons, and seminars.
          </p>
        </motion.div>
    );
}
