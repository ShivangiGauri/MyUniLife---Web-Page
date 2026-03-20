export default function Overview() {
  return (
    <div>

      <h2 className="text-3xl font-semibold mb-8 text-[#333333] dark:text-[#F5F5F5]">
        Welcome back 👋
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

        {["Total Activities", "Hackathons", "Certifications"].map((item, i) => (
          <div
            key={i}
            className="bg-[#DEE8CE] dark:bg-[#704264]
                       p-6 rounded-2xl
                       shadow-sm text-[#333333] dark:text-[#F5F5F5]
                       transition duration-200 hover:scale-[1.05]"
          >
            <p className="text-[#333333]/70 dark:text-[#F5F5F5]/70">
              {item}
            </p>
            <p className="text-3xl font-bold mt-2">
              {i === 0 ? "12" : i === 1 ? "5" : "3"}
            </p>
          </div>
        ))}

      </div>

      <div className="bg-[#DEE8CE] dark:bg-[#704264] text-[#333333] dark:text-[#F5F5F5]
                      p-8 rounded-2xl
                      shadow-sm transition duration-200 hover:scale-[1.05]">

        <h3 className="text-xl font-semibold mb-4">
          Recent Activities
        </h3>

        <div className="space-y-3 text-[#333333]/80 dark:text-[#F5F5F5]/80">
          <div>🏆 Won Hackathon – TechFest 2026</div>
          <div>🎓 Completed Certification – Full Stack</div>
          <div>🤝 Volunteered – Cultural Fest</div>
        </div>

      </div>

    </div>
  );
}
