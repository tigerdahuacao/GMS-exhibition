export const CodeBlockCreateOrderRequest_1: string = 
` import requests
 url = "https://api.sandbox.paypal.com/v2/checkout/orders"
 payload = """{
   \"intent\": \"CAPTURE\",
   \"purchase_units\": [
     {
       \"reference_id\": \"PUHF\",
       \"amount\": {
         \"currency_code\": \"USD\",
         \"value\": \"100.00\"
       }
     }
   ],
   \"application_context\": {
     \"return_url\": \"\",
     \"cancel_url\": \"\"
   }
 }"""
 headers = {
     'accept': "application/json",
     'content-type': "application/json",
     'accept-language': "en_US",
     'authorization': "Bearer BEARER-TOKEN"
     }
 
 response = requests.request("POST", url, data=payload, headers=headers)
 print(response.status_code)
 print(response.text)`
