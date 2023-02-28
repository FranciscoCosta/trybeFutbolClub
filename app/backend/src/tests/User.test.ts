// import * as sinon from 'sinon';
// import * as chai from 'chai';
// // @ts-ignore
// import chaiHttp = require('chai-http');

// import { Model } from "sequelize";

// import { app } from '../app';
// import Example from '../database/models/ExampleModel';

// import { Response } from 'superagent';

// chai.use(chaiHttp);

// const { expect } = chai;

// import UserService from '../api/services/UserService'
// import User from '../database/models/UserModels'

// describe('Teste de users', () => {
//     afterEach(() => {
//         sinon.restore();
//     });
//     it('Deve cadastrar com sucesso 1 novo user ', async() => {

//         const user = {
//             userName : "xico",
//             password: "abcasdasd",
//             email: "teste@gmail.com",
//             role: "awesome",
//         }

//         const outPutMockUp: any  = {
//             id : 1,
//             userName :"xico",
//             password: "abcasdasd",
//             email: "teste@gmail.com",
//             role: "awesome",
//         }

//         sinon.stub(Model, 'create').resolves(outPutMockUp);

//         const response = await chai.request(app).post('/users').send(user);

//         expect(response.status).to.be.equal(201);
//         expect(response.body).to.be.deep.eq(outPutMockUp);
//     })
// })