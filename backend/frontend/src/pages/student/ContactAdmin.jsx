function ContactAdmin() {
  return (
    <div className="bg-[#DEE8CE] dark:bg-[#704264] text-[#333333] dark:text-[#F5F5F5]
                    p-8 rounded-2xl shadow-sm hover:scale-[1.02] transition duration-200">

      <h2 className="text-3xl font-semibold mb-6">
        Contact Admin
      </h2>

      <form className="space-y-4">

        <input
          type="text"
          placeholder="Subject"
          className="w-full p-3 rounded-xl border
                     border-[#333333]/30 dark:border-transparent
                     bg-[#FFF8E8] dark:bg-[#49243E]
                     focus:outline-none focus:ring-2
                     focus:ring-[#F08B51]"
        />

        <textarea
          placeholder="Your message"
          rows="4"
          className="w-full p-3 rounded-xl border
                     border-[#333333]/30 dark:border-transparent
                     bg-[#FFF8E8] dark:bg-[#49243E]
                     focus:outline-none focus:ring-2
                     focus:ring-[#F08B51]"
        />

        <button
          type="submit"
          className="px-6 py-3 rounded-xl text-white font-semibold shadow-sm
                     bg-[#F08B51] hover:bg-[#BB6653]
                     dark:bg-[#BB8493] dark:hover:bg-[#DBAFA0]
                     transition">
          Send Message
        </button>

      </form>

    </div>
  );
}

export default ContactAdmin;
