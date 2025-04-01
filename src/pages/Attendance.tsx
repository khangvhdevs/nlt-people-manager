
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronDown, CalendarIcon, Check, Clock, X } from 'lucide-react';
import { format } from 'date-fns';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock data for attendance
const mockTeams = [
  { id: '1', name: 'Marketing' },
  { id: '2', name: 'Design' },
  { id: '3', name: 'Development' },
  { id: '4', name: 'HR' },
  { id: '5', name: 'Sales' },
];

const mockEmployees = [
  {
    id: '1',
    name: 'Nguyen Van A',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=a',
    team: 'Marketing',
  },
  {
    id: '2',
    name: 'Tran Thi B',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=b',
    team: 'Design',
  },
  {
    id: '3',
    name: 'Le Van C',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=c',
    team: 'Development',
  },
  {
    id: '4',
    name: 'Pham Thi D',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=d',
    team: 'Marketing',
  },
  {
    id: '5',
    name: 'Hoang Van E',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=e',
    team: 'Development',
  },
  {
    id: '6',
    name: 'Do Thi F',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=f',
    team: 'HR',
  },
  {
    id: '7',
    name: 'Vu Van G',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=g',
    team: 'Sales',
  },
];

// Generate random mock attendance data
const generateMockAttendance = (date: Date) => {
  return mockEmployees.map(employee => {
    const random = Math.random();
    let status;
    let hours;

    if (random > 0.9) {
      status = 'absent';
      hours = 0;
    } else if (random > 0.7) {
      status = 'late';
      hours = 6 + Math.floor(Math.random() * 2);
    } else {
      status = 'present';
      hours = 8 + Math.floor(Math.random() * 2);
    }

    return {
      id: `${employee.id}-${format(date, 'yyyy-MM-dd')}`,
      employeeId: employee.id,
      name: employee.name,
      avatar: employee.avatar,
      team: employee.team,
      date: date,
      status,
      hours,
      checkinTime: status !== 'absent' ? `0${7 + Math.floor(Math.random() * 3)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}` : null,
      checkoutTime: status !== 'absent' ? `${15 + Math.floor(Math.random() * 3)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}` : null,
    };
  });
};

const Attendance = () => {
  const { t } = useLanguage();
  const [date, setDate] = useState<Date>(new Date());
  const [selectedTeam, setSelectedTeam] = useState<string>('all');
  const [attendanceData, setAttendanceData] = useState(() => generateMockAttendance(new Date()));

  // Filter attendance data based on selected team and date
  const filteredAttendance = attendanceData.filter(record => {
    const dateMatches = format(record.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
    const teamMatches = selectedTeam === 'all' || record.team === selectedTeam;
    return dateMatches && teamMatches;
  });

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
      setAttendanceData(generateMockAttendance(newDate));
    }
  };

  const handleTeamChange = (value: string) => {
    setSelectedTeam(value);
  };

  const handleAttendanceStatusChange = (employeeId: string, status: string) => {
    setAttendanceData(prev => 
      prev.map(record => {
        if (record.employeeId === employeeId && format(record.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')) {
          let hours = 0;
          if (status === 'present') hours = 8;
          else if (status === 'late') hours = 6;
          
          return {
            ...record,
            status,
            hours,
            checkinTime: status !== 'absent' ? record.checkinTime || '09:00' : null,
            checkoutTime: status !== 'absent' ? record.checkoutTime || '17:00' : null,
          };
        }
        return record;
      })
    );
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t('attendance.title')}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t('attendance.date')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(date, 'PPP')}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t('attendance.filterBy')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedTeam} onValueChange={handleTeamChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select team" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Teams</SelectItem>
                {mockTeams.map(team => (
                  <SelectItem key={team.id} value={team.name}>{team.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Present:</span>
              <Badge variant="default" className="bg-green-500">
                {filteredAttendance.filter(r => r.status === 'present').length}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Late:</span>
              <Badge variant="default" className="bg-yellow-500">
                {filteredAttendance.filter(r => r.status === 'late').length}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Absent:</span>
              <Badge variant="default" className="bg-red-500">
                {filteredAttendance.filter(r => r.status === 'absent').length}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('employees.name')}</TableHead>
              <TableHead>{t('employees.team')}</TableHead>
              <TableHead>Check-in</TableHead>
              <TableHead>Check-out</TableHead>
              <TableHead>Hours</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>{t('employees.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAttendance.length > 0 ? (
              filteredAttendance.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={record.avatar} alt={record.name} />
                        <AvatarFallback>{record.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <span>{record.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{record.team}</TableCell>
                  <TableCell>{record.checkinTime || '-'}</TableCell>
                  <TableCell>{record.checkoutTime || '-'}</TableCell>
                  <TableCell>{record.hours}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={
                        record.status === 'present' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' 
                          : record.status === 'late' 
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100' 
                            : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                      }
                    >
                      {record.status === 'present' 
                        ? t('attendance.present') 
                        : record.status === 'late' 
                          ? t('attendance.late') 
                          : t('attendance.absent')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          {t('attendance.markAttendance')} <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleAttendanceStatusChange(record.employeeId, 'present')}>
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>{t('attendance.present')}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAttendanceStatusChange(record.employeeId, 'late')}>
                          <Clock className="mr-2 h-4 w-4 text-yellow-500" />
                          <span>{t('attendance.late')}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAttendanceStatusChange(record.employeeId, 'absent')}>
                          <X className="mr-2 h-4 w-4 text-red-500" />
                          <span>{t('attendance.absent')}</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4">
                  No attendance records found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Attendance;
