import request from "supertest";

import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AppModule } from "@/infra/app.module";
import {
  makeReceivable,
  ReceivableFactory,
} from "@test/factories/make-receivable";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { AssignorFactory, makeAssignor } from "@test/factories/make-assignor";
import { DatabaseModule } from "@/infra/database/database.module";
import { describe } from "vitest";

describe("ReceivableController (e2e)", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let assignorFactory: AssignorFactory;
  let receivableFactory: ReceivableFactory;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [AssignorFactory, ReceivableFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);
    assignorFactory = moduleRef.get(AssignorFactory);
    receivableFactory = moduleRef.get(ReceivableFactory);
    await app.init();
  });

  describe("POST /integrations/receivable", () => {
    it("should create a receivable", async () => {
      const assignor = makeAssignor();
      const receivable = makeReceivable();

      const response = await request(app.getHttpServer())
        .post("/integrations/receivable")
        .send({
          value: receivable.value,
          emissionDate: receivable.emissionDate,
          assignor: {
            document: assignor.document,
            email: assignor.email,
            phone: assignor.phone,
            name: assignor.name,
          },
        });

      expect(response.status).toBe(201);

      const createdReceivable = await prisma.receivable.findUnique({
        where: { id: response.body.id },
      });

      expect(createdReceivable).toMatchObject({
        value: receivable.value,
        emissionDate: receivable.emissionDate,
      });

      const createdAssignor = await prisma.assignor.findUnique({
        where: { id: createdReceivable.assignorId },
      });

      expect(createdAssignor).toMatchObject({
        document: assignor.document,
        email: assignor.email,
        phone: assignor.phone,
        name: assignor.name,
      });
    });
  });

  describe("GET /integrations/receivable/:id", () => {
    it("should get a receivable by id", async () => {
      const assignor = await assignorFactory.makePrismaAssignor();
      const receivable = await receivableFactory.makePrismaReceivable({
        assignorId: assignor.id,
      });

      const response = await request(app.getHttpServer()).get(
        `/integrations/receivable/${receivable.id}`,
      );

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        id: receivable.id.toString(),
        value: receivable.value,
        emissionDate: receivable.emissionDate.toISOString(),
        assignorId: receivable.assignorId.toString(),
      });
    });
  });

  describe("PUT /integrations/receivable/:id", () => {
    it("should edit a receivable", async () => {
      const assignor = await assignorFactory.makePrismaAssignor();
      const receivable = await receivableFactory.makePrismaReceivable({
        assignorId: assignor.id,
      });

      const newValue = 1000;

      const response = await request(app.getHttpServer())
        .put(`/integrations/receivable/${receivable.id}`)
        .send({ value: newValue });

      expect(response.status).toBe(200);

      const updatedReceivable = await prisma.receivable.findUnique({
        where: { id: receivable.id.toString() },
      });

      expect(updatedReceivable).toMatchObject({
        value: newValue,
      });
    });
  });

  describe("DELETE /integrations/receivable/:id", () => {
    it("should delete a receivable", async () => {
      const assignor = await assignorFactory.makePrismaAssignor();
      const receivable = await receivableFactory.makePrismaReceivable({
        assignorId: assignor.id,
      });

      const response = await request(app.getHttpServer()).delete(
        `/integrations/receivable/${receivable.id}`,
      );

      expect(response.status).toBe(204);

      const deletedReceivable = await prisma.receivable.findUnique({
        where: { id: receivable.id.toString() },
      });

      expect(deletedReceivable).toBeNull();
    });
  });
});
