import request from "supertest";

import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AppModule } from "@/infra/app.module";
import { makePayable, PayableFactory } from "@test/factories/make-payable";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { AssignorFactory, makeAssignor } from "@test/factories/make-assignor";
import { DatabaseModule } from "@/infra/database/database.module";

describe("PayableController (e2e)", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let assignorFactory: AssignorFactory;
  let payableFactory: PayableFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [AssignorFactory, PayableFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);
    assignorFactory = moduleRef.get(AssignorFactory);
    payableFactory = moduleRef.get(PayableFactory);
    await app.init();
  });

  describe("POST /integrations/payable", () => {
    it("should create a payable", async () => {
      const assignor = makeAssignor();
      const payable = makePayable();

      const response = await request(app.getHttpServer())
        .post("/integrations/payable")
        .send({
          value: payable.value,
          emissionDate: payable.emissionDate,
          assignor: {
            document: assignor.document,
            email: assignor.email,
            phone: assignor.phone,
            name: assignor.name,
          },
        });

      expect(response.status).toBe(201);

      const createdPayable = await prisma.payable.findUnique({
        where: { id: response.body.id },
      });

      expect(createdPayable).toMatchObject({
        value: payable.value,
        emissionDate: payable.emissionDate,
      });

      const createdAssignor = await prisma.assignor.findUnique({
        where: { id: createdPayable.assignorId },
      });

      expect(createdAssignor).toMatchObject({
        document: assignor.document,
        email: assignor.email,
        phone: assignor.phone,
        name: assignor.name,
      });
    });
  });

  describe("GET /integrations/payable/:id", () => {
    it("should get a payable by id", async () => {
      const assignor = await assignorFactory.makePrismaAssignor();
      const payable = await payableFactory.makePrismaPayable({
        assignorId: assignor.id,
      });

      const response = await request(app.getHttpServer()).get(
        `/integrations/payable/${payable.id}`,
      );

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        id: payable.id.toString(),
        value: payable.value,
        emissionDate: payable.emissionDate.toISOString(),
        assignorId: payable.assignorId.toString(),
      });
    });
  });
});
