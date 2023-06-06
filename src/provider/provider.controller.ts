import { Body, Controller, HttpException, InternalServerErrorException, Post, UploadedFile, UploadedFiles } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { AddProviderDTO } from './dto/add-provider.dto';
import { apiResponse } from 'src/helpers/apiresponse';

@Controller('provider')
export class ProviderController {
  constructor(private readonly providerService:ProviderService){}

  @Post()
  async registerProvider(@Body() addProviderDTO:AddProviderDTO,
  @UploadedFiles() files:Array<Express.Multer.File>){
    try {
      const [error,provider] = await this.providerService.registerProvider(addProviderDTO,files);
      if (error) return apiResponse(false, { error });
      return apiResponse(true, { provider });
    } catch (err) {
      console.log(err);
      if (err instanceof HttpException) throw err;
      else
        throw new InternalServerErrorException({
          status: false,
          error: err.message,
          message: 'Unable to register new provider'
        });
    }
  }
}
