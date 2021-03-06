import { runSaga } from "redux-saga";
import MockAdapter from "axios-mock-adapter";

import api from "~/services/api";

import {
  getTechsSuccess,
  getTechsFailure
} from "~/store/modules/techs/actions";
import { getTechs } from "~/store/modules/techs/sagas";

const apiMock = new MockAdapter(api);

describe("Techs Saga", () => {
  it("Should be able to fetch techs", async () => {
    const tech = "Node.js";
    const dispatch = jest.fn();

    apiMock.onGet("techs").reply(200, [tech]);

    await runSaga({ dispatch }, getTechs).toPromise();

    expect(dispatch).toHaveBeenCalledWith(getTechsSuccess([tech]));
  });

  it("Should be fail when api returns error", async () => {
    const tech = "Node.js";
    const dispatch = jest.fn();

    apiMock.onGet("techs").reply(500);

    await runSaga({ dispatch }, getTechs).toPromise();

    expect(dispatch).toHaveBeenCalledWith(getTechsFailure());
  });
});
