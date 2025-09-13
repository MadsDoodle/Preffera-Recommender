import { useState } from "react";
import { Search, Sparkles, ArrowRight, X, Clock, User, Film, ToggleLeft, ToggleRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [userId, setUserId] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [userResults, setUserResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [recommendationType, setRecommendationType] = useState<"movie" | "user">("movie");

  const handleMovieSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setShowResults(false);
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/recommend/movie/?movie_name=${encodeURIComponent(searchQuery)}&top_n=5`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      if (data.error) {
        console.error("API Error:", data.error);
        setResults([]);
        return;
      }
      
      const resultsArray = Array.isArray(data) ? data : [];
      setResults(resultsArray);
      setShowResults(resultsArray.length > 0);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUserRec = async () => {
    if (!userId.trim()) return;
    
    setLoading(true);
    setShowResults(false);
    try {
      const res = await fetch(`http://127.0.0.1:8000/recommend/user/${userId}?top_n=5`, {
        headers: {
          "accept": "application/json"
        }
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      
      if (data.error) {
        console.error("API Error:", data.error);
        setUserResults([]);
        return;
      }
      
      const resultsArray = Array.isArray(data) ? data : [];
      setUserResults(resultsArray);
      setShowResults(resultsArray.length > 0);
    } catch (error) {
      console.error("Error fetching user recommendations:", error);
      setUserResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickGenreSearch = async (genre: string) => {
    if (recommendationType === "movie") {
      setSearchQuery(genre);
      setLoading(true);
      setResults([]);
      setShowResults(false);
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/recommend/movie/?movie_name=${encodeURIComponent(genre)}&top_n=5`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        if (data.error) {
          console.error("API Error:", data.error);
          setResults([]);
          return;
        }
        
        const resultsArray = Array.isArray(data) ? data : [];
        setResults(resultsArray);
        setShowResults(resultsArray.length > 0);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }
  };

  const closeResults = () => {
    setShowResults(false);
    setResults([]);
    setUserResults([]);
  };

  const toggleRecommendationType = () => {
    setRecommendationType(prev => prev === "movie" ? "user" : "movie");
    setShowResults(false);
    setResults([]);
    setUserResults([]);
    setSearchQuery("");
    setUserId("");
  };

  const handleSearch = () => {
    if (recommendationType === "movie") {
      handleMovieSearch();
    } else {
      handleUserRec();
    }
  };

  const currentResults = recommendationType === "movie" ? results : userResults;

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-hero">
        <div className="floating-shapes">
          <div className="floating-shape"></div>
          <div className="floating-shape"></div>
          <div className="floating-shape"></div>
          <div className="floating-shape"></div>
          <div className="floating-shape"></div>
          <div className="floating-shape"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 animate-slide-up">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 bg-card/80 backdrop-blur-sm rounded-full px-4 py-2 mb-8 shadow-soft">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">AI-Powered Recommendations</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
          Discover with
          <span className="block bg-gradient-electric bg-clip-text text-transparent">
            Preference
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Your personal AI movie recommendation engine that learns your preferences 
          and suggests the perfect films just for you.
        </p>

        {/* Recommendation Type Toggle */}
        <div className="flex items-center justify-center mb-8">
          <div className="bg-card/20 backdrop-blur-xl rounded-full p-1 border border-border/30 shadow-soft">
            <div className="flex items-center">
              <button
                onClick={() => recommendationType !== "movie" && toggleRecommendationType()}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                  recommendationType === "movie"
                    ? "bg-green-700 text-white shadow-lg"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Film className="w-4 h-4" />
                <span className="font-medium">Movie to Movie</span>
              </button>
              <button
                onClick={() => recommendationType !== "user" && toggleRecommendationType()}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                  recommendationType === "user"
                    ? "bg-green-700 text-white shadow-lg"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <User className="w-4 h-4" />
                <span className="font-medium">User Based</span>
              </button>
            </div>
          </div>
        </div>

        {/* Search Dashboard */}
        <div className="max-w-4xl mx-auto mb-8 relative">
          <div className="bg-card/20 backdrop-blur-xl rounded-2xl p-6 shadow-card border border-border/30 hover-glow">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                {recommendationType === "movie" ? (
                  <Input
                    type="text"
                    placeholder="What movies would you like to discover? Genre, actor, mood..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="pl-12 pr-4 py-6 text-lg border-0 bg-transparent focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground/60"
                  />
                ) : (
                  <Input
                    type="text"
                    placeholder="Enter your User ID for personalized recommendations..."
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="pl-12 pr-4 py-6 text-lg border-0 bg-transparent focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground/60"
                  />
                )}
              </div>
              <Button 
                size="lg" 
                onClick={handleSearch}
                disabled={loading || (recommendationType === "movie" && !searchQuery.trim()) || (recommendationType === "user" && !userId.trim())}
                className="px-8 py-6 bg-gradient-electric hover:shadow-glow transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="mr-2">{loading ? "Searching..." : "Discover"}</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="mt-6 text-center border-t border-border/20 pt-6">
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                  <p className="text-muted-foreground">
                    {recommendationType === "movie" 
                      ? "Finding perfect movie recommendations..."
                      : "Finding personalized recommendations for you..."
                    }
                  </p>
                </div>
              </div>
            )}

            {/* Table Results */}
            {showResults && currentResults.length > 0 && (
              <div className="mt-6 border-t border-border/20 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    {recommendationType === "movie" ? (
                      <Film className="w-5 h-5 text-primary" />
                    ) : (
                      <User className="w-5 h-5 text-primary" />
                    )}
                    <h3 className="text-lg font-semibold text-foreground">
                      {recommendationType === "movie" 
                        ? "Movie Recommendations" 
                        : "Personalized Recommendations"
                      }
                    </h3>
                    <span className="text-sm text-muted-foreground">({currentResults.length} results)</span>
                  </div>
                  <button
                    onClick={closeResults}
                    className="p-1 hover:bg-muted/20 rounded-full transition-colors duration-200"
                  >
                    <X className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                  </button>
                </div>

                <div className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/30 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-muted/20 border-b border-border/30">
                          <th className="text-left py-3 px-4 font-medium text-foreground text-sm">#</th>
                          <th className="text-left py-3 px-4 font-medium text-foreground text-sm">Movie Title</th>
                          <th className="text-center py-3 px-4 font-medium text-foreground text-sm">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentResults.map((movie, idx) => (
                          <tr
                            key={movie.movie_idx || idx}
                            className="group hover:bg-card/40 transition-all duration-300 border-b border-border/20 last:border-b-0 animate-fade-in"
                            style={{ animationDelay: `${idx * 0.1}s` }}
                          >
                            <td className="py-3 px-4">
                              <div className="flex items-center justify-center w-6 h-6 bg-primary/10 rounded-full text-primary font-semibold text-sm group-hover:bg-primary/20 transition-colors duration-300">
                                {idx + 1}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-3">
                                <div className="text-2xl group-hover:scale-110 transition-transform duration-300">🎬</div>
                                <div className="flex-1">
                                  <h4 className="font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                                    {movie.title}
                                  </h4>
                                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                    <span>Movie ID: {movie.movie_idx}</span>
                                    <span>•</span>
                                    <span>
                                      {recommendationType === "movie" 
                                        ? "Similar movie recommendation" 
                                        : "Personalized for you"
                                      }
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <Button
                                size="sm"
                                variant="outline"
                                className="bg-transparent border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
                              >
                                View Details
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Table Footer */}
                  <div className="bg-muted/10 border-t border-border/20 px-4 py-3">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Showing {currentResults.length} recommended movies</span>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>Just now</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <p className="text-xs text-muted-foreground">
                    {recommendationType === "movie" 
                      ? `Based on your search for "${searchQuery}"`
                      : `Personalized recommendations for User ID: ${userId}`
                    }
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions - Always reserve space */}
        <div className="mb-16">
          <div className={`flex flex-wrap justify-center gap-4 transition-all duration-300 ${
            recommendationType === "movie" ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
          }`}>
            {["Action", "Comedy", "Drama", "Sci-Fi", "Horror"].map((genre, index) => (
              <Button
                key={genre}
                variant="outline"
                onClick={() => handleQuickGenreSearch(genre)}
                disabled={loading || recommendationType !== "movie"}
                className="bg-card/20 backdrop-blur-md border-border/30 hover:bg-card/40 hover:shadow-soft transition-all duration-300 hover:scale-105 disabled:opacity-50"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {genre}
              </Button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-16 max-w-md mx-auto">
          {[
            { number: "50K+", label: "Recommendations" },
            { number: "10K+", label: "Happy Users" },
            { number: "99%", label: "Accuracy" },
          ].map((stat, index) => (
            <div key={stat.label} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="text-2xl font-bold text-primary">{stat.number}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;