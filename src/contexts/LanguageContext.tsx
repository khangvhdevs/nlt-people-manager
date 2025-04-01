
import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'vi';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Common
    'app.name': 'NLT System',
    'app.title': 'NhiLe Team Human Management',
    'sidebar.dashboard': 'Dashboard',
    'sidebar.employees': 'Employees',
    'sidebar.teams': 'Teams',
    'sidebar.attendance': 'Attendance',
    'sidebar.blacklist': 'Blacklist',
    'sidebar.settings': 'Settings',
    'language.en': 'English',
    'language.vi': 'Vietnamese',
    'theme.dark': 'Dark Mode',
    'theme.light': 'Light Mode',
    
    // Auth
    'auth.login': 'Login',
    'auth.logout': 'Logout',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.forgotPassword': 'Forgot Password?',
    'auth.rememberMe': 'Remember Me',
    
    // Dashboard
    'dashboard.welcome': 'Welcome to NLT System',
    'dashboard.overview': 'Overview',
    'dashboard.totalEmployees': 'Total Employees',
    'dashboard.activeTeams': 'Active Teams',
    'dashboard.attendanceRate': 'Attendance Rate',
    'dashboard.recentActivity': 'Recent Activity',
    
    // Employees
    'employees.title': 'Employees Management',
    'employees.addNew': 'Add New Employee',
    'employees.search': 'Search employees...',
    'employees.name': 'Name',
    'employees.id': 'ID',
    'employees.team': 'Team',
    'employees.position': 'Position',
    'employees.status': 'Status',
    'employees.actions': 'Actions',
    
    // Teams
    'teams.title': 'Teams Management',
    'teams.addNew': 'Add New Team',
    'teams.search': 'Search teams...',
    'teams.name': 'Team Name',
    'teams.leader': 'Leader',
    'teams.coLeader': 'Co-Leader',
    'teams.members': 'Members',
    'teams.actions': 'Actions',
    
    // Attendance
    'attendance.title': 'Attendance Tracking',
    'attendance.date': 'Date',
    'attendance.markAttendance': 'Mark Attendance',
    'attendance.present': 'Present',
    'attendance.absent': 'Absent',
    'attendance.late': 'Late',
    'attendance.filterBy': 'Filter By',
    
    // Blacklist
    'blacklist.title': 'Blacklist Management',
    'blacklist.search': 'Search blacklist...',
    'blacklist.name': 'Name',
    'blacklist.reason': 'Reason',
    'blacklist.date': 'Date Added',
    'blacklist.addedBy': 'Added By',
    'blacklist.actions': 'Actions',
    
    // Forms
    'form.save': 'Save',
    'form.cancel': 'Cancel',
    'form.delete': 'Delete',
    'form.edit': 'Edit',
    'form.view': 'View',
    
    // Notifications
    'notification.success': 'Success!',
    'notification.error': 'Error!',
    'notification.warning': 'Warning!',
    'notification.info': 'Info!',
    
    // Chatbot
    'chatbot.placeholder': 'Ask me anything...',
    'chatbot.title': 'NLT Assistant',
    'chatbot.welcome': 'Hello! How can I help you today?',
  },
  vi: {
    // Common
    'app.name': 'NLT System',
    'app.title': 'Quản Lý Nhân Sự NhiLe Team',
    'sidebar.dashboard': 'Tổng Quan',
    'sidebar.employees': 'Thành Viên',
    'sidebar.teams': 'Nhóm',
    'sidebar.attendance': 'Chấm Công',
    'sidebar.blacklist': 'Danh Sách Đen',
    'sidebar.settings': 'Cài Đặt',
    'language.en': 'Tiếng Anh',
    'language.vi': 'Tiếng Việt',
    'theme.dark': 'Chế Độ Tối',
    'theme.light': 'Chế Độ Sáng',
    
    // Auth
    'auth.login': 'Đăng Nhập',
    'auth.logout': 'Đăng Xuất',
    'auth.email': 'Email',
    'auth.password': 'Mật Khẩu',
    'auth.forgotPassword': 'Quên Mật Khẩu?',
    'auth.rememberMe': 'Ghi Nhớ Đăng Nhập',
    
    // Dashboard
    'dashboard.welcome': 'Chào Mừng Đến Với NLT System',
    'dashboard.overview': 'Tổng Quan',
    'dashboard.totalEmployees': 'Tổng Số Thành Viên',
    'dashboard.activeTeams': 'Nhóm Hoạt Động',
    'dashboard.attendanceRate': 'Tỷ Lệ Chấm Công',
    'dashboard.recentActivity': 'Hoạt Động Gần Đây',
    
    // Employees
    'employees.title': 'Quản Lý Thành Viên',
    'employees.addNew': 'Thêm Thành Viên Mới',
    'employees.search': 'Tìm kiếm thành viên...',
    'employees.name': 'Tên',
    'employees.id': 'Mã Số',
    'employees.team': 'Nhóm',
    'employees.position': 'Vị Trí',
    'employees.status': 'Trạng Thái',
    'employees.actions': 'Thao Tác',
    
    // Teams
    'teams.title': 'Quản Lý Nhóm',
    'teams.addNew': 'Thêm Nhóm Mới',
    'teams.search': 'Tìm kiếm nhóm...',
    'teams.name': 'Tên Nhóm',
    'teams.leader': 'Trưởng Nhóm',
    'teams.coLeader': 'Phó Nhóm',
    'teams.members': 'Thành Viên',
    'teams.actions': 'Thao Tác',
    
    // Attendance
    'attendance.title': 'Theo Dõi Chấm Công',
    'attendance.date': 'Ngày',
    'attendance.markAttendance': 'Chấm Công',
    'attendance.present': 'Có Mặt',
    'attendance.absent': 'Vắng Mặt',
    'attendance.late': 'Đi Trễ',
    'attendance.filterBy': 'Lọc Theo',
    
    // Blacklist
    'blacklist.title': 'Quản Lý Danh Sách Đen',
    'blacklist.search': 'Tìm kiếm trong danh sách đen...',
    'blacklist.name': 'Tên',
    'blacklist.reason': 'Lý Do',
    'blacklist.date': 'Ngày Thêm',
    'blacklist.addedBy': 'Người Thêm',
    'blacklist.actions': 'Thao Tác',
    
    // Forms
    'form.save': 'Lưu',
    'form.cancel': 'Hủy',
    'form.delete': 'Xóa',
    'form.edit': 'Sửa',
    'form.view': 'Xem',
    
    // Notifications
    'notification.success': 'Thành Công!',
    'notification.error': 'Lỗi!',
    'notification.warning': 'Cảnh Báo!',
    'notification.info': 'Thông Tin!',
    
    // Chatbot
    'chatbot.placeholder': 'Hỏi tôi bất cứ điều gì...',
    'chatbot.title': 'Trợ Lý NLT',
    'chatbot.welcome': 'Xin chào! Tôi có thể giúp gì cho bạn hôm nay?',
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: () => '',
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
