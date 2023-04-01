const getWeatherData = async (address) => {
  try {
    const { data } = await axios.get(
      `http://localhost:3000/weather?address=${address}`
    );

    console.log(data);

    return data;
  } catch (error) {
    console.error({ error });

    return error;
  }
};

const renderValueToDom = (elmSelector, value) => {
  const elm = document.querySelector(`${elmSelector}`);

  elm.textContent = value;
};

const handleFormSubmit = () => {
  const locationForm = document.querySelector(".location-form");
  const search = document.querySelector(".location-form input");
  const loadingElm = document.querySelector(".loading");

  locationForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!search.value) return;

    renderValueToDom(".error-message", "");
    
    loadingElm.textContent = "Loading...";

    const {
      forecast,
      location: locationData,
      address,
      error,
    } = await getWeatherData(search.value);

    loadingElm.textContent = "";
    
    if (error) renderValueToDom(".error-message", error);
    
    renderValueToDom(".forecast", forecast);
    renderValueToDom(".location", locationData?.location);
    renderValueToDom(".address", address);
  });
};

handleFormSubmit();
