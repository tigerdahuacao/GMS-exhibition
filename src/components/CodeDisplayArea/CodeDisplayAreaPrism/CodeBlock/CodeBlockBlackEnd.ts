export const CodeBlockBlackEnd: string = `  const getAccessToken = async () => {
      return await fetch("https://api.sandbox.paypal.com/v1/oauth2/token", {
          method: "POST",
          headers: {
              Authorization: 'Basic Auth',
          },
          body: new URLSearchParams({
              grant_type: "client_credentials",
          }),
      })
          .then((data) => data.json())
          .then((jsonData) => jsonData.access_token);
  };
  
  router.post("/createOrder", async (req, res) => {
      try {
          const body = req.body;
          const { jsonResponse, httpStatusCode } = await createOrder(body);
          res.status(httpStatusCode).json(jsonResponse);
      } catch (error) {
          res.status(500).json({ error: "Failed to create order." });
      }
  });
  
  const createOrder = async () => {
      //Your Customized operation
      let jsonData = await fetch(
          "https://api.sandbox.paypal.com/v2/checkout/orders",
          {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  Authorization: 'Bearer Token',
                  "PayPal-Request-Id": generateRandomPayPalRequestID(),
              },
  
              body: JSON.stringify(createOrderReqBody),
          }
      )
          .then((data) => data.json())
          .then((jsonData) => jsonData);  
      return jsonData;
  };
  
  router.post("/captureOrder", async (req, res) => {
      try {
          const { orderID } = req.body;
          const { jsonResponse, httpStatusCode } = await captureOrder(orderID);
          res.status(httpStatusCode).json(jsonResponse);
      } catch (error) {
          res.status(500).json({ error: "Failed to Capture order." });
      }
  });
  
  const captureOrder = async (orderID) => {    
      let jsonData = await fetch(
          'https://api.sandbox.paypal.com/v2/checkout/orders/{orderID}/capture',
          {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  Authorization: 'Bearer Token'
              }
          }
      )
          .then((data) => data.json())
          .then((jsonData) => jsonData);
      //Your Customized operation
      return jsonData
  };
`