// https://docs.nestjs.com/exception-filters#exception-filters-1
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from "@nestjs/common";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found.error";

@Catch(ResourceNotFoundError)
export class ResourceNotFoundFilter implements ExceptionFilter {
  catch(exception: ResourceNotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.status(HttpStatus.NOT_FOUND).json({
      statusCode: HttpStatus.NOT_FOUND,
      message: exception.message,
    });
  }
}
