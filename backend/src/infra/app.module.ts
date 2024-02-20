import { Module } from "@nestjs/common";
import { HttpModule } from "./http/http.module";
import { ConfigModule } from "@nestjs/config";
import { envSchema } from "./env/env";
import { EnvModule } from "./env/env.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => envSchema.parse(env),
    }),
    HttpModule,
    EnvModule,
  ],
})
export class AppModule {}
