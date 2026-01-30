export const BASE_IA_RESPONSE = {
  "status": 200,
  "type": 2,
  "messages": [
    "No existe tarifa de cliente configurada para 'SODA 3L'."
  ],
  "threadId": "thread_trzGlL4IBUUc2fIppIPN6R4E",
  "data": {
    "actions": "SALE",
    "actionTypeId": 1,
    "client": {
      "id": 44,
      "firstName": "katty",
      "lastName": "avila",
      "phone": "",
      "nit": "",
      "file": null,
      "photo": null,
      "clientZoneId": null,
      "ubication": null,
      "company": "",
      "hasPhoto": false,
      "clientRateId": 0,
      "clientTypeId": 0,
      "clientDiscountId": 0,
      "isActive": true,
      "zone": null
    },
    "details": [
      {
        "id": 4464,
        "name": "SODA 3L",
        "code": "SODA",
        "unitMeasurementId": 17,
        "amountRequested": 4,
        "stock": 97,
        "purcharsePrice": 15,
        "suggestedPrice": 0,
        "listProductRate": [
          {
            "id": 1958,
            "productId": 4464,
            "rateId": 1,
            "margin": 0,
            "price": 20,
            "percentage": 33.33,
            "isActive": true,
            "rate": {
              "id": 1,
              "code": "MIN",
              "description": "Minorista",
              "presetMargin": 10,
              "isActive": true
            }
          },
          {
            "id": 1959,
            "productId": 4464,
            "rateId": 2,
            "margin": 0,
            "price": 18,
            "percentage": 20,
            "isActive": true,
            "rate": {
              "id": 2,
              "code": "MAY",
              "description": "Mayorista",
              "presetMargin": 15,
              "isActive": true
            }
          },
          {
            "id": 1960,
            "productId": 4464,
            "rateId": 41,
            "margin": 0,
            "price": null,
            "percentage": null,
            "isActive": true,
            "rate": {
              "id": 41,
              "code": "TIE",
              "description": "TIENDA",
              "presetMargin": 10,
              "isActive": false
            }
          }
        ]
      }
    ]
  }
};
