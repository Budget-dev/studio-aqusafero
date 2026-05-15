import { Contact2 } from "@/components/ui/contact-2";
import { CardsParallax, type iCardItem } from "@/components/ui/cards-parallax";

const CONTACT_REASONS: iCardItem[] = [
  {
    title: "Support",
    description: "24/7 technical assistance and rapid diagnostics for your RO plants.",
    tag: "Service",
    src: "https://aquasaferoworks.sirv.com/ChatGPT%20Image%20May%2015%2C%202026%2C%2003_08_12%20PM.png",
    link: "#",
    color: "#0f172a", // Slate 900
    textColor: "#38bdf8", // Sky 400
  },
  {
    title: "Sales",
    description: "Expert consultation and tailored quotations for industrial water solutions.",
    tag: "Consultation",
    src: "https://aquasaferoworks.sirv.com/ChatGPT%20Image%20May%2015%2C%202026%2C%2003_14_45%20PM.png",
    link: "#",
    color: "#1e293b", // Slate 800
    textColor: "#ffffff",
  },
  {
    title: "Audits",
    description: "Professional water quality audits and plant performance certifications.",
    tag: "Audit",
    src: "https://picsum.photos/seed/audit/1200/800",
    link: "#",
    color: "#334155", // Slate 700
    textColor: "#7dd3fc", // Sky 300
  }
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Intro Parallax Section */}
      <section className="bg-slate-50">
        <div className="container mx-auto px-4 pt-20 text-center">
          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-primary mb-4">How can we help?</h2>
          <p className="text-4xl md:text-5xl font-black font-headline text-slate-900 tracking-tight">Our Dedicated Channels</p>
        </div>
        <CardsParallax items={CONTACT_REASONS} />
      </section>

      {/* Main Contact Form Section */}
      <Contact2 
        title="Send an Inquiry"
        description="Whether you need a full plant installation or small-scale maintenance, our team of engineers is available for technical assessments and collaboration."
        phone="+91 99858 50777"
        email="info@aquasafero.com"
        web={{ label: "aquasafero.com", url: "https://aquasafero.com" }}
      />
      
      {/* Map Section */}
      <section className="h-[400px] w-full grayscale hover:grayscale-0 transition-all duration-500 border-t">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3800.6784824373413!2d83.2104523!3d17.68962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3969ba88098679%3A0xc66517a612502c38!2sAqua%20Safe%20Water%20Technologies!5e0!3m2!1sen!2sin!4v1715777777777!5m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </div>
  );
}
