import { Contact2 } from "@/components/ui/contact-2";

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Contact2 
        title="Contact Us"
        description="We are available for questions, technical assessments, or collaboration opportunities. Let us know how we can solve your water challenges!"
        phone="+91 99858 50777"
        email="info@aquasafero.com"
        web={{ label: "aquasafero.com", url: "https://aquasafero.com" }}
      />
      
      {/* Map Section */}
      <section className="h-[400px] w-full grayscale hover:grayscale-0 transition-all duration-500">
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
