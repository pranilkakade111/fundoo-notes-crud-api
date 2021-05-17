const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const testSample = require('./lableTest.json');

chai.should();
chai.use(chaiHttp);

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByYW5pbGtha2FkZTJAZ21haWwuY29tIiwiaWQiOiI2MDliZWI3NWNlMmQ5ODEzYzhhMDg2MTgiLCJpYXQiOjE2MjExNzY5ODgsImV4cCI6MTYyMTI2MzM4OH0.kAe7pkblQAjI9ORPxJS61YlLm9sFsvdZiD7ea9RUMw8';
const invalidtoken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByYW5pbGtha2FkZTJAZ21haWwuY29tIiwiaWQiOiI2MDliZWI3NWNlMmQ5ODEzYzhhMDg2MTgiLCJpYXQiOjE2MjExNzY5ODgsImV4cCI6MTYyMTI2MzM4OH0.kAe7pkblQAjI9ORPxJS61YlLm9sFsvdZiD7ea9RUM';

describe('POST /lables', () => {
  it.only('whenGivenEndPointAndCorrectinput_ShouldAddLable_Successfully', () => {
    chai.request(server)
      .post('/lables')
      .set('token', `${token}`)
      .send(testSample.validlable)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
      });
  });

  it.only('whenGivenEndPointAndIncorrectCToken_ShouldNotAddLable_Successfully', () => {
    chai.request(server)
      .post('/lables')
      .set('token', `${invalidtoken}`)
      .send(testSample.validlable)
      .end((err, res) => {
        res.should.have.status(500);
      });
  });

  it.only('whenGivenEndPointAndEmptyLable_ShouldNotAddLable_Successfully', () => {
    chai.request(server)
      .post('/lables')
      .set('token', `${token}`)
      .send(testSample.emptylable)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
      });
  });
});

describe('PUT /lables/:lableId', () => {
  it.only('WhenGivenProperEndPointsPassWithCorrectHeader_shouldReturn_SuccessMessage', () => {
    chai.request(server)
      .put('/lables/609e920785c7c71abcb52631')
      .set('token', `${token}`)
      .send(testSample.updatelable)
      .end((err, res) => {
        res.should.have.status(200);
      });
  });

  it.only('WhenGivenProperEndPointsAndInvalidTokenPass_shouldReturn_ErrorMessage', () => {
    chai.request(server)
      .put('/lables/609e920785c7c71abcb52631')
      .set('token', `${invalidtoken}`)
      .send(testSample.updatelable)
      .end((err, res) => {
        res.should.have.status(401);
      });
  });

  it.only('WhenGivenProperEndPointsAndInvalidLabelIdPass_shouldNotReturn_MessageOfLabelFound', () => {
    chai.request(server)
      .put('/lables/609e920785c7c71abcb526')
      .set('token', `${token}`)
      .send(testSample.updatelable)
      .end((err, res) => {
        res.should.have.status(400);
      });
  });
});

describe('GET /lables', () => {
  it.only('WhenGivenProperEndPointsPassWithToken_shouldReturn_AllLabels', () => {
    chai.request(server)
      .get('/lables')
      .set('token', `${token}`)
      .send()
      .end((err, res) => {
        res.should.have.status(200);
      });
  });

  it.only('WhenGivenProperEndPointsAnd_IncorrectToken_should_Not_Return_AllLabels', () => {
    chai.request(server)
      .get('/lables')
      .set('token', `${invalidtoken}`)
      .send()
      .end((err, res) => {
        res.should.have.status(400);
      });
  });
});

describe('DELETE /lables/:lableId', () => {
  it.only('WhenGivenProperEndPointsPassWithCorrectHeader_shouldReturn_SuccessMessageAfterDeleteingLabel', () => {
    chai.request(server)
      .delete('/lables/609e920785c7c71abcb52631')
      .set('token', `${token}`)
      .end((err, res) => {
        res.should.have.status(200);
      });
  });

  it.only('WhenGivenProperEndPointsAndInvalidTokenPass_shouldReturn_ErrorMessage', () => {
    chai.request(server)
      .delete('/lables/609e920785c7c71abcb52631')
      .set('token', `${invalidtoken}`)
      .end((err, res) => {
        res.should.have.status(400);
      });
  });

  it.only('WhenGivenProperEndPointsAndInvalidLabelIdPass_shouldReturn_MessageOfLabelFound', () => {
    chai.request(server)
      .delete('/lables/609e920785c7c71abcb5263')
      .set('token', `${token}`)
      .end((err, res) => {
        res.should.have.status(401);
      });
  });
});
