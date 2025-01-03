'use client'
import Spline from '@splinetool/react-spline';
import MainNavbar from '../../../components/Navbar';
import GoogleAnalytics from '../../../components/GoogleAnalytics';

export default function Home() {
  return (
    <div className="min-h-screen">
      <GoogleAnalytics />
      <MainNavbar />
      <div className="fixed inset-0 w-screen h-screen">
        <Spline
          className="w-full h-full"
          scene="https://prod.spline.design/HEWx5ld1uE56GC3D/scene.splinecode" 
        />
      </div>
    </div>
  );
}
