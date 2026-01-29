import Header from '../components/Header';
import Hero from '../components/Hero';
import WhyUs from '../components/WhyUs';
import Pricing from '../components/Pricing';
import Guarantee from '../components/Guarantee';
import Reviews from '../components/Reviews';
import PartsPolicy from '../components/PartsPolicy';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

function Home() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <WhyUs />
      <Pricing />
      <Guarantee />
      <Reviews />
      <PartsPolicy />
      <FAQ />
      <Footer />
    </div>
  );
}

export default Home;

