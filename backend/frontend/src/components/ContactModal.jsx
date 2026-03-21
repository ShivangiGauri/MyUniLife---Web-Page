import { useState } from "react";

export default function ContactModal({ isOpen, onClose, receiverEmail }) {
  const [toEmail, setToEmail] = useState(receiverEmail || "");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setFeedback("");

    try {
      // Basic Frontend validation
      if (!toEmail || !toEmail.includes("@")) {
        setStatus("error");
        setFeedback("Please enter a valid email address.");
        return;
      }
      
      if (!subject.trim() || message.trim().length < 10) {
        setStatus("error");
        setFeedback("Subject required. Message must be at least 10 characters.");
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        setStatus("error");
        setFeedback("Authentication token missing. Please log in.");
        return;
      }

      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          email: toEmail,
          subject,
          message
        })
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setFeedback("Message sent successfully!");
        setTimeout(() => {
          setSubject("");
          setMessage("");
          setToEmail(receiverEmail || "");
          setStatus("idle");
          setFeedback("");
          onClose();
        }, 2000);
      } else {
        setStatus("error");
        setFeedback(data.message || data.error || "Failed to send message.");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setFeedback("An unexpected error occurred.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#1E293B] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Send Message</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition text-2xl leading-none">&times;</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-1.5 text-gray-700 dark:text-gray-300">To</label>
              <input 
                type="email" 
                placeholder="Enter email address"
                value={toEmail} 
                onChange={(e) => setToEmail(e.target.value)}
                className="w-full p-3 bg-white dark:bg-[#1E293B] border border-gray-300 dark:border-slate-600 rounded-lg text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8E7DBE] dark:focus:ring-purple-500 transition-shadow" 
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1.5 text-gray-700 dark:text-gray-300">Subject</label>
              <input 
                type="text" 
                placeholder="What is this regarding?"
                value={subject} 
                onChange={(e) => setSubject(e.target.value)} 
                className="w-full p-3 bg-white dark:bg-[#1E293B] border border-gray-300 dark:border-slate-600 rounded-lg text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8E7DBE] dark:focus:ring-purple-500 transition-shadow" 
                required 
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1.5 text-gray-700 dark:text-gray-300">Message</label>
              <textarea 
                placeholder="Write your message here..."
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                rows="5"
                className="w-full p-3 bg-white dark:bg-[#1E293B] border border-gray-300 dark:border-slate-600 rounded-lg text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8E7DBE] dark:focus:ring-purple-500 transition-shadow resize-none" 
                required 
              ></textarea>
              <p className="text-xs text-gray-500 mt-1.5 text-right font-medium">{message.length}/1000</p>
            </div>

            {feedback && (
              <div className={`p-3 rounded-lg text-sm text-center font-bold ${status === 'success' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400' : 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400'}`}>
                {feedback}
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button 
                type="button" 
                onClick={onClose}
                className="w-1/3 py-3 font-bold rounded-lg bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-slate-600 transition"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={status === 'loading' || status === 'success' || !toEmail || !toEmail.includes('@') || message.length < 10}
                className="flex-1 py-3 font-bold rounded-lg bg-[#8E7DBE] dark:bg-purple-600 text-white shadow-md hover:bg-[#7a6bab] dark:hover:bg-purple-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}
