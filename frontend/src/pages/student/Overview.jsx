import { Card } from "../../components/ui/Card";

export default function Overview() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
        Welcome back 👋
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {["Total Activities", "Hackathons", "Certifications"].map((item, i) => (
          <Card key={i} className="flex flex-col gap-2">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {item}
            </p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">
              {i === 0 ? "12" : i === 1 ? "5" : "3"}
            </p>
          </Card>
        ))}
      </div>

      <Card className="max-w-4xl">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
          Recent Activities
        </h2>

        <div className="space-y-4">
          {[
            { icon: "🏆", text: "Won Hackathon – TechFest 2026" },
            { icon: "🎓", text: "Completed Certification – Full Stack" },
            { icon: "🤝", text: "Volunteered – Cultural Fest" },
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800">
              <span className="text-2xl">{activity.icon}</span>
              <p className="text-slate-700 dark:text-slate-300 font-medium">{activity.text}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
