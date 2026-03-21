import { useState } from "react";

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    maxParticipants: 500,
    platformRules: "1. Be respectful\n2. No spamming\n3. Clubs must host at least 1 event per semester",
  });
  const [categories, setCategories] = useState(["Technology", "Arts", "Sports", "Academics"]);
  const [newCategory, setNewCategory] = useState("");

  const handleSave = () => {
    // In a real app this would save to backend
    alert("Settings saved successfully!");
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory("");
    }
  };

  const handleRemoveCategory = (cat) => {
    setCategories(categories.filter(c => c !== cat));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Platform Settings</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Configure platform rules and categories.</p>
        </div>
        <button 
          onClick={handleSave}
          className="bg-[#89A8B2] text-white font-medium px-6 py-2.5 rounded-xl hover:bg-[#89A8B2]/90 transition-colors shadow-sm"
        >
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* General Settings */}
        <div className="bg-[#E5E1DA] dark:bg-[#393E46] rounded-2xl shadow-sm p-6 space-y-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">General Limits</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Default Max Participants per Event
            </label>
            <input 
              type="number" 
              value={settings.maxParticipants}
              onChange={(e) => setSettings({...settings, maxParticipants: e.target.value})}
              className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl p-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#89A8B2] focus:border-[#89A8B2] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Platform Rules & Guidelines
            </label>
            <textarea 
              rows="6"
              value={settings.platformRules}
              onChange={(e) => setSettings({...settings, platformRules: e.target.value})}
              className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl p-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#89A8B2] focus:border-[#89A8B2] outline-none"
            ></textarea>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">These rules are shown to users during registration.</p>
          </div>
        </div>

        {/* Categories Settings */}
        <div className="bg-[#E5E1DA] dark:bg-[#393E46] rounded-2xl shadow-sm p-6 space-y-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Event Categories</h2>
          
          <div className="flex gap-2">
            <input 
              type="text" 
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="New category name"
              className="flex-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl p-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#89A8B2] focus:border-[#89A8B2] outline-none"
              onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
            />
            <button 
              onClick={handleAddCategory}
              className="bg-[#B3C8CF] dark:bg-gray-700 text-gray-900 dark:text-white font-medium px-4 py-2 rounded-xl hover:bg-[#B3C8CF]/80 dark:hover:bg-gray-600 transition-colors"
            >
              Add
            </button>
          </div>

          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
            {categories.map((cat, index) => (
              <div key={index} className="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700">
                <span className="text-gray-800 dark:text-gray-200 font-medium">{cat}</span>
                <button 
                  onClick={() => handleRemoveCategory(cat)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 p-1.5 rounded-lg transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
            {categories.length === 0 && (
              <p className="text-gray-500 text-center py-4">No categories defined.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
