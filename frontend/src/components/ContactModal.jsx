import { useState } from "react";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { X } from "lucide-react";
import api from "../api/api";

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

      const response = await api.post("contact", {
        email: toEmail,
        subject,
        message
      });

      if (response.data) {
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
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setFeedback(err.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="bg-white dark:bg-slate-800 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden relative z-10 animate-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-700">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Send Message</h2>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Recipient Email"
              type="email"
              placeholder="name@university.edu"
              value={toEmail}
              onChange={(e) => setToEmail(e.target.value)}
              required
            />

            <Input
              label="Subject"
              type="text"
              placeholder="What is this regarding?"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Message</label>
              <textarea 
                placeholder="Write your message here..."
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                rows="5"
                className="w-full p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all resize-none" 
                required 
              />
              <p className="text-xs text-slate-400 text-right font-medium">{message.length}/1000</p>
            </div>

            {feedback && (
              <div className={`p-4 rounded-xl text-sm text-center font-bold animate-in fade-in slide-in-from-top-2 ${status === 'success' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400' : 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400'}`}>
                {feedback}
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <Button 
                variant="secondary" 
                type="button" 
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                isLoading={status === 'loading'}
                disabled={status === 'success' || !toEmail || !toEmail.includes('@') || message.length < 10}
                className="flex-1"
              >
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
