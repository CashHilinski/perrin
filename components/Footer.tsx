import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white w-full">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">PERRIN</h3>
            <p className="text-gray-400">
              Leading research institution dedicated to generating policy
              solutions
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/research"
                  className="text-gray-400 hover:text-white"
                >
                  Research
                </Link>
              </li>
              <li>
                <Link
                  href="/experts"
                  className="text-gray-400 hover:text-white"
                >
                  Experts
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-400 hover:text-white">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>1827 University Avenue</li>
              <li>Charlottesville, Virginia</li>
              <li>contact@perrin.org</li>
              <li>(555) 123-4567</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex flex-col space-y-2">
              <a href="#" className="text-gray-400 hover:text-white">
                Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                LinkedIn
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Perrin Think Tank. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
