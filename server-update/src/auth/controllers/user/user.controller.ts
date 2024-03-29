import {
    Controller,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors,
    Request,
    Get,
    Res,
    Param,
    Req,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { join } from 'path';
  import { Observable, of } from 'rxjs';
  import { map, switchMap } from 'rxjs/operators';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
  
  import {
    isFileExtensionSafe,
    saveImageToStorage,
    removeFile,
  } from '../../helpers/image-storage';

  import { User } from '../../models/user.class';
import { UserService } from 'src/auth/services/user/user.service';
import { UserEntity } from 'src/auth/models/user.entity';

  @Controller('user')
  export class UserController {
    constructor(private userService: UserService) {}
  
    @UseGuards(JwtGuard)
    @Post('upload')
    @UseInterceptors(FileInterceptor('file', saveImageToStorage))
    uploadImage(
      @UploadedFile() file: Express.Multer.File,
      @Request() req,
    ): Observable<{ modifiedFileName: string } | { error: string }> {
      const fileName = file?.filename;
  
      if (!fileName) return of({ error: 'File must be a png, jpg' });
  
      const imagesFolderPath = join(process.cwd(), 'images');
      const fullImagePath = join(imagesFolderPath + '/' + file.filename);
  
      return isFileExtensionSafe(fullImagePath).pipe(
        switchMap((isFileLegit: boolean) => {
          if (isFileLegit) {
            const userId = req.user.id;
            return this.userService.updateUserImageById(userId, fileName).pipe(
              map(() => ({
                modifiedFileName: file.filename,
              })),
            );
          }
          removeFile(fullImagePath);
          return of({ error: 'File content does not match extension!' });
        }),
      );
    }
  
    @UseGuards(JwtGuard)
    @Get('image')
    findImage(@Request() req, @Res() res): Observable<Object> {
      const userId = req.user.id;
      return this.userService.findImageNameByUserId(userId).pipe(
        switchMap((imageName: string) => {
          return of(res.sendFile(imageName || "Mikolaj.png", { root: './images' }));
        }),
      );
    }
  
    @UseGuards(JwtGuard)
    @Get('image-name')
    findUserImageName(@Req() req): Observable<{ imageName: string }> {
      const userId = req.user.id;
      return this.userService.findImageNameByUserId(userId).pipe(
        switchMap((imageName: string) => {
          return of({ imageName });
        }),
      );
    }
  
    @UseGuards(JwtGuard)
    @Get('')
    findUserLoggedIn(@Req() req): Observable<UserEntity> {

      const userId = req?.user?.id
      return this.userService.findUserById(userId);
    }
    @UseGuards(JwtGuard)
    @Get(':userId')
    findUserById(@Param('userId') userStringId: string): Observable<UserEntity> {
      const userId = parseInt(userStringId);
      return this.userService.findUserById(userId);
    }
  
  
}