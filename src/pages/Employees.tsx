
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Plus, Search, MoreHorizontal, Edit, Trash, Eye, Ban } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data for employees
const mockEmployees = [
  {
    id: '1',
    name: 'Nguyen Van A',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=a',
    email: 'nguyenvana@nhileteam.com',
    team: 'Marketing',
    position: 'Content Writer',
    status: 'active',
  },
  {
    id: '2',
    name: 'Tran Thi B',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=b',
    email: 'tranthib@nhileteam.com',
    team: 'Design',
    position: 'UI/UX Designer',
    status: 'active',
  },
  {
    id: '3',
    name: 'Le Van C',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=c',
    email: 'levanc@nhileteam.com',
    team: 'Development',
    position: 'Frontend Developer',
    status: 'inactive',
  },
  {
    id: '4',
    name: 'Pham Thi D',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=d',
    email: 'phamthid@nhileteam.com',
    team: 'Marketing',
    position: 'SEO Specialist',
    status: 'active',
  },
  {
    id: '5',
    name: 'Hoang Van E',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=e',
    email: 'hoangvane@nhileteam.com',
    team: 'Development',
    position: 'Backend Developer',
    status: 'active',
  },
  {
    id: '6',
    name: 'Do Thi F',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=f',
    email: 'dothif@nhileteam.com',
    team: 'HR',
    position: 'HR Manager',
    status: 'active',
  },
  {
    id: '7',
    name: 'Vu Van G',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=g',
    email: 'vuvang@nhileteam.com',
    team: 'Sales',
    position: 'Sales Representative',
    status: 'inactive',
  },
];

// Mock data for teams
const mockTeams = [
  { id: '1', name: 'Marketing' },
  { id: '2', name: 'Design' },
  { id: '3', name: 'Development' },
  { id: '4', name: 'HR' },
  { id: '5', name: 'Sales' },
  { id: '6', name: 'Finance' },
  { id: '7', name: 'Operations' },
];

// Mock positions
const mockPositions = [
  'Content Writer',
  'UI/UX Designer',
  'Frontend Developer',
  'Backend Developer',
  'SEO Specialist',
  'HR Manager',
  'Sales Representative',
  'Team Leader',
  'Co-Leader',
];

const Employees = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [employeeList, setEmployeeList] = useState(mockEmployees);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    team: '',
    position: '',
    status: 'active',
  });
  const [isEditing, setIsEditing] = useState(false);

  // Filter employees based on search query
  const filteredEmployees = employeeList.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.team.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleAddEmployee = () => {
    setFormData({
      id: '',
      name: '',
      email: '',
      team: '',
      position: '',
      status: 'active',
    });
    setIsEditing(false);
    setOpenDialog(true);
  };

  const handleEditEmployee = (employee: any) => {
    setFormData(employee);
    setIsEditing(true);
    setOpenDialog(true);
  };

  const handleDeleteEmployee = (id: string) => {
    setEmployeeList(employeeList.filter((employee) => employee.id !== id));
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing) {
      setEmployeeList(
        employeeList.map((employee) =>
          employee.id === formData.id ? { ...formData, avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name}` } : employee
        )
      );
    } else {
      const newEmployee = {
        ...formData,
        id: Date.now().toString(),
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name}`,
      };
      setEmployeeList([...employeeList, newEmployee]);
    }
    
    setOpenDialog(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t('employees.title')}</h1>
        <Button onClick={handleAddEmployee}>
          <Plus className="mr-2 h-4 w-4" /> {t('employees.addNew')}
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t('employees.search')}
          className="max-w-sm"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('employees.name')}</TableHead>
              <TableHead>{t('employees.team')}</TableHead>
              <TableHead>{t('employees.position')}</TableHead>
              <TableHead>{t('employees.status')}</TableHead>
              <TableHead>{t('employees.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={employee.avatarUrl} alt={employee.name} />
                        <AvatarFallback>{employee.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span>{employee.name}</span>
                        <span className="text-xs text-muted-foreground">{employee.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{employee.team}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>
                    <Badge variant={employee.status === 'active' ? 'default' : 'secondary'}>
                      {employee.status === 'active' ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => console.log('View', employee.id)}>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>{t('form.view')}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditEmployee(employee)}>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>{t('form.edit')}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteEmployee(employee.id)}>
                          <Trash className="mr-2 h-4 w-4" />
                          <span>{t('form.delete')}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.log('Blacklist', employee.id)}>
                          <Ban className="mr-2 h-4 w-4" />
                          <span>Add to Blacklist</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  No employees found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? 'Edit Employee' : t('employees.addNew')}
            </DialogTitle>
            <DialogDescription>
              {isEditing
                ? 'Update employee information'
                : 'Add a new employee to the system'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFormSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="name">{t('employees.name')}</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleFormChange('name', e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleFormChange('email', e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="team">{t('employees.team')}</Label>
                  <Select
                    value={formData.team}
                    onValueChange={(value) => handleFormChange('team', value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select team" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockTeams.map((team) => (
                        <SelectItem key={team.id} value={team.name}>
                          {team.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="position">{t('employees.position')}</Label>
                  <Select
                    value={formData.position}
                    onValueChange={(value) => handleFormChange('position', value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockPositions.map((position) => (
                        <SelectItem key={position} value={position}>
                          {position}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">{t('employees.status')}</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleFormChange('status', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">
                {isEditing ? t('form.save') : t('employees.addNew')}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Employees;
