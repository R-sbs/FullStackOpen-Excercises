import React, { useState } from "react";

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].label);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Tab Headers */}
      <div className="flex border-b border-gray-300 justify-around">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
            className={`py-2 px-4 transition duration-200 ${
              activeTab === tab.label
                ? "border-b-2 border-blue-500 font-semibold text-blue-600"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4 p-4 border border-gray-200 rounded">
        {tabs.find((tab) => tab.label === activeTab)?.content}
      </div>
    </div>
  );
};

export default Tabs;
