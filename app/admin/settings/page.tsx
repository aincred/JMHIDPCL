"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff, Save } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Load saved credentials on page load
  useEffect(() => {
    const savedEmail = localStorage.getItem("admin_email") || "";
    const savedPass = localStorage.getItem("admin_password") || "";
    setEmail(savedEmail);
    setPassword(savedPass);
  }, []);

  const handleSave = () => {
    localStorage.setItem("admin_email", email);
    localStorage.setItem("admin_password", password);
    alert("✅ Settings updated successfully!");
  };

  return (
    <div className="ml-64 mt-20 p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">⚙️ Settings</h1>

      <Card className="max-w-xl shadow-lg border rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl">Admin Credentials</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Change Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter new email"
              className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-3 border"
            />
          </div>

          {/* Password with Show/Hide */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Change Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-3 border pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Save Button */}
          <Button
            onClick={handleSave}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg flex items-center justify-center gap-2"
          >
            <Save size={18} />
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
