import { useState, useEffect } from "react";

export default function Support() {
  const [messages, setMessages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem("messages")) || [];
    
    if (savedMessages.length === 0) {
      savedMessages.push({
        id: 1,
        user: "John Doe",
        role: "student",
        content: "I can't see the new event I registered for.",
        time: new Date().toISOString(),
        status: "pending"
      });
      savedMessages.push({
        id: 2,
        user: "Tech Club",
        role: "club",
        content: "How do I increase max participants?",
        time: new Date(Date.now() - 86400000).toISOString(),
        status: "resolved"
      });
      localStorage.setItem("messages", JSON.stringify(savedMessages));
    }
    
    setMessages(savedMessages);
  }, []);

  const handleResolve = (id) => {
    const updated = messages.map(m => m.id === id ? { ...m, status: "resolved" } : m);
    setMessages(updated);
    localStorage.setItem("messages", JSON.stringify(updated));
  };

  const handleReplyClick = (msg) => {
    setSelectedMessage(msg);
    setIsModalOpen(true);
  };

  const submitReply = () => {
    if (!replyText.trim()) return;
    
    const updated = messages.map(m => 
      m.id === selectedMessage.id 
        ? { ...m, status: "resolved", reply: replyText } 
        : m
    );
    setMessages(updated);
    localStorage.setItem("messages", JSON.stringify(updated));
    
    setIsModalOpen(false);
    setSelectedMessage(null);
    setReplyText("");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Support System</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Manage user support requests and messages.</p>
        </div>
      </div>

      <div className="bg-[#E5E1DA] dark:bg-[#393E46] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#B3C8CF] dark:bg-gray-700/50 text-gray-700 dark:text-gray-200 text-sm uppercase tracking-wider">
                <th className="p-4 font-semibold">User</th>
                <th className="p-4 font-semibold">Role</th>
                <th className="p-4 font-semibold">Message</th>
                <th className="p-4 font-semibold">Time</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300 dark:divide-gray-600 text-gray-800 dark:text-gray-200">
              {messages.map((msg) => (
                <tr key={msg.id} className="hover:bg-white/50 dark:hover:bg-white/5 transition-colors">
                  <td className="p-4 font-medium">{msg.user}</td>
                  <td className="p-4 capitalize">{msg.role}</td>
                  <td className="p-4 max-w-xs truncate" title={msg.content}>{msg.content}</td>
                  <td className="p-4 text-sm whitespace-nowrap">{new Date(msg.time).toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${msg.status === 'resolved' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                      {msg.status}
                    </span>
                  </td>
                  <td className="p-4 flex justify-end gap-2">
                    {msg.status !== 'resolved' && (
                      <>
                        <button 
                          onClick={() => handleReplyClick(msg)}
                          className="bg-[#89A8B2] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#89A8B2]/90 transition-colors"
                        >
                          Reply
                        </button>
                        <button 
                          onClick={() => handleResolve(msg.id)}
                          className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                        >
                          Resolve
                        </button>
                      </>
                    )}
                    {msg.status === 'resolved' && msg.reply && (
                      <button 
                        onClick={() => alert(`Reply sent: ${msg.reply}`)}
                        className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm font-medium px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600"
                      >
                        View Reply
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {messages.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500 dark:text-gray-400">
                    No support messages found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reply Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#F1F0E8] dark:bg-[#222831] rounded-2xl w-full max-w-md p-6 shadow-xl">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Reply to {selectedMessage?.user}</h2>
            
            <div className="mb-4 p-3 bg-white dark:bg-gray-800 rounded-lg text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
              <span className="font-semibold block mb-1">Original Message:</span>
              {selectedMessage?.content}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Reply</label>
              <textarea 
                rows="4"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#89A8B2] focus:border-[#89A8B2] outline-none"
                placeholder="Type your reply here..."
              ></textarea>
            </div>

            <div className="flex justify-end gap-3">
              <button 
                onClick={() => {
                  setIsModalOpen(false);
                  setReplyText("");
                }}
                className="px-4 py-2 rounded-lg font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={submitReply}
                className="px-4 py-2 rounded-lg font-medium bg-[#89A8B2] text-white hover:bg-[#89A8B2]/90 transition-colors shadow-sm"
              >
                Send Reply & Resolve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
