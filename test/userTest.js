const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);
const userData = require('./user.json');

chai.should();

describe('user', () => {
  it('givenUser_With_ProperData_Should_Register', (done) => {
    const userInfo = userData.user.userRegistration;
    console.log(`userInfo:${userInfo}`);
    chai
      .request(server)
      .post('/user')
      .send(userInfo)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('givenUser_With_ImproperData_Should_not_Register', (done) => {
    const userInfo = userData.user.userRegistration;
    chai.request(server).post('/user').send(userInfo).end((err, res) => {
      res.should.have.status(400);
      done();
    });
  });
});

describe('login', () => {
  it('givenUser_with_ProperData_should_login', (done) => {
    const userInfo = userData.user.userLogin;
    chai.request(server).post('/login').send(userInfo).end((err, res) => {
      res.should.have.status(200);
      done();
    });
  });

  it('givenUser_with_ImproperData_should_not_login', (done) => {
    const userInfo = userData.user.userLogin_with_Improper_Details;
    chai.request(server).post('/login').send(userInfo).end((err, res) => {
      res.should.have.status(400);
      done();
    });
  });
});

describe('forgotPassword', () => {
  it('givenUser_with_ProperData_Should_Send_ResetLink_Over_EmailId', (done) => {
    const userInfo = userData.user.forgotPassword;
    chai.request(server).post('/forgotPassword').send(userInfo).end((err, res) => {
      res.should.have.status(200);
      done();
    });
  });

  it('givenUser_with_ImproperData_Should_not_Send_ResetLink_Over_EmailId', (done) => {
    const userInfo = userData.user.forgotPassword_with_Improper_Details;
    chai.request(server).post('/forgotPassword').send(userInfo).end((err, res) => {
      res.should.have.status(500);
      done();
    });
  });
});

describe('resetPassword', () => {
  it('givenUser_with_Propertoken_Should_ResetPassword', (done) => {
    const userInfo = userData.user.resetPassword_with_proper_token;
    chai.request(server).post('/resetPassword').send(userInfo).end((err, res) => {
      res.should.have.status(200);
      done();
    });
  });

  it('givenUser_with_Impropertoken_Should_not_ResetPassword', (done) => {
    const userInfo = userData.user.resetPassword_with_Improper_token;
    chai.request(server).post('/resetPassword').send(userInfo).end((err, res) => {
      res.should.have.status(400);
      done();
    });
  });
});
