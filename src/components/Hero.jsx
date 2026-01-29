import { useNavigate } from 'react-router-dom';

function Hero() {
  const navigate = useNavigate();

  const handleOrder = () => {
    navigate('/checkout');
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-x-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          alt="Mechanic working on car engine"
          className="w-full h-full object-cover grayscale opacity-40"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZ8IaJXcuDUIIyYyZQHxAdSaJZRSwflV3n8cCSiHuAEoF3fBb0fkSMetOJGf70fHByYkvxegj607Pq0geeh7mj4T5BmeAoaja4FhzsRD4PwMf0Onqhv69DtE2hyVK9O7kISHBScQ7XzRuH3ykbh3N4qlIKEbztmMhmwOUvRIsuviP5V-fbsB2wl14g-WjzEeWccf57vkODQChiOoSuLy-osFMZI1P0eumqls5J13ig1vb0zmJKJ1UqRVQbsFFSaWjXmjw_vGA6y0sz"
        />
        <div className="absolute inset-0 hero-gradient"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-3xl">
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white italic tracking-tighter leading-[1.1] mb-6 break-words">
            NEED <span className="text-gradient-red">REPAIRS?</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 font-light mb-12 leading-relaxed tracking-tight">
            Effortless tyre and oil change in Oxfordshire.
            <br />
            <span className="text-white font-medium">We come to you, wherever you are.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <button onClick={handleOrder} className="bg-primary text-white px-14 py-6 rounded-sm text-xl font-black uppercase tracking-tighter hover:bg-accent hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-primary/30">
              ORDER NOW
            </button>
            <div className="flex items-center gap-5 bg-white/5 border border-white/10 p-4 px-6 rounded-sm backdrop-blur-sm">
              <div className="flex -space-x-3">
                <img
                  alt="User portrait"
                  className="w-12 h-12 rounded-full border-2 border-dark-matte"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQAdJkV3woYci-UqLuDcynljZjOnIIX8Tz4LaurKlP_WDrywVg1qmrN8EphrbtdwKEJZpF_pHd0HhlWdiBJUMc0pLrVfrIYWisjq37nvDCC0VQ1ZECZITcGy0E1sXaPkgWHYPje2u-QAkHTAp_XjD2z5rAJNiGQKaSODE3-UO9uCDG_yRxNUhcAQo0ktJf6MfxbYz-VEw4tQ04pIolnBde-HXGH9VWQDfVg7iQdjtR74FlU0-FyUjCjvVZel0zcxiiS3XId75Csr1O"
                />
                <img
                  alt="User portrait"
                  className="w-12 h-12 rounded-full border-2 border-dark-matte"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiZP5e3REPV623nUrSjSxEzoFVeK4cnV1JN_dbimf-afppQkdjLX4h3ZYO8QuFLN60DcGqYhy-fjnKiaKbvwWOeWbS084VEpcRlY-sZ7pbuoEQTbGkw-la3rqeukAiRD1FgpQG3auWol_pT8OhV62qq7RVybFVWytGqha8frWhUlSfWHPb2pYxZhtFHlcDImGzddk3W48H98GG8hdwNGsDTo7Y11Xve0VbvqePlu5nRBQ6UwtwIwJZaVwcHGcOez5iW-PCTcZTZuoq"
                />
                <img
                  alt="User portrait"
                  className="w-12 h-12 rounded-full border-2 border-dark-matte"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwZ3Y3l3AZOWxyrM0twCLua2ySb3au2VM78F02gQLp4wJ1D-vVv9XSqr5Ofkx1h1VydUaov17It7BdFRNn8sjojglK9NZSadvg2uUhi9s-slE5BmTbUHg7nurAQCrVA9UP9o6hSaZEBt9qh1_dA11Nz4z6rCC8OySkfkfpgaNt9m1GrIIX8G1Nw9PP1ilOMYYA61xJYCp3MfFCHkqR8JvsJtQC2MAg0mj263zf8PgsL-x798FUDfmj2cufWOR50Sf6g5JjvVmKGTDL"
                />
              </div>
              <div>
                <p className="text-lg font-bold text-white leading-tight">500+</p>
                <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Happy Customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

