import request from "supertest";

import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AppModule } from "@/infra/app.module";
import { PayableFactory } from "@test/factories/make-payable";
import { AssignorFactory } from "@test/factories/make-assignor";
import { DatabaseModule } from "@/infra/database/database.module";
import { beforeEach } from "vitest";

describe("AssignorController (e2e)", () => {
  let app: INestApplication;

  let assignorFactory: AssignorFactory;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [AssignorFactory, PayableFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    assignorFactory = moduleRef.get(AssignorFactory);
    await app.init();
  });

  describe("GET /integrations/assignor/:id", () => {
    it("should get a payable by id", async () => {
      const assignor = await assignorFactory.makePrismaAssignor();

      const response = await request(app.getHttpServer()).get(
        `/integrations/assignor/${assignor.id}`,
      );

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        id: assignor.id.toString(),
        document: assignor.document,
        email: assignor.email,
        phone: assignor.phone,
        name: assignor.name,
      });
    });
  });
});
