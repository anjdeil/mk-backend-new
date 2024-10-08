import {
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  ValidationPipe,
  UnprocessableEntityException,
} from '@nestjs/common';

@Injectable()
export class ValidateInputPipe extends ValidationPipe {
  public async transform(value, metadata: ArgumentMetadata) {
    try {
      return await super.transform(value, metadata);
    } catch (e) {
      if (e instanceof BadRequestException) {
        throw new UnprocessableEntityException(this.handleError(e));
      } else {
        throw e;
      }
    }
  }

  private handleError(error) {
    const errors = error.getResponse()['message'];
    return Object.keys(errors).map((key) => {
      return errors[key];
    });
  }
}
