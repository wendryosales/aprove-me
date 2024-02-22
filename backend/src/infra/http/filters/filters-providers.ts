import { APP_FILTER } from "@nestjs/core";
import { PrismaExceptionFilter } from "@/infra/http/filters/prisma-exception.filter";
import { Provider } from "@nestjs/common";
import { ResourceNotFoundFilter } from "@/infra/http/filters/resource-not-found.filter";

export const filtersProviders: Provider[] = [
  {
    provide: APP_FILTER,
    useClass: PrismaExceptionFilter,
  },
  {
    provide: APP_FILTER,
    useClass: ResourceNotFoundFilter,
  },
];
