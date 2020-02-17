import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";

import TechList from "~/components/TechList";

describe("TechList component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should be able to add new tech", () => {
    const { getByText, getByTestId, getByLabelText, debug } = render(
      <TechList />
    );

    const txtInsert = "Node.js";

    fireEvent.change(getByLabelText("Tech"), { target: { value: txtInsert } });
    fireEvent.submit(getByTestId("tech-form"));

    // debug();

    //fireEvent.click(getByText("Adicionar"));

    // debug();

    expect(getByTestId("tech-list")).toContainElement(getByText(txtInsert));

    // Limpar o input
    expect(getByLabelText("Tech")).toHaveValue("");
  });

  it("should store techs in storage", () => {
    let { getByText, getByTestId, getByLabelText } = render(<TechList />);

    const txtInsert = "Node.js";

    fireEvent.change(getByLabelText("Tech"), { target: { value: txtInsert } });
    fireEvent.submit(getByTestId("tech-form"));

    cleanup();

    ({ getByText, getByLabelText, getByTestId } = render(<TechList />));

    // verifica se o método foi chamado com os seguintes parâmetros
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "techs",
      JSON.stringify([txtInsert])
    );
    expect(getByTestId("tech-list")).toContainElement(getByText(txtInsert));
  });
});
