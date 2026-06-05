"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Users, Building2, Globe, Activity, TrendingUp, Calendar, RefreshCw } from "lucide-react";
import { SectionContainer } from "@/components/landing/section-container";
import { getMetrics, getEvents, clearAnalytics } from "@/lib/analytics";

export default function AdminMetricsPage() {
  const [metrics, setMetrics] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    loadMetrics();
  }, []);

  const loadMetrics = () => {
    setMetrics(getMetrics());
    setEvents(getEvents());
  };

  const handleClearData = () => {
    if (confirm("Are you sure you want to clear all analytics data?")) {
      clearAnalytics();
      loadMetrics();
    }
  };

  if (!metrics) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <p className="text-muted-foreground">Loading metrics...</p>
      </div>
    );
  }

  const roleLabels: Record<string, string> = {
    Patient: "Patients",
    Doctor: "Doctors",
    Nurse: "Nurses",
    Pharmacist: "Pharmacists",
    "Hospital Administrator": "Hospital Administrators",
    "Public Health Professional": "Public Health Professionals",
    "NGO Representative": "NGO Representatives",
    "Government Official": "Government Officials",
    Investor: "Investors",
    Student: "Students",
    Other: "Other",
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#2563EB] to-[#7C3AED] py-12">
        <SectionContainer>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
              <p className="mt-2 text-white/80">Waitlist Analytics & Metrics</p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={loadMetrics}
                className="bg-white/20 border-white/30 text-white hover:bg-white/30"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearData}
                className="bg-red-500/20 border-red-500/30 text-white hover:bg-red-500/30"
              >
                Clear Data
              </Button>
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* Metrics Grid */}
      <SectionContainer className="py-12">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-[#2563EB]" />
              <span className="text-xs text-muted-foreground">Total</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{metrics.totalSignups}</p>
            <p className="text-sm text-muted-foreground mt-1">Waitlist Signups</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <Globe className="w-8 h-8 text-[#7C3AED]" />
              <span className="text-xs text-muted-foreground">Global</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{metrics.countriesRepresented}</p>
            <p className="text-sm text-muted-foreground mt-1">Countries Represented</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8 text-[#10B981]" />
              <span className="text-xs text-muted-foreground">Views</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{metrics.pageViews}</p>
            <p className="text-sm text-muted-foreground mt-1">Page Views</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-[#F59E0B]" />
              <span className="text-xs text-muted-foreground">Rate</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{metrics.conversionRate.toFixed(1)}%</p>
            <p className="text-sm text-muted-foreground mt-1">Conversion Rate</p>
          </div>
        </div>

        {/* Role Breakdown */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
            <h2 className="text-xl font-semibold text-foreground mb-6">Signups by Role</h2>
            <div className="space-y-4">
              {Object.entries(metrics.roleCounts).map(([role, count]) => (
                <div key={role} className="flex items-center justify-between">
                  <span className="text-muted-foreground">{roleLabels[role] || role}</span>
                  <span className="font-semibold text-foreground">{String(count)}</span>
                </div>
              ))}
              {Object.keys(metrics.roleCounts).length === 0 && (
                <p className="text-sm text-muted-foreground">No data yet</p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
            <h2 className="text-xl font-semibold text-foreground mb-6">Signups by Country</h2>
            <div className="space-y-4">
              {Object.entries(metrics.countryCounts).map(([country, count]) => (
                <div key={country} className="flex items-center justify-between">
                  <span className="text-muted-foreground">{country}</span>
                  <span className="font-semibold text-foreground">{String(count)}</span>
                </div>
              ))}
              {Object.keys(metrics.countryCounts).length === 0 && (
                <p className="text-sm text-muted-foreground">No data yet</p>
              )}
            </div>
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <Building2 className="w-6 h-6 text-[#2563EB]" />
              <span className="text-xs text-muted-foreground">Engagement</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{metrics.formStarts}</p>
            <p className="text-sm text-muted-foreground mt-1">Form Started</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-6 h-6 text-[#7C3AED]" />
              <span className="text-xs text-muted-foreground">Interest</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{metrics.demoClicks}</p>
            <p className="text-sm text-muted-foreground mt-1">Demo Requests</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="w-6 h-6 text-[#10B981]" />
              <span className="text-xs text-muted-foreground">Timeline</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{events.length}</p>
            <p className="text-sm text-muted-foreground mt-1">Total Events</p>
          </div>
        </div>

        {/* Recent Events */}
        <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
          <h2 className="text-xl font-semibold text-foreground mb-6">Recent Events</h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {events.slice(-10).reverse().map((event, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-[#F8FAFC] rounded-lg">
                <div>
                  <p className="font-medium text-foreground">{event.eventName}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(event.timestamp).toLocaleString()}
                  </p>
                </div>
                {event.properties && (
                  <div className="text-xs text-muted-foreground">
                    {Object.entries(event.properties).map(([key, value]) => (
                      <span key={key} className="ml-2">
                        {key}: {String(value)}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {events.length === 0 && (
              <p className="text-sm text-muted-foreground">No events recorded yet</p>
            )}
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
