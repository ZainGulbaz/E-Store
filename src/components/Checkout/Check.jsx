import { React, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { commerce } from "../../lib/Commerce";

import emailjs from "emailjs-com";

const Check = ({ cart, refreshCart }) => {
 
  const [token, setToken] = useState(null);
  let products = "";
  let history = useHistory();
  const generateToken = async () => {
    try {
      const Token = await commerce.checkout.generateToken(cart.id, {
        type: "cart",
      });
      setToken(Token);
    } catch (error) {}
  };

  useEffect(() => {
    generateToken();
  }, []);

  // Fetching the Countries
  const [Countries, setCountries] = useState({});
  const fetchCountries = async (checkoutTokenID) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenID
    );
    setCountries(countries);
  };
  useEffect(() => {
    if (token !== null) fetchCountries(token.id);
  }, [token]);

  //Fetching the subDivisions
  const [subdiv, setSubdiv] = useState({});
  const [country, setCountry] = useState("PK");

  const fetchSubdiv = async (countryCode) => {
    let { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );
    setSubdiv(subdivisions);
  };
  useEffect(() => {
    fetchSubdiv(country);
  }, [country]);

  console.log(subdiv);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_8zcqxri",
        "template_hyqi97c",
        e.target,
        "user_jdc3lJKHjsLBVVz9Qd2MD"
      )

      .then(
        (result) => {
          console.log("Done");
        },
        (error) => {
          console.log(error.text);
        }
      );
    refreshCart();
    history.push("/");
    alert("The order has been displaced");
  };

  return (
    <>
      <h1 className="text-3xl text-gray-700 bold ml-10">Checkout from Here</h1>
      <br />
      <br />

      <form className="w-full max-w-lg ml-10" onSubmit={sendEmail}>
        <div className="flex flex-wrap  mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              First Name
            </label>
            <input
              className="appearance-none block w-3/4 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="Jane"
              name="name"
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-last-name"
            >
              Last Name
            </label>
            <input
              className="appearance-none block w-3/4 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="text"
              placeholder="Doe"
              name="LastName"
            />
          </div>
        </div>

        <div className="flex flex-wrap  mb-2">
          {/* Start of Countries */}

          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0 flex-1">
            <label
              className="block uppercase  tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-state"
            >
              Country
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-3/4 bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                name="country"
                onChange={(e) => setCountry(e.target.value)}
              >
                {Object.keys(Countries).map((country) => (
                  <option value={country}>{Countries[country]}</option>
                ))}
              </select>
            </div>
            <br />
            <div className="w-full  mb-6 md:mb-0 flex-1">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-city"
              >
                State
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-3/4 bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                  name="state"
                >
                  {Object.keys(subdiv).map((div) => (
                    <option value={div}>{subdiv[div]}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* End of Countries */}
        {/* Sending the Total Amount of Order Via Email */}
        <div className="w-full  px-3 mb-6 md:mb-0 ">
          <input
            type="text"
            name="totalAmount"
            value={`${cart.subtotal.formatted_with_symbol}`}
            className="hidden"
          />
          {/* Sending the Products list along with their quantity */}
          <p className="hidden">
            {
              (products =
                products +
                "  " +
                cart.line_items.map((e) => {
                  return (
                    " " + e.product_name + "(Quantity: " + e.quantity + ")"
                  );
                }))
            }
          </p>

          <input
            type="text"
            name="products"
            value={`${products}`}
            className="hidden"
          />

          <br />
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-zip"
          >
            Address
          </label>
          <input
            className="appearance-none block  bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 w-3/4"
            id="grid-zip"
            type="text"
            placeholder="H# St#"
            name="address"
          />
          <br />
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-zip"
          >
            Email
          </label>
          <input
            className="appearance-none block  bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 w-3/4"
            id="grid-zip"
            type="text"
            placeholder="H# St#"
            name="email"
          />
        </div>

        <br />
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Order
        </button>
      </form>
      <br />
      <hr />
      <br />
    </>
  );
};

export default Check;
