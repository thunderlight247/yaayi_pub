import HeroSection from "@/components/home/HeroSection";
import FeaturedDishes from "@/components/home/FeaturedDishes";
import ServicesGrid from "@/components/home/ServicesGrid";
import NightlifeBanner from "@/components/home/NightlifeBanner";
import PhotoGallery from "@/components/home/PhotoGallery";
import VideoShowcase from "@/components/home/VideoShowcase";
import LocationMapSection from "@/components/home/LocationMapSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedDishes />
      <ServicesGrid />
      <NightlifeBanner />
      <VideoShowcase />
      <PhotoGallery />
      <LocationMapSection />
    </>
  );
}
