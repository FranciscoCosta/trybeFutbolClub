import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { Model } from "sequelize";

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

import TeamService from '../api/services/TeamService'
import Team from '../database/models/TeamModels'

describe('Teste de teams', () => {
  afterEach(() => {
      sinon.restore();
  })
  it('Deve retornar todos os teams camada service', async() => {

      const outPutTeamsMocks :Team[] = [new Team({
          id: 1,
          "teamName": "Bahia"
      }),
  ]

      sinon.stub(Model,'findAll').resolves(outPutTeamsMocks)
      const service = new TeamService();
      const result = await service.readAll();

      expect(result).to.be.deep.eq(outPutTeamsMocks)
      expect(result.length).to.be.equal(1);


  })

  it('Deve retornar todos os teams camada controller', async() => {

    const ControllerOutPut: Team[] = [
      {
        id: 1,
        "teamName": "Bahia",
      }
    ] as Team[];
    sinon.stub(Model,'findAll').resolves(ControllerOutPut)

    const response  =  await chai.request(app).get('/teams');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.eq(ControllerOutPut);
})


it('Deve retornar errpr 404 quando id nao existe', async() => {

  sinon.stub(Model,'findByPk').resolves();

  const response = await chai.request(app).get('/teams/1');
  expect (response.status).to.be.equal(200);
})
})