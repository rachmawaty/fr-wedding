import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import EventDetails from "@/components/EventDetails";
import Venue from "@/components/Venue";
import RSVP from "@/components/RSVP";
import FAQ from "@/components/FAQ";
import Wishes from "@/components/Wishes";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <EventDetails />
      <Venue />
      <RSVP />
      <FAQ />
      <Wishes />
      <Footer />
    </>
  );
}
