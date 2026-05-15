"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
  Ruler,
  Wrench,
  Activity,
  Factory,
  CheckCircle,
  Building2,
  Award,
  Users,
  Calendar,
  Sparkles,
  Star,
  ArrowRight,
  Zap,
  TrendingUp,
  Search,
} from "lucide-react"
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion"

export default function AboutUsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })
  const isStatsInView = useInView(statsRef, { once: false, amount: 0.3 })

  // Parallax effect for decorative elements
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50])
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 20])
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -20])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const services = [
    {
      icon: <Ruler className="w-6 h-6" />,
      secondaryIcon: <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-primary/40" />,
      title: "Engineering",
      description:
        "Precision-engineered RO systems designed to exact micron-level specifications for industrial and commercial use.",
      position: "left",
      link: "/services"
    },
    {
      icon: <Factory className="w-6 h-6" />,
      secondaryIcon: <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-primary/40" />,
      title: "Manufacturing",
      description:
        "State-of-the-art assembly of wastewater and purification plants following strict ISO 9001:2015 quality standards.",
      position: "left",
      link: "/services"
    },
    {
      icon: <Search className="w-6 h-6" />,
      secondaryIcon: <Star className="w-4 h-4 absolute -top-1 -right-1 text-primary/40" />,
      title: "Audits",
      description:
        "Comprehensive water quality audits and plant performance certifications to ensure your operations remain efficient.",
      position: "left",
      link: "/contact"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      secondaryIcon: <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-primary/40" />,
      title: "Installation",
      description:
        "Fast and reliable on-site deployment by our certified engineering teams, ensuring seamless integration with your site.",
      position: "right",
      link: "/services"
    },
    {
      icon: <Wrench className="w-6 h-6" />,
      secondaryIcon: <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-primary/40" />,
      title: "Maintenance",
      description:
        "Predictive Annual Maintenance Contracts (AMC) that prevent downtime and extend the lifespan of your RO membranes.",
      position: "right",
      link: "/services"
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      secondaryIcon: <Star className="w-4 h-4 absolute -top-1 -right-1 text-primary/40" />,
      title: "Industrial STP",
      description:
        "Evolutionary compact Sewage Treatment Plants designed for high-rise residential and commercial complexes.",
      position: "right",
      link: "/services"
    },
  ]

  const stats = [
    { icon: <Award />, value: 6000, label: "Projects Completed", suffix: "+" },
    { icon: <Users />, value: 10000, label: "Happy Customers", suffix: "+" },
    { icon: <Calendar />, value: 25, label: "Years Experience", suffix: "+" },
    { icon: <TrendingUp />, value: 100, label: "Quality Standards", suffix: "%" },
  ]

  return (
    <section
      id="about-section"
      ref={sectionRef}
      className="w-full py-24 px-4 bg-gradient-to-b from-slate-50 to-white text-slate-900 overflow-hidden relative"
    >
      {/* Decorative background elements */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl"
        style={{ y: y1, rotate: rotate1 }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-blue-400/5 blur-3xl"
        style={{ y: y2, rotate: rotate2 }}
      />
      
      <motion.div
        className="container mx-auto max-w-6xl relative z-10"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div className="flex flex-col items-center mb-6" variants={itemVariants}>
          <motion.span
            className="text-primary font-black tracking-widest text-xs mb-2 flex items-center gap-2 uppercase"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Zap className="w-4 h-4" />
            Engineering Purity Since 2014
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-black font-headline mb-4 text-center tracking-tight">Our Technical Story</h2>
          <motion.div
            className="w-24 h-1.5 bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1, delay: 0.5 }}
          ></motion.div>
        </motion.div>

        <motion.p className="text-center max-w-2xl mx-auto mb-20 text-slate-600 font-bold leading-relaxed" variants={itemVariants}>
          We are a leading ISO certified manufacturer in India, dedicated to delivering milestone solutions in water and wastewater treatment through technical mastery and 25 years of combined experience.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Left Column */}
          <div className="space-y-16">
            {services
              .filter((service) => service.position === "left")
              .map((service, index) => (
                <ServiceItem
                  key={`left-${index}`}
                  icon={service.icon}
                  secondaryIcon={service.secondaryIcon}
                  title={service.title}
                  description={service.description}
                  variants={itemVariants}
                  delay={index * 0.2}
                  direction="left"
                  link={service.link}
                />
              ))}
          </div>

          {/* Center Image */}
          <div className="flex justify-center items-center order-first md:order-none mb-12 md:mb-0">
            <motion.div className="relative w-full max-w-xs" variants={itemVariants}>
              <motion.div
                className="rounded-3xl overflow-hidden shadow-2xl relative z-10"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
              >
                <img
                  src="https://aquasaferoworks.sirv.com/ChatGPT%20Image%20May%2012%2C%202026%2C%2007_19_40%20PM.png"
                  alt="Industrial RO Plant"
                  className="w-full aspect-[4/5] object-cover"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent flex items-end justify-center p-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                >
                  <Link href="/gallery">
                    <motion.button
                      className="bg-white text-primary px-6 py-3 rounded-xl flex items-center gap-2 text-sm font-black uppercase tracking-widest shadow-xl border-none"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Our Portfolio <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>
              
              {/* Outer decorative border */}
              <motion.div
                className="absolute inset-0 border-4 border-primary/20 rounded-[2.5rem] -m-4 z-0"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              ></motion.div>

              {/* Floating accent elements */}
              <motion.div
                className="absolute -top-6 -right-12 w-20 h-20 rounded-2xl bg-primary/10 backdrop-blur-sm border border-primary/5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
                style={{ y: y1 }}
              ></motion.div>
              <motion.div
                className="absolute -bottom-8 -left-12 w-24 h-24 rounded-full bg-blue-500/5 blur-xl"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.1 }}
                style={{ y: y2 }}
              ></motion.div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-16">
            {services
              .filter((service) => service.position === "right")
              .map((service, index) => (
                <ServiceItem
                  key={`right-${index}`}
                  icon={service.icon}
                  secondaryIcon={service.secondaryIcon}
                  title={service.title}
                  description={service.description}
                  variants={itemVariants}
                  delay={index * 0.2}
                  direction="right"
                  link={service.link}
                />
              ))}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          ref={statsRef}
          className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          animate={isStatsInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {stats.map((stat, index) => (
            <StatCounter
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              delay={index * 0.1}
            />
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="mt-20 bg-slate-900 text-white p-10 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 -skew-x-12 translate-x-1/2 pointer-events-none" />
          <div className="flex-1 relative z-10">
            <h3 className="text-3xl font-black font-headline mb-2 tracking-tight uppercase">Ready to transform your water?</h3>
            <p className="text-slate-400 font-bold">Connect with our engineering specialists for a custom technical assessment.</p>
          </div>
          <Link href="/contact">
            <motion.button
              className="relative z-10 bg-primary hover:bg-primary/90 text-white px-10 py-5 rounded-2xl flex items-center gap-3 font-black uppercase tracking-widest text-sm shadow-xl shadow-primary/20 border-none transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}

interface ServiceItemProps {
  icon: React.ReactNode
  secondaryIcon?: React.ReactNode
  title: string
  description: string
  variants: any
  delay: number
  direction: "left" | "right"
  link: string
}

function ServiceItem({ icon, secondaryIcon, title, description, variants, delay, direction, link }: ServiceItemProps) {
  return (
    <motion.div
      className="flex flex-col group"
      variants={variants}
      transition={{ delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Link href={link} className="block">
        <motion.div
          className="flex items-center gap-4 mb-4"
          initial={{ x: direction === "left" ? -20 : 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: delay + 0.2 }}
        >
          <motion.div
            className="text-primary bg-primary/10 p-4 rounded-xl transition-colors duration-300 group-hover:bg-primary/20 relative shrink-0 shadow-sm"
            whileHover={{ rotate: [0, -10, 10, -5, 0], transition: { duration: 0.5 } }}
          >
            {icon}
            {secondaryIcon}
          </motion.div>
          <h3 className="text-2xl font-black font-headline text-slate-900 group-hover:text-primary transition-colors duration-300 tracking-tight uppercase">
            {title}
          </h3>
        </motion.div>
        <motion.p
          className="text-sm text-slate-500 font-bold leading-relaxed pl-2 md:pl-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: delay + 0.4 }}
        >
          {description}
        </motion.p>
        <motion.div
          className="mt-4 flex items-center text-primary text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
        >
          <span className="flex items-center gap-1.5">
            Learn more <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </motion.div>
      </Link>
    </motion.div>
  )
}

interface StatCounterProps {
  icon: React.ReactNode
  value: number
  label: string
  suffix: string
  delay: number
}

function StatCounter({ icon, value, label, suffix, delay }: StatCounterProps) {
  const countRef = useRef(null)
  const isInView = useInView(countRef, { once: false })
  const [hasAnimated, setHasAnimated] = useState(false)

  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 15,
  })

  useEffect(() => {
    if (isInView && !hasAnimated) {
      springValue.set(value)
      setHasAnimated(true)
    } else if (!isInView && hasAnimated) {
      springValue.set(0)
      setHasAnimated(false)
    }
  }, [isInView, value, springValue, hasAnimated])

  const displayValue = useTransform(springValue, (latest) => Math.floor(latest))

  return (
    <motion.div
      className="bg-white p-8 rounded-3xl flex flex-col items-center text-center group hover:shadow-xl transition-all duration-300 border border-slate-50"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay },
        },
      }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
    >
      <motion.div
        className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-500 shadow-sm"
        whileHover={{ rotate: 360, transition: { duration: 0.8 } }}
      >
        {icon}
      </motion.div>
      <motion.div ref={countRef} className="text-4xl font-black font-headline text-slate-900 flex items-center tracking-tighter">
        <motion.span>{displayValue}</motion.span>
        <span className="text-primary">{suffix}</span>
      </motion.div>
      <p className="text-slate-500 font-black uppercase tracking-widest text-[10px] mt-2">{label}</p>
      <motion.div className="w-10 h-1 bg-primary/20 mt-4 group-hover:w-16 group-hover:bg-primary transition-all duration-500 rounded-full" />
    </motion.div>
  )
}
