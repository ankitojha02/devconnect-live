export default function Footer() {
  return (
    <footer className="border-t border-yellow-500/10 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <h1 className="text-3xl font-black mb-4 text-yellow-400">
              DevConnect
            </h1>

            <p className="text-zinc-400 leading-relaxed">
              The next-generation developer community platform for builders,
              creators and innovators.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">Platform</h3>

            <div className="space-y-3 text-zinc-400">
              <p>Features</p>
              <p>Community</p>
              <p>Developers</p>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">Resources</h3>

            <div className="space-y-3 text-zinc-400">
              <p>Docs</p>
              <p>API</p>
              <p>Support</p>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">Social</h3>

            <div className="space-y-3 text-zinc-400">
              <p>Twitter</p>
              <p>GitHub</p>
              <p>LinkedIn</p>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800 mt-12 pt-8 text-zinc-500 text-sm">
          © 2026 DevConnect. All rights reserved.
        </div>
      </div>
    </footer>
  );
}