import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import HeroSearch from "../components/HeroSearch";
import FeaturedHotels from "../components/FeaturedHotels";
import Testimonials from "../components/Testimonials";
import WhyChooseUs from "../components/WhyChooseUs";
import PopularDestinations from "../components/PopularDestinations";
import TravelArticles from "../components/TravelArticles";
import Partners from "../components/Partners";
import Newsletter from "../components/Newsletter";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import HotelList from "../components/HotelList";
import HotelDetails from "../components/HotelDetails";
import BookingForm from "../components/BookingForm";
import UserDashboard from "../components/UserDashboard";
import UserProfile from "../components/UserProfile";
import ProfilePage from "../components/ProfilePage";
import AboutPage from "../components/AboutPage";
import ArticlesPage from "../components/ArticlesPage";
import ArticleDetail from "../components/ArticleDetail";
import OrderDetails from "../components/OrderDetails";
import AuthModal from "../components/AuthModal";
import { useAuthStore } from "../store/authStore";

const Index = () => {
  const { isAuthModalOpen } = useAuthStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSearch />
                <FeaturedHotels />
                <PopularDestinations />
                <Testimonials />
                <WhyChooseUs />
                <TravelArticles />
                <Partners />
                <Newsletter />
                <FAQ />
              </>
            }
          />
          <Route path="/hotels" element={<HotelList />} />
          <Route path="/hotel/:id" element={<HotelDetails />} />
          <Route path="/booking/:hotelId/:roomId" element={<BookingForm />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/order-details/:orderId" element={<OrderDetails />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/article/:id" element={<ArticleDetail />} />
        </Routes>
      </main>
      <Footer />
      {isAuthModalOpen && <AuthModal />}
    </div>
  );
};

export default Index;
