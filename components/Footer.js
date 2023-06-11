import { Globe, Facebook, Twitter, Instagram } from "react-feather";

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-20">
      <div className="container mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-sm font-bold uppercase mb-2">About</h2>
            <ul className="text-sm">
              <li>How WanderStay works</li>
              <li>Newsroom</li>
              <li>WanderStay 2021</li>
              <li>Investors</li>
              <li>WanderStay Plus</li>
              <li>WanderStay Luxe</li>
              <li className="lg:hidden">HotelTonight</li>
              <li className="lg:hidden">WanderStay for Work</li>
              <li className="lg:hidden">Made possible by Hosts</li>
              <li className="lg:hidden">Careers</li>
              <li className="lg:hidden">Founders' Letter</li>
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase mb-2">Community</h2>
            <ul className="text-sm">
              <li>Diversity & Belonging</li>
              <li>Accessibility</li>
              <li>WanderStay Associates</li>
              <li>Frontline Stays</li>
              <li>Guest Referrals</li>
              <li>WanderStay.org</li>
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase mb-2">Host</h2>
            <ul className="text-sm">
              <li>Host your home</li>
              <li>Host an Online Experience</li>
              <li>Host an Experience</li>
              <li>Responsible hosting</li>
              <li>Resource Centre</li>
              <li>Community Centre</li>
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase mb-2">Support</h2>
            <ul className="text-sm">
              <li>Our COVID-19 Response</li>
              <li>Help Centre</li>
              <li>Cancellation options</li>
              <li>Neighbourhood Support</li>
              <li>Trust & Safety</li>
            </ul>
          </div>
        </div>
        <div className="mt-16 flex items-center justify-between">
          <p className="flex items-center">
            <span className="mr-1">
              <Globe className="h-4" />
            </span>
            English
          </p>
          <div className="flex items-center">
            <div className="mr-4">
              <Facebook className="h-4" />
            </div>
            <Twitter className="h-4" />
            <div className="ml-4">
              <Instagram className="h-4" />
            </div>
          </div>
        </div>
        <p className="mt-8 text-sm text-center">
          &copy; 2022{" "}
          <a
            href="https://github.com/Rohan3011"
            target="_blank"
            rel="noreferrer"
            className="text-red-500 hover:underline"
          >
            Rohan Kamble
          </a>
        </p>
      </div>
    </footer>
  );
}
