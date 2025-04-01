
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  Trash, 
  UserCheck, 
  AlertCircle,
  Clock
} from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Mock data for blacklisted employees
const mockBlacklist = [
  {
    id: '1',
    name: 'Nguyen Van X',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=x',
    email: 'nguyenvanx@nhileteam.com',
    reason: 'Violated NDA agreement',
    details: 'Shared confidential project information with competitors.',
    addedBy: 'Admin User',
    addedDate: new Date(2023, 5, 15),
    type: 'permanent',
    formerTeam: 'Marketing',
  },
  {
    id: '2',
    name: 'Tran Thi Y',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=y',
    email: 'tranthiy@nhileteam.com',
    reason: 'Poor performance',
    details: 'Failed to meet targets for 3 consecutive months despite multiple warnings.',
    addedBy: 'HR Manager',
    addedDate: new Date(2023, 7, 22),
    type: 'temporary',
    endDate: new Date(2024, 7, 22),
    formerTeam: 'Sales',
  },
  {
    id: '3',
    name: 'Le Van Z',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=z',
    email: 'levanz@nhileteam.com',
    reason: 'No-show',
    details: 'Stopped coming to work without notice for over 2 weeks.',
    addedBy: 'Team Leader',
    addedDate: new Date(2023, 9, 5),
    type: 'permanent',
    formerTeam: 'Development',
  },
  {
    id: '4',
    name: 'Pham Van W',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=w',
    email: 'phamvanw@nhileteam.com',
    reason: 'Unprofessional behavior',
    details: 'Multiple instances of inappropriate conduct in team meetings.',
    addedBy: 'HR Manager',
    addedDate: new Date(2023, 10, 12),
    type: 'temporary',
    endDate: new Date(2024, 4, 12),
    formerTeam: 'Design',
  },
];

// Mock data for employees to potentially blacklist
const mockEmployees = [
  {
    id: '11',
    name: 'Nguyen Van A',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=a',
    email: 'nguyenvana@nhileteam.com',
    team: 'Marketing',
  },
  {
    id: '12',
    name: 'Tran Thi B',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=b',
    email: 'tranthib@nhileteam.com',
    team: 'Design',
  },
  {
    id: '13',
    name: 'Le Van C',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=c',
    email: 'levanc@nhileteam.com',
    team: 'Development',
  },
];

const Blacklist = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [blacklistData, setBlacklistData] = useState(mockBlacklist);
  const [formData, setFormData] = useState({
    employeeId: '',
    reason: '',
    details: '',
    type: 'permanent',
    endDate: '',
  });
  const [openDialog, setOpenDialog] = useState(false);

  // Filter blacklist based on search query
  const filteredBlacklist = blacklistData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.addedBy.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleAddToBlacklist = () => {
    setFormData({
      employeeId: '',
      reason: '',
      details: '',
      type: 'permanent',
      endDate: '',
    });
    setOpenDialog(true);
  };

  const handleDeleteFromBlacklist = (id: string) => {
    setBlacklistData(blacklistData.filter((item) => item.id !== id));
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedEmployee = mockEmployees.find(emp => emp.id === formData.employeeId);
    
    if (selectedEmployee) {
      const newBlacklistEntry = {
        id: Date.now().toString(),
        name: selectedEmployee.name,
        avatarUrl: selectedEmployee.avatarUrl,
        email: selectedEmployee.email,
        reason: formData.reason,
        details: formData.details,
        addedBy: 'Current User', // Would be from auth context in a real app
        addedDate: new Date(),
        type: formData.type,
        ...(formData.type === 'temporary' && { endDate: new Date(formData.endDate) }),
        formerTeam: selectedEmployee.team,
      };
      
      setBlacklistData([...blacklistData, newBlacklistEntry]);
      setOpenDialog(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t('blacklist.title')}</h1>
        <Button onClick={handleAddToBlacklist}>
          <Plus className="mr-2 h-4 w-4" /> Add to Blacklist
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t('blacklist.search')}
          className="max-w-sm"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('blacklist.name')}</TableHead>
              <TableHead>Former Team</TableHead>
              <TableHead>{t('blacklist.reason')}</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>{t('blacklist.date')}</TableHead>
              <TableHead>{t('blacklist.addedBy')}</TableHead>
              <TableHead>{t('blacklist.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBlacklist.length > 0 ? (
              filteredBlacklist.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={item.avatarUrl} alt={item.name} />
                        <AvatarFallback>{item.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span>{item.name}</span>
                        <span className="text-xs text-muted-foreground">{item.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{item.formerTeam}</TableCell>
                  <TableCell>
                    <div className="max-w-[200px] truncate" title={item.reason}>
                      {item.reason}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={item.type === 'permanent' ? 'destructive' : 'outline'}>
                      {item.type === 'permanent' ? 'Permanent' : 'Temporary'}
                      {item.type === 'temporary' && item.endDate && (
                        <span className="ml-1">({format(item.endDate, 'MMM yyyy')})</span>
                      )}
                    </Badge>
                  </TableCell>
                  <TableCell>{format(item.addedDate, 'dd MMM yyyy')}</TableCell>
                  <TableCell>{item.addedBy}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => console.log('View details', item.id)}>
                          <AlertCircle className="mr-2 h-4 w-4" />
                          <span>View Details</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteFromBlacklist(item.id)}>
                          <Trash className="mr-2 h-4 w-4" />
                          <span>{t('form.delete')}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.log('Reinstate', item.id)}>
                          <UserCheck className="mr-2 h-4 w-4" />
                          <span>Reinstate</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4">
                  No blacklisted members found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add to Blacklist</DialogTitle>
            <DialogDescription>
              Add an employee to the blacklist. This will restrict their access to the system.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFormSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="employee">Employee</Label>
                <Select
                  value={formData.employeeId}
                  onValueChange={(value) => handleFormChange('employeeId', value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select employee" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockEmployees.map((employee) => (
                      <SelectItem key={employee.id} value={employee.id}>
                        {employee.name} - {employee.team}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="reason">{t('blacklist.reason')}</Label>
                <Input
                  id="reason"
                  value={formData.reason}
                  onChange={(e) => handleFormChange('reason', e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="details">Details</Label>
                <Textarea
                  id="details"
                  value={formData.details}
                  onChange={(e) => handleFormChange('details', e.target.value)}
                  rows={3}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="type">Blacklist Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => handleFormChange('type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="permanent">Permanent</SelectItem>
                      <SelectItem value="temporary">Temporary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {formData.type === 'temporary' && (
                  <div className="grid gap-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => handleFormChange('endDate', e.target.value)}
                      required={formData.type === 'temporary'}
                      min={format(new Date(), 'yyyy-MM-dd')}
                    />
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add to Blacklist</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Blacklist;
