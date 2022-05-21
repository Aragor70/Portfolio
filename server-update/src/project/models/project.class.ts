import { IsEmail, IsString } from 'class-validator';
import { Status } from './status.enum';

export class Project {
  id?: number;
  name?: string;
  title?: string;
  text?: string;
  icons?: string[];
  images?: string[];
  status?: Status;
  website?: string;
  repository?: string;
}