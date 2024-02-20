import { Module } from "@nestjs/common";
import { PayableController } from "./controllers/payable.controller";

@Module({
  controllers: [PayableController],
})
export class HttpModule {}
