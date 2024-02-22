import request from "supertest";

import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AppModule } from "@/infra/app.module";
import { PayableFactory } from "@test/factories/make-payable";
import { AssignorFactory } from "@test/factories/make-assignor";
import { DatabaseModule } from "@/infra/database/database.module";
import { beforeEach, describe } from "vitest";
import { PrismaService } from "@/infra/database/prisma/prisma.service";

describe("AssignorController (e2e)", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let assignorFactory: AssignorFactory;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [AssignorFactory, PayableFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);
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

  describe("PUT /integrations/assignor/:id", () => {
    it("should update a assignor", async () => {
      const assignor = await assignorFactory.makePrismaAssignor();

      const response = await request(app.getHttpServer())
        .put(`/integrations/assignor/${assignor.id}`)
        .send({
          document: "123456789",
          email: "test@update.com",
        });

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        id: assignor.id.toString(),
        document: "123456789",
        email: "test@update.com",
      });

      const updatedAssignor = await prisma.payable.findUnique({
        where: { id: assignor.id.toString() },
      });

      expect(updatedAssignor).toMatchObject({
        document: "123456789",
        email: "test@update.com",
      });
    });
  });

  describe("DELETE /integrations/assignor/:id", () => {
    it("should delete a assignor", async () => {
      const assignor = await assignorFactory.makePrismaAssignor();

      const response = await request(app.getHttpServer()).delete(
        `/integrations/assignor/${assignor.id}`,
      );

      expect(response.status).toBe(200);

      const deletedAssignor = await prisma.assignor.findUnique({
        where: { id: assignor.id.toString() },
      });

      expect(deletedAssignor).toBeNull();
    });
  });
});
