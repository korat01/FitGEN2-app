import ClientForm from "@/components/ClientForm";
import ProgrammeDisplay from "@/components/ProgrammeDisplay";
import { ProgressCircle } from "@/components/ProgressCircle";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgrammeHebdomadaire } from "@/types/programme";
import { useState } from "react";
import { Dumbbell, Apple, Droplets, Activity } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [programme, setProgramme] = useState<ProgrammeHebdomadaire | null>(null);

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-sm font-medium text-primary mb-2">FITGEN</h2>
          <h1 className="text-3xl font-bold text-foreground mb-6">
            Hello Alex
          </h1>
        </div>

        {/* Main Cards Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {/* Workout Card - Large */}
          <Link to="/blocs-entrainement" className="col-span-2">
            <div className="fitgen-card-accent p-6 hover:scale-[1.02] transition-transform">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Workout</h3>
                  <div className="flex items-center gap-4">
                    <ProgressCircle percentage={78} size={80} value="78%" />
                  </div>
                </div>
                <Dumbbell className="w-8 h-8 text-primary" />
              </div>
            </div>
          </Link>

          {/* Nutrition Card */}
          <Link to="/nutrition">
            <div className="fitgen-card-accent p-4 hover:scale-[1.02] transition-transform">
              <div className="text-center">
                <Apple className="w-8 h-8 text-primary mx-auto mb-2" />
                <h3 className="text-lg font-semibold text-foreground">Nutrition</h3>
              </div>
            </div>
          </Link>

          {/* Hydration Card */}
          <div className="fitgen-card-accent p-4">
            <div className="text-center">
              <Droplets className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="text-lg font-semibold text-foreground">Hydration</h3>
            </div>
          </div>
        </div>

        {/* Programme Generator Section */}
        <div className="fitgen-card p-6 mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Generate Program</h2>
          <ClientForm onProgrammeGenerated={(profile, prog) => setProgramme(prog)} />
        </div>

        {programme && (
          <div className="fitgen-card p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Your Program</h2>
            <ProgrammeDisplay programme={programme} clientProfile={{}} />
          </div>
        )}

        {/* Bottom Brand */}
        <div className="text-center mt-8">
          <h3 className="text-2xl font-bold text-muted-foreground/30">FITGEN</h3>
        </div>
      </div>
    </div>
  );
};

export default Index;