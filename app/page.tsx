import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import OurStory from "@/components/OurStory";
import EventDetails from "@/components/EventDetails";
import Venue from "@/components/Venue";
import RSVP from "@/components/RSVP";
import Gallery from "@/components/Gallery";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <OurStory />
      <EventDetails />
      <Venue />
      <RSVP />
      <Gallery />
      <FAQ />
      <Footer />
    </>
  );
}
