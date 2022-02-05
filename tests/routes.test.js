const request = require('supertest')
const app = require('../server')
const mongoose = require("mongoose");

beforeAll(async () => {
    await mongoose
    .connect("mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true", { useNewUrlParser: true })
  })

describe('Post Endpoints', () => {
  it('Should get records', async () => {
    const res = await request(app)
      .post('/api/records')
      .send({
        "startDate": "2016-01-26",
        "endDate": "2020-02-02",
        "minCount": 4000,
        "maxCount": 6000  
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('code')
  })
})
