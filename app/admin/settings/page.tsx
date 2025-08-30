"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff, Save, RotateCcw, Settings } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "sonner";

export default function SettingsPage() {
  const supabase = createClientComponentClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      const { data, error } = await supabase
        .from("admin_settings")
        .select("*")
        .order("updated_at", { ascending: false })
        .limit(1)
        .single();

      if (!error && data) {
        setEmail(data.email);
        setPassword(data.password);
        setLastUpdated(data.updated_at);
      }
    };
    loadSettings();
  }, [supabase]);

  const handleSave = async () => {
    setLoading(true);

    const { error } = await supabase.from("admin_settings").insert([
      {
        email,
        password,
      },
    ]);

    setLoading(false);

    if (error) {
      toast.error("❌ Failed to update settings");
    } else {
      toast.success("✅ Settings updated successfully!");
      setLastUpdated(new Date().toISOString());
    }
  };

  const handleReset = () => {
    setEmail("");
    setPassword("");
    toast("🔄 Settings reset to default (not saved yet)");
  };

  return (
    <div className="ml-64 mt-20 p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-10">
        <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl">
          <Settings size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
          <p className="text-gray-500 text-sm">
            Manage your admin credentials and update securely.
          </p>
        </div>
      </div>

      {/* Card */}
      <Card className="max-w-xl backdrop-blur-md bg-white/80 border border-gray-200 shadow-xl rounded-3xl p-4">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            🔐 Admin Credentials
          </CardTitle>
          {lastUpdated && (
            <p className="text-sm text-gray-500 mt-1">
              Last updated: {new Date(lastUpdated).toLocaleString()}
            </p>
          )}
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Change Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter new email"
              className="w-full rounded-xl border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-3 border bg-white"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Change Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full rounded-xl border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-3 border pr-12 bg-white"
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

          {/* Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={handleSave}
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-3 rounded-xl shadow-lg flex items-center justify-center gap-2"
            >
              <Save size={18} />
              {loading ? "Saving..." : "Save Changes"}
            </Button>

            <Button
              onClick={handleReset}
              variant="outline"
              className="flex items-center justify-center gap-2 rounded-xl px-6"
            >
              <RotateCcw size={18} /> Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
