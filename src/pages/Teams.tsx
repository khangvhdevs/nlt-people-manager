
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Plus, Search, MoreHorizontal, Edit, Trash, Users, UserPlus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data for teams
const mockTeams = [
  {
    id: '1',
    name: 'Marketing',
    description: 'Handles all marketing campaigns and content creation',
    leader: {
      id: '1',
      name: 'Nguyen Van A',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=a',
    },
    coLeader: {
      id: '2',
      name: 'Tran Thi B',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=b',
    },
    memberCount: 8,
    status: 'active',
  },
  {
    id: '2',
    name: 'Design',
    description: 'Creates visual designs for all team projects',
    leader: {
      id: '3',
      name: 'Le Van C',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=c',
    },
    coLeader: {
      id: '4',
      name: 'Pham Thi D',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=d',
    },
    memberCount: 5,
    status: 'active',
  },
  {
    id: '3',
    name: 'Development',
    description: 'Develops and maintains software applications',
    leader: {
      id: '5',
      name: 'Hoang Van E',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=e',
    },
    coLeader: {
      id: '6',
      name: 'Do Thi F',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=f',
    },
    memberCount: 12,
    status: 'active',
  },
  {
    id: '4',
    name: 'HR',
    description: 'Manages human resources and recruitment',
    leader: {
      id: '7',
      name: 'Vu Van G',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=g',
    },
    coLeader: null,
    memberCount: 3,
    status: 'active',
  },
  {
    id: '5',
    name: 'Sales',
    description: 'Handles sales and client relationships',
    leader: {
      id: '8',
      name: 'Tran Van H',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=h',
    },
    coLeader: {
      id: '9',
      name: 'Nguyen Thi I',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=i',
    },
    memberCount: 7,
    status: 'inactive',
  },
];

// Mock employees for leaders selection
const mockEmployees = [
  { id: '1', name: 'Nguyen Van A', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=a' },
  { id: '2', name: 'Tran Thi B', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=b' },
  { id: '3', name: 'Le Van C', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=c' },
  { id: '4', name: 'Pham Thi D', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=d' },
  { id: '5', name: 'Hoang Van E', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=e' },
  { id: '6', name: 'Do Thi F', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=f' },
  { id: '7', name: 'Vu Van G', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=g' },
  { id: '8', name: 'Tran Van H', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=h' },
  { id: '9', name: 'Nguyen Thi I', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=i' },
];

const Teams = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [teamList, setTeamList] = useState(mockTeams);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    leader: {
      id: '',
      name: ''
    },
    coLeader: {
      id: '',
      name: ''
    },
    memberCount: 0,
    status: 'active',
  });
  const [isEditing, setIsEditing] = useState(false);

  // Filter teams based on search query
  const filteredTeams = teamList.filter(
    (team) =>
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleAddTeam = () => {
    setFormData({
      id: '',
      name: '',
      description: '',
      leader: {
        id: '',
        name: ''
      },
      coLeader: {
        id: '',
        name: ''
      },
      memberCount: 0,
      status: 'active',
    });
    setIsEditing(false);
    setOpenDialog(true);
  };

  const handleEditTeam = (team: any) => {
    setFormData({
      ...team,
      coLeader: team.coLeader || { id: '', name: '' },
    });
    setIsEditing(true);
    setOpenDialog(true);
  };

  const handleDeleteTeam = (id: string) => {
    setTeamList(teamList.filter((team) => team.id !== id));
  };

  const handleFormChange = (field: string, value: any) => {
    if (field === 'leader') {
      const selectedEmployee = mockEmployees.find(emp => emp.id === value);
      setFormData({
        ...formData,
        leader: {
          id: selectedEmployee?.id || '',
          name: selectedEmployee?.name || '',
          avatar: selectedEmployee?.avatar || '',
        },
      });
    } else if (field === 'coLeader') {
      if (value === '') {
        setFormData({
          ...formData,
          coLeader: null,
        });
      } else {
        const selectedEmployee = mockEmployees.find(emp => emp.id === value);
        setFormData({
          ...formData,
          coLeader: {
            id: selectedEmployee?.id || '',
            name: selectedEmployee?.name || '',
            avatar: selectedEmployee?.avatar || '',
          },
        });
      }
    } else {
      setFormData({
        ...formData,
        [field]: value,
      });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing) {
      setTeamList(
        teamList.map((team) =>
          team.id === formData.id ? formData : team
        )
      );
    } else {
      const newTeam = {
        ...formData,
        id: Date.now().toString(),
        memberCount: 1, // Starting with leader only
      };
      setTeamList([...teamList, newTeam]);
    }
    
    setOpenDialog(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t('teams.title')}</h1>
        <Button onClick={handleAddTeam}>
          <Plus className="mr-2 h-4 w-4" /> {t('teams.addNew')}
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t('teams.search')}
          className="max-w-sm"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeams.length > 0 ? (
          filteredTeams.map((team) => (
            <Card key={team.id} className={team.status === 'inactive' ? 'opacity-70' : ''}>
              <CardHeader className="space-y-1">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{team.name}</CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditTeam(team)}>
                        <Edit className="mr-2 h-4 w-4" />
                        <span>{t('form.edit')}</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteTeam(team.id)}>
                        <Trash className="mr-2 h-4 w-4" />
                        <span>{t('form.delete')}</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => console.log('Manage members', team.id)}>
                        <Users className="mr-2 h-4 w-4" />
                        <span>Manage Members</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription>{team.description}</CardDescription>
                <Badge variant={team.status === 'active' ? 'default' : 'secondary'} className="w-fit">
                  {team.status === 'active' ? 'Active' : 'Inactive'}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">{t('teams.leader')}:</p>
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={team.leader.avatar} alt={team.leader.name} />
                      <AvatarFallback>{team.leader.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{team.leader.name}</span>
                  </div>
                </div>
                
                {team.coLeader && (
                  <div>
                    <p className="text-sm font-medium mb-2">{t('teams.coLeader')}:</p>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={team.coLeader.avatar} alt={team.coLeader.name} />
                        <AvatarFallback>{team.coLeader.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{team.coLeader.name}</span>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="mr-2 h-4 w-4" />
                  <span>{team.memberCount} {t('teams.members')}</span>
                </div>
                <Button variant="outline" size="sm" onClick={() => console.log('Add member to team', team.id)}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  <span>Add Member</span>
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-4">
            No teams found
          </div>
        )}
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? 'Edit Team' : t('teams.addNew')}
            </DialogTitle>
            <DialogDescription>
              {isEditing
                ? 'Update team information'
                : 'Add a new team to the system'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFormSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">{t('teams.name')}</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleFormChange('name', e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleFormChange('description', e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="leader">{t('teams.leader')}</Label>
                  <Select
                    value={formData.leader?.id || ''}
                    onValueChange={(value) => handleFormChange('leader', value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select leader" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockEmployees.map((employee) => (
                        <SelectItem key={employee.id} value={employee.id}>
                          {employee.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="coLeader">{t('teams.coLeader')}</Label>
                  <Select
                    value={formData.coLeader?.id || ''}
                    onValueChange={(value) => handleFormChange('coLeader', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select co-leader (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">None</SelectItem>
                      {mockEmployees
                        .filter((emp) => emp.id !== formData.leader?.id)
                        .map((employee) => (
                          <SelectItem key={employee.id} value={employee.id}>
                            {employee.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
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
                {isEditing ? t('form.save') : t('teams.addNew')}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Teams;
