import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

export default function Analytics() {
  const lineData = [
    { name: "Jan", participants: 120 },
    { name: "Feb", participants: 180 },
    { name: "Mar", participants: 250 },
    { name: "Apr", participants: 210 },
    { name: "May", participants: 300 },
    { name: "Jun", participants: 350 },
  ];

  const pieData = [
    { name: "Technology", value: 400 },
    { name: "Arts", value: 300 },
    { name: "Sports", value: 300 },
    { name: "Academics", value: 200 },
  ];

  const COLORS = ["#89A8B2", "#F08B51", "#73C2FB", "#EAD8B1"];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Platform Analytics</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">View platform usage and statistics.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Line Chart Card */}
        <div className="bg-[#E5E1DA] dark:bg-[#393E46] rounded-2xl shadow-sm p-6 hover:scale-[1.02] transition duration-200">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-6">Participation Over Time</h2>
          <div style={{ width: "100%", height: "300px" }}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" opacity={0.5} />
                <XAxis dataKey="name" stroke="#8884d8" />
                <YAxis stroke="#8884d8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#222831', borderRadius: '10px', color: '#fff', border: 'none' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="participants" 
                  stroke="#89A8B2" 
                  strokeWidth={3}
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart Card */}
        <div className="bg-[#E5E1DA] dark:bg-[#393E46] rounded-2xl shadow-sm p-6 hover:scale-[1.02] transition duration-200">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-6">Event Categories Distribution</h2>
          <div style={{ width: "100%", height: "300px" }}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={60}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#222831', borderRadius: '10px', color: '#fff', border: 'none' }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
