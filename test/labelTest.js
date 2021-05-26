const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const testSample = require('./labelTest.json');

chai.should();
chai.use(chaiHttp);

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByYW5pbGtha2FkZTJAZ21haWwuY29tIiwiaWQiOiI2MDliZWI3NWNlMmQ5ODEzYzhhMDg2MTgiLCJpYXQiOjE2MjExNzY5ODgsImV4cCI6MTYyMTI2MzM4OH0.kAe7pkblQAjI9ORPxJS61YlLm9sFsvdZiD7ea9RUMw8';
const invalidtoken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByYW5pbGtha2FkZTJAZ21haWwuY29tIiwiaWQiOiI2MDliZWI3NWNlMmQ5ODEzYzhhMDg2MTgiLCJpYXQiOjE2MjExNzY5ODgsImV4cCI6MTYyMTI2MzM4OH0.kAe7pkblQAjI9ORPxJS61YlLm9sFsvdZiD7ea9RUM';

describe('POST /labels', () => {
  it.only('whenGivenEndPointAndCorrectinput_ShouldAddLabel_Successfully', () => {
    chai.request(server)
      .post('/labels')
      .set('token', `${token}`)
      .send(testSample.validlabel)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
      });
  });

  it.only('whenGivenEndPointAndIncorrectCToken_ShouldNotAddLabel_Successfully', () => {
    chai.request(server)
      .post('/labels')
      .set('token', `${invalidtoken}`)
      .send(testSample.validlabel)
      .end((err, res) => {
        res.should.have.status(500);
      });
  });

  it.only('whenGivenEndPointAndEmptyLabel_ShouldNotAddLabel_Successfully', () => {
    chai.request(server)
      .post('/labels')
      .set('token', `${token}`)
      .send(testSample.emptylabel)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
      });
  });
});

describe('PUT /labels/:labelId', () => {
  it.only('WhenGivenProperEndPointsPassWithCorrectHeader_shouldReturn_SuccessMessage', () => {
    chai.request(server)
      .put('/labels/609e920785c7c71abcb52631')
      .set('token', `${token}`)
      .send(testSample.updatelabel)
      .end((err, res) => {
        res.should.have.status(200);
      });
  });

  it.only('WhenGivenProperEndPointsAndInvalidTokenPass_shouldReturn_ErrorMessage', () => {
    chai.request(server)
      .put('/labels/609e920785c7c71abcb52631')
      .set('token', `${invalidtoken}`)
      .send(testSample.updatelabel)
      .end((err, res) => {
        res.should.have.status(401);
      });
  });

  it.only('WhenGivenProperEndPointsAndInvalidLabelIdPass_shouldNotReturn_MessageOfLabelFound', () => {
    chai.request(server)
      .put('/labels/609e920785c7c71abcb526')
      .set('token', `${token}`)
      .send(testSample.updatelabel)
      .end((err, res) => {
        res.should.have.status(400);
      });
  });
});

describe('GET /labels', () => {
  it.only('WhenGivenProperEndPointsPassWithToken_shouldReturn_AllLabels', () => {
    chai.request(server)
      .get('/labels')
      .set('token', `${token}`)
      .send()
      .end((err, res) => {
        res.should.have.status(200);
      });
  });

  it.only('WhenGivenProperEndPointsAnd_IncorrectToken_should_Not_Return_AllLabels', () => {
    chai.request(server)
      .get('/labels')
      .set('token', `${invalidtoken}`)
      .send()
      .end((err, res) => {
        res.should.have.status(400);
      });
  });
});

describe('DELETE /labels/:labelId', () => {
  it.only('WhenGivenProperEndPointsPassWithCorrectHeader_shouldReturn_SuccessMessageAfterDeleteingLabel', () => {
    chai.request(server)
      .delete('/labels/609e920785c7c71abcb52631')
      .set('token', `${token}`)
      .end((err, res) => {
        res.should.have.status(200);
      });
  });

  it.only('WhenGivenProperEndPointsAndInvalidTokenPass_shouldReturn_ErrorMessage', () => {
    chai.request(server)
      .delete('/labels/609e920785c7c71abcb52631')
      .set('token', `${invalidtoken}`)
      .end((err, res) => {
        res.should.have.status(400);
      });
  });

  it.only('WhenGivenProperEndPointsAndInvalidLabelIdPass_shouldReturn_MessageOfLabelFound', () => {
    chai.request(server)
      .delete('/labels/609e920785c7c71abcb5263')
      .set('token', `${token}`)
      .end((err, res) => {
        res.should.have.status(401);
      });
  });
});
