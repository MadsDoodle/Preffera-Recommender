import { Settings as SettingsIcon, User, Bell, Shield, Database } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Settings = () => {
  return (
    <div className="p-6 space-y-6 animate-slide-up">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-10 h-10 bg-gradient-electric rounded-lg flex items-center justify-center">
          <SettingsIcon className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Customize your Preferee experience</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-card/90 backdrop-blur-md border-border hover-glow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5 text-primary" />
              <span>Profile</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Manage your personal information and preferences</p>
          </CardContent>
        </Card>

        <Card className="bg-card/90 backdrop-blur-md border-border hover-glow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-primary" />
              <span>Notifications</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Configure how and when you receive updates</p>
          </CardContent>
        </Card>

        <Card className="bg-card/90 backdrop-blur-md border-border hover-glow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-primary" />
              <span>Privacy</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Control your data privacy and security settings</p>
          </CardContent>
        </Card>

        <Card className="bg-card/90 backdrop-blur-md border-border hover-glow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="w-5 h-5 text-primary" />
              <span>Data Management</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Export, import, or delete your recommendation data</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;