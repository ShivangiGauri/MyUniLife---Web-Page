function ContactAdmin() {
  return (
    <div className="bg-white dark:bg-[#1E293B]
                    p-8 rounded-2xl
                    shadow-[0_4px_20px_rgba(0,0,0,0.05)]
                    dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)]">

      <h2 className="text-3xl font-semibold mb-6">
        Contact Admin
      </h2>

      <form className="space-y-4">

        <input
          type="text"
          placeholder="Subject"
          className="w-full p-3 rounded-xl border
                     border-[#E9E5E1] dark:border-slate-700
                     bg-[#F8F5F2] dark:bg-slate-800
                     focus:outline-none focus:ring-2
                     focus:ring-[#9F7AEA]"
        />

        <textarea
          placeholder="Your message"
          rows="4"
          className="w-full p-3 rounded-xl border
                     border-[#E9E5E1] dark:border-slate-700
                     bg-[#F8F5F2] dark:bg-slate-800
                     focus:outline-none focus:ring-2
                     focus:ring-[#9F7AEA]"
        />

        <button
          type="submit"
          className="px-6 py-3 rounded-xl text-white
                     bg-gradient-to-r
                     from-[#9F7AEA] to-[#F6C1D9]
                     hover:opacity-90 transition">
          Send Message
        </button>

      </form>

    </div>
  );
}

export default ContactAdmin;
