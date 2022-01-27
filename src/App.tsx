import { useState, ChangeEvent } from "react";
import clsx from "clsx";

import { useFetchData } from "./hooks";
import { Dropdown, DropdownItem } from "./components/dropdown";
import { Radio } from "./components/radio";
import { RadioGroup } from "./components/radio-group";
import { Search } from "./components/search";
import { SplitPane } from "./components/layout";

import "./styles.css";

type ArrayType<T> = T extends (infer Item)[] ? Item : T;

type ResponseModel = {
  count: number;
  entries: Array<{
    API: string;
    Description: string;
    Auth: string;
    HTTPS: boolean;
    Cors: string;
    Link: string;
    Category: string;
  }>;
};

type Entry = ArrayType<ResponseModel["entries"]>;

/**
 * API: "AdoptAPet"
Description: "Resource to help get pets adopted"
Auth: "apiKey"
HTTPS: true
Cors: "yes"
Link: "https://www.adoptapet.com/public/apis/pet_list.html"
Category: "Animals"
 */

const initialState = { count: 0, entries: [] };

function Layout({ data }: { data: ResponseModel }) {
  const [filteredData, setFilteredData] = useState(data.entries);
  const [category, setCategory] = useState("");
  const [corsOption, setCorsOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [details, setDetails] = useState<Partial<Entry>>({});

  const getCategories = () => {
    if (typeof data === "undefined") {
      return [];
    }
    return Array.from(new Set(data.entries.map(({ Category }) => Category)));
  };

  const getCorsOptions = () => {
    if (typeof data === "undefined") {
      return [];
    }
    return Array.from(new Set(data.entries.map(({ Cors }) => Cors)));
  };

  const handleChangeCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleChangeCorsOption = (e: ChangeEvent<HTMLInputElement>) => {
    setCorsOption(e.target.value);
  };

  const handleChangeSearchTerm = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const resetDetailsSelection = () => {
    setDetails({});
  };

  const handleRemoveResult = (link: string) => {
    resetDetailsSelection();
    setFilteredData((data) => data.filter(({ Link }) => Link !== link));
  };

  const filterByCategory = (entries: ResponseModel["entries"]) => {
    return entries.filter(
      ({ Category }) => Category.toLowerCase() === category
    );
  };

  const filterByCorsOption = (entries: ResponseModel["entries"]) => {
    return entries.filter(({ Cors }) => Cors.toLowerCase() === corsOption);
  };

  const filterBySearchTerm = (entries: ResponseModel["entries"]) => {
    return entries.filter(({ API }) =>
      API.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getFilteredData = () => {
    if (typeof filteredData === "undefined" || filteredData.length === 0) {
      return [];
    }
    let filtered = filteredData;

    if (category.length !== 0) {
      filtered = filterByCategory(filtered);
    }

    if (corsOption.length !== 0) {
      filtered = filterByCorsOption(filtered);
    }

    if (searchTerm.length !== 0) {
      filtered = filterBySearchTerm(filtered);
    }

    return filtered;
  };

  const renderFilteredApiList = () => {
    return (
      <ul>
        {getFilteredData().map((entry) => {
          const { API: apiName, Link, Category } = entry;
          return (
            <li key={apiName + Link}>
              <span
                onClick={() => setDetails(entry)}
              >{`${apiName} | ${Category}`}</span>{" "}
              <button type="button" onClick={() => handleRemoveResult(Link)}>
                remove
              </button>
            </li>
          );
        })}
      </ul>
    );
  };

  const renderApiDetails = (details: Entry) => {
    const { API, Auth, Category, Cors, Description, HTTPS, Link } = details;
    return (
      <>
        <h1>details</h1>
        <p>API: {API}</p>
        <p>Auth: {Auth}</p>
        <p>Category: {Category}</p>
        <p>Cors: {Cors}</p>
        <p>Description: {Description}</p>
        <p>Https: {HTTPS}</p>
        <p>Link: {Link}</p>
      </>
    );
  };

  return (
    <div className={"flow"}>
      <Dropdown
        name="categories"
        labelId="categories-label-id"
        id="category"
        value={category}
        label="Choose a category:"
        onChange={handleChangeCategory}
      >
        <DropdownItem value="">--Please choose an option--</DropdownItem>
        {getCategories().map((category) => (
          <DropdownItem
            key={category.toLowerCase()}
            value={category.toLowerCase()}
          >
            {category}
          </DropdownItem>
        ))}
      </Dropdown>
      <RadioGroup
        legend="Cors:"
        legendId="cors-radio-group-legend"
        name="cors"
        // value={corsOption}
        onChange={handleChangeCorsOption}
      >
        {getCorsOptions().map((cors) => (
          <Radio
            label={cors}
            key={cors.toLowerCase()}
            id={cors}
            value={cors.toLowerCase()}
          />
        ))}
      </RadioGroup>
      <Search value={searchTerm} onChange={handleChangeSearchTerm} />
      <SplitPane>
        <div>{renderFilteredApiList()}</div>
        <div>{renderApiDetails(details as Entry)}</div>
      </SplitPane>
    </div>
  );
}

export default function App() {
  const { data, isLoading, isError } = useFetchData<ResponseModel>(
    "https://api.publicapis.org/entries",
    initialState
  );

  if (isError) {
    return <div>error</div>;
  }

  if (isLoading || typeof data === "undefined") {
    return <div>loading...</div>;
  }

  return (
    <div className={"App"}>
      <Layout data={data} />
    </div>
  );
}
