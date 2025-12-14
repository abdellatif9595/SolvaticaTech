export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  category: string;
  tags: string[];
  date: string;
  client?: {
    name: string;
    logo?: string;
  };
  duration?: string;
  technologies?: string[];
  gallery?: {
    id: string;
    image: string;
    title: string;
    description?: string;
  }[];
  challenges?: string[];
  results?: string[];
}

export interface Article {
  id: string;
  title: string;
  content: string;
  image: string;
  category: string;
  tags: string[];
  date: string;
  author: {
    name: string;
    avatar?: string;
    role?: string;
  };
  readTime: string;
  comments?: Comment[];
}

export interface Comment {
  id: string;
  author: {
    name: string;
    avatar?: string;
  };
  content: string;
  date: string;
  replies?: Comment[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  level: string;
  price: string;
  instructor: {
    name: string;
    avatar?: string;
    role?: string;
  };
  modules?: {
    id: string;
    title: string;
    description: string;
    duration: string;
  }[];
  reviews?: {
    id: string;
    author: {
      name: string;
      avatar?: string;
    };
    rating: number;
    content: string;
    date: string;
  }[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
  icon?: string;
}

export interface Testimonial {
  id: string;
  content: string;
  author: {
    name: string;
    role: string;
    company: string;
    avatar?: string;
  };
  rating: number;
  date: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar?: string;
  social?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface NewsletterForm {
  email: string;
}

export interface SearchFilters {
  category?: string;
  tags?: string[];
  date?: string;
  sort?: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
}

export interface ImageGalleryProps {
  images: {
    id: string;
    image: string;
    title: string;
    description?: string;
  }[];
}

export interface DetailPageNavProps {
  sections: {
    id: string;
    title: string;
  }[];
}

export interface NotificationProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
  onClose?: () => void;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnOutsideClick?: boolean;
  closeOnEscape?: boolean;
}

export interface FormProps {
  onSubmit: (data: any) => void;
  fields: {
    name: string;
    label: string;
    type: string;
    required?: boolean;
    options?: {
      label: string;
      value: string;
    }[];
  }[];
  submitText?: string;
  loading?: boolean;
}

export interface TableProps {
  columns: {
    key: string;
    label: string;
    sortable?: boolean;
    render?: (value: any, row: any) => React.ReactNode;
  }[];
  data: any[];
  loading?: boolean;
  emptyMessage?: string;
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
}

export interface CardProps {
  title: string;
  description?: string;
  image?: string;
  link?: string;
  onClick?: () => void;
  variant?: 'default' | 'featured' | 'compact';
  loading?: boolean;
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export interface InputProps {
  type?: string;
  name: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
  className?: string;
}

export interface SelectProps {
  name: string;
  label?: string;
  options: {
    label: string;
    value: string;
  }[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  error?: string;
  className?: string;
}

export interface TextareaProps {
  name: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  error?: string;
  className?: string;
  rows?: number;
}

export interface CheckboxProps {
  name: string;
  label: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
  className?: string;
}

export interface RadioProps {
  name: string;
  label: string;
  value: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
  className?: string;
}

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'white';
  className?: string;
  text?: string;
  fullScreen?: boolean;
  overlay?: boolean;
}

export interface AdvancedSearchProps {
  filters: {
    name: string;
    label: string;
    type: 'select' | 'multiselect' | 'date' | 'text';
    options?: {
      label: string;
      value: string;
    }[];
  }[];
  onSearch: (filters: any) => void;
  loading?: boolean;
  defaultValues?: any;
  showReset?: boolean;
} 