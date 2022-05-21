import { IsEmail, IsString } from 'class-validator';
import { Language } from './language.enum';
import { Status } from './status.enum';

export class Education {
  id?: number;
  name?: string;
  title?: string;
  text?: string;
  icons?: string[];
  images?: string[];
  term?: string;
  status?: Status;
  website?: string;
  languageCode?: Language;
  created_at: Date;
  updated_at: Date;
}