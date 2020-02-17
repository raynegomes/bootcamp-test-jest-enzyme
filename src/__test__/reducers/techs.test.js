import reducer, { INITIAL_STATE } from "~/store/modules/techs/reducer";
import * as Techs from "~/store/modules/techs/actions";

describe("Techs reducer", () => {
  it("DEFAULT STATE", () => {
    const state = reducer(undefined, {});

    expect(state).toStrictEqual(INITIAL_STATE);
  });

  it("ADD_TECH", () => {
    const newTech = "Node.js";

    const state = reducer(INITIAL_STATE, Techs.addTech(newTech));

    expect(state).toStrictEqual([newTech]);
  });
});
