import { IsEmail, IsString } from 'class-validator';
import { ImageEntity } from 'src/image/models/image.entity';
import { Language } from './language.enum';
import { ProjectRepositoryEntity } from './projectRepository.entity';
import { ProjectStatusEntity } from './projectStatus.entity';
import { Status } from './status.enum';

export class Project {
  id?: number;
  name?: string;
  title?: string;
  text?: string;
  icons?: ImageEntity[];
  images?: ImageEntity[];
  status?: ProjectStatusEntity;
  website?: string;
  repository?: ProjectRepositoryEntity;
  languageCode?: Language;
  created_at: Date;
  updated_at: Date;
}