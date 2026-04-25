"use client";

import { motion } from "framer-motion";
import {
  BadgeCheck,
  Glasses,
  MapPin,
  Menu,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  Sun,
  Wallet,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Collection", href: "#collection" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

const features = [
  {
    title: "Advanced Eye Testing Equipment",
    description:
      "State-of-the-art diagnostics for precise, reliable Examen de vue.",
    icon: Stethoscope,
  },
  {
    title: "5-Star Google Rated",
    description:
      "Trusted by families in Laattaouia for quality service and warm care.",
    icon: BadgeCheck,
  },
  {
    title: "Wide Variety of Frames",
    description:
      "Classic, modern, and premium lunettes styles for every face and age.",
    icon: Glasses,
  },
  {
    title: "Affordable Prices",
    description: "Beautiful eyewear and medical-grade care at fair pricing.",
    icon: Wallet,
  },
];

const services = [
  {
    title: "Examen de vue",
    description:
      "Professional eye examinations with accurate screening and guidance.",
    icon: Stethoscope,
  },
  {
    title: "Lunettes de vue",
    description:
      "Prescription glasses crafted for comfort, style, and visual precision.",
    icon: Glasses,
  },
  {
    title: "Lunettes de soleil",
    description:
      "UV-protected sunglasses with premium designs for every lifestyle.",
    icon: Sun,
  },
];

const testimonials = [
  {
    name: "Sanae B.",
    text: "Service top! L'equipe est professionnelle et tres accueillante. I found perfect lunettes for daily wear.",
  },
  {
    name: "Youssef A.",
    text: "Najmi Optic is the best Opticien in town. Eye exam was fast, clear, and very professional.",
  },
  {
    name: "Khadija M.",
    text: "Excellent quality, affordable prices, and great after-sales support. Highly recommended!",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  return (
    <main className="bg-[#f8f8f7] text-slate-900">
      <header className="sticky top-0 z-50 border-b border-[#d9c28b]/30 bg-[#0f1f33]/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-content-center rounded-full bg-[#d4af37] text-[#0f1f33]">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#d4af37]">Najmi Optic</p>
              <p className="text-xs text-white/70">Laattaouia, Morocco</p>
            </div>
          </div>

          <nav className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-white/85 transition hover:text-[#d4af37]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="https://wa.me/212600000000"
            className={cn(
              buttonVariants({ size: "sm" }),
              "hidden md:inline-flex"
            )}
          >
            WhatsApp Us
          </a>

          <button
            className="rounded-md p-2 text-white md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f1f33]/75 via-[#0f1f33]/80 to-[#0f1f33]/90" />
        <div className="relative mx-auto flex min-h-[75vh] w-full max-w-6xl flex-col justify-center px-4 py-24 sm:px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <p className="mb-4 inline-flex rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-4 py-1.5 text-xs font-medium tracking-wide text-[#f1d37c]">
              Premium Opticien in Laattaouia
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Vision Care & Premium Eyewear in One Place.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-white/85 sm:text-lg">
              State-of-the-art eye exams and a wide collection of frames for
              all ages in Laattaouia.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://wa.me/212600000000"
                className={buttonVariants()}
              >
                <PhoneCall className="h-4 w-4" />
                Contact via WhatsApp
              </a>
              <a
                href="#contact"
                className={buttonVariants({ variant: "outline" })}
              >
                <MapPin className="h-4 w-4" />
                View Location
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <h2 className="text-3xl font-semibold text-[#0f1f33]">
            Why Choose Najmi Optic
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
            Premium care, trusted expertise, and modern eyewear for your
            family.
          </p>
        </motion.div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeUp}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="transition hover:-translate-y-1"
            >
              <Card className="h-full border-[#d4af37]/25 shadow-[0_12px_35px_rgba(15,31,51,0.06)] transition hover:shadow-[0_16px_45px_rgba(15,31,51,0.10)]">
                <CardContent>
                  <feature.icon className="h-6 w-6 text-[#b18a16]" />
                  <h3 className="mt-4 text-lg font-semibold text-[#0f1f33]">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="services" className="bg-white py-16 sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-semibold text-[#0f1f33]">Services</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
              Medical precision and modern style under one roof.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {services.map((service, idx) => (
              <motion.div
                key={service.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="group"
              >
                <Card className="h-full border-slate-200 bg-[#fcfcfb] transition hover:border-[#d4af37]/45 hover:bg-[#fffdfa] hover:shadow-[0_16px_38px_rgba(15,31,51,0.07)]">
                  <CardContent>
                    <service.icon className="h-6 w-6 text-[#b18a16]" />
                    <h3 className="mt-4 text-xl font-semibold text-[#0f1f33]">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="collection" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="rounded-3xl border border-[#d4af37]/25 bg-gradient-to-r from-[#0f1f33] to-[#152b45] p-8 text-white sm:p-10">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Discover Our Frame Collection
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-white/80 sm:text-base">
            From minimal elegance to bold statement looks, we curate frames
            that fit your face, personality, and budget.
          </p>
        </div>
      </section>

      <section id="reviews" className="bg-white py-16 sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-semibold text-[#0f1f33]">
              5-Star Testimonials
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
              Social proof from happy customers in Laattaouia.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((review, idx) => (
              <motion.div
                key={review.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeUp}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="h-full"
              >
                <Card className="h-full border-slate-200 bg-[#fdfdfc]">
                  <CardContent>
                    <div className="mb-4 flex gap-1 text-[#d4af37]">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm leading-relaxed text-slate-700">
                      &ldquo;{review.text}&rdquo;
                    </p>
                    <p className="mt-4 text-sm font-semibold text-[#0f1f33]">
                      {review.name}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-[#0f1f33] p-8 text-white sm:p-10"
          >
            <h2 className="text-2xl font-semibold sm:text-3xl">
              Visit Najmi Optic Today
            </h2>
            <p className="mt-4 text-sm text-white/85 sm:text-base">
              Get trusted eye care and premium lunettes in a welcoming local
              boutique.
            </p>
            <div className="mt-6 flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 text-[#d4af37]" />
              <p className="text-sm leading-relaxed text-white/90 sm:text-base">
                Near BIM, Route Lycee Rahali El Farouk, Laattaouia
              </p>
            </div>
            <a
              href="https://wa.me/212600000000"
              className={cn(buttonVariants(), "mt-8")}
            >
              Book Appointment
            </a>
          </motion.div>

          <div className="min-h-[320px] overflow-hidden rounded-3xl border border-slate-200 bg-white">
            <iframe
              title="Najmi Optic location map"
              src="https://maps.google.com/maps?q=Laattaouia%20Morocco&t=&z=14&ie=UTF8&iwloc=&output=embed"
              className="h-full min-h-[320px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <footer className="bg-[#0a1728]">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 text-sm text-white/80 sm:px-6 md:grid-cols-3">
          <div>
            <p className="text-base font-semibold text-white">Najmi Optic</p>
            <p className="mt-3 leading-relaxed">
              Premium eye care and eyewear in Laattaouia. Opticien de
              confiance for all ages.
            </p>
          </div>

          <div>
            <p className="text-base font-semibold text-white">Opening Hours</p>
            <p className="mt-3">Mon - Sat: 9:00 AM - 8:00 PM</p>
            <p>Sunday: 10:00 AM - 2:00 PM</p>
          </div>

          <div>
            <p className="text-base font-semibold text-white">Follow Us</p>
            <div className="mt-3 space-y-1">
              <a className="block hover:text-[#f1d37c]" href="#">
                Instagram
              </a>
              <a className="block hover:text-[#f1d37c]" href="#">
                Facebook
              </a>
            </div>
            <p className="mt-6 text-xs text-white/55">
              © {new Date().getFullYear()} Najmi Optic. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <a
        href="https://wa.me/212600000000"
        className="fixed bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg md:hidden"
      >
        <ShieldCheck className="h-4 w-4" />
        WhatsApp
      </a>
    </main>
  );
}
