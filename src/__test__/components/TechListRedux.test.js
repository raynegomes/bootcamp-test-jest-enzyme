import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { render, fireEvent } from "@testing-library/react";

import { addTech } from "~/store/modules/techs/actions";

import TechList from "~/components/TechListRedux";

jest.mock("react-redux");

describe("TechList component with Redux", () => {
  it("Should render tech list", () => {
    const techList = ["Node.js", "ReactJS"];

    useSelector.mockImplementation(cb =>
      cb({
        techs: [...techList]
      })
    );

    const { getByTestId, getByText } = render(<TechList />);

    expect(getByTestId("tech-list")).toContainElement(getByText(techList[0]));
    expect(getByTestId("tech-list")).toContainElement(getByText(techList[1]));
  });

  it("Should be able to add new tech", () => {
    const newTech = "Node.js";
    const { getByTestId, getByLabelText } = render(<TechList />);

    const dispatch = jest.fn();

    useDispatch.mockReturnValue(dispatch);

    fireEvent.change(getByLabelText("Tech"), { target: { value: newTech } });
    fireEvent.submit(getByTestId("tech-form"));

    //console.log(dispatch.mock.calls);

    expect(dispatch).toHaveBeenCalledWith(addTech(newTech));
  });
});
