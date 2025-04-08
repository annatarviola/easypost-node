// THIS TOOL WAS CREATED BY THE WONDERFUL GREG
import crypto from "crypto"

const SECRET = "A1B2C3"
const EPSIGNATURE = "e2883d13d43976729bced42beb35b261e6b79b87b4059fbe2e84b838534c0ab0"

// payload body raw, no white space
const BODY = `{
  "description": "tracker.updated",
  "mode": "production",
  "previous_attributes": {
    "status": "out_for_delivery"
  },
  "created_at": "2023-04-26T19:23:47.000Z",
  "pending_urls": [
    "https://jmhl-nz.bubbleapps.io/api/1.1/wf/easypost-inbound-wh"
  ],
  "completed_urls": [],
  "updated_at": "2023-04-26T19:23:47.000Z",
  "id": "evt_dd98161ae46711edaa3c130acadc8cfc",
  "user_id": "user_52b4702af9c74377888e3f01cdb4cced",
  "status": "pending",
  "object": "Event",
  "result": {
    "id": "trk_49414692cbd24ca392942dde12013019",
    "object": "Tracker",
    "mode": "production",
    "tracking_code": "397280491672",
    "status": "delivered",
    "status_detail": "arrived_at_destination",
    "created_at": "2023-04-21T04:53:02Z",
    "updated_at": "2023-04-26T19:22:46Z",
    "signed_by": "RBOLTON",
    "weight": 328.0,
    "est_delivery_date": "2023-04-26T00:00:00Z",
    "shipment_id": null,
    "carrier": "FedEx",
    "tracking_details": [
      {
        "object": "TrackingDetail",
        "message": "Shipment information sent to FedEx",
        "description": "Shipment information sent to FedEx",
        "status": "pre_transit",
        "status_detail": "label_created",
        "datetime": "2023-04-20T17:54:00Z",
        "source": "FedEx",
        "carrier_code": "OC",
        "tracking_location": {
          "object": "TrackingLocation",
          "city": null,
          "state": null,
          "country": "US",
          "zip": "91746"
        }
      },
      {
        "object": "TrackingDetail",
        "message": "Picked up",
        "description": "Picked up",
        "status": "in_transit",
        "status_detail": "received_at_origin_facility",
        "datetime": "2023-04-20T22:01:00Z",
        "source": "FedEx",
        "carrier_code": "PU",
        "tracking_location": {
          "object": "TrackingLocation",
          "city": "CITY OF INDUSTRY",
          "state": "CA",
          "country": "US",
          "zip": "91789"
        }
      },
      {
        "object": "TrackingDetail",
        "message": "Arrived at FedEx location",
        "description": "Arrived at FedEx location",
        "status": "in_transit",
        "status_detail": "received_at_origin_facility",
        "datetime": "2023-04-20T23:53:00Z",
        "source": "FedEx",
        "carrier_code": "AR",
        "tracking_location": {
          "object": "TrackingLocation",
          "city": "CITY OF INDUSTRY",
          "state": "CA",
          "country": "US",
          "zip": "91789"
        }
      },
      {
        "object": "TrackingDetail",
        "message": "Shipment arriving On-Time",
        "description": "Shipment arriving On-Time",
        "status": "unknown",
        "status_detail": "status_update",
        "datetime": "2023-04-20T23:54:48Z",
        "source": "FedEx",
        "carrier_code": "AO",
        "tracking_location": {
          "object": "TrackingLocation",
          "city": "CITY OF INDUSTRY",
          "state": "CA",
          "country": "US",
          "zip": "91789"
        }
      },
      {
        "object": "TrackingDetail",
        "message": "Left FedEx origin facility",
        "description": "Left FedEx origin facility",
        "status": "in_transit",
        "status_detail": "departed_origin_facility",
        "datetime": "2023-04-21T06:02:17Z",
        "source": "FedEx",
        "carrier_code": "DP",
        "tracking_location": {
          "object": "TrackingLocation",
          "city": "CITY OF INDUSTRY",
          "state": "CA",
          "country": "US",
          "zip": "91789"
        }
      },
      {
        "object": "TrackingDetail",
        "message": "Arrived at FedEx location",
        "description": "Arrived at FedEx location",
        "status": "in_transit",
        "status_detail": "received_at_origin_facility",
        "datetime": "2023-04-21T07:52:00Z",
        "source": "FedEx",
        "carrier_code": "AR",
        "tracking_location": {
          "object": "TrackingLocation",
          "city": "CITY OF INDUSTRY",
          "state": "CA",
          "country": "US",
          "zip": "91789"
        }
      },
      {
        "object": "TrackingDetail",
        "message": "Departed FedEx location",
        "description": "Departed FedEx location",
        "status": "in_transit",
        "status_detail": "departed_facility",
        "datetime": "2023-04-21T09:26:24Z",
        "source": "FedEx",
        "carrier_code": "DP",
        "tracking_location": {
          "object": "TrackingLocation",
          "city": "CITY OF INDUSTRY",
          "state": "CA",
          "country": "US",
          "zip": "91789"
        }
      },
      {
        "object": "TrackingDetail",
        "message": "At local FedEx facility",
        "description": "At local FedEx facility",
        "status": "in_transit",
        "status_detail": "received_at_destination_facility",
        "datetime": "2023-04-21T11:23:00Z",
        "source": "FedEx",
        "carrier_code": "AR",
        "tracking_location": {
          "object": "TrackingLocation",
          "city": "OCEANSIDE",
          "state": "CA",
          "country": "US",
          "zip": "92056"
        }
      },
      {
        "object": "TrackingDetail",
        "message": "Arrived at FedEx location",
        "description": "Arrived at FedEx location",
        "status": "in_transit",
        "status_detail": "received_at_origin_facility",
        "datetime": "2023-04-21T11:25:00Z",
        "source": "FedEx",
        "carrier_code": "AR",
        "tracking_location": {
          "object": "TrackingLocation",
          "city": "OCEANSIDE",
          "state": "CA",
          "country": "US",
          "zip": "92056"
        }
      },
      {
        "object": "TrackingDetail",
        "message": "On FedEx vehicle for delivery",
        "description": "On FedEx vehicle for delivery",
        "status": "out_for_delivery",
        "status_detail": "out_for_delivery",
        "datetime": "2023-04-21T11:28:00Z",
        "source": "FedEx",
        "carrier_code": "OD",
        "tracking_location": {
          "object": "TrackingLocation",
          "city": "OCEANSIDE",
          "state": "CA",
          "country": "US",
          "zip": "92056"
        }
      },
      {
        "object": "TrackingDetail",
        "message": "Delivery exception (Customer not available or business closed)",
        "description": "Delivery exception",
        "status": "failure",
        "status_detail": "delayed",
        "datetime": "2023-04-21T21:06:30Z",
        "source": "FedEx",
        "carrier_code": "DE",
        "tracking_location": {
          "object": "TrackingLocation",
          "city": "OCEANSIDE",
          "state": "CA",
          "country": "US",
          "zip": "92056"
        }
      },
      {
        "object": "TrackingDetail",
        "message": "Shipment arriving On-Time",
        "description": "Shipment arriving On-Time",
        "status": "unknown",
        "status_detail": "status_update",
        "datetime": "2023-04-21T21:07:21Z",
        "source": "FedEx",
        "carrier_code": "AO",
        "tracking_location": {
          "object": "TrackingLocation",
          "city": "OCEANSIDE",
          "state": "CA",
          "country": "US",
          "zip": "92056"
        }
      },
      {
        "object": "TrackingDetail",
        "message": "At local FedEx facility",
        "description": "At local FedEx facility",
        "status": "in_transit",
        "status_detail": "received_at_destination_facility",
        "datetime": "2023-04-22T12:04:00Z",
        "source": "FedEx",
        "carrier_code": "AR",
        "tracking_location": {
          "object": "TrackingLocation",
          "city": "OCEANSIDE",
          "state": "CA",
          "country": "US",
          "zip": "92056"
        }
      },
      {
        "object": "TrackingDetail",
        "message": "On FedEx vehicle for delivery",
        "description": "On FedEx vehicle for delivery",
        "status": "out_for_delivery",
        "status_detail": "out_for_delivery",
        "datetime": "2023-04-22T12:09:00Z",
        "source": "FedEx",
        "carrier_code": "OD",
        "tracking_location": {
          "object": "TrackingLocation",
          "city": "OCEANSIDE",
          "state": "CA",
          "country": "US",
          "zip": "92056"
        }
      },
      {
        "object": "TrackingDetail",
        "message": "Delivery exception (Customer not available or business closed)",
        "description": "Delivery exception",
        "status": "failure",
        "status_detail": "delayed",
        "datetime": "2023-04-22T21:09:11Z",
        "source": "FedEx",
        "carrier_code": "DE",
        "tracking_location": {
          "object": "TrackingLocation",
          "city": "OCEANSIDE",
          "state": "CA",
          "country": "US",
          "zip": "92056"
        }
      },
      {
        "object": "TrackingDetail",
        "message": "Shipment arriving early",
        "description": "Shipment arriving early",
        "status": "unknown",
        "status_detail": "status_update",
        "datetime": "2023-04-22T22:09:34Z",
        "source": "FedEx",
        "carrier_code": "AE",
        "tracking_location": {
          "object": "TrackingLocation",
          "city": "OCEANSIDE",
          "state": "CA",
          "country": "US",
          "zip": "92056"
        }
      },
      {
        "object": "TrackingDetail",
        "message": "At local FedEx facility",
        "description": "At local FedEx facility",
        "status": "in_transit",
        "status_detail": "received_at_destination_facility",
        "datetime": "2023-04-23T10:57:00Z",
        "source": "FedEx",
        "carrier_code": "AR",
        "tracking_location": {
          "object": "TrackingLocation",
          "city": "OCEANSIDE",
          "state": "CA",
          "country": "US",
          "zip": "92056"
        }
      },
      {
        "object": "TrackingDetail",
        "message": "On FedEx vehicle for delivery",
        "description": "On FedEx vehicle for delivery",
        "status": "out_for_delivery",
        "status_detail": "out_for_delivery",
        "datetime": "2023-04-23T12:01:00Z",
        "source": "FedEx",
        "carrier_code": "OD",
        "tracking_location": {
          "object": "TrackingLocation",
          "city": "OCEANSIDE",
          "state": "CA",
          "country": "US",
          "zip": "92056"
        }
      },
      {
        "object": "TrackingDetail",
        "message": "Delivery exception (Customer not available or business closed - Adult signature required)",
        "description": "Delivery exception",
        "status": "failure",
        "status_detail": "delayed",
        "datetime": "2023-04-23T17:27:47Z",
        "source": "FedEx",
        "carrier_code": "DE",
        "tracking_location": {
          "object": "TrackingLocation",
          "city": "OCEANSIDE",
          "state": "CA",
          "country": "US",
          "zip": "92056"
        }
      },
      {
        "object": "TrackingDetail",
        "message": "Delivery exception (Customer not available or business closed)",
        "description": "Delivery exception",
        "status": "failure",
        "status_detail": "delayed",
        "datetime": "2023-04-24T03:38:09Z",
        "source": "FedEx",
        "carrier_code": "DE",
        "tracking_location": {
          "object": "TrackingLocation",
          "city": "OCEANSIDE",
          "state": "CA",
          "country": "US",
          "zip": "92056"
        }
      },
      {
        "object": "TrackingDetail",
        "message": "Shipment arriving early",
        "description": "Shipment arriving early",
        "status": "unknown",
        "status_detail": "status_update",
        "datetime": "2023-04-24T03:38:58Z",
        "source": "FedEx",
        "carrier_code": "AE",
        "tracking_location": {
          "object": "TrackingLocation",
          "city": "OCEANSIDE",
          "state": "CA",
          "country": "US",
          "zip": "92056"
        }
      },
      {
        "object": "TrackingDetail",
        "message": "At local FedEx facility",
        "description": "At local FedEx facility",
        "status": "in_transit",
        "status_detail": "received_at_destination_facility",
        "datetime": "2023-04-24T09:33:00Z",
        "source": "FedEx",
        "carrier_code": "AR",
        "tracking_location": {
          "object": "TrackingLocation",
          "city": "OCEANSIDE",
          "state": "CA",
          "country": "US",
          "zip": "92056"
        }
      },
      {
        "object": "TrackingDetail",
        "message": "On FedEx vehicle for delivery",
        "description": "On FedEx vehicle for delivery",
        "status": "out_for_delivery",
        "status_detail": "out_for_delivery",
        "datetime": "2023-04-24T09:33:00Z",
        "source": "FedEx",
        "carrier_code": "OD",
        "tracking_location": {
          "object": "TrackingLocation",
          "city": "OCEANSIDE",
          "state": "CA",
          "country": "US",
          "zip": "92056"
        }
      },
      {
        "object": "TrackingDetail",
        "message": "Delivery exception (Customer not available or business closed)",
        "description": "Delivery exception",
        "status": "failure",
        "status_detail": "delayed",
        "datetime": "2023-04-24T18:36:42Z",
        "source": "FedEx",
        "carrier_code": "DE",
        "tracking_location": {
          "object": "TrackingLocation",
          "city": "OCEANSIDE",
          "state": "CA",
          "country": "US",
          "zip": "92056"
        }
      },
      {
        "object": "TrackingDetail",
        "message": "Shipment arriving early",
        "description": "Shipment arriving early",
        "status": "unknown",
        "status_detail": "status_update",
        "datetime": "2023-04-24T18:37:42Z",
        "source": "FedEx",
        "carrier_code": "AE",
        "tracking_location": {
          "object": "TrackingLocation",
          "city": "OCEANSIDE",
          "state": "CA",
          "country": "US",
          "zip": "92056"
        }
      },
      {
        "object": "TrackingDetail",
        "message": "At local FedEx facility",
        "description": "At local FedEx facility",
        "status": "in_transit",
        "status_detail": "received_at_destination_facility",
        "datetime": "2023-04-25T10:07:00Z",
        "source": "FedEx",
        "carrier_code": "AR",
        "tracking_location": {
          "object": "TrackingLocation",
          "city": "OCEANSIDE",
          "state": "CA",
          "country": "US",
          "zip": "92056"
        }
      },
      {
        "object": "TrackingDetail",
        "message": "Delivery exception (Awaiting additional delivery information from recipient)",
        "description": "Delivery exception",
        "status": "failure",
        "status_detail": "awaiting_information",
        "datetime": "2023-04-25T18:52:18Z",
        "source": "FedEx",
        "carrier_code": "DE",
        "tracking_location": {
          "object": "TrackingLocation",
          "city": "OCEANSIDE",
          "state": "CA",
          "country": "US",
          "zip": "92056"
        }
      },
      {
        "object": "TrackingDetail",
        "message": "Arrived at FedEx location",
        "description": "Arrived at FedEx location",
        "status": "in_transit",
        "status_detail": "received_at_origin_facility",
        "datetime": "2023-04-25T20:43:00Z",
        "source": "FedEx",
        "carrier_code": "AR",
        "tracking_location": {
          "object": "TrackingLocation",
          "city": "OCEANSIDE",
          "state": "CA",
          "country": "US",
          "zip": "92056"
        }
      },
      {
        "object": "TrackingDetail",
        "message": "Address corrected",
        "description": "Address corrected",
        "status": "in_transit",
        "status_detail": "address_correction",
        "datetime": "2023-04-25T20:43:31Z",
        "source": "FedEx",
        "carrier_code": "AS",
        "tracking_location": {
          "object": "TrackingLocation",
          "city": null,
          "state": null,
          "country": null,
          "zip": null
        }
      },
      {
        "object": "TrackingDetail",
        "message": "Shipment exception (Barcode label unreadable and replaced)",
        "description": "Shipment exception",
        "status": "failure",
        "status_detail": "transit_exception",
        "datetime": "2023-04-26T04:41:33Z",
        "source": "FedEx",
        "carrier_code": "SE",
        "tracking_location": {
          "object": "TrackingLocation",
          "city": "OCEANSIDE",
          "state": "CA",
          "country": "US",
          "zip": "92056"
        }
      },
      {
        "object": "TrackingDetail",
        "message": "Shipment arriving early",
        "description": "Shipment arriving early",
        "status": "unknown",
        "status_detail": "status_update",
        "datetime": "2023-04-26T04:42:46Z",
        "source": "FedEx",
        "carrier_code": "AE",
        "tracking_location": {
          "object": "TrackingLocation",
          "city": "OCEANSIDE",
          "state": "CA",
          "country": "US",
          "zip": "92056"
        }
      },
      {
        "object": "TrackingDetail",
        "message": "At local FedEx facility (Scheduled for delivery next business day)",
        "description": "At local FedEx facility",
        "status": "in_transit",
        "status_detail": "received_at_destination_facility",
        "datetime": "2023-04-26T04:43:38Z",
        "source": "FedEx",
        "carrier_code": "AF",
        "tracking_location": {
          "object": "TrackingLocation",
          "city": "OCEANSIDE",
          "state": "CA",
          "country": "US",
          "zip": "92056"
        }
      },
      {
        "object": "TrackingDetail",
        "message": "At local FedEx facility",
        "description": "At local FedEx facility",
        "status": "in_transit",
        "status_detail": "received_at_destination_facility",
        "datetime": "2023-04-26T13:01:00Z",
        "source": "FedEx",
        "carrier_code": "AR",
        "tracking_location": {
          "object": "TrackingLocation",
          "city": "OCEANSIDE",
          "state": "CA",
          "country": "US",
          "zip": "92056"
        }
      },
      {
        "object": "TrackingDetail",
        "message": "On FedEx vehicle for delivery",
        "description": "On FedEx vehicle for delivery",
        "status": "out_for_delivery",
        "status_detail": "out_for_delivery",
        "datetime": "2023-04-26T13:15:00Z",
        "source": "FedEx",
        "carrier_code": "OD",
        "tracking_location": {
          "object": "TrackingLocation",
          "city": "OCEANSIDE",
          "state": "CA",
          "country": "US",
          "zip": "92056"
        }
      },
      {
        "object": "TrackingDetail",
        "message": "Delivered",
        "description": "Delivered",
        "status": "delivered",
        "status_detail": "arrived_at_destination",
        "datetime": "2023-04-26T19:15:54Z",
        "source": "FedEx",
        "carrier_code": "DL",
        "tracking_location": {
          "object": "TrackingLocation",
          "city": "San Diego",
          "state": "CA",
          "country": "US",
          "zip": "92130"
        }
      }
    ],
    "carrier_detail": {
      "object": "CarrierDetail",
      "service": "GROUND_HOME_DELIVERY",
      "container_type": null,
      "est_delivery_date_local": null,
      "est_delivery_time_local": null,
      "origin_location": "CITY OF INDUSTRY CA US",
      "origin_tracking_location": {
        "object": "TrackingLocation",
        "city": "CITY OF INDUSTRY",
        "state": "CA",
        "country": "US",
        "zip": "91789"
      },
      "destination_location": "San Diego CA US",
      "destination_tracking_location": {
        "object": "TrackingLocation",
        "city": "San Diego",
        "state": "CA",
        "country": "US",
        "zip": "92130"
      },
      "guaranteed_delivery_date": null,
      "alternate_identifier": null,
      "initial_delivery_attempt": "2023-04-21T21:06:30Z"
    },
    "finalized": true,
    "is_return": false,
    "public_url": "https://track.easypost.com/djE6dHJrXzQ5NDE0NjkyY2JkMjRjYTM5Mjk0MmRkZTEyMDEzMDE5"
  }
}`



let hmac = crypto
    .createHmac("sha256", SECRET)
    .update(BODY)
    .digest("sha256");
const hashArray = Array.from(hmac)
const digest = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');


console.log("Resp Signature: ", digest);
console.log("EP sig: ", EPSIGNATURE);