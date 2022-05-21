import { IsEmail, IsString } from 'class-validator';
import { Status } from './status.enum';

export class Experience {
  id?: number;
  name?: string;
  title?: string;
  text?: string;
  icons?: string[];
  images?: string[];
  term?: string;
  status?: Status;
  website?: string;
}