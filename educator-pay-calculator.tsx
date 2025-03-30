import React, { useState, useEffect } from 'react';

const EducatorPayCalculator = () => {
  const [classes, setClasses] = useState(0);
  const [fullDays, setFullDays] = useState(0);
  const [blogs, setBlogs] = useState(0);
  
  // Ensure fullDays can't exceed the maximum possible
  useEffect(() => {
    const maxPossibleFullDays = Math.floor(classes / 2);
    if (fullDays > maxPossibleFullDays) {
      setFullDays(maxPossibleFullDays);
    }
  }, [classes, fullDays]);
  
  // Constants
  const basePayPerClass = 100;
  const fullDayBonus = 25;
  const blogPay = 150;
  
  // Calculate volume bonus based on number of classes
  const getVolumeBonus = (classCount) => {
    if (classCount >= 9) return 75;
    if (classCount >= 7) return 50;
    if (classCount >= 5) return 25;
    if (classCount >= 2) return 10;
    return 0;
  };
  
  // Calculations
  const volumeBonus = getVolumeBonus(classes);
  const totalVolumeBonus = volumeBonus * classes;
  const totalFullDayBonus = fullDayBonus * fullDays;
  const baseTotal = basePayPerClass * classes;
  const totalBlogPay = blogPay * blogs;
  const grandTotal = baseTotal + totalVolumeBonus + totalFullDayBonus + totalBlogPay;
  
  // Format as USD
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };
  
  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Educator Pay Calculator</h1>
      
      <div className="grid grid-cols-1 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number of Classes Taught This Pay Period
          </label>
          <div className="flex items-center">
            <button 
              onClick={() => setClasses(Math.max(0, classes - 1))}
              className="px-3 py-1 bg-gray-200 rounded-l text-gray-700"
              disabled={classes <= 0}
            >
              -
            </button>
            <input
              type="number"
              min="0"
              max="40"
              value={classes}
              onChange={(e) => setClasses(Math.max(0, Math.min(40, parseInt(e.target.value) || 0)))}
              className="w-16 text-center border-y outline-none py-1"
            />
            <button 
              onClick={() => setClasses(Math.min(40, classes + 1))}
              className="px-3 py-1 bg-gray-200 rounded-r text-gray-700"
            >
              +
            </button>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number of Full Days Taught (Morning & Afternoon consecutive)
          </label>
          <div className="flex items-center">
            <button 
              onClick={() => setFullDays(Math.max(0, fullDays - 1))}
              className="px-3 py-1 bg-gray-200 rounded-l text-gray-700"
              disabled={fullDays <= 0}
            >
              -
            </button>
            <input
              type="number"
              min="0"
              max={Math.floor(classes / 2)}
              value={fullDays}
              onChange={(e) => setFullDays(Math.max(0, Math.min(Math.floor(classes / 2), parseInt(e.target.value) || 0)))}
              className="w-16 text-center border-y outline-none py-1"
            />
            <button 
              onClick={() => setFullDays(Math.min(Math.floor(classes / 2), fullDays + 1))}
              className="px-3 py-1 bg-gray-200 rounded-r text-gray-700"
              disabled={fullDays >= Math.floor(classes / 2)}
            >
              +
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">Maximum allowed: {Math.floor(classes / 2)}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number of Blogs Written
          </label>
          <div className="flex items-center">
            <button 
              onClick={() => setBlogs(Math.max(0, blogs - 1))}
              className="px-3 py-1 bg-gray-200 rounded-l text-gray-700"
              disabled={blogs <= 0}
            >
              -
            </button>
            <input
              type="number"
              min="0"
              value={blogs}
              onChange={(e) => setBlogs(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-16 text-center border-y outline-none py-1"
            />
            <button 
              onClick={() => setBlogs(blogs + 1)}
              className="px-3 py-1 bg-gray-200 rounded-r text-gray-700"
            >
              +
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h2 className="font-bold mb-3">Pay Breakdown</h2>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>Base Pay:</div>
          <div className="text-right">{formatCurrency(basePayPerClass)} × {classes} = {formatCurrency(baseTotal)}</div>
          
          <div>Volume Bonus:</div>
          <div className="text-right">{formatCurrency(volumeBonus)} × {classes} = {formatCurrency(totalVolumeBonus)}</div>
          
          <div>Full Day Bonus:</div>
          <div className="text-right">{formatCurrency(fullDayBonus)} × {fullDays} = {formatCurrency(totalFullDayBonus)}</div>
          
          <div>Blog Pay:</div>
          <div className="text-right">{formatCurrency(blogPay)} × {blogs} = {formatCurrency(totalBlogPay)}</div>
          
          <div className="border-t pt-1 font-bold">Total Pay:</div>
          <div className="border-t pt-1 text-right font-bold">{formatCurrency(grandTotal)}</div>
        </div>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg">
        <h2 className="font-bold mb-2">Pay Rate Summary</h2>
        <div className="text-sm space-y-1">
          <p>Base Rate: {formatCurrency(basePayPerClass)} per class</p>
          <p>Volume Bonus: {formatCurrency(volumeBonus)} per class</p>
          <p>Full Day Bonus: {formatCurrency(fullDayBonus)} per full day</p>
          <p>Blog Pay: {formatCurrency(blogPay)} per blog</p>
          <p className="font-bold pt-1">Effective Rate: {classes > 0 ? formatCurrency(grandTotal / classes) : formatCurrency(0)} per class</p>
        </div>
      </div>
    </div>
  );
};

export default EducatorPayCalculator;
