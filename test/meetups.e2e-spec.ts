import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateMeetupDto } from 'src/api/modules/meetup/dto/create-meetup.dto';

const testDto: CreateMeetupDto = {
  title: 'testing',
  description: 'testing',
  meetingTime: new Date(),
  location: 'kdm',
  tags: [{ tagId: 1 }],
};

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let createdId: string;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/meetup (POST)', async (done) => {
    return request(app.getHttpServer())
      .post('/meetup')
      .expect(201)
      .send(testDto)
      .then(({ body }: request.Response) => {
        createdId = body.id;
        expect(createdId).toBeDefined();
        done();
      });
  });
});
