
"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { roSolutionRecommendation, type RoSolutionRecommendationOutput } from "@/ai/flows/ro-solution-recommendation-flow";
import { Droplets, Sparkles, Loader2, CheckCircle2, ChevronRight, AlertCircle } from "lucide-react";

export default function RecommendationTool() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RoSolutionRecommendationOutput | null>(null);
  const [formData, setFormData] = useState({
    industryType: "",
    requiredWaterQuality: "",
    dailyCapacityGPD: 1000
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await roSolutionRecommendation(formData);
      setResult(response);
    } catch (error) {
      console.error("AI flow error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-16 bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-sm">
            <Sparkles className="h-4 w-4" />
            AI-POWERED CONSULTANT
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Find Your Perfect Solution</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Answer a few questions about your requirements, and our AI will suggest the most efficient RO systems for your specific application.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form */}
          <div className="lg:col-span-4">
            <Card className="sticky top-24 shadow-lg border-primary/10">
              <CardHeader>
                <CardTitle className="font-headline text-xl">Requirements</CardTitle>
                <CardDescription>Tell us about your needs</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry Type</Label>
                    <Select onValueChange={(val) => setFormData({...formData, industryType: val})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Food & Beverage">Food & Beverage</SelectItem>
                        <SelectItem value="Pharmaceutical">Pharmaceutical</SelectItem>
                        <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="Commercial/Hospitality">Commercial/Hospitality</SelectItem>
                        <SelectItem value="Residential">Residential</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quality">Required Water Quality</Label>
                    <Select onValueChange={(val) => setFormData({...formData, requiredWaterQuality: val})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select quality level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Drinking Water">Drinking Water</SelectItem>
                        <SelectItem value="Process Water">Process Water</SelectItem>
                        <SelectItem value="Boiler Feed Water">Boiler Feed Water</SelectItem>
                        <SelectItem value="Ultrapure Water (Type I)">Ultrapure Water (Type I)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="capacity">Daily Capacity (GPD)</Label>
                    <Input 
                      id="capacity"
                      type="number"
                      value={formData.dailyCapacityGPD}
                      onChange={(e) => setFormData({...formData, dailyCapacityGPD: parseInt(e.target.value)})}
                      placeholder="e.g. 5000"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 py-6 text-lg"
                    disabled={loading || !formData.industryType || !formData.requiredWaterQuality}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      "Generate Recommendation"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-8">
            {!result && !loading && (
              <div className="h-full flex flex-col items-center justify-center p-12 border-2 border-dashed border-muted rounded-2xl text-center space-y-4">
                <div className="p-4 rounded-full bg-muted/50">
                  <Droplets className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold font-headline text-muted-foreground">Results will appear here</h3>
                <p className="text-muted-foreground max-w-xs">Fill out the form to see tailored water treatment solutions.</p>
              </div>
            )}

            {loading && (
              <div className="space-y-6">
                {[1, 2].map((n) => (
                  <Card key={n} className="animate-pulse">
                    <div className="p-8 space-y-4">
                      <div className="h-6 w-1/3 bg-muted rounded"></div>
                      <div className="h-4 w-full bg-muted rounded"></div>
                      <div className="h-4 w-5/6 bg-muted rounded"></div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {result && !loading && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold font-headline text-primary">Recommended Solutions</h2>
                  <Button variant="ghost" className="text-primary" onClick={() => setResult(null)}>Reset</Button>
                </div>
                
                <div className="grid gap-6">
                  {result.recommendedSolutions.map((sol, idx) => (
                    <Card key={idx} className="border-l-4 border-l-primary overflow-hidden hover:shadow-lg transition-shadow">
                      <CardContent className="p-8">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                          <div className="space-y-1">
                            <h3 className="text-2xl font-bold font-headline text-accent">{sol.solutionName}</h3>
                            <div className="flex gap-2 items-center text-sm text-primary font-medium">
                              <CheckCircle2 className="h-4 w-4" />
                              <span>{sol.capacityRangeGPD}</span>
                              <span className="text-muted-foreground">•</span>
                              <span>{sol.applicationArea}</span>
                            </div>
                          </div>
                          <Button className="shrink-0 bg-accent hover:bg-accent/90">
                            View Details <ChevronRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                        
                        <p className="text-muted-foreground leading-relaxed mb-6">
                          {sol.description}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {sol.keyFeatures.map((feat, fi) => (
                            <div key={fi} className="flex items-center gap-2 text-sm text-accent-foreground">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                              {feat}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {result.disclaimer && (
                  <div className="p-4 rounded-xl bg-muted/50 flex gap-3 text-sm text-muted-foreground">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <p>{result.disclaimer}</p>
                  </div>
                )}

                <Card className="bg-primary text-primary-foreground border-none">
                  <CardContent className="p-8 text-center space-y-4">
                    <h3 className="text-xl font-bold">Need a Detailed Quotation?</h3>
                    <p className="opacity-80">Our engineering team can refine these recommendations into a complete technical design.</p>
                    <Button variant="secondary" size="lg" className="rounded-full px-8">
                      Speak with an Expert
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
