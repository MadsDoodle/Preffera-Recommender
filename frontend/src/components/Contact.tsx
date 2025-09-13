import { Mail, MapPin, Phone, Github, Linkedin, Twitter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const contactInfo = {
    name: "Madhav S Baidya",
    email: "madhavbaidyaiitbhu@gmail.com",
    phone: "+91 6900541047",
    location: "IIT(BHU) Varanasi, India",
    social: {
      github: "#",
      linkedin: "#",
      twitter: "#"
    }
  };

  return (
    <section id="contact" className="py-24 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero opacity-30">
        <div className="floating-shapes">
          <div className="floating-shape"></div>
          <div className="floating-shape"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center space-x-2 bg-card/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6 shadow-soft">
            <Mail className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Get In Touch</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
            Contact <span className="bg-gradient-electric bg-clip-text text-transparent">Us</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Have questions about Preferee? Want to collaborate? Reach out to our founder
          </p>
        </div>

        {/* Contact Card */}
        <Card className="bg-card/20 backdrop-blur-xl border-border/30 shadow-card hover-glow max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <div className="w-20 h-20 bg-gradient-electric rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
              <span className="text-2xl font-bold text-primary-foreground">
                {contactInfo.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">
              {contactInfo.name}
            </CardTitle>
            <p className="text-muted-foreground">Founder & CEO, Preferee</p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Contact Methods */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-smooth">
                <Mail className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium text-foreground">{contactInfo.email}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-smooth">
                <Phone className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium text-foreground">{contactInfo.phone}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-smooth md:col-span-2">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium text-foreground">{contactInfo.location}</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4 text-center">Connect on social media</p>
              <div className="flex justify-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-card/60 hover:bg-card hover:shadow-soft transition-all duration-300 hover:scale-105"
                  asChild
                >
                  <a href={contactInfo.social.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4" />
                  </a>
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-card/60 hover:bg-card hover:shadow-soft transition-all duration-300 hover:scale-105"
                  asChild
                >
                  <a href={contactInfo.social.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-4 h-4" />
                  </a>
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-card/60 hover:bg-card hover:shadow-soft transition-all duration-300 hover:scale-105"
                  asChild
                >
                  <a href={contactInfo.social.twitter} target="_blank" rel="noopener noreferrer">
                    <Twitter className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-6 text-center">
              <Button 
                className="bg-gradient-electric hover:shadow-glow transition-all duration-300 hover:scale-105"
                asChild
              >
                <a href={`mailto:${contactInfo.email}`}>
                  Send Email
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="bg-card/20 backdrop-blur-sm rounded-lg p-6 shadow-soft border border-border/30">
            <p className="text-muted-foreground">
              <strong>Business Inquiries:</strong> For partnerships, enterprise solutions, or media inquiries, 
              please reach out via email. We typically respond within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;