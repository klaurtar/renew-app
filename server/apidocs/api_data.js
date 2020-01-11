define({ "api": [
  {
    "type": "delete",
    "url": "/auth",
    "title": "Sign Out",
    "name": "Sing_Admin_Out",
    "group": "Auth",
    "success": {
      "fields": {
        "Success: 200": [
          {
            "group": "Success: 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Response object.</p>"
          },
          {
            "group": "Success: 200",
            "type": "Boolean",
            "optional": false,
            "field": "data.sign_out",
            "description": "<p>Signed out successfully or not. It will clear token cookie.</p>"
          },
          {
            "group": "Success: 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>Status code.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error: 400": [
          {
            "group": "Error: 400",
            "type": "Object",
            "optional": false,
            "field": "error",
            "description": "<p>Error object.</p>"
          },
          {
            "group": "Error: 400",
            "type": "Array",
            "optional": false,
            "field": "error.errors",
            "description": "<p>Array of errors.</p>"
          },
          {
            "group": "Error: 400",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>Status code error.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/auth.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/auth",
    "title": "Sign In",
    "name": "Sing_In_For_Admin",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>username or email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success: 200": [
          {
            "group": "Success: 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Response object.</p>"
          },
          {
            "group": "Success: 200",
            "type": "String",
            "optional": false,
            "field": "data._id",
            "description": "<p>The id of user.</p>"
          },
          {
            "group": "Success: 200",
            "type": "String",
            "optional": false,
            "field": "data.token",
            "description": "<p>Generated token. Note, this token is also setted within header cookie.</p>"
          },
          {
            "group": "Success: 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>Status code.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error: 400": [
          {
            "group": "Error: 400",
            "type": "Object",
            "optional": false,
            "field": "error",
            "description": "<p>Error object.</p>"
          },
          {
            "group": "Error: 400",
            "type": "Array",
            "optional": false,
            "field": "error.errors",
            "description": "<p>Array of errors.</p>"
          },
          {
            "group": "Error: 400",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>Status code error.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/auth.js",
    "groupTitle": "Auth"
  },
  {
    "type": "put",
    "url": "/auth",
    "title": "Sign Up",
    "name": "Sing_Up_New_Admin",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>username or email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success: 201": [
          {
            "group": "Success: 201",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Response object.</p>"
          },
          {
            "group": "Success: 201",
            "type": "String",
            "optional": false,
            "field": "data._id",
            "description": "<p>The id of user.</p>"
          },
          {
            "group": "Success: 201",
            "type": "String",
            "optional": false,
            "field": "data.token",
            "description": "<p>Generated token. Note, this token is also setted within header cookie.</p>"
          },
          {
            "group": "Success: 201",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>Status code.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error: 400": [
          {
            "group": "Error: 400",
            "type": "Object",
            "optional": false,
            "field": "error",
            "description": "<p>Error object.</p>"
          },
          {
            "group": "Error: 400",
            "type": "Array",
            "optional": false,
            "field": "error.errors",
            "description": "<p>Array of errors.</p>"
          },
          {
            "group": "Error: 400",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>Status code error.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/auth.js",
    "groupTitle": "Auth"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "server/apidocs/main.js",
    "group": "C:\\nginx\\html\\renew-app\\server\\apidocs\\main.js",
    "groupTitle": "C:\\nginx\\html\\renew-app\\server\\apidocs\\main.js",
    "name": ""
  }
] });
