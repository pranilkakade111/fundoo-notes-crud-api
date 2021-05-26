const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);
const noteData = require('./notes.json');

chai.should();

describe('notes', () => {
  it('givenNoteDetails_whenProper_shouldAbleToCreateANote', (done) => {
    const noteDetails = noteData.notes.createNote;
    const token = noteData.notes.properToken;
    chai
      .request(server)
      .post('/notes')
      .set('token', +token)
      .send(noteDetails)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('givenNoteDetails_whenImProper_shouldNotAbleToCreateANote', (done) => {
    const noteDetails = noteData.notes.createNoteWithImproperData;
    const token = noteData.notes.properToken;

    chai
      .request(server)
      .post('/notes')
      .set('token', +token)
      .send(noteDetails)
      .end((err, res) => {
        res.should.have.status(400);
      });
    done();
  });

  it('givenNoteDetails_whenProper_ButTokenMissing_shouldNotAbleToCreateANote', (done) => {
    const noteDetails = noteData.notes.createNote;
    chai
      .request(server)
      .post('/notes')
      .send(noteDetails)
      .end((err, res) => {
        res.should.have.status(401);
      });
    done();
  });

  it('givenNoteDetails_whenProper_ButTokenIsWrong_shouldNotAbleToCreateANote', (done) => {
    const noteDetails = noteData.notes.createNoteWithImproperData;
    const token = noteData.notes.ImproperToken;
    chai
      .request(server)
      .post('/notes')
      .set('token', +token)
      .send(noteDetails)
      .end((err, res) => {
        res.should.have.status(401);
      });
    done();
  });
});

describe('getAllNotes', () => {
  it('givenDetails_whenProper_shouldAbleToRetriveAllNote', (done) => {
    const token = noteData.notes.properToken;
    chai
      .request(server)
      .get('/notes')
      .set('token', +token)
      .send()
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('givenToken_whenImProper_shouldNotAbleToRetriveAllNote', (done) => {
    const token = noteData.notes.ImproperToken;
    chai
      .request(server)
      .get('/notes')
      .set('token', +token)
      .send()
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

describe('update notes', () => {
  it('givenNoteIDDetails_whenProper_shouldAbleToUpdate_ExistingNote', (done) => {
    const noteDetails = noteData.notes.updateData;
    const token = noteData.notes.properToken;
    chai
      .request(server)
      .put('/notes/60961015ba511f4c480119a9')
      .set('token', +token)
      .send(noteDetails)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('givenNoteIDDetails_whenNotIDImProper_shouldNotAbleToUpdate_ExistingNote', (done) => {
    const noteDetails = noteData.notes.updateData;
    const token = noteData.notes.properToken;

    chai
      .request(server)
      .put('/notes/60961015ba511f4c480119')
      .set('token', +token)
      .send(noteDetails)
      .end((err, res) => {
        res.should.have.status(400);
      });
    done();
  });

  it('givenToken_whenImProper_shouldNotAbleToUpdate_ExistingNote', (done) => {
    const noteDetails = noteData.notes.updateData;
    const token = noteData.notes.ImproperToken;

    chai
      .request(server)
      .put('/notes/60961015ba511f4c480119')
      .set('token', +token)
      .send(noteDetails)
      .end((err, res) => {
        res.should.have.status(401);
      });
    done();
  });

  it('givenNoteIDisEmpty_whenImProper_shouldNotAbleToUpdate_ExistingNote', (done) => {
    const noteDetails = noteData.notes.updateData;
    const token = noteData.notes.properToken;

    chai
      .request(server)
      .put('/notes/')
      .set('token', +token)
      .send(noteDetails)
      .end((err, res) => {
        res.should.have.status(500);
      });
    done();
  });
});

describe('delete note', () => {
  it('givenNoteIDDetails_whenProper_shouldAbleToAddInTrash', (done) => {
    const noteDetails = noteData.notes.changeTrashStatus;
    const token = noteData.notes.properToken;

    chai
      .request(server)
      .delete('/notes/609cad878030452e3cbb329b')
      .set('token', +token)
      .send(noteDetails)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('givenNoteIDDetails_whenEmpty_shouldNotAbleToAddInTrash', (done) => {
    const noteDetails = noteData.notes.changeTrashStatus;
    const token = noteData.notes.properToken;

    chai
      .request(server)
      .delete('/notes/0')
      .set('token', +token)
      .send(noteDetails)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('givenNoteIDDetails_whenImProper_shouldNotAbleToAddInTrash', (done) => {
    const noteDetails = noteData.notes.changeTrashStatus;
    const token = noteData.notes.properToken;

    chai
      .request(server)
      .delete('/notes/609cad878030452e3cbb329b')
      .set('token', +token)
      .send(noteDetails)
      .end((err, res) => {
        res.should.have.status(400);
      });
    done();
  });

  it('givenToken_when_ImProper_should_Not_Be_AbleToAddInTrash', (done) => {
    const noteDetails = noteData.notes.changeTrashStatus;
    const token = noteData.notes.ImproperToken;

    chai
      .request(server)
      .delete('/notes/60961015ba511f4c480119a9')
      .set('token', +token)
      .send(noteDetails)
      .end((err, res) => {
        res.should.have.status(501);
        done();
      });
  });

  it('givenToken_whenEmpty_should_Not_Be_AbleToAddInTrash', (done) => {
    const noteDetails = noteData.notes.changeTrashStatus;
    chai
      .request(server)
      .delete('/notes/60961015ba511f4c480119a9')
      .send(noteDetails)
      .end((err, res) => {
        res.should.have.status(500);
        done();
      });
  });
});
