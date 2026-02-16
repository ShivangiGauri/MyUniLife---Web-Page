export default function Overview() {
  return (
    <div>

      <h2 className="text-3xl font-semibold mb-8">
        Welcome back 👋
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

        {["Total Activities", "Hackathons", "Certifications"].map((item, i) => (
          <div
            key={i}
            className="bg-white dark:bg-[#1E293B]
                       p-6 rounded-2xl
                       shadow-[0_4px_20px_rgba(0,0,0,0.05)]
                       dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)]
                       transition hover:scale-[1.01]"
          >
            <p className="text-gray-500 dark:text-gray-400">
              {item}
            </p>
            <p className="text-3xl font-bold mt-2">
              {i === 0 ? "12" : i === 1 ? "5" : "3"}
            </p>
          </div>
        ))}

      </div>

      <div className="bg-white dark:bg-[#1E293B]
                      p-8 rounded-2xl
                      shadow-[0_4px_20px_rgba(0,0,0,0.05)]
                      dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)]">

        <h3 className="text-xl font-semibold mb-4">
          Recent Activities
        </h3>

        <div className="space-y-3 text-gray-600 dark:text-gray-300">
          <div>🏆 Won Hackathon – TechFest 2026</div>
          <div>🎓 Completed Certification – Full Stack</div>
          <div>🤝 Volunteered – Cultural Fest</div>
        </div>

      </div>

    </div>
  );
}
