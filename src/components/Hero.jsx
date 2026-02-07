import { useNavigate } from 'react-router-dom';

function Hero() {
  const navigate = useNavigate();

  const handleOrder = () => {
    navigate('/checkout');
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-x-hidden bg-[#121212]">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          alt="Mechanic working on car engine"
          className="w-full h-full object-cover grayscale opacity-20"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZ8IaJXcuDUIIyYyZQHxAdSaJZRSwflV3n8cCSiHuAEoF3fBb0fkSMetOJGf70fHByYkvxegj607Pq0geeh7mj4T5BmeAoaja4FhzsRD4PwMf0Onqhv69DtE2hyVK9O7kISHBScQ7XzRuH3ykbh3N4qlIKEbztmMhmwOUvRIsuviP5V-fbsB2wl14g-WjzEeWccf57vkODQChiOoSuLy-osFMZI1P0eumqls5J13ig1vb0zmJKJ1UqRVQbsFFSaWjXmjw_vGA6y0sz"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#121212]/60 to-[#121212]"></div>
      </div>
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-20 py-24 w-full">
        <div className="max-w-2xl">
          <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6">
            Need <span className="text-[#a12b2b]">repairs?</span>
          </h1>
          <p className="text-[#b5a1a1] text-lg md:text-xl font-light mb-12 leading-relaxed">
            Effortless tyre and oil change in Oxfordshire.
            <br />
            <span className="text-white">We come to you, wherever you are.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <button onClick={handleOrder} className="bg-[#a12b2b] hover:bg-[#a12b2b]/90 text-white px-8 py-4 rounded-lg text-sm font-bold tracking-[0.25em] uppercase transition-all">
              Order Now
            </button>
            <div className="flex items-center gap-4 border border-[#362b2b] rounded-lg px-6 py-3">
              <div className="flex -space-x-2">
                <img
                  alt="User portrait"
                  className="w-10 h-10 rounded-full border-2 border-[#121212]"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQAdJkV3woYci-UqLuDcynljZjOnIIX8Tz4LaurKlP_WDrywVg1qmrN8EphrbtdwKEJZpF_pHd0HhlWdiBJUMc0pLrVfrIYWisjq37nvDCC0VQ1ZECZITcGy0E1sXaPkgWHYPje2u-QAkHTAp_XjD2z5rAJNiGQKaSODE3-UO9uCDG_yRxNUhcAQo0ktJf6MfxbYz-VEw4tQ04pIolnBde-HXGH9VWQDfVg7iQdjtR74FlU0-FyUjCjvVZel0zcxiiS3XId75Csr1O"
                />
                <img
                  alt="User portrait"
                  className="w-10 h-10 rounded-full border-2 border-[#121212]"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiZP5e3REPV623nUrSjSxEzoFVeK4cnV1JN_dbimf-afppQkdjLX4h3ZYO8QuFLN60DcGqYhy-fjnKiaKbvwWOeWbS084VEpcRlY-sZ7pbuoEQTbGkw-la3rqeukAiRD1FgpQG3auWol_pT8OhV62qq7RVybFVWytGqha8frWhUlSfWHPb2pYxZhtFHlcDImGzddk3W48H98GG8hdwNGsDTo7Y11Xve0VbvqePlu5nRBQ6UwtwIwJZaVwcHGcOez5iW-PCTcZTZuoq"
                />
                <img
                  alt="User portrait"
                  className="w-10 h-10 rounded-full border-2 border-[#121212]"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwZ3Y3l3AZOWxyrM0twCLua2ySb3au2VM78F02gQLp4wJ1D-vVv9XSqr5Ofkx1h1VydUaov17It7BdFRNn8sjojglK9NZSadvg2uUhi9s-slE5BmTbUHg7nurAQCrVA9UP9o6hSaZEBt9qh1_dA11Nz4z6rCC8OySkfkfpgaNt9m1GrIIX8G1Nw9PP1ilOMYYA61xJYCp3MfFCHkqR8JvsJtQC2MAg0mj263zf8PgsL-x798FUDfmj2cufWOR50Sf6g5JjvVmKGTDL"
                />
              </div>
              <div>
                <p className="text-white text-base font-medium leading-tight">500+</p>
                <p className="text-[#b5a1a1] text-[10px] font-bold tracking-[0.15em] uppercase">Happy Customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

