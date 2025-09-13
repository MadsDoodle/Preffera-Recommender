import { Film, Star, Clock, TrendingUp, ArrowLeft, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Movies = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="flex-1 p-6 space-y-6 animate-slide-up ml-0 md:ml-0">
        <div className="flex items-center space-x-3 mb-8">
          
          <div className="w-10 h-10 bg-gradient-electric rounded-lg flex items-center justify-center">
            <Film className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Movies</h1>
            <p className="text-muted-foreground">Discover your next favorite film</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-card/20 backdrop-blur-xl border-border/30 hover-glow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-primary" />
                <span>Top Rated</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Explore highest-rated movies based on your preferences</p>
            </CardContent>
          </Card>

          <Card className="bg-card/20 backdrop-blur-xl border-border/30 hover-glow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span>Trending</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">What's popular right now in cinema</p>
            </CardContent>
          </Card>

          <Card className="bg-card/20 backdrop-blur-xl border-border/30 hover-glow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-primary" />
                <span>Recently Added</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Latest additions to our movie database</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Search/Query Input */}
      <div className="sticky bottom-0 p-6 bg-cream-base/95 backdrop-blur-xl border-t border-border/30">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card/30 backdrop-blur-xl rounded-xl p-4 border border-border/30">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="Tell me what kind of movies you're in the mood for..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pr-12 border-border/30 bg-background/50 focus:bg-background/80 transition-all"
                />
              </div>
              <Button 
                size="sm" 
                className="bg-gradient-electric hover:shadow-glow transition-all duration-300"
                disabled={!query.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              API integration coming soon - describe your preferences and get personalized recommendations
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movies;