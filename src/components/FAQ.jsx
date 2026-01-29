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
    <section className="py-32 bg-dark-charcoal" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl font-black uppercase mb-4 text-white">FAQ</h2>
          <div className="h-1.5 w-16 bg-primary mx-auto mb-10"></div>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-white/10 bg-dark-matte overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-8 text-left hover:bg-white/5 transition-all"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-black text-lg uppercase tracking-tight text-white">{faq.question}</span>
                {openIndex === index ? (
                  <MdExpandLess className="text-primary text-2xl" />
                ) : (
                  <MdExpandMore className="text-primary text-2xl" />
                )}
              </button>
              {openIndex === index && (
                <div className="p-8 pt-0 text-slate-400 text-lg border-t border-white/5 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;

