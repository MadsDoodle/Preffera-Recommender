import { Brain, Target, Zap, Shield, Users, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Intelligence",
    description: "Advanced machine learning algorithms that understand your unique preferences and patterns.",
    delay: "0s"
  },
  {
    icon: Target,
    title: "Precision Matching",
    description: "Highly accurate recommendations based on collaborative and content-based filtering.",
    delay: "0.1s"
  },
  {
    icon: Users,
    title: "Community Insights",
    description: "Leverage collective intelligence from users with similar tastes and preferences.",
    delay: "0.4s"
  },
  
];

const WhyPreferee = () => {
  return (
    <section id="why-preferee" className="py-12 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-hero opacity-50">
        <div className="floating-shapes">
          <div className="floating-shape"></div>
          <div className="floating-shape"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 animate-slide-up">
          <div className="inline-flex items-center space-x-2 bg-card/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6 shadow-soft">
            <Brain className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Why Choose Us</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
            Why <span className="bg-gradient-electric bg-clip-text text-transparent">Preferee</span>?
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Experience the next generation of personalized recommendations with our cutting-edge AI technology
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className="bg-card/20 backdrop-blur-xl border-border/30 hover-glow transition-all duration-300 hover:scale-105 animate-slide-up"
              style={{ animationDelay: feature.delay }}
            >
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-electric rounded-lg flex items-center justify-center mb-4 shadow-glow">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="bg-card/20 backdrop-blur-xl rounded-2xl p-8 shadow-card border border-border/30 hover-glow max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              Ready to discover your perfect matches?
            </h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of users who trust Preferee for personalized recommendations
            </p>
            <button className="bg-gradient-electric text-primary-foreground px-8 py-3 rounded-lg font-medium hover:shadow-glow transition-all duration-300 hover:scale-105">
              Start Your Journey
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyPreferee;