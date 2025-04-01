
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Bell,
  Moon,
  Sun,
  Globe,
  Lock,
  User,
  Shield,
  MessageSquare,
  Webhook,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSaveApiSettings = () => {
    toast({
      title: 'API Settings Saved',
      description: 'Your webhook settings have been saved successfully.',
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: 'Notification Settings Saved',
      description: 'Your notification preferences have been updated.',
    });
  };

  const handleSaveProfile = () => {
    toast({
      title: 'Profile Updated',
      description: 'Your profile information has been updated successfully.',
    });
  };

  const handlePasswordChange = () => {
    toast({
      title: 'Password Changed',
      description: 'Your password has been changed successfully. Please use your new password next time you log in.',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{t('sidebar.settings')}</h2>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          {(user?.role === 'admin' || user?.role === 'hr') && (
            <TabsTrigger value="api">API & Webhooks</TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize how the NLT System looks on your device.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                  <Label htmlFor="theme-mode">{theme === 'dark' ? t('theme.dark') : t('theme.light')}</Label>
                </div>
                <Switch
                  id="theme-mode"
                  checked={theme === 'dark'}
                  onCheckedChange={toggleTheme}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Language</CardTitle>
              <CardDescription>
                Change the display language for all text in the application.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Globe className="h-5 w-5" />
                  <Label htmlFor="language">
                    {language === 'en' ? t('language.en') : t('language.vi')}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant={language === 'en' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setLanguage('en')}
                  >
                    🇺🇸 English
                  </Button>
                  <Button 
                    variant={language === 'vi' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setLanguage('vi')}
                  >
                    🇻🇳 Tiếng Việt
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information and how you appear in the system.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback>{user?.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">{user?.name}</h3>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                  <p className="text-sm text-muted-foreground capitalize">{user?.role}</p>
                  <Button variant="outline" size="sm">Change Avatar</Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={user?.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue={user?.email} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="Enter your phone number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input id="position" disabled value={user?.role.charAt(0).toUpperCase() + user?.role.slice(1)} />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleSaveProfile}>{t('form.save')}</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose what notifications you receive and how you receive them.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Email Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-attendance" className="flex items-center space-x-2">
                      <Bell className="h-4 w-4" />
                      <span>Attendance Reminders</span>
                    </Label>
                    <Switch id="email-attendance" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-performance" className="flex items-center space-x-2">
                      <Bell className="h-4 w-4" />
                      <span>Performance Reviews</span>
                    </Label>
                    <Switch id="email-performance" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-team" className="flex items-center space-x-2">
                      <Bell className="h-4 w-4" />
                      <span>Team Updates</span>
                    </Label>
                    <Switch id="email-team" defaultChecked />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Browser Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="browser-chat" className="flex items-center space-x-2">
                      <MessageSquare className="h-4 w-4" />
                      <span>New Messages</span>
                    </Label>
                    <Switch id="browser-chat" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="browser-task" className="flex items-center space-x-2">
                      <Bell className="h-4 w-4" />
                      <span>Task Assignments</span>
                    </Label>
                    <Switch id="browser-task" defaultChecked />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleSaveNotifications}>{t('form.save')}</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your password to keep your account secure.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <div className="flex justify-end">
                <Button onClick={handlePasswordChange}>Change Password</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>
                Add an extra layer of security to your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <Label htmlFor="two-factor">Enable Two-Factor Authentication</Label>
                </div>
                <Switch id="two-factor" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {(user?.role === 'admin' || user?.role === 'hr') && (
          <TabsContent value="api" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>API & Webhook Settings</CardTitle>
                <CardDescription>
                  Configure integrations with external systems.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="n8n-webhook">n8n Webhook URL</Label>
                  <div className="flex items-center space-x-2">
                    <Input id="n8n-webhook" defaultValue="https://n8n.nhileteam.com/webhook/123456" />
                    <Button variant="outline">Test</Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Webhook will be triggered for major employee and team events.
                  </p>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Webhook Events</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="webhook-new-employee" className="flex items-center space-x-2">
                        <Webhook className="h-4 w-4" />
                        <span>New Employee Added</span>
                      </Label>
                      <Switch id="webhook-new-employee" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="webhook-attendance" className="flex items-center space-x-2">
                        <Webhook className="h-4 w-4" />
                        <span>Attendance Status Changes</span>
                      </Label>
                      <Switch id="webhook-attendance" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="webhook-blacklist" className="flex items-center space-x-2">
                        <Webhook className="h-4 w-4" />
                        <span>Blacklist Updates</span>
                      </Label>
                      <Switch id="webhook-blacklist" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="webhook-reward" className="flex items-center space-x-2">
                        <Webhook className="h-4 w-4" />
                        <span>Rewards & Penalties</span>
                      </Label>
                      <Switch id="webhook-reward" defaultChecked />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={handleSaveApiSettings}>{t('form.save')}</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default Settings;
