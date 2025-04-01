
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Users, UserPlus, ClipboardCheck, BellRing } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Mock data
const attendanceData = [
  { name: 'Mon', attendance: 95 },
  { name: 'Tue', attendance: 90 },
  { name: 'Wed', attendance: 88 },
  { name: 'Thu', attendance: 92 },
  { name: 'Fri', attendance: 85 },
  { name: 'Sat', attendance: 75 },
  { name: 'Sun', attendance: 65 },
];

const recentActivities = [
  {
    id: 1,
    action: 'New member added',
    user: 'HR Manager',
    timestamp: '2 hours ago',
  },
  {
    id: 2,
    action: 'Attendance updated',
    user: 'Team Leader',
    timestamp: '3 hours ago',
  },
  {
    id: 3,
    action: 'Performance review scheduled',
    user: 'Admin User',
    timestamp: '5 hours ago',
  },
  {
    id: 4,
    action: 'New team created',
    user: 'Admin User',
    timestamp: '1 day ago',
  },
  {
    id: 5,
    action: 'Member moved to blacklist',
    user: 'HR Manager',
    timestamp: '2 days ago',
  },
];

const Dashboard = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">{t('dashboard.welcome')}</h2>
        <p className="text-muted-foreground">
          {user?.name}, {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('dashboard.totalEmployees')}
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245</div>
            <p className="text-xs text-muted-foreground mt-1">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('dashboard.activeTeams')}
            </CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground mt-1">
              +2 new teams this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('dashboard.attendanceRate')}
            </CardTitle>
            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85.5%</div>
            <p className="text-xs text-muted-foreground mt-1">
              -2.5% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Performance Score
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7.8</div>
            <p className="text-xs text-muted-foreground mt-1">
              +0.3 from last quarter
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>{t('dashboard.attendanceRate')}</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="attendance" fill="#0AB68B" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{t('dashboard.recentActivity')}</CardTitle>
            <BellRing className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start">
                  <div className="flex h-2 w-2 mt-1 rounded-full bg-primary"></div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-xs text-muted-foreground">{activity.user}</p>
                      <span className="text-xs text-muted-foreground">•</span>
                      <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
