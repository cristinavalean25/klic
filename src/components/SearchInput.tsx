import "../CssPages/SearchInput.css";

function SearchInput() {
  const onlyDigitsRegex = /^[0-9]*$/;
  const errorMessage = "Introduceți doar cifre.";

  function validateInput(inputValue: string): boolean {
    return onlyDigitsRegex.test(inputValue);
  }

  return (
    <>
      <div className="container-ap-1">
        <div className="input-ap">
          <div className="select-container-ap">
            <select className="select-button-ap">
              <option value="cumpara" className="custom-botton">
                Cumpara
              </option>
              <option value="inchiriaza">Inchiriaza</option>
            </select>
          </div>

          <input
            className="first-input"
            type="text"
            placeholder="CAUTA DUPA DENUMIRE"
          />
        </div>

        <div className="input-container spaced-inputs input-ap">
          <input
            type="text"
            placeholder="PRET MINIM"
            className="additional-input text-white"
            onInput={(e) => {
              if (!validateInput((e.target as HTMLInputElement).value)) {
                alert(errorMessage);
                (e.target as HTMLInputElement).value = "";
              }
            }}
          />
          <input
            type="text"
            placeholder="PRET MAXIM"
            className="additional-input"
            onInput={(e) => {
              if (!validateInput((e.target as HTMLInputElement).value)) {
                alert(errorMessage);
                (e.target as HTMLInputElement).value = "";
              }
            }}
          />
          <input
            type="text"
            placeholder="CAMERE"
            className="additional-input"
            onInput={(e) => {
              if (!validateInput((e.target as HTMLInputElement).value)) {
                alert(errorMessage);
                (e.target as HTMLInputElement).value = "";
              }
            }}
          />
          <input
            type="text"
            placeholder="BAIE"
            className="additional-input"
            onInput={(e) => {
              if (!validateInput((e.target as HTMLInputElement).value)) {
                alert(errorMessage);
                (e.target as HTMLInputElement).value = "";
              }
            }}
          />
          <input
            type="text"
            placeholder="LOC  PARCARE"
            className="additional-input"
            onInput={(e) => {
              if (!validateInput((e.target as HTMLInputElement).value)) {
                alert(errorMessage);
                (e.target as HTMLInputElement).value = "";
              }
            }}
          />
        </div>
      </div>

      <div style={{ display: "none" }}></div>
    </>
  );
}

export default SearchInput;
