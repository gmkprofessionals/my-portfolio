import CoverSlider from "./components/CoverSlider";
import Footer from "./components/Footer";
import Pricing from "./components/Pricing";
import Services from "./components/Services";
import ShortIntro from "./components/ShortIntro";

export default function Home() {
  return (
    <div>
      <main>
        <CoverSlider/>
        <ShortIntro/>
        <Services/>
        <Pricing/>
        <Footer/>
      </main>
    </div>
  );
}
