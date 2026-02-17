import { useState } from 'react';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How soon can you arrive?",
      answer: "We offer same-day service in most areas in Oxfordshire. Once you book, we typically arrive at your scheduled preferred time. Our technicians will call you when they are 20 minutes away."
    },
    {
      question: "What areas do you cover?",
      answer: "We current cover a 15-mile radius around Oxfordshire. We are expanding rapidly. Enter your location during checkout to confirm coverage instantly."
    },
    {
      question: "Do I need to be present?",
      answer: "Not necessarily! As long as we have access to the vehicle and the keys, you can go about your day. We'll send you a digital health report and photos of the work once the job is finished. Payment can be handled securely online."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#121212] border-b border-[#362b2b]/50" id="faq">
      <div className="max-w-[1200px] mx-auto px-6 md:px-20">
        <div className="mb-12 text-center">
          <h2 className="font-display text-white text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-12">FAQ</h2>
        </div>
        <div className="space-y-4 max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-[#181818] overflow-hidden rounded-lg border border-[#362b2b]/30 hover:border-[#362b2b]/50 transition-all">
              <button
                className="w-full flex justify-between items-center p-6 text-left hover:bg-white/5 transition-all duration-200"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-white text-base font-medium">{faq.question}</span>
                <div className={`transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                  {openIndex === index ? (
                    <MdExpandLess className="text-[#a12b2b] text-xl" />
                  ) : (
                    <MdExpandMore className="text-[#a12b2b] text-xl" />
                  )}
                </div>
              </button>
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index 
                    ? 'max-h-96 opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6 text-[#b5a1a1] text-sm border-t border-[#362b2b] leading-relaxed pt-4">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;

